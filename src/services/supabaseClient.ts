// src/services/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and Anon Key from our environment variables.
// FIX: Use NEXT_PUBLIC_ prefix for Next.js environment variables.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the variables are missing to prevent runtime errors.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and/or Anon Key are missing from .env.local file.");
}

// Create and export the Supabase client.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);