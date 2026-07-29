const typeMap = {
  success: 'badge-success',
  danger:  'badge-danger',
  accent:  'badge-accent',
  warning: 'badge-warning'
}

const iconMap = {
  success: '✓',
  danger:  '✕',
  accent:  '◆',
  warning: '●'
}

export default function SkillBadge({ skill, type = 'accent' }) {
  return (
    <span className={`badge ${typeMap[type] || 'badge-accent'}`}>
      <span style={{ fontSize: '0.65rem' }}>{iconMap[type]}</span>
      {skill}
    </span>
  )
}
