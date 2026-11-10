import { CARD_BADGE, CARD_TITLE } from './config';
import { purikuraLayout, slotRect, STICKER_SLOTS, type Rect } from './geometry';
import { SHAPE_PATHS, stickerFor, stickerSet, type Shape, type StickerSet } from './kawaii';
import { cardNumberLabel, dateLabel } from './powers';
import type { Surprise } from './themes';

const POP = '"Mochiy Pop One", sans-serif';
const TEXT = '"Baloo 2", sans-serif';
const FACE = '#3a1450';
const BLUSH = 'rgba(255, 92, 150, 0.55)';

export async function loadPurikuraFonts(): Promise<void> {
  await document.fonts.load(`80px ${POP}`);
}

const cache = new Map<string, Path2D>();
const path = (d: string) => {
  let p = cache.get(d);
  if (!p) cache.set(d, (p = new Path2D(d)));
  return p;
};

/** Runs `paint` once per path of the shape, on the 24 x 24 grid already scaled into place. */
function eachPath(ctx: CanvasRenderingContext2D, shape: Shape, paint: (p: Path2D) => void) {
  if (shape === 'sakura') {
    for (let i = 0; i < 5; i++) {
      ctx.save();
      ctx.translate(12, 12);
      ctx.rotate((i * Math.PI * 2) / 5);
      ctx.translate(-12, -12);
      paint(path(SHAPE_PATHS.petal));
      ctx.restore();
    }
  } else paint(path(SHAPE_PATHS[shape]));
}

