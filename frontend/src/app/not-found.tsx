import Link from 'next/link';
import { NavigationBarNew } from '@/components/NavigationBarNew';
import { Footer } from '@/components/Footer';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
      <NavigationBarNew />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-[#FFA64D] mb-4">404</h1>
          <p className="text-2xl text-gray-400 mb-8">Page not found</p>
          <Link href="/" className="text-[#FFA64D] hover:underline">
            ← Go back home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

