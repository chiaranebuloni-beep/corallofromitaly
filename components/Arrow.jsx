// Freccia disegnata (le frecce Unicode su iPhone diventano emoji)
const ROT = { 'up-right': 0, right: 45, down: 135, up: -45, left: -135 };

export default function Arrow({ dir = 'up-right', className = '' }) {
  return (
    <svg
      className={`arrow ${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      style={{ transform: `rotate(${ROT[dir]}deg)` }}
    >
      <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
