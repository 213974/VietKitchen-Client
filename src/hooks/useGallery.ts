import { useState, useEffect, useCallback } from 'react';
import apiClient from '../services/apiClient';
import { isAxiosError } from 'axios';

// Defines the structure for a gallery category.
export interface GalleryCategory {
  _id: string;
  name: string;
  order: number;
}

// Defines the structure for a gallery image, including its populated category.
export interface GalleryImage {
  _id:string;
  imageUrl: string;
  altText: string;
  category: GalleryCategory;
}

/**
 * A comprehensive hook for managing all state and CRUD operations for the gallery.
 * It handles fetching, creating, deleting, and reordering both images and categories.
 */
export const useGallery = () => {
  // State for all gallery images.
  const [images, setImages] = useState<GalleryImage[]>([]);
  // State for all gallery categories.
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  // A single loading state for the initial data fetch.
  const [isLoading, setIsLoading] = useState(true);
  // A state to hold any errors that occur.
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches both images and categories from the API in parallel.
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [imagesRes, categoriesRes] = await Promise.all([
        apiClient.get<GalleryImage[]>('/gallery'),
        apiClient.get<GalleryCategory[]>('/gallery/categories'),
      ]);
      setImages(imagesRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      setError('Failed to load gallery data. Please refresh the page.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial data when the hook is first used.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- CRUD Functions ---

  const addImage = async (formData: FormData): Promise<GalleryImage | null> => {
    try {
      const { data } = await apiClient.post<GalleryImage>('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Optimistically add the new image to the top of the list.
      setImages(prev => [data, ...prev]);
      return data;
    } catch (err) {
      console.error(err);
      if (isAxiosError(err) && err.response) {
        throw new Error(err.response.data.message || 'Failed to upload image.');
      }
      throw new Error('An unexpected error occurred while uploading.');
    }
  };

  const deleteImage = async (imageId: string): Promise<void> => {
    try {
      await apiClient.delete(`/gallery/${imageId}`);
      // Optimistically remove the image from the state.
      setImages(prev => prev.filter(img => img._id !== imageId));
    } catch (err) {
      console.error(err);
      if (isAxiosError(err) && err.response) {
        throw new Error(err.response.data.message || 'Failed to delete image.');
      }
      throw new Error('An unexpected error occurred while deleting.');
    }
  };
  
  const addCategory = async (name: string): Promise<GalleryCategory | null> => {
    try {
      const { data } = await apiClient.post<GalleryCategory>('/gallery/categories', { name });
      // Optimistically add the new category to the state.
      setCategories(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error(err);
      if (isAxiosError(err) && err.response) {
        throw new Error(err.response.data.message || 'Failed to add category.');
      }
      throw new Error('An unexpected error occurred while adding category.');
    }
  };

  const deleteCategory = async (categoryId: string): Promise<void> => {
    try {
      await apiClient.delete(`/gallery/categories/${categoryId}`);
      // Optimistically remove the category from the state.
      setCategories(prev => prev.filter(cat => cat._id !== categoryId));
    } catch (err) {
      console.error(err);
      if (isAxiosError(err) && err.response) {
        throw new Error(err.response.data.message || 'Failed to delete category.');
      }
      throw new Error('An unexpected error occurred while deleting category.');
    }
  };

  const reorderCategories = async (orderedIds: string[]): Promise<void> => {
    try {
      await apiClient.put('/gallery/categories/reorder', { orderedIds });
    } catch (err) {
      console.error("Failed to save new category order:", err);
      // On failure, refetch data to revert the optimistic UI update.
      fetchData(); 
      throw new Error('Failed to save the new category order.');
    }
  };

  return { 
    images, 
    categories, 
    setCategories, // Expose setter for optimistic DnD updates in the component.
    isLoading, 
    error, 
    addImage, 
    deleteImage,
    addCategory,
    deleteCategory,
    reorderCategories,
  };
};