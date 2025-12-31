
import React, { useMemo } from 'react';
import { MythologyCard } from '../types';
import MythicCard from './MythicCard';

interface Props {
  deck: MythologyCard[];
  onCardClick: (card: MythologyCard) => void;
  onRemoveFromDeck: (cardId: string) => void;
  onClearDeck: () => void;
}

const DeckView: React.FC<Props> = ({ deck, onCardClick, onRemoveFromDeck, onClearDeck }) => {
  const stats = useMemo(() => {
    return {
      character: deck.filter(c => c.type === 'Personnage').length,
      object: deck.filter(c => c.type === 'Objet').length,
      place: deck.filter(c => c.type === 'Lieu').length,
    };
  }, [deck]);

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-stone-800 pb-8">
        <div className="space-y-2">
          <h2 className="font-cinzel text-4xl font-black text-amber-500 uppercase tracking-tighter">Votre Deck de Bataille</h2>
          <p className="text-stone-500 text-sm tracking-widest font-bold uppercase">Préparez vos 20 artéfacts pour le combat</p>
        </div>
        
        <div className="flex gap-4 sm:gap-8 flex-wrap items-center">
          <div className="flex gap-4 px-4 py-2 bg-stone-900/50 rounded-xl border border-stone-800">
            <div className="text-center">
               <div className="text-lg font-black text-white font-cinzel">{stats.character}</div>
               <div className="text-[8px] text-stone-500 uppercase font-bold">Perso.</div>
            </div>
            <div className="text-center border-l border-stone-800 pl-4">
               <div className="text-lg font-black text-white font-cinzel">{stats.object}</div>
               <div className="text-[8px] text-stone-500 uppercase font-bold">Objets</div>
            </div>
            <div className="text-center border-l border-stone-800 pl-4">
               <div className="text-lg font-black text-white font-cinzel">{stats.place}</div>
               <div className="text-[8px] text-stone-500 uppercase font-bold">Lieux</div>
            </div>
          </div>

          {deck.length > 0 && (
            <button 
              onClick={onClearDeck}
              className="text-stone-500 hover:text-red-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              <i className="fa-solid fa-trash-can"></i>
              Vider
            </button>
          )}
        </div>
      </div>

      {deck.length > 0 ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-2 flex-1 bg-stone-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-500" 
                style={{ width: `${(deck.length / 20) * 100}%` }}
              ></div>
            </div>
            <span className="font-cinzel text-amber-500 font-bold">{deck.length}/20</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12 sm:gap-x-8">
            {deck.map((card) => (
              <MythicCard 
                key={card.id} 
                card={card} 
                onClick={() => onCardClick(card)}
                showDeckToggle
                isInDeck
                onDeckToggle={(e) => {
                  e.stopPropagation();
                  onRemoveFromDeck(card.id);
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-stone-600 gap-6">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-stone-800 flex items-center justify-center">
            <i className="fa-solid fa-bolt text-4xl opacity-20"></i>
          </div>
          <div className="text-center">
            <p className="font-cinzel text-lg font-bold text-stone-500">Votre deck est vide</p>
            <p className="text-sm">Allez dans votre Collection pour ajouter des cartes.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckView;
