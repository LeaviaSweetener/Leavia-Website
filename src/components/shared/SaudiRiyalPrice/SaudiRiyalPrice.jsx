import { useLanguage } from '../../../context/LanguageContext'
import './SaudiRiyalPrice.css'

export default function SaudiRiyalPrice({ value, className = '', style }) {
  const { isAr, formatNumerals } = useLanguage()
  const localizedValue = formatNumerals(value)

  return (
    <span
      className={`saudi-riyal-price ${className}`.trim()}
      style={style}
      aria-label={isAr ? `${localizedValue} ريالًا سعوديًا` : `${localizedValue} Saudi Riyals`}
    >
      <span className="saudi-riyal-price__symbol" aria-hidden="true" />
      <span className="saudi-riyal-price__number" aria-hidden="true">{localizedValue}</span>
    </span>
  )
}
