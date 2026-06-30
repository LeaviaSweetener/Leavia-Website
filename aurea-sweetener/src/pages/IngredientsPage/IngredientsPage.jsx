import Ingredients from '../../components/Ingredients/Ingredients'
import CTA from '../../components/CTA/CTA'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'

export default function IngredientsPage() {
  return (
    <div className="page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">The Formula</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Five Perfect Ingredients
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-serif)' }}>
              Discover the botanical science behind Leavia's extraordinary taste and health profile.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <Ingredients />
      <CTA />
    </div>
  )
}
