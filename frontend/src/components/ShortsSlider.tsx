import React from "react";
import CenteredContent from "./CenteredContent";

const episodes = [
  {
    title: "Episode 4: The Final Footsteps",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLaCUHzN-Bh98XVB0GlGm0Nke38wiGMLvA",
  },
  {
    title: "Episode 5: The Morning Promise",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLaCUHzN-Bh998gTmN0n-kDu4sA9tmJSr2",
  },
  {
    title: "Episode 6: The Hidden Secret",
    embedUrl:
      "https://www.youtube.com/embed/videoseries?list=PLaCUHzN-Bh98LdWjiZ07xlRuFXlpDFIs4",
  },
];

const ShortsSlider: React.FC = () => {
  return (
    <section
      id="latestAdventure"
      className="py-20 bg-gradient-to-b from-[#0C1021] to-[#181C28] text-center"
    >
      <CenteredContent>
        <h2 className="text-4xl font-bold text-[#FFA64D] mb-4 text-glow">
          ✨ Watch Our Latest Adventures!
        </h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Click on an episode to watch the full playlist. Each adventure is a new
          step in Beamu’s journey of discovery and friendship.
        </p>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
            {episodes.map((episode) => (
              <div
                key={episode.title}
                className="group bg-black rounded-2xl overflow-hidden shadow-lg w-full max-w-[250px] mx-auto"
              >
                <div className="aspect-[9/16] w-full">
                  <iframe
                    src={episode.embedUrl}
                    title={episode.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {episode.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CenteredContent>
    </section>
  );
};

export default ShortsSlider;
