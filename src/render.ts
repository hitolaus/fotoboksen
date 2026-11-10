import { ArtPainter, drawChrome, loadCardFonts } from './card';
import { cardType } from './cardTypes';
import { drawCoverOverlay, loadCoverFonts } from './cover';
import type { EffectId } from './effects';
import { cardLayout, coverLayout, type Rect } from './geometry';
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
};

export async function loadFonts(): Promise<void> {
  await Promise.all([loadCardFonts(), loadCoverFonts()]);
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
  new ArtPainter().paint(ctx, src, srcW, srcH, p.art(1), p.artRadius(1), effect, t);
  p.over?.(ctx, 1, frameId, info);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Kunne ikke gemme billedet'))), 'image/jpeg', 0.92),
  );
}
