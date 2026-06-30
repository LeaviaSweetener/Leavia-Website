import Testimonials from '../../components/Testimonials/Testimonials'
import CTA from '../../components/CTA/CTA'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'

export default function TestimonialsPage() {
  return (
    <div className="page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">Community Stories</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Real People. Real Results.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '600px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              Over 10,000 people have made the switch to Leavia. Here's what they have to say.
            </p>
          </ScrollReveal>
        </div>
      </section>
      <Testimonials />
      <CTA />
    </div>
  )
}
