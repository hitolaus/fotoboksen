import { pickFresh, type Rand } from './powers';

/** Sticker shapes, each a filled path on a 24 x 24 grid (sakura is one petal, drawn five times). */
export const SHAPE_PATHS = {
  star: 'm12 2.2 3 6.2 6.8.9-5 4.7 1.3 6.8L12 17.5l-6.1 3.3 1.3-6.8-5-4.7 6.8-.9 3-6.2Z',
  heart: 'M12 21.3S3.3 15.9 3.3 9.6A4.8 4.8 0 0 1 12 6.8a4.8 4.8 0 0 1 8.7 2.8c0 6.3-8.7 11.7-8.7 11.7Z',
  sparkle: 'M12 2c.9 5.1 4.9 9.1 10 10-5.1.9-9.1 4.9-10 10-.9-5.1-4.9-9.1-10-10 5.1-.9 9.1-4.9 10-10Z',
  cat: 'M4 9.6 3.6 3.2l5 3.1A9 9 0 0 1 12 5.6a9 9 0 0 1 3.4.7l5-3.1-.4 6.4a8 8 0 0 1 1 3.8c0 4.7-4 7.8-9 7.8s-9-3.1-9-7.8a8 8 0 0 1 1-3.8Z',
  paw: 'M12 21c-3.2 0-5.2-1.6-5.2-3.6 0-2.5 2.5-5.1 5.2-5.1s5.2 2.6 5.2 5.1c0 2-2 3.6-5.2 3.6Z M5.2 12.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M9.3 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M14.7 8.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M18.8 12.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  petal: 'M12 12C9.3 9.4 9 5.2 10.7 3.1L12 4.4l1.3-1.3C15 5.2 14.7 9.4 12 12Z',
  cloud: 'M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.3 1.6 3.8 3.8 0 0 1-.2 7.4H7Z',
} as const;

export type Shape = 'star' | 'heart' | 'sparkle' | 'cat' | 'paw' | 'sakura' | 'cloud';

export interface Sticker {
  shape: Shape;
  color: string;
}

export interface StickerSet {
  id: string;
  label: string;
  /** the print's frame runs from `frameA` (top) to `frameB` (bottom) */
  frameA: string;
  frameB: string;
  /** colour of the bubble's rim and the title stroke */
  accent: string;
  /** glyph colour on the picker chip's disc, chosen to read on that set's gradient */
  chipInk: string;
  icon: Shape;
  /** laid onto the sticker slots in order, repeating */
  stickers: Sticker[];
}

const PINK = '#ff4fa3';
const LILAC = '#c9a7ff';
const LEMON = '#ffe14d';
const MINT = '#7ff0d0';
const SKY = '#8fd3ff';
const WHITE = '#ffffff';

export const STICKER_SETS: StickerSet[] = [
  {
    id: 'stjerner',
    label: 'Stjerner',
    frameA: '#8a2be2',
    frameB: '#ff5cb8',
    accent: '#5a1290',
    chipInk: '#ffffff',
    icon: 'star',
    stickers: [
      { shape: 'star', color: LEMON },
      { shape: 'sparkle', color: WHITE },
      { shape: 'sparkle', color: LILAC },
      { shape: 'star', color: PINK },
      { shape: 'sparkle', color: LEMON },
    ],
  },
  {
    id: 'hjerter',
    label: 'Hjerter',
    frameA: '#ff4fa3',
    frameB: '#ffa3d1',
    accent: '#c2187e',
    chipInk: '#c2187e',
    icon: 'heart',
    stickers: [
      { shape: 'heart', color: '#ff2e7e' },
      { shape: 'heart', color: WHITE },
      { shape: 'sparkle', color: LEMON },
      { shape: 'heart', color: LILAC },
    ],
  },
  {
    id: 'kattekat',
    label: 'Kattekat',
    frameA: '#b388ff',
    frameB: '#ffc1e3',
    accent: '#6a1b9a',
    chipInk: '#6a1b9a',
    icon: 'cat',
    stickers: [
      { shape: 'cat', color: WHITE },
      { shape: 'paw', color: PINK },
      { shape: 'cat', color: '#ffd1e8' },
      { shape: 'paw', color: '#8a2be2' },
    ],
  },
  {
    id: 'sakura',
    label: 'Sakura',
    frameA: '#ff7ab8',
    frameB: '#ffe0ef',
    accent: '#d81b74',
    chipInk: '#d81b74',
    icon: 'sakura',
    stickers: [
      { shape: 'sakura', color: '#ffb7d5' },
      { shape: 'sakura', color: WHITE },
      { shape: 'sparkle', color: '#ffe0ef' },
      { shape: 'sakura', color: '#ff7ab8' },
    ],
  },
  {
    id: 'skyer',
    label: 'Skyer',
    frameA: '#7b6cff',
    frameB: '#8fd3ff',
    accent: '#3d2aa8',
    chipInk: '#3d2aa8',
    icon: 'cloud',
    stickers: [
      { shape: 'cloud', color: WHITE },
      { shape: 'star', color: LEMON },
      { shape: 'cloud', color: SKY },
      { shape: 'sparkle', color: MINT },
    ],
  },
  {
    id: 'blanding',
    label: 'Blanding',
    frameA: '#6a1b9a',
    frameB: '#ff4fa3',
    accent: '#4a0e72',
    chipInk: '#ffffff',
    icon: 'sparkle',
    stickers: [
      { shape: 'star', color: LEMON },
      { shape: 'heart', color: PINK },
      { shape: 'cat', color: WHITE },
      { shape: 'sakura', color: '#ffb7d5' },
      { shape: 'cloud', color: SKY },
      { shape: 'sparkle', color: MINT },
    ],
  },
];

export const stickerSet = (id: string): StickerSet => STICKER_SETS.find((s) => s.id === id) ?? STICKER_SETS[0];

/** The sticker that goes in slot `i` for a set: the set's list, repeated around the print. */
export const stickerFor = (set: StickerSet, i: number): Sticker => set.stickers[i % set.stickers.length];

export const PHRASES = [
  'Kawaii!',
  'Tillykke!',
  'Bedste venner!',
  'Sååå sødt!',
  'Hurra for os!',
  'Vi er seje!',
  'Kage nu!',
  'Kram!',
  'Super-søde!',
  'Fest-stjerner!',
] as const;

/** The speech bubble's surprise phrase, never the previous one again. */
export function pickPhrase(rand: Rand, previous?: string): string {
  return pickFresh(PHRASES, rand, previous);
}

/** SVG markup of a shape for the picker chips. */
export function shapeSvg(shape: Shape): string {
  const inner =
    shape === 'sakura'
      ? [0, 72, 144, 216, 288].map((a) => `<path transform="rotate(${a} 12 12)" d="${SHAPE_PATHS.petal}"/>`).join('')
      : `<path d="${SHAPE_PATHS[shape]}"/>`;
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${inner}</svg>`;
}
