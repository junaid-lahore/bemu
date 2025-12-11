'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

// The static asset URL for the logo
const logoUrl = "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Beamu_face.jpg";

export const NavigationBarNew = () => {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/5 border-b border-white/10">
      <nav className="flex justify-between items-center px-8 py-4 content-wrapper">
        {/* Left Section: Logo Icon + Text */}
        <Link href="/" className="flex items-center gap-3">
          {/* Beamu Face Icon */}
          <img 
            src={logoUrl} 
            alt="Beamu Logo" 
            className="w-10 h-10 rounded-full border border-[#FFA64D66] shadow-sm shadow-[#FFA64D33] object-cover" 
          />

          {/* Brand Text */}
          <h1 className="text-2xl font-bold text-[#FFA64D] tracking-wide">Beamu</h1>
        </Link>

        {/* Right Section: Nav Links */}
        <div className="flex items-center gap-8 text-white/90 text-sm font-medium">
          <Link href="/" className={`hover:text-[#FFA64D] transition ${isActive("/") ? "text-[#FFA64D]" : ""}`}>Home</Link>
          <Link href="/adventures" className={`hover:text-[#FFA64D] transition ${isActive("/adventures") ? "text-[#FFA64D]" : ""}`}>Adventures</Link>
          <Link href="/contact" className={`hover:text-[#FFA64D] transition ${isActive("/contact") ? "text-[#FFA64D]" : ""}`}>Contact</Link>
          <Link href="/blogs" className={`hover:text-[#FFA64D] transition ${isActive("/blogs") ? "text-[#FFA64D]" : ""}`}>Blogs</Link>
          <a href="https://youtube.com/@BeamuAdventures" target="_blank" rel="noopener noreferrer"
             className="px-4 py-2 rounded-full bg-[#FFA64D] text-white hover:brightness-110 transition">
            Watch
          </a>
        </div>
      </nav>
    </header>
  );
};
