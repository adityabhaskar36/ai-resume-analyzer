import { useState } from 'react'

export default function InterviewQuestion({ index, question }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="interview-card">
      <div
        className={`interview-q ${open ? 'open' : ''}`}
        onClick={() => setOpen(!open)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
        id={`interview-q-${index}`}
      >
        <span>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '22px',
            height: '22px',
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            color: 'var(--accent-light)',
            fontSize: '0.72rem',
            fontWeight: 700,
            marginRight: '0.6rem',
            flexShrink: 0
          }}>{index}</span>
          {question}
        </span>
        <span className={`interview-chevron ${open ? 'open' : ''}`}>▼</span>
      </div>
      {open && (
        <div className="interview-answer">
          <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>💡 Preparation tip: </span>
          Use the STAR method (Situation, Task, Action, Result) to structure your answer.
          Review your resume experience that relates to this question and prepare specific examples.
        </div>
      )}
    </div>
  )
}
