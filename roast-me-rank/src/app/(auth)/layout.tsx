'use client';

import { NavBar } from '@/components/NavBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </>
  )
}
