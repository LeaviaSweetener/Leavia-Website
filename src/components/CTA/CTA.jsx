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

            <div className="cta__actions">
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
