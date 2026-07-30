"""
AI Resume Analyzer — FastAPI Backend
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.analyze import router as analyze_router

app = FastAPI(
    title="AI Resume Analyzer",
    description="Analyze resumes against job descriptions using Gemini AI",
    version="2.0.0"
)

# CORS — allow React dev server and any localhost port
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "https://resumewwedeeee.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analyze_router, prefix="/api", tags=["Resume Analysis"])
app.include_router(analyze_router, tags=["Resume Analysis Root"])


@app.get("/")
async def root():
    return {
        "message": "AI Resume Analyzer API is running",
        "version": "2.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}
