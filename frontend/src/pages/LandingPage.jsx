const features = [
  {
    icon: '🎯',
    color: 'rgba(99,102,241,0.2)',
    title: 'ATS Score Analysis',
    desc: 'Get a real-time ATS compatibility score and understand exactly how recruiters see your resume.'
  },
  {
    icon: '🤖',
    color: 'rgba(139,92,246,0.2)',
    title: 'Gemini AI Powered',
    desc: "Google's most capable AI model deeply reads your resume and compares it against any job description."
  },
  {
    icon: '🧩',
    color: 'rgba(16,185,129,0.2)',
    title: 'Skill Gap Analysis',
    desc: 'See exactly which skills you have, which are missing, and what to learn next to land the role.'
  },
  {
    icon: '💬',
    color: 'rgba(245,158,11,0.2)',
    title: 'Interview Questions',
    desc: 'AI generates likely interview questions based on your resume so you can prepare with confidence.'
  },
  {
    icon: '📈',
    color: 'rgba(99,102,241,0.2)',
    title: 'Career Paths',
    desc: 'Discover the best-fit roles for your profile and get actionable career growth recommendations.'
  },
  {
    icon: '✍️',
    color: 'rgba(239,68,68,0.2)',
    title: 'Resume Suggestions',
    desc: 'Receive specific, actionable improvements to make your resume stand out from the crowd.'
  }
]

export default function LandingPage({ onStart }) {
  return (
    <div className="page">
      <section className="landing">
        <span className="landing-eyebrow">
          <span>✨</span> Powered by Google Gemini 1.5 Flash
        </span>

        <h1 className="landing-title">
          Analyze Your Resume with{' '}
          <span className="gradient-text">AI Precision</span>
        </h1>

        <p className="landing-subtitle">
          Upload your resume, paste a job description, and get a comprehensive
          AI-powered analysis in seconds — ATS score, skill gaps, interview prep &amp; more.
        </p>

        <div className="landing-cta">
          <button id="get-started-btn" className="btn btn-primary btn-lg" onClick={onStart}>
            🚀 Get Started — It's Free
          </button>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
          >
            Get API Key
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '3.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeInUp 0.5s 0.4s ease both'
        }}>
          {[['13+', 'Analysis Points'], ['< 10s', 'Response Time'], ['PDF & DOCX', 'Supported']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-light)' }}>{val}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Features grid */}
        <div className="landing-features" style={{ marginTop: '5rem' }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="feature-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="feature-icon" style={{ background: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        borderTop: '1px solid var(--border)'
      }}>
        Built with FastAPI • React • Google Gemini AI
      </footer>
    </div>
  )
}
