export const POWERS = [
  'Kæmpe-smil',
  'Konfetti-kaster',
  'Kage-radar',
  'Superhop',
  'Fnise-angreb',
  'Turbo-dans',
  'Næsten usynlig',
  'Gave-gætter',
  'Ballon-mester',
  'Lyn-high-five',
  'Slik-snuser',
  'Grine-storm',
  'Brøle-kraft',
  'Hemmelig ninja',
] as const;

export type Rand = () => number;

/** A random entry from `pool`, never `previous` again (so the same text never comes twice in a row). */
export function pickFresh<T>(pool: readonly T[], rand: Rand, previous?: T): T {
  const fresh = pool.filter((p) => p !== previous);
  const from = fresh.length ? fresh : pool;
  return from[Math.min(from.length - 1, Math.floor(rand() * from.length))];
}

/** A random superpower, never the same one twice in a row. */
export function pickPower(rand: Rand, previous?: string): string {
  return pickFresh(POWERS, rand, previous);
}

/** Strength from 100 to 999 inclusive. */
export function pickStrength(rand: Rand): number {
  return 100 + Math.min(899, Math.floor(rand() * 900));
}

export function cardNumberLabel(n: number): string {
  return `Nr. ${String(n).padStart(3, '0')}`;
}

export function dateLabel(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}
