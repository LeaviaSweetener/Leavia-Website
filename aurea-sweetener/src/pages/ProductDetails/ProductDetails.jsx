import Product3D from '../../components/Product3D/Product3D'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import { Link } from 'react-router-dom'
import './ProductDetails.css'

const SPECS = [
  { label: 'Net Weight', value: '300g (10.6 oz)' },
  { label: 'Servings per Container', value: '~150 servings' },
  { label: 'Serving Size', value: '2g (approximately 1 tsp)' },
  { label: 'Calories per Serving', value: '0 kcal' },
  { label: 'Glycemic Index', value: '0' },
  { label: 'Sugar Equivalent', value: '1:1 (same sweetness)' },
  { label: 'Shelf Life', value: '24 months from manufacture' },
  { label: 'Storage', value: 'Cool, dry place. Refrigeration optional.' },
  { label: 'Packaging', value: '100% recycled glass jar with gold lid' },
  { label: 'Country of Assembly', value: 'USA (ingredients globally sourced)' },
]

const CERTIFICATIONS = ['USDA Organic', 'Non-GMO Project Verified', 'Vegan Society Certified', 'Certified Kosher', 'Certified Halal', 'Gluten-Free Certified']

export default function ProductDetails() {
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
                <span className="overline">Leavia Natural Sweetener</span>
                <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '0.75rem', marginBottom: '1rem' }}>
                  The Premium Blend
                </h1>
                <p className="product-details__info-sub" style={{ color: 'var(--gold-warm)', fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  Monk Fruit & Stevia — Nature's Perfect Sweeteners
                </p>

                <div className="product-details__quick-facts">
                  {[
                    { icon: '🌿', label: '5 Natural Ingredients' },
                    { icon: '✨', label: '0 Calories' },
                    { icon: '💚', label: 'GI: 0' },
                    { icon: '🏅', label: '6 Certifications' },
                  ].map((fact, i) => (
                    <div key={i} className="product-details__fact">
                      <span>{fact.icon}</span>
                      <span>{fact.label}</span>
                    </div>
                  ))}
                </div>

                <div className="product-details__price-block">
                  <span className="product-details__price">$32.99</span>
                  <span className="product-details__price-note">300g · 150 servings · $0.22/serving</span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link to="/purchase" className="btn btn--gold btn--lg">
                    Buy Now →
                  </Link>
                  <Link to="/purchase" className="btn btn--ghost btn--lg">
                    View All Sizes
                  </Link>
                </div>

                <div className="product-details__guarantee">
                  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
                    <path d="M10 1l2.5 5 5.5.8-4 3.9.9 5.5L10 13.5 5.1 16.2l.9-5.5L2 6.8l5.5-.8z" fill="#4caf50"/>
                  </svg>
                  <span>30-Day Money-Back Guarantee · Free Shipping over $30</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle overline="Product Details" title="Everything You Need to Know" theme="light" />
          <div className="product-details__specs-layout">
            <ScrollReveal direction="left">
              <div className="product-details__specs">
                <h3>Product Specifications</h3>
                <table className="product-details__table">
                  <tbody>
                    {SPECS.map((spec, i) => (
                      <tr key={i}>
                        <td className="product-details__table-label">{spec.label}</td>
                        <td className="product-details__table-value">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal direction="right">
                <div className="product-details__nutrition">
                  <h3>Nutrition Facts</h3>
                  <div className="product-details__nutrition-panel">
                    <div className="product-details__nutrition-header">
                      <span className="product-details__nutrition-title">Nutrition Facts</span>
                      <span className="product-details__nutrition-servings">About 150 servings per container</span>
                    </div>
                    <div className="product-details__nutrition-row product-details__nutrition-row--main">
                      <span>Serving Size</span>
                      <span>2g (1 tsp)</span>
                    </div>
                    <div className="product-details__nutrition-calories">
                      <span>Calories</span>
                      <span>0</span>
                    </div>
                    {[
                      { name: 'Total Fat', value: '0g', dv: '0%' },
                      { name: 'Total Carbohydrate', value: '2g', dv: '1%' },
                      { name: '  Dietary Fiber', value: '1g', dv: '4%', indent: true },
                      { name: '  Total Sugars', value: '0g', dv: '', indent: true },
                      { name: 'Protein', value: '0g', dv: '' },
                      { name: 'Erythritol', value: '0.5g', dv: '†' },
                    ].map((item, i) => (
                      <div key={i} className={`product-details__nutrition-row ${item.indent ? 'product-details__nutrition-row--indent' : ''}`}>
                        <span>{item.name}</span>
                        <span>{item.value} {item.dv && <em>{item.dv}</em>}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="product-details__certifications">
                  <h3>Certifications</h3>
                  <div className="product-details__cert-grid">
                    {CERTIFICATIONS.map((cert, i) => (
                      <div key={i} className="product-details__cert">
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M3 8l4 4 6-6" stroke="#1D783B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {cert}
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
