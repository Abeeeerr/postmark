// Line-art iced drink — the no-photo state of a stamp interior.
export function IcedCup({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 84"
      className={className}
      fill="none"
      stroke="var(--ink)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* straw */}
      <path d="M35 24 41 4l7 2.5" />
      {/* cup */}
      <path d="M13 24h38l-4.6 52c-.2 2.2-2 4-4.2 4H21.8c-2.2 0-4-1.8-4.2-4L13 24Z" />
      {/* coffee band */}
      <path d="M13.7 32h36.6" stroke="var(--chocolate)" strokeWidth="6" />
      {/* ice cubes */}
      <rect x="21" y="40" width="10" height="10" rx="2.5" transform="rotate(-9 26 45)" />
      <rect x="34" y="42" width="10" height="10" rx="2.5" transform="rotate(11 39 47)" />
      <rect x="27" y="53" width="10" height="10" rx="2.5" transform="rotate(-4 32 58)" />
    </svg>
  )
}
