'use client';

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import Link from "next/link";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";

// --- Data Structure for Adventure Arcs and Episodes ---
const adventureData: { [key: string]: AdventureArc } = {
  "1": {
    id: 1,
    title: "Adventure 01: Beamu Meets the Family",
    episodes: [
        {
            title: "Episode 1",
            shorts: [
                { title: "Welcome to the Planet of Happiness 🌈 | Beamu's First Arrival | Animated Kids Story | Ep:1.1", url: "https://www.youtube.com/embed/WWt4yhsbmSY" },
                { title: "Beamu Explores the Forest 🌳 | Leo's Bus Stops! | Animated Kids Adventure – Ep: 1.2", url: "https://www.youtube.com/embed/0N96Ltu9wr0" },
                { title: "Beamu Meets Leo 🤖💛 | The First Friendship Begins | Animated Kids Story – Ep: 1.3", url: "https://www.youtube.com/embed/vEa1cYmQCJk" },
                { title: "Beamu Plays at Leo's Home | Fun with Toys! | Beamu Adventures – Ep: 1.4", url: "https://www.youtube.com/embed/L8Zq4ej7Y-Q" },
            ]
        },
        {
            title: "Episode 2",
            shorts: [
                { title: "Beamu Hides in the Cupboard! | Funny Secret at Leo's Home | Beamu Adventures | Ep: 2.1", url: "https://www.youtube.com/embed/3rghg1oCTuo" },
                { title: "Leo's Parents Walk In! | Beamu's Secret Almost Found | Beamu Adventures – Ep: 2.2", url: "https://www.youtube.com/embed/0qJLjTtFNjU" },
                { title: "Beamu Makes a Loud Crash! | Mom Almost Finds the Secret | Beamu Adventures – Ep: 2.3", url: "https://www.youtube.com/embed/l0bzYdvDvlA" },
                { title: "Leo Says Sorry to Beamu! | Friendship and Forgiveness | Beamu Adventures – Ep: 2.4", url: "https://www.youtube.com/embed/kXiNlEJf4gs" },
                { title: "Leo Joins His Family for Lunch! | Beamu's Secret Stays Safe | Beamu Adventures – Ep: 2.5", url: "https://www.youtube.com/embed/sXD_04Oox3Y" },
                { title: "Beamu Sneaks Out! | Mom Gets Curious | Beamu Adventures – Ep: 2.6", url: "https://www.youtube.com/embed/2CKHFHXL5x0" },
            ]
        },
        {
            title: "Episode 3",
            shorts: [
                { title: "Beamu Wants to Go to School 🎒 | The Secret Morning Promise | Ep: 3.1", url: "https://www.youtube.com/embed/tsqKYU9hRfQ" },
                { title: "Sneaking Beamu to School 🚌 | The Hidden Glow | Beamu Adventures Ep: 3.2", url: "https://www.youtube.com/embed/Z-pSTnfdtX4" },
                { title: "The Classroom Secret 🤖 | Beamu Gets Discovered at School! | Beamu Adventures Ep:  3.3", url: "https://www.youtube.com/embed/jP4uqPZXmc4" },
                { title: "The Teacher's Lesson 👩‍🏫 | Beamu Waits Alone | Beamu Adventures Ep: 3.4", url: "https://www.youtube.com/embed/ZoFBx2meMZM" },
                { title: "Don't Cry, Beamu 💛 | Beamu Smiles Again | Beamu Adventures Ep: 3.5", url: "https://www.youtube.com/embed/n7rc1iinUs4" },
                { title: "The Evening Secret 🌙 | Beamu's Safe Place | Beamu Adventures Ep: 3.6", url: "https://www.youtube.com/embed/jFomxlK0IT8" },
                { title: "The Teacher's Call ☎️ | The Secret Is Out! | Beamu Adventures Ep: 3.7", url: "https://www.youtube.com/embed/RqQHBL2NxRQ" },
            ]
        },
        {
            title: "Episode 4",
            shorts: [
                { title: "The Unexpected Visitor | The Secret Call | Beamu Adventures Ep: 4:1", url: "https://www.youtube.com/embed/r0nCXgifiKI" },
                { title: "The Night Escape 🌙 | Beamu Misses Leo | Beamu Adventures Ep: 4.2", url: "https://www.youtube.com/embed/e0QgTcPitQI" },
                { title: "Beamu's Journey ✨ | The Magical Reunion | Beamu Adventures Ep: 4:3", url: "https://www.youtube.com/embed/kdK8qIuXsRw" },
                { title: "The Secret Cure 💛 | Beamu's Gentle Light | Beamu Adventures Ep: 4.4", url: "https://www.youtube.com/embed/EDv8Q9QzZK4" },
                { title: "The Hidden Secret 🤫 | Beamu Vanishes! | Beamu Adventures Ep: 4.5", url: "https://www.youtube.com/embed/CEC_DvkMvI8" },
                { title: "The Final Footsteps 🚪 | Leo Keeps the Secret | Beamu Adventures Ep: 4.6", url: "https://www.youtube.com/embed/YJozcdY-wrI" },
            ]
        },
        {
            title: "Episode 5",
            shorts: [
                { title: "Beamu Came Back… But How?! 🤖✨ | Beamu's Return | Beamu Adventures Ep: 5.1", url: "https://www.youtube.com/embed/9_6kudhDllc" },
                { title: "They Vanished in a Flash! ⚡🤖 You Won't Believe What Happened Next | Beamu Adventures | Ep: 5.2", url: "https://www.youtube.com/embed/455na15RQ9k" },
                { title: "They Got Caught! 😱⚡ Beamu's Wild Escape Begins | Beamu Adventures Ep: 5.3", url: "https://www.youtube.com/embed/BYPrqBHAcUc" },
                { title: "The Forest Escape 🌲✨ | Beamu's Journey to the Mountain | Beamu Adventures Ep: 5.4", url: "https://www.youtube.com/embed/hZSWAsUC_As" },
                { title: "The Mountain View 🌄✨ | Beamu's First Photo with Leo! | Beamu Adventures Ep: 5.5", url: "https://www.youtube.com/embed/IUmmB47uUcY" },
                { title: "The Way Home 🌙✨ | Beamu & Leo's Peaceful Return | Beamu Adventures Ep: 5.6", url: "https://www.youtube.com/embed/HNny5xg-dak" },
                { title: "The Shocking Discovery 😱⚡ | They Found Beamu! | Beamu Adventures Ep: 5.7", url: "https://www.youtube.com/embed/hFNEoj-tdWI" },
            ]
        },
        {
            title: "Episode 6",
            shorts: [
                { title: "The Secret's Out! 🤖💥 They Found Beamu | Beamu Adventures Ep: 6.1", url: "https://www.youtube.com/embed/zAooWM4w8qM" },
                { title: "Mom… He's Not From Earth 😳🤖 | Beamu's Secret Revealed | Beamu Adventures Ep: 6.2", url: "https://www.youtube.com/embed/WZiUXlvre48" },
                { title: "The Light of Forgiveness 💛✨ | Beamu's Glow of Truth | Beamu Adventures Ep: 6.3", url: "https://www.youtube.com/embed/50TT92f8sC4" },
                { title: "They Finally Called Him Family 💛✨ | Beamu's Heartwarming Welcome | Beamu Adventures Ep: 6.4", url: "https://www.youtube.com/embed/TH-yPZnDjcA" },
                { title: "His Last Words… 🌙💛 "Every Light Shines Brighter" | Beamu Adventures | Adv: 01 | Ep: 6.5", url: "https://www.youtube.com/embed/6YaiXV62zT4" },
            ]
        }
    ],
  },
  "2": {
    id: 2,
    title: "Adventure 02: The Lost Signal",
    episodes: [
        {
            title: "Episode 1",
            shorts: [
                { title: "The Signal from Space 🚀✨ | Beamu's New Experiment Begins! | Adv: 02, Ep: 1.1", url: "https://www.youtube.com/embed/WJY8q5BCh9M" },
                { title: "🎬 She Walked In… But Something Answered Back 😨📡 | Adv: 02, Ep: 1.2 | The Signal from Space", url: "https://www.youtube.com/embed/JY5Y7-iWLdA" },
                { title: "🎬 The Signal Speaks… 📡💫 Beamu's Name Echoes from Space | Adv: 02, Ep: 1.3 | The Signal from Space", url: "https://www.youtube.com/embed/sPxanr9zPpI" },
            ]
        },
        {
            title: "Episode 2",
            shorts: [
                { title: "The Signal Starts Talking 😱📡 | Adv: 02, Ep: 02.1 | Morning in the Lab", url: "https://www.youtube.com/embed/6xM_VWoCppc" },
                { title: "The Message From Beamu's Home ✨📡 | The Moment Everything Changes | Adv: 02 – Ep: 2.2", url: "https://www.youtube.com/embed/XCyVS-mC8kE" },
                { title: "Beamu's Honest Promise 🌍💛 | The Truth About Earth | Adventure 02 – Episode 2.3", url: "https://www.youtube.com/embed/wrBDMvNgqLo" },
            ]
        },
        {
            title: "Episode 3",
            shorts: [
                { title: "Something Reached for Him Last Night… 😨✨ | Adv: 02, Ep: 03.1 | Morning Unease", url: "https://www.youtube.com/embed/giUKqdnL9pk" },
                { title: "Asuma Came For Beamu… 😳⚡ | Adv: 02, Ep: 3.2 | The Guardian Arrives", url: "https://www.youtube.com/embed/0OyOJSReYOw" },
            ]
        }
    ],
  },
};

