import { CARD_BADGE, CARD_TITLE } from './config';
import { coverCrop, type CardLayout, type Rect } from './geometry';
import { applyPixelEffect, pixelBlock, type EffectId } from './effects';
import type { CardType } from './cardTypes';
import { ELEMENT_PATHS, type ElementIcon } from './icons';
import { cardNumberLabel, dateLabel } from './powers';

export const NAVY = '#141a4d';
export const CREAM = '#fff7e0';
const DISPLAY = '"Lilita One", sans-serif';
const TEXT = '"Baloo 2", sans-serif';

export interface CardInfo {
  type: CardType;
  number: number;
  date: Date;
  /** undefined while the card is still a live preview: the power is a surprise */
  power?: string;
  strength?: number;
}

export async function loadCardFonts(): Promise<void> {
  await Promise.all([
    document.fonts.load(`76px ${DISPLAY}`),
    document.fonts.load(`800 30px ${TEXT}`),
    document.fonts.load(`600 30px ${TEXT}`),
  ]);
}

const paths = new Map<ElementIcon, Path2D>();
function glyph(name: ElementIcon): Path2D {
  let p = paths.get(name);
  if (!p) paths.set(name, (p = new Path2D(ELEMENT_PATHS[name])));
  return p;
}

function drawGlyph(ctx: CanvasRenderingContext2D, name: ElementIcon, cx: number, cy: number, size: number, rot = 0) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.scale(size / 24, size / 24);
  ctx.translate(-12, -12);
  ctx.fill(glyph(name));
  ctx.restore();
}

function rr(ctx: CanvasRenderingContext2D, r: Rect, radius: number) {
  ctx.beginPath();
  ctx.roundRect(r.x, r.y, r.w, r.h, radius);
}

function fitText(ctx: CanvasRenderingContext2D, text: string, font: (px: number) => string, px: number, maxW: number) {
  let size = px;
  ctx.font = font(size);
  while (ctx.measureText(text).width > maxW && size > 12) ctx.font = font(--size);
}

/** Everything on the card except the photo itself. */
export function drawChrome(ctx: CanvasRenderingContext2D, L: CardLayout, s: number, info: CardInfo): void {
  const { type } = info;
  ctx.save();

  // gold card stock with a holo band running round the border
  rr(ctx, L.card, 52 * s);
  const gold = ctx.createLinearGradient(0, 0, L.card.w, L.card.h);
  gold.addColorStop(0, '#ffe46b');
  gold.addColorStop(0.5, '#f5b800');
  gold.addColorStop(1, '#ffd84a');
  ctx.fillStyle = gold;
  ctx.fill();
  ctx.save();
  ctx.clip();
  // the foil itself: cyan, magenta and lemon bands across the stock
  const FOIL = ['#4ef0ff', '#ff4fd8', '#ffe14d'];
  ctx.globalAlpha = 0.9;
  for (let i = -4; i < 14; i++) {
    ctx.fillStyle = FOIL[((i % 3) + 3) % 3];
    ctx.beginPath();
    const x = i * 110 * s;
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 55 * s, 0);
    ctx.lineTo(x + 55 * s - L.card.h * 0.5, L.card.h);
    ctx.lineTo(x - L.card.h * 0.5, L.card.h);
    ctx.fill();
  }
  ctx.restore();

  // inner panel in the type's colour, scattered with its element
  rr(ctx, L.inner, 30 * s);
  const panel = ctx.createLinearGradient(0, L.inner.y, 0, L.inner.y + L.inner.h);
  panel.addColorStop(0, type.dark);
  panel.addColorStop(1, type.light);
  ctx.fillStyle = panel;
  ctx.fill();
  ctx.save();
  ctx.clip();
  ctx.fillStyle = type.glyph;
  ctx.globalAlpha = 0.2;
  const step = 118 * s;
  for (let row = 0; row * step < L.inner.h + step; row++) {
    for (let col = 0; col * step < L.inner.w + step; col++) {
      const x = L.inner.x + col * step + (row % 2 ? step / 2 : 0);
      const y = L.inner.y + row * step;
      drawGlyph(ctx, type.icon, x, y, 54 * s, ((row * 7 + col * 3) % 5 - 2) * 0.18);
    }
  }
  ctx.restore();

  // title row: party title, class and element badge
  const badgeR = 46 * s;
  const badgeX = L.title.x + L.title.w - badgeR;
  const midY = L.title.y + L.title.h / 2;
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.arc(badgeX, midY, badgeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = type.dark;
  drawGlyph(ctx, type.icon, badgeX, midY, 60 * s);

  ctx.fillStyle = type.ink;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'right';
  ctx.font = `${62 * s}px ${DISPLAY}`;
  const badgeText = CARD_BADGE;
  const badgeTextX = badgeX - badgeR - 18 * s;
  ctx.fillText(badgeText, badgeTextX, midY + 22 * s);
  const badgeTextW = ctx.measureText(badgeText).width;
  ctx.textAlign = 'left';
  fitText(ctx, CARD_TITLE, (px) => `${px}px ${DISPLAY}`, 78 * s, badgeTextX - badgeTextW - 30 * s - L.title.x);
  ctx.fillText(CARD_TITLE, L.title.x + 6 * s, midY + 27 * s);

  // cream mat round the photo
  rr(ctx, L.artFrame, 20 * s);
  ctx.fillStyle = CREAM;
  ctx.fill();
  rr(ctx, L.art, 10 * s);
  ctx.fillStyle = NAVY;
  ctx.fill();

  // ribbon: type, card number, date
  rr(ctx, L.ribbon, L.ribbon.h / 2);
  ctx.fillStyle = NAVY;
  ctx.fill();
  ctx.fillStyle = CREAM;
  ctx.font = `800 ${30 * s}px ${TEXT}`;
  ctx.textAlign = 'center';
  const ribbonText = `${type.label.toUpperCase()}-KORT   ·   ${cardNumberLabel(info.number)}   ·   ${dateLabel(info.date)}`;
  ctx.fillText(ribbonText, L.ribbon.x + L.ribbon.w / 2, L.ribbon.y + 41 * s);

  // stats plate
  const S = L.stats;
  rr(ctx, S, 26 * s);
  ctx.fillStyle = CREAM;
  ctx.fill();
  ctx.textAlign = 'left';
  ctx.fillStyle = type.id === 'lyn' ? '#a35f00' : type.dark;
  ctx.font = `800 ${30 * s}px ${TEXT}`;
  ctx.fillText('STYRKE', S.x + 40 * s, S.y + 246 * s);

  ctx.fillStyle = NAVY;
  const power = info.power ?? '? ? ?';
  fitText(ctx, power, (px) => `${px}px ${DISPLAY}`, 96 * s, S.w - 80 * s);
  ctx.fillText(power, S.x + 38 * s, S.y + 132 * s);

  const barX = S.x + 200 * s;
  const barW = S.w - 200 * s - 190 * s;
  const barY = S.y + 220 * s;
  const barH = 34 * s;
  ctx.beginPath();
  ctx.roundRect(barX, barY, barW, barH, barH / 2);
  ctx.fillStyle = 'rgba(20,26,77,0.12)';
  ctx.fill();
  if (info.strength !== undefined) {
    ctx.beginPath();
    ctx.roundRect(barX, barY, Math.max(barH, (barW * info.strength) / 999), barH, barH / 2);
    ctx.fillStyle = type.dark;
    ctx.fill();
  }
  ctx.fillStyle = NAVY;
  ctx.textAlign = 'right';
  ctx.font = `${62 * s}px ${DISPLAY}`;
  ctx.fillText(info.strength !== undefined ? String(info.strength) : '???', S.x + S.w - 40 * s, S.y + 258 * s);

  // footer
  ctx.textAlign = 'left';
  // the panel's light tone sits at the bottom, so navy reads on every type
  ctx.fillStyle = NAVY;
  ctx.font = `800 ${26 * s}px ${TEXT}`;
  ctx.fillText('FOTOBOKSEN', L.footer.x + 6 * s, L.footer.y + 38 * s);
  for (let i = 0; i < 3; i++) drawGlyph(ctx, 'star', L.footer.x + L.footer.w - 18 * s - i * 40 * s, L.footer.y + 28 * s, 34 * s);

  ctx.restore();
}

