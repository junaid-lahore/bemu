'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { NavigationBarNew } from '@/components/NavigationBarNew';
import { Footer } from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
      <NavigationBarNew />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#FFA64D] mb-4">Something went wrong!</h1>
          <p className="text-2xl text-gray-400 mb-8">{error.message || 'An unexpected error occurred'}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#FFA64D] text-white rounded-full hover:brightness-110 transition"
            >
              Try again
            </button>
            <Link href="/" className="px-6 py-3 border border-[#FFA64D] text-[#FFA64D] rounded-full hover:bg-[#FFA64D22] transition">
              Go home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

