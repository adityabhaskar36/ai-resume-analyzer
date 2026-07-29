import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import AnalyzerPage from './pages/AnalyzerPage'
import ResultsPage from './pages/ResultsPage'
import './index.css'

// Simple client-side "router" — no dependency needed
export default function App() {
  const [view, setView] = useState('landing')   // 'landing' | 'analyzer' | 'results'
  const [results, setResults] = useState(null)
  const [filename, setFilename] = useState('')

  const goTo = (page) => setView(page)

  const handleResults = (data, name) => {
    setResults(data)
    setFilename(name)
    setView('results')
  }

  const handleReset = () => {
    setResults(null)
    setFilename('')
    setView('analyzer')
  }

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar">
        <div
          className="navbar-logo"
          style={{ cursor: 'pointer' }}
          onClick={() => goTo('landing')}
        >
          {/* Brain icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
          </svg>
          AI Resume Analyzer
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {view !== 'analyzer' && (
            <button className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} onClick={() => goTo('analyzer')}>
              Analyze Resume
            </button>
          )}
        </div>
      </nav>

      {/* ── Pages ── */}
      {view === 'landing'  && <LandingPage  onStart={() => goTo('analyzer')} />}
      {view === 'analyzer' && <AnalyzerPage onResults={handleResults} />}
      {view === 'results'  && <ResultsPage  results={results} filename={filename} onBack={handleReset} />}
    </>
  )
}
