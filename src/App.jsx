import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { useLanguage } from './context/LanguageContext'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
import WhatsAppLink from './components/shared/WhatsAppLink/WhatsAppLink'
import { getLocalizedLogoPath, ROUTES } from './config/site'
// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Research from './pages/Research/Research'
import ContactPage from './pages/ContactPage/ContactPage'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Purchase from './pages/Purchase/Purchase'

// Styles
import './styles/globals.css'
import './styles/animations.css'

// Shared Button CSS (needed globally for inline usage)
import './components/shared/Button/Button.css'

/**
 * ScrollToTop — resets scroll position on route change
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }
    }

    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

const PAGE_TITLES = {
  en: {
    [ROUTES.home]: 'Home | LEAVIA',
    [ROUTES.about]: 'About Us | LEAVIA',
    [ROUTES.product]: 'Our Product | LEAVIA',
    [ROUTES.research]: 'Quality & Certifications | LEAVIA',
    [ROUTES.contact]: 'Contact Us | LEAVIA',
    [ROUTES.purchase]: 'Shop LEAVIA',
    fallback: 'Page Not Found | LEAVIA',
  },
  ar: {
    [ROUTES.home]: 'الصفحة الرئيسية | ليفيا',
    [ROUTES.about]: 'من نحن | ليفيا',
    [ROUTES.product]: 'منتجنا | ليفيا',
    [ROUTES.research]: 'الجودة والاعتمادات | ليفيا',
    [ROUTES.contact]: 'اتصل بنا | ليفيا',
    [ROUTES.purchase]: 'تسوق ليفيا',
    fallback: 'الصفحة غير موجودة | ليفيا',
  },
}

function PageTitle() {
  const { pathname } = useLocation()
  const { lang } = useLanguage()

  useEffect(() => {
    const titles = PAGE_TITLES[lang] || PAGE_TITLES.en
    document.title = titles[pathname] || titles.fallback

    const logoPath = getLocalizedLogoPath(lang === 'ar', 'gold')

    document
      .querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')
      .forEach((link) => {
        link.href = logoPath
      })
  }, [lang, pathname])

  return null
}

/**
 * AppLayout — wraps all pages with nav and footer
 */
function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <PageTitle />
      <Navigation />
      <main>
        <Routes>
          <Route path={ROUTES.home} element={<Home />} />
          <Route path={ROUTES.about} element={<About />} />
          <Route path={ROUTES.research} element={<Research />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.product} element={<ProductDetails />} />
          <Route path={ROUTES.purchase} element={<Purchase />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppLink className="whatsapp-float" ariaLabel="WhatsApp LEAVIA" />
    </>
  )
}

function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
      <div>
        <h1 style={{ color: 'var(--green-deep)', fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
        <p style={{ color: 'var(--gray-500)', marginBottom: '2rem' }}>{t('not_found_msg')}</p>
        <a href={ROUTES.home} className="btn btn--primary btn--lg">{t('not_found_home')}</a>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </LanguageProvider>
  )
}
