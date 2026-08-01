import { Link } from 'react-router-dom'
import { Mail, Smartphone } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import { CONTACT_DETAILS, getLocalizedLogoPath, ROUTES } from '../../config/site'
import WhatsAppLink from '../shared/WhatsAppLink/WhatsAppLink'
import './Footer.css'

const FOOTER_LINK_GROUPS = [
  {
    headingKey: 'footer_col_product',
    links: [
      { labelKey: 'footer_link_product_details', path: ROUTES.product },
      { labelKey: 'footer_link_research', path: ROUTES.research },
      { labelKey: 'footer_link_shop', path: ROUTES.purchase },
    ],
  },
  {
    headingKey: 'footer_col_company',
    links: [
      { labelKey: 'footer_link_about', path: ROUTES.about },
      { labelKey: 'footer_link_mission', path: `${ROUTES.about}#mission` },
    ],
  },
  {
    headingKey: 'footer_col_support',
    links: [
      { labelKey: 'footer_link_contact', path: ROUTES.contact },
      { labelKey: 'footer_link_faq', path: `${ROUTES.home}#faq` },
    ],
  },
]

const FOOTER_CERTIFICATES = [
  { labelKey: 'footer_cert_usda', certificate: 'fssc', ltrLabel: 'FSSC 22000' },
  { labelKey: 'footer_cert_nongmo', certificate: 'cgmp' },
  { labelKey: 'footer_cert_vegan', certificate: 'haccp' },
  { labelKey: 'footer_cert_kosher', certificate: 'food' },
  { labelKey: 'footer_cert_halal', certificate: 'halal' },
]

export default function Footer() {
  const { t, isAr } = useLanguage()

  return (
    <footer className="footer">
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand column */}
            <div className="footer__brand">
              <Link
                to={ROUTES.home}
                className="footer__logo"
                aria-label={
                  isAr
                    ? 'شعار ليفيا، العودة إلى الصفحة الرئيسية'
                    : 'LEAVIA Logo, return to the home page'
                }
              >
                <span className="footer__localized-logo-frame">
                  <img
                    key={isAr ? 'footer-logo-ar' : 'footer-logo-en'}
                    src={getLocalizedLogoPath(isAr)}
                    alt={isAr ? 'ليفيا' : 'LEAVIA'}
                    className="footer__localized-logo-image"
                  />
                </span>
              </Link>

              <p className="footer__tagline">
                {t('footer_tagline')}
              </p>

              <div className="footer__certifications">
                {FOOTER_CERTIFICATES.map(({ labelKey, certificate, ltrLabel }) => (
                  <Link
                    key={certificate}
                    to={`${ROUTES.research}?certificate=${certificate}`}
                    className={`footer__cert ${ltrLabel ? 'footer__cert--ltr' : ''}`}
                    lang={ltrLabel ? 'en' : undefined}
                    dir={ltrLabel ? 'ltr' : undefined}
                    data-no-localize={ltrLabel ? true : undefined}
                    aria-label={`${t(labelKey)} — ${isAr ? 'عرض الشهادة' : 'View certificate'}`}
                  >
                    {ltrLabel || t(labelKey)}
                  </Link>
                ))}
              </div>

              {/* Direct contact */}
              <div className="footer__social">
                <a
                  href={CONTACT_DETAILS.emailHref}
                  className="footer__social-link"
                  aria-label={isAr ? 'إرسال بريد إلكتروني إلى ليفيا' : 'Email LEAVIA'}
                >
                  <Mail size={18} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <a
                  href={CONTACT_DETAILS.phoneHref}
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
            {FOOTER_LINK_GROUPS.map(
              ({ headingKey, links }) => (
                <div
                  key={headingKey}
                  className="footer__col"
                >
                  <h4 className="footer__heading">
                    {t(headingKey)}                  </h4>

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
