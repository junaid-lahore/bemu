import React, { useState, useEffect } from "react";
import CenteredContent from "./CenteredContent";
import { Eye, Users, Video, TrendingUp } from "lucide-react";
import brain from "brain";
import type { YouTubeStats } from "types";

const StatsCounter: React.FC = () => {
  const [stats, setStats] = useState<YouTubeStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYouTubeStats();
  }, []);

  const fetchYouTubeStats = async () => {
    try {
      const response = await brain.get_youtube_stats();
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching YouTube stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      icon: Eye,
      value: stats?.view_count || "...",
      label: "Total Views",
      color: "#FFA64D",
      delay: 0,
    },
    {
      icon: Users,
      value: stats?.subscriber_count || "...",
      label: "Subscribers",
      color: "#5EF38C",
      delay: 0.2,
    },
    {
      icon: Video,
      value: stats?.video_count || "...",
      label: "Episodes",
      color: "#FFC94D",
      delay: 0.4,
    },
    {
      icon: TrendingUp,
      value: "Growing",
      label: "Community",
      color: "#FF6B9D",
      delay: 0.6,
    },
  ];

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-[#0C1021] to-[#181C28] overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA64D11_0%,transparent_70%)] animate-pulse" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#FFA64D] rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <CenteredContent className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFA64D] mb-4 text-glow">
            Beamu By The Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Join thousands of families experiencing the magic of Beamu's adventures
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1A1F2B]/80 to-[#0C1021]/80 backdrop-blur-sm rounded-3xl p-8 border border-[rgba(255,166,77,0.2)] hover:border-[rgba(255,166,77,0.5)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,166,77,0.3)]"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Glow Effect */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                  background: `radial-gradient(circle at center, ${stat.color}33, transparent)`,
                }}
              />

              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div
                  className="p-4 rounded-2xl transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
                  style={{ color: stat.color }}
                >
                  <stat.icon className="w-10 h-10" />
                </div>

                {/* Counter */}
                <div style={{ color: stat.color }}>
                  <span className="text-5xl md:text-6xl font-bold">
                    {stat.value}
                  </span>
                </div>

                {/* Label */}
                <p className="text-gray-300 text-lg font-medium">
                  {stat.label}
                </p>
              </div>

              {/* Corner Accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-20"
                style={{ background: stat.color }}
              />
            </div>
          ))}
        </div>
      </CenteredContent>
    </section>
  );
};

export default StatsCounter;
