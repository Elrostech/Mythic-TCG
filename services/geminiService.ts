
import { GoogleGenAI, Type } from "@google/genai";
import { MythologyCard, Rarity, CardType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const CARD_PROPERTIES = {
  name: { type: Type.STRING },
  type: { type: Type.STRING, enum: Object.values(CardType) },
  rarity: { type: Type.STRING, enum: Object.values(Rarity) },
  mythology: { type: Type.STRING },
  description: { type: Type.STRING },
  lore: { type: Type.STRING },
  attack: { type: Type.INTEGER, description: "Valeur d'attaque entre 0 et 100" },
  defense: { type: Type.INTEGER, description: "Valeur de défense entre 0 et 100" },
  ability: { type: Type.STRING, description: "Capacité spéciale unique pour les cartes Épiques, Héroïques ou Mythiques (optionnel sinon)" }
};

const CARD_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: CARD_PROPERTIES,
    required: ["name", "type", "rarity", "mythology", "description", "lore", "attack", "defense"]
  }
};

const SINGLE_CARD_SCHEMA = {
  type: Type.OBJECT,
  properties: CARD_PROPERTIES,
  required: ["name", "type", "rarity", "mythology", "description", "lore", "attack", "defense"]
};

export const generateBoosterPack = async (targetMythology: string = "mélangée", isPremium: boolean = false): Promise<MythologyCard[]> => {
  const isMixed = targetMythology.toLowerCase() === "mélangée";
  
  const prompt = `Génère 6 cartes mythologiques pour un booster pack en FRANÇAIS.
  Thème : Mythologie ${targetMythology}.
  
  Contraintes :
  - Le nom, la mythologie, la description et le lore DOIVENT être en français.
  ${isMixed ? "- Les cartes peuvent provenir de n'importe quelle mythologie mondiale (Grecque, Nordique, Égyptienne, Japonaise, etc.)." : `- TOUTES les cartes doivent impérativement appartenir à la mythologie ${targetMythology}.`}
  
  Répartition des raretés :
  ${isPremium ? `
  - 1 carte DOIT être de rareté 'Mythique'.
  - 1 carte DOIT être de rareté 'Héroïque'.
  - 2 cartes doivent être 'Rare'.
  - 2 cartes doivent être 'Normale'.
  ` : `
  - 3 cartes doivent avoir la rareté 'Normale'.
  - 2 cartes doivent avoir la rareté 'Rare'.
  - 1 carte doit avoir la rareté 'Épique'.
  - Il y a 15% de chance que la carte Épique soit remplacée par une carte 'Mythique'.
  - Il y a 20% de chance qu'une carte Rare soit remplacée par une carte 'Héroïque'.
  `}
  
  Statistiques de combat :
  - Assigne une valeur d'Attaque (0-100) et de Défense (0-100) cohérente avec le lore.
  - Pour les cartes Épique, Héroïque ou Mythique, ajoute une 'capacité spéciale' (ability) unique, puissante et courte.
  
  - Les types doivent être : Personnage, Objet, ou Lieu.
  - Fournis un nom épique, une description courte et un lore immersif pour chaque carte.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: CARD_SCHEMA as any,
      },
    });

    const rawCards = JSON.parse(response.text || '[]');
    
    return rawCards.map((card: any, index: number) => ({
      ...card,
      id: `${Date.now()}-${index}`,
      timestamp: Date.now(),
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(card.name)}/400/600`
    }));
  } catch (error) {
    console.error("Erreur lors de la génération du booster :", error);
    return [];
  }
};

export const generateSpecificCard = async (name: string, rarity: Rarity, type: CardType, mythology: string): Promise<MythologyCard | null> => {
  const prompt = `Génère une carte mythologique détaillée en FRANÇAIS.
  Nom suggéré : ${name}
  Rareté : ${rarity}
  Type : ${type}
  Mythologie : ${mythology}
  
  Fournis une description courte, un lore immersif, des valeurs d'Attaque et de Défense (0-100), et une capacité spéciale (ability) si la rareté est Épique ou plus.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: SINGLE_CARD_SCHEMA as any,
      },
    });

    const cardData = JSON.parse(response.text || '{}');
    return {
      ...cardData,
      id: `${Date.now()}-admin`,
      timestamp: Date.now(),
      imageUrl: `https://picsum.photos/seed/${encodeURIComponent(cardData.name)}/400/600`
    };
  } catch (error) {
    console.error("Erreur lors de la génération de la carte admin :", error);
    return null;
  }
};
