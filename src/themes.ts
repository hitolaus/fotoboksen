import { CARD_TYPES } from './cardTypes';
import { MAGAZINES, pickCoverStory } from './magazine';
import { STICKER_SETS, pickPhrase, shapeSvg } from './kawaii';
import { cardNumberLabel, pickPower, pickStrength, type Rand } from './powers';
import { CARD_H, CARD_W, COVER_H, COVER_W, PURI_H, PURI_W } from './geometry';
import { elementIcon, uiIcon } from './icons';

export type ThemeId = 'kort' | 'forside' | 'kawaii';

/** One choice in the left picker: a card type or a magazine. */
export interface FrameOption {
  id: string;
  label: string;
  /** gradient and glyph colour of the chip's disc */
  c1: string;
  c2: string;
  ink: string;
  iconSvg: string;
}

/** What the booth reveals after the shot. `text` is the main line (superpower or headline). */
export interface Surprise {
  text: string;
  strength?: number;
  burst?: string;
  teaser?: string;
}

export interface Theme {
  id: ThemeId;
  /** name on the start screen */
  name: string;
  /** kept working (old pictures still show) but not offered on the start screen */
  hidden?: boolean;
  width: number;
  height: number;
  framesHeading: string;
  frames: FrameOption[];
  shutterLabel: string;
  surprise(frameId: string, rand: Rand, previous?: string): Surprise;
  resultTitle(number: number): string;
  /** lead-in to the surprise line on the result screen; empty hides the line */
  resultLabel: string;
}

export const THEMES: Record<ThemeId, Theme> = {
  kort: {
    id: 'kort',
    name: 'Samlekort',
    width: CARD_W,
    height: CARD_H,
    framesHeading: 'Korttype',
    frames: CARD_TYPES.map((t) => ({
      id: t.id,
      label: t.label,
      c1: t.light,
      c2: t.dark,
      ink: t.id === 'lyn' ? '#141a4d' : '#fff7e0',
      iconSvg: elementIcon(t.icon),
    })),
    shutterLabel: 'Tag kort!',
    surprise: (_frame, rand, previous) => ({ text: pickPower(rand, previous), strength: pickStrength(rand) }),
    resultTitle: (n) => `${cardNumberLabel(n)} er klar!`,
    resultLabel: 'Superkraft:',
  },
  forside: {
    id: 'forside',
    name: 'Forsiden',
    hidden: true,
    width: COVER_W,
    height: COVER_H,
    framesHeading: 'Blad',
    frames: MAGAZINES.map((m) => ({
      id: m.id,
      label: m.label,
      c1: m.band,
      c2: m.band,
      ink: m.bandInk,
      iconSvg: uiIcon(m.icon),
    })),
    shutterLabel: 'Tag forsiden!',
    surprise: (frame, rand, previous) => {
      const story = pickCoverStory(frame, rand, previous);
      return { text: story.headline, burst: story.burst, teaser: story.teaser };
    },
    resultTitle: () => 'Forsiden er klar!',
    resultLabel: 'På forsiden:',
  },
  kawaii: {
    id: 'kawaii',
    name: 'Kawaii',
    width: PURI_W,
    height: PURI_H,
    framesHeading: 'Stickers',
    frames: STICKER_SETS.map((set) => ({
      id: set.id,
      label: set.label,
      c1: set.frameA,
      c2: set.frameB,
      ink: set.chipInk,
      iconSvg: shapeSvg(set.icon),
    })),
    shutterLabel: 'Tag billede!',
    surprise: (_frame, rand, previous) => ({ text: pickPhrase(rand, previous) }),
    resultTitle: () => 'Dit billede er klart!',
    // the print's own bubble already shows the phrase
    resultLabel: '',
  },
};

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

/** The themes the start screen offers, in order. */
export const visibleThemes = (): Theme[] => THEME_IDS.map((id) => THEMES[id]).filter((t) => !t.hidden);

export const isThemeId = (v: unknown): v is ThemeId => typeof v === 'string' && v in THEMES;

/** Pictures saved before themes existed were all trading cards. */
export const themeOf = (record: { theme?: string }): ThemeId => (isThemeId(record.theme) ? record.theme : 'kort');

const PREF_KEY = 'fotoboksen.theme';

/** The theme picked last time, if the start screen still offers it. Storage may be missing or throw. */
export function loadThemePref(storage: Pick<Storage, 'getItem'> | undefined): ThemeId {
  try {
    const v = storage?.getItem(PREF_KEY);
    return isThemeId(v) && !THEMES[v].hidden ? v : 'kort';
  } catch {
    return 'kort';
  }
}

export function saveThemePref(storage: Pick<Storage, 'setItem'> | undefined, id: ThemeId): void {
  try {
    storage?.setItem(PREF_KEY, id);
  } catch {
    /* private mode: the choice just isn't remembered */
  }
}
