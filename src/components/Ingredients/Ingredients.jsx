import { useState } from 'react'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import { ChevronLeft, ChevronRight, FlaskConical, Leaf, Sparkles } from 'lucide-react'
import './Ingredients.css'

const INGREDIENT_ICONS = {
  2: Leaf,
  4: FlaskConical,
  5: Sparkles,
}

function IngredientIcon({ id, detail = false }) {
  const Icon = INGREDIENT_ICONS[id] ?? Leaf
  return <Icon size={detail ? 48 : 25} strokeWidth={1.8} aria-hidden="true" />
}

export default function Ingredients() {
  const [active, setActive] = useState(0)
  const { t, isAr, ingredientsData } = useLanguage()
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
                    <span className="ingredients__item-icon" aria-hidden="true">
                      <IngredientIcon id={ing.id} />
                    </span>
                    <div>
                      <span className="ingredients__item-name">{ing.name}</span>
                    </div>
                  </div>
                  <span className="ingredients__item-arrow" aria-hidden="true">
                    {isAr ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>

          {/* Right — detail panel */}
          <ScrollReveal direction="right" key={active}>
            <div className="ingredients__detail" style={{ '--ingredient-bg': ingredient.bgColor }}>
              <div className="ingredients__detail-header">
                <span className="ingredients__detail-icon" aria-hidden="true">
                  <IngredientIcon id={ingredient.id} detail />
                </span>
              </div>

              <h3 className="ingredients__detail-name">{ingredient.name}</h3>

              <div className="ingredients__detail-divider" />

              <p className="ingredients__detail-desc">{ingredient.description}</p>

              <div className="ingredients__benefits-list">
                <p className="ingredients__benefits-title">{t('ing_key_benefits')}</p>
                <ul>
                  {ingredient.benefits.map((b, i) => (
                    <li key={i}>
                      <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                        <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>


            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
