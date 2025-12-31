
import { Rarity } from './types';

export const RARITY_STYLES: Record<Rarity, string> = {
  [Rarity.NORMAL]: 'from-stone-500 to-stone-700 shadow-stone-900',
  [Rarity.RARE]: 'from-blue-500 to-blue-700 shadow-blue-900',
  [Rarity.EPIC]: 'from-purple-500 to-purple-700 shadow-purple-900',
  [Rarity.HEROIC]: 'from-pink-500 to-pink-700 shadow-pink-900',
  [Rarity.MYTHIC]: 'from-amber-400 via-yellow-500 to-amber-700 shadow-amber-900 border-amber-300'
};

export const MYTHOLOGIES = [
  'Grecque', 'Nordique', 'Égyptienne', 'Japonaise', 'Celtique', 'Aztèque', 'Hindoue'
];

export interface CompendiumEntry {
  name: string;
  mythology: string;
  rarity: Rarity;
}

export const COMPENDIUM_DATA: CompendiumEntry[] = [
  // Grecque
  { name: 'Zeus', mythology: 'Grecque', rarity: Rarity.MYTHIC },
  { name: 'Poséidon', mythology: 'Grecque', rarity: Rarity.MYTHIC },
  { name: 'Hadès', mythology: 'Grecque', rarity: Rarity.MYTHIC },
  { name: 'Athéna', mythology: 'Grecque', rarity: Rarity.HEROIC },
  { name: 'Foudre de Zeus', mythology: 'Grecque', rarity: Rarity.EPIC },
  { name: 'Mont Olympe', mythology: 'Grecque', rarity: Rarity.RARE },
  
  // Nordique
  { name: 'Odin', mythology: 'Nordique', rarity: Rarity.MYTHIC },
  { name: 'Thor', mythology: 'Nordique', rarity: Rarity.MYTHIC },
  { name: 'Loki', mythology: 'Nordique', rarity: Rarity.HEROIC },
  { name: 'Mjölnir', mythology: 'Nordique', rarity: Rarity.EPIC },
  { name: 'Yggdrasil', mythology: 'Nordique', rarity: Rarity.MYTHIC },
  { name: 'Valhalla', mythology: 'Nordique', rarity: Rarity.RARE },

  // Égyptienne
  { name: 'Râ', mythology: 'Égyptienne', rarity: Rarity.MYTHIC },
  { name: 'Osiris', mythology: 'Égyptienne', rarity: Rarity.MYTHIC },
  { name: 'Isis', mythology: 'Égyptienne', rarity: Rarity.HEROIC },
  { name: 'Anubis', mythology: 'Égyptienne', rarity: Rarity.HEROIC },
  { name: 'Œil d\'Horus', mythology: 'Égyptienne', rarity: Rarity.EPIC },
  { name: 'Pyramides de Gizeh', mythology: 'Égyptienne', rarity: Rarity.RARE },

  // Japonaise
  { name: 'Amaterasu', mythology: 'Japonaise', rarity: Rarity.MYTHIC },
  { name: 'Susanoo', mythology: 'Japonaise', rarity: Rarity.MYTHIC },
  { name: 'Tsukuyomi', mythology: 'Japonaise', rarity: Rarity.HEROIC },
  { name: 'Kusanagi', mythology: 'Japonaise', rarity: Rarity.EPIC },
  { name: 'Mont Fuji', mythology: 'Japonaise', rarity: Rarity.RARE },
  { name: 'Inari', mythology: 'Japonaise', rarity: Rarity.RARE },

  // Ancestral / Divers
  { name: 'Quetzalcóatl', mythology: 'Aztèque', rarity: Rarity.MYTHIC },
  { name: 'Ganesh', mythology: 'Hindoue', rarity: Rarity.MYTHIC },
  { name: 'Shiva', mythology: 'Hindoue', rarity: Rarity.MYTHIC },
  { name: 'Excalibur', mythology: 'Celtique', rarity: Rarity.EPIC },
];
