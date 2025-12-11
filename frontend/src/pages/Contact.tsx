import { useState, FormEvent } from "react";
import brain from "brain";
import { FaYoutube, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { NavigationBarNew } from "components/NavigationBarNew";
import { Footer } from "components/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [statusColor, setStatusColor] = useState("text-gray-400");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus("Sending your message...");
    setStatusColor("text-[#FFA64D]");

    try {
      await brain.handle_contact_submission({
        name,
        email,
        category,
        message,
      });

      setStatus("✨ Message sent successfully! Check your inbox for Beamu’s reply.");
      setStatusColor("text-[#5EF38C]");
      setName("");
      setEmail("");
      setCategory("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Something went wrong. Please try again later.");
      setStatusColor("text-[#FF4D4D]");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <div className="bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
      <NavigationBarNew />
      <main>
        <section id="contact" className="min-h-screen py-20 flex flex-col items-center justify-center text-center content-wrapper">
          
          {/* Header */}
          <h2 className="text-4xl font-bold text-[#FFA64D] mb-3">Contact Beamu’s Team 🌟</h2>
          <p className="text-gray-300 max-w-xl mb-10">
            Have a question, feedback, or idea for the next adventure?  
            We’d love to hear from you — Beamu reads every message with a smile 😊
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-[#1A1F2B] border border-[#FFA64D33] rounded-2xl shadow-lg shadow-[#FFA64D11] p-8 text-left space-y-5">
            
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)}
                     className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                     className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"/>
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-300 mb-2 text-sm">Reason for Contact</label>
              <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} required
                      className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors appearance-none">
                <option value="">Select an option</option>
                <option value="feedback">General Feedback</option>
                <option value="collab">Collaboration / Partnership</option>
                <option value="support">Technical Support</option>
                <option value="press">Media / Press Inquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">Message</label>
              <textarea id="message" name="message" rows={5} required placeholder="Write your message here..." value={message} onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"></textarea>
            </div>

            <div className="text-center">
              <button type="submit" disabled={isSending}
                      className="bg-[#FFA64D] text-white font-semibold px-8 py-3 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#FFA64D33] disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </div>

            {status && <p id="formStatus" className={`text-center text-sm mt-3 ${statusColor}`}>{status}</p>}
          </form>

          {/* Social Media Section */}
          <div className="mt-14 text-center">
            <h3 className="text-[#FFA64D] text-lg font-semibold mb-4">Follow Beamu’s Glow ✨</h3>
            <p className="text-gray-400 mb-5 text-sm">Watch new adventures and behind-the-light moments on our official platforms:</p>
            
            <div className="flex justify-center gap-6">
              <a href="https://youtube.com/@BeamuAdventures" target="_blank" rel="noopener noreferrer" className="social-icon"><FaYoutube /></a>
              <a href="https://instagram.com/beamuadventures" target="_blank" rel="noopener noreferrer" className="social-icon"><FaInstagram /></a>
              <a href="https://tiktok.com/@beamuadventures" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTiktok /></a>
              <a href="https://x.com/beamuadventures" target="_blank" rel="noopener noreferrer" className="social-icon"><FaTwitter /></a>
            </div>
          </div>

        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
