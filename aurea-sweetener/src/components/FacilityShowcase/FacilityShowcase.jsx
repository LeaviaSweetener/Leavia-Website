import { useEffect, useRef, useState, useCallback } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './FacilityShowcase.css'

const SLIDES = [
  {
    img: '/facility-cleanroom.jpg',
    name: 'GMP Clean Room',
    sub: 'Grade A sterile environment',
    label_bl: 'Pharmaceutical-grade\nclean room facility',
  },
  {
    img: '/facility-production-zone.jpg',
    name: 'Production Zone',
    sub: 'Yangling Production Base',
    label_bl: 'Large-scale extraction\n& refining lines',
  },
  {
    img: '/facility-laboratory.jpg',
    name: 'R&D Laboratory',
    sub: 'Research & Development Center',
    label_bl: 'HPLC · GC · UV Spectrophotometry\nquality verification',
  },
  {
    img: '/facility-hvac.jpg',
    name: 'Climate Control',
    sub: 'SINO KING environmental system',
    label_bl: 'Precision temperature\n& humidity monitoring',
  },
  {
    img: '/facility-blender.jpg',
    name: 'Double-Cone Blender',
    sub: 'Powder blending & mixing',
    label_bl: 'Pharmaceutical-grade\nhomogeneous blending',
  },
]

const INTERVAL = 4200

export default function FacilityShowcase() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [slideInfoShow, setSlideInfoShow] = useState(false)
  const timerRef = useRef(null)
  const startRef = useRef(null)
  const rafRef = useRef(null)
  const sectionRef = useRef(null)

  const goTo = useCallback((idx) => {
    setSlideInfoShow(false)
    setCurrent(idx)
    setProgress(0)
    if (timerRef.current) clearTimeout(timerRef.current)
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    startRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - startRef.current
      const pct = Math.min(100, (elapsed / INTERVAL) * 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length)
        startRef.current = performance.now()
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    setTimeout(() => setSlideInfoShow(true), 200)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setRevealed(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed) return
    setTimeout(() => setSlideInfoShow(true), 1200)
    startRef.current = performance.now()
    const tick = (now) => {
      const elapsed = now - startRef.current
      const pct = Math.min(100, (elapsed / INTERVAL) * 100)
      setProgress(pct)
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCurrent((c) => {
          const next = (c + 1) % SLIDES.length
          return next
        })
        startRef.current = performance.now()
        rafRef.current = requestAnimationFrame(tick)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [revealed])

  const slide = SLIDES[current]

  return (
    <section className="facility" ref={sectionRef} aria-label="Manufacturing Facility">

      {/* Stripe background */}
      <div className="facility__stripes" />

      {/* Cycling images */}
      {SLIDES.map((s, i) => (
        <img
          key={s.img}
          src={s.img}
          alt={s.name}
          className={`facility__img${i === current ? ' active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Dark overlay */}
      <div className="facility__overlay" />

      {/* Gold accent lines */}
      <div className={`facility__line-h left${revealed ? ' visible' : ''}`} />
      <div className={`facility__line-h right${revealed ? ' visible' : ''}`} />
      <div
        className={`facility__line-v${revealed ? ' visible' : ''}`}
        style={{ left: '22%', top: 0 }}
      />

      {/* Corner labels */}
      <span className={`facility__label facility__label--tl${revealed ? ' visible' : ''}`}>
        Aurea Sweetener
      </span>
      <span className={`facility__label facility__label--tr${revealed ? ' visible' : ''}`}>
        Manufacturing Excellence
      </span>
      <span
        className={`facility__label facility__label--bl${revealed ? ' visible' : ''}`}
        style={{ whiteSpace: 'pre-line' }}
      >
        {slide.label_bl}
      </span>

      {/* Main title */}
      <div className={`facility__title-layer${revealed ? ' revealed' : ''}`}>
        <div className="facility__title-overline">
          {t ? t('facility_overline') || 'Yangling Production Base' : 'Yangling Production Base'}
        </div>
        <span className="facility__title-row">Where Quality</span>
        <span className="facility__title-row facility__title-row--gold">Meets Science</span>
      </div>

      {/* Slide name + sub */}
      <div className={`facility__slide-info${slideInfoShow ? ' show' : ''}`}>
        <div className="facility__slide-name">{slide.name}</div>
        <div className="facility__slide-sub">{slide.sub}</div>
      </div>

      {/* Counter */}
      <div className={`facility__counter${slideInfoShow ? ' show' : ''}`}>
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      {/* Side ticker */}
      <div className="facility__ticker-wrap">
        <div className="facility__ticker-inner">
          <div className="facility__ticker-text">
            {[...Array(4)].map((_, i) => (
              <span key={i}>
                Manufacturing Excellence
                <span className="facility__ticker-sep"> ✦ </span>
                GMP Certified
                <span className="facility__ticker-sep"> ✦ </span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Dot navigation */}
      <div className="facility__dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`facility__dot${i === current ? ' active' : ''}`}
            aria-label={`View ${SLIDES[i].name}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="facility__scroll-hint">
        <div className="facility__scroll-line" />
        <span>Scroll</span>
      </div>

      {/* Progress bar */}
      <div className="facility__progress" style={{ width: `${progress}%` }} />
    </section>
  )
}
