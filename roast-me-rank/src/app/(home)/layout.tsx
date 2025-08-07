'use client';

import { NavBar } from '@/components/NavBar';
import { useSupabase } from '@/context/SupabaseProvider';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, signOut } = useSupabase();
  
  // Transform the Supabase user to the format expected by NavBar
  const navBarUser = user ? {
    id: user.id,
    username: user.user_metadata?.username || 'User',
    avatarUrl: user.user_metadata?.avatar_url,
  } : null;

  return (
    <>
      <NavBar user={navBarUser} onLogout={signOut} />
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </>
  )
}
