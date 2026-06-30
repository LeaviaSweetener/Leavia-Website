import './SectionTitle.css'
import ScrollReveal from '../ScrollReveal/ScrollReveal'

/**
 * SectionTitle — Consistent, premium section title component
 */
export default function SectionTitle({
  overline,
  title,
  subtitle,
  align = 'center',
  theme = 'dark', // 'dark' | 'light'
  className = '',
  titleMaxWidth,
}) {
  return (
    <div
      className={`section-title section-title--${align} section-title--${theme} ${className}`}
      style={titleMaxWidth ? { '--title-max-width': titleMaxWidth } : {}}
    >
      {overline && (
        <ScrollReveal delay={0}>
          <span className="section-title__overline">{overline}</span>
        </ScrollReveal>
      )}

      <ScrollReveal delay={0.1}>
        <h2 className="section-title__heading">{title}</h2>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="section-title__divider" />
      </ScrollReveal>

      {subtitle && (
        <ScrollReveal delay={0.2}>
          <p className="section-title__subtitle">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  )
}
