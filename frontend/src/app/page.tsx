import React from "react";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/AboutSection";
import ShortsSlider from "@/components/ShortsSlider";
import ValuesSection from "@/components/ValuesSection";
import CharactersSection from "@/components/CharactersSection";
import BehindTheLight from "@/components/BehindTheLight";
import WatchAndConnect from "@/components/WatchAndConnect";
import SubscribeSection from "@/components/SubscribeSection";
import StatsCounter from "@/components/StatsCounter";
import Testimonials from "@/components/Testimonials";
import CommunityShowcase from "@/components/CommunityShowcase";
import MomentsGallery from "@/components/MomentsGallery";
import ImpactSection from "@/components/ImpactSection";

const HERO_VIDEO_URL = "https://cdn.coverr.co/videos/coverr-glowing-particles-5026/1080p.mp4";
const HERO_POSTER_URL = "https://images.unsplash.com/photo-1534031850934-2399b6c45964?auto=format&fit=crop&w=2070&q=80";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-beamu-shadow-gray">
      <NavigationBarNew />
      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="hero-feature"
          className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0C1021] to-[#181C28]"
        >
          {/* Video for Desktop */}
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={HERO_POSTER_URL}
            className="absolute top-0 left-0 w-full h-full object-cover hidden md:block"
          >
            <source
              src={HERO_VIDEO_URL}
              type="video/mp4"
            />
          </video>
          {/* Image for Mobile */}
          <div 
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center md:hidden"
            style={{ backgroundImage: `url(${HERO_POSTER_URL})`}}
          />

          <div className="absolute inset-0 bg-black bg-opacity-40" />
          
          <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-glow">
              Every light tells a story.
            </h1>
            <p className="mt-4 text-xl text-gray-200 max-w-2xl">
              Meet Beamu — the glowing friend who learns from every adventure.
            </p>
            <a href="https://youtube.com/@BeamuAdventures" target="_blank" rel="noopener noreferrer">
              <Button 
                className="mt-8 px-8 py-6 rounded-full bg-beamu-orange text-white font-semibold shadow-lg hover:brightness-110 transition-all duration-300 text-lg"
              >
                ▶ Visit YouTube Channel
              </Button>
            </a>
          </div>
        </section>
        <AboutSection />
        <ShortsSlider />
        <StatsCounter />
        <ValuesSection />
        <CharactersSection />
        <Testimonials />
        <CommunityShowcase />
        <MomentsGallery />
        <ImpactSection />
        <BehindTheLight />
        <WatchAndConnect />
        <SubscribeSection />
      </main>
      <Footer />
    </div>
  );
}


