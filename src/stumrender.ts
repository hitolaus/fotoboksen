import { CARD_BADGE, CARD_TITLE } from './config';
import { stumLayout, type Rect } from './geometry';
import { cardNumberLabel, dateLabel } from './powers';
import type { FrameStyleId } from './stumfilm';
import type { Surprise } from './themes';

const DECO = '"Limelight", serif';
const SANS = '"Josefin Sans", sans-serif';
const BLACK = '#0c0c0c';
const SILVER = '#c9c9c9';
const WHITE = '#f4f4f0';

export async function loadStumFonts(): Promise<void> {
  await Promise.all([document.fonts.load(`80px ${DECO}`), document.fonts.load(`600 30px ${SANS}`)]);
}

function line(ctx: CanvasRenderingContext2D, r: Rect, width: number) {
  ctx.lineWidth = width;
  ctx.strokeRect(r.x, r.y, r.w, r.h);
}

/** A stepped Art Deco corner: three nested right angles. */
function stepCorner(ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, s: number) {
  ctx.beginPath();
  for (let k = 0; k < 3; k++) {
    const o = (14 + k * 12) * s;
    ctx.moveTo(x + dx * o, y + dy * (6 * s));
    ctx.lineTo(x + dx * o, y + dy * o);
    ctx.lineTo(x + dx * (6 * s), y + dy * o);
  }
  ctx.stroke();
}

