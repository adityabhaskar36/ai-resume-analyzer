import { useState, useEffect } from 'react'

const STEPS = [
  'Reading resume content...',
  'Sending to Gemini AI...',
  'Analyzing ATS compatibility...',
  'Evaluating skill match...',
  'Generating recommendations...',
  'Preparing your results...'
]

export default function LoadingOverlay() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev))
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="loading-overlay" role="status" aria-live="polite">
      <div style={{ position: 'relative' }}>
        {/* Outer glow ring */}
        <div style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          background: 'conic-gradient(var(--accent), var(--purple), transparent)',
          animation: 'spin 2s linear infinite',
          opacity: 0.3
        }} />
        <div className="loading-spinner" />
      </div>

      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          🤖 Gemini AI is analyzing your resume
        </p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          This usually takes 5–15 seconds
        </p>

        <div className="loading-steps">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className={`loading-step ${i === stepIndex ? 'active' : ''} ${i < stepIndex ? 'done' : ''}`}
              style={{
                color: i < stepIndex
                  ? 'var(--success)'
                  : i === stepIndex
                    ? 'var(--accent-light)'
                    : 'var(--text-muted)'
              }}
            >
              {i < stepIndex ? '✓ ' : i === stepIndex ? '› ' : '  '}
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
