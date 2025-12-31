
import React from 'react';
import { ViewState } from '../types';

interface Props {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  collectionCount: number;
  deckCount: number;
}

const Navbar: React.FC<Props> = ({ currentView, setView, collectionCount, deckCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900/95 backdrop-blur-xl border-t border-stone-800 px-4 py-2 flex justify-around items-center sm:top-0 sm:bottom-auto sm:border-t-0 sm:border-b sm:h-20 sm:px-12">
      <div className="hidden lg:flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/20">
          <i className="fa-solid fa-scroll text-stone-900"></i>
        </div>
        <h1 className="font-cinzel text-xl font-black text-amber-500 tracking-tighter">MYTHIC TCG</h1>
      </div>

      <div className="flex gap-1 sm:gap-4 md:gap-6">
        <button 
          onClick={() => setView('temple')}
          className={`flex flex-col sm:flex-row items-center gap-1 md:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-all ${currentView === 'temple' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <i className={`fa-solid fa-synagogue text-xl sm:text-base`}></i>
          <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest">Le Temple</span>
        </button>

        <button 
          onClick={() => setView('collection')}
          className={`flex flex-col sm:flex-row items-center gap-1 md:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-all relative ${currentView === 'collection' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <i className={`fa-solid fa-boxes-stacked text-xl sm:text-base`}></i>
          <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest">Collection</span>
          {collectionCount > 0 && (
            <span className="absolute -top-1 -right-1 sm:static sm:ml-2 bg-stone-800 text-amber-500 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center border border-amber-500/30">
              {collectionCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setView('deck')}
          className={`flex flex-col sm:flex-row items-center gap-1 md:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-all relative ${currentView === 'deck' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <i className={`fa-solid fa-bolt text-xl sm:text-base`}></i>
          <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest">Mon Deck</span>
          <span className={`absolute -top-1 -right-1 sm:static sm:ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-md min-w-[20px] text-center border ${deckCount === 20 ? 'bg-amber-500 text-stone-900 border-amber-300' : 'bg-stone-800 text-stone-400 border-stone-700'}`}>
            {deckCount}/20
          </span>
        </button>

        <button 
          onClick={() => setView('compendium')}
          className={`flex flex-col sm:flex-row items-center gap-1 md:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-all ${currentView === 'compendium' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <i className={`fa-solid fa-book-atlas text-xl sm:text-base`}></i>
          <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest">Compendium</span>
        </button>

        <button 
          onClick={() => setView('admin')}
          className={`flex flex-col sm:flex-row items-center gap-1 md:gap-3 px-2 sm:px-3 py-2 rounded-xl transition-all ${currentView === 'admin' ? 'bg-red-500/10 text-red-500' : 'text-stone-500 hover:text-stone-300'}`}
        >
          <i className={`fa-solid fa-user-shield text-xl sm:text-base`}></i>
          <span className="text-[10px] sm:text-xs font-cinzel font-bold uppercase tracking-widest">Admin</span>
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-stone-400">
        <i className="fa-brands fa-x-twitter hover:text-white cursor-pointer transition-colors"></i>
      </div>
    </nav>
  );
};

export default Navbar;
