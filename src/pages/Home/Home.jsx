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
import TransitionDivider from '../../components/shared/TransitionDivider/TransitionDivider'
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
      <section style={{ position: 'relative', background: 'var(--gradient-hero)', padding: '5rem 0 0', display: 'flow-root' }}>
        <div className="container">
          <SectionTitle
            overline={t('ing_nature_overline')}
            title={t('ing_nature_title')}
            subtitle={t('ing_nature_body')}
          />
        </div>

        <TransitionDivider atSectionEnd />
      </section>

      <Ingredients />
      <Testimonials />

      {/* Quick FAQ preview on home */}
      <section id="faq" className="section section--dark" style={{ paddingTop: '5rem', paddingBottom: '5rem', scrollMarginTop: 'var(--nav-height)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <SectionTitle
            overline={t('home_faq_overline')}
            title={t('home_faq_title')}
            subtitle={t('home_faq_subtitle')}
          />
          <FAQ limit={4} />
        </div>
        <TransitionDivider atSectionEnd />
      </section>

      <CTA />
    </>
  )
}
