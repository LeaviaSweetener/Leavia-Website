import Hero from '../../components/Hero/Hero'
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
      <Hero />
      <ValueProp />
      <WhyBetter />
      <Benefits />
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
