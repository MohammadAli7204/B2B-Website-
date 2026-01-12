import { createClient } from 'https://esm.sh/@supabase/supabase-js';

/**
 * Environment variables for Supabase connection.
 * Prioritizes process.env for the execution context.
 */
const getEnv = (key: string): string => {
  // Hardcoded fallback based on project identity provided by user
  const fallbacks: Record<string, string> = {
    'SUPABASE_URL': 'https://bosrulfjzhoqzjrsnxyr.supabase.co',
    'SUPABASE_ANON_KEY': 'sb_publishable_DCkI-xqaNYulXUZCPHK0Tg_Z2ETXtyf'
  };

  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  
  const metaEnv = (import.meta as any).env;
  if (metaEnv && metaEnv[key]) {
    return metaEnv[key];
  }

  return fallbacks[key] || '';
};

export const supabaseUrl = getEnv('SUPABASE_URL');
export const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

/**
 * Configuration state
 */
export const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('placeholder')
);

/**
 * Initialize client
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

export default supabase;