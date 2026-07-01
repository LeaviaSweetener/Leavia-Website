import { useRef, useEffect, useState, useCallback } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './CertCarousel.css'

const CERTS = [
  { src: '/certs/cert-fssc.png',   labelKey: 'cert_label_fssc' },
  { src: '/certs/cert-halal.png',  labelKey: 'cert_label_halal' },
  { src: '/certs/cert-cgmp.png',   labelKey: 'cert_label_cgmp' },
  { src: '/certs/cert-food.png',   labelKey: 'cert_label_food' },
  { src: '/certs/cert-haccp1.png', labelKey: 'cert_label_haccp1' },
  { src: '/certs/cert-haccp2.png', labelKey: 'cert_label_haccp2' },
  { src: '/certs/cert-haccp3.png', labelKey: 'cert_label_haccp3' },
  { src: '/certs/cert-haccp4.png', labelKey: 'cert_label_haccp4' },
]

const TOTAL      = CERTS.length
const ANGLE_STEP = 360 / TOTAL
const RADIUS     = 360

export default function CertCarousel() {
  const { t } = useLanguage()
  const stageRef    = useRef(null)
  const cardRefs    = useRef([])
  const rafRef      = useRef(null)
  const angleRef    = useRef(0)
  const targetRef   = useRef(0)
  const dragRef     = useRef({ active: false, startX: 0, startAngle: 0 })
  const activeIdxRef = useRef(0)
  const [activeIdx, setActiveIdx] = useState(0)

  const animate = useCallback(() => {
    const diff = targetRef.current - angleRef.current
    if (Math.abs(diff) > 0.01) {
      angleRef.current += diff * 0.09
    } else {
      angleRef.current = targetRef.current
    }

    if (stageRef.current) {
      stageRef.current.style.transform = `rotateY(${-angleRef.current}deg)`
    }

    let newActive = 0
    let minDist   = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      let angle = ((i * ANGLE_STEP - angleRef.current) % 360 + 360) % 360
      if (angle > 180) angle -= 360
      const dist = Math.abs(angle)
      const opacity = Math.max(0.18, 1 - (dist / 140) * 0.82)
      card.style.opacity = opacity.toFixed(3)
      if (dist < minDist) { minDist = dist; newActive = i }
    })

    if (newActive !== activeIdxRef.current) {
      activeIdxRef.current = newActive
      setActiveIdx(newActive)
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  const snapToNearest = () => {
    targetRef.current = Math.round(targetRef.current / ANGLE_STEP) * ANGLE_STEP
  }

  const onMouseDown = useCallback((e) => {
    dragRef.current = { active: true, startX: e.clientX, startAngle: targetRef.current }
    e.preventDefault()
  }, [])

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current.active) return
    const delta = (e.clientX - dragRef.current.startX) / 2.2
    targetRef.current = dragRef.current.startAngle - delta
  }, [])

  const onMouseUp = useCallback(() => {
    if (!dragRef.current.active) return
    dragRef.current.active = false
    snapToNearest()
  }, [])

  const onTouchStart = useCallback((e) => {
    dragRef.current = { active: true, startX: e.touches[0].clientX, startAngle: targetRef.current }
  }, [])

  const onTouchMove = useCallback((e) => {
    if (!dragRef.current.active) return
    const delta = (e.touches[0].clientX - dragRef.current.startX) / 2.2
    targetRef.current = dragRef.current.startAngle - delta
    e.preventDefault()
  }, [])

  const onTouchEnd = useCallback(() => {
    dragRef.current.active = false
    snapToNearest()
  }, [])

  const goTo = useCallback((idx) => {
    const current = Math.round(targetRef.current / ANGLE_STEP)
    let delta = idx - (current % TOTAL + TOTAL) % TOTAL
    if (delta > TOTAL / 2)  delta -= TOTAL
    if (delta < -TOTAL / 2) delta += TOTAL
    targetRef.current = current * ANGLE_STEP + delta * ANGLE_STEP
  }, [])

  return (
    <div
      className="cert-carousel"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <p className="cert-carousel__hint">
        <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
          <path d="M8 9l4-4 4 4M8 15l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {t('cert_carousel_hint')}
      </p>

      <div className="cert-carousel__scene">
        <div className="cert-carousel__stage" ref={stageRef}>
          {CERTS.map((cert, i) => (
            <div
              key={i}
              ref={el => cardRefs.current[i] = el}
              className={`cert-carousel__card${activeIdx === i ? ' cert-carousel__card--active' : ''}`}
              style={{ transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)` }}
              onClick={() => goTo(i)}
            >
              <img
                src={cert.src}
                alt={t(cert.labelKey)}
                draggable={false}
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex' }}
              />
              <div className="cert-carousel__placeholder">
                <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
                  <rect x="6" y="4" width="28" height="32" rx="3" stroke="rgba(201,168,76,0.5)" strokeWidth="1.5"/>
                  <line x1="11" y1="13" x2="29" y2="13" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11" y1="18" x2="29" y2="18" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="11" y1="23" x2="22" y2="23" stroke="rgba(201,168,76,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="28" cy="28" r="6" fill="rgba(29,120,59,0.15)" stroke="rgba(201,168,76,0.6)" strokeWidth="1.2"/>
                  <path d="M25.5 28l2 2 3.5-3" stroke="rgba(201,168,76,0.8)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>{t(cert.labelKey)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="cert-carousel__footer">
        <p className="cert-carousel__label">{t(CERTS[activeIdx].labelKey)}</p>
        <div className="cert-carousel__dots">
          {CERTS.map((_, i) => (
            <button
              key={i}
              className={`cert-carousel__dot${activeIdx === i ? ' cert-carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={t(CERTS[i].labelKey)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
