import React from "react";
import CenteredContent from "./CenteredContent";
import FloatingOrbs from "./FloatingOrbs";
import { Heart, Brain, Users, Lightbulb, Shield, Smile } from "lucide-react";

const ImpactSection: React.FC = () => {
  const impacts = [
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Emotional Intelligence",
      description: "Kids learn to recognize and express emotions in healthy ways through Beamu's gentle guidance.",
      stat: "87%",
      statLabel: "Improved empathy",
      color: "#FF6B9D",
    },
    {
      icon: <Brain className="w-12 h-12" />,
      title: "Critical Thinking",
      description: "Adventures encourage children to ask questions, solve problems, and think creatively.",
      stat: "92%",
      statLabel: "Ask more questions",
      color: "#FFA64D",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Social Skills",
      description: "Stories demonstrate friendship, cooperation, and the importance of helping others.",
      stat: "78%",
      statLabel: "Better friendships",
      color: "#5EF38C",
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Curiosity & Wonder",
      description: "Beamu's world sparks imagination and encourages children to explore and discover.",
      stat: "95%",
      statLabel: "More curious",
      color: "#FFC94D",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Honesty & Integrity",
      description: "Every episode teaches the value of truth and the courage it takes to be honest.",
      stat: "89%",
      statLabel: "Value honesty more",
      color: "#87CEEB",
    },
    {
      icon: <Smile className="w-12 h-12" />,
      title: "Positive Mindset",
      description: "Stories end with hope and learning, showing that mistakes are opportunities to grow.",
      stat: "91%",
      statLabel: "More optimistic",
      color: "#DDA0DD",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0C1021] to-[#181C28] overflow-hidden">
      <FloatingOrbs />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,#FFA64D15_0%,transparent_70%)] animate-pulse" />

      <CenteredContent className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFA64D] mb-6 text-glow">
            The Beamu Impact
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            More than entertainment — Beamu helps children develop essential life skills 
            through engaging stories and meaningful adventures.
          </p>
          <div className="mt-8 inline-block bg-[#FFA64D]/10 border border-[#FFA64D]/30 rounded-full px-6 py-3">
            <p className="text-[#FFA64D] font-semibold">
              Based on feedback from 10,000+ parents and educators
            </p>
          </div>
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-[#1A1F2B]/90 to-[#0C1021]/90 backdrop-blur-sm rounded-3xl p-8 border border-[rgba(255,166,77,0.2)] hover:border-[rgba(255,166,77,0.5)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,166,77,0.3)]"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Background Glow */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                style={{
                  background: `radial-gradient(circle at center, ${impact.color}20, transparent)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ color: impact.color }}
                >
                  {impact.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {impact.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 leading-relaxed mb-6">
                  {impact.description}
                </p>

                {/* Stat Badge */}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: impact.color }}
                  >
                    {impact.stat}
                  </span>
                  <span className="text-gray-400 text-sm">
                    of children {impact.statLabel}
                  </span>
                </div>
              </div>

              {/* Corner Accent */}
              <div
                className="absolute bottom-0 right-0 w-32 h-32 rounded-tl-full opacity-10"
                style={{ background: impact.color }}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-block bg-gradient-to-r from-[#1A1F2B]/90 to-[#0C1021]/90 backdrop-blur-lg rounded-3xl p-10 border border-[#FFA64D]/30 shadow-[0_0_50px_rgba(255,166,77,0.2)]">
            <h3 className="text-3xl font-bold text-white mb-4">
              Real Learning, Real Results
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-2xl">
              Join thousands of families who've seen positive changes in their children's 
              emotional growth, social skills, and character development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#FFA64D]/10 border border-[#FFA64D]/30 rounded-2xl px-6 py-4">
                <p className="text-[#FFA64D] text-3xl font-bold">4.9/5</p>
                <p className="text-gray-400 text-sm">Parent Rating</p>
              </div>
              <div className="bg-[#5EF38C]/10 border border-[#5EF38C]/30 rounded-2xl px-6 py-4">
                <p className="text-[#5EF38C] text-3xl font-bold">10K+</p>
                <p className="text-gray-400 text-sm">Happy Families</p>
              </div>
              <div className="bg-[#FFC94D]/10 border border-[#FFC94D]/30 rounded-2xl px-6 py-4">
                <p className="text-[#FFC94D] text-3xl font-bold">100%</p>
                <p className="text-gray-400 text-sm">Safe Content</p>
              </div>
            </div>
          </div>
        </div>
      </CenteredContent>
    </section>
  );
};

export default ImpactSection;
