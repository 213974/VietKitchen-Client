'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

// --- Layout & Common Components ---
import Navbar from '@/components/layout/Navbar/Navbar';
import Footer from '@/components/layout/Footer/Footer';
import CookieConsentBanner from '@/components/common/CookieConsentBanner/CookieConsentBanner';
import ScrollToTopButton from '@/components/common/ScrollToTopButton/ScrollToTopButton';
import CookieSettingsTrigger from '@/components/common/CookieSettingsTrigger/CookieSettingsTrigger';
import NotificationBanner from '@/components/common/NotificationBanner/NotificationBanner';
import ScrollToTop from '@/components/common/ScrollToTop/ScrollToTop';

// --- Hooks & Data ---
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { useStoreInfo } from '@/hooks/useStoreInfo';
import { usePromotions } from '@/hooks/usePromotions';

// --- Global Styles ---
import '@/App.css';

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

export default function PublicLayoutClient({ children }: { children: React.ReactNode }) {
  const { consent, showBanner, startOnSettings, acceptAll, rejectAll, saveConsent, openConsentManager } = useCookieConsent();
  const { activeTheme } = useStoreInfo();
  const { promotions, isLoading: promotionsLoading } = usePromotions();
  const pathname = usePathname(); // Next.js App Router equivalent of useLocation()

  const [isBannerVisible, setIsBannerVisible] = useState(false);

  const isHomePage = pathname === '/';

  const activeBanner = promotions.find(p => p.display_type === 'BANNER');
  const bannerStorageKey = activeBanner ? `dismissed_banner_${activeBanner.id}` : '';

  useEffect(() => {
    if (activeBanner) {
      if (activeBanner.persistence_type === 'SESSION') {
        const isDismissed = sessionStorage.getItem(bannerStorageKey);
        setIsBannerVisible(!isDismissed);
      } else {
        setIsBannerVisible(true);
      }
    } else {
      setIsBannerVisible(false);
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
    // Note: In Next.js, PUBLIC_URL is not needed. Paths in <link> are relative to the public dir.
    const themePath = `/styles/${themeFileName}.css`;
    const existingLink = document.getElementById('dynamic-theme');

    if (existingLink?.getAttribute('href') === themePath) return;
    
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
        <ScrollToTop />
        <ScrollToTopButton />

        {!promotionsLoading && activeBanner && (
          <NotificationBanner
            banner={activeBanner}
            isVisible={isBannerVisible}
            onDismiss={handleDismissBanner}
          />
        )}

        <Navbar isHomePage={isHomePage} isBannerVisible={isBannerVisible} />

        {showBanner && (
          <CookieConsentBanner
            startInSettingsView={startOnSettings}
            onAcceptAll={acceptAll}
            onRejectAll={rejectAll}
            onSave={(prefs) => saveConsent({ essential: true, ...prefs })}
            initialPreferences={{
              analytics: consent?.analytics || false,
              marketing: consent?.marketing || false,
            }}
          />
        )}
        
        <main className="main-content">
          <AnimatePresence mode="wait">
            {/* We wrap children in a key-ed motion div to trigger animations on route change */}
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
                {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        {consent && !showBanner && (
          <CookieSettingsTrigger onClick={openConsentManager} isHidden={showBanner} />
        )}
      </div>
    </div>
  );
}