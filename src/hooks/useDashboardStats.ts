import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../services/supabaseClient';

interface DashboardStats {
  galleryImageCount: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use the Supabase client to count the rows in the gallery_images table
      const { count, error: countError } = await supabase
        .from('gallery_images')
        .select('*', { count: 'exact', head: true }); // A special query to only get the count

      if (countError) throw countError;

      setStats({
        galleryImageCount: count ?? 0,
      });
    } catch (err) {
      console.error('Failed to fetch dashboard stats from Supabase:', err);
      setError('Could not load website statistics.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats }; // Expose a refetch function
};