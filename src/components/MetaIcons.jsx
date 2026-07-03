const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export function NoiseIcon({ level, size = 14 }) {
  // quiet: one arc · hum: two · loud: three
  const arcs = { quiet: 1, hum: 2, loud: 3 }[level] ?? 0
  if (!arcs) return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-label={`noise: ${level}`}>
      <path d="M4 9v6h4l5 4V5L8 9H4z" {...stroke} />
      {arcs >= 2 && <path d="M16 9a4 4 0 0 1 0 6" {...stroke} />}
      {arcs >= 3 && <path d="M18.5 6.5a8 8 0 0 1 0 11" {...stroke} />}
    </svg>
  )
}

export function WifiIcon({ status, size = 14 }) {
  if (status !== 'yes' && status !== 'no') return null
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-label={`wifi: ${status}`}>
      <path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" {...stroke} />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
      {status === 'no' && <path d="M4 4l16 16" {...stroke} />}
    </svg>
  )
}
