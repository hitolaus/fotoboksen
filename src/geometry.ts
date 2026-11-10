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
