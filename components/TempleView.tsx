
import React, { useState } from 'react';
import { MythologyCard } from '../types';
import { generateBoosterPack } from '../services/geminiService';
import { soundService } from '../services/soundService';
import MythicCard from './MythicCard';

interface Props {
  onCardsGained: (cards: MythologyCard[]) => void;
  onCardClick: (card: MythologyCard) => void;
}

interface BoosterConfig {
  id: string;
  name: string;
  mythology: string;
  color: string;
  icon: string;
  description: string;
  isPremium?: boolean;
}

const BOOSTERS: BoosterConfig[] = [
  { id: 'mixed', name: 'Booster Divin', mythology: 'Mélangée', color: 'from-amber-600 to-amber-900', icon: 'fa-bolt', description: 'Un mélange de toutes les légendes du monde.' },
  { id: 'greek', name: 'Booster de l\'Olympe', mythology: 'Grecque', color: 'from-blue-600 to-sky-900', icon: 'fa-landmark', description: 'Les dieux et héros de la Grèce antique.' },
  { id: 'norse', name: 'Booster d\'Asgard', mythology: 'Nordique', color: 'from-red-600 to-orange-900', icon: 'fa-hammer', description: 'La puissance des guerriers du Nord.' },
  { id: 'egypt', name: 'Booster du Nil', mythology: 'Égyptienne', color: 'from-yellow-500 to-amber-800', icon: 'fa-ankh', description: 'Les mystères des pharaons et du désert.' },
  { id: 'japan', name: 'Booster du Soleil', mythology: 'Japonaise', color: 'from-pink-600 to-red-900', icon: 'fa-torii-gate', description: 'Les esprits et kamis du Japon féodal.' },
  { id: 'ancestral', name: 'Booster Ancestral', mythology: 'Mélangée', color: 'from-purple-600 via-pink-600 to-amber-600', icon: 'fa-crown', description: 'Hautes chances de cartes Mythiques et Héroïques.', isPremium: true },
];

const TempleView: React.FC<Props> = ({ onCardsGained, onCardClick }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedCards, setOpenedCards] = useState<MythologyCard[]>([]);
  const [showCards, setShowCards] = useState(false);
  const [selectedBooster, setSelectedBooster] = useState<BoosterConfig | null>(null);

  const handleOpenBooster = async (booster: BoosterConfig) => {
    setIsOpening(true);
    setSelectedBooster(booster);
    setOpenedCards([]);
    setShowCards(false);
    
    soundService.playBoosterOpen();

    try {
      const cards = await generateBoosterPack(booster.mythology, booster.isPremium);
      setOpenedCards(cards);
      setTimeout(() => {
        setIsOpening(false);
        setShowCards(true);
        onCardsGained(cards);
        soundService.playCardReveal();
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsOpening(false);
    }
  };

  const reset = () => {
    setShowCards(false);
    setOpenedCards([]);
    setSelectedBooster(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1c1917_0%,_#0c0a09_100%)] overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {!showCards ? (
        <div className="w-full max-w-7xl flex flex-col items-center gap-12">
          <div className="text-center space-y-4">
            <h2 className="font-cinzel text-4xl sm:text-5xl font-black text-white uppercase tracking-tighter">Le Temple des Invocations</h2>
            <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto">
              Choisissez votre offrande. Chaque booster contient 6 cartes légendaires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 w-full px-4">
            {BOOSTERS.map((booster) => (
              <div 
                key={booster.id}
                className={`flex flex-col items-center gap-4 transition-all duration-700 ${isOpening && selectedBooster?.id === booster.id ? 'scale-110' : isOpening ? 'opacity-20 scale-90 blur-sm' : 'hover:scale-105'}`}
              >
                <div 
                  className={`w-full aspect-[2/3] bg-gradient-to-br ${booster.color} rounded-2xl border-2 ${booster.isPremium ? 'border-amber-400 animate-pulse shadow-[0_0_30px_rgba(251,191,36,0.3)]' : 'border-white/20'} p-1 shadow-2xl relative overflow-hidden group cursor-pointer`}
                  onClick={() => !isOpening && handleOpenBooster(booster)}
                >
                  <div className="w-full h-full bg-stone-900 rounded-xl flex flex-col items-center justify-center gap-4 relative">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className={`z-10 ${booster.isPremium ? 'bg-amber-500' : 'bg-white/10'} p-4 rounded-full shadow-2xl backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform`}>
                      <i className={`fa-solid ${booster.icon} text-3xl ${booster.isPremium ? 'text-stone-900' : 'text-white'}`}></i>
                    </div>
                    <div className="z-10 flex flex-col items-center gap-1 px-4 text-center">
                      <h3 className={`font-cinzel text-sm font-black ${booster.isPremium ? 'text-amber-500' : 'text-white'}`}>{booster.name}</h3>
                      <p className="text-[8px] tracking-[0.2em] font-cinzel text-white/50 font-bold uppercase">{booster.mythology}</p>
                    </div>
                  </div>
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none`}></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </div>
                
                <div className="text-center px-2">
                  <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest leading-tight">{booster.description}</p>
                </div>

                <button 
                  disabled={isOpening}
                  onClick={() => handleOpenBooster(booster)}
                  className={`px-6 py-2 rounded-full font-cinzel text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${isOpening && selectedBooster?.id === booster.id ? 'bg-amber-600 text-stone-900' : booster.isPremium ? 'bg-amber-500 text-stone-900 hover:bg-amber-400' : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'}`}
                >
                  {isOpening && selectedBooster?.id === booster.id ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      Invocation...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-sparkles"></i>
                      Ouvrir
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-2">
            <h2 className="font-cinzel text-4xl font-black text-amber-500 uppercase tracking-tighter">Résultats</h2>
            <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">Dons des Divinités ({selectedBooster?.mythology})</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full px-4">
            {openedCards.map((card, idx) => (
              <div key={card.id} className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                <MythicCard card={card} isNew onClick={() => onCardClick(card)} />
              </div>
            ))}
          </div>

          <button 
            onClick={reset}
            className="mt-8 px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full font-cinzel font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-3 border border-stone-700"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Retour au Temple
          </button>
        </div>
      )}
    </div>
  );
};

export default TempleView;
