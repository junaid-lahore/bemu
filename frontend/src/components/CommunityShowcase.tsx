"use client";
import React, { useState, useEffect } from "react";
import CenteredContent from "./CenteredContent";
import { Heart, MessageCircle, Image as ImageIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommunitySubmissionForm from "./CommunitySubmissionForm";
import brain from "brain";
import type { SubmissionResponse } from "types";

const CommunityShowcase: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await brain.get_submissions({ limit: 10 });
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchSubmissions(); // Refresh submissions after form closes
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0C1021] to-[#181C28] overflow-hidden">
      <CenteredContent className="relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#5EF38C]/10 border border-[#5EF38C]/30 rounded-full px-6 py-2 mb-6">
            <p className="text-[#5EF38C] font-semibold text-sm">Community Love</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="text-[#5EF38C] text-glow">Community</span> Creates
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            See the amazing artwork and heartwarming messages from Beamu fans around the world
          </p>

          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#5EF38C] to-[#4AD67A] hover:shadow-[0_0_30px_#5EF38C] text-[#0C1021] font-bold px-8 py-6 rounded-full text-lg transition-all duration-300"
          >
            <Plus className="w-5 h-5 mr-2" />
            Share Your Love for Beamu
          </Button>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">
            <p>Loading community submissions...</p>
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <p>Be the first to share your love for Beamu!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="break-inside-avoid group relative bg-gradient-to-br from-[#1A1F2B]/80 to-[#0C1021]/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-[rgba(94,243,140,0.2)] hover:border-[rgba(94,243,140,0.5)] transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(94,243,140,0.3)]"
              >
                {submission.submission_type === "image" && submission.image_url ? (
                  <>
                    <div className="relative overflow-hidden">
                      <img
                        src={submission.image_url}
                        alt={submission.image_title || "Community art"}
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1021] via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <ImageIcon className="w-5 h-5 text-[#5EF38C] flex-shrink-0 mt-1" />
                        <h3 className="text-white font-bold text-lg line-clamp-2">
                          {submission.image_title}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-400 text-sm">
                          by <span className="text-[#5EF38C] font-semibold">{submission.name}</span>
                          {submission.age && <span className="ml-2">• {submission.age}</span>}
                        </p>
                        <Heart className="w-5 h-5 text-[#FF6B9D]" fill="#FF6B9D" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8">
                    <div className="flex items-start gap-3 mb-4">
                      <MessageCircle className="w-6 h-6 text-[#FFA64D] flex-shrink-0 mt-1" />
                      <p className="text-gray-200 text-lg leading-relaxed italic">
                        "{submission.message_text}"
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <p className="text-gray-400 text-sm">
                        <span className="text-[#FFA64D] font-semibold">{submission.name}</span>
                        {submission.age && <span className="ml-2">• {submission.age}</span>}
                      </p>
                      <Heart className="w-5 h-5 text-[#FF6B9D]" fill="#FF6B9D" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CenteredContent>

      {showForm && <CommunitySubmissionForm onClose={handleFormClose} />}
    </section>
  );
};

export default CommunityShowcase;
