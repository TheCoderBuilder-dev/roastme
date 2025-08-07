'use server'

import { createAdminClient } from '@/lib/supabase-admin';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase-server';

export async function createUserProfile(userId: string, username: string, email: string) {
  try {
    const supabaseAdmin = await createAdminClient();
    
    // Create user profile with admin privileges (bypassing RLS)
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .insert([
        {
          id: userId,
          username,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          level: 1,
          xp: 0,
          is_private: false,
          filter_mode_enabled: true,
          approve_roasts_first: false
        },
      ])
      .select();

    if (error) {
      console.error('Error creating profile via server action:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error in createUserProfile:', error);
    return { success: false, error };
  }
}

export async function checkUsernameExists(username: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)
      .maybeSingle();
    
    if (error) {
      return { exists: false, error };
    }
    
    return { exists: !!data, data };
  } catch (error) {
    console.error('Error checking username:', error);
    return { exists: false, error };
  }
}
