export interface Pixels {
  data: Uint8ClampedArray;
  width: number;
  height: number;
}

export type EffectId = 'normal' | 'holo' | 'pixel' | 'tegneserie' | 'pop' | 'spejl';

export interface Effect {
  id: EffectId;
  label: string;
}

export const EFFECTS: Effect[] = [
  { id: 'normal', label: 'Normal' },
  { id: 'holo', label: 'Holo' },
  { id: 'pixel', label: 'Pixel' },
  { id: 'tegneserie', label: 'Tegneserie' },
  { id: 'pop', label: 'Pop' },
  { id: 'spejl', label: 'Spejl' },
];

const luma = (r: number, g: number, b: number) => 0.299 * r + 0.587 * g + 0.114 * b;

/** Snap every colour channel to `levels` evenly spaced values. */
export function posterize(img: Pixels, levels: number): void {
  const step = 255 / (levels - 1);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.round(d[i] / step) * step;
    d[i + 1] = Math.round(d[i + 1] / step) * step;
    d[i + 2] = Math.round(d[i + 2] / step) * step;
  }
}

/** Cartoon look: boosted, posterized colour with dark ink outlines where brightness changes sharply. */
export function toon(img: Pixels): void {
  const { data: d, width: w, height: h } = img;
  const lum = new Float32Array(w * h);
  for (let p = 0, i = 0; p < lum.length; p++, i += 4) lum[p] = luma(d[i], d[i + 1], d[i + 2]);

  for (let i = 0; i < d.length; i += 4) {
    const l = luma(d[i], d[i + 1], d[i + 2]);
    // push colour away from grey before posterizing so the result is saturated
    d[i] = l + (d[i] - l) * 1.6;
    d[i + 1] = l + (d[i + 1] - l) * 1.6;
    d[i + 2] = l + (d[i + 2] - l) * 1.6;
  }
  posterize(img, 5);

  const threshold = 90;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x;
      const gx =
        -lum[p - w - 1] - 2 * lum[p - 1] - lum[p + w - 1] + lum[p - w + 1] + 2 * lum[p + 1] + lum[p + w + 1];
      const gy =
        -lum[p - w - 1] - 2 * lum[p - w] - lum[p - w + 1] + lum[p + w - 1] + 2 * lum[p + w] + lum[p + w + 1];
      if (gx * gx + gy * gy > threshold * threshold) {
        const i = p * 4;
        d[i] = 20;
        d[i + 1] = 26;
        d[i + 2] = 77;
      }
    }
  }
}

type RGB = [number, number, number];
const POP_STOPS: RGB[] = [
  [20, 26, 77], // navy
  [255, 79, 216], // magenta
  [255, 225, 77], // lemon
];

/** Tritone: shadows navy, mid-tones magenta, highlights lemon. */
export function pop(img: Pixels): void {
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const t = luma(d[i], d[i + 1], d[i + 2]) / 255;
    const [a, b, k] = t < 0.5 ? [POP_STOPS[0], POP_STOPS[1], t * 2] : [POP_STOPS[1], POP_STOPS[2], (t - 0.5) * 2];
    d[i] = a[0] + (b[0] - a[0]) * k;
    d[i + 1] = a[1] + (b[1] - a[1]) * k;
    d[i + 2] = a[2] + (b[2] - a[2]) * k;
  }
}

/** Pastel rainbow colour at hue position `pos` (wraps every 1.0). */
export function foilColor(pos: number): RGB {
  const hue = ((pos % 1) + 1) % 1;
  const l = 0.72;
  const a = 1 - l; // saturation 1 at this lightness
  const f = (n: number) => {
    const k = (n + hue * 12) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return [f(0), f(8), f(4)];
}

/** Holo foil: a rainbow screened over the picture, stronger in the highlights, drifting with `t`. */
export function holo(img: Pixels, t: number): void {
  const { data: d, width: w, height: h } = img;
  const span = w + h;
  // one lookup row per diagonal position keeps the loop cheap enough for live preview
  const lut = new Uint8ClampedArray(span * 3);
  for (let s = 0; s < span; s++) {
    const [r, g, b] = foilColor(s / span * 1.5 + t);
    lut[s * 3] = r;
    lut[s * 3 + 1] = g;
    lut[s * 3 + 2] = b;
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const s = (x + y) * 3;
      const strength = 0.25 + 0.4 * (luma(d[i], d[i + 1], d[i + 2]) / 255);
      for (let c = 0; c < 3; c++) {
        const base = d[i + c];
        const screen = 255 - ((255 - base) * (255 - lut[s + c])) / 255;
        d[i + c] = base + (screen - base) * strength;
      }
    }
  }
}

/** Pixel-art block size for the "Pixel" effect, so a face is a recognisable handful of blocks. */
export function pixelBlock(artWidth: number): number {
  return Math.max(4, Math.round(artWidth / 48));
}

export function applyPixelEffect(id: EffectId, img: Pixels, t: number): void {
  if (id === 'tegneserie') toon(img);
  else if (id === 'pop') pop(img);
  else if (id === 'holo') holo(img, t);
}
