import React from "react";
import CenteredContent from "./CenteredContent";

const BEAMU_IMAGE_URL = "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/beamu%20(1).png";

export const AboutSection: React.FC = () => {
  return (
    <section 
      id="about-beamu" 
      className="w-full py-20 bg-gradient-to-b from-[#181C28] to-[#0C1021]"
    >
      <CenteredContent className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex-1 flex justify-center items-center relative order-2 md:order-1">
          <img 
            src={BEAMU_IMAGE_URL} 
            alt="Beamu Character" 
            className="w-[320px] md:w-[400px] drop-shadow-xl animate-float z-10" 
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FFA64D33_0%,transparent_70%)] rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="flex-1 text-center text-white max-w-xl order-1 md:order-2">
          <h2 className="text-4xl font-bold text-[#FFA64D] mb-4 text-glow">Who is Beamu?</h2>
          <div className="max-w-[900px] mx-auto">
            <p className="text-gray-200 leading-relaxed mb-3">Beamu is a glowing visitor from another world — curious, kind, and full of wonder.</p>
            <p className="text-gray-200 leading-relaxed mb-3">Alongside Leo, he explores honesty, courage, and friendship through everyday adventures.</p>
            <p className="text-gray-200 leading-relaxed mb-6">Created by storytellers at EraXpert, Beamu Adventures combines AI creativity and heartwarming lessons to make learning magical for kids.</p>
          </div>
          <div className="w-[80px] h-[3px] bg-gradient-to-r from-[#FFA64D] to-[#FFC94D] mx-auto mb-2"></div>
          <p className="text-sm italic text-gray-400">Powered by imagination. Guided by light.</p>
        </div>
      </CenteredContent>
    </section>
  );
};
