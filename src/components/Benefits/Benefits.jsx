import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import { Check, Coffee, Gauge, HeartPulse, Leaf, Sprout } from 'lucide-react'
import './Benefits.css'

const BENEFIT_ICONS = {
  1: Leaf,
  2: Gauge,
  3: Coffee,
  4: HeartPulse,
  5: Sprout,
}

function BenefitIcon({ id }) {
  const Icon = BENEFIT_ICONS[id] ?? Leaf

  return (
    <span className="benefits__icon" aria-hidden="true">
      <Icon size={25} strokeWidth={1.8} />
      {id === 3 && (
        <span className="benefits__icon-check">
          <Check size={10} strokeWidth={2.2} />
        </span>
      )}
    </span>
  )
}

export default function Benefits() {
  const { t, benefitsData } = useLanguage()

  return (
    <section className="benefits section section--cream">
      <div className="container">
        <SectionTitle
          title={t('ben_title')}
          subtitle={t('ben_subtitle')}
          theme="light"
        />

        <div className="benefits__grid">
          {benefitsData.map((benefit, i) => (
            <ScrollReveal key={benefit.id} direction="up" delay={i * 0.1}>
                <div className="benefits__card" style={{ '--accent': benefit.color }}>
                  <div className="benefits__card-top">
                    <BenefitIcon id={benefit.id} />
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
