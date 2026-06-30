import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import CTA from '../../components/CTA/CTA'
import FacilityShowcase from '../../components/FacilityShowcase/FacilityShowcase'
import './About.css'

const TEAM = [
  { name: 'Dr. Elena Vasquez', role: 'Chief Science Officer', bio: 'PhD in Nutritional Biochemistry, Stanford. 15 years researching natural compounds and metabolic health.', initial: 'EV', color: '#1D783B' },
  { name: 'James Thornton', role: 'Founder & CEO', bio: 'Former wellness entrepreneur. Diagnosed diabetic at 32, he founded Leavia after searching for a sugar alternative that actually tasted good.', initial: 'JT', color: '#c9a84c' },
  { name: 'Dr. Priya Mehta', role: 'Head of R&D', bio: 'Former researcher at NIH. Expert in phytochemistry and the science of taste modulation.', initial: 'PM', color: '#4caf50' },
]

const TIMELINE = [
  { year: '2018', title: 'The Diagnosis That Started It All', text: 'James Thornton receives a Type 2 diabetes diagnosis. Frustrated by poor-tasting sugar alternatives, he begins researching the science of natural sweeteners.' },
  { year: '2019', title: 'The Research Phase', text: 'Dr. Elena Vasquez joins the founding team. Together they review 200+ studies on monk fruit, stevia, and natural sweetener blends.' },
  { year: '2020', title: 'The Formula Breakthrough', text: 'After 18 months and 47 iterations, Leavia\'s signature five-ingredient blend achieves 87% preference over sugar in blind taste tests.' },
  { year: '2021', title: 'Certified & Launched', text: 'Leavia receives USDA Organic, Non-GMO Project, and Vegan Society certifications. Product launches to immediate 5-star reviews.' },
  { year: '2023', title: '10,000 Customers & Growing', text: 'Leavia reaches 10,000 happy customers across 35 countries. Featured in Healthline, Women\'s Health, and Forbes Wellness.' },
]

export default function About() {
  return (
    <div className="about page-wrapper">
      {/* Hero */}
      <section className="about__hero section--dark" style={{ paddingTop: '8rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">Our Story</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>
              Born from a <em style={{ fontStyle: 'italic', background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Personal Mission</em>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '640px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              Leavia was born from one man's diabetes diagnosis and a conviction that healthy living should never mean sacrificing the joy of sweetness.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section id="mission" className="section">
        <div className="container">
          <div className="about__mission">
            <ScrollReveal direction="left">
              <div className="about__mission-visual">
                <div className="about__mission-icon">🌿</div>
                <div className="about__mission-ring" />
                <div className="about__mission-ring about__mission-ring--2" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="about__mission-text">
                <span className="overline--dark" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--green-emerald)' }}>Our Mission</span>
                <h2 style={{ margin: '1rem 0 1.5rem' }}>Making Health Delicious, Not a Sacrifice</h2>
                <p style={{ marginBottom: '1.25rem' }}>
                  We believe that choosing health should never feel like a punishment. For too long, people with diabetes, those managing weight, or simply caring about their wellbeing have been offered poor-quality, artificial-tasting alternatives to sugar.
                </p>
                <p style={{ marginBottom: '1.25rem' }}>
                  Leavia changes that. We've combined the world's best natural sweeteners into a formula that doesn't ask you to compromise — on taste, on your values, or on your health.
                </p>
                <p>
                  Every jar of Leavia represents thousands of hours of research, hundreds of formula iterations, and an unwavering commitment to creating something the world genuinely deserves.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle overline="Our Journey" title="The Road to Leavia" theme="light" />
          <div className="about__timeline">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className={`about__timeline-item ${i % 2 === 0 ? 'about__timeline-item--left' : 'about__timeline-item--right'}`}>
                  <div className="about__timeline-year">{item.year}</div>
                  <div className="about__timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section--dark">
        <div className="container">
          <SectionTitle overline="The Minds Behind Leavia" title="Meet Our Team" />
          <div className="about__team">
            {TEAM.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.15}>
                <div className="about__team-card">
                  <div className="about__team-avatar" style={{ background: member.color }}>
                    {member.initial}
                  </div>
                  <h3>{member.name}</h3>
                  <span className="about__team-role">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Showcase */}
      <FacilityShowcase />

      {/* Sustainability */}
      <section id="sustainability" className="section">
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <SectionTitle overline="Our Commitment" title="Sustainability at Our Core" theme="light"
            subtitle="Every Leavia purchase contributes to a more sustainable food system and a healthier planet."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
            {[
              { icon: '🌳', stat: '120%', label: 'Carbon Offset' },
              { icon: '♻️', stat: '100%', label: 'Recycled Packaging' },
              { icon: '💧', stat: '99%', label: 'Less Water Than Sugar' },
              { icon: '🌱', stat: '95%', label: 'Less Land Than Sugarcane' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} direction="scale">
                <div className="glass-card--dark" style={{ padding: '1.75rem 1.25rem', borderRadius: '20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, background: 'var(--gradient-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{item.stat}</div>
                  <div style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{item.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </div>
  )
}
