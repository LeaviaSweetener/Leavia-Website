import { useState } from 'react'
import './Contact.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success'

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
        <h3>Message Received!</h3>
        <p>Thank you for reaching out to Leavia. Our team will respond within 24 hours.</p>
        <button className="contact__success-btn" onClick={() => setStatus('idle')}>
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <form className="contact__form" onSubmit={handleSubmit} noValidate>
      <div className="contact__row">
        <div className="contact__field">
          <label className="contact__label" htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="contact__input"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="contact__field">
          <label className="contact__label" htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="contact__input"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="subject">Subject</label>
        <select
          id="subject"
          name="subject"
          className="contact__input contact__select"
          value={form.subject}
          onChange={handleChange}
          required
        >
          <option value="">Choose a topic</option>
          <option value="product">Product Questions</option>
          <option value="order">Order & Shipping</option>
          <option value="health">Health & Nutrition</option>
          <option value="wholesale">Wholesale Inquiry</option>
          <option value="press">Press & Media</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="contact__field">
        <label className="contact__label" htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="contact__input contact__textarea"
          placeholder="How can we help you?"
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
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
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
