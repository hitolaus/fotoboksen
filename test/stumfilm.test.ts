import { describe, expect, it } from 'vitest';
import { applyPixelEffect, contrast, film, type Pixels } from '../src/effects';
import { intersects, stumLayout, STUM_H, STUM_W } from '../src/geometry';
import { CAPTIONS, FRAME_STYLES, pickCaption, STUM_EFFECTS } from '../src/stumfilm';
import { effectsFor, THEMES } from '../src/themes';

function image(w: number, h: number, fill: (x: number, y: number) => [number, number, number]): Pixels {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) data.set([...fill(x, y), 255], (y * w + x) * 4);
  return { data, width: w, height: h };
}
const px = (img: Pixels, x: number, y: number) => Array.from(img.data.slice((y * img.width + x) * 4, (y * img.width + x) * 4 + 3));
const colourful = () => image(24, 24, (x, y) => [x * 10, 255 - y * 10, (x * y) % 255]);

describe('black and white pictures', () => {
  it('every effect Stumfilm offers comes out pure grey after the film finish', () => {
    for (const id of STUM_EFFECTS) {
      const img = colourful();
      applyPixelEffect(id, img, 0.3);
      film(img, 0.3);
      for (let i = 0; i < img.data.length; i += 4) {
        expect(img.data[i]).toBe(img.data[i + 1]);
        expect(img.data[i + 1]).toBe(img.data[i + 2]);
      }
    }
  });

  it('offers no colour effects', () => {
    const ids = effectsFor(THEMES.stumfilm).map((e) => e.id);
    expect(ids).not.toContain('holo');
    expect(ids).not.toContain('pop');
    expect(ids).toContain('normal');
  });

  it('the other themes keep their colour effects', () => {
    expect(effectsFor(THEMES.kort).map((e) => e.id)).toContain('holo');
  });

  it('darkens the corners like an old lens (vignette)', () => {
    const img = image(60, 60, () => [180, 180, 180]);
    film(img, 0.5);
    const avg = (x0: number, y0: number) => {
      let sum = 0;
      for (let y = y0; y < y0 + 5; y++) for (let x = x0; x < x0 + 5; x++) sum += px(img, x, y)[0];
      return sum / 25;
    };
    expect(avg(0, 0)).toBeLessThan(avg(28, 28) - 30);
  });

  it('gives the same frame the same grain, and a different frame different grain', () => {
    const a = colourful();
    const b = colourful();
    const c = colourful();
    film(a, 0.25);
    film(b, 0.25);
    film(c, 0.75);
    expect(Array.from(a.data)).toEqual(Array.from(b.data));
    expect(Array.from(a.data)).not.toEqual(Array.from(c.data));
  });
});

describe('Kontrast', () => {
  it('pushes darks darker and lights lighter, and keeps mid grey', () => {
    const img = image(3, 1, (x) => [[60, 60, 60], [128, 128, 128], [200, 200, 200]][x] as [number, number, number]);
    contrast(img);
    expect(px(img, 0, 0)[0]).toBeLessThan(60);
    expect(Math.abs(px(img, 1, 0)[0] - 128)).toBeLessThanOrEqual(2);
    expect(px(img, 2, 0)[0]).toBeGreaterThan(200);
  });

  it('keeps black black and white white', () => {
    const img = image(2, 1, (x) => (x ? [255, 255, 255] : [0, 0, 0]));
    contrast(img);
    expect(px(img, 0, 0)[0]).toBeLessThanOrEqual(1);
    expect(px(img, 1, 0)[0]).toBeGreaterThanOrEqual(254);
  });
});

describe('Stumfilm layout and captions', () => {
  it('puts the caption card under the still, not over it, and both on the print', () => {
    const L = stumLayout();
    expect(intersects(L.photo, L.caption)).toBe(false);
    for (const r of [L.photo, L.caption]) {
      expect(r.x + r.w).toBeLessThanOrEqual(STUM_W);
      expect(r.y + r.h).toBeLessThanOrEqual(STUM_H);
    }
    expect(STUM_W / STUM_H).toBeCloseTo(3 / 4, 6);
  });

  it('has a unique id per frame style', () => {
    expect(new Set(FRAME_STYLES.map((f) => f.id)).size).toBe(FRAME_STYLES.length);
  });

  it('draws a caption from the list, never the previous one again', () => {
    for (const c of CAPTIONS) {
      const next = pickCaption(() => 0, c);
      expect(CAPTIONS).toContain(next);
      expect(next).not.toBe(c);
    }
    expect(CAPTIONS).toContain(THEMES.stumfilm.surprise('klassisk', () => 0.5).text);
  });
});
