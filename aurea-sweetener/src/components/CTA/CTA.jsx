import { Link } from 'react-router-dom'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './CTA.css'

export default function CTA() {
  const { t } = useLanguage()

  return (
    <section className="cta section section--dark">
      <div className="cta__orb cta__orb--1" />
      <div className="cta__orb cta__orb--2" />

      <div className="container cta__container">
        <ScrollReveal direction="scale">
          <div className="cta__inner">
            <span className="cta__overline">{t('cta_overline')}</span>

            <h2 className="cta__title">
              {t('cta_title_1')}<br />
              <em>{t('cta_title_em')}</em>
            </h2>

            <div className="cta__divider" />

            <p className="cta__subtitle">{t('cta_subtitle')}</p>

            <div className="cta__offer">
              <div className="cta__offer-item">
                <span className="cta__offer-icon">🚚</span>
                <span>{t('cta_offer_shipping')}</span>
              </div>
              <div className="cta__offer-item">
                <span className="cta__offer-icon">✅</span>
                <span>{t('cta_offer_guarantee')}</span>
              </div>
              <div className="cta__offer-item">
                <span className="cta__offer-icon">🌿</span>
                <span>{t('cta_offer_natural')}</span>
              </div>
              <div className="cta__offer-item">
                <span className="cta__offer-icon">♻️</span>
                <span>{t('cta_offer_eco')}</span>
              </div>
            </div>

            <div className="cta__actions">
              <Link to="/purchase" className="cta__btn cta__btn--primary">
                <span>{t('cta_btn_shop')}</span>
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="cta__btn-shine" />
              </Link>
              <Link to="/product" className="cta__btn cta__btn--ghost">
                {t('cta_btn_learn')}
              </Link>
            </div>

            <p className="cta__trust">{t('cta_trust')}</p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
