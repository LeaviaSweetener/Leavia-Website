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
    benefitsData: lang === 'ar' ? arBenefitsData : enBenefitsData,
    ingredientsData: lang === 'ar' ? arIngredientsData : enIngredientsData,
    faqData: lang === 'ar' ? arFaqData : enFaqData,
    testimonialsData: lang === 'ar' ? arTestimonialsData : enTestimonialsData,
    aboutTeam: lang === 'ar' ? arAboutTeam : enAboutTeam,
    aboutTimeline: lang === 'ar' ? arAboutTimeline : enAboutTimeline,
    researchData: lang === 'ar' ? arResearchData : enResearchData,
    productsData: lang === 'ar' ? arProductsData : enProductsData,
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
