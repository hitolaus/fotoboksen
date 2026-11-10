import { CARD_TYPES } from './cardTypes';
import { MAGAZINES, pickCoverStory } from './magazine';
import { STICKER_SETS, pickPhrase, shapeSvg } from './kawaii';
import { WORLDS, blockSvg, pickTitle } from './blokland';
import { FRAME_STYLES, STUM_EFFECTS, pickCaption } from './stumfilm';
import { DEFAULT_EFFECTS, effectsById, type Effect, type EffectId } from './effects';
import { cardNumberLabel, pickPower, pickStrength, type Rand } from './powers';
import { BLOK_H, BLOK_W, CARD_H, CARD_W, COVER_H, COVER_W, PURI_H, PURI_W, STUM_H, STUM_W } from './geometry';
import { elementIcon, uiIcon } from './icons';

export type ThemeId = 'kort' | 'forside' | 'kawaii' | 'blokland' | 'stumfilm';

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
  /** the effects this theme offers; most use DEFAULT_EFFECTS */
  effects?: EffectId[];
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
    shutterLabel: 'Tag billede!',
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
  blokland: {
    id: 'blokland',
    name: 'Blokland',
    width: BLOK_W,
    height: BLOK_H,
    framesHeading: 'Verden',
    frames: WORLDS.map((w) => ({
      id: w.id,
      label: w.label,
      c1: w.block[1],
      c2: w.block[2],
      ink: '#1b1b22',
      iconSvg: blockSvg(w),
    })),
    shutterLabel: 'Tag billede!',
    surprise: (_frame, rand, previous) => ({ text: pickTitle(rand, previous) }),
    resultTitle: () => 'Level up!',
    // the banner on the print already shows the new title
    resultLabel: '',
  },
  stumfilm: {
    id: 'stumfilm',
    name: 'Stumfilm',
    width: STUM_W,
    height: STUM_H,
    framesHeading: 'Ramme',
    frames: FRAME_STYLES.map((f) => ({
      id: f.id,
      label: f.label,
      c1: '#2a2a2a',
      c2: '#0c0c0c',
      ink: '#e6e6e6',
      iconSvg: uiIcon(f.id),
    })),
    effects: STUM_EFFECTS,
    shutterLabel: 'Tag billede!',
    surprise: (_frame, rand, previous) => ({ text: pickCaption(rand, previous) }),
    resultTitle: () => 'Slut!',
    // the caption card on the print already says the line
    resultLabel: '',
  },
};

/** The effect chips a theme shows, in order. */
export const effectsFor = (theme: Theme): Effect[] => effectsById(theme.effects ?? DEFAULT_EFFECTS);

export const THEME_IDS = Object.keys(THEMES) as ThemeId[];

/** The themes the start screen offers, in order. */
export const visibleThemes = (): Theme[] => THEME_IDS.map((id) => THEMES[id]).filter((t) => !t.hidden);

export const isThemeId = (v: unknown): v is ThemeId => typeof v === 'string' && v in THEMES;

/** Pictures saved before themes existed were all trading cards. */
export const themeOf = (record: { theme?: string }): ThemeId => (isThemeId(record.theme) ? record.theme : 'kort');
