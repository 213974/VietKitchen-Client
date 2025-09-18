import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// ------------------- Component & Page Imports -------------------
// Layout Components
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
// Public Pages
import HomePage from './pages/Home/HomePage';
import MenuPage from './pages/Menu/MenuPage';
// import GalleryPage from './pages/Gallery/GalleryPage';
import OurStoryPage from './pages/OurStory/OurStoryPage';
import ContactPage from './pages/Contact/ContactPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
// Admin Pages & Auth
import AdminLoginPage from './pages/Admin/AdminLogin/AdminLoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/Admin/AdminDashboard/AdminDashboardPage';
import UpdateHoursPage from './pages/Admin/AdminHours/UpdateHoursPage';
import ManageGalleryPage from './pages/Admin/AdminGallery/ManageGalleryPage';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary';
// Common UI & Utility Components
import CookieConsentBanner from './components/common/CookieConsentBanner/CookieConsentBanner';
import ScrollToTopButton from './components/common/ScrollToTopButton/ScrollToTopButton';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import CookieSettingsTrigger from './components/common/CookieSettingsTrigger/CookieSettingsTrigger';
// Custom Hooks
import { useCookieConsent } from './hooks/useCookieConsent';
import { useStoreInfo } from './hooks/useStoreInfo';
// Global Styles
import './App.css';

// ------------------- Reusable Components -------------------

/**
 * A reusable wrapper component that applies a consistent fade animation to pages.
 */
const AnimatedPage = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

/**
 * A simplified layout for all public-facing pages.
 */
const PublicLayout = () => (
    <main className="main-content">
      <GenericErrorBoundary>
        <Outlet />
      </GenericErrorBoundary>
    </main>
);

/**
 * A simplified layout for the 404 Not Found page.
 */
const NotFoundLayout = ({ children }: { children: React.ReactNode }) => (
    <main className="main-content">
      <GenericErrorBoundary>
        {children}
      </GenericErrorBoundary>
    </main>
);

// ------------------- Main App Component -------------------

function App() {
  const { consent, showBanner, startOnSettings, acceptAll, rejectAll, saveConsent, openConsentManager } = useCookieConsent();
  const { activeTheme } = useStoreInfo();
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith('/admin');
  const isAdminLoginPage = location.pathname === '/admin-login';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const themeFileName = activeTheme === 'default' ? 'theme' : activeTheme;
    const existingLink = document.getElementById('dynamic-theme');
    if (existingLink) {
        existingLink.remove();
    }
    const link = document.createElement('link');
    link.id = 'dynamic-theme';
    link.rel = 'stylesheet';
    link.href = `/src/styles/${themeFileName}.css`; 
    document.head.appendChild(link);

    return () => {
        const themeLink = document.getElementById('dynamic-theme');
        if (themeLink) {
            themeLink.remove();
        }
    };
  }, [activeTheme]);

  return (
    <div className="site-wrapper">
      <div className="app-container">
        <ScrollToTopButton />

        {!isAdminPage && !isAdminLoginPage && <Navbar isHomePage={isHomePage} />}

        {showBanner && (
          <CookieConsentBanner
            startInSettingsView={startOnSettings}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onSave={(prefs) => saveConsent({ essential: true, ...prefs })}
          />
        )}

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* --- Public Routes --- */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<AnimatedPage><HomePage /></AnimatedPage>} />
              <Route path="menu" element={<AnimatedPage><MenuPage /></AnimatedPage>} />
              {/* UPDATED: The /gallery route is now removed */}
              {/* <Route path="gallery" element={<AnimatedPage><GalleryPage /></AnimatedPage>} /> */}
              <Route path="our-story" element={<AnimatedPage><OurStoryPage /></AnimatedPage>} />
              <Route path="contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
            </Route>

            {/* --- Admin Auth Route --- */}
            <Route path="/admin-login" element={<AnimatedPage><AdminLoginPage /></AnimatedPage>} />
            
            {/* --- Protected Admin Routes --- */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AnimatedPage><AdminDashboardPage /></AnimatedPage>} />
                <Route path="gallery" element={<AnimatedPage><ManageGalleryPage /></AnimatedPage>} />
                <Route path="hours" element={<AnimatedPage><UpdateHoursPage /></AnimatedPage>} />
              </Route>
            </Route>

            {/* --- 404 Not Found Route --- */}
            <Route path="*" element={<NotFoundLayout><AnimatedPage><NotFoundPage /></AnimatedPage></NotFoundLayout>} />
          </Routes>
        </AnimatePresence>

        {!isAdminPage && !isAdminLoginPage && (
          <>
            <Footer />
            {consent && !showBanner && (
              <CookieSettingsTrigger onClick={openConsentManager} isHidden={showBanner} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <HelmetProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

export default AppWrapper;