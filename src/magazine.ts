import { pickFresh, type Rand } from './powers';

export type MagazineId = 'stjerne' | 'sport' | 'gamer' | 'dyr' | 'rum';

export interface Magazine {
  id: MagazineId;
  /** chip label */
  label: string;
  /** the name set in the masthead */
  masthead: string;
  /** masthead band colour, and the text colour that reads on it */
  band: string;
  bandInk: string;
  icon: 'star' | 'ball' | 'gamepad' | 'paw' | 'rocket';
  headlines: readonly string[];
}

export const MAGAZINES: Magazine[] = [
  {
    id: 'stjerne',
    label: 'Stjerne',
    masthead: 'STJERNE',
    band: '#ff2a3d',
    bandInk: '#ffffff',
    icon: 'star',
    headlines: [
      'Hemmeligheden bag den største kage',
      'Festens vildeste dansetrin',
      'Vi så dem grine i tre timer',
      'Årets sødeste smil',
      'Pakkede en gave op på to sekunder',
    ],
  },
  {
    id: 'sport',
    label: 'Sport',
    masthead: 'SPORT',
    band: '#00a650',
    bandInk: '#ffffff',
    icon: 'ball',
    headlines: [
      'Ny rekord i kage-spisning',
      'Scorede ti mål i stuen',
      'Verdens hurtigste gaveåbner',
      'Vandt guld i stoledans',
      'Træneren: »De er helt vilde!«',
    ],
  },
  {
    id: 'gamer',
    label: 'Gamer',
    masthead: 'GAMER',
    band: '#7a2cff',
    bandInk: '#ffffff',
    icon: 'gamepad',
    headlines: [
      'Nåede level 99 før kagen',
      'Ny highscore i fnis',
      'Låste op for ekstra slik',
      'Vandt boss-kampen med balloner',
      'Game over? Aldrig!',
    ],
  },
  {
    id: 'dyr',
    label: 'Dyr',
    masthead: 'DYRELIV',
    band: '#ff8a00',
    bandInk: '#111111',
    icon: 'paw',
    headlines: [
      'Sjælden fødselsdags-panda fundet',
      'Ugler elsker denne kage',
      'Sådan brøler en ægte løve',
      'Hunden fik også en hat',
      'Ny dyreart opdaget i 2.B',
    ],
  },
  {
    id: 'rum',
    label: 'Rummet',
    masthead: 'RUMMET',
    band: '#1a2a6c',
    bandInk: '#ffe600',
    icon: 'rocket',
    headlines: [
      'Landede på månen til fødselsdag',
      'Rumvæsner kom med gaver',
      'Raket kører på lagkage',
      'Første fest i rummet',
      'Astronaut: »Sikke et smil!«',
    ],
  },
];

export const BURSTS = ['KUN 9 KR!', 'NYHED!', 'EKSKLUSIVT!', 'SUPER-NR.', '100% SJOV'] as const;
export const TEASERS = [
  '+ 7 hemmelige kage-tricks',
  '+ Stor plakat inden i',
  '+ Test: Hvor sjov er du?',
  '+ Gratis klistermærker',
  '+ Vind en ballon',
] as const;

export const magazine = (id: string): Magazine => MAGAZINES.find((m) => m.id === id) ?? MAGAZINES[0];

export interface CoverStory {
  headline: string;
  burst: string;
  teaser: string;
}

/** The surprise cover lines for one shot: a headline from that magazine, never the previous one again. */
export function pickCoverStory(id: string, rand: Rand, previousHeadline?: string): CoverStory {
  return {
    headline: pickFresh(magazine(id).headlines, rand, previousHeadline),
    burst: pickFresh(BURSTS, rand),
    teaser: pickFresh(TEASERS, rand),
  };
}
