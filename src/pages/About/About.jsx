import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import { useLanguage } from '../../context/LanguageContext'
import { Flame, Leaf, UsersRound } from 'lucide-react'
import './About.css'

const STAT_ICONS = [Leaf, Flame, UsersRound]

export default function About() {
  const { t, aboutTeam, aboutTimeline } = useLanguage()

  return (
    <div className="about page-wrapper">
      <section className="about__hero section--dark">
        <div className="container about__hero-inner">
          <ScrollReveal>
            <span className="overline">{t('about_overline')}</span>
            <h1 className="about__hero-title">
              <span>{t('about_title')}</span>{' '}
              <em>{t('about_title_em')}</em>
            </h1>
            <p className="about__hero-description">{t('about_subtitle')}</p>
          </ScrollReveal>
        </div>
      </section>

      <section id="mission" className="about__purpose section">
        <div className="container">
          <div className="about__mission">
            <ScrollReveal direction="left">
              <div className="about__mission-visual" aria-hidden="true">
                <div className="about__mission-icon"><Leaf size={68} strokeWidth={1.8} /></div>
                <div className="about__mission-ring" />
                <div className="about__mission-ring about__mission-ring--2" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="about__mission-text">
                <div className="about__purpose-block">
                  <span className="about__eyebrow">{t('about_mission_overline')}</span>
                  <h2>{t('about_mission_title')}</h2>
                  <p>{t('about_mission_p1')}</p>
                </div>

                <div className="about__purpose-block">
                  <span className="about__eyebrow">{t('about_vision_overline')}</span>
                  <h2>{t('about_vision_title')}</h2>
                  <p>{t('about_vision_p1')}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="about__journey section section--cream">
        <div className="container">
          <SectionTitle
            overline={t('about_journey_overline')}
            title={t('about_journey_title')}
            theme="light"
          />

          <div className="about__timeline">
            {aboutTimeline.map((item, index) => (
              <ScrollReveal key={item.year} delay={index * 0.08}>
                <article className={`about__timeline-item about__timeline-item--${index % 2 === 0 ? 'odd' : 'even'}`}>
                  <div className="about__timeline-copy">
                    <strong className="about__timeline-number">{item.year}</strong>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                  {item.image && (
                    <div className="about__timeline-media">
                      <img
                        src={item.image}
                        alt=""
                        className={`about__timeline-img ${item.image.includes('timeline-quality') ? 'about__timeline-img--portrait' : ''}`}
                      />
                    </div>
                  )}
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about__stats section section--dark">
        <div className="container">
          <SectionTitle
            overline={t('about_team_overline')}
            title={t('about_team_title')}
          />
          <div className="about__stats-grid">
            {aboutTeam.map((stat, index) => {
              const StatIcon = STAT_ICONS[index]
              return (
                <ScrollReveal key={stat.name} delay={index * 0.12}>
                  <div className="about__stat-card">
                    <div className="about__stat-value">
                      <StatIcon className="about__stat-icon" size={22} strokeWidth={1.8} aria-hidden="true" />
                      <span>{stat.initial}</span>
                    </div>
                    <h3>{stat.name}</h3>
                    {stat.role && <p>{stat.role}</p>}
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
