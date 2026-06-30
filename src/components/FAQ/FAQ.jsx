import { useState } from 'react'
import SectionTitle from '../shared/SectionTitle/SectionTitle'
import ScrollReveal from '../shared/ScrollReveal/ScrollReveal'
import { useLanguage } from '../../context/LanguageContext'
import './FAQ.css'

export default function FAQ({ limit }) {
  const [openId, setOpenId] = useState(null)
  const { faqData } = useLanguage()
  const items = limit ? faqData.slice(0, limit) : faqData

  return (
    <div className="faq">
      {items.map((item, i) => (
        <ScrollReveal key={item.id} delay={i * 0.06}>
          <div className={`faq__item ${openId === item.id ? 'faq__item--open' : ''}`}>
            <button
              className="faq__question"
              onClick={() => setOpenId(openId === item.id ? null : item.id)}
              aria-expanded={openId === item.id}
            >
              <span className="faq__q-text">{item.question}</span>
              <span className="faq__icon">
                <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                  <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
            <div className="faq__answer" style={{ maxHeight: openId === item.id ? '400px' : '0' }}>
              <div className="faq__answer-inner">
                <span className="faq__category">{item.category}</span>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
