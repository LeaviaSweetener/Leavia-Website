import './TransitionDivider.css'

export default function TransitionDivider({ atSectionEnd = false }) {
  return (
    <div
      className={`transition-divider ${atSectionEnd ? 'transition-divider--section-end' : ''}`}
      aria-hidden="true"
    >
      <div className="transition-divider__inner">
        <span className="transition-divider__line" />
        <svg className="transition-divider__mark" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2 C15 4 19 9 19 14 C19 18 16 21 12 22 C8 21 5 18 5 14 C5 9 9 4 12 2Z"
            fill="rgba(201,168,76,0.6)"
            stroke="rgba(201,168,76,0.9)"
            strokeWidth="0.8"
          />
          <line
            x1="12"
            y1="2.5"
            x2="12"
            y2="22"
            stroke="rgba(201,168,76,0.7)"
            strokeWidth="0.7"
          />
        </svg>
        <span className="transition-divider__line" />
      </div>
    </div>
  )
}
