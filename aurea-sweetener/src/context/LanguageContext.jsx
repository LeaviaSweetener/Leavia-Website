import { createContext, useContext, useState, useEffect } from 'react'
import {
  translations,
  enBenefitsData, arBenefitsData,
  enIngredientsData, arIngredientsData,
  enFaqData, arFaqData,
  enTestimonialsData, arTestimonialsData,
} from '../i18n/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')

  const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')

  const t = (key) => translations[lang][key] ?? translations['en'][key] ?? key

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const value = {
    lang,
    isAr: lang === 'ar',
    toggleLang,
    t,
    benefitsData: lang === 'ar' ? arBenefitsData : enBenefitsData,
    ingredientsData: lang === 'ar' ? arIngredientsData : enIngredientsData,
    faqData: lang === 'ar' ? arFaqData : enFaqData,
    testimonialsData: lang === 'ar' ? arTestimonialsData : enTestimonialsData,
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
