const LOGO_DIRECTORY = '/logos'

export const ROUTES = Object.freeze({
  home: '/',
  about: '/about',
  product: '/product',
  research: '/research',
  contact: '/contact',
  purchase: '/purchase',
})

export const CONTACT_DETAILS = Object.freeze({
  email: 'info@leaviasweetener.com',
  emailHref: 'mailto:info@leaviasweetener.com',
  phone: '0556090514',
  phoneHref: 'tel:0556090514',
  whatsappHref: 'https://wa.me/966556090514',
})

const LOGO_PATHS = Object.freeze({
  white: Object.freeze({
    ar: `${LOGO_DIRECTORY}/logo-ar-white.png`,
    en: `${LOGO_DIRECTORY}/logo-en-white.png`,
  }),
  transparent: Object.freeze({
    ar: `${LOGO_DIRECTORY}/logo-ar-transparent.png`,
    en: `${LOGO_DIRECTORY}/logo-en-transparent.png`,
  }),
  gold: Object.freeze({
    ar: `${LOGO_DIRECTORY}/logo-ar-gold.png?v=3`,
    en: `${LOGO_DIRECTORY}/logo-en-gold.png?v=3`,
  }),
})

export function getLocalizedLogoPath(isAr, variant = 'white') {
  return LOGO_PATHS[variant][isAr ? 'ar' : 'en']
}
