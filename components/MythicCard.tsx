
import React from 'react';
import { MythologyCard, Rarity, CardType } from '../types';
import { RARITY_STYLES } from '../constants';

interface Props {
  card: MythologyCard;
  onClick?: () => void;
  isNew?: boolean;
  isInDeck?: boolean;
  onDeckToggle?: (e: React.MouseEvent) => void;
  showDeckToggle?: boolean;
}

const MythicCard: React.FC<Props> = ({ card, onClick, isNew, isInDeck, onDeckToggle, showDeckToggle }) => {
  const getRarityBadge = (rarity: Rarity) => {
    switch(rarity) {
      case Rarity.MYTHIC: return 'bg-amber-500 text-white animate-pulse ring-2 ring-amber-300';
      case Rarity.HEROIC: return 'bg-pink-500 text-white ring-2 ring-pink-300';
      case Rarity.EPIC: return 'bg-purple-600 text-white';
      case Rarity.RARE: return 'bg-blue-600 text-white';
      default: return 'bg-stone-600 text-stone-200';
    }
  };

  const getTypeIcon = (type: CardType) => {
    switch(type) {
      case CardType.CHARACTER: return <i className="fa-solid fa-person-rays text-sm"></i>;
      case CardType.OBJECT: return <i className="fa-solid fa-bolt-lightning text-sm"></i>;
      case CardType.PLACE: return <i className="fa-solid fa-mountain-sun text-sm"></i>;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${isNew ? 'animate-bounce' : ''}`}
    >
      <div className={`w-full aspect-[2/3] rounded-xl p-0.5 shadow-2xl bg-gradient-to-br ${RARITY_STYLES[card.rarity]} ${isInDeck ? 'ring-2 ring-amber-500 ring-offset-2 ring-offset-stone-950' : ''}`}>
        <div className="w-full h-full rounded-[10px] bg-stone-900 flex flex-col overflow-hidden relative border border-white/10">
          <div className="p-3 pb-1 flex justify-between items-start z-10">
            <h3 className="font-cinzel text-xs sm:text-sm font-bold truncate pr-2 tracking-tight text-stone-100">{card.name}</h3>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/5 uppercase tracking-widest text-white/70">
              {card.mythology}
            </span>
          </div>

          <div className="mx-2 mb-2 h-1/2 rounded-lg overflow-hidden relative border border-white/5 shadow-inner">
             <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-900 to-transparent h-12"></div>
             
             <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
                  {getTypeIcon(card.type)}
                  <span className="text-[8px] font-bold uppercase tracking-wider">{card.type}</span>
                </div>
             </div>
          </div>

          <div className="px-3 flex-1 flex flex-col gap-1 overflow-hidden z-10">
            <p className="text-[10px] text-stone-400 italic line-clamp-2 leading-tight">"{card.description}"</p>
            <div className="h-px bg-white/10 w-full my-1"></div>
            <p className="text-[9px] text-stone-500 leading-relaxed overflow-hidden flex-1 opacity-80">
              {card.lore}
            </p>
          </div>

          <div className={`mt-auto px-3 py-1.5 flex justify-center ${getRarityBadge(card.rarity)}`}>
            <span className="font-cinzel text-[10px] font-black uppercase tracking-[0.2em]">{card.rarity}</span>
          </div>
          
          {(card.rarity === Rarity.MYTHIC || card.rarity === Rarity.HEROIC) && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none group-hover:via-white/20 transition-all duration-300"></div>
          )}
        </div>
      </div>

      {showDeckToggle && (
        <button 
          onClick={onDeckToggle}
          className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-stone-800 shadow-xl flex items-center justify-center transition-all z-30 ${isInDeck ? 'bg-amber-500 text-stone-900 rotate-45' : 'bg-stone-900 text-amber-500 hover:scale-110'}`}
        >
          <i className={`fa-solid ${isInDeck ? 'fa-plus' : 'fa-plus'}`}></i>
        </button>
      )}

      {isNew && (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[8px] font-bold px-2 py-1 rounded-full shadow-lg z-20 animate-pulse">
          NOUVEAU
        </div>
      )}
    </div>
  );
};

export default MythicCard;
