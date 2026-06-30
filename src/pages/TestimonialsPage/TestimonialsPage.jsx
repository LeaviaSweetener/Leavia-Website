import { useLanguage } from '../../context/LanguageContext'
import Testimonials from '../../components/Testimonials/Testimonials'
import CTA from '../../components/CTA/CTA'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'

export default function TestimonialsPage() {
  const { t } = useLanguage()

  return (
    <div className="page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">{t('testp_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              {t('testp_title')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              {t('testp_subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </div>
  )
}
