"""
Resume parser: extracts plain text from PDF and DOCX files.
"""

import io
from fastapi import UploadFile, HTTPException


async def extract_text(file: UploadFile) -> str:
    """
    Extract raw text from an uploaded PDF or DOCX file.
    Returns the extracted text as a string.
    """
    filename = file.filename.lower()
    content = await file.read()

    if filename.endswith(".pdf"):
        return _extract_from_pdf(content)
    elif filename.endswith(".docx"):
        return _extract_from_docx(content)
    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a PDF or DOCX file."
        )


def _extract_from_pdf(content: bytes) -> str:
    """Extract text from PDF bytes using pdfplumber."""
    try:
        import pdfplumber

        text = ""
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from PDF. The file may be image-based or corrupted."
            )
        return text.strip()

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"PDF parsing error: {str(e)}"
        )


def _extract_from_docx(content: bytes) -> str:
    """Extract text from DOCX bytes using python-docx."""
    try:
        from docx import Document

        doc = Document(io.BytesIO(content))
        text = "\n".join(
            para.text for para in doc.paragraphs if para.text.strip()
        )

        if not text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract text from DOCX. The file may be empty or corrupted."
            )
        return text.strip()

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"DOCX parsing error: {str(e)}"
        )
