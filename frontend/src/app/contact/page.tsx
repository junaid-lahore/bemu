import { redirect } from "next/navigation";
import { FaYoutube, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";
import { NavigationBarNew } from "@/components/NavigationBarNew";
import { Footer } from "@/components/Footer";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function submitContact(formData: FormData) {
  'use server';
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");
  const category = String(formData.get("category") || "");
  const message = String(formData.get("message") || "");

  try {
    const res = await fetch(`${API_URL}/routes/contact/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, category, message }),
      cache: "no-store",
    });
    if (!res.ok) {
      redirect("/contact?error=1");
    }
    redirect("/contact?status=sent");
  } catch {
    redirect("/contact?error=1");
  }
}
  
export default function Contact({ searchParams }: { searchParams?: { status?: string; error?: string } }) {
  const sent = searchParams?.status === "sent";
  const failed = searchParams?.error === "1";
  const statusText = sent
    ? "✨ Message sent successfully! Check your inbox for Beamu's reply."
    : failed
      ? "❌ Something went wrong. Please try again later."
      : "";
  const statusColor = sent ? "text-[#5EF38C]" : failed ? "text-[#FF4D4D]" : "text-gray-400";
  
  return (
    <div className="bg-gradient-to-b from-[#0C1021] to-[#181C28] text-white">
      <NavigationBarNew />
      <main>
        <section id="contact" className="min-h-screen py-20 flex flex-col items-center justify-center text-center content-wrapper">
          
          <h2 className="text-4xl font-bold text-[#FFA64D] mb-3">Contact Beamu's Team 🌟</h2>
          <p className="text-gray-300 max-w-xl mb-10">
            Have a question, feedback, or idea for the next adventure?  
            We'd love to hear from you — Beamu reads every message with a smile 😊
          </p>

          <form action={submitContact} className="w-full max-w-lg bg-[#1A1F2B] border border-[#FFA64D33] rounded-2xl shadow-lg shadow-[#FFA64D11] p-8 text-left space-y-5">
            
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">Your Name</label>
              <input type="text" id="name" name="name" required placeholder="Enter your name"
                     className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"/>
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">Email Address</label>
              <input type="email" id="email" name="email" required placeholder="Enter your email"
                     className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"/>
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-300 mb-2 text-sm">Reason for Contact</label>
              <select id="category" name="category" required
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
              <textarea id="message" name="message" rows={5} required placeholder="Write your message here..."
                        className="w-full px-4 py-3 rounded-lg bg-[#0C1021] border border-[#FFA64D22] text-white focus:border-[#FFA64D] outline-none transition-colors"></textarea>
            </div>

            <div className="text-center">
              <button type="submit"
                      className="bg-[#FFA64D] text-white font-semibold px-8 py-3 rounded-full hover:brightness-110 transition-all duration-300 shadow-lg shadow-[#FFA64D33] disabled:bg-gray-500 disabled:cursor-not-allowed">
                Send Message
              </button>
            </div>

            {statusText && <p id="formStatus" className={`text-center text-sm mt-3 ${statusColor}`}>{statusText}</p>}
          </form>

          <div className="mt-14 text-center">
            <h3 className="text-[#FFA64D] text-lg font-semibold mb-4">Follow Beamu's Glow ✨</h3>
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
}


