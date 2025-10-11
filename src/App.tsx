import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// --- Layout Components ---
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
// --- Public Pages ---
import HomePage from './pages/Home/HomePage';
import MenuPage from './pages/Menu/MenuPage';
import OurStoryPage from './pages/OurStory/OurStoryPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
// --- Admin Pages & Auth ---
import AdminLoginPage from './pages/Admin/AdminLogin/AdminLoginPage';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/Admin/AdminDashboard/AdminDashboardPage';
import ManageGalleryPage from './pages/Admin/AdminGallery/ManageGalleryPage';
import UpdateHoursPage from './pages/Admin/AdminHours/UpdateHoursPage';
import ManagePromotionsPage from './pages/Admin/AdminPromotions/ManagePromotionsPage';
import GenericErrorBoundary from './components/common/ErrorBoundary/GenericErrorBoundary';
// --- Common UI & Utility Components ---
import CookieConsentBanner from './components/common/CookieConsentBanner/CookieConsentBanner';
import ScrollToTopButton from './components/common/ScrollToTopButton/ScrollToTopButton';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import CookieSettingsTrigger from './components/common/CookieSettingsTrigger/CookieSettingsTrigger';
import NotificationBanner from './components/common/NotificationBanner/NotificationBanner';
// --- Custom Hooks ---
import { useCookieConsent } from './hooks/useCookieConsent';
import { useStoreInfo } from './hooks/useStoreInfo';
import { usePromotions } from './hooks/usePromotions';
// --- Global Styles ---
import './App.css';

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

const PublicLayout = () => (
    <main className="main-content">
      <GenericErrorBoundary>
        <Outlet />
      </GenericErrorBoundary>
    </main>
);

const NotFoundLayout = ({ children }: { children: React.ReactNode }) => (
    <main className="main-content">
      <GenericErrorBoundary>
        {children}
      </GenericErrorBoundary>
    </main>
);

function App() {
  const { consent, showBanner, startOnSettings, acceptAll, rejectAll, saveConsent, openConsentManager } = useCookieConsent();
  const { activeTheme } = useStoreInfo();
  const { promotions, isLoading: promotionsLoading } = usePromotions();
  const location = useLocation();

  // --- State for Banner Visibility (Lifted Up) ---
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const isAdminPage = location.pathname.startsWith('/admin');
  const isAdminLoginPage = location.pathname === '/admin-login';
  const isHomePage = location.pathname === '/';

  const activeBanner = promotions.find(p => p.display_type === 'BANNER');
  const bannerStorageKey = activeBanner ? `dismissed_banner_${activeBanner.id}` : '';

  useEffect(() => {
    // Determine initial banner visibility when promotions are loaded
    if (activeBanner) {
      if (activeBanner.persistence_type === 'SESSION') {
        const isDismissed = sessionStorage.getItem(bannerStorageKey);
        setIsBannerVisible(!isDismissed);
      } else {
        setIsBannerVisible(true); // Permanent banners are always visible
      }
    } else {
      setIsBannerVisible(false); // No active banner exists
    }
  }, [activeBanner, bannerStorageKey]);

  const handleDismissBanner = () => {
    setIsBannerVisible(false);
    if (activeBanner && activeBanner.persistence_type === 'SESSION') {
      sessionStorage.setItem(bannerStorageKey, 'true');
    }
  };

  useEffect(() => {
    const themeFileName = activeTheme === 'default' ? 'theme' : activeTheme;
    const themePath = `${process.env.PUBLIC_URL}/styles/${themeFileName}.css`;
    const existingLink = document.getElementById('dynamic-theme');
    if (existingLink && existingLink.getAttribute('href') === themePath) return;
    if (existingLink) existingLink.remove();
    const link = document.createElement('link');
    link.id = 'dynamic-theme';
    link.rel = 'stylesheet';
    link.href = themePath; 
    document.head.appendChild(link);
  }, [activeTheme]);

  return (
    <div className="site-wrapper">
      <div className="app-container">
        <ScrollToTopButton />

        {/* --- Render Banner --- */}
        {/* FIX: Use the 'promotionsLoading' state to prevent rendering before data is ready. */}
        {!promotionsLoading && activeBanner && (
          <NotificationBanner 
            banner={activeBanner} 
            isVisible={isBannerVisible} 
            onDismiss={handleDismissBanner} 
          />
        )}

        {/* --- Render Navbar --- */}
        {!isAdminPage && !isAdminLoginPage && (
          <Navbar isHomePage={isHomePage} isBannerVisible={isBannerVisible} />
        )}

        {/* --- Render Cookie Consent --- */}
        {showBanner && (
          <CookieConsentBanner
            startInSettingsView={startOnSettings}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onSave={(prefs) => saveConsent({ essential: true, ...prefs })}
            initialPreferences={{ 
              analytics: consent?.analytics || false, 
              marketing: consent?.marketing || false 
            }}
          />
        )}

        {/* --- App Routes --- */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<AnimatedPage><HomePage /></AnimatedPage>} />
              <Route path="menu" element={<AnimatedPage><MenuPage /></AnimatedPage>} />
              <Route path="our-story" element={<AnimatedPage><OurStoryPage /></AnimatedPage>} />
            </Route>

            <Route path="/admin-login" element={<AnimatedPage><AdminLoginPage /></AnimatedPage>} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AnimatedPage><AdminDashboardPage /></AnimatedPage>} />
                <Route path="gallery" element={<AnimatedPage><ManageGalleryPage /></AnimatedPage>} />
                <Route path="hours" element={<AnimatedPage><UpdateHoursPage /></AnimatedPage>} />
                <Route path="promotions" element={<AnimatedPage><ManagePromotionsPage /></AnimatedPage>} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundLayout><AnimatedPage><NotFoundPage /></AnimatedPage></NotFoundLayout>} />
          </Routes>
        </AnimatePresence>

        {/* --- Footer and Other UI --- */}
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