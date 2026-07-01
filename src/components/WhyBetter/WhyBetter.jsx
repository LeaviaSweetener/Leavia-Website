import { useState } from 'react'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { useLanguage } from '../../context/LanguageContext'
import './WhyBetter.css'

function AnimatedBar({ value, max, color, delay }) {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 })

  return (
    <div ref={ref} className="why-better__bar-track">
      <div
        className="why-better__bar-fill"
        style={{
          width: isVisible ? `${(value / max) * 100}%` : '0%',
          background: color,
          transitionDelay: `${delay}s`,
        }}
      />
    </div>
  )
}

export default function WhyBetter() {
  const [activeTab, setActiveTab] = useState('comparison')
  const { t } = useLanguage()

  const COMPARISONS = [
    { labelKey: 'wb_gi', leavia: 0, sugar: 65, max: 100, unit: 'GI', lowerIsBetter: true },
    { labelKey: 'wb_calories', leavia: 0, sugar: 387, max: 400, unit: 'kcal', lowerIsBetter: true },
    { labelKey: 'wb_antioxidant', leavia: 95, sugar: 0, max: 100, unit: '%', lowerIsBetter: false },
    { labelKey: 'wb_dental', leavia: 100, sugar: 0, max: 100, unit: '%', lowerIsBetter: false },
    { labelKey: 'wb_gut', leavia: 90, sugar: 0, max: 100, unit: '%', lowerIsBetter: false },
    { labelKey: 'wb_natural_ing', leavia: 100, sugar: 0, max: 100, unit: '%', lowerIsBetter: false },
  ]

  const SUGAR_ALTERNATIVES = [
    { name: 'Regular Sugar', glycemic: 65, calories: 387, natural: false, noteKey: 'wb_sugar_note' },
    { name: 'Aspartame', glycemic: 0, calories: 4, natural: false, noteKey: 'wb_aspartame_note' },
    { name: 'Stevia (alone)', glycemic: 0, calories: 0, natural: true, noteKey: 'wb_stevia_note' },
    { name: 'Monk Fruit (alone)', glycemic: 0, calories: 0, natural: true, noteKey: 'wb_monk_note' },
    { name: 'Honey', glycemic: 58, calories: 304, natural: true, noteKey: 'wb_honey_note' },
    { name: 'Leavia Blend', glycemic: 0, calories: 0, natural: true, noteKey: 'wb_leavia_note', highlight: true },
  ]

  const TABS = [
    { id: 'comparison', labelKey: 'wb_tab_metrics' },
    { id: 'table', labelKey: 'wb_tab_comparison' },
  ]

  return (
    <section className="why-better section section--dark">
      <div className="container">
        <SectionTitle
          overline={t('wb_overline')}
          title={t('wb_title')}
          subtitle={t('wb_subtitle')}
        />

        {/* Tab switcher */}
        <ScrollReveal delay={0.2}>
          <div className="why-better__tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`why-better__tab ${activeTab === tab.id ? 'why-better__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Health Metrics Panel */}
        {activeTab === 'comparison' && (
          <div className="why-better__panel">
            <div className="why-better__comparisons">
              {COMPARISONS.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="why-better__row">
                    <span className="why-better__row-label">{t(item.labelKey)}</span>
                    <div className="why-better__bars">
                      <div className="why-better__bar-group">
                        <span className="why-better__bar-name">Leavia</span>
                        <AnimatedBar
                          value={item.lowerIsBetter ? item.max - item.leavia : item.leavia}
                          max={item.max}
                          color="linear-gradient(90deg, #1D783B, #c9a84c)"
                          delay={0.2 + i * 0.05}
                        />
                        <span className="why-better__bar-val why-better__bar-val--good">
                          {item.leavia}{item.unit !== '%' ? ` ${item.unit}` : '%'}
                        </span>
                      </div>
                      <div className="why-better__bar-group">
                        <span className="why-better__bar-name">Sugar</span>
                        <AnimatedBar
                          value={item.lowerIsBetter ? item.max - item.sugar : item.sugar}
                          max={item.max}
                          color="rgba(180, 60, 60, 0.7)"
                          delay={0.3 + i * 0.05}
                        />
                        <span className="why-better__bar-val why-better__bar-val--bad">
                          {item.sugar}{item.unit !== '%' ? ` ${item.unit}` : '%'}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Diff Table — always visible below tabs */}
        <ScrollReveal>
          <div className="why-better__diff-wrap">
            <h3 className="why-better__diff-title">{t('wb_diff_title')}</h3>
            <div className="why-better__diff-scroll">
              <table className="why-better__diff-table">
                <thead>
                  <tr>
                    <th>{t('wb_diff_th_criteria')}</th>
                    <th className="why-better__diff-th--leavia">{t('wb_diff_th_leavia')}</th>
                    <th>{t('wb_diff_th_sugar')}</th>
                    <th>{t('wb_diff_th_artificial')}</th>
                  </tr>
                </thead>
                <tbody>
                  {[1,2,3,4,5,6].map(n => (
                    <tr key={n}>
                      <td className="why-better__diff-criteria">{t(`wb_diff_r${n}_criteria`)}</td>
                      <td className="why-better__diff-leavia">{t(`wb_diff_r${n}_leavia`)}</td>
                      <td>{t(`wb_diff_r${n}_sugar`)}</td>
                      <td>{t(`wb_diff_r${n}_art`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>

        {/* Comparison Table Panel */}
        {activeTab === 'table' && (
          <ScrollReveal>
            <div className="why-better__table-wrap">
              <table className="why-better__table">
                <thead>
                  <tr>
                    <th>{t('wb_th_sweetener')}</th>
                    <th>{t('wb_th_gi')}</th>
                    <th>{t('wb_th_calories')}</th>
                    <th>{t('wb_th_natural')}</th>
                    <th>{t('wb_th_notes')}</th>
                  </tr>
                </thead>
                <tbody>
                  {SUGAR_ALTERNATIVES.map((item, i) => (
                    <tr key={i} className={item.highlight ? 'why-better__table-highlight' : ''}>
                      <td><strong>{item.name}</strong></td>
                      <td>
                        <span className={item.glycemic === 0 ? 'good' : item.glycemic < 40 ? 'medium' : 'bad'}>
                          {item.glycemic}
                        </span>
                      </td>
                      <td>
                        <span className={item.calories === 0 ? 'good' : item.calories < 100 ? 'medium' : 'bad'}>
                          {item.calories}
                        </span>
                      </td>
                      <td>{item.natural ? '✓' : '✗'}</td>
                      <td className="why-better__table-note">{t(item.noteKey)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
