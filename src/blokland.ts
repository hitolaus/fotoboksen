import { pickFresh, type Rand } from './powers';

/**
 * Pixel sprites, one character per pixel. '.' is empty; every other character is a colour key
 * looked up in the sprite's palette. All sprites are our own drawings.
 */
export const SPRITES = {
  gem: ['..kkkkkk..', '.kcwwccck.', 'kcwcccccck', 'kccccccddk', '.kccccddk.', '..kccddk..', '...kcdk...', '....kk....'],
  coin: ['..kkkk..', '.kyyyyk.', 'kyywyyok', 'kywyyyok', 'kyyyyyok', 'kyyyyook', '.kyoook.', '..kkkk..'],
  cake: ['....f.....', '....w.....', '.kkkkkkkk.', 'kppppppppk', 'kwpwwpwwpk', 'kbbbbbbbbk', 'kbbbbbbbbk', 'kppppppppk', '.kkkkkkkk.'],
  star: ['....k....', '...kyk...', 'kkkyyykkk', 'kyyyyyyyk', '.kyyyyyk.', '.kyykyyk.', 'kyyk.kyyk', 'kkk...kkk'],
  torch: ['.ff.', 'fyyf', 'kyyk', '.kk.', '.bb.', '.bb.', '.bb.', '.kk.'],
  flake: ['....k....', '.k..c..k.', '..k.c.k..', '...ccc...', 'kccc.cccc', '...ccc...', '..k.c.k..', '.k..c..k.', '....k....'],
} as const;

export type SpriteId = keyof typeof SPRITES;

const BASE_PALETTE: Record<string, string> = {
  k: '#1b1b22',
  w: '#ffffff',
  c: '#3be8e0',
  d: '#1aa7a0',
  y: '#ffd23f',
  o: '#d99a00',
  f: '#ff9a1a',
  p: '#ff6fa8',
  b: '#a0582d',
};

export interface Item {
  sprite: SpriteId;
  /** colour keys to swap, e.g. a red gem */
  recolor?: Record<string, string>;
}

export interface World {
  id: string;
  label: string;
  /** block colours: base, lighter and darker pixels */
  block: [string, string, string];
  items: Item[];
}

const RUBY = { c: '#ff4a5a', d: '#b3122e' };
const ICE = { c: '#bff4ff', d: '#6ccbe8' };

export const WORLDS: World[] = [
  { id: 'graes', label: 'Græs', block: ['#4caf3a', '#6fd14f', '#2f8424'], items: [{ sprite: 'cake' }, { sprite: 'star' }, { sprite: 'coin' }, { sprite: 'gem' }] },
  { id: 'grotte', label: 'Grotte', block: ['#6b6b78', '#8a8a96', '#4a4a55'], items: [{ sprite: 'gem' }, { sprite: 'torch' }, { sprite: 'gem', recolor: RUBY }, { sprite: 'coin' }] },
  { id: 'oerken', label: 'Ørken', block: ['#e8c77a', '#f6dc9a', '#c9a55a'], items: [{ sprite: 'coin' }, { sprite: 'star' }, { sprite: 'gem', recolor: RUBY }] },
  { id: 'sne', label: 'Sne', block: ['#e6f2fa', '#ffffff', '#b9d3e6'], items: [{ sprite: 'flake' }, { sprite: 'gem', recolor: ICE }, { sprite: 'star' }] },
  { id: 'lava', label: 'Lava', block: ['#d9461e', '#ff8a1e', '#8c1f12'], items: [{ sprite: 'torch' }, { sprite: 'coin' }, { sprite: 'gem', recolor: RUBY }] },
  { id: 'hav', label: 'Hav', block: ['#2a7fd4', '#4fa6f0', '#1a5596'], items: [{ sprite: 'gem' }, { sprite: 'star' }, { sprite: 'coin' }] },
];

export const world = (id: string): World => WORLDS.find((w) => w.id === id) ?? WORLDS[0];

/** The item in slot `i` for a world: its list, repeated around the frame. */
export const itemFor = (w: World, i: number): Item => w.items[i % w.items.length];

export const paletteFor = (item: Item): Record<string, string> => ({ ...BASE_PALETTE, ...item.recolor });

/** Pixels of a sprite as [column, row, colour], for both canvas and SVG. */
export function spritePixels(item: Item): [number, number, string][] {
  const pal = paletteFor(item);
  const out: [number, number, string][] = [];
  SPRITES[item.sprite].forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch !== '.') out.push([x, y, pal[ch]]);
    });
  });
  return out;
}

/** Sprite size in pixels: the widest row and the number of rows. */
export function spriteSize(id: SpriteId): { w: number; h: number } {
  const rows = SPRITES[id];
  return { w: Math.max(...rows.map((r) => r.length)), h: rows.length };
}

/** SVG markup of a sprite for the picker chips, crisp at any size. */
export function spriteSvg(id: SpriteId): string {
  const { w, h } = spriteSize(id);
  const side = Math.max(w, h);
  const ox = (side - w) / 2;
  const oy = (side - h) / 2;
  const rects = spritePixels({ sprite: id })
    .map(([x, y, c]) => `<rect x="${x + ox}" y="${y + oy}" width="1.02" height="1.02" fill="${c}"/>`)
    .join('');
  return `<svg class="icon" viewBox="0 0 ${side} ${side}" aria-hidden="true" shape-rendering="crispEdges">${rects}</svg>`;
}

export const TITLES = [
  'Mester-bygger',
  'Diamant-finder',
  'Kage-kriger',
  'Grotte-helt',
  'Super-hopper',
  'Guld-graver',
  'Bloksmed',
  'Lava-løber',
  'Sne-ninja',
  'Fest-boss',
] as const;

/** The title the LEVEL UP! banner awards, never the previous one again. */
export function pickTitle(rand: Rand, previous?: string): string {
  return pickFresh(TITLES, rand, previous);
}

/** A chip icon for a world: one of its blocks, 10 x 10 pixels in its three tones with the darker seam. */
export function blockSvg(w: World): string {
  const [base, light, dark] = w.block;
  let rects = `<rect width="10" height="10" fill="${base}"/>`;
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const seam = x === 9 || y === 9;
      const n = blockNoise(7, 3, x, y);
      const fill = seam ? dark : n < 0.2 ? dark : n > 0.8 ? light : '';
      if (fill) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${fill}"/>`;
    }
  }
  return `<svg class="icon block-icon" viewBox="0 0 10 10" aria-hidden="true" shape-rendering="crispEdges">${rects}</svg>`;
}

/** A stable 0..1 value per block position, so the block texture is the same every frame. */
export function blockNoise(col: number, row: number, px: number, py: number): number {
  let h = (col * 374761393 + row * 668265263 + px * 2147483647 + py * 1274126177) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967295;
}