interface Short {
  title: string;
  url: string;
}

interface Episode {
  title: string;
  shorts: Short[];
}

interface AdventureArc {
  id: number;
  title: string;
  episodes: Episode[];
}

export default function AdventureDetail() {
  const searchParams = useSearchParams();
  const arcId = searchParams.get("arcId");
  const episodeParam = searchParams.get("episode");
  const shortParam = searchParams.get("short");

  const [arc, setArc] = useState<AdventureArc | null>(null);
  const [activeShort, setActiveShort] = useState<Short | null>(null);

  useEffect(() => {
    const currentArc = arcId ? adventureData[arcId] : null;
    if (currentArc) {
      setArc(currentArc);
      
      if (episodeParam !== null && shortParam !== null) {
        const episodeIndex = parseInt(episodeParam);
        const shortIndex = parseInt(shortParam);
        
        if (currentArc.episodes[episodeIndex] && currentArc.episodes[episodeIndex].shorts[shortIndex]) {
          setActiveShort(currentArc.episodes[episodeIndex].shorts[shortIndex]);
          return;
        }
      }
      
      if (currentArc.episodes.length > 0 && currentArc.episodes[0].shorts.length > 0) {
        setActiveShort(currentArc.episodes[0].shorts[0]);
      }
    } else {
      setArc(null);
      setActiveShort(null);
    }
  }, [arcId, episodeParam, shortParam]);
  
  const handleShortClick = (short: Short) => {
    setActiveShort(short);
  };
  
  const handleVideoEnded = () => {
    if (!arc || !activeShort) return;

    const allShorts = arc.episodes.flatMap(ep => ep.shorts);
    const currentIndex = allShorts.findIndex(s => s.url === activeShort.url);

    if (currentIndex !== -1 && currentIndex < allShorts.length - 1) {
      setActiveShort(allShorts[currentIndex + 1]);
    }
  };

  if (!arc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
        <NavigationBarNew />
        <div className="flex-grow flex flex-col items-center justify-center">
            <p className="text-2xl text-gray-400">Adventure not found.</p>
            <Link href="/adventures" className="mt-4 text-[#FFA64D] hover:underline">
              &larr; Go back to All Adventures
            </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0C1021] text-white">
        <NavigationBarNew />
        <main className="flex-grow content-wrapper pt-32 pb-10 px-4">
            <Link
              href="/adventures"
              className="mb-8 text-[#FFA64D] hover:underline text-sm"
            >
              &larr; Back to All Adventures
            </Link>
            
            <h2 className="text-4xl font-bold text-white mb-8">{arc.title}</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 sticky top-24 self-start">
                <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl shadow-black/30">
                  {activeShort && (
                    <ReactPlayer
                      key={activeShort.url}
                      url={activeShort.url}
                      playing={true}
                      controls={true}
                      width="100%"
                      height="100%"
                      onEnded={handleVideoEnded}
                    />
                  )}
                </div>
                 <h3 className="text-white text-2xl font-semibold mt-4 mb-2">
                    {activeShort?.title}
                </h3>
              </div>

              <div className="bg-[#1A1F2B] p-4 rounded-xl border border-[#FFA64D22] max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-[#FFA64D] scrollbar-track-[#252a36]">
                <h3 className="text-white text-xl font-semibold mb-4 sticky top-0 bg-[#1A1F2B] pb-2 z-10">Videos in this Arc</h3>
                <ul className="space-y-4">
                  {arc.episodes.map((episode) => (
                    <li key={episode.title}>
                        <h4 className="text-lg font-semibold text-[#FFA64D] mb-2">{episode.title}</h4>
                        <ul className="space-y-2">
                            {episode.shorts.map((short) => (
                                <li key={short.title}>
                                    <button
                                        onClick={() => handleShortClick(short)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200 text-sm ${
                                        activeShort?.url === short.url
                                            ? "bg-[#FFA64D] text-black font-semibold"
                                            : "bg-[#252a36] hover:bg-[#313846]"
                                        }`}
                                    >
                                        {short.title}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </main>
      <Footer />
    </div>
  );
}


