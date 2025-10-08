import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

export interface OpeningHour {
  _id?: string;
  day: string;
  time: string;
}

interface StoreInfo {
  hours: OpeningHour[];
  active_theme: string;
  phone_number: string;
}

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

export const useStoreInfo = () => {
  const [hours, setHours] = useState<OpeningHour[]>(defaultHours);
  const [activeTheme, setActiveTheme] = useState('default');
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStoreInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error: dbError } = await supabase
        .from('store_info')
        .select('*')
        .eq('identifier', 'main_store_info')
        .single();

      if (dbError) throw dbError;

      if (data) {
        setHours(data.hours.length > 0 ? data.hours : defaultHours);
        setActiveTheme(data.active_theme || 'default');
        setPhoneNumber(data.phone_number || defaultPhoneNumber);
      }
    } catch (err) {
      console.error("Failed to fetch store info from Supabase:", err);
      setError('Could not load store information.');
      setHours(defaultHours);
      setPhoneNumber(defaultPhoneNumber);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStoreInfo();

    const channel = supabase
      .channel('store_info_changes')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'store_info' },
        () => {
          console.log('Change received from Supabase! Refetching data...');
          fetchStoreInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchStoreInfo]);
  
  const updateStoreHours = async (updatedHours: OpeningHour[]): Promise<boolean> => {
    console.log("updateStoreHours needs to be migrated to Supabase.", updatedHours);
    // Placeholder logic for now, will be replaced with actual Supabase call.
    return false;
  };

  const updateStoreDetails = async (details: Partial<Omit<StoreInfo, 'hours'>>): Promise<boolean> => {
    console.log("updateStoreDetails needs to be migrated to Supabase.", details);
    // Placeholder logic for now, will be replaced with actual Supabase call.
    return false;
  };

  return { hours, activeTheme, phoneNumber, isLoading, error, updateStoreHours, updateStoreDetails };
};