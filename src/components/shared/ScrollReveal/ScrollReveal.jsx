import { useScrollAnimation } from '../../../hooks/useScrollAnimation'

/**
 * ScrollReveal — Wraps children with scroll-triggered animation
 * @param {string} direction - 'up' | 'down' | 'left' | 'right' | 'scale'
 * @param {number} delay - CSS animation-delay in seconds
 * @param {number} duration - CSS animation-duration in seconds
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className = '',
  threshold = 0.12,
  style = {},
}) {
  const [ref, isVisible] = useScrollAnimation({ threshold })

  const directionMap = {
    up:    'translateY(50px)',
    down:  'translateY(-50px)',
    left:  'translateX(-60px)',
    right: 'translateX(60px)',
    scale: 'scale(0.88)',
  }

  const baseStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : directionMap[direction],
    transition: `opacity ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
    willChange: 'opacity, transform',
    ...style,
  }

  return (
    <div ref={ref} className={className} style={baseStyle}>
      {children}
    </div>
  )
}
