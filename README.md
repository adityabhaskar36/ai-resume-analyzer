# 🤖 AI Resume Analyzer

> Analyze your resume against any job description using **Google Gemini AI**.  
> Get ATS score, skill gap analysis, interview questions, and career recommendations in seconds.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎯 ATS Score | Real-time ATS compatibility score (0–100) |
| 🤖 Gemini AI | Powered by Google Gemini 1.5 Flash |
| 🧩 Skill Gap Analysis | See matched & missing skills vs job description |
| 💬 Interview Questions | AI-generated questions based on your resume |
| 📈 Career Recommendations | Best-fit job roles for your profile |
| ✍️ Improvement Suggestions | Actionable tips to improve your resume |
| 📄 Multi-format Support | PDF and DOCX files supported |

---

## 🏗️ Project Structure

```
AI-Resume-Analyzer-main/
│
├── backend/                    ← FastAPI backend (NEW)
│   ├── main.py                 ← FastAPI app entry point
│   ├── routes/
│   │   └── analyze.py          ← POST /api/analyze-resume
│   ├── services/
│   │   ├── resume_parser.py    ← PDF/DOCX text extraction
│   │   └── gemini_service.py   ← Gemini API integration
│   ├── prompts/
│   │   └── resume_analysis_prompt.py  ← Structured AI prompt
│   ├── .env.example            ← Environment variable template
│   └── requirements.txt
│
├── frontend/                   ← React.js frontend (NEW)
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx             ← Root with in-memory routing
│   │   ├── index.css           ← Dark-mode design system
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── AnalyzerPage.jsx
│   │   │   └── ResultsPage.jsx
│   │   └── components/
│   │       ├── ScoreCard.jsx
│   │       ├── SkillBadge.jsx
│   │       ├── InterviewQuestion.jsx
│   │       └── LoadingOverlay.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (free)

---

### Step 1 — Set up the Backend

```bash
# Navigate to the backend folder
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

---

### Step 2 — Add Your Gemini API Key

```bash
# Copy the example file
copy .env.example .env    # Windows
# cp .env.example .env    # macOS/Linux

# Open .env and add your key:
# GEMINI_API_KEY=your_actual_api_key_here
```

Get your free API key at: https://aistudio.google.com/app/apikey

---

### Step 3 — Run the FastAPI Backend

```bash
# Make sure you're in the backend/ directory with venv activated
uvicorn main:app --reload --port 8000
```

Backend will be available at: http://localhost:8000  
API docs (Swagger UI): http://localhost:8000/docs

---

### Step 4 — Set up the Frontend

```bash
# Open a new terminal and navigate to the frontend folder
cd frontend

# Install Node dependencies (only needed once)
npm install

# Start the React dev server
npm run dev
```

Frontend will be available at: http://localhost:5173

---

### Step 5 — Use the Application

1. Open http://localhost:5173 in your browser
2. Click **"Get Started"**
3. Upload your resume (PDF or DOCX)
4. Paste the job description
5. Click **"Analyze Resume with AI"**
6. View your comprehensive AI analysis!

---

## 🔌 API Reference

### `POST /api/analyze-resume`

**Request:** `multipart/form-data`

| Field | Type | Description |
|---|---|---|
| `file` | File | PDF or DOCX resume |
| `job_description` | string | Target job description text |

**Response:**
```json
{
  "success": true,
  "filename": "resume.pdf",
  "analysis": {
    "ats_score": 85,
    "resume_summary": "...",
    "job_match_percentage": 78,
    "matched_skills": ["Python", "FastAPI"],
    "missing_skills": ["Docker", "AWS"],
    "technical_skills": ["Python", "SQL", "Git"],
    "soft_skills": ["Communication", "Leadership"],
    "strengths": ["..."],
    "weaknesses": ["..."],
    "improvement_suggestions": ["..."],
    "recommended_projects": ["..."],
    "interview_questions": ["..."],
    "career_roles": ["Backend Developer", "API Engineer"]
  }
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, Uvicorn |
| AI | Google Gemini 1.5 Flash |
| PDF Parsing | pdfplumber |
| DOCX Parsing | python-docx |
| Frontend | React.js, Vite |
| Styling | Vanilla CSS (dark mode) |

---

## ⚙️ Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key |

---

## 🔒 Notes

- No database is used — all analysis is stateless
- Resume files are processed in memory (not stored to disk)
- API keys are loaded from `.env` — never hardcoded
- `.env` is gitignored — never commit your API key
