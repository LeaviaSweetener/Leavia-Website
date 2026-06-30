import { useLanguage } from '../../context/LanguageContext'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import CTA from '../../components/CTA/CTA'
import './Research.css'

const CATEGORY_COLORS = {
  Antioxidants: '#c9a84c',
  Diabetes: '#1D783B',
  'Gut Health': '#4caf50',
  Cardiovascular: '#e57373',
  'Dental Health': '#81c784',
  'Weight Management': '#d4af37',
}

const CATEGORY_KEYS = {
  Antioxidants: 'res_cat_antioxidants',
  Diabetes: 'res_cat_diabetes',
  'Gut Health': 'res_cat_gut',
  Cardiovascular: 'res_cat_cardio',
  'Dental Health': 'res_cat_dental',
  'Weight Management': 'res_cat_weight',
}

export default function Research() {
  const { t, researchData } = useLanguage()

  return (
    <div className="research page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">{t('res_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              {t('res_title')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '680px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              {t('res_subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle
            overline={t('res_evidence_overline')}
            title={t('res_evidence_title')}
            subtitle={t('res_evidence_subtitle')}
            theme="light"
          />

          <div className="research__grid">
            {researchData.map((study, i) => (
              <ScrollReveal key={study.id} delay={i * 0.08}>
                <article className="research__card">
                  <div className="research__card-header">
                    <span
                      className="research__category"
                      style={{ color: CATEGORY_COLORS[study.category] || '#1D783B', borderColor: CATEGORY_COLORS[study.category] || '#1D783B', background: `${CATEGORY_COLORS[study.category]}15` }}
                    >
                      {t(CATEGORY_KEYS[study.category] || study.category)}
                    </span>
                    <span className="research__year">{study.year}</span>
                  </div>

                  <h3 className="research__title">{study.title}</h3>
                  <p className="research__authors">{study.authors}</p>
                  <p className="research__journal">📖 {study.journal}</p>

                  <div className="research__divider" />

                  <p className="research__summary">{study.summary}</p>

                  <div className="research__finding">
                    <span className="research__finding-label">{t('res_key_finding')}</span>
                    <p className="research__finding-text">{study.keyFinding}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="research__disclaimer">
              <p>
                <strong>{t('res_disclaimer_note')}</strong> {t('res_disclaimer')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </div>
  )
}
