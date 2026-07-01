import Hero from '../../components/Hero/Hero'
import BrandSection from '../../components/BrandSection/BrandSection'
import ValueProp from '../../components/ValueProp/ValueProp'
import WhyBetter from '../../components/WhyBetter/WhyBetter'
import Benefits from '../../components/Benefits/Benefits'
import Ingredients from '../../components/Ingredients/Ingredients'
import Testimonials from '../../components/Testimonials/Testimonials'
import FAQ from '../../components/FAQ/FAQ'
import CTA from '../../components/CTA/CTA'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import { useLanguage } from '../../context/LanguageContext'

export default function Home() {
  const { t } = useLanguage()

  return (
    <>
      <BrandSection />

      <Hero />
      <ValueProp />
      <WhyBetter />
      <Benefits />
      {/* Nature & Formula section */}
      <section style={{ background: 'var(--gradient-hero)', padding: '5rem 0 0' }}>
        <div className="container">
          <SectionTitle
            overline={t('ing_nature_overline')}
            title={t('ing_nature_title')}
            subtitle={t('ing_nature_body')}
          />
        </div>

        {/* Gold divider that flows into ingredients */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '3rem 2rem 0', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
          <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M12 2 C15 4 19 9 19 14 C19 18 16 21 12 22 C8 21 5 18 5 14 C5 9 9 4 12 2Z" fill="rgba(201,168,76,0.6)" stroke="rgba(201,168,76,0.9)" strokeWidth="0.8"/>
            <line x1="12" y1="2.5" x2="12" y2="22" stroke="rgba(201,168,76,0.7)" strokeWidth="0.7"/>
          </svg>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)' }} />
        </div>
      </section>

      <Ingredients />
      <Testimonials />

      {/* Quick FAQ preview on home */}
      <section className="section section--dark" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionTitle
            overline={t('home_faq_overline')}
            title={t('home_faq_title')}
            subtitle={t('home_faq_subtitle')}
          />
          <FAQ limit={4} />
        </div>
      </section>

      <CTA />
    </>
  )
}
