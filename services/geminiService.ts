
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

export const generateBoosterPack = async (): Promise<MythologyCard[]> => {
  const prompt = `Generate 6 mythological cards for a booster pack.
  Constraints:
  - 3 must be Normal rarity.
  - 2 must be Rare rarity.
  - 1 must be Epic rarity.
  - There is a 5% chance that the Epic card is replaced by a Mythic card.
  - There is a 10% chance that one Rare card is replaced by a Heroic card.
  - Cards can be from Greek, Norse, Egyptian, Japanese, or other global mythologies.
  - Types must be Character, Object, or Place.
  - Provide a compelling name, short description, and immersive lore for each.`;

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
    console.error("Error generating booster:", error);
    // Fallback static cards if API fails
    return [];
  }
};
