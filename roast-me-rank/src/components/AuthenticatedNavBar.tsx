'use client'

import React from 'react';
import { NavBar } from '@/components/NavBar';
import { useSupabase } from '@/context/SupabaseProvider';

export function AuthenticatedNavBar() {
  const { user, signOut } = useSupabase();
  
  // Transform the Supabase user to the format expected by NavBar
  const navBarUser = user ? {
    id: user.id,
    username: user.user_metadata?.username || 'User',
    avatarUrl: user.user_metadata?.avatar_url,
  } : null;

  // Mock notifications for now - this would come from your database in a real app
  const notifications = 2;

  return (
    <NavBar 
      user={navBarUser} 
      notifications={notifications} 
      onLogout={signOut}
    />
  );
}