/**
 * Draws one camera frame into the card's photo window, mirrored like a mirror so kids see
 * themselves the way they expect, with the chosen effect.
 */
export class ArtPainter {
  private scratch = document.createElement('canvas');
  private small = document.createElement('canvas');
  private sctx = this.scratch.getContext('2d', { willReadFrequently: true })!;
  private smallCtx = this.small.getContext('2d')!;

  paint(
    ctx: CanvasRenderingContext2D,
    src: CanvasImageSource,
    srcW: number,
    srcH: number,
    art: Rect,
    radius: number,
    effect: EffectId,
    t: number,
  ) {
    const w = Math.round(art.w);
    const h = Math.round(art.h);
    if (this.scratch.width !== w || this.scratch.height !== h) {
      this.scratch.width = w;
      this.scratch.height = h;
    }
    const c = this.sctx;
    const crop = coverCrop(srcW, srcH, w, h);
    c.save();
    c.imageSmoothingEnabled = true;

    if (effect === 'pixel') {
      const block = pixelBlock(w);
      const sw = Math.ceil(w / block);
      const sh = Math.ceil(h / block);
      this.small.width = sw;
      this.small.height = sh;
      this.smallCtx.save();
      this.smallCtx.translate(sw, 0);
      this.smallCtx.scale(-1, 1);
      this.smallCtx.drawImage(src, crop.x, crop.y, crop.w, crop.h, 0, 0, sw, sh);
      this.smallCtx.restore();
      c.imageSmoothingEnabled = false;
      c.drawImage(this.small, 0, 0, sw, sh, 0, 0, sw * block, sh * block);
    } else if (effect === 'spejl') {
      // the mirrored picture, then its left half folded over onto the right
      c.translate(w, 0);
      c.scale(-1, 1);
      c.drawImage(src, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h);
      c.drawImage(this.scratch, 0, 0, w / 2, h, 0, 0, w / 2, h);
    } else {
      c.translate(w, 0);
      c.scale(-1, 1);
      c.drawImage(src, crop.x, crop.y, crop.w, crop.h, 0, 0, w, h);
    }
    c.restore();

    if (effect === 'holo' || effect === 'tegneserie' || effect === 'pop') {
      const img = c.getImageData(0, 0, w, h);
      applyPixelEffect(effect, img, t);
      c.putImageData(img, 0, 0);
    }

    ctx.save();
    rr(ctx, art, radius);
    ctx.clip();
    ctx.drawImage(this.scratch, art.x, art.y, art.w, art.h);
    ctx.restore();
  }
}
