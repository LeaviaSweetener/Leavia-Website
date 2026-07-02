import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import './Purchase.css'

const GUARANTEES = ['pur_g_0', 'pur_g_1', 'pur_g_2']

export default function Purchase() {
  const { t, productsData, isAr } = useLanguage()
  const currency = isAr ? 'ر.س' : 'S.R'
  const [selectedProduct, setSelectedProduct] = useState(productsData[1].id)
  const [quantity, setQuantity] = useState(1)
  const [isSubscription, setIsSubscription] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const product = productsData.find((p) => p.id === selectedProduct) || productsData[1]
  const finalPrice = isSubscription
    ? (product.price * 0.8 * quantity).toFixed(2)
    : (product.price * quantity).toFixed(2)

  const handleAddToCart = () => {
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="purchase page-wrapper">
      {/* Hero */}
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">{t('pur_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1rem', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}>
              {t('pur_title')}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section section--dark">
        <div className="container">
          <div className="purchase__layout">
            {/* Product selector */}
            <div className="purchase__products">
              <SectionTitle
                overline={t('pur_select_overline')}
                title={t('pur_select_title')}
                align="left"
                titleMaxWidth="400px"
              />

              <div className="purchase__grid">
                {productsData.map((p) => (
                  <ScrollReveal key={p.id} delay={(p.id - 1) * 0.08}>
                    <button
                      className={`purchase__card ${selectedProduct === p.id ? 'purchase__card--selected' : ''} ${p.recommended ? 'purchase__card--recommended' : ''}`}
                      onClick={() => setSelectedProduct(p.id)}
                    >
                      {p.badge && (
                        <span className="purchase__badge" style={{ background: p.recommended ? 'var(--gradient-gold)' : 'rgba(45,122,79,0.8)', color: p.recommended ? 'var(--green-deep)' : 'white' }}>
                          {p.badge}
                        </span>
                      )}

                      {p.image
                        ? <img src={p.image} alt={p.name} className="purchase__card-img" draggable={false} />
                        : <div className="purchase__jar-icon">🫙</div>
                      }

                      <h3 className="purchase__card-name">{p.name}</h3>
                      <p className="purchase__card-size">{p.size}{p.servings ? ` · ${p.servings}` : ''}</p>
                      <p className="purchase__card-desc">{p.description}</p>

                      <div className="purchase__card-price">
                        {p.originalPrice && (
                          <span className="purchase__original-price">{p.originalPrice} {currency}</span>
                        )}
                        <span className="purchase__price" style={{ color: p.color }}>{p.price} {currency}</span>
                        {p.pricePerServing && (
                          <span className="purchase__per-serving">{p.pricePerServing} {currency}/{t('pur_per_serving')}</span>
                        )}
                      </div>

                      <ul className="purchase__features">
                        {p.features.slice(0, 3).map((f, i) => (
                          <li key={i}>
                            <svg viewBox="0 0 14 14" fill="none" width="12" height="12">
                              <path d="M2 7l4 4 6-6" stroke="#1D783B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </button>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
