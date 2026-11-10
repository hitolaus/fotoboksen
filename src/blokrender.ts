import { CARD_BADGE, CARD_TITLE } from './config';
import { BLOCK, blokLayout, ITEM_SLOTS, slotRect } from './geometry';
import { blockNoise, itemFor, spritePixels, spriteSize, world, type Item } from './blokland';
import { cardNumberLabel, dateLabel } from './powers';
import type { Surprise } from './themes';

const PIXEL = '"Pixelify Sans", monospace';
const INK = '#1b1b22';
const STONE: [string, string, string] = ['#3c3c48', '#4a4a58', '#2c2c36'];
/** each block is 10 x 10 pixels */
const GRAIN = 10;

export async function loadBlokFonts(): Promise<void> {
  await document.fonts.load(`700 80px ${PIXEL}`);
}

function drawBlock(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, col: number, row: number, tones: [string, string, string]) {
  const p = size / GRAIN;
  ctx.fillStyle = tones[0];
  ctx.fillRect(x, y, size, size);
  for (let py = 0; py < GRAIN; py++) {
    for (let px = 0; px < GRAIN; px++) {
      const n = blockNoise(col, row, px, py);
      if (n < 0.2) ctx.fillStyle = tones[2];
      else if (n > 0.8) ctx.fillStyle = tones[1];
      else continue;
      ctx.fillRect(x + px * p, y + py * p, Math.ceil(p), Math.ceil(p));
    }
  }
  // a darker seam on the right and bottom edge so the blocks read as separate cubes
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.fillRect(x + size - p, y, p, size);
  ctx.fillRect(x, y + size - p, size, p);
}

/** Text with the pixel world's hard drop shadow (one pixel step down and right). */
function pixelText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string, step: number) {
  ctx.fillStyle = INK;
  ctx.fillText(text, x + step, y + step);
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function fit(ctx: CanvasRenderingContext2D, text: string, px: number, maxW: number) {
  ctx.font = `700 ${px}px ${PIXEL}`;
  const w = ctx.measureText(text).width;
  if (w > maxW) ctx.font = `700 ${Math.floor((px * maxW) / w)}px ${PIXEL}`;
}

/** The world's blocks round the photo, and a stone band carrying the party title. */
export function drawBlokUnder(ctx: CanvasRenderingContext2D, s: number, worldId: string, info: { number: number; date: Date }): void {
  const L = blokLayout(s);
  const w = world(worldId);
  const size = BLOCK * s;
  const cols = Math.ceil(L.page.w / size);
  const rows = Math.ceil(L.page.h / size);
  const bandRow = Math.round(L.band.y / size);
  ctx.save();
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const inPhoto = row >= 1 && row < bandRow && col >= 1 && col < cols - 1;
      if (inPhoto) continue;
      drawBlock(ctx, col * size, row * size, size, col, row, row >= bandRow ? STONE : w.block);
    }
  }

  const B = L.band;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  fit(ctx, CARD_TITLE, 104 * s, B.w - 120 * s);
  pixelText(ctx, CARD_TITLE, B.x + B.w / 2, B.y + 140 * s, '#ffffff', 7 * s);
  ctx.font = `700 ${36 * s}px ${PIXEL}`;
  pixelText(ctx, `${CARD_BADGE}  ·  ${dateLabel(info.date)}  ·  ${cardNumberLabel(info.number)}`, B.x + B.w / 2, B.y + 214 * s, '#ffd23f', 4 * s);
  ctx.restore();
}

function drawItem(ctx: CanvasRenderingContext2D, item: Item, cx: number, cy: number, size: number) {
  const { w, h } = spriteSize(item.sprite);
  const p = Math.max(1, Math.floor(size / Math.max(w, h)));
  const x0 = Math.round(cx - (w * p) / 2);
  const y0 = Math.round(cy - (h * p) / 2);
  for (const [x, y, c] of spritePixels(item)) {
    ctx.fillStyle = c;
    ctx.fillRect(x0 + x * p, y0 + y * p, p, p);
  }
}

/** Over the photo: a dark rim, the world's pixel items and the banner. */
export function drawBlokOver(ctx: CanvasRenderingContext2D, s: number, worldId: string, info: { surprise?: Surprise }): void {
  const L = blokLayout(s);
  const w = world(worldId);
  ctx.save();
  ctx.strokeStyle = INK;
  ctx.lineWidth = 8 * s;
  ctx.strokeRect(L.photo.x, L.photo.y, L.photo.w, L.photo.h);

  ITEM_SLOTS.forEach((slot, i) => {
    const r = slotRect(slot, s);
    drawItem(ctx, itemFor(w, i), r.x + r.w / 2, r.y + r.h / 2, r.w);
  });

  // banner: a dark plate with a gold edge; "LEVEL UP!" and the new title after the shot
  const R = L.banner;
  const title = info.surprise?.text;
  const plateH = title ? R.h : R.h * 0.5;
  const plateY = title ? R.y : R.y + R.h * 0.18;
  ctx.fillStyle = INK;
  ctx.fillRect(R.x, plateY, R.w, plateH);
  ctx.strokeStyle = '#ffd23f';
  ctx.lineWidth = 6 * s;
  ctx.strokeRect(R.x + 3 * s, plateY + 3 * s, R.w - 6 * s, plateH - 6 * s);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  const cx = R.x + R.w / 2;
  if (title) {
    fit(ctx, 'LEVEL UP!', 104 * s, R.w - 60 * s);
    pixelText(ctx, 'LEVEL UP!', cx, R.y + 112 * s, '#ffd23f', 7 * s);
    fit(ctx, title, 58 * s, R.w - 60 * s);
    pixelText(ctx, title, cx, R.y + 180 * s, '#ffffff', 4 * s);
  } else {
    fit(ctx, 'KLAR, PARAT, START!', 54 * s, R.w - 60 * s);
    pixelText(ctx, 'KLAR, PARAT, START!', cx, plateY + plateH / 2 + 20 * s, '#ffffff', 4 * s);
  }
  ctx.restore();
}
