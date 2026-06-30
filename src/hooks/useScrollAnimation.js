import { useEffect, useRef, useState } from 'react'

/**
 * useScrollAnimation — Intersection Observer-based scroll reveal
 * Returns a ref to attach to your element and a boolean 'isVisible'
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -60px 0px',
    once = true,
  } = options

  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

/**
 * useStaggerAnimation — Reveals children with staggered delay
 */
export function useStaggerAnimation(count, options = {}) {
  const { baseDelay = 0, staggerDelay = 0.12 } = options
  const [ref, isVisible] = useScrollAnimation(options)

  const getDelay = (index) => `${baseDelay + index * staggerDelay}s`

  return { ref, isVisible, getDelay }
}

/**
 * useScrollProgress — Returns scroll progress 0-1
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

/**
 * useScrollY — Returns raw scrollY
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollVelocity, setScrollVelocity] = useState(0)
  const lastScrollY = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const current = window.scrollY
        setScrollVelocity(current - lastScrollY.current)
        lastScrollY.current = current
        setScrollY(current)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { scrollY, scrollVelocity }
}
