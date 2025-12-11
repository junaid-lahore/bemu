import React from "react";
import CenteredContent from "./CenteredContent";
import FloatingOrbs from "./FloatingOrbs";

const ValuesSection: React.FC = () => {
  const values = [
    {
      icon: "💡",
      title: "Curiosity",
      description: "Asking “why” opens new worlds.",
    },
    {
      icon: "🤝",
      title: "Friendship",
      description: "Caring builds every adventure.",
    },
    {
      icon: "🌟",
      title: "Honesty",
      description: "Truth makes every light shine brighter.",
    },
  ];

  return (
    <section id="educational-values" className="relative py-24 bg-gradient-to-b from-[#181C28] to-[#0C1021] text-center overflow-hidden">
      <FloatingOrbs />
      <CenteredContent className="relative z-10">
        <h2 className="text-4xl font-bold text-[#FFA64D] mb-4 text-glow animate-fade-in-up">What Beamu Teaches</h2>
        <p className="text-gray-300 mb-12 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>Every adventure carries a light — a lesson of curiosity, friendship, and honesty.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="card bg-[rgba(28,32,48,0.8)] rounded-2xl border border-[rgba(255,166,77,0.25)] shadow-[0_0_20px_rgba(255,166,77,0.15)] p-10 text-center transition-all duration-300 hover:translate-y-[-5px] hover:shadow-[0_0_25px_rgba(255,166,77,0.4)] animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <div className="text-5xl mb-3">{value.icon}</div>
              <h3 className="text-2xl font-semibold text-[#FFA64D] mb-2">{value.title}</h3>
              <p className="text-gray-300 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </CenteredContent>
    </section>
  );
};

export default ValuesSection;
