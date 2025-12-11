import React, { useState } from "react";
import CenteredContent from "./CenteredContent";
import { Lightbulb, Palette, Sparkles, Film, ArrowRight } from "lucide-react";

interface ProcessStep {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  details: string[];
  color: string;
  gradient: string;
}

const BehindTheLight: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const processSteps: ProcessStep[] = [
    {
      id: 1,
      icon: Lightbulb,
      title: "Story Brainstorming",
      description: "Every adventure starts with a spark of imagination",
      details: [
        "We explore themes of friendship, curiosity, and kindness",
        "Each story teaches valuable life lessons for kids",
        "Characters face relatable challenges and grow together",
        "Ideas are refined to create engaging, educational content",
      ],
      color: "#FFC94D",
      gradient: "from-[#FFC94D] to-[#FFB01A]",
    },
    {
      id: 2,
      icon: Palette,
      title: "Visual Storyboarding",
      description: "Transforming ideas into visual scenes",
      details: [
        "Sketch out key scenes and character expressions",
        "Design vibrant worlds where Beamu and Leo explore",
        "Create visual flow that captures young imaginations",
        "Ensure every frame tells part of the story",
      ],
      color: "#FF6B9D",
      gradient: "from-[#FF6B9D] to-[#FF4D7A]",
    },
    {
      id: 3,
      icon: Sparkles,
      title: "Bringing Life to Characters",
      description: "Magic happens when characters come alive",
      details: [
        "Animate Beamu's glowing personality and expressions",
        "Craft smooth, engaging movements that captivate kids",
        "Add vibrant colors and dynamic lighting effects",
        "Create worlds that feel alive and full of wonder",
      ],
      color: "#5EF38C",
      gradient: "from-[#5EF38C] to-[#4AD67A]",
    },
    {
      id: 4,
      icon: Film,
      title: "Final Polish",
      description: "Perfecting every detail for young viewers",
      details: [
        "Add sound effects and cheerful background music",
        "Polish transitions and timing for perfect flow",
        "Ensure every episode is age-appropriate and fun",
        "Ready to share adventures with the world!",
      ],
      color: "#FFA64D",
      gradient: "from-[#FFA64D] to-[#FF8C1A]",
    },
  ];

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#181C28] via-[#0C1021] to-[#181C28] overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#5EF38C]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#FFA64D]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <CenteredContent className="relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-[#FFA64D]/20 to-[#5EF38C]/20 border border-[#FFA64D]/30 rounded-full px-6 py-2 mb-6">
            <p className="text-[#FFA64D] font-semibold text-sm">The Creative Journey</p>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Behind the <span className="text-[#FFA64D] text-glow">Light</span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
            Discover how we bring Beamu's magical adventures to life, from the first idea to the final episode
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC94D] via-[#FF6B9D] via-[#5EF38C] to-[#FFA64D] transform -translate-y-1/2 opacity-30" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="relative"
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step Card */}
                <div
                  className={`relative bg-gradient-to-br from-[#1A1F2B]/90 to-[#0C1021]/90 backdrop-blur-sm rounded-3xl p-8 border-2 transition-all duration-500 cursor-pointer ${
                    activeStep === step.id
                      ? "border-[var(--step-color)] scale-105 shadow-[0_0_40px_var(--step-color-alpha)]"
                      : "border-gray-700 hover:border-[var(--step-color)] hover:scale-102"
                  }`}
                  style={{
                    "--step-color": step.color,
                    "--step-color-alpha": `${step.color}66`,
                  } as React.CSSProperties}
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[#0C1021] to-[#1A1F2B] border-2 border-[var(--step-color)] rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold" style={{ color: step.color }}>
                      {step.id}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 ${
                      activeStep === step.id ? "rotate-12 scale-110" : ""
                    }`}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">{step.description}</p>

                  {/* Details - Show on hover */}
                  <div
                    className={`space-y-2 transition-all duration-500 overflow-hidden ${
                      activeStep === step.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: step.color }}
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrow connecting to next step */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-12 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-block bg-gradient-to-r from-[#1A1F2B]/80 to-[#0C1021]/80 backdrop-blur-sm rounded-3xl p-10 border border-[#5EF38C]/30">
            <Sparkles className="w-12 h-12 text-[#5EF38C] mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">
              Every Episode is Made with <span className="text-[#5EF38C]">Love</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We pour our hearts into every frame to create magical, meaningful adventures that inspire young minds around the world
            </p>
          </div>
        </div>
      </CenteredContent>
    </section>
  );
};

export default BehindTheLight;
