import { describe, expect, it } from 'vitest';
import { BLOCK, BLOK_H, BLOK_W, blokLayout, intersects, ITEM_SLOTS, slotRect } from '../src/geometry';
import { blockNoise, itemFor, pickTitle, SPRITES, spritePixels, spriteSvg, TITLES, WORLDS, type SpriteId } from '../src/blokland';
import { THEMES } from '../src/themes';

const L = blokLayout();
const onPage = (r: { x: number; y: number; w: number; h: number }) =>
  r.x >= 0 && r.y >= 0 && r.x + r.w <= BLOK_W && r.y + r.h <= BLOK_H;

describe('Blokland layout', () => {
  it('is a 3:4 print built from whole blocks, with the photo and band on the block grid', () => {
    expect(BLOK_W / BLOK_H).toBeCloseTo(3 / 4, 6);
    expect(BLOK_W % BLOCK).toBe(0);
    expect(BLOK_H % BLOCK).toBe(0);
    for (const v of [L.photo.x, L.photo.y, L.photo.w, L.photo.h, L.band.y]) expect(v % BLOCK).toBe(0);
    expect(L.photo.y + L.photo.h).toBe(L.band.y);
  });

  it('never puts an item or the banner on the faces', () => {
    for (const [i, slot] of ITEM_SLOTS.entries()) expect(intersects(slotRect(slot), L.faces), `slot ${i}`).toBe(false);
    expect(intersects(L.banner, L.faces)).toBe(false);
  });

  it('keeps items on the print, off the banner and off the title band', () => {
    for (const slot of ITEM_SLOTS) {
      const r = slotRect(slot);
      expect(onPage(r)).toBe(true);
      expect(intersects(r, L.banner)).toBe(false);
      expect(intersects(r, L.band)).toBe(false);
    }
  });

  it('lets side items reach only a sliver into the photo', () => {
    for (const slot of ITEM_SLOTS) {
      const r = slotRect(slot);
      if (r.y + r.h <= L.faces.y) continue;
      const intoLeft = r.x + r.w - L.photo.x;
      const intoRight = L.photo.x + L.photo.w - r.x;
      expect(Math.min(intoLeft, intoRight)).toBeLessThanOrEqual(60);
    }
  });
});

describe('worlds and sprites', () => {
  it('gives every world a unique id, three block tones and items to show', () => {
    expect(new Set(WORLDS.map((w) => w.id)).size).toBe(WORLDS.length);
    for (const w of WORLDS) {
      expect(w.block).toHaveLength(3);
      expect(w.items.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('repeats a world’s items in order around the frame', () => {
    const w = WORLDS[1];
    expect(itemFor(w, 0)).toBe(w.items[0]);
    expect(itemFor(w, w.items.length)).toBe(w.items[0]);
  });

  it('has a colour for every pixel of every sprite', () => {
    for (const id of Object.keys(SPRITES) as SpriteId[]) {
      for (const [, , c] of spritePixels({ sprite: id })) expect(c).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('recolours a sprite without changing its shape (red gem)', () => {
    const plain = spritePixels({ sprite: 'gem' });
    const ruby = spritePixels({ sprite: 'gem', recolor: { c: '#ff4a5a' } });
    expect(ruby.map(([x, y]) => `${x},${y}`)).toEqual(plain.map(([x, y]) => `${x},${y}`));
    expect(ruby.some(([, , c]) => c === '#ff4a5a')).toBe(true);
  });

  it('draws chip icons as crisp pixel squares', () => {
    const svg = spriteSvg('coin');
    expect(svg).toContain('shape-rendering="crispEdges"');
    expect(svg.match(/<rect/g)!.length).toBe(spritePixels({ sprite: 'coin' }).length);
  });

  it('textures blocks the same way every frame', () => {
    expect(blockNoise(3, 4, 5, 6)).toBe(blockNoise(3, 4, 5, 6));
    const values = Array.from({ length: 200 }, (_, i) => blockNoise(i, i * 3, i % 10, (i * 7) % 10));
    expect(values.every((v) => v >= 0 && v <= 1)).toBe(true);
    expect(new Set(values.map((v) => v < 0.5)).size).toBe(2);
  });
});

describe('LEVEL UP! titles', () => {
  it('awards a title from the list, never the previous one again', () => {
    for (const t of TITLES) {
      const next = pickTitle(() => 0, t);
      expect(TITLES).toContain(next);
      expect(next).not.toBe(t);
    }
  });

  it('is what the Blokland theme reveals after the shot', () => {
    expect(TITLES).toContain(THEMES.blokland.surprise('graes', () => 0.4).text);
  });
});

describe('world chips', () => {
  it('shows each world as its own block, so no two chips look alike', async () => {
    const { blockSvg } = await import('../src/blokland');
    const icons = WORLDS.map((w) => blockSvg(w));
    expect(new Set(icons).size).toBe(WORLDS.length);
    for (const [i, w] of WORLDS.entries()) expect(icons[i]).toContain(w.block[0]);
  });
});
