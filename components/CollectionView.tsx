
import React, { useState, useMemo } from 'react';
import { MythologyCard, Rarity, CardType } from '../types';
import MythicCard from './MythicCard';

interface Props {
  collection: MythologyCard[];
}

const CollectionView: React.FC<Props> = ({ collection }) => {
  const [filterType, setFilterType] = useState<CardType | 'All'>('All');
  const [filterRarity, setFilterRarity] = useState<Rarity | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredCollection = useMemo(() => {
    return collection.filter(card => {
      const matchesType = filterType === 'All' || card.type === filterType;
      const matchesRarity = filterRarity === 'All' || card.rarity === filterRarity;
      const matchesSearch = card.name.toLowerCase().includes(search.toLowerCase()) || 
                           card.mythology.toLowerCase().includes(search.toLowerCase());
      return matchesType && matchesRarity && matchesSearch;
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [collection, filterType, filterRarity, search]);

  const stats = useMemo(() => {
    return {
      total: collection.length,
      mythic: collection.filter(c => c.rarity === Rarity.MYTHIC).length,
      heroic: collection.filter(c => c.rarity === Rarity.HEROIC).length,
      epic: collection.filter(c => c.rarity === Rarity.EPIC).length,
    };
  }, [collection]);

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-12 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-stone-800 pb-8">
        <div className="space-y-2">
          <h2 className="font-cinzel text-4xl font-black text-amber-500 uppercase tracking-tighter">Your Archive</h2>
          <p className="text-stone-500 text-sm tracking-widest font-bold uppercase">The Repository of Ancients</p>
        </div>
        
        <div className="flex gap-4 sm:gap-8 flex-wrap">
          <div className="text-center">
             <div className="text-xl font-black text-white font-cinzel">{stats.total}</div>
             <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Total</div>
          </div>
          <div className="text-center">
             <div className="text-xl font-black text-amber-500 font-cinzel">{stats.mythic}</div>
             <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Mythic</div>
          </div>
          <div className="text-center">
             <div className="text-xl font-black text-pink-500 font-cinzel">{stats.heroic}</div>
             <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Heroic</div>
          </div>
          <div className="text-center">
             <div className="text-xl font-black text-purple-500 font-cinzel">{stats.epic}</div>
             <div className="text-[10px] text-stone-500 uppercase font-bold tracking-widest">Epic</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
        <div className="relative group col-span-1 sm:col-span-2">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-amber-500 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Search by name or mythology..."
            className="w-full pl-12 pr-4 py-3 bg-stone-900/50 border border-stone-800 rounded-xl text-sm focus:outline-none focus:border-amber-500/50 transition-all text-stone-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select 
          className="bg-stone-900/50 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-300 focus:outline-none focus:border-amber-500/50"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
        >
          <option value="All">All Types</option>
          {Object.values(CardType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select 
          className="bg-stone-900/50 border border-stone-800 rounded-xl px-4 py-3 text-sm text-stone-300 focus:outline-none focus:border-amber-500/50"
          value={filterRarity}
          onChange={(e) => setFilterRarity(e.target.value as any)}
        >
          <option value="All">All Rarities</option>
          {Object.values(Rarity).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Grid */}
      {filteredCollection.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8">
          {filteredCollection.map((card) => (
            <MythicCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-stone-600 gap-4">
          <i className="fa-solid fa-ghost text-6xl opacity-20"></i>
          <p className="font-cinzel text-lg font-bold">No Artifacts Found</p>
          <p className="text-sm">Try adjusting your filters or visit the temple.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionView;
