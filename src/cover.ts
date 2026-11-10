import { CARD_BADGE } from './config';
import { coverLayout, type Rect } from './geometry';
import { magazine } from './magazine';
import { cardNumberLabel } from './powers';
import type { Surprise } from './themes';

const MAST = '"Anton", sans-serif';
const INK = '#111111';
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAJ', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'];

export async function loadCoverFonts(): Promise<void> {
  await document.fonts.load(`100px ${MAST}`);
}

/** Largest size at which `text` fits `maxW`, capped at `px`. */
function fit(ctx: CanvasRenderingContext2D, text: string, px: number, maxW: number): number {
  ctx.font = `${px}px ${MAST}`;
  const w = ctx.measureText(text).width;
  return w > maxW ? Math.floor((px * maxW) / w) : px;
}

/** Greedy word wrap into at most `maxLines` lines at the largest size that fits the box. */
function wrap(ctx: CanvasRenderingContext2D, text: string, box: Rect, maxPx: number, maxLines: number) {
  for (let px = maxPx; px > 20; px -= 4) {
    ctx.font = `${px}px ${MAST}`;
    const lines: string[] = [];
    let line = '';
    for (const word of text.split(' ')) {
      const next = line ? `${line} ${word}` : word;
      if (ctx.measureText(next).width <= box.w) line = next;
      else {
        if (line) lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    const lineH = px * 1.02;
    if (lines.length <= maxLines && lines.length * lineH <= box.h && lines.every((l) => ctx.measureText(l).width <= box.w)) {
      return { lines, px, lineH };
    }
  }
  return { lines: [text], px: 20, lineH: 21 };
}

function starburst(ctx: CanvasRenderingContext2D, r: Rect, points: number) {
  const cx = r.x + r.w / 2;
  const cy = r.y + r.h / 2;
  const outer = r.w / 2;
  const inner = outer * 0.8;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const rad = i % 2 ? inner : outer;
    const a = (Math.PI * i) / points - Math.PI / 2;
    ctx.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
  }
  ctx.closePath();
}

/** Masthead, issue strip and cover lines, drawn over the full-bleed photo. */
export function drawCoverOverlay(
  ctx: CanvasRenderingContext2D,
  s: number,
  magazineId: string,
  info: { number: number; date: Date; surprise?: Surprise },
): void {
  const L = coverLayout(s);
  const m = magazine(magazineId);
  ctx.save();
  ctx.textBaseline = 'alphabetic';

  // masthead band, the name as big as the band allows
  ctx.fillStyle = m.band;
  ctx.fillRect(L.masthead.x, L.masthead.y, L.masthead.w, L.masthead.h);
  ctx.fillStyle = m.bandInk;
  ctx.textAlign = 'left';
  // set from the left edge, leaving the top-right corner to the starburst
  const mastW = L.burst.x - L.masthead.x - 60 * s;
  const mastPx = fit(ctx, m.masthead, 214 * s, mastW);
  ctx.font = `${mastPx}px ${MAST}`;
  ctx.fillText(m.masthead, L.masthead.x + 36 * s, L.masthead.y + L.masthead.h / 2 + mastPx * 0.4);

  // issue strip
  ctx.fillStyle = INK;
  ctx.fillRect(L.issue.x, L.issue.y, L.issue.w, L.issue.h);
  ctx.fillStyle = '#ffffff';
  ctx.font = `${30 * s}px ${MAST}`;
  ctx.textAlign = 'left';
  const d = info.date;
  ctx.fillText(
    `${CARD_BADGE}  ·  ${cardNumberLabel(info.number).toUpperCase()}  ·  ${d.getDate()}. ${MONTHS[d.getMonth()]} ${d.getFullYear()}`,
    L.issue.x + 40 * s,
    L.issue.y + 37 * s,
  );

  const story = info.surprise;
  const outline = (text: string, x: number, y: number, stroke: number) => {
    ctx.lineJoin = 'round';
    ctx.lineWidth = stroke;
    ctx.strokeStyle = INK;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  };

  // teaser, top left
  ctx.textAlign = 'left';
  ctx.fillStyle = '#ffffff';
  const teaser = story?.teaser ?? '+ Mere inden i';
  ctx.font = `${fit(ctx, teaser, 50 * s, L.teaser.w)}px ${MAST}`;
  outline(teaser, L.teaser.x, L.teaser.y + 54 * s, 9 * s);

  // starburst price sticker, top right
  starburst(ctx, L.burst, 14);
  ctx.fillStyle = '#ffe600';
  ctx.fill();
  ctx.lineWidth = 6 * s;
  ctx.strokeStyle = INK;
  ctx.stroke();
  ctx.save();
  ctx.translate(L.burst.x + L.burst.w / 2, L.burst.y + L.burst.h / 2);
  ctx.rotate(0.2);
  ctx.fillStyle = INK;
  ctx.textAlign = 'center';
  const burstText = story?.burst ?? 'NYT NR.!';
  const [a, b] = burstText.includes(' ') ? [burstText.slice(0, burstText.lastIndexOf(' ')), burstText.slice(burstText.lastIndexOf(' ') + 1)] : [burstText, ''];
  const burstPx = Math.min(fit(ctx, a, 52 * s, L.burst.w * 0.68), b ? fit(ctx, b, 52 * s, L.burst.w * 0.68) : 99 * s);
  ctx.font = `${burstPx}px ${MAST}`;
  if (b) {
    ctx.fillText(a, 0, -burstPx * 0.08);
    ctx.fillText(b, 0, burstPx * 0.92);
  } else ctx.fillText(a, 0, burstPx * 0.38);
  ctx.restore();

  // headline, bottom left; a placeholder until the shot is taken
  const headline = story?.text ?? 'Din historie kommer her!';
  const { lines, px, lineH } = wrap(ctx, headline, L.headline, 112 * s, 3);
  ctx.font = `${px}px ${MAST}`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  const top = L.headline.y + L.headline.h - lines.length * lineH;
  lines.forEach((l, i) => outline(l, L.headline.x, top + (i + 1) * lineH - px * 0.12, 12 * s));

  // barcode box, bottom right
  const B = L.barcode;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(B.x, B.y, B.w, B.h);
  ctx.fillStyle = INK;
  const bars = [3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 2, 1, 3, 1, 2];
  let x = B.x + 14 * s;
  bars.forEach((w, i) => {
    if (i % 2 === 0) ctx.fillRect(x, B.y + 14 * s, w * 2.6 * s, B.h - 58 * s);
    x += w * 2.6 * s + 2 * s;
  });
  ctx.font = `${30 * s}px ${MAST}`;
  ctx.textAlign = 'center';
  ctx.fillText('9 KR', B.x + B.w / 2, B.y + B.h - 14 * s);

  ctx.restore();
}

/** A drawn party scene that stands in for the camera on the start screen's cover tile. */
export function drawSampleScene(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, '#8fd3f7');
  sky.addColorStop(1, '#f3e3cf');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);
  const balloon = (x: number, y: number, c: string) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.ellipse(x, y, w * 0.05, w * 0.062, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  balloon(w * 0.12, h * 0.33, '#ff6fa8');
  balloon(w * 0.5, h * 0.3, '#ffd23f');
  balloon(w * 0.86, h * 0.35, '#7a2cff');
  const kid = (x: number, skin: string, shirt: string, hair: string) => {
    const r = w * 0.17;
    const cy = h * 0.55;
    ctx.fillStyle = shirt;
    ctx.beginPath();
    ctx.ellipse(x, h * 0.98, r * 1.45, r * 1.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.arc(x, cy, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.arc(x, cy - r * 0.25, r * 1.04, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#1b1b1b';
    for (const dx of [-0.35, 0.35]) {
      ctx.beginPath();
      ctx.arc(x + dx * r, cy + r * 0.08, r * 0.1, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = '#b8323a';
    ctx.lineWidth = r * 0.09;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(x, cy + r * 0.3, r * 0.38, 0.25, Math.PI - 0.25);
    ctx.stroke();
  };
  kid(w * 0.27, '#f1c6a6', '#2e7bd6', '#5a3a22');
  kid(w * 0.73, '#c98c63', '#e8473a', '#1c1c1c');
}
