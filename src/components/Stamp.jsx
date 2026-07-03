// Passport-style circular date stamp. `animate` triggers the thunk.
export default function Stamp({ date, city, animate = false, className = '' }) {
  const d = new Date(date + 'T00:00:00')
  const line1 = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase()
  const line2 = d.getFullYear()
  return (
    <div
      className={`${animate ? 'animate-stamp' : '-rotate-8'} ${className} select-none`}
      style={{ color: 'var(--terracotta)' }}
    >
      <div className="rounded-full border-2 border-current p-1">
        <div className="rounded-full border border-current flex flex-col items-center justify-center aspect-square px-2.5 py-2 text-center leading-tight">
          <span className="text-[0.55em] tracking-[0.18em] font-medium truncate max-w-[7em]">
            {(city || 'CAFÉ').toUpperCase()}
          </span>
          <span className="font-display font-semibold text-[0.95em] tracking-wide">{line1}</span>
          <span className="text-[0.7em] tracking-[0.25em]">{line2}</span>
        </div>
      </div>
    </div>
  )
}
