import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLanguage()

  const LINKS = {
    [t('footer_col_product')]: [
      { labelKey: 'footer_link_product_details', path: '/product' },
      { labelKey: 'footer_link_ingredients', path: '/ingredients' },
      { labelKey: 'footer_link_benefits', path: '/benefits' },
      { labelKey: 'footer_link_research', path: '/research' },
      { labelKey: 'footer_link_shop', path: '/purchase' },
    ],
    [t('footer_col_company')]: [
      { labelKey: 'footer_link_about', path: '/about' },
      { labelKey: 'footer_link_mission', path: '/about#mission' },
      { labelKey: 'footer_link_sustainability', path: '/about#sustainability' },
      { labelKey: 'footer_link_press', path: '/contact' },
    ],
    [t('footer_col_support')]: [
      { labelKey: 'footer_link_faq', path: '/faq' },
      { labelKey: 'footer_link_contact', path: '/contact' },
      { labelKey: 'footer_link_testimonials', path: '/testimonials' },
      { labelKey: 'footer_link_track', path: '/contact' },
    ],
  }

  const CERTS = [
    'footer_cert_usda',
    'footer_cert_nongmo',
    'footer_cert_vegan',
    'footer_cert_kosher',
    'footer_cert_halal',
  ]

  return (
    <footer className="footer">
      {/* Top wave */}
      <div className="footer__wave">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#0b2e15"/>
        </svg>
      </div>

      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <svg viewBox="0 0 36 44" fill="none" width="32" height="40">
                  <path d="M20 38 C28 30 30 16 24 7 C22 2 17 0 15 5 C11 14 13 30 20 38Z" fill="#5a9a6a" opacity="0.65"/>
                  <path d="M16 36 C8 28 6 14 12 5 C14 0 19 -2 21 3 C25 12 23 28 16 36Z" fill="#5a9a6a"/>
                  <path d="M18 37 L18 43" stroke="#5a9a6a" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <div>
                  <span className="footer__logo-name">Leavia</span>
                  <span className="footer__logo-sub">{t('nav_logo_sub')}</span>
                </div>
              </Link>

              <p className="footer__tagline">{t('footer_tagline')}</p>

              <div className="footer__certifications">
                {CERTS.map((key) => (
                  <span key={key} className="footer__cert">{t(key)}</span>
                ))}
              </div>

              {/* Social */}
              <div className="footer__social">
                {[
                  { name: 'Instagram', icon: 'M12 2.2C6.5 2.2 2.2 6.5 2.2 12s4.3 9.8 9.8 9.8 9.8-4.3 9.8-9.8S17.5 2.2 12 2.2zm0 3.6c1.8 0 2 0 2.8.04 1.6.07 2.4.35 3 .58.7.27 1.3.6 1.9 1.2.6.6.93 1.2 1.2 1.9.23.6.5 1.4.58 3 .04.8.04 1 .04 2.8s0 2-.04 2.8c-.07 1.6-.35 2.4-.58 3-.27.7-.6 1.3-1.2 1.9-.6.6-1.2.93-1.9 1.2-.6.23-1.4.5-3 .58-.8.04-1 .04-2.8.04s-2 0-2.8-.04c-1.6-.07-2.4-.35-3-.58-.7-.27-1.3-.6-1.9-1.2-.6-.6-.93-1.2-1.2-1.9-.23-.6-.5-1.4-.58-3C5.8 14 5.8 13.8 5.8 12s0-2 .04-2.8c.07-1.6.35-2.4.58-3 .27-.7.6-1.3 1.2-1.9.6-.6 1.2-.93 1.9-1.2.6-.23 1.4-.5 3-.58.8-.04 1-.04 2.8-.04zm0 2.4A3.8 3.8 0 1 0 12 15.8 3.8 3.8 0 0 0 12 8.2zm0 6.2a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8zm4.7-5.9a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z' },
                  { name: 'Facebook', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                  { name: 'Twitter/X', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                ].map((social) => (
                  <a key={social.name} href="#" className="footer__social-link" aria-label={social.name}>
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d={social.icon}/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation columns */}
            {Object.entries(LINKS).map(([heading, links]) => (
              <div key={heading} className="footer__col">
                <h4 className="footer__heading">{heading}</h4>
                <ul className="footer__links">
                  {links.map((link) => (
                    <li key={link.path}>
                      <Link to={link.path} className="footer__link">{t(link.labelKey)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="footer__newsletter">
              <h4 className="footer__heading">{t('footer_newsletter_heading')}</h4>
              <p className="footer__newsletter-text">{t('footer_newsletter_text')}</p>
              <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder={t('footer_newsletter_placeholder')}
                  className="footer__input"
                  aria-label="Email for newsletter"
                />
                <button type="submit" className="footer__form-btn">→</button>
              </form>
              <p className="footer__form-note">{t('footer_newsletter_note')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>© {new Date().getFullYear()} Leavia Natural Sweetener. All rights reserved.</p>
            <div className="footer__legal">
              <a href="#">{t('footer_privacy')}</a>
              <a href="#">{t('footer_terms')}</a>
              <a href="#">{t('footer_cookies')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
