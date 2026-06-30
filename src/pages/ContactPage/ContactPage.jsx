import { useLanguage } from '../../context/LanguageContext'
import Contact from '../../components/Contact/Contact'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import './ContactPage.css'

export default function ContactPage() {
  const { t } = useLanguage()

  const CONTACT_INFO = [
    { icon: '📧', labelKey: 'cp_email_label', value: 'hello@leaviasweetener.com', subKey: 'cp_email_sub' },
    { icon: '📞', labelKey: 'cp_phone_label', value: '1-800-Leavia-01', subKey: 'cp_phone_sub' },
    { icon: '📦', labelKey: 'cp_orders_label', value: 'orders@leaviasweetener.com', subKey: 'cp_orders_sub' },
  ]

  return (
    <div className="contact-page page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
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
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="contact-page__layout">
            {/* Info column */}
            <div className="contact-page__info">
              <ScrollReveal direction="left">
                <SectionTitle
                  overline={t('cp_contact_overline')}
                  title={t('cp_contact_title')}
                  align="left"
                  titleMaxWidth="400px"
                />
              </ScrollReveal>

              <div className="contact-page__info-cards">
                {CONTACT_INFO.map((info, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} direction="left">
                    <div className="contact-page__info-card">
                      <span className="contact-page__info-icon">{info.icon}</span>
                      <div>
                        <span className="contact-page__info-label">{t(info.labelKey)}</span>
                        <strong className="contact-page__info-value">{info.value}</strong>
                        <span className="contact-page__info-sub">{t(info.subKey)}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4} direction="left">
                <div className="contact-page__hours">
                  <h4>{t('cp_hours_title')}</h4>
                  <p>{t('cp_hours_mf')}</p>
                  <p>{t('cp_hours_sat')}</p>
                  <p>{t('cp_hours_sun')}</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Form column */}
            <ScrollReveal direction="right">
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
