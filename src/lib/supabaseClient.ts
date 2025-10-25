import { createClient } from '@supabase/supabase-js'

// 1. Get your Supabase URL and Anon Key from .env files
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 2. Check if they are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in .env')
}

// 3. Create and export the client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // This setting is recommended for modern web apps
    autoRefreshToken: true,
    persistSession: true,
  },
})
