'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import the editor to avoid SSR issues
const CollaborativeEditor = dynamic(
  () => import('../components/CollaborativeEditor'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading collaborative editor...</p>
        </div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main>
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Initializing...</p>
          </div>
        </div>
      }>
        <CollaborativeEditor />
      </Suspense>
    </main>
  );
}