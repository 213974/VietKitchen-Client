import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

export interface Promotion {
  id: number;
  title: string;
  content: string | null;
  image_url: string | null;
  is_active: boolean; // Add is_active to the type for admin use
  display_type: 'BANNER' | 'SIDE_LEFT' | 'SIDE_RIGHT';
  persistence_type: 'PERMANENT' | 'SESSION';
  duration_seconds: number | null;
}

// THIS IS A NAMED EXPORT. It must be imported using { usePromotions }.
export const usePromotions = (fetchInactive: boolean = false) => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPromotions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase.from('promotions').select('*');

      // The public-facing hook only fetches active promotions.
      // The admin panel will set fetchInactive to true.
      if (!fetchInactive) {
        query = query.eq('is_active', true);
      }

      const { data, error: dbError } = await query;

      if (dbError) throw dbError;

      setPromotions(data || []);
    } catch (err) {
      console.error("Failed to fetch promotions from Supabase:", err);
      setError('Could not load promotional content.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchInactive]);

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);

  // Expose a refetch function so the admin panel can refresh the list after an update.
  return { promotions, isLoading, error, refetch: fetchPromotions };
};