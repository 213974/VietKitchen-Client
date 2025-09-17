import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';

// Defines the shape of the statistics data received from the API.
interface DashboardStats {
  menuItemCount: number;
  galleryImageCount: number;
}

/**
 * A custom hook to fetch aggregate statistics for the admin dashboard.
 * @returns An object containing the fetched `stats`, `isLoading` state, and any `error` that occurred.
 */
export const useDashboardStats = () => {
  // State for the fetched statistics data.
  const [stats, setStats] = useState<DashboardStats | null>(null);
  // State to track the loading status of the API request.
  const [isLoading, setIsLoading] = useState(true);
  // State to store any potential error messages.
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Fetch the data from the protected '/dashboard/stats' endpoint.
        const response = await apiClient.get<DashboardStats>('/dashboard/stats');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError('Could not load website statistics.');
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch stats on initial component mount.
    fetchStats();
  }, []); // Empty dependency array ensures this runs only once.

  return { stats, isLoading, error };
};