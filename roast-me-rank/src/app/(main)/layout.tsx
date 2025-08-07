'use client';

import { AuthenticatedNavBar } from '@/components/AuthenticatedNavBar';
import { useSupabase } from '@/context/SupabaseProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useSupabase();
  const router = useRouter();
  
  useEffect(() => {
    // If user is not logged in and finished loading, redirect to login
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  // Don't render anything while loading or if not logged in
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <AuthenticatedNavBar />
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </>
  )
}
