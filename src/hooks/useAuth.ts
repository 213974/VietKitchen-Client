import { useState, useEffect } from 'react';

/**
 * A custom hook to determine the admin's current authentication status.
 * It checks for the presence of the 'adminToken' in localStorage.
 * This hook is purely for checking status and does not handle login/logout logic itself.
 * @returns An object containing `isAdmin`, a boolean indicating if the user is authenticated.
 */
export const useAuth = () => {
  // State to hold the authentication status.
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Defines a function to check for the token in localStorage.
    const checkAuthStatus = () => {
      const token = localStorage.getItem('adminToken');
      // Coerces the token string (or null) into a boolean.
      setIsAdmin(!!token);
    };

    // Run the check once on initial component mount.
    checkAuthStatus();
    
    // Add a 'storage' event listener to the window.
    // This allows the auth state to sync across multiple open tabs/windows of the same origin.
    window.addEventListener('storage', checkAuthStatus);
    
    // Cleanup function to remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  return { isAdmin };
};