import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Product3D from '../Product3D/Product3D'
import { useLanguage } from '../../context/LanguageContext'
import './Hero.css'

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)
  const { t } = useLanguage()

  const HERO_WORDS = [
    t('hero_word_0'),
    t('hero_word_1'),
    t('hero_word_2'),
    t('hero_word_3'),
  ]

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % HERO_WORDS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      {/* Background layers */}
      <div className="hero__bg">
        <div className="hero__bg-gradient" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      <div className="hero__container">
        {/* Left — text content */}
        <div className={`hero__content ${mounted ? 'hero__content--mounted' : ''}`}>
          {/* Overline */}
          <div className="hero__overline">
            <span className="hero__overline-dot" />
            <span>{t('hero_overline')}</span>
            <span className="hero__overline-line" />
          </div>

          {/* Main Headline */}
          <h1 className="hero__title">
            <span className="hero__title-row">{t('hero_title_1')}</span>
            <span className="hero__title-row hero__title-row--italic">{t('hero_title_2')}</span>
            <span className="hero__title-row">{t('hero_title_3')}</span>
          </h1>

          {/* Dynamic word */}
          <div className="hero__dynamic">
            <span className="hero__dynamic-prefix">{t('hero_dynamic_prefix')}</span>
            <span className="hero__dynamic-word" key={wordIndex}>
              {HERO_WORDS[wordIndex]}
            </span>
          </div>

          {/* Divider */}
          <div className="hero__divider" />

          {/* Subtitle */}
          <p className="hero__subtitle">{t('hero_subtitle')}</p>

          {/* Stats row */}
          <div className="hero__stats">
            {[
              { value: '0', labelKey: 'hero_stat_calories' },
              { value: '0', labelKey: 'hero_stat_gi' },
              { value: '5', labelKey: 'hero_stat_ingredients' },
              { value: '1:1', labelKey: 'hero_stat_replacement' },
            ].map((stat) => (
              <div key={stat.labelKey} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hero__actions">
            <Link to="/purchase" className="hero__btn hero__btn--primary">
              <span>{t('hero_btn_shop')}</span>
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hero__btn-shine" />
            </Link>
            <Link to="/about" className="hero__btn hero__btn--ghost">
              <span>{t('hero_btn_story')}</span>
            </Link>
          </div>

        </div>

        {/* Right — 3D Product */}
        <div className={`hero__product ${mounted ? 'hero__product--mounted' : ''}`}>
          <div className="hero__product-badge">
            <span>{t('hero_360')}</span>
            <svg viewBox="0 0 20 20" fill="none" width="12" height="12">
              <path d="M10 2C5.5 2 2 5.5 2 10s3.5 8 8 8 8-3.5 8-8-3.5-8-8-8z" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>

          <Product3D />

          {/* Floating info cards */}
          <div className="hero__card hero__card--tl">
            <span className="hero__card-icon">🌿</span>
            <div>
              <strong>{t('hero_card_monk')}</strong>
              <span>{t('hero_card_monk_sub')}</span>
            </div>
          </div>
          <div className="hero__card hero__card--br">
            <span className="hero__card-icon">✨</span>
            <div>
              <strong>{t('hero_card_zero')}</strong>
              <span>{t('hero_card_zero_sub')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-line" />
        <span>{t('hero_scroll')}</span>
      </div>

      {/* Bottom wave — premium glass transition */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 130" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Vertical gradient: transparent at wave crest → solid white at bottom */}
            <linearGradient id="waveGradMain" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.0)" />
              <stop offset="55%"  stopColor="rgba(255,255,255,0.55)" />
              <stop offset="100%" stopColor="rgba(255,255,255,1)" />
            </linearGradient>
            {/* Soft glass sheen — lighter wave layer */}
            <linearGradient id="waveGradGlass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.28)" />
            </linearGradient>
            {/* Subtle green-tinted shimmer at the very crest */}
            <linearGradient id="waveGradCrest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(200,235,210,0.0)" />
              <stop offset="100%" stopColor="rgba(200,235,210,0.18)" />
            </linearGradient>
            {/* Blur filter for glass depth */}
            <filter id="waveBlur" x="-5%" y="-20%" width="110%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
            </filter>
          </defs>

          {/* ── Layer 1 (deepest) — solid white base, ensures seamless blend ── */}
          <path
            d="M0,80 C240,118 540,42 720,78 C900,114 1200,38 1440,78 L1440,130 L0,130 Z"
            fill="white"
          />

          {/* ── Layer 2 — gradient glass wave, slightly different shape ── */}
          <path
            d="M0,68 C260,108 520,28 760,70 C980,108 1200,32 1440,66 L1440,130 L0,130 Z"
            fill="url(#waveGradMain)"
            opacity="0.9"
          />

          {/* ── Layer 3 — blurred ghost wave for depth ── */}
          <path
            d="M0,55 C200,95 500,18 740,58 C960,95 1220,22 1440,55 L1440,130 L0,130 Z"
            fill="url(#waveGradGlass)"
            filter="url(#waveBlur)"
          />

          {/* ── Layer 4 — green-tinted crest shimmer ── */}
          <path
            d="M0,48 C180,85 480,10 720,48 C940,84 1230,14 1440,48 L1440,65 C1230,30 940,98 720,65 C480,28 180,99 0,65 Z"
            fill="url(#waveGradCrest)"
            opacity="0.7"
          />

          {/* ── Layer 5 — thin highlight line at the very crest ── */}
          <path
            d="M0,46 C180,83 480,8 720,46 C940,82 1230,12 1440,46"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </section>
  )
}
