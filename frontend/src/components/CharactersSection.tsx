"use client";
import React, { useState } from "react";
import CenteredContent from "./CenteredContent";
import CharacterModal from "./CharacterModal";

const characters = [
  {
    name: "Beamu",
    relation: "Leo’s Secret Friend",
    description: "A glowing visitor from another world who learns human emotions through Leo’s kindness.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Beamu%20(2).png",
  },
  {
    name: "Leo",
    relation: "The Main Boy",
    description: "A curious, honest boy who discovers Beamu and learns the power of truth and courage.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Leo%20-%20Beamu's%20Friend.png",
  },
  {
    name: "Dr. Sena",
    relation: "Leo’s Mother",
    description: "A gentle and intelligent doctor who deeply loves her family but doesn’t know about Beamu.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Dr.%20Sena.png",
  },
  {
    name: "Thomas",
    relation: "Leo’s Father",
    description: "A hardworking engineer who values honesty and discipline but struggles to understand Leo’s imagination.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Thomas.png",
  },
  {
    name: "Zev",
    relation: "Leo’s Brother",
    description: "A funny and energetic teen who loves gadgets but often teases Leo.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Zev.png",
  },
  {
    name: "Mire",
    relation: "Leo’s Sister",
    description: "A sweet and thoughtful little girl who secretly believes in Leo’s “imaginary friend.”",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Mire.png",
  },
  {
    name: "Papa",
    relation: "Leo’s Grandfather",
    description: "Wise and calm, he often shares life lessons that mirror Beamu’s morals.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Papa.png",
  },
  {
    name: "Nana",
    relation: "Leo’s Grandmother",
    description: "Kind-hearted and spiritual, she always tells stories about hope and light — just like Beamu’s glow.",
    image: "https://static.databutton.com/public/09695851-0c35-4df1-9bf8-f7082c9c41a8/Nana.png",
  },
];

const CharactersSection: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <section id="meet-characters" className="py-24 bg-gradient-to-b from-[#0C1021] to-[#181C28] text-center">
      <CenteredContent>
        <h2 className="text-4xl font-bold text-[#FFA64D] mb-4">Meet the Characters</h2>
        <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
          Every light in Beamu’s world is connected to Leo — his family, his glowing friend, and the people who shape his story.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {characters.map((char) => {
            const imagePositionClass = (char.name === 'Beamu' || char.name === 'Leo') ? 'object-center' : 'object-top';
            return (
              <div
                key={char.name}
                className="character-card cursor-pointer"
                onClick={() => setSelectedCharacter(char)}
              >
                <img src={char.image} alt={char.name} className={`w-[150px] h-[150px] object-cover ${imagePositionClass} rounded-full mx-auto mb-4 border-2 border-orange-400/50 transition-all duration-300 group-hover:border-orange-400`} />
                <h3 className="text-white font-bold text-xl">{char.name}</h3>
                <p className="text-beamu-orange">{char.relation}</p>
              </div>
            );
          })}
        </div>
      </CenteredContent>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </section>
  );
};

export default CharactersSection;