/** A tiny kawaii face: two dot eyes, a smile and blush. Drawn on the big stickers only. */
function face(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number) {
  ctx.fillStyle = FACE;
  for (const dx of [-0.17, 0.17]) {
    ctx.beginPath();
    ctx.arc(cx + dx * w, cy, w * 0.05, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = FACE;
  ctx.lineWidth = w * 0.035;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(cx, cy + w * 0.03, w * 0.07, 0.35, Math.PI - 0.35);
  ctx.stroke();
  ctx.fillStyle = BLUSH;
  for (const dx of [-0.29, 0.29]) {
    ctx.beginPath();
    ctx.ellipse(cx + dx * w, cy + w * 0.08, w * 0.07, w * 0.045, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** One die-cut sticker: thick white outline with a soft lift, the coloured shape, a gloss and maybe a face. */
export function drawSticker(ctx: CanvasRenderingContext2D, shape: Shape, color: string, cx: number, cy: number, size: number, rot: number) {
  const k = size / 24;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.translate(-size / 2, -size / 2);
  ctx.scale(k, k);

  ctx.save();
  ctx.shadowColor = 'rgba(70, 0, 80, 0.35)';
  // shadow settings are in canvas pixels, untouched by the transform
  ctx.shadowBlur = size * 0.08;
  ctx.shadowOffsetY = size * 0.03;
  ctx.strokeStyle = '#ffffff';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 3.4;
  eachPath(ctx, shape, (p) => ctx.stroke(p));
  ctx.restore();
  ctx.fillStyle = '#ffffff';
  eachPath(ctx, shape, (p) => ctx.fill(p));
  ctx.fillStyle = color;
  eachPath(ctx, shape, (p) => ctx.fill(p));
  if (color.toLowerCase() === '#ffffff') {
    ctx.strokeStyle = 'rgba(200, 160, 230, 0.6)';
    ctx.lineWidth = 0.6;
    eachPath(ctx, shape, (p) => ctx.stroke(p));
  }

  if (shape === 'sakura') {
    ctx.fillStyle = '#ffe14d';
    ctx.beginPath();
    ctx.arc(12, 12, 1.8, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape !== 'paw') {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.ellipse(8.6, 8.4, 1.9, 1.1, -0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  if (size >= 100 && (shape === 'star' || shape === 'heart' || shape === 'cat' || shape === 'cloud')) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    const faceY = shape === 'heart' ? -size * 0.02 : shape === 'cat' ? size * 0.08 : size * 0.06;
    face(ctx, 0, faceY, size * (shape === 'cat' ? 0.85 : 0.7));
    ctx.restore();
  }
}

function fit(ctx: CanvasRenderingContext2D, text: string, font: (px: number) => string, px: number, maxW: number) {
  ctx.font = font(px);
  const w = ctx.measureText(text).width;
  if (w > maxW) ctx.font = font(Math.floor((px * maxW) / w));
}

/** The frame behind the photo: the set's gradient with polka dots, and the title band. */
export function drawPurikuraUnder(
  ctx: CanvasRenderingContext2D,
  s: number,
  setId: string,
  info: { number: number; date: Date },
): void {
  const L = purikuraLayout(s);
  const set = stickerSet(setId);
  ctx.save();
  const g = ctx.createLinearGradient(0, 0, 0, L.page.h);
  g.addColorStop(0, set.frameA);
  g.addColorStop(1, set.frameB);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(0, 0, L.page.w, L.page.h, 40 * s);
  ctx.fill();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
  const step = 46 * s;
  for (let row = 0; row * step < L.page.h + step; row++) {
    for (let col = 0; col * step < L.page.w + step; col++) {
      ctx.beginPath();
      ctx.arc(col * step + (row % 2 ? step / 2 : 0), row * step, 7 * s, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // title band: the party title in pop lettering, then class, date and number
  const B = L.band;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  fit(ctx, CARD_TITLE, (px) => `${px}px ${POP}`, 92 * s, B.w - 80 * s);
  ctx.lineJoin = 'round';
  ctx.lineWidth = 16 * s;
  ctx.strokeStyle = set.accent;
  ctx.strokeText(CARD_TITLE, B.x + B.w / 2, B.y + 102 * s);
  ctx.fillStyle = '#ffffff';
  ctx.fillText(CARD_TITLE, B.x + B.w / 2, B.y + 102 * s);
  // white with the set's ink round it, like the title, so it reads on the palest frames
  const meta = `${CARD_BADGE}   ·   ${dateLabel(info.date)}   ·   ${cardNumberLabel(info.number)}`;
  ctx.font = `800 ${32 * s}px ${TEXT}`;
  ctx.lineWidth = 8 * s;
  ctx.strokeText(meta, B.x + B.w / 2, B.y + 158 * s);
  ctx.fillText(meta, B.x + B.w / 2, B.y + 158 * s);
  ctx.restore();
}

/** One continuous outline: a pill-shaped balloon whose tail grows out of its bottom edge. */
function bubblePath(ctx: CanvasRenderingContext2D, r: Rect, s: number) {
  const h = r.h * 0.8;
  const rad = h / 2;
  const bottom = r.y + h;
  const tailL = r.x + r.w * 0.2;
  const tailR = tailL + 46 * s;
  ctx.beginPath();
  ctx.moveTo(r.x + rad, r.y);
  ctx.lineTo(r.x + r.w - rad, r.y);
  ctx.arc(r.x + r.w - rad, r.y + rad, rad, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(tailR, bottom);
  // the tail sweeps down-left to its tip and comes straight back up; no point overshoots its neighbour
  ctx.quadraticCurveTo(tailL + 8 * s, bottom + 16 * s, tailL - 30 * s, r.y + r.h);
  ctx.lineTo(tailL - 6 * s, bottom);
  ctx.lineTo(r.x + rad, bottom);
  ctx.arc(r.x + rad, r.y + rad, rad, Math.PI / 2, (Math.PI * 3) / 2);
  ctx.closePath();
}

/** Over the photo: a white rim, the set's stickers and the speech bubble. */
export function drawPurikuraOver(ctx: CanvasRenderingContext2D, s: number, setId: string, info: { surprise?: Surprise }): void {
  const L = purikuraLayout(s);
  const set: StickerSet = stickerSet(setId);
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 12 * s;
  ctx.beginPath();
  ctx.roundRect(L.photo.x, L.photo.y, L.photo.w, L.photo.h, 46 * s);
  ctx.stroke();

  STICKER_SLOTS.forEach((slot, i) => {
    const st = stickerFor(set, i);
    const r = slotRect(slot, s);
    drawSticker(ctx, st.shape, st.color, r.x + r.w / 2, r.y + r.h / 2, r.w, slot.rot);
  });

  // speech bubble; before the shot it holds three little hearts, after it the surprise phrase
  const R = L.bubble;
  ctx.save();
  ctx.shadowColor = 'rgba(70, 0, 80, 0.3)';
  ctx.shadowBlur = 14 * s;
  ctx.shadowOffsetY = 5 * s;
  bubblePath(ctx, R, s);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.restore();
  bubblePath(ctx, R, s);
  ctx.lineWidth = 8 * s;
  ctx.strokeStyle = set.accent;
  ctx.lineJoin = 'round';
  ctx.stroke();

  const cx = R.x + R.w / 2;
  const cy = R.y + R.h * 0.4;
  const phrase = info.surprise?.text;
  if (phrase) {
    ctx.fillStyle = set.accent;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    fit(ctx, phrase, (px) => `${px}px ${POP}`, 64 * s, R.w - 60 * s);
    ctx.fillText(phrase, cx, cy + 4 * s);
  } else {
    for (const dx of [-70, 0, 70]) drawSticker(ctx, 'heart', '#ff4fa3', cx + dx * s, cy, 54 * s, 0);
  }
  ctx.restore();
}
