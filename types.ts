
export enum Rarity {
  NORMAL = 'Normal',
  RARE = 'Rare',
  EPIC = 'Epic',
  HEROIC = 'Heroic',
  MYTHIC = 'Mythic'
}

export enum CardType {
  CHARACTER = 'Character',
  OBJECT = 'Object',
  PLACE = 'Place'
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

export type ViewState = 'temple' | 'collection';
