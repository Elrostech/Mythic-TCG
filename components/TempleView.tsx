
import React, { useState } from 'react';
import { MythologyCard } from '../types';
import { generateBoosterPack } from '../services/geminiService';
import MythicCard from './MythicCard';

interface Props {
  onCardsGained: (cards: MythologyCard[]) => void;
}

const TempleView: React.FC<Props> = ({ onCardsGained }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [openedCards, setOpenedCards] = useState<MythologyCard[]>([]);
  const [showCards, setShowCards] = useState(false);

  const handleOpenBooster = async () => {
    setIsOpening(true);
    setOpenedCards([]);
    setShowCards(false);

    try {
      const cards = await generateBoosterPack();
      setOpenedCards(cards);
      setTimeout(() => {
        setIsOpening(false);
        setShowCards(true);
        onCardsGained(cards);
      }, 1500);
    } catch (err) {
      console.error(err);
      setIsOpening(false);
    }
  };

  const reset = () => {
    setShowCards(false);
    setOpenedCards([]);
  };

  return (
    <div className="min-h-screen pt-20 pb-24 px-4 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_center,_#1c1917_0%,_#0c0a09_100%)] overflow-hidden relative">
      {/* Animated Background Motes */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      {!showCards ? (
        <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
          <div className={`relative transition-all duration-700 ${isOpening ? 'scale-125 rotate-6' : 'hover:scale-105'}`}>
            {/* Booster Visual */}
            <div className={`w-48 sm:w-64 aspect-[2/3] bg-gradient-to-br from-amber-600 to-amber-900 rounded-2xl border-2 border-amber-400/30 p-1 shadow-[0_0_50px_rgba(217,119,6,0.3)] relative overflow-hidden group cursor-pointer ${isOpening ? 'animate-ping' : ''}`} onClick={!isOpening ? handleOpenBooster : undefined}>
                <div className="w-full h-full bg-stone-900 rounded-xl flex flex-col items-center justify-center gap-4 relative">
                   <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                   <div className="z-10 bg-amber-500 p-4 rounded-full shadow-2xl">
                      <i className="fa-solid fa-bolt text-4xl text-stone-900"></i>
                   </div>
                   <div className="z-10 flex flex-col items-center gap-1">
                      <h2 className="font-cinzel text-xl font-black text-amber-500">DIVINE BOOSTER</h2>
                      <p className="text-[10px] tracking-[0.3em] font-cinzel text-amber-400/60 font-bold uppercase">6 Mythical Items</p>
                   </div>
                   <div className="z-10 mt-4 text-[10px] text-stone-500 uppercase tracking-widest font-bold">Summon New Artifacts</div>
                </div>
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter">Divine Offering</h2>
            <p className="text-stone-400 text-sm max-w-xs mx-auto">
              Summon 6 unique artifacts from the annals of time. Contains 3 Normal, 2 Rare, and 1 Epic card (minimum).
            </p>
            <button 
              disabled={isOpening}
              onClick={handleOpenBooster}
              className={`w-full py-4 rounded-xl font-cinzel font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${isOpening ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-500 text-stone-900 shadow-xl shadow-amber-900/40 transform active:scale-95'}`}
            >
              {isOpening ? (
                <>
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                  Summoning...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-sparkles"></i>
                  Open Booster
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-6xl flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
          <div className="text-center space-y-2">
            <h2 className="font-cinzel text-4xl font-black text-amber-500 uppercase tracking-tighter">Results</h2>
            <p className="text-stone-500 text-sm uppercase tracking-widest font-bold">Gifts from the Deities</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 w-full px-4">
            {openedCards.map((card, idx) => (
              <div key={card.id} className="animate-in fade-in slide-in-from-bottom duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                <MythicCard card={card} isNew />
              </div>
            ))}
          </div>

          <button 
            onClick={reset}
            className="mt-8 px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-full font-cinzel font-bold text-sm tracking-widest uppercase transition-all flex items-center gap-3 border border-stone-700"
          >
            <i className="fa-solid fa-arrow-left"></i>
            Return to Temple
          </button>
        </div>
      )}
    </div>
  );
};

export default TempleView;
