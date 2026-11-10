export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Source rectangle that fills `dstW x dstH` without distortion, centred (CSS object-fit: cover). */
export function coverCrop(srcW: number, srcH: number, dstW: number, dstH: number): Rect {
  const srcRatio = srcW / srcH;
  const dstRatio = dstW / dstH;
  if (srcRatio > dstRatio) {
    const w = srcH * dstRatio;
    return { x: (srcW - w) / 2, y: 0, w, h: srcH };
  }
  const h = srcW / dstRatio;
  return { x: 0, y: (srcH - h) / 2, w: srcW, h };
}

/** The card is designed on a 1000 x 1400 grid (5:7, a trading card). */
export const CARD_W = 1000;
export const CARD_H = 1400;

export interface CardLayout {
  card: Rect;
  inner: Rect;
  title: Rect;
  artFrame: Rect;
  art: Rect;
  ribbon: Rect;
  stats: Rect;
  footer: Rect;
}

const BASE: CardLayout = {
  card: { x: 0, y: 0, w: CARD_W, h: CARD_H },
  inner: { x: 40, y: 40, w: 920, h: 1320 },
  title: { x: 72, y: 64, w: 856, h: 104 },
  artFrame: { x: 72, y: 180, w: 856, h: 700 },
  art: { x: 88, y: 196, w: 824, h: 668 },
  ribbon: { x: 72, y: 900, w: 856, h: 60 },
  stats: { x: 72, y: 980, w: 856, h: 300 },
  footer: { x: 72, y: 1290, w: 856, h: 56 },
};

const scaleRect = (r: Rect, s: number): Rect => ({ x: r.x * s, y: r.y * s, w: r.w * s, h: r.h * s });

export function cardLayout(scale = 1): CardLayout {
  const out = {} as CardLayout;
  for (const key of Object.keys(BASE) as (keyof CardLayout)[]) out[key] = scaleRect(BASE[key], scale);
  return out;
}

export const intersects = (a: Rect, b: Rect): boolean =>
  a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;

/** The magazine cover is designed on a 1050 x 1400 grid (3:4, a magazine page). */
export const COVER_W = 1050;
export const COVER_H = 1400;

export interface CoverLayout {
  cover: Rect;
  masthead: Rect;
  issue: Rect;
  teaser: Rect;
  burst: Rect;
  headline: Rect;
  barcode: Rect;
  /** the band where a group of kids stands in the photo, edge to edge; cover lines stay out of it */
  faces: Rect;
}

const COVER_BASE: CoverLayout = {
  cover: { x: 0, y: 0, w: COVER_W, h: COVER_H },
  masthead: { x: 0, y: 0, w: COVER_W, h: 232 },
  issue: { x: 0, y: 232, w: COVER_W, h: 52 },
  teaser: { x: 40, y: 304, w: 400, h: 70 },
  burst: { x: 846, y: 24, w: 184, h: 184 },
  headline: { x: 40, y: 1036, w: 760, h: 324 },
  barcode: { x: 846, y: 1214, w: 164, h: 146 },
  faces: { x: 0, y: 400, w: COVER_W, h: 630 },
};

export function coverLayout(scale = 1): CoverLayout {
  const out = {} as CoverLayout;
  for (const key of Object.keys(COVER_BASE) as (keyof CoverLayout)[]) out[key] = scaleRect(COVER_BASE[key], scale);
  return out;
}

/** The purikura print is designed on the same 1050 x 1400 grid (3:4) as the cover. */
export const PURI_W = 1050;
export const PURI_H = 1400;

export interface PurikuraLayout {
  page: Rect;
  photo: Rect;
  band: Rect;
  bubble: Rect;
  /** where the kids' faces usually are; stickers and the bubble stay out of it */
  faces: Rect;
}

const PURI_BASE: PurikuraLayout = {
  page: { x: 0, y: 0, w: PURI_W, h: PURI_H },
  photo: { x: 56, y: 56, w: 938, h: 1090 },
  band: { x: 56, y: 1166, w: 938, h: 178 },
  bubble: { x: 600, y: 92, w: 370, h: 228 },
  faces: { x: 170, y: 340, w: 710, h: 800 },
};

export function purikuraLayout(scale = 1): PurikuraLayout {
  const out = {} as PurikuraLayout;
  for (const key of Object.keys(PURI_BASE) as (keyof PurikuraLayout)[]) out[key] = scaleRect(PURI_BASE[key], scale);
  return out;
}

/** A sticker position on the purikura grid: centre, size and tilt. */
export interface StickerSlot {
  x: number;
  y: number;
  size: number;
  rot: number;
}

/** Stickers hug the top of the photo and straddle the side edges, clear of the faces. */
export const STICKER_SLOTS: StickerSlot[] = [
  { x: 112, y: 122, size: 150, rot: -0.24 },
  { x: 292, y: 92, size: 100, rot: 0.18 },
  { x: 452, y: 150, size: 80, rot: -0.1 },
  // side stickers sit on the frame's edge, reaching at most 60px into the photo (tested)
  { x: 992, y: 400, size: 104, rot: 0.2 },
  { x: 58, y: 480, size: 100, rot: -0.18 },
  { x: 994, y: 650, size: 88, rot: 0.14 },
  { x: 58, y: 770, size: 104, rot: 0.24 },
  { x: 992, y: 900, size: 104, rot: -0.2 },
  { x: 58, y: 1060, size: 100, rot: 0.18 },
  { x: 990, y: 1110, size: 96, rot: -0.14 },
];

export const slotRect = (s: StickerSlot, scale = 1): Rect => ({
  x: (s.x - s.size / 2) * scale,
  y: (s.y - s.size / 2) * scale,
  w: s.size * scale,
  h: s.size * scale,
});
