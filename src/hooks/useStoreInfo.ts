import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import { socket } from '../services/socket';

// Defines the structure for a single day's opening hours.
export interface OpeningHour {
  _id?: string;
  day: string;
  time: string;
}

// Defines the structure of the main store information object.
interface StoreInfo {
  hours: OpeningHour[];
  activeTheme: string;
  phoneNumber: string;
}

// Provides fallback data for store hours in case the API call fails.
const fallbackHours: OpeningHour[] = [
  { day: 'Monday', time: '11:00 AM – 9:00 PM' },
  { day: 'Tuesday', time: '11:00 AM – 9:00 PM' },
  { day: 'Wednesday', time: '11:00 AM – 9:00 PM' },
  { day: 'Thursday', time: '11:00 AM – 9:00 PM' },
  { day: 'Friday', time: '11:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '11:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 9:00 PM' },
];

/**
 * A custom hook to fetch and manage global store information.
 * It handles fetching initial data via API and listening for real-time updates via WebSockets.
 */
export const useStoreInfo = () => {
  const [hours, setHours] = useState<OpeningHour[]>([]);
  const [activeTheme, setActiveTheme] = useState('default');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * A memoized function to fetch the latest store info from the API.
   * Uses fallback data in case of an error to ensure the site remains functional.
   */
  const fetchStoreInfo = useCallback(async () => {
    try {
      const response = await apiClient.get<StoreInfo>('/store-info');
      if (response.data) {
        setHours(response.data.hours.length > 0 ? response.data.hours : fallbackHours);
        setActiveTheme(response.data.activeTheme || 'default');
        setPhoneNumber(response.data.phoneNumber || '(571) 918-0641');
      } else {
        // Use fallback data if API returns an empty response.
        setHours(fallbackHours);
        setPhoneNumber('(571) 918-0641');
      }
    } catch (err) {
      // Use fallback data if the API call fails.
      console.error("Failed to fetch store info:", err);
      setError('Could not load store information.');
      setHours(fallbackHours);
      setPhoneNumber('(571) 918-0641');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch initial data and set up WebSocket listener.
  useEffect(() => {
    fetchStoreInfo();

    // The handler for the 'store_info_updated' event from the server.
    const handleStoreInfoUpdate = () => {
      console.log("Received 'store_info_updated' event. Refetching data...");
      fetchStoreInfo();
    };

    // Subscribe to the event.
    socket.on('store_info_updated', handleStoreInfoUpdate);

    // Cleanup function to unsubscribe from the event when the component unmounts.
    return () => {
      socket.off('store_info_updated', handleStoreInfoUpdate);
    };
  }, [fetchStoreInfo]);
  
  /**
   * Updates the store hours. The server will emit an event that triggers a refetch.
   */
  const updateStoreHours = async (updatedHours: OpeningHour[]): Promise<boolean> => {
    try {
      await apiClient.put('/store-info', { hours: updatedHours });
      return true;
    } catch (err) {
      console.error("Failed to update store hours:", err);
      return false;
    }
  };

  /**
   * Updates other store details like theme or phone number.
   */
  const updateStoreDetails = async (details: Partial<StoreInfo>): Promise<boolean> => {
    try {
        await apiClient.put('/store-info', details);
        return true;
    } catch (err) {
        console.error("Failed to update store details:", err);
        return false;
    }
  };

  return { hours, activeTheme, phoneNumber, isLoading, error, updateStoreHours, updateStoreDetails };
};