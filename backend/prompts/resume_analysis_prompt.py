"""
Structured Gemini prompt for resume analysis.
Returns ONLY valid JSON — no markdown, no explanation.
"""

def build_prompt(resume_text: str, job_description: str) -> str:
    return f"""
You are an expert ATS (Applicant Tracking System) and career coach AI.

Analyze the following resume against the provided job description.
Return ONLY a valid JSON object — no markdown code blocks, no explanation, no extra text.

RESUME TEXT:
\"\"\"
{resume_text}
\"\"\"

JOB DESCRIPTION:
\"\"\"
{job_description}
\"\"\"

Respond with EXACTLY this JSON structure (fill all fields accurately):

{{
  "ats_score": <integer 0-100 representing ATS compatibility of the resume>,
  "resume_summary": "<2-3 sentence professional summary of the candidate>",
  "job_match_percentage": <integer 0-100 representing how well resume matches the job>,
  "matched_skills": ["<skill1>", "<skill2>"],
  "missing_skills": ["<skill that is in JD but not in resume>"],
  "technical_skills": ["<all technical skills found in resume>"],
  "soft_skills": ["<soft skills found in resume>"],
  "strengths": ["<strength1>", "<strength2>", "<strength3>"],
  "weaknesses": ["<weakness1>", "<weakness2>"],
  "improvement_suggestions": [
    "<specific actionable suggestion to improve the resume>",
    "<another suggestion>"
  ],
  "recommended_projects": [
    "<project idea or certification to add to resume>",
    "<another project or cert>"
  ],
  "interview_questions": [
    "<likely technical interview question based on resume>",
    "<behavioral question>",
    "<project-based question>"
  ],
  "career_roles": [
    "<best fit job role 1>",
    "<best fit job role 2>",
    "<best fit job role 3>"
  ]
}}

Rules:
- ats_score must be an integer (not a string)
- job_match_percentage must be an integer (not a string)
- All list fields must be arrays of strings
- Do NOT wrap the response in markdown (no ```json)
- Return raw JSON only
"""
