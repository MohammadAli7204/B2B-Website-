import { createClient } from '@supabase/supabase-js';

const getEnv = (key: string): string => {
  const vKey = `VITE_${key}`;
  const metaEnv = (import.meta as any).env;
  if (metaEnv) {
    if (metaEnv[vKey]) return metaEnv[vKey];
    if (metaEnv[key]) return metaEnv[key];
  }

  const fallbacks: Record<string, string> = {
    'SUPABASE_URL': 'https://bosrulfjzhoqzjrsnxyr.supabase.co',
    'SUPABASE_ANON_KEY': 'sb_publishable_DCkI-xqaNYulXUZCPHK0Tg_Z2ETXtyf'
  };

  return fallbacks[key] || '';
};

export const supabaseUrl = getEnv('SUPABASE_URL');
export const supabaseAnonKey = getEnv('SUPABASE_ANON_KEY');

export const isConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co')
);

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

/**
 * Diagnostic tool to check if the API is reachable.
 * Helps debug 'Failed to fetch' issues.
 */
export const testConnection = async () => {
  if (!isConfigured) return { success: false, message: 'Configuration Missing' };
  try {
    const start = Date.now();
    const { data, error } = await supabase.from('careguard').select('id').limit(1);
    const latency = Date.now() - start;
    
    if (error) {
      if (error.code === '42P01') return { success: true, message: 'Connected, but Table Missing', latency };
      throw error;
    }
    return { success: true, message: 'Operational', latency };
  } catch (err: any) {
    return { 
      success: false, 
      message: err.message === 'Failed to fetch' ? 'Network Blocked (CORS/Offline)' : err.message 
    };
  }
};

export default supabase;