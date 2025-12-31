
import React, { useState, useEffect } from 'react';
import { MythologyCard, ViewState } from './types';
import Navbar from './components/Navbar';
import TempleView from './components/TempleView';
import CollectionView from './components/CollectionView';
import DeckView from './components/DeckView';
import CompendiumView from './components/CompendiumView';
import CardModal from './components/CardModal';
import { soundService } from './services/soundService';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('temple');
  const [selectedCard, setSelectedCard] = useState<MythologyCard | null>(null);
  const [collection, setCollection] = useState<MythologyCard[]>(() => {
    const saved = localStorage.getItem('mythic_collection');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [deckIds, setDeckIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mythic_deck');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mythic_collection', JSON.stringify(collection));
  }, [collection]);

  useEffect(() => {
    localStorage.setItem('mythic_deck', JSON.stringify(deckIds));
  }, [deckIds]);

  const handleCardsGained = (newCards: MythologyCard[]) => {
    setCollection(prev => [...newCards, ...prev]);
  };

  const handleCardClick = (card: MythologyCard) => {
    setSelectedCard(card);
  };

  const handleToggleDeck = (cardId: string) => {
    setDeckIds(prev => {
      const exists = prev.includes(cardId);
      if (exists) {
        soundService.playDeckToggle(false);
        return prev.filter(id => id !== cardId);
      } else {
        if (prev.length >= 20) {
          alert("Votre deck est déjà au maximum (20 cartes) !");
          return prev;
        }
        soundService.playDeckToggle(true);
        return [...prev, cardId];
      }
    });
  };

  const handleClearDeck = () => {
    if (confirm("Vider votre deck ?")) {
      setDeckIds([]);
      soundService.playDeckToggle(false);
    }
  };

  const deckCards = collection.filter(card => deckIds.includes(card.id));

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Navbar 
        currentView={view} 
        setView={setView} 
        collectionCount={collection.length}
        deckCount={deckIds.length}
      />

      <main className="transition-all duration-300">
        {view === 'temple' && (
          <TempleView onCardsGained={handleCardsGained} onCardClick={handleCardClick} />
        )}
        {view === 'collection' && (
          <CollectionView 
            collection={collection} 
            onCardClick={handleCardClick} 
            deckIds={deckIds}
            onToggleDeck={handleToggleDeck}
          />
        )}
        {view === 'deck' && (
          <DeckView 
            deck={deckCards} 
            onCardClick={handleCardClick} 
            onRemoveFromDeck={handleToggleDeck}
            onClearDeck={handleClearDeck}
          />
        )}
        {view === 'compendium' && (
          <CompendiumView 
            collection={collection} 
            onCardClick={handleCardClick} 
          />
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
