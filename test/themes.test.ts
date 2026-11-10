import { describe, expect, it } from 'vitest';
import { themeOf, THEMES, THEME_IDS, visibleThemes } from '../src/themes';
import { PHRASES } from '../src/kawaii';
import { MAGAZINES, BURSTS, TEASERS, pickCoverStory, magazine } from '../src/magazine';
import { coverLayout, intersects, COVER_W, COVER_H } from '../src/geometry';
import { POWERS } from '../src/powers';

describe('themes', () => {
  it('offers Samlekort, Kawaii and Blokland on the start screen, and keeps Forsiden hidden but working', () => {
    expect(visibleThemes().map((t) => t.id)).toEqual(['kort', 'kawaii', 'blokland']);
    expect(THEME_IDS).toContain('forside');
    expect(THEMES.forside.hidden).toBe(true);
  });

  it('still shows covers taken before Forsiden was hidden as covers', () => {
    expect(themeOf({ theme: 'forside' })).toBe('forside');
  });

  it('surprises a kawaii print with a speech-bubble phrase, never the same twice in a row', () => {
    const first = THEMES.kawaii.surprise('stjerner', () => 0);
    expect(PHRASES).toContain(first.text);
    expect(THEMES.kawaii.surprise('stjerner', () => 0, first.text).text).not.toBe(first.text);
  });

  it('gives every theme choices with unique ids for the left picker', () => {
    for (const id of THEME_IDS) {
      const ids = THEMES[id].frames.map((f) => f.id);
      expect(ids.length).toBeGreaterThan(0);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it('reads old gallery pictures without a theme as trading cards', () => {
    expect(themeOf({})).toBe('kort');
    expect(themeOf({ theme: 'nonsense' })).toBe('kort');
    expect(themeOf({ theme: 'forside' })).toBe('forside');
  });

  it('surprises a card with a superpower and a strength', () => {
    const s = THEMES.kort.surprise('ild', () => 0.5);
    expect(POWERS).toContain(s.text);
    expect(s.strength).toBeGreaterThanOrEqual(100);
  });

  it('surprises a cover with a headline from the chosen magazine, never the same one twice in a row', () => {
    const first = THEMES.forside.surprise('gamer', () => 0);
    expect(magazine('gamer').headlines).toContain(first.text);
    const next = THEMES.forside.surprise('gamer', () => 0, first.text);
    expect(next.text).not.toBe(first.text);
    expect(next.strength).toBeUndefined();
  });
});

describe('magazine cover stories', () => {
  it('draws headline, burst and teaser from their lists', () => {
    for (const m of MAGAZINES) {
      const story = pickCoverStory(m.id, () => 0.99);
      expect(m.headlines).toContain(story.headline);
      expect(BURSTS).toContain(story.burst);
      expect(TEASERS).toContain(story.teaser);
    }
  });

  it('every magazine has a few headlines to vary between shots', () => {
    for (const m of MAGAZINES) expect(m.headlines.length).toBeGreaterThanOrEqual(3);
  });
});

describe('cover layout', () => {
  it('is a 3:4 magazine page', () => {
    expect(COVER_W / COVER_H).toBeCloseTo(3 / 4, 6);
  });

  it('keeps every cover line and sticker out of the faces in the middle of the photo', () => {
    const L = coverLayout();
    for (const k of ['masthead', 'issue', 'teaser', 'burst', 'headline', 'barcode'] as const) {
      expect(intersects(L[k], L.faces), k).toBe(false);
    }
  });

  it('keeps everything on the page', () => {
    const L = coverLayout();
    for (const r of Object.values(L)) {
      expect(r.x).toBeGreaterThanOrEqual(0);
      expect(r.y).toBeGreaterThanOrEqual(0);
      expect(r.x + r.w).toBeLessThanOrEqual(COVER_W);
      expect(r.y + r.h).toBeLessThanOrEqual(COVER_H);
    }
  });
});
