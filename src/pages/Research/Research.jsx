import { useLanguage } from '../../context/LanguageContext'
import SectionTitle from '../../components/shared/SectionTitle/SectionTitle'
import ScrollReveal from '../../components/shared/ScrollReveal/ScrollReveal'
import CertCarousel from '../../components/CertCarousel/CertCarousel'
import CTA from '../../components/CTA/CTA'
import { BookOpen, CalendarDays, ShieldCheck } from 'lucide-react'
import './Research.css'

const CATEGORY_COLORS = {
  Antioxidants: '#c9a84c',
  Diabetes: '#1D783B',
  'Gut Health': '#4caf50',
  Cardiovascular: '#e57373',
  'Dental Health': '#81c784',
  'Weight Management': '#d4af37',
}

const CATEGORY_KEYS = {
  Antioxidants: 'res_cat_antioxidants',
  Diabetes: 'res_cat_diabetes',
  'Gut Health': 'res_cat_gut',
  Cardiovascular: 'res_cat_cardio',
  'Dental Health': 'res_cat_dental',
  'Weight Management': 'res_cat_weight',
}

function OfficialFsscText({ text }) {
  const [before, after] = text.split('FSSC 22000')

  if (after === undefined) return text

  return (
    <>
      {before}
      <bdi dir="ltr" data-no-localize>FSSC 22000</bdi>
      {after}
    </>
  )
}

export default function Research() {
  const { t, researchData } = useLanguage()

  return (
    <div className="research page-wrapper">

      {/* ── Research Intro & Certifications ── */}
      <section className="research__certifications-section section section--dark">
        <div className="container">
          <ScrollReveal className="research__intro">
            <span className="overline">{t('res_overline')}</span>
            <h1 style={{ color: 'white', marginTop: '1rem', marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              {t('res_title')}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 'var(--text-lg)', maxWidth: '680px', margin: '0 auto', fontFamily: 'var(--font-serif)', lineHeight: '1.8' }}>
              {t('res_subtitle')}
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <SectionTitle
              overline={t('cert_carousel_overline')}
              title={t('cert_carousel_title')}
              subtitle={<OfficialFsscText text={t('cert_carousel_subtitle')} />}
            />
          </ScrollReveal>
          <CertCarousel group="certificates" />

          <div className="research__quality-documents">
            <div className="why-better__section-divider" aria-hidden="true">
              <span className="why-better__section-divider-line" />
              <span className="why-better__section-divider-mark">
                <svg viewBox="0 0 32 32" fill="none">
                  <path
                    d="M25.8 6.4C18.2 6.7 11.1 10 8.2 16.1c-1.7 3.5-.9 7.1 1.4 9.5 2.5-6.7 6.8-11.4 12.7-14.5-5 3.6-8.7 8.4-10.9 14.4 3.5.8 7.1-.5 9.2-3.5 3.3-4.8 3.7-10.8 5.2-15.6Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="why-better__section-divider-line" />
            </div>
            <ScrollReveal>
              <SectionTitle
                overline={t('quality_docs_overline')}
                title={t('quality_docs_title')}
                subtitle={t('quality_docs_subtitle')}
              />
            </ScrollReveal>
            <CertCarousel group="documents" />
          </div>
        </div>
      </section>

      {/* ── Research Cards ── */}
      <section className="section section--cream">
        <div className="container">
          <SectionTitle
            overline={t('res_evidence_overline')}
            title={t('res_evidence_title')}
            subtitle={t('res_evidence_subtitle')}
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
                      {t(CATEGORY_KEYS[study.category] || study.category)}
                    </span>
                    <span className="research__year">
                      <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
                      {study.year}
                    </span>
                  </div>

                  <h3 className="research__title">{study.title}</h3>
                  <p className="research__authors">{study.authors}</p>
                  <p className="research__journal"><BookOpen size={16} strokeWidth={1.9} aria-hidden="true" /> {study.journal}</p>

                  <div className="research__divider" />

                  <p className="research__summary">{study.summary}</p>

                  <div className="research__finding">
                    <span className="research__finding-label">
                      <ShieldCheck size={14} strokeWidth={1.9} aria-hidden="true" />
                      {t('res_key_finding')}
                    </span>
                    <p className="research__finding-text">{study.keyFinding}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      <CTA />
    </div>
  )
}
