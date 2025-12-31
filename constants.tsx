
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
