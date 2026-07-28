export const WHATSAPP_URL = 'https://wa.me/966556090514'

export function WhatsAppIcon({ size = 20 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" aria-hidden="true">
      <path
        d="M16 3.5A12.5 12.5 0 0 0 5.12 22.16L3.5 28.5l6.49-1.55A12.5 12.5 0 1 0 16 3.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M11.15 9.65c.35-.35.9-.3 1.16.12l1.5 2.45c.2.33.17.75-.08 1.04l-.82.95c-.2.23-.23.56-.08.82.82 1.42 1.96 2.58 3.4 3.4.27.15.6.12.83-.09l.95-.84c.3-.26.73-.29 1.06-.08l2.38 1.52c.42.27.47.86.1 1.2l-1.08 1c-.68.63-1.65.86-2.54.6-4.38-1.27-7.86-4.72-9.17-9.08-.27-.9-.05-1.88.6-2.56l.79-.85Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function WhatsAppLink({ className = '', ariaLabel = 'WhatsApp' }) {
  return (
    <a
      href={WHATSAPP_URL}
      className={className}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon />
    </a>
  )
}
