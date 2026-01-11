
import { createClient } from 'https://esm.sh/@supabase/supabase-js';

/**
 * Environment variables for Supabase connection.
 * Checks for both standard Vite/Next.js naming conventions and the specific keys provided by the user.
 */
const getEnv = (key: string): string => {
  const possibleKeys = [
    key,
    `VITE_${key}`,
    `NEXT_PUBLIC_${key}`,
    key.replace('ANON_KEY', 'PUBLISHABLE_DEFAULT_KEY'),
    `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
  ];

  if (typeof process !== 'undefined' && process.env) {
    for (const k of possibleKeys) {
      if (process.env[k]) return process.env[k] as string;
    }
  }
  
  const metaEnv = (import.meta as any).env;
  if (metaEnv) {
    for (const k of possibleKeys) {
      if (metaEnv[k]) return metaEnv[k];
    }
  }

  // Hardcoded Fallback for this specific project instance based on user input
  if (key === 'SUPABASE_URL') return 'https://bosrulfjzhoqzjrsnxyr.supabase.co';
  if (key === 'SUPABASE_ANON_KEY') return 'sb_publishable_DCkI-xqaNYulXUZCPHK0Tg_Z2ETXtyf';

  return '';
};

export const supabaseUrl = getEnv('SUPABASE_URL');
export const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

/**
 * Verification state
 */
export const isConfigured = Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

/**
 * Initialize client with safety defaults to prevent "url is required" crash
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export default supabase;
