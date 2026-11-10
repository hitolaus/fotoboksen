import { describe, expect, it } from 'vitest';
import { foilColor, holo, pixelBlock, pop, posterize, toon, type Pixels } from '../src/effects';

function image(w: number, h: number, fill: (x: number, y: number) => [number, number, number]): Pixels {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
      const [r, g, b] = fill(x, y);
      data.set([r, g, b, 255], (y * w + x) * 4);
    }
  return { data, width: w, height: h };
}
const px = (img: Pixels, x: number, y: number) => Array.from(img.data.slice((y * img.width + x) * 4, (y * img.width + x) * 4 + 4));

describe('posterize', () => {
  it('snaps channels to the nearest of N levels', () => {
    const img = image(1, 1, () => [10, 100, 200]);
    posterize(img, 3); // levels 0, 127.5, 255
    expect(px(img, 0, 0)).toEqual([0, 128, 255, 255]);
  });
});

describe('toon', () => {
  it('draws a dark outline where a light area meets a dark one, and leaves flat areas unlined', () => {
    const img = image(12, 6, (x) => (x < 6 ? [30, 30, 30] : [230, 230, 230]));
    toon(img);
    expect(px(img, 6, 3)).toEqual([20, 26, 77, 255]);
    expect(px(img, 2, 3)).not.toEqual([20, 26, 77, 255]);
    expect(px(img, 10, 3)).not.toEqual([20, 26, 77, 255]);
  });

  it('makes colours more saturated, not greyer', () => {
    const img = image(3, 3, () => [200, 120, 100]);
    toon(img);
    const [r, , b] = px(img, 1, 1);
    expect(r - b).toBeGreaterThan(100);
  });
});

describe('pop', () => {
  it('maps black to navy, mid grey to magenta and white to lemon', () => {
    const img = image(3, 1, (x) => [[0, 0, 0], [128, 128, 128], [255, 255, 255]][x] as [number, number, number]);
    pop(img);
    expect(px(img, 0, 0)).toEqual([20, 26, 77, 255]);
    const mid = px(img, 1, 0);
    expect(mid[0]).toBeGreaterThan(240);
    expect(mid[2]).toBeGreaterThan(200);
    expect(px(img, 2, 0)).toEqual([255, 225, 77, 255]);
  });
});

describe('holo', () => {
  it('brightens the picture with colour and keeps it opaque', () => {
    const img = image(20, 20, () => [100, 100, 100]);
    holo(img, 0);
    for (let i = 0; i < img.data.length; i += 4) {
      expect(img.data[i + 3]).toBe(255);
      expect(img.data[i] + img.data[i + 1] + img.data[i + 2]).toBeGreaterThan(300);
    }
  });

  it('moves the rainbow as time passes, so the foil shimmers', () => {
    const a = image(20, 20, () => [100, 100, 100]);
    const b = image(20, 20, () => [100, 100, 100]);
    holo(a, 0);
    holo(b, 0.33);
    expect(px(a, 5, 5)).not.toEqual(px(b, 5, 5));
  });
});

describe('foilColor', () => {
  it('cycles through distinct hues and wraps every 1.0', () => {
    expect(foilColor(0)).toEqual(foilColor(1));
    expect(foilColor(0)).not.toEqual(foilColor(0.33));
    expect(foilColor(0.33)).not.toEqual(foilColor(0.66));
  });
});

describe('pixelBlock', () => {
  it('gives roughly 48 blocks across the photo, never tiny blocks', () => {
    expect(pixelBlock(824)).toBe(17);
    expect(pixelBlock(100)).toBe(4);
  });
});
