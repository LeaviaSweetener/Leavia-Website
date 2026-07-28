import { Link } from 'react-router-dom'
import { Mail, Smartphone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import WhatsAppLink from '../shared/WhatsAppLink/WhatsAppLink'
import './Footer.css'

export default function Footer() {
  const { t, isAr } = useLanguage()

  const LINKS = {
    [t('footer_col_product')]: [
      { labelKey: 'footer_link_product_details', path: '/product' },
      { labelKey: 'footer_link_research', path: '/research' },
      { labelKey: 'footer_link_shop', path: '/purchase' },
    ],
    [t('footer_col_company')]: [
      { labelKey: 'footer_link_about', path: '/about' },
      { labelKey: 'footer_link_mission', path: '/about#mission' },
    ],
    [t('footer_col_support')]: [
      { labelKey: 'footer_link_contact', path: '/contact' },
      { labelKey: 'footer_link_faq', path: '/#faq' },
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
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <Link
                to="/"
                className="footer__logo"
                aria-label={
                  isAr
                    ? 'شعار ليفيا، العودة إلى الصفحة الرئيسية'
                    : 'LEAVIA logo, return to the home page'
                }
              >
                <span className="footer__localized-logo-frame">
                  <img
                    key={isAr ? 'footer-logo-ar' : 'footer-logo-en'}
                    src={
                      isAr
                        ? '/logos/logo-ar-white.png'
                        : '/logos/logo-en-white.png'
                    }
                    alt={isAr ? 'ليفيا' : 'LEAVIA'}
                    className="footer__localized-logo-image"
                  />
                </span>
              </Link>

              <p className="footer__tagline">
                {t('footer_tagline')}
              </p>

              <div className="footer__certifications">
                {CERTS.map((key) =>
                  key === 'footer_cert_usda' ? (
                    <span
                      key={key}
                      className="footer__cert footer__cert--ltr"
                      lang="en"
                      dir="ltr"
                      data-no-localize
                    >
                      FSSC 22000
                    </span>
                  ) : (
                    <span
                      key={key}
                      className="footer__cert"
                    >
                      {t(key)}
                    </span>
                  )
                )}
              </div>

              {/* Direct contact */}
              <div className="footer__social">
                <a
                  href="mailto:info@leaviasweetener.com"
                  className="footer__social-link"
                  aria-label={isAr ? 'إرسال بريد إلكتروني إلى ليفيا' : 'Email LEAVIA'}
                >
                  <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <a
                  href="tel:0556090514"
                  className="footer__social-link"
                  aria-label={isAr ? 'الاتصال بليفيا' : 'Call LEAVIA'}
                >
                  <Smartphone size={18} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <WhatsAppLink
                  className="footer__social-link"
                  ariaLabel={isAr ? 'مراسلة ليفيا عبر واتساب' : 'Message LEAVIA on WhatsApp'}
                />
              </div>
            </div>

            {/* Navigation columns */}
            {Object.entries(LINKS).map(
              ([heading, links]) => (
                <div
                  key={heading}
                  className="footer__col"
                >
                  <h4 className="footer__heading">
                    {heading}
                  </h4>

                  <ul className="footer__links">
                    {links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="footer__link"
                        >
                          {t(link.labelKey)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}

            {/* Newsletter */}
            <div className="footer__newsletter">
              <h4 className="footer__heading">
                {t('footer_newsletter_heading')}
              </h4>

              <p className="footer__newsletter-text">
                {t('footer_newsletter_text')}
              </p>

              <form
                className="footer__form"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder={t(
                    'footer_newsletter_placeholder'
                  )}
                  className="footer__input"
                  aria-label={
                    isAr
                      ? 'البريد الإلكتروني لنشرة ليفيا'
                      : 'Email for the LEAVIA newsletter'
                  }
                />

                <button
                  type="submit"
                  className="footer__form-btn"
                  aria-label={t(
                    'footer_newsletter_button'
                  )}
                  title={t(
                    'footer_newsletter_button'
                  )}
                >
                  <span
                    className="footer__form-btn-icon"
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </form>

              <p className="footer__form-note">
                {t('footer_newsletter_note')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p>{t('footer_copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
