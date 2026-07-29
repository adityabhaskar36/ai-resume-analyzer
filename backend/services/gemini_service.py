"""
Gemini AI service: sends resume + job description to Gemini API
and returns structured JSON analysis.
"""

import os
import json
import re
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")


FREE_TIER_MODELS = [
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
    "gemini-2.0-flash",
]


def _get_client(model_name: str = "gemini-flash-latest"):
    """Initialize and return the Gemini generative model."""
    if not GEMINI_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="GEMINI_API_KEY is not set. Please add it to your .env file."
        )

    import google.generativeai as genai
    genai.configure(api_key=GEMINI_API_KEY)

    return genai.GenerativeModel(
        model_name=model_name,
        generation_config={
            "temperature": 0.3,
            "top_p": 0.95,
            "max_output_tokens": 4096,
        }
    )


def _clean_json_response(raw: str) -> str:
    """
    Strip markdown code fences if Gemini wraps response in ```json ... ```
    despite being told not to.
    """
    # Remove ```json ... ``` or ``` ... ``` wrappers
    cleaned = re.sub(r"^```(?:json)?\s*", "", raw.strip(), flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned.strip())
    return cleaned.strip()


async def analyze_resume(resume_text: str, job_description: str) -> dict:
    """
    Send resume text and job description to Gemini and return parsed JSON analysis.
    Tries free-tier Gemini models automatically.
    """
    from prompts.resume_analysis_prompt import build_prompt

    prompt = build_prompt(resume_text, job_description)

    raw_text = None
    last_exception = None

    for model_name in FREE_TIER_MODELS:
        try:
            model = _get_client(model_name)
            response = model.generate_content(prompt)
            raw_text = response.text
            if raw_text:
                break
        except Exception as e:
            last_exception = e
            err_str = str(e).lower()
            # If 404 or not found or quota 0, continue to fallback model
            if "404" in err_str or "not found" in err_str or "quota" in err_str or "429" in err_str:
                continue
            else:
                break

    if not raw_text:
        err_msg = str(last_exception) if last_exception else "No response received from Gemini AI."
        if "429" in err_msg or "ResourceExhausted" in err_msg or "quota" in err_msg.lower():
            raise HTTPException(
                status_code=429,
                detail="Gemini Free Tier rate limit reached (15 requests/min). Please wait a few seconds and try again."
            )
        raise HTTPException(
            status_code=502,
            detail=f"Gemini API error: {err_msg}"
        )

    # Parse the JSON
    try:
        cleaned = _clean_json_response(raw_text)
        result = json.loads(cleaned)
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=502,
            detail=f"Gemini returned invalid JSON. Raw response: {raw_text[:500]}... Error: {str(e)}"
        )

    # Validate and enforce expected types
    result["ats_score"] = int(result.get("ats_score", 0))
    result["job_match_percentage"] = int(result.get("job_match_percentage", 0))

    # Ensure all list fields are actually lists
    list_fields = [
        "matched_skills", "missing_skills", "technical_skills", "soft_skills",
        "strengths", "weaknesses", "improvement_suggestions",
        "recommended_projects", "interview_questions", "career_roles"
    ]
    for field in list_fields:
        if not isinstance(result.get(field), list):
            result[field] = []

    return result
