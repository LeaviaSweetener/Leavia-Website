import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import { useLanguage } from '../../context/LanguageContext'
import './About.css'

const SUST_STATS = [
  { icon: '🌳', stat: '120%', labelKey: 'about_sust_0_label' },
  { icon: '♻️', stat: '100%', labelKey: 'about_sust_1_label' },
  { icon: '💧', stat: '99%', labelKey: 'about_sust_2_label' },
  { icon: '🌱', stat: '95%', labelKey: 'about_sust_3_label' },
]

export default function About() {
  const { t, aboutTeam, aboutTimeline } = useLanguage()

  return (
    <div className="about page-wrapper">
      {/* Hero */}
      <section className="about__hero section--dark" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">{t('about_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              {t('about_title')} <em style={{ fontStyle: 'normal', background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('about_title_em')}</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '640px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              {t('about_subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section">
        <div className="container">
          <div className="about__mission">
            <ScrollReveal direction="left">
              <div className="about__mission-visual">
                <div className="about__mission-icon">🌿</div>
                <div className="about__mission-ring" />
                <div className="about__mission-ring about__mission-ring--2" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="about__mission-text">
                <span className="overline--dark" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-emerald)' }}>{t('about_mission_overline')}</span>
                <h2 style={{ margin: '1rem 0 1.5rem' }}>{t('about_mission_title')}</h2>
                <p style={{ marginBottom: '1.25rem' }}>{t('about_mission_p1')}</p>
                <p style={{ marginBottom: '1.25rem' }}>{t('about_mission_p2')}</p>
                <p style={{ marginBottom: '2.5rem' }}>{t('about_mission_p3')}</p>

                <span className="overline--dark" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-emerald)' }}>{t('about_vision_overline')}</span>
                <h2 style={{ margin: '1rem 0 1.5rem' }}>{t('about_vision_title')}</h2>
                <p>{t('about_vision_p1')}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle overline={t('about_journey_overline')} title={t('about_journey_title')} theme="light" />
          <div className="about__timeline">
            {aboutTimeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`about__timeline-item ${i % 2 === 0 ? 'about__timeline-item--left' : 'about__timeline-item--right'}`}>
                  <div className="about__timeline-year">
                    {item.year}
                    {item.label && <span className="about__timeline-label">{item.label}</span>}
                    {item.desc && <p className="about__timeline-year-desc">{item.desc}</p>}
                  </div>
                  <div className="about__timeline-content">
                    {item.image ? (
                      <img src={item.image} alt="" className="about__timeline-img" />
                    ) : item.title ? (
                      <>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </>
                    ) : null}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about__stats section section--dark">
        <div className="container">
          <SectionTitle overline={t('about_team_overline')} title={t('about_team_title')} />
          <div className="about__team">
            {aboutTeam.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="about__team-card">
                  <div className="about__team-avatar" style={{ background: member.color }}>
                    {member.initial}
                  </div>
                  <h3>{member.name}</h3>
                  <span className="about__team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
