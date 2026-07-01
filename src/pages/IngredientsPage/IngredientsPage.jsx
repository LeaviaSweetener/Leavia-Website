import { useLanguage } from '../../context/LanguageContext'
import Ingredients from '../../components/Ingredients/Ingredients'
import CTA from '../../components/CTA/CTA'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'

export default function IngredientsPage() {
  const { t } = useLanguage()

  return (
    <div className="page-wrapper">
      {/* Nature & Formula section */}
      <section style={{ background: 'var(--gradient-hero)', paddingTop: '8rem', paddingBottom: '0' }}>
        <div className="container">
          <SectionTitle
            overline={t('ing_nature_overline')}
            title={t('ing_nature_title')}
            subtitle={t('ing_nature_body')}
          />
        </div>
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
      <CTA />
    </div>
  )
}
