import Contact from '../../components/Contact/Contact'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import './ContactPage.css'

const CONTACT_INFO = [
  { icon: '📧', label: 'Email Us', value: 'hello@leaviasweetener.com', sub: 'We reply within 24 hours' },
  { icon: '📞', label: 'Call Us', value: '1-800-Leavia-01', sub: 'Mon–Fri, 9am–6pm EST' },
  { icon: '📦', label: 'Track Orders', value: 'orders@leaviasweetener.com', sub: 'Order inquiries & returns' },
]

export default function ContactPage() {
  return (
    <div className="contact-page page-wrapper">
      <section className="section section--dark" style={{ paddingTop: '8rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden', background: 'var(--gradient-hero)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <ScrollReveal>
            <span className="overline">Get in Touch</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              We'd Love to Hear From You
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '560px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              Questions, wholesale inquiries, press requests — our team is here to help.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="contact-page__layout">
            {/* Info column */}
            <div className="contact-page__info">
              <ScrollReveal direction="left">
                <SectionTitle
                  overline="Contact"
                  title="Let's Connect"
                  align="left"
                  titleMaxWidth="400px"
                />
              </ScrollReveal>

              <div className="contact-page__info-cards">
                {CONTACT_INFO.map((info, i) => (
                  <ScrollReveal key={i} delay={i * 0.1} direction="left">
                    <div className="contact-page__info-card">
                      <span className="contact-page__info-icon">{info.icon}</span>
                      <div>
                        <span className="contact-page__info-label">{info.label}</span>
                        <strong className="contact-page__info-value">{info.value}</strong>
                        <span className="contact-page__info-sub">{info.sub}</span>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <ScrollReveal delay={0.4} direction="left">
                <div className="contact-page__hours">
                  <h4>Business Hours</h4>
                  <p>Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM – 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </ScrollReveal>
            </div>

            {/* Form column */}
            <ScrollReveal direction="right">
              <div className="contact-page__form-wrap">
                <Contact />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
