import { useEffect, useRef, useState } from 'react'

/**
 * useMousePosition — Tracks normalized mouse position (-1 to 1)
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}

/**
 * useSmoothMousePosition — Smooth lerped mouse position
 */
export function useSmoothMousePosition(lerp = 0.05) {
  const position = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      target.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      }
    }

    const tick = () => {
      position.current.x += (target.current.x - position.current.x) * lerp
      position.current.y += (target.current.y - position.current.y) * lerp
      rafId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [lerp])

  return position
}
