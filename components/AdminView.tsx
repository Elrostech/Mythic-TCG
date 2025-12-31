
import React, { useState } from 'react';
import { Rarity, CardType, MythologyCard } from '../types';
import { generateSpecificCard } from '../services/geminiService';
import { soundService } from '../services/soundService';

interface Props {
  onCardGained: (card: MythologyCard) => void;
}

const AdminView: React.FC<Props> = ({ onCardGained }) => {
  const [name, setName] = useState('');
  const [rarity, setRarity] = useState<Rarity>(Rarity.MYTHIC);
  const [type, setType] = useState<CardType>(CardType.CHARACTER);
  const [mythology, setMythology] = useState('Grecque');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || isLoading) return;

    setIsLoading(true);
    const card = await generateSpecificCard(name, rarity, type, mythology);
    
    if (card) {
      onCardGained(card);
      soundService.playCardReveal();
      alert(`La carte "${card.name}" a été ajoutée à votre collection !`);
      setName('');
    } else {
      alert("Erreur lors de la création de la carte.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-32 px-4 sm:px-12 max-w-4xl mx-auto flex flex-col gap-8">
      <div className="border-b border-stone-800 pb-8">
        <h2 className="font-cinzel text-4xl font-black text-red-500 uppercase tracking-tighter">Panneau Admin</h2>
        <p className="text-stone-500 text-sm tracking-widest font-bold uppercase">Pouvoirs Divins de Création</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-stone-900/50 p-8 rounded-2xl border border-stone-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Nom de l'Entité</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Zeus, Excalibur..."
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-red-500/50 transition-all text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Mythologie</label>
            <input 
              type="text" 
              value={mythology}
              onChange={(e) => setMythology(e.target.value)}
              placeholder="Ex: Grecque, Nordique..."
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-red-500/50 transition-all text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Rareté</label>
            <select 
              value={rarity}
              onChange={(e) => setRarity(e.target.value as Rarity)}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-red-500/50 transition-all text-white appearance-none"
            >
              {Object.values(Rarity).map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Type de Carte</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value as CardType)}
              className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-xl focus:outline-none focus:border-red-500/50 transition-all text-white appearance-none"
            >
              {Object.values(CardType).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 rounded-xl font-cinzel font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 ${isLoading ? 'bg-stone-800 text-stone-500' : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20'}`}
        >
          {isLoading ? (
            <i className="fa-solid fa-circle-notch animate-spin"></i>
          ) : (
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          )}
          Invoquer Immédiatement
        </button>
      </form>

      <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl">
        <h4 className="font-cinzel text-xs font-black text-red-500 mb-2 uppercase tracking-widest">Zone de Danger</h4>
        <p className="text-stone-500 text-xs mb-4">Ces actions sont irréversibles.</p>
        <button 
          onClick={() => {
            if (confirm("Voulez-vous vraiment réinitialiser toute votre collection ?")) {
              localStorage.clear();
              window.location.reload();
            }
          }}
          className="px-4 py-2 border border-red-500/30 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 rounded-lg text-xs font-bold transition-all"
        >
          Réinitialiser Tout le Jeu
        </button>
      </div>
    </div>
  );
};

export default AdminView;
