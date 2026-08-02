import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { CircleCheck } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import './Contact.css'

const SUBJECT_OPTIONS = [
  { value: 'product', labelKey: 'con_topic_product' },
  { value: 'order', labelKey: 'con_topic_order' },
  { value: 'health', labelKey: 'con_topic_health' },
  { value: 'wholesale', labelKey: 'con_topic_wholesale' },
  { value: 'press', labelKey: 'con_topic_press' },
  { value: 'other', labelKey: 'con_topic_other' },
]

const SUBJECT_VALUES = new Set(SUBJECT_OPTIONS.map(({ value }) => value))
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const createEmptyContactForm = () => ({
  name: '',
  email: '',
  subject: '',
  message: '',
  contact_url_confirmation: '',
})

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const EMAILJS_VARIABLES = [
  ['VITE_EMAILJS_SERVICE_ID', EMAILJS_CONFIG.serviceId],
  ['VITE_EMAILJS_TEMPLATE_ID', EMAILJS_CONFIG.templateId],
  ['VITE_EMAILJS_PUBLIC_KEY', EMAILJS_CONFIG.publicKey],
]

function SubjectSelect({ value, onChange, placeholder, options, invalid, describedBy }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)
  const selectedIndex = options.findIndex((option) => option.value === value)
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : null

  useEffect(() => {
    if (!isOpen) return undefined

    const closeOnOutsidePress = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePress)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress)
  }, [isOpen])

  const openMenu = () => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0)
    setIsOpen(true)
  }

  const selectOption = (option) => {
    onChange(option.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Tab') {
      setIsOpen(false)
      return
    }

    if (event.key === 'Escape' && isOpen) {
      event.preventDefault()
      setIsOpen(false)
      return
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        openMenu()
        return
      }

      const direction = event.key === 'ArrowDown' ? 1 : -1
      setActiveIndex((index) => (index + direction + options.length) % options.length)
      return
    }

    if ((event.key === 'Enter' || event.key === ' ') && isOpen) {
      event.preventDefault()
      selectOption(options[activeIndex])
    }
  }

  return (
    <div className="contact__select-wrap" ref={rootRef}>
      <button
        ref={triggerRef}
        id="subject"
        type="button"
        className="contact__input contact__select"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="subject-options"
        aria-activedescendant={isOpen ? `subject-option-${options[activeIndex].value}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
        onKeyDown={handleKeyDown}
      >
        <span className={selectedOption ? undefined : 'contact__select-placeholder'}>
          {selectedOption?.label ?? placeholder}
        </span>
        <svg className="contact__select-chevron" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div id="subject-options" className="contact__select-menu" role="listbox">
          {options.map((option, index) => (
            <button
              id={`subject-option-${option.value}`}
              key={option.value}
              type="button"
              className={`contact__select-option${activeIndex === index ? ' contact__select-option--active' : ''}`}
              role="option"
              aria-selected={option.value === value}
              tabIndex={-1}
              onPointerEnter={() => setActiveIndex(index)}
              onClick={() => selectOption(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}

      <input type="hidden" name="subject" value={value} />
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useLanguage()
  const [form, setForm] = useState(createEmptyContactForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    if (status === 'error') setStatus('idle')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    updateField(name, value)
  }

  const validate = (values) => {
    const nextErrors = {}

    if (!values.name) nextErrors.name = t('con_validation_required')
    else if (values.name.length < 2 || values.name.length > 100) nextErrors.name = t('con_validation_name_length')

    if (!values.email) nextErrors.email = t('con_validation_required')
    else if (values.email.length > 254 || !EMAIL_PATTERN.test(values.email)) nextErrors.email = t('con_validation_email')

    if (!values.subject || !SUBJECT_VALUES.has(values.subject)) nextErrors.subject = t('con_validation_required')

    if (!values.message) nextErrors.message = t('con_validation_required')
    else if (values.message.length < 10 || values.message.length > 5000) nextErrors.message = t('con_validation_message_length')

    return nextErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (status === 'submitting') return
    if (form.contact_url_confirmation) {
      setStatus('error')
      return
    }

    const trimmedForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject,
      message: form.message.trim(),
    }
    const nextErrors = validate(trimmedForm)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus('idle')
      return
    }

    const missingVariables = EMAILJS_VARIABLES.filter(([, value]) => !value)
    if (missingVariables.length > 0) {
      missingVariables.forEach(([name]) => console.warn(`[Contact] Missing ${name}; email was not sent.`))
      setStatus('error')
      return
    }

    const subjectOption = SUBJECT_OPTIONS.find(({ value }) => value === trimmedForm.subject)
    const templateParams = {
      from_name: trimmedForm.name,
      from_email: trimmedForm.email,
      reply_to: trimmedForm.email,
      subject: t(subjectOption.labelKey),
      message: trimmedForm.message,
      language: lang === 'ar' ? 'Arabic' : 'English',
      submitted_at: new Intl.DateTimeFormat(lang === 'ar' ? 'ar-SA' : 'en-US', {
        dateStyle: 'medium',
        timeStyle: 'long',
      }).format(new Date()),
    }

    setStatus('submitting')
    setErrors({})

    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams,
        { publicKey: EMAILJS_CONFIG.publicKey },
      )

      if (response.status !== 200) {
        throw new Error(`Unexpected EmailJS response status: ${response.status}`)
      }

      setForm(createEmptyContactForm())
      setStatus('success')
    } catch (error) {
      console.error('[Contact] EmailJS send failed:', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="contact__success" role="status" aria-live="polite">
        <div className="contact__success-icon" aria-hidden="true"><CircleCheck size={32} strokeWidth={1.9} /></div>
        <h3>{t('con_success_title')}</h3>
        <p>{t('con_success_text')}</p>
        <button className="contact__success-btn" onClick={() => { setStatus('idle'); setErrors({}) }}>
          {t('con_success_btn')}
        </button>
      </div>
    )
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit} noValidate>
      <div className="contact__honeypot" aria-hidden="true">
        <label htmlFor="contact-url-confirmation">Leave this field empty</label>
        <input
          id="contact-url-confirmation"
          name="contact_url_confirmation"
          type="text"
          value={form.contact_url_confirmation}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="new-password"
        />
      </div>

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
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            maxLength={100}
            required
          />
          {errors.name && <span id="name-error" className="contact__field-error">{errors.name}</span>}
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
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            maxLength={254}
            dir={form.email ? 'ltr' : (lang === 'ar' ? 'rtl' : 'ltr')}
            required
          />
          {errors.email && <span id="email-error" className="contact__field-error">{errors.email}</span>}
        </div>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="subject">{t('con_subject_label')}</label>
        <SubjectSelect
          value={form.subject}
          onChange={(value) => updateField('subject', value)}
          placeholder={t('con_subject_placeholder')}
          options={SUBJECT_OPTIONS.map(({ value, labelKey }) => ({ value, label: t(labelKey) }))}
          invalid={Boolean(errors.subject)}
          describedBy={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && <span id="subject-error" className="contact__field-error">{errors.subject}</span>}
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
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
          maxLength={5000}
          required
        />
        {errors.message && <span id="message-error" className="contact__field-error">{errors.message}</span>}
      </div>

      {(status === 'submitting' || status === 'error') && (
        <p className={`contact__status contact__status--${status}`} role="status" aria-live="polite">
          {status === 'submitting' ? t('con_sending') : t('con_send_error')}
        </p>
      )}

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
