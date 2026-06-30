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
            <svg viewBox="0 0 24 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Broad rounded leaf body matching the logo leaf shape */}
              <path d="M12 2 C16.5 3.5 21 10 21 19.5 C21 29.5 17 38.5 12 41 C7 38.5 3 29.5 3 19.5 C3 10 7.5 3.5 12 2Z" fill="currentColor"/>
              {/* Stem */}
              <line x1="12" y1="41" x2="12" y2="44.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              {/* Central midrib */}
              <line x1="12" y1="3" x2="12" y2="40.5" stroke="white" strokeWidth="0.9" strokeOpacity="0.4" strokeLinecap="round"/>
              {/* Lateral veins — right side */}
              <path d="M12 7 Q16 6.5 18.5 8.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 11 Q17 10.5 20 13" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 15.5 Q17.5 15 20.5 17.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 20 Q17.5 19.5 20.5 21.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 24.5 Q17 24 19.5 26" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 28.5 Q16 28 18.5 30" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 32.5 Q15 32 16.5 33.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 36 Q14 35.5 15 37" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              {/* Lateral veins — left side */}
              <path d="M12 7 Q8 6.5 5.5 8.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 11 Q7 10.5 4 13" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 15.5 Q6.5 15 3.5 17.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 20 Q6.5 19.5 3.5 21.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 24.5 Q7 24 4.5 26" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 28.5 Q8 28 5.5 30" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 32.5 Q9 32 7.5 33.5" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
              <path d="M12 36 Q10 35.5 9 37" stroke="white" strokeWidth="0.65" strokeOpacity="0.3" strokeLinecap="round" fill="none"/>
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
