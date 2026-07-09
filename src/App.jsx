import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { useLanguage } from './context/LanguageContext'
import Navigation from './components/Navigation/Navigation'
import Footer from './components/Footer/Footer'
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
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

/**
 * AppLayout — wraps all pages with nav and footer
 */
function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/purchase" element={<Purchase />} />
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
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
        <a href="/" className="btn btn--primary btn--lg">{t('not_found_home')}</a>
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
