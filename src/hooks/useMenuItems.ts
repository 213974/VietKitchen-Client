import { useState, useEffect } from 'react';
// import apiClient from '../services/apiClient'; // API call is commented out for now
import { mockMenuItems, type MenuItem } from '../data/mock-menu';

// Re-export the MenuItem type for convenience in other components.
export type { MenuItem };

/**
 * A custom hook to fetch and manage the state for the restaurant's menu items.
 * Currently uses mock data, but is structured to easily switch to a live API call.
 * @returns An object containing `menuItems`, `isLoading` state, and any `error`.
 */
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);

        // --- MOCK DATA IMPLEMENTATION ---
        // Simulate a network delay to mimic a real API call.
        await new Promise(resolve => setTimeout(resolve, 500)); 
        setMenuItems(mockMenuItems);

        /* 
        // --- REAL API CALL (for future implementation) ---
        const response = await apiClient.get<MenuItem[]>('/menu');
        setMenuItems(response.data);
        */

      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError('Could not load the menu at this time.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  return { menuItems, isLoading, error };
};