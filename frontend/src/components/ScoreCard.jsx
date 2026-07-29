export default function ScoreCard({ label, value, unit, color, delay = 0, tip, showBar = true }) {
  return (
    <div className="score-card" style={{ animationDelay: `${delay}s` }} title={tip}>
      <div className="score-label">{label}</div>
      <div className="score-value" style={{ color }}>
        {value}
        <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-muted)' }}>{unit}</span>
      </div>
      {tip && <div className="score-sub">{tip}</div>}
      {showBar && (
        <div className="score-bar-wrap">
          <div
            className="score-bar"
            style={{
              width: `${Math.min(value, 100)}%`,
              background: `linear-gradient(90deg, ${color}, ${color}99)`
            }}
          />
        </div>
      )}
    </div>
  )
}
