import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CenteredContent from "./CenteredContent";
import { Youtube, Instagram, Twitter, Compass } from 'lucide-react'; // Using Compass for TikTok as a placeholder

const shorts = [
  { id: "YJozcdY-wrI", title: "Ep 4 · The Final Footsteps", caption: "Sometimes silence means courage.", category: "all" },
  { id: "CEC_DvkMvI8", title: "Ep 5 · The Morning Promise", caption: "Sometimes truth comes with a smile.", category: "all" },
  { id: "EDv8QzZK4", title: "Ep 6 · The Hidden Secret", caption: "A small light can make a big difference.", category: "all" },
  { id: "kdK8qIuXsRw", title: "Ep 7 · The Brave Confession", caption: "Honesty is the bravest magic.", category: "all" },
  { id: "e0QgTcPitQI", title: "Ep 8 · The Gentle Glow", caption: "Kindness shines the brightest.", category: "all" },
  { id: "r0nCXgifiKI", title: "Ep 9 · The Unexpected Friend", caption: "Friendship finds a way.", category: "all" },
];

const WatchAndConnect: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    // Filtering logic will be added here
  };

  return (
    <section id="watch-connect" className="py-24 bg-gradient-to-b from-[#181C28] to-[#0C1021] text-center">
      <CenteredContent>
        <h2 className="text-4xl font-bold text-[#FFA64D] mb-4 text-glow">Watch & Connect with Beamu</h2>
        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
          Watch all shorts from every episode, filter your favorites, and connect with Beamu on your favorite platforms.
        </p>

        <div className="flex flex-wrap justify-center mb-10">
          {["All", "Episode 1–10", "Most Popular", "Newest"].map((filter) => (
            <Button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              variant="outline"
              className={`filter-button ${activeFilter === filter ? "active" : ""}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shorts.map((short) => (
            <div key={short.id} className="video-card group">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-beamu-orange/20">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${short.id}?rel=0&modestbranding=1&controls=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-4 text-left">
                <h3 className="text-white font-semibold mt-3">{short.title}</h3>
                <p className="text-gray-400 text-sm">{short.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-[#FFA64D] text-xl font-semibold mb-6">Follow Beamu’s Glow Everywhere ✨</h3>
          <div className="flex justify-center gap-6">
            <a href="https://youtube.com/@BeamuAdventures" target="_blank" className="social-icon">
              <Youtube />
            </a>
            <a href="https://instagram.com/beamuadventures" target="_blank" className="social-icon">
              <Instagram />
            </a>
            <a href="https://tiktok.com/@beamuadventures" target="_blank" className="social-icon">
              <Compass />
            </a>
            <a href="https://x.com/beamuadventures" target="_blank" className="social-icon">
              <Twitter />
            </a>
          </div>
        </div>
      </CenteredContent>
    </section>
  );
};

export default WatchAndConnect;
