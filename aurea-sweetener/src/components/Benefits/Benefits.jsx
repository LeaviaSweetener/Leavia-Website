import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Benefits.css'

export default function Benefits() {
  const { t, benefitsData } = useLanguage()

  return (
    <section className="benefits section section--cream">
      <div className="container">
        <SectionTitle
          overline={t('ben_overline')}
          title={t('ben_title')}
          subtitle={t('ben_subtitle')}
          theme="light"
        />

        <div className="benefits__grid">
          {benefitsData.map((benefit, i) => (
            <ScrollReveal key={benefit.id} direction="up" delay={i * 0.1}>
              <div className="benefits__card" style={{ '--accent': benefit.color }}>
                <div className="benefits__card-top">
                  <span className="benefits__icon">{benefit.icon}</span>
                  <div className="benefits__stat-block">
                    <span className="benefits__stat">{benefit.stat}</span>
                    <span className="benefits__stat-label">{benefit.statLabel}</span>
                  </div>
                </div>
                <h3 className="benefits__title">{benefit.title}</h3>
                <p className="benefits__description">{benefit.description}</p>
                <div className="benefits__accent-line" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
