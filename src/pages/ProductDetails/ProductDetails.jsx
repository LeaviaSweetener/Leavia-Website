import Product3D from '../../components/Product3D/Product3D'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import './ProductDetails.css'

const EN_PANEL = {
  perLabel: 'Per Serving',
  dvLabel: 'Daily Value',
  nutrition: [
    { label: 'Calories',         value: '0 Kcal', dv: '0.0%' },
    { label: 'Total Fat',        value: '0 g',    dv: '0.0%' },
    { label: 'Saturated Fat',    value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Trans Fat',        value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Monounsaturated',  value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Polyunsaturated',  value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Cholesterol',      value: '0 mg',   dv: '0.0%' },
    { label: 'Sodium',           value: '0 mg',   dv: '0.0%' },
    { label: 'Carbohydrate',     value: '7 g',    dv: '3%'   },
    { label: 'Sugars',           value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Added Sugar',      value: '0 g',    dv: '0.0%', indent: true },
    { label: 'Protein',          value: '0 g',    dv: '0.0%' },
  ],
  ingredientsLabel: 'Ingredients',
  ingredients: 'Erythritol & Steviol Glycosides',
  weightLabel: 'Net Weight',
  weight: '500 g',
  madeInLabel: 'Made in',
  madeIn: 'China',
  certLabel: 'Certifications',
  certifications: ['Halal', 'Zero Calorie', '100% Natural'],
  suitableLabel: 'Suitable For',
  suitableFor: [
    { label: 'Cooking',   sub: 'Heat Resistant' },
    { label: 'Baking',    sub: 'Heat Resistant' },
    { label: 'Beverages', sub: 'Hot & Cold' },
  ],
}

const EN_COMPARE = {
  title: 'Why is Leavia Different?',
  headers: ['Criterion', 'Leavia', 'White Sugar', 'Artificial Sweeteners'],
  rows: [
    { label: 'Source',                   leavia: '100% Natural', sugar: 'Refined',         artificial: 'Artificial'      },
    { label: 'Calories',                 leavia: 'Zero',         sugar: 'High',            artificial: 'Variable'        },
    { label: 'Taste',                    leavia: 'Sweet, no bitterness', sugar: 'Sweet',   artificial: 'Sweet with bitterness' },
    { label: 'Chemicals',                leavia: 'None',         sugar: 'Processed',       artificial: 'Present'         },
    { label: 'Suitable for Diabetics',   leavia: '✅',           sugar: '❌',              artificial: 'Depends on type' },
    { label: 'Natural',                  leavia: '✅',           sugar: '❌',              artificial: '❌'              },
  ],
}

const AR_COMPARE = {
  title: 'لماذا ليفيا مختلف؟',
  headers: ['المعيار', 'ليفيا', 'السكر الأبيض', 'المحليات الصناعية'],
  rows: [
    { label: 'المصدر',                   leavia: 'طبيعي 100%',         sugar: 'مكرر',     artificial: 'صناعي'         },
    { label: 'السعرات الحرارية',         leavia: 'صفر',                sugar: 'عالية',    artificial: 'متفاوتة'       },
    { label: 'الطعم',                    leavia: 'حلو بدون مرارة',    sugar: 'حلو',      artificial: 'حلو مع مرارة'  },
    { label: 'المواد الكيميائية',        leavia: 'لا يوجد',            sugar: 'معالج',    artificial: 'يوجد'          },
    { label: 'مناسب لمرضى السكري',       leavia: '✅',                 sugar: '❌',       artificial: 'حسب النوع'     },
    { label: 'طبيعي',                    leavia: '✅',                 sugar: '❌',       artificial: '❌'            },
  ],
}

const AR_PANEL = {
  perLabel: 'لكل حصة',
  dvLabel: 'القيمة اليومية',
  nutrition: [
    { label: 'السعرات الحرارية',  value: '٠ كيلوكالوري', dv: '0.0%' },
    { label: 'الدهون الكلية',     value: '٠ جم',         dv: '0.0%' },
    { label: 'الدهون المشبعة',    value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'الدهون المتحولة',   value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'أحادية غير مشبعة',  value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'متعددة غير مشبعة',  value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'الكوليسترول',       value: '٠ ملجم',       dv: '0.0%' },
    { label: 'الصوديوم',          value: '٠ ملجم',       dv: '0.0%' },
    { label: 'الكربوهيدرات',      value: '٧ جم',         dv: '3%'   },
    { label: 'السكريات',          value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'سكر مضاف',          value: '٠ جم',         dv: '0.0%', indent: true },
    { label: 'البروتين',          value: '٠ جم',         dv: '0.0%' },
  ],
  ingredientsLabel: 'المكونات',
  ingredients: 'إريثريتول وجليكوسيدات الستيفيول',
  weightLabel: 'الوزن الصافي',
  weight: '٥٠٠ جم',
  madeInLabel: 'بلد المنشأ',
  madeIn: 'الصين',
  certLabel: 'الاعتمادات',
  certifications: ['حلال', 'صفر سعرات', '١٠٠٪ طبيعي'],
  suitableLabel: 'مناسب لـ',
  suitableFor: [
    { label: 'الطبخ',     sub: 'مقاوم للحرارة' },
    { label: 'الخبز',     sub: 'مقاوم للحرارة' },
    { label: 'المشروبات', sub: 'ساخن وبارد' },
  ],
}

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
  const { t, isAr } = useLanguage()
  const panel   = isAr ? AR_PANEL   : EN_PANEL
  const compare = isAr ? AR_COMPARE : EN_COMPARE

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
                  <span className="product-details__price">31 ر.س</span>
                  <span className="product-details__price-note">{t('pd_price_note')}</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/purchase" className="btn btn--ghost btn--lg">
                    {t('pd_btn_sizes')}
                  </Link>
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
                  <div className="product-details__nutrition-panel">

                    {/* Per Serving / Daily Value header */}
                    <div className="product-details__nutrition-dv-header">
                      <span className="product-details__nutrition-per">{panel.perLabel}</span>
                      <span className="product-details__nutrition-dv-label">{panel.dvLabel}</span>
                    </div>

                    {/* Nutrition rows */}
                    {panel.nutrition.map((row, i) => (
                      <div key={i} className={`product-details__nutrition-row${row.indent ? ' product-details__nutrition-row--indent' : ''}`}>
                        <span className="product-details__nutrition-name">{row.label}</span>
                        <span className="product-details__nutrition-val">{row.value}</span>
                        <span className="product-details__nutrition-dv">{row.dv}</span>
                      </div>
                    ))}

                    <div className="product-details__nutrition-divider" />

                    {/* Ingredients */}
                    <div className="product-details__nutrition-info-row">
                      <span className="product-details__nutrition-info-label">{panel.ingredientsLabel}</span>
                      <span className="product-details__nutrition-info-val">{panel.ingredients}</span>
                    </div>

                    {/* Weight & Origin */}
                    <div className="product-details__nutrition-info-row">
                      <span className="product-details__nutrition-info-label">{panel.weightLabel}</span>
                      <span className="product-details__nutrition-info-val">{panel.weight}</span>
                    </div>
                    <div className="product-details__nutrition-info-row">
                      <span className="product-details__nutrition-info-label">{panel.madeInLabel}</span>
                      <span className="product-details__nutrition-info-val">{panel.madeIn}</span>
                    </div>

                    <div className="product-details__nutrition-divider" />

                    {/* Certifications */}
                    <p className="product-details__nutrition-section-label">{panel.certLabel}</p>
                    <div className="product-details__nutrition-tags">
                      {panel.certifications.map((c, i) => (
                        <span key={i} className="product-details__nutrition-tag">{c}</span>
                      ))}
                    </div>

                    <div className="product-details__nutrition-divider" />

                    {/* Suitable For */}
                    <p className="product-details__nutrition-section-label">{panel.suitableLabel}</p>
                    <div className="product-details__suitable-grid">
                      {panel.suitableFor.map((s, i) => (
                        <div key={i} className="product-details__suitable-item">
                          <span className="product-details__suitable-name">{s.label}</span>
                          <span className="product-details__suitable-sub">{s.sub}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section section--cream">
        <div className="container">
          <ScrollReveal>
            <h2 className="pd-compare__title">{compare.title}</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="pd-compare__wrap">
              <table className="pd-compare__table">
                <thead>
                  <tr>
                    {compare.headers.map((h, i) => (
                      <th key={i} className={i === 1 ? 'pd-compare__th--leavia' : ''}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compare.rows.map((row, i) => (
                    <tr key={i}>
                      <td className="pd-compare__criterion">{row.label}</td>
                      <td className="pd-compare__leavia">{row.leavia}</td>
                      <td>{row.sugar}</td>
                      <td>{row.artificial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </div>
  )
}
