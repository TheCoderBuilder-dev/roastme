'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Flame, ChevronLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <Flame className="h-16 w-16 text-orange-500" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold mb-2">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          Even our top roasters couldn't find it!
        </p>
        
        <div className="space-y-3">
          <Link href="/">
            <Button className="w-full" variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" /> 
              Go Back Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button className="w-full" variant="fire">
              <Search className="h-4 w-4 mr-2" />
              Discover Roasts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
