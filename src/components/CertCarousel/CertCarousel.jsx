import { useRef, useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { BadgeCheck, ChevronLeft, ChevronRight, FileCheck2, X, ZoomIn } from 'lucide-react'
import './CertCarousel.css'

const CERTIFICATES = [
  { id: 'fssc', src: '/certs/cert-fssc.png',   labelKey: 'cert_label_fssc' },
  { id: 'halal', src: '/certs/cert-halal.png',  labelKey: 'cert_label_halal' },
]

const QUALITY_DOCUMENTS = [
  { id: 'cgmp', src: '/certs/cert-cgmp.png',   labelKey: 'cert_label_cgmp' },
  { id: 'food', src: '/certs/cert-food.png',   labelKey: 'cert_label_food' },
  { id: 'haccp', src: '/certs/cert-haccp1.png', labelKey: 'cert_label_haccp1' },
  { id: 'haccp-2', src: '/certs/cert-haccp2.png', labelKey: 'cert_label_haccp2' },
  { id: 'haccp-3', src: '/certs/cert-haccp3.png', labelKey: 'cert_label_haccp3' },
  { id: 'haccp-4', src: '/certs/cert-haccp4.png', labelKey: 'cert_label_haccp4' },
]

export default function CertCarousel({ group = 'certificates' }) {
  const { t, isAr } = useLanguage()
  const location = useLocation()
  const isCertificates = group === 'certificates'
  const items = isCertificates ? CERTIFICATES : QUALITY_DOCUMENTS
  const total = items.length
  const dragRef = useRef({ active: false, startX: 0 })
  const suppressClickRef = useRef(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [selectedCert, setSelectedCert] = useState(null)

  useEffect(() => {
    const requestedId = new URLSearchParams(location.search).get('certificate')
    if (!requestedId) return

    const requestedIndex = items.findIndex((item) => item.id === requestedId)
    if (requestedIndex < 0) return

    const cert = items[requestedIndex]
    setActiveIdx(requestedIndex)
    setSelectedCert({ ...cert, label: t(cert.labelKey) })
  // `t` is recreated by the language provider on every render; `isAr` is the
  // stable locale signal that should reopen/relabel a deep-linked certificate.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, location.search, isAr])

  useEffect(() => {
    if (!selectedCert) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedCert(null)
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedCert])

  const goTo = useCallback((idx) => {
    setActiveIdx((idx + total) % total)
  }, [total])

  const getSlidePosition = useCallback((index) => {
    let offset = index - activeIdx
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    if (offset === 0) return 'active'
    if (offset === -1) return 'previous'
    if (offset === 1) return 'next'
    return 'hidden'
  }, [activeIdx, total])

  const onPointerDown = useCallback((event) => {
    dragRef.current = { active: true, startX: event.clientX }
  }, [])

  const onPointerUp = useCallback((event) => {
    if (!dragRef.current.active) return
    const distance = event.clientX - dragRef.current.startX
    dragRef.current.active = false
    if (Math.abs(distance) < 45) return
    suppressClickRef.current = true
    goTo(activeIdx + (distance < 0 ? 1 : -1))
    window.setTimeout(() => { suppressClickRef.current = false }, 0)
  }, [activeIdx, goTo])

  if (isCertificates) {
    return (
      <>
        <div className="cert-grid">
          {items.map((cert) => {
            const label = cert.labelKey === 'cert_label_fssc'
              ? (isAr ? 'شهادة نظام سلامة الغذاء FSSC 22000' : 'FSSC 22000 Food Safety System Certificate')
              : t(cert.labelKey)
            const badge = cert.labelKey === 'cert_label_halal'
              ? (isAr ? 'موثق دوليًا' : 'Internationally verified')
              : (isAr ? 'معتمد' : 'Certified')

            return (
              <article
                className="cert-grid__card"
                key={cert.labelKey}
                role="button"
                tabIndex={0}
                aria-label={`${label} — ${isAr ? 'فتح الشهادة' : 'Open certificate'}`}
                onClick={() => setSelectedCert({ ...cert, label })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedCert({ ...cert, label })
                  }
                }}
              >
                <div className="cert-grid__image-frame">
                  <img src={cert.src} alt={label} draggable={false} />
                  <span className="cert-grid__zoom" aria-hidden="true">
                    <ZoomIn size={16} strokeWidth={1.8} />
                  </span>
                </div>
                <div className="cert-grid__content">
                  <span className="cert-grid__badge">
                    <BadgeCheck size={14} strokeWidth={2} aria-hidden="true" />
                    {badge}
                  </span>
                  <h3 className="cert-grid__label">
                    <BadgeCheck className="cert-grid__title-icon" size={19} strokeWidth={1.8} aria-hidden="true" />
                    <span>{label}</span>
                  </h3>
                  <span className="cert-grid__gold-line" aria-hidden="true" />
                </div>
              </article>
            )
          })}
        </div>

        {selectedCert && createPortal(
          <div
            className="cert-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.label}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedCert(null)
            }}
          >
            <button
              className="cert-lightbox__close"
              type="button"
              onClick={() => setSelectedCert(null)}
              aria-label={isAr ? 'إغلاق' : 'Close'}
              autoFocus
            >
              <X size={22} />
            </button>
            <figure className="cert-lightbox__figure">
              <img src={selectedCert.src} alt={selectedCert.label} />
              <figcaption>
                <BadgeCheck size={18} aria-hidden="true" />
                {selectedCert.label}
              </figcaption>
            </figure>
          </div>,
          document.body,
        )}
      </>
    )
  }

  return (
    <div
      className="cert-carousel"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { dragRef.current.active = false }}
    >
      <div className="cert-carousel__viewport">
        <button
          className="cert-carousel__arrow cert-carousel__arrow--previous"
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => goTo(activeIdx - 1)}
          aria-label={isAr ? 'الوثيقة السابقة' : 'Previous document'}
        >
          {isAr ? <ChevronRight /> : <ChevronLeft />}
        </button>

        <div className="cert-carousel__track">
          {items.map((cert, index) => {
            const position = getSlidePosition(index)
            const label = t(cert.labelKey)
            return (
              <article
                key={cert.labelKey}
                className={`cert-carousel__card cert-carousel__card--${position}`}
                aria-hidden={position === 'hidden'}
                role={position === 'active' ? 'button' : undefined}
                tabIndex={position === 'active' ? 0 : -1}
                aria-label={position === 'active' ? `${label} — ${isAr ? 'فتح الوثيقة' : 'Open document'}` : undefined}
                onClick={() => {
                  if (suppressClickRef.current) return
                  if (position === 'active') setSelectedCert({ ...cert, label })
                  else if (position !== 'hidden') goTo(index)
                }}
                onKeyDown={(event) => {
                  if (position === 'active' && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault()
                    setSelectedCert({ ...cert, label })
                  }
                }}
              >
                <div className="cert-carousel__paper">
                  <img src={cert.src} alt={label} draggable={false} />
                  {position === 'active' && (
                    <span className="cert-carousel__zoom" aria-hidden="true">
                      <ZoomIn size={18} strokeWidth={1.8} />
                    </span>
                  )}
                </div>
                <div className="cert-carousel__card-info">
                  <span className="cert-carousel__badge">
                    <FileCheck2 size={14} aria-hidden="true" />
                    {isAr ? 'وثيقة جودة' : 'Quality document'}
                  </span>
                  <h3><BadgeCheck size={18} aria-hidden="true" />{label}</h3>
                </div>
              </article>
            )
          })}
        </div>

        <button
          className="cert-carousel__arrow cert-carousel__arrow--next"
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => goTo(activeIdx + 1)}
          aria-label={isAr ? 'الوثيقة التالية' : 'Next document'}
        >
          {isAr ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      <div className="cert-carousel__footer">
        <div className="cert-carousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`cert-carousel__dot${activeIdx === i ? ' cert-carousel__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={t(items[i].labelKey)}
            />
          ))}
        </div>
      </div>

      {selectedCert && createPortal(
        <div
          className="cert-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.label}
          onPointerDown={(event) => event.stopPropagation()}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCert(null)
          }}
        >
          <button
            className="cert-lightbox__close"
            type="button"
            onClick={() => setSelectedCert(null)}
            aria-label={isAr ? 'إغلاق' : 'Close'}
            autoFocus
          >
            <X size={22} />
          </button>
          <figure className="cert-lightbox__figure">
            <img src={selectedCert.src} alt={selectedCert.label} />
            <figcaption><BadgeCheck size={18} aria-hidden="true" />{selectedCert.label}</figcaption>
          </figure>
        </div>,
        document.body,
      )}
    </div>
  )
}
