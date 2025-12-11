import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

const CharacterModal = ({ character, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!character) return null;

  const imagePositionClass = (character.name === 'Beamu' || character.name === 'Leo') ? 'object-center' : 'object-top';

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1F2B] p-8 rounded-2xl shadow-xl text-center max-w-md relative border border-[#FFA64D33] animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={character.image}
          alt={character.name}
          className={`w-[180px] h-[180px] object-cover ${imagePositionClass} rounded-full mx-auto mb-4 border-4 border-[#FFA64D80]`}
        />
        <h3 className="text-2xl text-[#FFA64D] font-semibold mb-2 text-glow">{character.name}</h3>
        <p className="text-gray-400 text-sm mb-3">{character.relation}</p>
        <p className="text-gray-300 mb-6">{character.description}</p>
        <Button
          onClick={onClose}
          variant="outline"
          className="px-6 py-2 rounded-full border-[#FFA64D] text-[#FFA64D] hover:bg-[#FFA64D] hover:text-white transition"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default CharacterModal;
