
import React from 'react';
import { MythologyCard, Rarity, CardType } from '../types';
import { RARITY_STYLES } from '../constants';

interface Props {
  card: MythologyCard | null;
  onClose: () => void;
}

const CardModal: React.FC<Props> = ({ card, onClose }) => {
  if (!card) return null;

  const getTypeIcon = (type: CardType) => {
    switch(type) {
      case CardType.CHARACTER: return <i className="fa-solid fa-person-rays text-xl"></i>;
      case CardType.OBJECT: return <i className="fa-solid fa-bolt-lightning text-xl"></i>;
      case CardType.PLACE: return <i className="fa-solid fa-mountain-sun text-xl"></i>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl bg-stone-950 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-stone-800 flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-8 duration-500">
        {/* Close Button Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[110] md:hidden bg-stone-900/80 w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/10"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Visual Section */}
        <div className={`w-full md:w-1/2 aspect-[2/3] md:aspect-auto bg-gradient-to-br ${RARITY_STYLES[card.rarity]} p-1 relative`}>
          <img 
            src={card.imageUrl} 
            alt={card.name} 
            className="w-full h-full object-cover rounded-2xl md:rounded-l-[22px] md:rounded-r-none shadow-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 md:rounded-l-[22px] md:rounded-r-none"></div>
          
          <div className="absolute top-8 left-8 flex gap-4">
             <div className="flex flex-col items-center bg-red-600/90 backdrop-blur-lg px-3 py-2 rounded-xl border border-red-400/50 shadow-2xl">
               <i className="fa-solid fa-sword text-white text-xs mb-1"></i>
               <span className="text-xl font-black text-white font-cinzel">{card.attack ?? '??'}</span>
               <span className="text-[8px] font-bold text-white/70 uppercase">ATK</span>
             </div>
             <div className="flex flex-col items-center bg-blue-600/90 backdrop-blur-lg px-3 py-2 rounded-xl border border-blue-400/50 shadow-2xl">
               <i className="fa-solid fa-shield text-white text-xs mb-1"></i>
               <span className="text-xl font-black text-white font-cinzel">{card.defense ?? '??'}</span>
               <span className="text-[8px] font-bold text-white/70 uppercase">DEF</span>
             </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/60 mb-2 block">{card.mythology}</span>
            <h2 className="font-cinzel text-4xl font-black text-white leading-tight">{card.name}</h2>
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto max-h-[60vh] md:max-h-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-amber-500">
                {getTypeIcon(card.type)}
              </div>
              <div>
                <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Type</p>
                <p className="text-stone-200 font-cinzel font-bold">{card.type}</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Rareté</p>
              <p className={`font-cinzel font-bold ${card.rarity === Rarity.MYTHIC ? 'text-amber-500' : 'text-stone-200'}`}>{card.rarity}</p>
            </div>
          </div>

          <div className="space-y-6">
            {card.ability && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <i className="fa-solid fa-sparkles text-4xl text-amber-500"></i>
                </div>
                <h4 className="font-cinzel text-xs font-bold text-amber-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <i className="fa-solid fa-star text-[10px]"></i>
                  Capacité Spéciale
                </h4>
                <p className="text-amber-100 font-bold text-sm leading-relaxed">{card.ability}</p>
              </div>
            )}

            <div>
              <h4 className="font-cinzel text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Description</h4>
              <p className="text-stone-300 italic text-lg leading-relaxed">"{card.description}"</p>
            </div>

            <div className="h-px bg-white/5 w-full"></div>

            <div>
              <h4 className="font-cinzel text-xs font-bold text-stone-500 uppercase tracking-widest mb-3">Le Mythe</h4>
              <p className="text-stone-400 text-sm leading-loose whitespace-pre-wrap">
                {card.lore}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="mt-8 flex items-center justify-center gap-3 w-full py-4 bg-stone-900 hover:bg-stone-800 text-stone-300 rounded-xl font-cinzel font-bold text-sm tracking-widest uppercase transition-all border border-stone-800"
          >
            Fermer l'Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
