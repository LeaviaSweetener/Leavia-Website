import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import { useLanguage } from '../../context/LanguageContext'
import { BadgeCheck, Coffee, Leaf, Sparkles } from 'lucide-react'
import './ValueProp.css'

const VALUE_PROPS = [
  { Icon: Sparkles, titleKey: 'vp_prop_0_title', descKey: 'vp_prop_0_desc' },
  { Icon: Leaf, titleKey: 'vp_prop_1_title', descKey: 'vp_prop_1_desc' },
  { Icon: Coffee, titleKey: 'vp_prop_2_title', descKey: 'vp_prop_2_desc' },
  { Icon: BadgeCheck, titleKey: 'vp_prop_3_title', descKey: 'vp_prop_3_desc' },
]

export default function ValueProp() {
  const { t } = useLanguage()

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
          {VALUE_PROPS.map(({ Icon, titleKey, descKey }, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 0.15}>
              <div className="valueprop__card">
                <div className="valueprop__icon"><Icon /></div>
                <div className="valueprop__content">
                  <h3 className="valueprop__title">{t(titleKey)}</h3>
                  <p className="valueprop__description">{t(descKey)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
