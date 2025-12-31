
export enum Rarity {
  NORMAL = 'Normale',
  RARE = 'Rare',
  EPIC = 'Épique',
  HEROIC = 'Héroïque',
  MYTHIC = 'Mythique'
}

export enum CardType {
  CHARACTER = 'Personnage',
  OBJECT = 'Objet',
  PLACE = 'Lieu'
}

export interface MythologyCard {
  id: string;
  name: string;
  type: CardType;
  rarity: Rarity;
  mythology: string;
  description: string;
  lore: string;
  imageUrl: string;
  timestamp: number;
}

export type ViewState = 'temple' | 'collection' | 'deck' | 'compendium';
