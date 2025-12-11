import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#0C1021] to-[#000000] border-t border-[#FFA64D22] py-16 overflow-hidden">
      {/* Animated Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA64D11_0%,transparent_70%)] animate-pulse pointer-events-none" />
      
      <div className="content-wrapper relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: About Beamu */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Beamu_face.jpg" 
                alt="Beamu" 
                className="w-12 h-12 rounded-full border-2 border-[#FFA64D] shadow-lg shadow-[#FFA64D33]"
              />
              <span className="text-2xl font-bold text-[#FFA64D] text-glow">Beamu</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Join Beamu on magical adventures filled with wonder, friendship, and life lessons. 
              Bringing light to every story.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FFA64D] mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/adventures" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Adventures
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Blogs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FFA64D] mb-4">Community</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-[#FFA64D] transition-colors duration-200 text-sm flex items-center gap-2">
                  <span className="text-[#FFA64D]">›</span> Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#FFA64D] mb-4">Follow Our Adventures</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.youtube.com/@BeamuAdventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#1A1F2B] border border-[#FFA64D22] rounded-full hover:bg-[#FFA64D22] hover:border-[#FFA64D] hover:shadow-[0_0_20px_rgba(255,166,77,0.3)] transition-all duration-300 group"
              >
                <FaYoutube className="text-gray-400 group-hover:text-[#FFA64D] text-xl transition-colors" />
              </a>
              <a 
                href="https://www.instagram.com/beamuadventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#1A1F2B] border border-[#FFA64D22] rounded-full hover:bg-[#FFA64D22] hover:border-[#FFA64D] hover:shadow-[0_0_20px_rgba(255,166,77,0.3)] transition-all duration-300 group"
              >
                <FaInstagram className="text-gray-400 group-hover:text-[#FFA64D] text-xl transition-colors" />
              </a>
              <a 
                href="https://www.tiktok.com/@beamuadventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#1A1F2B] border border-[#FFA64D22] rounded-full hover:bg-[#FFA64D22] hover:border-[#FFA64D] hover:shadow-[0_0_20px_rgba(255,166,77,0.3)] transition-all duration-300 group"
              >
                <FaTiktok className="text-gray-400 group-hover:text-[#FFA64D] text-xl transition-colors" />
              </a>
              <a 
                href="https://x.com/beamuadventures" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center bg-[#1A1F2B] border border-[#FFA64D22] rounded-full hover:bg-[#FFA64D22] hover:border-[#FFA64D] hover:shadow-[0_0_20px_rgba(255,166,77,0.3)] transition-all duration-300 group"
              >
                <FaTwitter className="text-gray-400 group-hover:text-[#FFA64D] text-xl transition-colors" />
              </a>
            </div>
            
            {/* Subscribe CTA */}
            <div className="mt-6 pt-6 border-t border-[#FFA64D22]">
              <p className="text-gray-400 text-sm mb-3">Subscribe for updates</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-[#1A1F2B] border border-[#FFA64D22] rounded-lg text-white text-sm focus:outline-none focus:border-[#FFA64D] transition-colors"
                />
                <button className="px-4 py-2 bg-[#FFA64D] text-white rounded-lg font-semibold text-sm hover:bg-[#FFC94D] transition-colors">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#FFA64D22]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Beamu Adventures | Created by <span className="text-[#FFA64D]">EraXpert</span>
            </p>
            <div className="flex items-center gap-4 text-gray-500 text-sm">
              <span>Made with AI & Love</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
