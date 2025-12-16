import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, MessageSquare, Image as ImageIcon } from "lucide-react";
import brain from "brain";
import { toast } from "sonner";

interface CommunitySubmissionFormProps {
  onClose: () => void;
}

const CommunitySubmissionForm: React.FC<CommunitySubmissionFormProps> = ({ onClose }) => {
  const [submissionType, setSubmissionType] = useState<"message" | "image">("message");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [message, setMessage] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (submissionType === "message" && !message.trim()) {
      toast.error("Please enter your message");
      return;
    }

    if (submissionType === "image") {
      if (!imageFile) {
        toast.error("Please select an image");
        return;
      }
      if (!imageTitle.trim()) {
        toast.error("Please enter a title for your image");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      if (submissionType === "message") {
        const response = await brain.submit_message({
          name: name.trim(),
          email: email.trim() || undefined,
          message: message.trim(),
          age: age.trim() || undefined,
        });
        
        if (response.ok) {
          toast.success("Thank you for sharing! Your message will appear soon.");
          onClose();
        }
      } else {
        if (!imageFile) return;

        const response = await brain.submit_image({
          name: name.trim(),
          email: email.trim() || undefined,
          title: imageTitle.trim(),
          age: age.trim() || undefined,
          image: imageFile,
        });
        
        if (response.ok) {
          toast.success("Thank you for sharing your creation! It will appear soon.");
          onClose();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-[#1A1F2B] to-[#0C1021] rounded-3xl border border-[#FFA64D]/30 shadow-2xl shadow-[#FFA64D]/20 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-[#FFA64D]/20 hover:bg-[#FFA64D]/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFA64D] mb-3 text-glow">
              Share Your Love for Beamu!
            </h2>
            <p className="text-gray-300 text-lg">
              Send us a message or share your artwork
            </p>
          </div>

          {/* Type Selector */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setSubmissionType("message")}
              className={`flex-1 py-4 rounded-2xl border-2 transition-all duration-300 ${
                submissionType === "message"
                  ? "bg-[#FFA64D]/20 border-[#FFA64D] shadow-[0_0_20px_#FFA64D66]"
                  : "bg-[#1A1F2B]/50 border-gray-600 hover:border-[#FFA64D]/50"
              }`}
            >
              <MessageSquare className="w-6 h-6 mx-auto mb-2 text-[#FFA64D]" />
              <span className="text-white font-semibold">Send Message</span>
            </button>
            <button
              onClick={() => setSubmissionType("image")}
              className={`flex-1 py-4 rounded-2xl border-2 transition-all duration-300 ${
                submissionType === "image"
                  ? "bg-[#5EF38C]/20 border-[#5EF38C] shadow-[0_0_20px_#5EF38C66]"
                  : "bg-[#1A1F2B]/50 border-gray-600 hover:border-[#5EF38C]/50"
              }`}
            >
              <ImageIcon className="w-6 h-6 mx-auto mb-2 text-[#5EF38C]" />
              <span className="text-white font-semibold">Share Artwork</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Name <span className="text-[#FFA64D]">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 bg-[#0C1021] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FFA64D] focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Email <span className="text-gray-400 text-sm">(optional)</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 bg-[#0C1021] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FFA64D] focus:outline-none transition-colors"
              />
            </div>

            {/* Age (Optional) */}
            <div>
              <label className="block text-white font-semibold mb-2">
                Age <span className="text-gray-400 text-sm">(optional)</span>
              </label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 8 years old"
                className="w-full px-4 py-3 bg-[#0C1021] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FFA64D] focus:outline-none transition-colors"
              />
            </div>

            {/* Message or Image Upload */}
            {submissionType === "message" ? (
              <div>
                <label className="block text-white font-semibold mb-2">
                  Your Message <span className="text-[#FFA64D]">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you love about Beamu..."
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0C1021] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#FFA64D] focus:outline-none transition-colors resize-none"
                  required
                />
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Image Title <span className="text-[#FFA64D]">*</span>
                  </label>
                  <input
                    type="text"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="My Beamu Drawing"
                    maxLength={60}
                    className="w-full px-4 py-3 bg-[#0C1021] border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-[#5EF38C] focus:outline-none transition-colors"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-1">{imageTitle.length}/60 characters</p>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Upload Image <span className="text-[#FFA64D]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:border-[#5EF38C] transition-colors bg-[#0C1021]/50"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="h-full object-contain rounded-xl" />
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <span className="text-gray-400">Click to upload image</span>
                          <span className="text-gray-500 text-sm">Max 5MB</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-lg font-semibold rounded-full bg-gradient-to-r from-[#FFA64D] to-[#FF8C1A] hover:shadow-[0_0_30px_#FFA64D] transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Share with Beamu Community"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunitySubmissionForm;
