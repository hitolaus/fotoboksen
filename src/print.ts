/** Print layout on A4, in millimetres. Pure maths, so it can be tested without a printer. */

export const A4 = { w: 210, h: 297 };
/**
 * The page itself has no margin (@page margin 0), which leaves the browser little room for its
 * header and footer. iPad Safari still prints a footer line, so our sheet stops FOOTER mm short of
 * the bottom of the paper and leaves that strip to Safari.
 */
export const FOOTER = 18;
/** our own white border, as padding inside the sheet */
export const PAD = { x: 6, y: 6 };
/** our sheet on the paper */
export const PAGE = { w: A4.w, h: A4.h - FOOTER };
/** the area pictures may use on one sheet */
export const SHEET = { w: PAGE.w - 2 * PAD.x, h: PAGE.h - 2 * PAD.y };
export const GAP = 4;

export type PrintSizeId = 'lille' | 'mellem' | 'stor';

export interface PrintSize {
  id: PrintSizeId;
  label: string;
  hint: string;
  /** each picture is fitted inside this box, keeping its own shape */
  box: { w: number; h: number };
}

export const PRINT_SIZES: PrintSize[] = [
  { id: 'lille', label: 'Lille', hint: 'Som et samlekort, 9 på et ark', box: { w: 61, h: 85 } },
  { id: 'mellem', label: 'Mellem', hint: 'Som et foto, 4 på et ark', box: { w: 93, h: 130 } },
  { id: 'stor', label: 'Stor', hint: 'Hele arket', box: { w: SHEET.w, h: SHEET.h } },
];

export const printSize = (id: PrintSizeId): PrintSize => PRINT_SIZES.find((s) => s.id === id) ?? PRINT_SIZES[0];

/** The largest size with the picture's shape (width / height) that fits the box. */
export function fitInBox(ratio: number, box: { w: number; h: number }): { w: number; h: number } {
  return ratio > box.w / box.h ? { w: box.w, h: box.w / ratio } : { w: box.h * ratio, h: box.h };
}

/** How many boxes fit on one sheet, with the gap between them. */
export function gridFor(size: PrintSize): { cols: number; rows: number; perSheet: number } {
  const cols = Math.max(1, Math.floor((SHEET.w + GAP) / (size.box.w + GAP)));
  const rows = Math.max(1, Math.floor((SHEET.h + GAP) / (size.box.h + GAP)));
  return { cols, rows, perSheet: cols * rows };
}

/** Splits pictures into sheets: each sheet lists the indexes of the pictures printed on it. */
export function sheetsFor(count: number, size: PrintSize): number[][] {
  const { perSheet } = gridFor(size);
  const sheets: number[][] = [];
  for (let i = 0; i < count; i += perSheet) sheets.push(Array.from({ length: Math.min(perSheet, count - i) }, (_, k) => i + k));
  return sheets;
}

/** "3 billeder · 1 ark" */
export function printSummary(count: number, size: PrintSize): string {
  const sheets = sheetsFor(count, size).length;
  return `${count} ${count === 1 ? 'billede' : 'billeder'} · ${sheets} ark`;
}
