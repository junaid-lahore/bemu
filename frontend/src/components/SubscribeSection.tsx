import React, { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CenteredContent from "./CenteredContent";
import brain from "brain";

const SubscribeSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setIsSending(true);
    setStatus("Subscribing...");

    try {
      await brain.handle_subscription({ email });
      setStatus("Thank you for subscribing! 🎉");
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(""), 5000); // Clear status after 5 seconds
    }
  };

  return (
    <section id="subscribe" className="py-20 bg-gradient-to-r from-[#FFA64D] to-[#FFC94D] text-center animate-fade-in-up">
      <CenteredContent>
        <h2 className="text-4xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
          Join the Beamu Club 🌟
        </h2>
        <p className="text-white/90 mb-8 max-w-xl mx-auto">
          Get new adventures and heartwarming stories before anyone else.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Your best email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-grow bg-white/30 border-white/50 text-white placeholder:text-white/70 focus:ring-white focus:border-white"
            style={{ minWidth: "250px" }}
          />
          <Button 
            type="submit" 
            size="lg"
            disabled={isSending}
            className="bg-white text-[#FFA64D] font-bold hover:bg-white/90 transition-transform duration-300 transform hover:scale-105"
          >
            {isSending ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
        {status && <p className="text-white/90 mt-4 text-sm">{status}</p>}
      </CenteredContent>
    </section>
  );
};

export default SubscribeSection;
