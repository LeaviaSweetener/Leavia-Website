import { useState, useEffect, useCallback, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './Navigation.css'

const NAV_KEYS = [
  { key: 'nav_home', path: '/' },
  { key: 'nav_about', path: '/about' },
  { key: 'nav_product', path: '/product' },
  { key: 'nav_research', path: '/research' },
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
          <Link to="/" className="nav__logo" aria-label="Leavia">
            <img
              src={lang === 'ar' ? '/logos/logo-ar-white.png' : '/logos/logo-en-white.png'}
              alt="Leavia"
              className="nav__logo-img"
            />
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
