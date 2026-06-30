import Product3D from '../../components/Product3D/Product3D'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './ProductDetails.css'

const SPEC_KEYS = [
  ['pd_spec_0_label', 'pd_spec_0_value'],
  ['pd_spec_1_label', 'pd_spec_1_value'],
  ['pd_spec_2_label', 'pd_spec_2_value'],
  ['pd_spec_3_label', 'pd_spec_3_value'],
  ['pd_spec_4_label', 'pd_spec_4_value'],
  ['pd_spec_5_label', 'pd_spec_5_value'],
  ['pd_spec_6_label', 'pd_spec_6_value'],
  ['pd_spec_7_label', 'pd_spec_7_value'],
  ['pd_spec_8_label', 'pd_spec_8_value'],
  ['pd_spec_9_label', 'pd_spec_9_value'],
]

const CERT_KEYS = ['pd_cert_0', 'pd_cert_1', 'pd_cert_2', 'pd_cert_3', 'pd_cert_4', 'pd_cert_5']

const QUICK_FACTS = [
  { icon: '🌿', key: 'pd_fact_0' },
  { icon: '✨', key: 'pd_fact_1' },
  { icon: '💚', key: 'pd_fact_2' },
  { icon: '🏅', key: 'pd_fact_3' },
]

export default function ProductDetails() {
  const { t } = useLanguage()

  return (
    <div className="product-details page-wrapper">
      {/* Hero */}
      <section className="product-details__hero section section--dark">
        <div className="container">
          <div className="product-details__hero-layout">
            {/* 3D Product */}
            <div className="product-details__3d">
              <Product3D />
            </div>

            {/* Info */}
            <div className="product-details__info">
              <ScrollReveal direction="right">
                <span className="overline">{t('pd_overline')}</span>
                <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
                  {t('pd_title')}
                </h1>
                <p className="product-details__info-sub" style={{ color: 'var(--gold-warm)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  {t('pd_subtitle')}
                </p>

                <div className="product-details__quick-facts">
                  {QUICK_FACTS.map((fact) => (
                    <div key={fact.key} className="product-details__fact">
                      <span>{fact.icon}</span>
                      <span>{t(fact.key)}</span>
                    </div>
                  ))}
                </div>

                <div className="product-details__price-block">
                  <span className="product-details__price">$32.99</span>
                  <span className="product-details__price-note">{t('pd_price_note')}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/purchase" className="btn btn--gold btn--lg">
                    {t('pd_btn_buy')}
                  </Link>
                  <Link to="/purchase" className="btn btn--ghost btn--lg">
                    {t('pd_btn_sizes')}
                  </Link>
                </div>

                <div className="product-details__guarantee">
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M10 1l2.5 5 5.5.8-4 3.9.9 5.5L10 13.5 5.1 16.2l.9-5.5L2 6.8l5.5-.8z" fill="#4caf50"/>
                  </svg>
                  <span>{t('pd_guarantee')}</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle overline={t('pd_specs_overline')} title={t('pd_specs_title')} theme="light" />
          <div className="product-details__specs-layout">
            <ScrollReveal direction="left">
              <div className="product-details__specs">
                <h3>{t('pd_specs_heading')}</h3>
                <table className="product-details__table">
                  <tbody>
                    {SPEC_KEYS.map(([labelKey, valueKey], i) => (
                      <tr key={i}>
                        <td className="product-details__table-label">{t(labelKey)}</td>
                        <td className="product-details__table-value">{t(valueKey)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal direction="right">
                <div className="product-details__nutrition">
                  <h3>{t('pd_nutrition_heading')}</h3>
                  <div className="product-details__nutrition-panel">
                    <div className="product-details__nutrition-header">
                      <span className="product-details__nutrition-title">{t('pd_nutrition_heading')}</span>
                      <span className="product-details__nutrition-servings">{t('pd_nutrition_servings')}</span>
                    </div>
                    <div className="product-details__nutrition-row product-details__nutrition-row--main">
                      <span>{t('pd_nutrition_serving_size')}</span>
                      <span>2g (1 tsp)</span>
                    </div>
                    <div className="product-details__nutrition-calories">
                      <span>{t('pd_nutrition_calories')}</span>
                      <span>0</span>
                    </div>
                    {[
                      { nameKey: 'pd_nutrition_fat', value: '0g', dv: '0%' },
                      { nameKey: 'pd_nutrition_carb', value: '2g', dv: '1%' },
                      { nameKey: 'pd_nutrition_fiber', value: '1g', dv: '4%', indent: true },
                      { nameKey: 'pd_nutrition_sugars', value: '0g', dv: '', indent: true },
                      { nameKey: 'pd_nutrition_protein', value: '0g', dv: '' },
                      { name: 'Erythritol', value: '0.5g', dv: '†' },
                    ].map((item, i) => (
                      <div key={i} className={`product-details__nutrition-row ${item.indent ? 'product-details__nutrition-row--indent' : ''}`}>
                        <span>{item.nameKey ? t(item.nameKey) : item.name}</span>
                        <span>{item.value} {item.dv && <em>{item.dv}</em>}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="product-details__certifications">
                  <h3>{t('pd_certs_heading')}</h3>
                  <div className="product-details__cert-grid">
                    {CERT_KEYS.map((key, i) => (
                      <div key={i} className="product-details__cert">
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M3 8l4 4 6-6" stroke="#1D783B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {t(key)}
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
