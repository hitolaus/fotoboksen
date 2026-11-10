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

/** A random superpower, never the same one twice in a row. */
export function pickPower(rand: Rand, previous?: string): string {
  const pool = POWERS.filter((p) => p !== previous);
  return pool[Math.min(pool.length - 1, Math.floor(rand() * pool.length))];
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
