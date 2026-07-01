import { useLanguage } from '../../context/LanguageContext'
import './BrandSection.css'

export default function BrandSection() {
  const { t, isAr } = useLanguage()

  return (
    <section className="brand">
      <div className="brand__inner">

        {/* Logo mark */}
        <div className={`brand__logo-mark${isAr ? ' brand__logo-mark--rtl' : ''}`}>

          {/* Leaf — falls from top on load */}
          <span className="brand__leaf" aria-hidden="true">
            <svg viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Leaf body — narrower, elongated, outline only */}
              <path
                d="M14 3 C18 5 22 12.5 22 22 C22 33 18 42 14 45 C10 42 6 33 6 22 C6 12.5 10 5 14 3Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              {/* Central midrib */}
              <line x1="14" y1="3.5" x2="14" y2="45" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
              {/* Lateral veins — right */}
              <path d="M14 8   Q17.5 8.5  20 11"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 13  Q18.5 14   21.5 17"  stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 18  Q19   19   21.5 22"  stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 23  Q19   24   21.5 27"  stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 28  Q18   29   20.5 32"  stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 33  Q17   34   19.5 37"  stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 38  Q16   39   17.5 41.5" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round"/>
              {/* Lateral veins — left */}
              <path d="M14 8   Q10.5 8.5  8 11"    stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 13  Q9.5  14   6.5 17"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 18  Q9    19   6.5 22"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 23  Q9    24   6.5 27"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 28  Q10   29   7.5 32"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 33  Q11   34   8.5 37"   stroke="currentColor" strokeWidth="0.62" strokeLinecap="round"/>
              <path d="M14 38  Q12   39   10.5 41.5" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round"/>
              {/* Stem */}
              <line x1="14" y1="45" x2="14" y2="50" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </span>

          {/* Brand name */}
          <span className="brand__name">{t('brand_name')}</span>
        </div>

        {/* Tagline */}
        <p className="brand__tagline">{t('nav_logo_sub')}</p>

        {/* Gold divider */}
        <div className="brand__divider" />

      </div>
    </section>
  )
}
