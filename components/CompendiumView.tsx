
import React, { useState, useMemo } from 'react';
import { MythologyCard, Rarity } from '../types';
import { COMPENDIUM_DATA, RARITY_STYLES } from '../constants';

interface Props {
  collection: MythologyCard[];
  onCardClick: (card: MythologyCard) => void;
}

const CompendiumView: React.FC<Props> = ({ collection, onCardClick }) => {
  const [search, setSearch] = useState('');

  const ownedNames = useMemo(() => {
    return new Set(collection.map(c => c.name.toLowerCase()));
  }, [collection]);

  const filteredCompendium = useMemo(() => {
    return COMPENDIUM_DATA.filter(entry => 
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.mythology.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const mythologies = Array.from(new Set(COMPENDIUM_DATA.map(e => e.mythology)));

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-stone-800 pb-8">
        <div className="space-y-2">
          <h2 className="font-cinzel text-4xl font-black text-amber-500 uppercase tracking-tighter">Le Compendium</h2>
          <p className="text-stone-500 text-sm tracking-widest font-bold uppercase">Toutes les Légendes Connues</p>
        </div>
        
        <div className="relative group w-full sm:w-64">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Chercher un dieu..."
            className="w-full pl-12 pr-4 py-3 bg-stone-900/50 border border-stone-800 rounded-xl text-sm focus:outline-none focus:border-amber-500/50 transition-all text-stone-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-12">
        {mythologies.map(myth => {
          const entries = filteredCompendium.filter(e => e.mythology === myth);
          if (entries.length === 0) return null;

          return (
            <section key={myth} className="space-y-6">
              <h3 className="font-cinzel text-xl font-bold text-stone-300 border-l-4 border-amber-600 pl-4 uppercase tracking-widest">{myth}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {entries.map(entry => {
                  const isOwned = ownedNames.has(entry.name.toLowerCase());
                  const ownedCard = collection.find(c => c.name.toLowerCase() === entry.name.toLowerCase());

                  return (
                    <div 
                      key={entry.name}
                      onClick={() => ownedCard && onCardClick(ownedCard)}
                      className={`relative group rounded-xl p-0.5 aspect-[2/3] transition-all duration-500 ${isOwned ? 'cursor-pointer hover:scale-105' : 'grayscale opacity-40 cursor-not-allowed'}`}
                    >
                      <div className={`w-full h-full rounded-lg bg-gradient-to-br ${RARITY_STYLES[entry.rarity]} p-0.5`}>
                        <div className="w-full h-full bg-stone-900 rounded-[7px] flex flex-col items-center justify-center p-4 text-center gap-2 border border-white/5">
                          <i className={`fa-solid ${entry.rarity === Rarity.MYTHIC ? 'fa-crown text-amber-500' : 'fa-scroll text-stone-500'} text-2xl`}></i>
                          <h4 className="font-cinzel text-[10px] font-black text-white leading-tight uppercase tracking-tighter line-clamp-2">{entry.name}</h4>
                          <span className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">{entry.rarity}</span>
                          
                          {isOwned && (
                            <div className="absolute top-2 right-2">
                              <i className="fa-solid fa-check-circle text-amber-500 text-xs"></i>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CompendiumView;
