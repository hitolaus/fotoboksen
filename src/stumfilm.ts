import { pickFresh, type Rand } from './powers';
import type { EffectId } from './effects';

export type FrameStyleId = 'klassisk' | 'vifte' | 'straaler' | 'perler';

export interface FrameStyle {
  id: FrameStyleId;
  label: string;
}

/** Art Deco frame ornaments, all in silver on black. */
export const FRAME_STYLES: FrameStyle[] = [
  { id: 'klassisk', label: 'Klassisk' },
  { id: 'vifte', label: 'Vifte' },
  { id: 'straaler', label: 'Stråler' },
  { id: 'perler', label: 'Perler' },
];

/**
 * The pictures in this theme are always black and white, so it offers only effects that make
 * sense in black and white (no holo foil or pop colours).
 */
export const STUM_EFFECTS: EffectId[] = ['normal', 'kontrast', 'blod', 'tegneserie', 'spejl', 'pixel'];

/** Silent-film title cards: what the caption under the still says. */
export const CAPTIONS = [
  'Og så kom kagen …',
  'Pludselig: en ballon!',
  'Imens, i 2.B …',
  'Ingen havde set det komme!',
  'Smil, sagde fotografen.',
  'Den store fødselsdagsfest',
  'Kapitel 9: Gaverne',
  'Alle holdt vejret …',
  'Hvem spiste den sidste bolle?',
  'Og de festede lykkeligt …',
] as const;

/** The caption for one shot, never the previous one again. */
export function pickCaption(rand: Rand, previous?: string): string {
  return pickFresh(CAPTIONS, rand, previous);
}
