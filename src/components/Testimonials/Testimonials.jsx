import { useState, useEffect, useCallback } from 'react'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Testimonials.css'

function StarRating({ rating }) {
  return (
    <div className="testimonial__stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" width="14" height="14" fill={i < rating ? '#d4af37' : 'rgba(255,255,255,0.15)'}>
          <path d="M8 1l1.85 3.75 4.15.6-3 2.9.7 4.1L8 10.35l-3.7 1.95.7-4.1L2 5.35l4.15-.6z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [isAuto, setIsAuto] = useState(true)
  const { t, testimonialsData } = useLanguage()

  const next = useCallback(() => {
    setActive((i) => (i + 1) % testimonialsData.length)
  }, [testimonialsData.length])

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + testimonialsData.length) % testimonialsData.length)
  }, [testimonialsData.length])

  useEffect(() => {
    if (!isAuto) return
    const timer = setInterval(next, 5500)
    return () => clearInterval(timer)
  }, [next, isAuto])

  const testimonial = testimonialsData[active]

  return (
    <section className="testimonials section section--cream">
      <div className="container">
        <SectionTitle
          overline={t('test_overline')}
          title={t('test_title')}
          subtitle={t('test_subtitle')}
          theme="light"
        />

        {/* Main Testimonial */}
        <ScrollReveal>
          <div
            className="testimonials__main"
            onMouseEnter={() => setIsAuto(false)}
            onMouseLeave={() => setIsAuto(true)}
          >
            {/* Large quote */}
            <div className="testimonials__quote-mark">"</div>

            <div className="testimonials__body" key={active}>
              <StarRating rating={testimonial.rating} />

              <blockquote className="testimonials__text">
                {testimonial.review}
              </blockquote>

              <div className="testimonials__author">
                <div
                  className="testimonials__avatar"
                  style={{ background: `linear-gradient(135deg, ${testimonial.avatarColor}, ${testimonial.avatarColor}aa)` }}
                >
                  {testimonial.avatar}
                </div>
                <div className="testimonials__author-info">
                  <strong className="testimonials__author-name">{testimonial.name}</strong>
                  <span className="testimonials__author-role">{testimonial.role}</span>
                  <span className="testimonials__author-location">📍 {testimonial.location}</span>
                </div>
                <div className="testimonials__tag-wrap">
                  <span className="testimonials__tag">{testimonial.tag}</span>
                  {testimonial.verified && (
                    <span className="testimonials__verified">
                      <svg viewBox="0 0 16 16" fill="none" width="12" height="12">
                        <path d="M8 1l2 3 3.5.5-2.5 2.5.5 3.5L8 9l-3.5 2 .5-3.5L2.5 5 6 4.5z" fill="#4caf50"/>
                      </svg>
                      {t('test_verified')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="testimonials__nav">
              <button className="testimonials__nav-btn" onClick={prev} aria-label="Previous">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M13 4l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="testimonials__dots">
                {testimonialsData.map((_, i) => (
                  <button
                    key={i}
                    className={`testimonials__dot ${active === i ? 'testimonials__dot--active' : ''}`}
                    onClick={() => { setActive(i); setIsAuto(false) }}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button className="testimonials__nav-btn" onClick={next} aria-label="Next">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Mini cards grid */}
        <div className="testimonials__mini-grid">
          {testimonialsData.slice(0, 3).map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 0.1}>
              <button
                className={`testimonials__mini ${active === i ? 'testimonials__mini--active' : ''}`}
                onClick={() => { setActive(i); setIsAuto(false) }}
              >
                <div
                  className="testimonials__mini-avatar"
                  style={{ background: item.avatarColor }}
                >
                  {item.avatar}
                </div>
                <div className="testimonials__mini-info">
                  <strong>{item.name.split(' ')[0]}</strong>
                  <StarRating rating={item.rating} />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
