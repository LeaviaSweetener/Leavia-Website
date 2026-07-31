import { createContext, useContext, useState, useEffect } from 'react'
import {
  translations,
  enBenefitsData, arBenefitsData,
  enIngredientsData, arIngredientsData,
  enFaqData, arFaqData,
  enTestimonialsData, arTestimonialsData,
  enAboutTeam, arAboutTeam,
  enAboutTimeline, arAboutTimeline,
  enResearchData, arResearchData,
  enProductsData, arProductsData,
} from '../i18n/translations'
import { localizeNumerals, observeLocalizedNumerals } from '../utils/localeNumbers'

const LanguageContext = createContext(null)
const LANGUAGE_STORAGE_KEY = 'leavia-language'
const LOCALIZED_DATA = {
  en: {
    benefitsData: enBenefitsData,
    ingredientsData: enIngredientsData,
    faqData: enFaqData,
    testimonialsData: enTestimonialsData,
    aboutTeam: enAboutTeam,
    aboutTimeline: enAboutTimeline,
    researchData: enResearchData,
    productsData: enProductsData,
  },
  ar: {
    benefitsData: arBenefitsData,
    ingredientsData: arIngredientsData,
    faqData: arFaqData,
    testimonialsData: arTestimonialsData,
    aboutTeam: arAboutTeam,
    aboutTimeline: arAboutTimeline,
    researchData: arResearchData,
    productsData: arProductsData,
  },
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return savedLang === 'ar' || savedLang === 'en' ? savedLang : 'en'
  })

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  const formatNumerals = (value) => localizeNumerals(value, lang)
  const t = (key) => formatNumerals(translations[lang][key] ?? translations['en'][key] ?? key)

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    return observeLocalizedNumerals(document.body, lang)
  }, [lang])

  const value = {
    lang,
    isAr: lang === 'ar',
    toggleLang,
    t,
    formatNumerals,
    ...LOCALIZED_DATA[lang],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}
