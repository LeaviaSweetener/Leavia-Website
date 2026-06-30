import { useState } from 'react'
import { useLanguage } from '../../context/LanguageContext'
import './Contact.css'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 1500)
  }

  if (status === 'success') {
    return (
      <div className="contact__success">
        <div className="contact__success-icon">✓</div>
        <h3>{t('con_success_title')}</h3>
        <p>{t('con_success_text')}</p>
        <button className="contact__success-btn" onClick={() => setStatus('idle')}>
          {t('con_success_btn')}
        </button>
      </div>
    )
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit} noValidate>
      <div className="contact__row">
        <div className="contact__field">
          <label className="contact__label" htmlFor="name">{t('con_name_label')}</label>
          <input
            id="name"
            name="name"
            type="text"
            className="contact__input"
            placeholder={t('con_name_placeholder')}
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact__field">
          <label className="contact__label" htmlFor="email">{t('con_email_label')}</label>
          <input
            id="email"
            name="email"
            type="email"
            className="contact__input"
            placeholder={t('con_email_placeholder')}
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="subject">{t('con_subject_label')}</label>
        <select
          id="subject"
          name="subject"
          className="contact__input contact__select"
          value={form.subject}
          onChange={handleChange}
          required
        >
          <option value="">{t('con_subject_placeholder')}</option>
          <option value="product">{t('con_topic_product')}</option>
          <option value="order">{t('con_topic_order')}</option>
          <option value="health">{t('con_topic_health')}</option>
          <option value="wholesale">{t('con_topic_wholesale')}</option>
          <option value="press">{t('con_topic_press')}</option>
          <option value="other">{t('con_topic_other')}</option>
        </select>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="message">{t('con_message_label')}</label>
        <textarea
          id="message"
          name="message"
          className="contact__input contact__textarea"
          placeholder={t('con_message_placeholder')}
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="contact__submit"
        disabled={status === 'submitting'}
      >
        {status === 'submitting' ? (
          <>
            <span className="contact__spinner" />
            <span>{t('con_sending')}</span>
          </>
        ) : (
          <>
            <span>{t('con_submit')}</span>
            <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
              <path d="M3 10h14M10 4l7 6-7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
        <span className="contact__btn-shine" />
      </button>
    </form>
  )
}
