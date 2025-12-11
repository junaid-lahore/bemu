import React, { useState } from "react";
import CenteredContent from "./CenteredContent";
import { X, ZoomIn, Film } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MomentsGallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const navigate = useNavigate();

  const moments = [
    {
      id: 1,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/6.jpg",
      title: "Beamu's First Light",
      episode: "Episode 1.1",
      description: "Welcome to the Planet of Happiness",
      arcId: "1",
      episodeIndex: 0,
      shortIndex: 0,
    },
    {
      id: 2,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/13.jpg",
      title: "The Secret Revealed",
      episode: "Episode 2.3",
      description: "Beamu Makes a Loud Crash!",
      arcId: "1",
      episodeIndex: 1,
      shortIndex: 2,
    },
    {
      id: 3,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/14.jpg",
      title: "School Adventure",
      episode: "Episode 3.2",
      description: "Sneaking Beamu to School",
      arcId: "1",
      episodeIndex: 2,
      shortIndex: 1,
    },
    {
      id: 4,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/14.jpg",
      title: "The Night Escape",
      episode: "Episode 4.2",
      description: "Beamu Misses Leo",
      arcId: "1",
      episodeIndex: 3,
      shortIndex: 1,
    },
    {
      id: 5,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/9.jpg",
      title: "Mountain View",
      episode: "Episode 5.5",
      description: "Beamu's First Photo with Leo!",
      arcId: "1",
      episodeIndex: 4,
      shortIndex: 4,
    },
    {
      id: 6,
      image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/13.jpg",
      title: "Family Gathering",
      episode: "Episode 6.1",
      description: "The whole family celebrates together",
      arcId: "1",
      episodeIndex: 5,
      shortIndex: 0,
    },
  ];

  const handleImageClick = (moment: typeof moments[0]) => {
    navigate(`/adventure-detail?arcId=${moment.arcId}&episode=${moment.episodeIndex}&short=${moment.shortIndex}`);
  };

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#181C28] to-[#0C1021] overflow-hidden">
      {/* Cinematic Scanlines Effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,166,77,0.03)_2px,rgba(255,166,77,0.03)_4px)] pointer-events-none" />

      <CenteredContent className="relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-[#FFA64D]" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#FFA64D] text-glow">
              Iconic Moments
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Relive the most beautiful and heartwarming scenes from Beamu's adventures
          </p>
        </div>

        {/* Cinematic Grid Layout */}
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
          {/* Large Featured Image */}
          <div className="col-span-12 md:col-span-8 row-span-2">
            <div
              onClick={() => handleImageClick(moments[0])}
              className="group relative h-full min-h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-[rgba(255,166,77,0.2)] hover:border-[rgba(255,166,77,0.6)] transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,166,77,0.4)]"
            >
              <img
                src={moments[0].image}
                alt={moments[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#FFA64D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <ZoomIn className="w-16 h-16 text-white" />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[#FFA64D] text-sm font-semibold mb-2">{moments[0].episode}</p>
                <h3 className="text-white text-2xl font-bold mb-2">{moments[0].title}</h3>
                <p className="text-gray-300 text-sm">{moments[0].description}</p>
              </div>
            </div>
          </div>

          {/* Medium Images */}
          {moments.slice(1, 5).map((moment, index) => (
            <div
              key={moment.id}
              className="col-span-6 md:col-span-4"
            >
              <div
                onClick={() => handleImageClick(moment)}
                className="group relative h-full min-h-[200px] rounded-2xl overflow-hidden cursor-pointer border border-[rgba(255,166,77,0.2)] hover:border-[rgba(255,166,77,0.6)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,166,77,0.3)]"
              >
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#FFA64D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <ZoomIn className="w-12 h-12 text-white" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[#FFA64D] text-xs font-semibold mb-1">{moment.episode}</p>
                  <h3 className="text-white text-lg font-bold">{moment.title}</h3>
                </div>
              </div>
            </div>
          ))}

          {/* Small Images */}
          {moments.slice(5).map((moment, index) => (
            <div
              key={moment.id}
              className="col-span-6 md:col-span-3"
            >
              <div
                onClick={() => handleImageClick(moment)}
                className="group relative h-full min-h-[180px] rounded-2xl overflow-hidden cursor-pointer border border-[rgba(255,166,77,0.2)] hover:border-[rgba(255,166,77,0.6)] transition-all duration-500 hover:shadow-[0_0_25px_rgba(255,166,77,0.3)]"
              >
                <img
                  src={moment.image}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-[#FFA64D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <ZoomIn className="w-10 h-10 text-white" />
                </div>

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white text-sm font-bold">{moment.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CenteredContent>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Image */}
          <div className="max-w-6xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={moments[selectedImage].image}
              alt={moments[selectedImage].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Image Info */}
            <div className="mt-6 text-center">
              <p className="text-[#FFA64D] text-sm font-semibold mb-2">
                {moments[selectedImage].episode}
              </p>
              <h3 className="text-white text-3xl font-bold mb-2">
                {moments[selectedImage].title}
              </h3>
              <p className="text-gray-300 text-lg">
                {moments[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MomentsGallery;
