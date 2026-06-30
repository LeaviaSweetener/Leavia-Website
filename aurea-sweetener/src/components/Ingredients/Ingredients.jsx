import { useState } from 'react'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './Ingredients.css'

export default function Ingredients() {
  const [active, setActive] = useState(0)
  const { t, ingredientsData } = useLanguage()
  const ingredient = ingredientsData[active]

  return (
    <section className="ingredients section section--dark">
      <div className="ingredients__bg-decor" />
      <div className="container">
        <SectionTitle
          overline={t('ing_overline')}
          title={t('ing_title')}
          subtitle={t('ing_subtitle')}
        />

        <div className="ingredients__layout">
          {/* Left — ingredient selector */}
          <div className="ingredients__selector">
            {ingredientsData.map((ing, i) => (
              <ScrollReveal key={ing.id} delay={i * 0.08} direction="left">
                <button
                  className={`ingredients__item ${active === i ? 'ingredients__item--active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                >
                  <div className="ingredients__item-left">
                    <span className="ingredients__item-icon">{ing.icon}</span>
                    <div>
                      <span className="ingredients__item-name">{ing.name}</span>
                      <span className="ingredients__item-origin">{ing.origin}</span>
                    </div>
                  </div>
                  <div className="ingredients__item-pct">{ing.percentage}%</div>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Right — detail panel */}
          <ScrollReveal direction="right" key={active}>
            <div className="ingredients__detail" style={{ background: ingredient.bgColor }}>
              <div className="ingredients__detail-header">
                <span className="ingredients__detail-icon">{ingredient.icon}</span>
                <div>
                  <span className="ingredients__detail-pct">{ingredient.percentage}%</span>
                  <span className="ingredients__detail-of">{t('ing_of_formula')}</span>
                </div>
              </div>

              <h3 className="ingredients__detail-name">{ingredient.name}</h3>
              <p className="ingredients__detail-latin">{ingredient.latin}</p>

              <div className="ingredients__detail-divider" />

              <p className="ingredients__detail-desc">{ingredient.description}</p>

              <div className="ingredients__benefits-list">
                <p className="ingredients__benefits-title">{t('ing_key_benefits')}</p>
                <ul>
                  {ingredient.benefits.map((b, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <path d="M3 8l4 4 6-6" stroke={ingredient.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ingredients__provenance">
                <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                  <path d="M8 2C5.2 2 3 4.2 3 7C3 10.5 8 14 8 14C8 14 13 10.5 13 7C13 4.2 10.8 2 8 2Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
                  <circle cx="8" cy="7" r="1.5" fill="rgba(255,255,255,0.5)"/>
                </svg>
                <span>{t('ing_sourced_from')} {ingredient.origin}</span>
              </div>

              {/* Percentage ring */}
              <div className="ingredients__ring-wrap">
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4"/>
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    fill="none"
                    stroke={ingredient.color}
                    strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 34 * ingredient.percentage / 100} ${2 * Math.PI * 34 * (1 - ingredient.percentage / 100)}`}
                    strokeDashoffset={2 * Math.PI * 34 * 0.25}
                    strokeLinecap="round"
                  />
                  <text x="40" y="44" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">
                    {ingredient.percentage}%
                  </text>
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
