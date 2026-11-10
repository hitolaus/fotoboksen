import { describe, expect, it } from 'vitest';
import { cardLayout, coverCrop, CARD_W, CARD_H } from '../src/geometry';

describe('coverCrop', () => {
  it('crops the sides of a wide camera frame to fill a squarer window, centred', () => {
    const r = coverCrop(1920, 1080, 824, 668);
    expect(r.h).toBe(1080);
    expect(r.w / r.h).toBeCloseTo(824 / 668, 6);
    expect(r.x).toBeCloseTo((1920 - r.w) / 2, 6);
    expect(r.y).toBe(0);
  });

  it('crops top and bottom of a tall frame (portrait iPad camera)', () => {
    const r = coverCrop(1080, 1920, 824, 668);
    expect(r.w).toBe(1080);
    expect(r.w / r.h).toBeCloseTo(824 / 668, 6);
    expect(r.y).toBeCloseTo((1920 - r.h) / 2, 6);
  });

  it('uses the whole frame when the ratios already match', () => {
    expect(coverCrop(800, 600, 400, 300)).toEqual({ x: 0, y: 0, w: 800, h: 600 });
  });
});

describe('cardLayout', () => {
  const contains = (o: { x: number; y: number; w: number; h: number }, i: typeof o) =>
    i.x >= o.x && i.y >= o.y && i.x + i.w <= o.x + o.w && i.y + i.h <= o.y + o.h;

  it('is a 5:7 trading card', () => {
    expect(CARD_W / CARD_H).toBeCloseTo(5 / 7, 6);
  });

  it('keeps every block inside the inner panel and the photo inside its mat', () => {
    const L = cardLayout();
    for (const k of ['title', 'artFrame', 'ribbon', 'stats', 'footer'] as const) expect(contains(L.inner, L[k])).toBe(true);
    expect(contains(L.artFrame, L.art)).toBe(true);
  });

  it('stacks the blocks top to bottom without overlapping', () => {
    const L = cardLayout();
    const order = [L.title, L.artFrame, L.ribbon, L.stats, L.footer];
    for (let i = 1; i < order.length; i++) expect(order[i].y).toBeGreaterThanOrEqual(order[i - 1].y + order[i - 1].h);
  });

  it('scales uniformly for the smaller live preview', () => {
    const full = cardLayout(1);
    const half = cardLayout(0.5);
    expect(half.art).toEqual({ x: full.art.x / 2, y: full.art.y / 2, w: full.art.w / 2, h: full.art.h / 2 });
  });
});
