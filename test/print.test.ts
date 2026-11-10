import { describe, expect, it } from 'vitest';
import { fitInBox, gridFor, GAP, printSize, printSummary, PRINT_SIZES, SHEET, sheetsFor } from '../src/print';

const CARD = 5 / 7; // Samlekort
const PRINT = 3 / 4; // Kawaii and Blokland

describe('print sizes', () => {
  it('never makes a picture bigger than the printable part of one A4 sheet (the reported overflow)', () => {
    for (const size of PRINT_SIZES) {
      for (const ratio of [CARD, PRINT]) {
        const r = fitInBox(ratio, size.box);
        expect(r.w).toBeLessThanOrEqual(SHEET.w + 1e-9);
        expect(r.h).toBeLessThanOrEqual(SHEET.h + 1e-9);
      }
    }
  });

  it('keeps each picture its own shape', () => {
    for (const size of PRINT_SIZES) {
      for (const ratio of [CARD, PRINT]) {
        const r = fitInBox(ratio, size.box);
        expect(r.w / r.h).toBeCloseTo(ratio, 6);
      }
    }
  });

  it('prints a Samlekort close to real trading-card size (63 x 88 mm) when small', () => {
    const r = fitInBox(CARD, printSize('lille').box);
    expect(Math.abs(r.w - 63)).toBeLessThanOrEqual(3);
    expect(Math.abs(r.h - 88)).toBeLessThanOrEqual(3);
  });

  it('leaves a strip at the bottom of the paper for the footer the iPad still prints', async () => {
    const { A4, FOOTER, PAGE } = await import('../src/print');
    expect(FOOTER).toBeGreaterThanOrEqual(15);
    expect(PAGE.h + FOOTER).toBeLessThanOrEqual(A4.h);
  });

  it('fills the sheet when large, touching its width or its height', () => {
    for (const ratio of [CARD, PRINT]) {
      const r = fitInBox(ratio, printSize('stor').box);
      expect(Math.max(r.w / SHEET.w, r.h / SHEET.h)).toBeCloseTo(1, 6);
    }
  });
});

describe('grid on A4', () => {
  it('fits 9 small, 4 medium and 1 large per sheet', () => {
    expect(gridFor(printSize('lille'))).toEqual({ cols: 3, rows: 3, perSheet: 9 });
    expect(gridFor(printSize('mellem'))).toEqual({ cols: 2, rows: 2, perSheet: 4 });
    expect(gridFor(printSize('stor')).perSheet).toBe(1);
  });

  it('the grid of boxes plus gaps always fits inside the margins', () => {
    for (const size of PRINT_SIZES) {
      const { cols, rows } = gridFor(size);
      expect(cols * size.box.w + (cols - 1) * GAP).toBeLessThanOrEqual(SHEET.w);
      expect(rows * size.box.h + (rows - 1) * GAP).toBeLessThanOrEqual(SHEET.h);
    }
  });

  it('spreads pictures over as many sheets as needed, in order, without losing any', () => {
    const sheets = sheetsFor(11, printSize('lille'));
    expect(sheets.map((s) => s.length)).toEqual([9, 2]);
    expect(sheets.flat()).toEqual([...Array(11).keys()]);
    expect(sheetsFor(5, printSize('stor'))).toHaveLength(5);
    expect(sheetsFor(0, printSize('mellem'))).toEqual([]);
  });

  it('tells the adult how much paper it takes', () => {
    expect(printSummary(1, printSize('lille'))).toBe('1 billede · 1 ark');
    expect(printSummary(5, printSize('mellem'))).toBe('5 billeder · 2 ark');
  });
});

describe('sheet image layout (printing from the Home Screen app)', () => {
  it('places every picture on its sheet, in order, each fitted in its box and keeping its shape', async () => {
    const { sheetLayout, A4 } = await import('../src/print');
    const ratios = [CARD, PRINT, CARD, CARD, PRINT];
    const sheets = sheetLayout(ratios, printSize('mellem'));
    expect(sheets.map((s) => s.map((p) => p.index))).toEqual([[0, 1, 2, 3], [4]]);
    for (const sheet of sheets) {
      for (const p of sheet) {
        expect(p.w / p.h).toBeCloseTo(ratios[p.index], 6);
        expect(p.w).toBeLessThanOrEqual(printSize('mellem').box.w + 1e-9);
        expect(p.x).toBeGreaterThanOrEqual(0);
        expect(p.y).toBeGreaterThanOrEqual(0);
        expect(p.x + p.w).toBeLessThanOrEqual(A4.w);
        expect(p.y + p.h).toBeLessThanOrEqual(A4.h);
      }
    }
  });

  it('never lets two pictures on a sheet overlap', async () => {
    const { sheetLayout } = await import('../src/print');
    const sheet = sheetLayout(Array(9).fill(CARD), printSize('lille'))[0];
    expect(sheet).toHaveLength(9);
    for (let i = 0; i < sheet.length; i++)
      for (let j = i + 1; j < sheet.length; j++) {
        const a = sheet[i];
        const b = sheet[j];
        const overlap = a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
        expect(overlap).toBe(false);
      }
  });

  it('centres a single large picture on the page', async () => {
    const { sheetLayout, A4 } = await import('../src/print');
    const [p] = sheetLayout([PRINT], printSize('stor'))[0];
    expect(p.x + p.w / 2).toBeCloseTo(A4.w / 2, 6);
    expect(p.y + p.h / 2).toBeCloseTo(A4.h / 2, 6);
  });
});
