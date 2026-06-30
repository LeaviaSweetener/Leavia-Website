import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import { useLanguage } from '../../context/LanguageContext'
import './ValueProp.css'

function getIcon0() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" stroke="url(#vp1)" strokeWidth="1.5"/>
      <path d="M24 12 C28 12 36 18 36 26 C36 32 30 38 24 38 C18 38 12 32 12 26 C12 18 20 12 24 12Z" fill="url(#vp1g)" opacity="0.3"/>
      <path d="M24 12 L24 38" stroke="url(#vp1)" strokeWidth="1.5" strokeDasharray="3,3"/>
      <path d="M16 22 Q24 16 32 22" stroke="url(#vp1)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <defs>
        <linearGradient id="vp1" x1="12" y1="12" x2="36" y2="36">
          <stop stopColor="#1D783B"/><stop offset="1" stopColor="#4caf50"/>
        </linearGradient>
        <linearGradient id="vp1g" x1="12" y1="12" x2="36" y2="36">
          <stop stopColor="#1D783B"/><stop offset="1" stopColor="#4caf50"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function getIcon1() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="url(#vp2)" strokeWidth="1.5"/>
      <path d="M24 14 L28 22 L36 23 L30 29 L32 37 L24 33 L16 37 L18 29 L12 23 L20 22 Z" fill="url(#vp2)" opacity="0.8"/>
      <defs>
        <linearGradient id="vp2" x1="12" y1="14" x2="36" y2="37">
          <stop stopColor="#c9a84c"/><stop offset="1" stopColor="#f0d060"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function getIcon2() {
  return (
    <svg viewBox="0 0 48 48" fill="none">
      <circle cx="24" cy="24" r="22" stroke="url(#vp3)" strokeWidth="1.5"/>
      <path d="M16 24 A8 8 0 0 1 32 24" stroke="url(#vp3)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M14 30 Q24 38 34 30" stroke="url(#vp3)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="24" cy="18" r="4" fill="url(#vp3)" opacity="0.7"/>
      <defs>
        <linearGradient id="vp3" x1="14" y1="14" x2="34" y2="38">
          <stop stopColor="#1D783B"/><stop offset="1" stopColor="#c9a84c"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function ValueProp() {
  const { t } = useLanguage()

  const PROPS = [
    {
      icon: getIcon0(),
      titleKey: 'vp_prop_0_title',
      descKey: 'vp_prop_0_desc',
      highlightKey: 'vp_prop_0_highlight',
    },
    {
      icon: getIcon1(),
      titleKey: 'vp_prop_1_title',
      descKey: 'vp_prop_1_desc',
      highlightKey: 'vp_prop_1_highlight',
    },
    {
      icon: getIcon2(),
      titleKey: 'vp_prop_2_title',
      descKey: 'vp_prop_2_desc',
      highlightKey: 'vp_prop_2_highlight',
    },
  ]

  const STRIP = [
    { num: '1:1', labelKey: 'vp_strip_0_label' },
    { num: '0', labelKey: 'vp_strip_1_label' },
    { num: '5', labelKey: 'vp_strip_2_label' },
    { num: '10k+', labelKey: 'vp_strip_3_label' },
    { num: '3.7kg', labelKey: 'vp_strip_4_label' },
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
                  <span className="valueprop__highlight">{t(prop.highlightKey)}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom feature strip */}
        <ScrollReveal delay={0.4}>
          <div className="valueprop__strip">
            {STRIP.map((item, i) => (
              <div key={i} className="valueprop__strip-item">
                <span className="valueprop__strip-num">{item.num}</span>
                <span className="valueprop__strip-label">{t(item.labelKey)}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
