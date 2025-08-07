'use server'

import { createClient } from '@supabase/supabase-js'

// This admin client is for server-side operations only
// It should ONLY be used in Server Components or API routes
export const createAdminClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!
  
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
