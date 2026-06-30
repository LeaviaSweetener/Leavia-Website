import './Button.css'

/**
 * Button — Premium Leavia branded button component
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'gold' | 'outline'
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl'
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  disabled = false,
  type = 'button',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  ...props
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? 'btn--full' : '',
    disabled ? 'btn--disabled' : '',
    className,
  ].filter(Boolean).join(' ')

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
      <span className="btn__shine" />
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {content}
    </button>
  )
}
