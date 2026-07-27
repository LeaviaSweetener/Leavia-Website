import { useLanguage } from '../../context/LanguageContext'
import './BrandSection.css'

export default function BrandSection() {
  const { t, isAr } = useLanguage()

  return (
    <section className="brand">
      <div className="brand__inner">

        {/* Official logo */}
        <div className="brand__logo-mark">
          <img
            className={`brand__logo-image ${isAr ? 'brand__logo-image--ar' : ''}`}
            src={isAr ? '/logos/logo-ar-transparent.png' : '/logos/logo-en-transparent.png'}
            alt={isAr ? 'ليفيا' : 'LEAVIA'}
          />
        </div>

        {/* Tagline */}
        <p className="brand__tagline">{t('nav_logo_sub')}</p>

        {/* Gold divider */}
        <div className="brand__divider" />

      </div>
    </section>
  )
}
