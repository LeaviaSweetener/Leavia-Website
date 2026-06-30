import researchData from '../../data/research.json'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import CTA from '../../components/CTA/CTA'
import './Research.css'

const CATEGORY_COLORS = {
  Antioxidants: '#c9a84c',
  Diabetes: '#1D783B',
  'Gut Health': '#4caf50',
  Cardiovascular: '#e57373',
  'Dental Health': '#81c784',
  'Weight Management': '#d4af37',
}

export default function Research() {
  return (
    <div className="research page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">Science & Evidence</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              Built on Peer-Reviewed Science
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '680px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              Every health claim Leavia makes is backed by published clinical research. Here is a curated summary of the science behind our ingredients.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <SectionTitle
            overline="Clinical Evidence"
            title="The Research Behind Leavia"
            subtitle="Peer-reviewed studies from leading scientific journals, validating every benefit we claim."
            theme="light"
          />

          <div className="research__grid">
            {researchData.map((study, i) => (
              <ScrollReveal key={study.id} delay={i * 0.08}>
                <article className="research__card">
                  <div className="research__card-header">
                    <span
                      className="research__category"
                      style={{ color: CATEGORY_COLORS[study.category] || '#1D783B', borderColor: CATEGORY_COLORS[study.category] || '#1D783B', background: `${CATEGORY_COLORS[study.category]}15` }}
                    >
                      {study.category}
                    </span>
                    <span className="research__year">{study.year}</span>
                  </div>

                  <h3 className="research__title">{study.title}</h3>
                  <p className="research__authors">{study.authors}</p>
                  <p className="research__journal">📖 {study.journal}</p>

                  <div className="research__divider" />

                  <p className="research__summary">{study.summary}</p>

                  <div className="research__finding">
                    <span className="research__finding-label">Key Finding</span>
                    <p className="research__finding-text">{study.keyFinding}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.5}>
            <div className="research__disclaimer">
              <p>
                <strong>Important Note:</strong> The studies summarized here are published academic research on the individual ingredients found in Leavia. These citations support the health properties of our ingredients but should not be interpreted as direct health claims about Leavia as a product. Always consult your healthcare provider before making dietary changes, especially if you have a medical condition.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTA />
    </div>
  )
}
