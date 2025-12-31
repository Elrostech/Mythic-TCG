
import { GoogleGenAI, Type } from "@google/genai";
import { MythologyCard, Rarity, CardType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const CARD_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      type: { type: Type.STRING, enum: Object.values(CardType) },
      rarity: { type: Type.STRING, enum: Object.values(Rarity) },
      mythology: { type: Type.STRING },
      description: { type: Type.STRING },
      lore: { type: Type.STRING }
    },
    required: ["name", "type", "rarity", "mythology", "description", "lore"]
  }
};

export const generateBoosterPack = async (targetMythology: string = "mélangée"): Promise<MythologyCard[]> => {
  const isMixed = targetMythology.toLowerCase() === "mélangée";
  
  const prompt = `Génère 6 cartes mythologiques pour un booster pack en FRANÇAIS.
  Thème : Mythologie ${targetMythology}.
  
  Contraintes :
  - Le nom, la mythologie, la description et le lore DOIVENT être en français.
  ${isMixed ? "- Les cartes peuvent provenir de n'importe quelle mythologie mondiale (Grecque, Nordique, Égyptienne, Japonaise, etc.)." : `- TOUTES les cartes doivent impérativement appartenir à la mythologie ${targetMythology}.`}
  - 3 cartes doivent avoir la rareté 'Normale'.
  - 2 cartes doivent avoir la rareté 'Rare'.
  - 1 carte doit avoir la rareté 'Épique'.
  - Il y a 5% de chance que la carte Épique soit remplacée par une carte 'Mythique'.
  - Il y a 10% de chance qu'une carte Rare soit remplacée par une carte 'Héroïque'.
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
