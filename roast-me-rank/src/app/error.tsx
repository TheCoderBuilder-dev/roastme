'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Flame } from 'lucide-react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  // Log the error to an error reporting service
  React.useEffect(() => {
    console.error('Unhandled error:', error);
    
    // In a production application, you would log to a service like Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white rounded-xl shadow-lg text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <Flame className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Something went wrong</h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error. Our team has been notified.
          </p>
          {process.env.NODE_ENV !== 'production' && (
            <div className="text-left p-4 bg-gray-100 rounded-lg overflow-auto text-sm text-gray-800 mb-4">
              <p className="font-semibold">{error.name}: {error.message}</p>
              {error.stack && (
                <pre className="mt-2 text-xs overflow-auto">
                  {error.stack.split('\n').slice(1).join('\n')}
                </pre>
              )}
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-3">
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
