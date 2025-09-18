// src/services/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and Anon Key from our environment variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the variables are missing to prevent runtime errors.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and/or Anon Key are missing from .env file.");
}

// Create and export the Supabase client.
// This single instance will be used to interact with the database,
// authentication, and storage throughout the application.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);