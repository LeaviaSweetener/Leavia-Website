import { useEffect, useRef, useState } from 'react'

/**
 * useParallax — Returns a Y offset based on element's scroll position
 * @param {number} speed - multiplier (0.1 = subtle, 0.5 = pronounced)
 */
export function useParallax(speed = 0.2) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let rafId = null

    const calculate = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const viewportCenter = window.innerHeight / 2
      const elementCenter = rect.top + rect.height / 2
      const distance = elementCenter - viewportCenter
      setOffset(distance * speed)
    }

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(calculate)
    }

    calculate()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return [ref, offset]
}

/**
 * useMouseParallax — Returns {x, y} offset based on mouse position
 * @param {number} strength - multiplier for mouse movement
 */
export function useMouseParallax(strength = 0.03) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafId = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      target.current = {
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      }
    }

    const animate = () => {
      // Lerp toward target
      current.current.x += (target.current.x - current.current.x) * 0.08
      current.current.y += (target.current.y - current.current.y) * 0.08
      setPosition({ x: current.current.x, y: current.current.y })
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [strength])

  return position
}
