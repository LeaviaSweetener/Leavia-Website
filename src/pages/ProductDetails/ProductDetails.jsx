import { lazy, Suspense } from 'react'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SaudiRiyalPrice from '../../components/shared/SaudiRiyalPrice/SaudiRiyalPrice'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import NutritionTable from '../../components/shared/NutritionTable/NutritionTable'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../context/LanguageContext'
import { translations } from '../../i18n/translations'
import { Award, Leaf, PackageOpen, Scale, Sparkles, Weight } from 'lucide-react'
import './ProductDetails.css'

const Product3D = lazy(() => import('../../components/Product3D/Product3D'))

const EN_PANEL = {
  ingredientsLabel: 'Ingredients',
  ingredients: 'Erythritol and Steviol Glycosides',
  weightLabel: 'Net Weight',
  weight: '350 g · 50 sachets × 7 g',
  madeInLabel: 'Made in',
  madeIn: 'China',
  certLabel: 'Pack Mark',
  certifications: ['Halal', 'Zero calories', '100% Natural'],
  suitableLabel: 'Suitable For',
  suitableFor: [
    { label: 'Cooking',   sub: 'Heat Resistant' },
    { label: 'Baking',    sub: 'Heat Resistant' },
    { label: 'Beverages', sub: 'Hot & Cold' },
  ],
}

const AR_PANEL = {
  ingredientsLabel: 'المكونات',
  ingredients: 'الإريثريتول وجليكوسيدات الستيفيول',
  weightLabel: 'الوزن الصافي',
  weight: '٣٥٠ جرامًا · ٥٠ ظرفًا × ٧ جرامات',
  madeInLabel: 'بلد المنشأ',
  madeIn: 'الصين',
  certLabel: 'العلامة على العبوة',
  certifications: ['حلال', 'صفر سعرة حرارية', 'طبيعي 100٪'],
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
  ['pd_spec_14_label', 'pd_spec_14_value'],
  ['pd_spec_4_label', 'pd_spec_4_value'],
  ['pd_spec_12_label', 'pd_spec_12_value'],
  ['pd_spec_5_label', 'pd_spec_5_value'],
  ['pd_spec_6_label', 'pd_spec_6_value'],
  ['pd_spec_7_label', 'pd_spec_7_value'],
  ['pd_spec_8_label', 'pd_spec_8_value'],
  ['pd_spec_9_label', 'pd_spec_9_value'],
  ['pd_spec_10_label', 'pd_spec_10_value'],
  ['pd_spec_11_label', 'pd_spec_11_value'],
]

const CERT_KEYS = ['pd_cert_0', 'pd_cert_1', 'pd_cert_2', 'pd_cert_3', 'pd_cert_4', 'pd_cert_5']

const COMPARE_HEADERS = [
  'pd_compare_th_criteria',
  'pd_compare_th_leavia',
  'pd_compare_th_sugar',
  'pd_compare_th_artificial',
]

const COMPARE_ROWS = [
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '4' },
  { key: '5', leaviaIcon: 'check', sugarIcon: 'cross' },
  { key: '6', leaviaIcon: 'check', sugarIcon: 'cross' },
]

function ComparisonIcon({ type, label }) {
  const isCheck = type === 'check'

  return (
    <span className={`pd-compare__icon pd-compare__icon--${type}`}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {isCheck ? (
          <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="m7 7 10 10M17 7 7 17" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        )}
      </svg>
      <span className="pd-compare__sr-only">{label}</span>
    </span>
  )
}

const QUICK_FACTS = [
  { Icon: Leaf, key: 'pd_fact_0' },
  { Icon: Sparkles, key: 'pd_fact_1' },
  { Icon: Award, key: 'pd_fact_3' },
]

export default function ProductDetails() {
  const { t, isAr } = useLanguage()
  const panel   = isAr ? AR_PANEL   : EN_PANEL
  const compareText = (key) => translations[isAr ? 'ar' : 'en'][key]

  return (
    <div className="product-details page-wrapper">
      {/* Hero */}
      <section className="product-details__hero section section--dark">
        <div className="container">
          <div className="product-details__hero-layout">
            {/* 3D Product */}
            <div className="product-details__3d">
              <Suspense fallback={null}>
                <Product3D />
              </Suspense>
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
                  {QUICK_FACTS.map(({ Icon, key }) => (
                    <div key={key} className="product-details__fact">
                      <Icon className="product-details__fact-icon" size={19} strokeWidth={1.9} aria-hidden="true" />
                      <span>{t(key)}</span>
                    </div>
                  ))}
                </div>

                <div className="product-details__price-block">
                  <SaudiRiyalPrice value={31} className="product-details__price" />
                  <div className="product-details__pack-specs" aria-label={t('pd_price_note')}>
                    <span className="product-details__pack-spec">
                      <Scale aria-hidden="true" />
                      <bdi dir="ltr" className="product-details__pack-number">350</bdi>
                      <span>{isAr ? 'جرامًا' : 'g'}</span>
                    </span>
                    <i aria-hidden="true" />
                    <span className="product-details__pack-spec">
                      <PackageOpen aria-hidden="true" />
                      <bdi dir="ltr" className="product-details__pack-number">50</bdi>
                      <span>{isAr ? 'ظرفًا' : 'sachets'}</span>
                    </span>
                    <i aria-hidden="true" />
                    <span className="product-details__pack-spec">
                      <Weight aria-hidden="true" />
                      <bdi dir="ltr" className="product-details__pack-number">7</bdi>
                      <span>{isAr ? 'جرامات لكل ظرف' : 'g each'}</span>
                    </span>
                  </div>
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
                    <NutritionTable isAr={isAr} />

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
            <h2 className="pd-compare__title">{compareText('pd_compare_title')}</h2>
            <p className="pd-compare__description">{compareText('pd_compare_description')}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="pd-compare__wrap">
              <table className="pd-compare__table" data-no-localize>
                <thead>
                  <tr>
                    {COMPARE_HEADERS.map((key, i) => (
                      <th scope="col" key={key} className={i === 1 ? 'pd-compare__th--leavia' : ''}>{compareText(key)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.key}>
                      <th scope="row" className="pd-compare__criterion">{compareText(`pd_compare_r${row.key}_criteria`)}</th>
                      <td className="pd-compare__leavia">
                        {row.leaviaIcon ? <ComparisonIcon type={row.leaviaIcon} label={compareText(`pd_compare_${row.leaviaIcon}`)} /> : compareText(`pd_compare_r${row.key}_leavia`)}
                      </td>
                      <td>
                        {row.sugarIcon ? <ComparisonIcon type={row.sugarIcon} label={compareText(`pd_compare_${row.sugarIcon}`)} /> : compareText(`pd_compare_r${row.key}_sugar`)}
                      </td>
                      <td>
                        {row.artificialIcon ? <ComparisonIcon type={row.artificialIcon} label={compareText(`pd_compare_${row.artificialIcon}`)} /> : compareText(`pd_compare_r${row.key}_artificial`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
