import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

// Lazy initialization - only create client when actually needed
// This prevents 500 errors when Supabase is not configured
let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabase() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

// Export null for backward compatibility, but code should use getSupabase()
export const supabase: ReturnType<typeof createClient<Database>> | null = null;
