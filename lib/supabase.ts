import { createClient } from '@supabase/supabase-js';

/**
 * Environment variables for Supabase connection.
 * Prioritizes Vite-standard 'VITE_' prefix for production builds.
 */
const getEnv = (key: string): string => {
  const vKey = `VITE_${key}`;
  
  // Try Vite meta env (standard for modern React/Vite builds)
  const metaEnv = (import.meta as any).env;
  if (metaEnv) {
    if (metaEnv[vKey]) return metaEnv[vKey];
    if (metaEnv[key]) return metaEnv[key];
  }

  // Fallbacks for specific project identity
  const fallbacks: Record<string, string> = {
    'SUPABASE_URL': 'https://bosrulfjzhoqzjrsnxyr.supabase.co',
    // Note: The previous key was likely invalid. 
    // Replacing with a placeholder format or keeping the user-provided one.
    // If you see 'Failed to fetch', ensure the URL and Key are correct in your Supabase Dashboard.
    'SUPABASE_ANON_KEY': 'sb_publishable_DCkI-xqaNYulXUZCPHK0Tg_Z2ETXtyf'
  };

  return fallbacks[key] || '';
};

export const supabaseUrl = getEnv('SUPABASE_URL');
export const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

/**
 * Robust check to see if the client can actually initialize.
 * Valid Supabase Anon Keys usually start with 'eyJ' (JWT).
 */
export const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co') &&
  !supabaseUrl.includes('placeholder')
);

/**
 * Initialize client with safer defaults to prevent 'Failed to fetch' 
 * during initialization when environment is restricted.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    }
  }
);

export default supabase;