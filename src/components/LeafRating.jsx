const TONES = {
  matcha: { fill: 'var(--cactus)', stroke: 'var(--cactus-deep)' },
  coffee: { fill: 'var(--chocolate)', stroke: 'var(--chocolate-deep)' },
  neutral: { fill: 'var(--leaf-neutral)', stroke: 'var(--ink-soft)' },
}

function Leaf({ filled, size, tone }) {
  const c = TONES[tone] ?? TONES.matcha
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path
        d="M12 2C7 7 4 11 4 15a8 8 0 0 0 16 0c0-4-3-8-8-13Zm0 18.5c-1.5-2.5-2-5.5 0-9.5"
        fill={filled ? c.fill : 'none'}
        stroke={filled ? c.stroke : 'var(--line)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Read-only row of 5 leaves
export function LeafRating({ value, size = 16, tone = 'matcha' }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${value} out of 5 leaves`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Leaf key={n} filled={n <= value} size={size} tone={tone} />
      ))}
    </div>
  )
}

// Tappable input variant for the form
export function LeafRatingInput({ value, onChange, size = 30, tone = 'matcha' }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n === value ? 0 : n)}
          className="active:scale-90 transition-transform"
          aria-label={`${n} leaves`}
        >
          <Leaf filled={n <= value} size={size} tone={tone} />
        </button>
      ))}
    </div>
  )
}
