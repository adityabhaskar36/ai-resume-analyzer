import { useState } from 'react'
import ScoreCard from '../components/ScoreCard'
import SkillBadge from '../components/SkillBadge'
import InterviewQuestion from '../components/InterviewQuestion'

export default function ResultsPage({ results, filename, onBack }) {
  if (!results) return null

  const {
    ats_score = 0,
    job_match_percentage = 0,
    resume_summary = '',
    matched_skills = [],
    missing_skills = [],
    technical_skills = [],
    soft_skills = [],
    strengths = [],
    weaknesses = [],
    improvement_suggestions = [],
    recommended_projects = [],
    interview_questions = [],
    career_roles = []
  } = results

  const getScoreColor = (score) => {
    if (score >= 80) return 'var(--success)'
    if (score >= 60) return 'var(--warning)'
    return 'var(--danger)'
  }

  return (
    <div className="page results-page">
      {/* Header */}
      <div className="results-header fade-in">
        <div>
          <h1>Analysis <span className="gradient-text">Results</span></h1>
          <p>
            {filename && <><span style={{ color: 'var(--accent-light)' }}>📎 {filename}</span> &nbsp;•&nbsp;</>}
            Analyzed by Gemini AI
          </p>
        </div>
        <button className="btn btn-outline" onClick={onBack} id="analyze-again-btn">
          ← Analyze Another Resume
        </button>
      </div>

      {/* ── Score Row ── */}
      <div className="score-row">
        <ScoreCard
          label="ATS Score"
          value={ats_score}
          unit="/100"
          color={getScoreColor(ats_score)}
          delay={0}
          tip="How well your resume passes Applicant Tracking Systems"
        />
        <ScoreCard
          label="Job Match"
          value={job_match_percentage}
          unit="%"
          color={getScoreColor(job_match_percentage)}
          delay={0.1}
          tip="How closely your profile matches the job description"
        />
        <ScoreCard
          label="Skills Matched"
          value={matched_skills.length}
          unit={` of ${matched_skills.length + missing_skills.length}`}
          color="var(--accent-light)"
          delay={0.2}
          showBar={false}
          tip="Number of required skills found in your resume"
        />
        <ScoreCard
          label="Missing Skills"
          value={missing_skills.length}
          unit=" gaps"
          color={missing_skills.length === 0 ? 'var(--success)' : 'var(--warning)'}
          delay={0.3}
          showBar={false}
          tip="Skills required by the job but not found in your resume"
        />
      </div>

      {/* ── Summary ── */}
      {resume_summary && (
        <div className="summary-card">
          <div className="section-title"><span>📝</span> Resume Summary</div>
          <p className="summary-text">{resume_summary}</p>
        </div>
      )}

      {/* ── Skills Grid ── */}
      <div className="results-grid">
        <div className="section-card">
          <div className="section-title">
            <span>✅</span> Matched Skills
            <span className="badge badge-success" style={{ marginLeft: 'auto', textTransform: 'none', fontWeight: 500 }}>
              {matched_skills.length} found
            </span>
          </div>
          <div className="skills-wrap">
            {matched_skills.length > 0
              ? matched_skills.map(s => <SkillBadge key={s} skill={s} type="success" />)
              : <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No direct skill matches found.</p>
            }
          </div>
        </div>

        <div className="section-card">
          <div className="section-title">
            <span>❌</span> Missing Skills
            <span className="badge badge-danger" style={{ marginLeft: 'auto', textTransform: 'none', fontWeight: 500 }}>
              {missing_skills.length} gaps
            </span>
          </div>
          <div className="skills-wrap">
            {missing_skills.length > 0
              ? missing_skills.map(s => <SkillBadge key={s} skill={s} type="danger" />)
              : <p style={{ fontSize: '0.85rem', color: 'var(--success)' }}>🎉 No critical skill gaps found!</p>
            }
          </div>
        </div>

        <div className="section-card">
          <div className="section-title"><span>🔧</span> Technical Skills</div>
          <div className="skills-wrap">
            {technical_skills.length > 0
              ? technical_skills.map(s => <SkillBadge key={s} skill={s} type="accent" />)
              : <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None detected.</p>
            }
          </div>
        </div>

        <div className="section-card">
          <div className="section-title"><span>🤝</span> Soft Skills</div>
          <div className="skills-wrap">
            {soft_skills.length > 0
              ? soft_skills.map(s => <SkillBadge key={s} skill={s} type="warning" />)
              : <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>None detected.</p>
            }
          </div>
        </div>
      </div>

      {/* ── Strengths & Weaknesses ── */}
      <div className="results-grid">
        <div className="section-card">
          <div className="section-title"><span>💪</span> Strengths</div>
          <ul className="ai-list list-success">
            {strengths.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <div className="section-card">
          <div className="section-title"><span>⚡</span> Areas to Improve</div>
          <ul className="ai-list list-danger">
            {weaknesses.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      </div>

      {/* ── AI Suggestions ── */}
      <div className="section-card full-width" style={{ marginBottom: '1.25rem' }}>
        <div className="section-title"><span>🤖</span> AI Improvement Suggestions</div>
        <ul className="ai-list list-accent">
          {improvement_suggestions.map((s, i) => <li key={i}>{s}</li>)}
        </ul>
      </div>

      {/* ── Recommended Projects ── */}
      {recommended_projects.length > 0 && (
        <div className="section-card full-width" style={{ marginBottom: '1.25rem' }}>
          <div className="section-title"><span>🚀</span> Recommended Projects & Certifications</div>
          <ul className="ai-list list-warning">
            {recommended_projects.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {/* ── Interview Questions ── */}
      {interview_questions.length > 0 && (
        <div className="section-card full-width" style={{ marginBottom: '1.25rem' }}>
          <div className="section-title"><span>💬</span> Likely Interview Questions</div>
          <div>
            {interview_questions.map((q, i) => (
              <InterviewQuestion key={i} index={i + 1} question={q} />
            ))}
          </div>
        </div>
      )}

      {/* ── Career Roles ── */}
      {career_roles.length > 0 && (
        <div className="section-card full-width">
          <div className="section-title"><span>🎯</span> Best-Fit Career Roles</div>
          <div className="career-roles">
            {career_roles.map((role, i) => (
              <div key={i} className="career-role">
                {role}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Re-analyze CTA */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="btn btn-primary btn-lg" onClick={onBack} id="try-again-btn">
          🔄 Analyze Another Resume
        </button>
      </div>
    </div>
  )
}
