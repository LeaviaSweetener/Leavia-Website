import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import { useLanguage } from '../../context/LanguageContext'
import { BadgeCheck, Coffee, Leaf, Sparkles } from 'lucide-react'
import './ValueProp.css'

export default function ValueProp() {
  const { t } = useLanguage()

  const PROPS = [
    {
      icon: <Sparkles />,
      titleKey: 'vp_prop_0_title',
      descKey: 'vp_prop_0_desc',
    },
    {
      icon: <Leaf />,
      titleKey: 'vp_prop_1_title',
      descKey: 'vp_prop_1_desc',
    },
    {
      icon: <Coffee />,
      titleKey: 'vp_prop_2_title',
      descKey: 'vp_prop_2_desc',
    },
    {
      icon: <BadgeCheck />,
      titleKey: 'vp_prop_3_title',
      descKey: 'vp_prop_3_desc',
    },
  ]

  return (
    <section className="valueprop section">
      <div className="container">
        <SectionTitle
          overline={t('vp_overline')}
          title={t('vp_title')}
          subtitle={t('vp_subtitle')}
          theme="light"
        />

        <div className="valueprop__grid">
          {PROPS.map((prop, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.15}>
              <div className="valueprop__card">
                <div className="valueprop__icon">{prop.icon}</div>
                <div className="valueprop__content">
                  <h3 className="valueprop__title">{t(prop.titleKey)}</h3>
                  <p className="valueprop__description">{t(prop.descKey)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
