
import React, { useState, useEffect } from 'react';
import { MythologyCard, ViewState } from './types';
import Navbar from './components/Navbar';
import TempleView from './components/TempleView';
import CollectionView from './components/CollectionView';
import CardModal from './components/CardModal';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('temple');
  const [selectedCard, setSelectedCard] = useState<MythologyCard | null>(null);
  const [collection, setCollection] = useState<MythologyCard[]>(() => {
    const saved = localStorage.getItem('mythic_collection');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mythic_collection', JSON.stringify(collection));
  }, [collection]);

  const handleCardsGained = (newCards: MythologyCard[]) => {
    setCollection(prev => [...newCards, ...prev]);
  };

  const handleCardClick = (card: MythologyCard) => {
    setSelectedCard(card);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar 
        currentView={view} 
        setView={setView} 
        collectionCount={collection.length} 
      />

      <main className="transition-all duration-300">
        {view === 'temple' ? (
          <TempleView onCardsGained={handleCardsGained} onCardClick={handleCardClick} />
        ) : (
          <CollectionView collection={collection} onCardClick={handleCardClick} />
        )}
      </main>

      {/* Background Decorative Element */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>
      </div>

      {/* Card Detail Modal */}
      <CardModal 
        card={selectedCard} 
        onClose={() => setSelectedCard(null)} 
      />
    </div>
  );
};

export default App;
