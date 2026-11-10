import { describe, expect, it } from 'vitest';
import { cardNumberLabel, dateLabel, pickPower, pickStrength, POWERS } from '../src/powers';

const seq = (...values: number[]) => {
  let i = 0;
  return () => values[i++ % values.length];
};

describe('pickPower', () => {
  it('returns one of the listed superpowers for any random value, including the edges', () => {
    for (const v of [0, 0.5, 0.999999]) expect(POWERS).toContain(pickPower(() => v));
  });

  it('never gives the same superpower twice in a row', () => {
    for (const previous of POWERS) {
      for (const v of [0, 0.3, 0.7, 0.9999]) expect(pickPower(() => v, previous)).not.toBe(previous);
    }
  });

  it('can reach every superpower', () => {
    const seen = new Set<string>();
    for (let i = 0; i < POWERS.length; i++) seen.add(pickPower(() => (i + 0.5) / POWERS.length));
    expect(seen.size).toBe(POWERS.length);
  });
});

describe('pickStrength', () => {
  it('is always a whole number from 100 to 999', () => {
    expect(pickStrength(seq(0))).toBe(100);
    expect(pickStrength(seq(0.9999999))).toBe(999);
    const s = pickStrength(seq(0.5));
    expect(Number.isInteger(s)).toBe(true);
  });
});

describe('labels', () => {
  it('prints card numbers as three digits like a collector set', () => {
    expect(cardNumberLabel(7)).toBe('Nr. 007');
    expect(cardNumberLabel(123)).toBe('Nr. 123');
    expect(cardNumberLabel(1234)).toBe('Nr. 1234');
  });

  it('prints dates the Danish way', () => {
    expect(dateLabel(new Date(2026, 10, 9))).toBe('09.11.2026');
  });
});
