import { useState, useEffect, useCallback } from 'react';

/**
 * Defines the structure for user's cookie consent preferences.
 */
export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

// The key used to store consent preferences in localStorage.
const COOKIE_CONSENT_KEY = 'cookie_consent';

// The default state for a new user who has not yet given consent.
const defaultConsent: CookieConsent = {
  essential: true,
  analytics: false,
  marketing: false,
};

/**
 * A custom hook to manage all logic for the cookie consent banner.
 * It handles storing/retrieving consent from localStorage and controls the banner's visibility.
 */
export const useCookieConsent = () => {
  // The user's current consent preferences.
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  // Whether to show the main banner or not.
  const [showBanner, setShowBanner] = useState(false);
  // Whether the banner should open directly to the settings view.
  const [startOnSettings, setStartOnSettings] = useState(false);

  // Effect to run on initial mount to check for existing consent.
  useEffect(() => {
    try {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      // If consent is found in localStorage, parse and set it.
      if (storedConsent) {
        setConsent(JSON.parse(storedConsent));
      } else {
        // If no consent is found, wait 3 seconds before showing the banner.
        const timer = setTimeout(() => {
          setStartOnSettings(false);
          setShowBanner(true);
        }, 3000);
        // Set the default consent state immediately.
        setConsent(defaultConsent);
        // Cleanup the timer if the component unmounts before it fires.
        return () => clearTimeout(timer);
      }
    } catch (error) {
      // In case of a parsing error, show the banner immediately.
      console.error("Error parsing cookie consent from localStorage", error);
      setShowBanner(true);
      setConsent(defaultConsent);
    }
  }, []);

  /**
   * Saves the user's consent preferences to localStorage and updates the state.
   */
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    // Ensure essential cookies are always marked as true.
    const finalConsent = { ...newConsent, essential: true };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(finalConsent));
    setConsent(finalConsent);
    setShowBanner(false);
  }, []);

  /**
   * A convenience function to accept all cookie categories.
   */
  const acceptAll = useCallback(() => {
    saveConsent({ essential: true, analytics: true, marketing: true });
  }, [saveConsent]);

  /**
   * A convenience function to reject all non-essential cookie categories.
   */
  const rejectAll = useCallback(() => {
    saveConsent({ essential: true, analytics: false, marketing: false });
  }, [saveConsent]);

  /**
   * A function to manually open the consent manager in the settings view.
   */
  const openConsentManager = useCallback(() => {
    setStartOnSettings(true);
    setShowBanner(true);
  }, []);

  return { consent, showBanner, startOnSettings, acceptAll, rejectAll, saveConsent, openConsentManager };
};