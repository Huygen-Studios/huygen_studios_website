import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || ''

// Check if URL is valid (must start with https://)
const isValidUrl = supabaseUrl.startsWith('https://')

// Export a dummy client if credentials are missing or invalid
export const supabase = (isValidUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        insert: async () => ({ error: new Error('Supabase credentials missing or invalid URL. Please check your .env file.') })
      })
    } as unknown as SupabaseClient;
