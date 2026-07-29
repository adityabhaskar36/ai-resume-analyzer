"""
Route: POST /analyze-resume
Accepts a resume file (PDF/DOCX) and a job description string.
Returns Gemini AI analysis as JSON.
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from services.resume_parser import extract_text
from services.gemini_service import analyze_resume

router = APIRouter()

ALLOWED_EXTENSIONS = {".pdf", ".docx"}
MAX_FILE_SIZE_MB = 10


@router.post("/analyze-resume")
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Analyze a resume against a job description using Gemini AI.

    - **file**: PDF or DOCX resume file
    - **job_description**: Target job description text
    """

    # Validate file extension
    filename = file.filename or ""
    extension = "." + filename.rsplit(".", 1)[-1].lower() if "." in filename else ""

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{extension}'. Only PDF and DOCX are supported."
        )

    # Validate job description
    if not job_description or len(job_description.strip()) < 20:
        raise HTTPException(
            status_code=400,
            detail="Job description is too short. Please provide a detailed job description."
        )

    # Extract text from resume
    resume_text = await extract_text(file)

    if len(resume_text.strip()) < 50:
        raise HTTPException(
            status_code=400,
            detail="Resume appears to be empty or too short to analyze."
        )

    # Analyze with Gemini
    analysis = await analyze_resume(resume_text, job_description.strip())

    return {
        "success": True,
        "filename": filename,
        "analysis": analysis
    }
