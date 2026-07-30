import { useState, useCallback } from 'react'
import LoadingOverlay from '../components/LoadingOverlay'
const API_BASE = import.meta.env.VITE_APP_API_URL || 'http://localhost:8000/api'

export default function AnalyzerPage({ onResults }) {
  const [file, setFile] = useState(null)
  const [jobDescription, setJobDescription] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // ── File Handling ────────────────────────────────────────────
  const handleFile = (f) => {
    if (!f) return
    const ext = f.name.split('.').pop().toLowerCase()
    if (!['pdf', 'docx'].includes(ext)) {
      setError('Only PDF and DOCX files are supported.')
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File size must be under 10 MB.')
      return
    }
    setError('')
    setFile(f)
  }

  const onFileInput = (e) => handleFile(e.target.files?.[0])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [])

  const onDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const onDragLeave = () => setIsDragging(false)

  // ── Submit ───────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!file) { setError('Please upload a resume file.'); return }
    if (jobDescription.trim().length < 20) {
      setError('Job description is too short. Please paste a full job description.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_description', jobDescription.trim())

      const res = await fetch(`${API_BASE}/analyze-resume`, {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || `Server error: ${res.status}`)
      }

      onResults(data.analysis, data.filename)

    } catch (err) {
      if (err.message === 'Failed to fetch') {
        setError('Cannot connect to backend. Make sure FastAPI is running on http://localhost:8000')
      } else {
        setError(err.message || 'An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(1) + ' MB'
  }

  return (
    <>
      {loading && <LoadingOverlay />}

      <div className="page analyzer-page">
        <div className="analyzer-header fade-in-up">
          <h1>Analyze Your <span className="gradient-text">Resume</span></h1>
          <p>Upload your resume and paste the job description to get an AI-powered analysis</p>
        </div>

        {error && (
          <div className="error-banner" role="alert">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div className="analyzer-grid">
          {/* ── Left: Resume Upload ── */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="section-title">
              <span>📄</span> Resume Upload
            </div>

            <div
              id="upload-dropzone"
              className={`upload-area ${isDragging ? 'drag-over' : ''} ${file ? 'has-file' : ''}`}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={onFileInput}
                id="resume-file-input"
              />

              {file ? (
                <>
                  <span className="upload-icon">✅</span>
                  <h3 style={{ color: 'var(--success)' }}>File Uploaded!</h3>
                  <p>Click or drag to replace</p>
                </>
              ) : (
                <>
                  <span className="upload-icon">{isDragging ? '📂' : '☁️'}</span>
                  <h3>{isDragging ? 'Drop it here!' : 'Drag & Drop your Resume'}</h3>
                  <p>or click to browse</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.76rem' }}>PDF • DOCX • Max 10MB</p>
                </>
              )}
            </div>

            {file && (
              <div className="file-info">
                <span>📎</span>
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {file.name}
                </span>
                <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{formatSize(file.size)}</span>
                <button
                  onClick={() => setFile(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--danger)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    flexShrink: 0
                  }}
                  title="Remove file"
                >✕</button>
              </div>
            )}

            {/* Tips */}
            <div style={{ marginTop: '1.25rem', padding: '0.9rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem' }}>💡 Tips for best results:</p>
              <ul style={{ fontSize: '0.77rem', color: 'var(--text-muted)', paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <li>Use text-based PDFs (not scanned images)</li>
                <li>Include sections: Skills, Experience, Education</li>
                <li>Keep formatting clean and simple</li>
              </ul>
            </div>
          </div>

          {/* ── Right: Job Description ── */}
          <div className="card jd-card">
            <div className="section-title" style={{ marginBottom: '0.75rem' }}>
              <span>💼</span> Job Description
            </div>
            <label htmlFor="job-description-input">Paste the full job posting below</label>
            <textarea
              id="job-description-input"
              className="jd-textarea"
              placeholder="Paste your target job description here...

Example:
We are looking for a Python Developer with experience in:
- FastAPI / Django
- REST API design
- SQL databases
- Docker & Kubernetes
- AI/ML integration..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              style={{ flex: 1, minHeight: '320px' }}
            />
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              {jobDescription.length} characters
              {jobDescription.length < 20 && jobDescription.length > 0 && (
                <span style={{ color: 'var(--warning)', marginLeft: '0.5rem' }}>— needs more detail</span>
              )}
            </p>
          </div>
        </div>

        {/* ── Analyze Button ── */}
        <div className="analyze-btn-wrap">
          <button
            id="analyze-btn"
            className="btn btn-primary btn-lg"
            onClick={handleAnalyze}
            disabled={loading || !file || jobDescription.trim().length < 20}
            style={{ minWidth: '240px', justifyContent: 'center' }}
          >
            {loading ? (
              <>
                <span style={{ width: '18px', height: '18px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Analyzing...
              </>
            ) : '🤖 Analyze Resume with AI'}
          </button>
        </div>
      </div>
    </>
  )
}
