import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './Navigation.css'

const NAV_KEYS = [
  { key: 'nav_home', path: '/' },
  { key: 'nav_about', path: '/about' },
  { key: 'nav_benefits', path: '/benefits' },
  { key: 'nav_ingredients', path: '/ingredients' },
  { key: 'nav_research', path: '/research' },
  { key: 'nav_testimonials', path: '/testimonials' },
  { key: 'nav_faq', path: '/faq' },
  { key: 'nav_contact', path: '/contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const { t, toggleLang, lang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 50)
      setHidden(currentY > lastScrollY.current && currentY > 300)
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.style.overflow = ''
  }, [location])

  const toggleMobile = useCallback(() => {
    setMobileOpen(prev => {
      document.body.style.overflow = prev ? '' : 'hidden'
      return !prev
    })
  }, [])

  return (
    <>
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden ? 'nav--hidden' : ''}`}>
        <div className="nav__container">
          {/* Logo */}
          <Link to="/" className="nav__logo">
            <span className="nav__logo-icon">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20 4C26 4 34 12 34 22C34 30 28 36 20 36C12 36 6 30 6 22C6 12 14 4 20 4Z"
                  fill="url(#leafGrad)"
                />
                <path d="M20 4 L20 36" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3,3" />
                <path d="M12 16 Q20 10 28 16" stroke="#c9a84c" strokeWidth="1.2" fill="none" />
                <defs>
                  <linearGradient id="leafGrad" x1="6" y1="4" x2="34" y2="36">
                    <stop offset="0%" stopColor="#1D783B" />
                    <stop offset="100%" stopColor="#14542A" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span className="nav__logo-text">
              <span className="nav__logo-leavia">Leavia</span>
              <span className="nav__logo-sub">{t('nav_logo_sub')}</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav__links">
            {NAV_KEYS.map(({ key, path }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`nav__link ${location.pathname === path ? 'nav__link--active' : ''}`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA + Language toggle */}
          <div className="nav__actions">
            <Link to="/purchase" className="nav__cta">
              <span>{t('nav_shop_now')}</span>
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Language toggle button */}
            <button
              className="nav__lang-btn"
              onClick={toggleLang}
              aria-label={t('nav_lang_switch')}
              title={t('nav_lang_switch')}
            >
              <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M10 1.5C10 1.5 7 5 7 10s3 8.5 3 8.5M10 1.5C10 1.5 13 5 13 10s-3 8.5-3 8.5M1.5 10h17M2 6.5h16M2 13.5h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>{t('nav_lang_label')}</span>
            </button>

            {/* Hamburger */}
            <button
              className={`nav__hamburger ${mobileOpen ? 'nav__hamburger--open' : ''}`}
              onClick={toggleMobile}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`nav__mobile ${mobileOpen ? 'nav__mobile--open' : ''}`}>
        <div className="nav__mobile-inner">
          <ul className="nav__mobile-links">
            {NAV_KEYS.map(({ key, path }, i) => (
              <li
                key={path}
                style={{ transitionDelay: `${i * 0.06}s` }}
                className={mobileOpen ? 'visible' : ''}
              >
                <Link
                  to={path}
                  className={`nav__mobile-link ${location.pathname === path ? 'nav__mobile-link--active' : ''}`}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-cta">
            <Link to="/purchase" className="btn btn--gold btn--lg">
              {t('nav_mobile_shop')}
            </Link>
          </div>
          <div className="nav__mobile-footer">
            <button className="nav__mobile-lang" onClick={toggleLang}>
              <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M10 1.5C10 1.5 7 5 7 10s3 8.5 3 8.5M10 1.5C10 1.5 13 5 13 10s-3 8.5-3 8.5M1.5 10h17M2 6.5h16M2 13.5h16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span>{lang === 'en' ? 'عربي' : 'English'}</span>
            </button>
            <p className="nav__mobile-tagline">{t('nav_mobile_tagline')}</p>
          </div>
        </div>
      </div>
    </>
  )
}
