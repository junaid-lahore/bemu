"use client";
import React, { useState } from "react";
import CenteredContent from "./CenteredContent";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Parent of 6-year-old",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      rating: 5,
      text: "My daughter absolutely loves Beamu! She's learned so much about honesty and friendship. The stories are heartwarming and the lessons are perfect for young kids.",
      highlight: "Teaches valuable life lessons",
    },
    {
      name: "Michael Chen",
      role: "Father of two",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      rating: 5,
      text: "Finally, content I can trust! Beamu's adventures are entertaining and educational. My kids ask to watch it every day, and I'm happy to let them.",
      highlight: "Safe and educational content",
    },
    {
      name: "Emma Rodriguez",
      role: "Teacher & Mom",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      rating: 5,
      text: "As a teacher, I appreciate how Beamu teaches empathy and curiosity. The AI-enhanced storytelling is brilliant. My students talk about Beamu all the time!",
      highlight: "Perfect for classroom discussions",
    },
    {
      name: "David Miller",
      role: "Parent of 5-year-old",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      rating: 5,
      text: "Beamu has become part of our bedtime routine. The stories are calming yet engaging, and my son has started asking questions about friendship and honesty.",
      highlight: "Great for bedtime stories",
    },
    {
      name: "Priya Patel",
      role: "Mom of three",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      rating: 5,
      text: "The quality is outstanding! Beautiful animation, clear voices, and meaningful stories. All three of my kids love watching Beamu together.",
      highlight: "High quality production",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#181C28] to-[#0C1021] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#5EF38C11_0%,transparent_50%)] opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#FFA64D11_0%,transparent_50%)] opacity-50" />

      <CenteredContent className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#FFA64D] mb-4 text-glow">
            What Families Are Saying
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Hear from parents and teachers who've discovered the magic of Beamu
          </p>
        </div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-gradient-to-br from-[#1A1F2B]/90 to-[#0C1021]/90 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-[rgba(255,166,77,0.3)] shadow-[0_0_50px_rgba(255,166,77,0.2)] transition-all duration-500">
            {/* Quote Icon */}
            <div className="absolute top-6 left-6 text-[#FFA64D] opacity-20">
              <Quote className="w-16 h-16" fill="currentColor" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Name & Role */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {testimonials[currentIndex].role}
                </p>
                {/* Stars */}
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#FFC94D] text-[#FFC94D]"
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-200 text-lg leading-relaxed mb-6 italic">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Highlight Badge */}
              <div className="inline-block bg-[#FFA64D]/20 border border-[#FFA64D]/40 rounded-full px-6 py-2">
                <p className="text-[#FFA64D] font-semibold text-sm">
                  {testimonials[currentIndex].highlight}
                </p>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#FFA64D]/10 to-[#5EF38C]/10 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <Button
            onClick={prevTestimonial}
            variant="outline"
            className="w-12 h-12 rounded-full bg-[#1A1F2B] border-[#FFA64D]/30 hover:border-[#FFA64D] hover:bg-[#FFA64D]/10 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-[#FFA64D]" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 bg-[#FFA64D] shadow-[0_0_10px_#FFA64D]"
                    : "w-3 h-3 bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={nextTestimonial}
            variant="outline"
            className="w-12 h-12 rounded-full bg-[#1A1F2B] border-[#FFA64D]/30 hover:border-[#FFA64D] hover:bg-[#FFA64D]/10 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-[#FFA64D]" />
          </Button>
        </div>

        {/* Small Cards Preview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#FFA64D]/20 border-[#FFA64D] scale-105"
                  : "bg-[#1A1F2B]/50 border-[#FFA64D]/20 hover:border-[#FFA64D]/50 hover:scale-105"
              }`}
            >
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mx-auto mb-2 border-2 border-[#FFA64D]"
              />
              <p className="text-white text-xs font-medium truncate">
                {testimonial.name}
              </p>
            </button>
          ))}
        </div>
      </CenteredContent>
    </section>
  );
};

export default Testimonials;
