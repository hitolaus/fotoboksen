import { ArtPainter, drawChrome, loadCardFonts } from './card';
import { cardType } from './cardTypes';
import { drawCoverOverlay, drawSampleScene, loadCoverFonts } from './cover';
import { drawPurikuraOver, drawPurikuraUnder, loadPurikuraFonts } from './purikura';
import { drawBlokOver, drawBlokUnder, loadBlokFonts } from './blokrender';
import { drawStumOver, drawStumUnder, loadStumFonts } from './stumrender';
import { film, type EffectId, type Pixels } from './effects';
import { blokLayout, cardLayout, coverLayout, purikuraLayout, stumLayout, type Rect } from './geometry';
import { THEMES, type Surprise, type ThemeId } from './themes';

export interface RenderInfo {
  number: number;
  date: Date;
  /** undefined in the live preview: the surprise is only revealed after the shot */
  surprise?: Surprise;
}

/** How a theme draws itself around (and over) the photo. */
interface Painter {
  art(scale: number): Rect;
  artRadius(scale: number): number;
  under?(ctx: CanvasRenderingContext2D, scale: number, frameId: string, info: RenderInfo): void;
  over?(ctx: CanvasRenderingContext2D, scale: number, frameId: string, info: RenderInfo): void;
  /** a finish applied to the photo after any effect */
  post?: (img: Pixels, t: number) => void;
}

export const PAINTERS: Record<ThemeId, Painter> = {
  kort: {
    art: (s) => cardLayout(s).art,
    artRadius: (s) => 10 * s,
    under: (ctx, s, frameId, info) =>
      drawChrome(ctx, cardLayout(s), s, {
        type: cardType(frameId as never),
        number: info.number,
        date: info.date,
        power: info.surprise?.text,
        strength: info.surprise?.strength,
      }),
  },
  forside: {
    art: (s) => coverLayout(s).cover,
    artRadius: () => 0,
    over: (ctx, s, frameId, info) => drawCoverOverlay(ctx, s, frameId, info),
  },
  kawaii: {
    art: (s) => purikuraLayout(s).photo,
    artRadius: (s) => 46 * s,
    under: (ctx, s, frameId, info) => drawPurikuraUnder(ctx, s, frameId, info),
    over: (ctx, s, frameId, info) => drawPurikuraOver(ctx, s, frameId, info),
  },
  blokland: {
    art: (s) => blokLayout(s).photo,
    artRadius: () => 0,
    under: (ctx, s, frameId, info) => drawBlokUnder(ctx, s, frameId, info),
    over: (ctx, s, frameId, info) => drawBlokOver(ctx, s, frameId, info),
  },
  stumfilm: {
    art: (s) => stumLayout(s).photo,
    artRadius: () => 0,
    under: (ctx, s, frameId, info) => drawStumUnder(ctx, s, frameId, info),
    over: (ctx, s) => drawStumOver(ctx, s),
    // every picture in this theme is black-and-white film stock
    post: film,
  },
};

/** Sample surprises for the start screen tiles, so each tile looks like a finished picture. */
const TILE_SURPRISE: Partial<Record<ThemeId, Surprise>> = {
  forside: { text: 'Ugens største smil', burst: 'NYHED!', teaser: '+ Vind en ballon' },
};

/** A start-screen tile: the theme's real drawing over a drawn party scene standing in for the camera. */
export function drawThemeTile(canvas: HTMLCanvasElement, theme: ThemeId, scale: number): void {
  const { width, height, frames } = THEMES[theme];
  const p = PAINTERS[theme];
  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  const ctx = canvas.getContext('2d')!;
  const info: RenderInfo = { number: 1, date: new Date(), surprise: TILE_SURPRISE[theme] };
  p.under?.(ctx, scale, frames[0].id, info);
  const art = p.art(scale);
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(art.x, art.y, art.w, art.h, p.artRadius(scale));
  ctx.clip();
  ctx.translate(art.x, art.y);
  drawSampleScene(ctx, art.w, art.h);
  ctx.restore();
  p.over?.(ctx, scale, frames[0].id, info);
}

export async function loadFonts(): Promise<void> {
  await Promise.all([loadCardFonts(), loadCoverFonts(), loadPurikuraFonts(), loadBlokFonts(), loadStumFonts()]);
}

/** Renders the finished picture at full size and returns it as a JPEG. */
export async function renderFinal(
  theme: ThemeId,
  frameId: string,
  src: CanvasImageSource,
  srcW: number,
  srcH: number,
  effect: EffectId,
  t: number,
  info: RenderInfo,
): Promise<Blob> {
  const { width, height } = THEMES[theme];
  const p = PAINTERS[theme];
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  // JPEG has no transparency: anything outside a rounded card prints as white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  p.under?.(ctx, 1, frameId, info);
  new ArtPainter().paint(ctx, src, srcW, srcH, p.art(1), p.artRadius(1), effect, t, p.post);
  p.over?.(ctx, 1, frameId, info);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Kunne ikke gemme billedet'))), 'image/jpeg', 0.92),
  );
}