/** A closed Art Deco fan in a corner: six segments, every other one filled silver, inside an outer arc. */
function fan(ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, r: number) {
  const point = (a: number, rad: number): [number, number] => [x + dx * Math.cos(a) * rad, y + dy * Math.sin(a) * rad];
  const n = 6;
  for (let k = 0; k < n; k++) {
    const a0 = (k / n) * (Math.PI / 2);
    const a1 = ((k + 1) / n) * (Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let t = 0; t <= 8; t++) ctx.lineTo(...point(a0 + ((a1 - a0) * t) / 8, r));
    ctx.closePath();
    if (k % 2 === 0) ctx.fill();
    ctx.stroke();
  }
  // a black hub so the segments read as a fan, not a wedge
  ctx.save();
  ctx.fillStyle = BLACK;
  ctx.beginPath();
  ctx.moveTo(x, y);
  for (let t = 0; t <= 12; t++) ctx.lineTo(...point(((Math.PI / 2) * t) / 12, r * 0.32));
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function fitLines(ctx: CanvasRenderingContext2D, text: string, box: Rect, maxPx: number) {
  for (let px = maxPx; px > 24; px -= 4) {
    ctx.font = `${px}px ${DECO}`;
    const lines: string[] = [];
    let cur = '';
    for (const word of text.split(' ')) {
      const next = cur ? `${cur} ${word}` : word;
      if (ctx.measureText(next).width <= box.w) cur = next;
      else {
        if (cur) lines.push(cur);
        cur = word;
      }
    }
    if (cur) lines.push(cur);
    if (lines.length <= 3 && lines.length * px * 1.2 <= box.h && lines.every((l) => ctx.measureText(l).width <= box.w)) {
      return { lines, px };
    }
  }
  return { lines: [text], px: 24 };
}

/** Black page, the silver frame with the chosen ornament, and the caption card. */
export function drawStumUnder(
  ctx: CanvasRenderingContext2D,
  s: number,
  style: string,
  info: { number: number; date: Date; surprise?: Surprise },
): void {
  const L = stumLayout(s);
  const id = style as FrameStyleId;
  ctx.save();
  ctx.fillStyle = BLACK;
  ctx.fillRect(0, 0, L.page.w, L.page.h);
  ctx.strokeStyle = SILVER;
  line(ctx, { x: 26 * s, y: 26 * s, w: L.page.w - 52 * s, h: L.page.h - 52 * s }, 4 * s);
  line(ctx, { x: 40 * s, y: 40 * s, w: L.page.w - 80 * s, h: L.page.h - 80 * s }, 1.5 * s);

  const W = L.page.w;
  const H = L.page.h;
  ctx.lineWidth = 2 * s;
  if (id === 'vifte') {
    const r = 120 * s;
    ctx.fillStyle = 'rgba(201, 201, 201, 0.55)';
    fan(ctx, 40 * s, 40 * s, 1, 1, r);
    fan(ctx, W - 40 * s, 40 * s, -1, 1, r);
    fan(ctx, 40 * s, H - 40 * s, 1, -1, r);
    fan(ctx, W - 40 * s, H - 40 * s, -1, -1, r);
  } else if (id === 'straaler') {
    // a sunburst from the middle of the page; the still and the caption card cover its centre,
    // so its rays show in the black border all the way round
    const cx = W / 2;
    const cy = L.caption.y;
    ctx.save();
    ctx.beginPath();
    ctx.rect(40 * s, 40 * s, W - 80 * s, H - 80 * s);
    ctx.clip();
    ctx.lineWidth = 3 * s;
    for (let k = 0; k < 36; k++) {
      const a = (k / 36) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * 1600 * s, cy + Math.sin(a) * 1600 * s);
      ctx.stroke();
    }
    ctx.restore();
  } else if (id === 'perler') {
    ctx.fillStyle = SILVER;
    const step = 30 * s;
    for (let x = 40 * s; x <= W - 40 * s; x += step) {
      for (const y of [40 * s, H - 40 * s]) {
        ctx.beginPath();
        ctx.arc(x, y, 4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    for (let y = 40 * s + step; y < H - 40 * s; y += step) {
      for (const x of [40 * s, W - 40 * s]) {
        ctx.beginPath();
        ctx.arc(x, y, 4 * s, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  } else {
    stepCorner(ctx, 40 * s, 40 * s, 1, 1, s);
    stepCorner(ctx, W - 40 * s, 40 * s, -1, 1, s);
    stepCorner(ctx, 40 * s, H - 40 * s, 1, -1, s);
    stepCorner(ctx, W - 40 * s, H - 40 * s, -1, -1, s);
  }

  // caption card: a silent film's title card, white lettering in a double silver frame
  const C = L.caption;
  ctx.fillStyle = BLACK;
  ctx.fillRect(C.x, C.y, C.w, C.h);
  ctx.strokeStyle = SILVER;
  line(ctx, C, 3 * s);
  line(ctx, { x: C.x + 12 * s, y: C.y + 12 * s, w: C.w - 24 * s, h: C.h - 24 * s }, 1.2 * s);
  stepCorner(ctx, C.x + 12 * s, C.y + 12 * s, 1, 1, s * 0.7);
  stepCorner(ctx, C.x + C.w - 12 * s, C.y + 12 * s, -1, 1, s * 0.7);

  const text = info.surprise?.text ?? 'Lys, kamera … optagelse!';
  const box = { x: C.x + 70 * s, y: C.y + 50 * s, w: C.w - 140 * s, h: C.h - 170 * s };
  const { lines, px } = fitLines(ctx, text, box, 88 * s);
  ctx.fillStyle = info.surprise ? WHITE : 'rgba(244, 244, 240, 0.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lh = px * 1.2;
  const top = box.y + box.h / 2 - ((lines.length - 1) * lh) / 2;
  lines.forEach((l, i) => ctx.fillText(l, C.x + C.w / 2, top + i * lh));

  // ornament rule and the party line under the caption
  const ry = C.y + C.h - 96 * s;
  ctx.strokeStyle = SILVER;
  ctx.lineWidth = 1.5 * s;
  ctx.beginPath();
  ctx.moveTo(C.x + C.w / 2 - 160 * s, ry);
  ctx.lineTo(C.x + C.w / 2 - 20 * s, ry);
  ctx.moveTo(C.x + C.w / 2 + 20 * s, ry);
  ctx.lineTo(C.x + C.w / 2 + 160 * s, ry);
  ctx.stroke();
  ctx.fillStyle = SILVER;
  ctx.beginPath();
  ctx.moveTo(C.x + C.w / 2, ry - 9 * s);
  ctx.lineTo(C.x + C.w / 2 + 9 * s, ry);
  ctx.lineTo(C.x + C.w / 2, ry + 9 * s);
  ctx.lineTo(C.x + C.w / 2 - 9 * s, ry);
  ctx.fill();
  ctx.font = `600 ${30 * s}px ${SANS}`;
  ctx.fillText(
    `${CARD_TITLE.toUpperCase()}  ·  ${CARD_BADGE}  ·  ${dateLabel(info.date)}  ·  ${cardNumberLabel(info.number).toUpperCase()}`,
    C.x + C.w / 2,
    C.y + C.h - 48 * s,
  );
  ctx.restore();
}

/** A thin silver rule round the still. */
export function drawStumOver(ctx: CanvasRenderingContext2D, s: number): void {
  const L = stumLayout(s);
  ctx.save();
  ctx.strokeStyle = SILVER;
  line(ctx, L.photo, 3 * s);
  ctx.restore();
}
