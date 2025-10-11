import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './CookieConsentBanner.css';
import CookieCategory from './CookieCategory';

interface CookieConsentBannerProps {
  startInSettingsView: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onSave: (preferences: { analytics: boolean; marketing: boolean }) => void;
  // PROP ADDED TO FIX THE BUG
  initialPreferences: { analytics: boolean; marketing: boolean };
}

const CookieConsentBanner = ({ startInSettingsView, onAcceptAll, onRejectAll, onSave, initialPreferences }: CookieConsentBannerProps) => {
  const [showSettings, setShowSettings] = useState(startInSettingsView);
  
  // STATE IS NOW INITIALIZED WITH THE PROP
  const [preferences, setPreferences] = useState(initialPreferences);

  useEffect(() => {
    setShowSettings(startInSettingsView);
  }, [startInSettingsView]);

  const handleSave = () => {
    onSave(preferences);
  };
  
  const bannerVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { y: 20, opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="cookie-banner-container"
      variants={bannerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      key={showSettings ? 'settings' : 'initial'}
    >
      {!showSettings ? (
        <AnimatePresence>
          <motion.div
            key="initial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cookie-banner-content"
          >
            <div className="cookie-text">
              <h3>We value your privacy</h3>
              <p>
                We use cookies to enhance your browsing experience, serve personalised ads or content, and analyse our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn btn-primary" onClick={onAcceptAll}>Accept All</button>
              <button className="cookie-btn btn-secondary" onClick={onRejectAll}>Reject All</button>
              <button className="cookie-btn btn-secondary" onClick={() => setShowSettings(true)}>Customize</button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            key="settings"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cookie-banner-content"
          >
            <div className="cookie-text">
              <h3>Customize Consent</h3>
              <p>
                Manage your cookie preferences below. Essential cookies are always enabled for site functionality.
              </p>
            </div>
            <div className="cookie-settings">
              <CookieCategory 
                title="Necessary Cookies"
                description="These cookies are essential for the website to function properly and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services."
                checked={true}
                disabled={true}
              />
              <CookieCategory 
                title="Analytics Cookies"
                description="These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site."
                checked={preferences.analytics}
                onChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
              />
              <CookieCategory 
                title="Marketing Cookies"
                description="These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites."
                checked={preferences.marketing}
                onChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
              />
            </div>
            <div className="cookie-actions settings-actions">
              <button className="cookie-btn btn-secondary" onClick={() => setShowSettings(false)}>Back</button>
              <button className="cookie-btn btn-primary" onClick={handleSave}>Save Preferences</button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default CookieConsentBanner;