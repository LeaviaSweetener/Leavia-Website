import { useLanguage } from '../../context/LanguageContext'
import Contact from '../../components/Contact/Contact'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import TransitionDivider from '../../components/shared/TransitionDivider/TransitionDivider'
import { CONTACT_DETAILS } from '../../config/site'
import './ContactPage.css'

export default function ContactPage() {
  const { t, isAr } = useLanguage()

  return (
    <div className="contact-page page-wrapper">
      <section className="contact-page__hero section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">{t('cp_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              {t('cp_title')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '560px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              {t('cp_subtitle')}
            </p>
          </ScrollReveal>
        </div>
        <TransitionDivider atSectionEnd />
      </section>

      <section className="contact-page__connect section section--dark">
        <div className="container">
          <div className="contact-page__layout">
            {/* Info column */}
            <div className="contact-page__info">
              <ScrollReveal direction="left">
                <SectionTitle
                  overline={t('cp_contact_overline')}
                  title={t('cp_contact_title')}
                  align={isAr ? 'right' : 'left'}
                  titleMaxWidth="400px"
                />
              </ScrollReveal>

              <div className="contact-page__cards">
                <ScrollReveal direction="left">
                  <div className="contact-page__info-card">
                    <span className="contact-page__info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M3 6.5h18v11H3z" stroke="currentColor" strokeWidth="1.7" />
                        <path d="m4 7.5 8 6 8-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="contact-page__info-content">
                      <span className="contact-page__info-label">{t('cp_email_label')}</span>
                      <a
                        className="contact-page__info-value contact-page__info-value--email"
                        href={CONTACT_DETAILS.emailHref}
                        dir="ltr"
                        lang="en"
                        data-no-localize
                      >
                        {CONTACT_DETAILS.email}
                      </a>
                      <span className="contact-page__info-sub">{t('cp_email_sub')}</span>
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal direction="left">
                  <div className="contact-page__info-card">
                    <span className="contact-page__info-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M7.2 3.5 10 7.7 8.2 9.5c1.2 2.4 3.9 5.1 6.3 6.3l1.8-1.8 4.2 2.8c.2 2-1.7 4-3.8 3.7C10 19.5 4.5 14 3.5 7.3c-.3-2.1 1.7-4 3.7-3.8Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <div className="contact-page__info-content">
                      <span className="contact-page__info-label">{t('cp_phone_label')}</span>
                      <a className="contact-page__info-value contact-page__info-value--phone" href={CONTACT_DETAILS.phoneHref} dir="ltr" lang="en" data-no-localize>{CONTACT_DETAILS.phone}</a>
                      <span className="contact-page__info-sub">{t('cp_phone_sub')}</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Form column */}
            <ScrollReveal direction="right" className="contact-page__form-column">
              <div className="contact-page__form-wrap">
                <Contact />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
