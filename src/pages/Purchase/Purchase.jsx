import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import './Purchase.css'

const GUARANTEES = ['pur_g_0', 'pur_g_1', 'pur_g_2']

export default function Purchase() {
  const { t, productsData } = useLanguage()
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

                      <div className="purchase__jar-icon">🫙</div>

                      <h3 className="purchase__card-name">{p.name}</h3>
                      <p className="purchase__card-size">{p.size} · {p.servings}</p>
                      <p className="purchase__card-desc">{p.description}</p>

                      <div className="purchase__card-price">
                        {p.originalPrice && (
                          <span className="purchase__original-price">${p.originalPrice}</span>
                        )}
                        <span className="purchase__price" style={{ color: p.color }}>${p.price}</span>
                        <span className="purchase__per-serving">${p.pricePerServing}/{t('pur_per_serving')}</span>
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

            {/* Order Summary */}
            <ScrollReveal direction="right">
              <div className="purchase__summary">
                <h3 className="purchase__summary-title">{t('pur_order_title')}</h3>

                {/* Selected product */}
                <div className="purchase__summary-product">
                  <span className="purchase__summary-jar">🫙</span>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.size}</span>
                  </div>
                  <span className="purchase__summary-price">${product.price}</span>
                </div>

                <div className="purchase__divider" />

                {/* Subscription toggle */}
                <div className="purchase__subscription">
                  <div className="purchase__subscription-info">
                    <strong>{t('pur_sub_title')}</strong>
                    <span>{t('pur_sub_desc')}</span>
                  </div>
                  <button
                    className={`purchase__toggle ${isSubscription ? 'purchase__toggle--on' : ''}`}
                    onClick={() => setIsSubscription(!isSubscription)}
                    aria-pressed={isSubscription}
                    aria-label="Toggle subscription"
                  >
                    <span className="purchase__toggle-knob" />
                  </button>
                </div>

                {isSubscription && (
                  <div className="purchase__sub-badge">
                    {t('pur_sub_badge')}
                  </div>
                )}

                <div className="purchase__divider" />

                {/* Quantity */}
                <div className="purchase__quantity-row">
                  <span>{t('pur_qty')}</span>
                  <div className="purchase__quantity">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <div className="purchase__divider" />

                {/* Total */}
                <div className="purchase__total-row">
                  <span>{t('pur_total')}</span>
                  <div>
                    {isSubscription && (
                      <span className="purchase__total-original">${(product.price * quantity).toFixed(2)}</span>
                    )}
                    <span className="purchase__total">${finalPrice}</span>
                  </div>
                </div>
                {Number(finalPrice) >= 30 && (
                  <p className="purchase__free-shipping">{t('pur_free_ship')}</p>
                )}

                {/* CTA */}
                <button
                  className={`purchase__cta-btn ${addedToCart ? 'purchase__cta-btn--success' : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>{t('pur_btn_added')}</>
                  ) : (
                    <>
                      {isSubscription ? t('pur_btn_subscribe') : t('pur_btn_cart')} — ${finalPrice}
                    </>
                  )}
                  <span className="purchase__btn-shine" />
                </button>

                <div className="purchase__guarantees">
                  {GUARANTEES.map((key, i) => (
                    <div key={i} className="purchase__guarantee-item">
                      <svg viewBox="0 0 12 12" fill="none" width="10" height="10">
                        <path d="M2 6l3 3 5-5" stroke="#4caf50" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {t(key)}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
