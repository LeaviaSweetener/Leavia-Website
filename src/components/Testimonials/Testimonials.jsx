import { useState, useEffect, useCallback } from 'react'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import {
  BadgeCheck,
  CakeSlice,
  ChefHat,
  Coffee,
  CupSoda,
  Factory,
  GlassWater,
  MapPin,
  UtensilsCrossed,
} from 'lucide-react'
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

const USAGE_ITEMS = [
  { key: 'test_usage_0', icon: CupSoda },
  { key: 'test_usage_1', icon: Coffee },
  { key: 'test_usage_2', icon: GlassWater },
  { key: 'test_usage_3', icon: CakeSlice },
  { key: 'test_usage_4', icon: ChefHat },
  { key: 'test_usage_5', icon: UtensilsCrossed },
  { key: 'test_usage_6', icon: Factory },
]

const TESTIMONIAL_ICONS = [
  CupSoda,
  Coffee,
  CakeSlice,
  ChefHat,
  Factory,
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [isAuto, setIsAuto] = useState(true)
  const { t, testimonialsData, isAr } = useLanguage()

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
  const TestimonialIcon = TESTIMONIAL_ICONS[active % TESTIMONIAL_ICONS.length]

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
                  aria-hidden="true"
                >
                  <TestimonialIcon size={27} strokeWidth={1.8} />
                </div>
                <div className="testimonials__author-info">
                  <strong className="testimonials__author-name">{testimonial.name}</strong>
                  <span className="testimonials__author-role">{testimonial.role}</span>
                  <span className="testimonials__author-location"><MapPin size={13} strokeWidth={1.9} aria-hidden="true" /> {testimonial.location}</span>
                </div>
                <div className="testimonials__tag-wrap">
                  <span className="testimonials__tag">{testimonial.tag}</span>
                  {testimonial.verified && (
                    <span className="testimonials__verified">
                      <BadgeCheck size={13} strokeWidth={1.9} aria-hidden="true" />
                      {t('test_verified')}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="testimonials__nav">
              <button className="testimonials__nav-btn" onClick={prev} aria-label={isAr ? 'الاستخدام السابق' : 'Previous application'}>
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
                    aria-label={isAr ? `عرض الاستخدام ${i + 1}` : `View application ${i + 1}`}
                  />
                ))}
              </div>

              <button className="testimonials__nav-btn" onClick={next} aria-label={isAr ? 'الاستخدام التالي' : 'Next application'}>
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Uses grid */}
        <div className="testimonials__uses-heading">
          <h3>{t('test_uses_title')}</h3>
          <p>{t('test_uses_description')}</p>
        </div>

        <div className="testimonials__mini-grid">
          {USAGE_ITEMS.map((item, i) => {
            const UsageIcon = item.icon
            return (
              <ScrollReveal key={item.key} delay={i * 0.06}>
                <div className="testimonials__mini">
                  <div className="testimonials__mini-avatar" aria-hidden="true">
                    <UsageIcon size={19} strokeWidth={1.9} />
                  </div>
                  <div className="testimonials__mini-info">
                    <strong>{t(item.key)}</strong>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
