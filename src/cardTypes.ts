import type { ElementIcon } from './icons';

export type CardTypeId = 'ild' | 'vand' | 'lyn' | 'jungle' | 'galakse' | 'slik';

export interface CardType {
  id: CardTypeId;
  label: string;
  icon: ElementIcon;
  /** light and dark tone of the inner panel */
  light: string;
  dark: string;
  /** colour of the pattern glyphs scattered on the panel */
  glyph: string;
  /** text colour that reads on `dark` */
  ink: string;
}

export const CARD_TYPES: CardType[] = [
  { id: 'ild', label: 'Ild', icon: 'flame', light: '#ff9a3c', dark: '#e8371a', glyph: '#ffe14d', ink: '#fff7e0' },
  { id: 'vand', label: 'Vand', icon: 'drop', light: '#6fd6ff', dark: '#1673d9', glyph: '#e6fbff', ink: '#fff7e0' },
  { id: 'lyn', label: 'Lyn', icon: 'bolt', light: '#fff27a', dark: '#f5a300', glyph: '#141a4d', ink: '#141a4d' },
  { id: 'jungle', label: 'Jungle', icon: 'leaf', light: '#8ff06b', dark: '#139a4c', glyph: '#e9ffd6', ink: '#fff7e0' },
  { id: 'galakse', label: 'Galakse', icon: 'star', light: '#a98bff', dark: '#3a1f9e', glyph: '#ffe14d', ink: '#fff7e0' },
  { id: 'slik', label: 'Slik', icon: 'heart', light: '#ffa8d9', dark: '#e6247f', glyph: '#fff7e0', ink: '#fff7e0' },
];

export const cardType = (id: CardTypeId): CardType => CARD_TYPES.find((t) => t.id === id) ?? CARD_TYPES[0];
