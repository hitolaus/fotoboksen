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
