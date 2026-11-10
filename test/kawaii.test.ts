import { describe, expect, it } from 'vitest';
import { intersects, purikuraLayout, slotRect, STICKER_SLOTS, PURI_W, PURI_H } from '../src/geometry';
import { PHRASES, pickPhrase, shapeSvg, stickerFor, STICKER_SETS } from '../src/kawaii';

const L = purikuraLayout();
const onPage = (r: { x: number; y: number; w: number; h: number }) =>
  r.x >= 0 && r.y >= 0 && r.x + r.w <= PURI_W && r.y + r.h <= PURI_H;

describe('purikura layout', () => {
  it('is a 3:4 print', () => {
    expect(PURI_W / PURI_H).toBeCloseTo(3 / 4, 6);
  });

  it('never puts a sticker on the faces', () => {
    for (const [i, slot] of STICKER_SLOTS.entries()) expect(intersects(slotRect(slot), L.faces), `slot ${i}`).toBe(false);
  });

  it('lets side stickers reach only a sliver into the photo, so kids at the edges stay visible', () => {
    for (const slot of STICKER_SLOTS) {
      const r = slotRect(slot);
      if (r.y + r.h <= L.faces.y) continue; // up in the top strip, above the heads
      const intoLeft = r.x + r.w - L.photo.x;
      const intoRight = L.photo.x + L.photo.w - r.x;
      expect(Math.min(intoLeft, intoRight)).toBeLessThanOrEqual(60);
    }
  });

    it('keeps the speech bubble off the faces too', () => {
    expect(intersects(L.bubble, L.faces)).toBe(false);
  });

  it('keeps every sticker and the bubble on the print', () => {
    for (const slot of STICKER_SLOTS) expect(onPage(slotRect(slot))).toBe(true);
    expect(onPage(L.bubble)).toBe(true);
  });

  it('keeps stickers out of the bubble and off the title band', () => {
    for (const slot of STICKER_SLOTS) {
      expect(intersects(slotRect(slot), L.bubble)).toBe(false);
      expect(intersects(slotRect(slot), L.band)).toBe(false);
    }
  });
});

describe('sticker sets', () => {
  it('fills every slot from the set, repeating its stickers in order', () => {
    const set = STICKER_SETS.find((s) => s.id === 'hjerter')!;
    const used = STICKER_SLOTS.map((_, i) => stickerFor(set, i));
    expect(used[0]).toEqual(set.stickers[0]);
    expect(used[set.stickers.length]).toEqual(set.stickers[0]);
    expect(used.every((s) => set.stickers.includes(s))).toBe(true);
  });

  it('gives each set a unique id and at least two kinds of sticker', () => {
    expect(new Set(STICKER_SETS.map((s) => s.id)).size).toBe(STICKER_SETS.length);
    for (const s of STICKER_SETS) expect(s.stickers.length).toBeGreaterThanOrEqual(2);
  });

  it('draws the sakura chip icon as five petals', () => {
    expect(shapeSvg('sakura').match(/<path/g)).toHaveLength(5);
    expect(shapeSvg('star').match(/<path/g)).toHaveLength(1);
  });
});

describe('speech bubble phrases', () => {
  it('picks from the list and never repeats the previous phrase', () => {
    for (const p of PHRASES) {
      const next = pickPhrase(() => 0, p);
      expect(PHRASES).toContain(next);
      expect(next).not.toBe(p);
    }
  });

  it('keeps phrases short enough to read in the bubble', () => {
    for (const p of PHRASES) expect(p.length).toBeLessThanOrEqual(16);
  });
});
