import React from "react";
import CenteredContent from "./CenteredContent";
import BackgroundStreaks from "./BackgroundStreaks";

const AiMagicSection: React.FC = () => {
  const steps = [
    {
      icon: "💭",
      title: "The Idea",
      description: "Every Beamu adventure begins with a spark — a question, an emotion, or a life lesson.",
    },
    {
      icon: "🤖",
      title: "AI Tools",
      description: "Our team uses creative AI tools to transform stories into voices, visuals, and motion.",
    },
    {
      icon: "✨",
      title: "Final Adventure",
      description: "The result is a heartwarming story that teaches honesty, courage, and friendship.",
    },
  ];

  return (
    <section id="behind-the-light" className="relative py-24 bg-gradient-to-b from-[#0C1021] to-[#181C28] text-center overflow-hidden">
      <BackgroundStreaks />
      <CenteredContent className="relative z-10">
        <h2 className="text-4xl font-bold text-[#FFA64D] mb-4 text-glow animate-fade-in-up">Behind the Light</h2>
        <p className="text-gray-300 mb-16 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          How imagination and AI work together to bring Beamu’s adventures to life.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="timeline-step bg-[rgba(26,31,43,0.75)] rounded-2xl p-10 text-center transition-all duration-300 border border-[rgba(255,166,77,0.25)] shadow-[0_0_20px_rgba(255,166,77,0.1)] hover:translate-y-[-5px] hover:shadow-[0_0_25px_rgba(255,166,77,0.3)] animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-2xl font-semibold text-[#FFA64D] mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </CenteredContent>
    </section>
  );
};

export default AiMagicSection;
