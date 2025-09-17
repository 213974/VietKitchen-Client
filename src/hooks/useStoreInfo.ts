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

// Provides fallback/default data for the store.
const defaultHours: OpeningHour[] = [
  { day: 'Monday', time: '11:00 AM – 9:00 PM' },
  { day: 'Tuesday', time: '11:00 AM – 9:00 PM' },
  { day: 'Wednesday', time: '11:00 AM – 9:00 PM' },
  { day: 'Thursday', time: '11:00 AM – 9:00 PM' },
  { day: 'Friday', time: '11:00 AM – 9:00 PM' },
  { day: 'Saturday', time: '11:00 AM – 9:00 PM' },
  { day: 'Sunday', time: '11:00 AM – 9:00 PM' },
];
const defaultPhoneNumber = '(571) 918-0641';

/**
 * A custom hook to fetch and manage global store information.
 * It provides default data immediately and then fetches live data in the background.
 */
export const useStoreInfo = () => {
  // UPDATED: Initialize state with default data instead of empty values.
  const [hours, setHours] = useState<OpeningHour[]>(defaultHours);
  const [activeTheme, setActiveTheme] = useState('default');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreInfo = useCallback(async () => {
    setIsLoading(true); // Set loading to true at the start of a fetch
    try {
      const response = await apiClient.get<StoreInfo>('/store-info');
      if (response.data) {
        setHours(response.data.hours.length > 0 ? response.data.hours : defaultHours);
        setActiveTheme(response.data.activeTheme || 'default');
        setPhoneNumber(response.data.phoneNumber || defaultPhoneNumber);
      }
      // No need for an else block, as state is already set to defaults.
    } catch (err) {
      console.error("Failed to fetch store info:", err);
      setError('Could not load store information.');
      // Keep default data on error.
      setHours(defaultHours);
      setPhoneNumber(defaultPhoneNumber);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Effect to fetch initial data and set up WebSocket listener.
  useEffect(() => {
    fetchStoreInfo();

    const handleStoreInfoUpdate = () => {
      console.log("Received 'store_info_updated' event. Refetching data...");
      fetchStoreInfo();
    };

    socket.on('store_info_updated', handleStoreInfoUpdate);

    return () => {
      socket.off('store_info_updated', handleStoreInfoUpdate);
    };
  }, [fetchStoreInfo]);
  
  const updateStoreHours = async (updatedHours: OpeningHour[]): Promise<boolean> => {
    try {
      await apiClient.put('/store-info', { hours: updatedHours });
      return true;
    } catch (err) {
      console.error("Failed to update store hours:", err);
      return false;
    }
  };

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