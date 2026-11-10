---
name: Fotoboksen
description: A party photobooth that turns every photo into your own holo trading card, a purikura sticker-photo or a level in a pixel block world.
colors:
  navy: "#141a4d"
  navy-2: "#232c78"
  navy-3: "#2f3a94"
  gold: "#ffcf1f"
  gold-deep: "#e0a800"
  cream: "#fff7e0"
  magenta: "#ff4fd8"
  cyan: "#4ef0ff"
  lemon: "#ffe14d"
  danger: "#ff6b5a"
  ild-light: "#ff9a3c"
  ild-dark: "#e8371a"
  vand-light: "#6fd6ff"
  vand-dark: "#1673d9"
  lyn-light: "#fff27a"
  lyn-dark: "#f5a300"
  jungle-light: "#8ff06b"
  jungle-dark: "#139a4c"
  galakse-light: "#a98bff"
  galakse-dark: "#3a1f9e"
  slik-light: "#ffa8d9"
  slik-dark: "#e6247f"
  mag-ground: "#0a8fd0"
  mag-red: "#ff2a3d"
  mag-yellow: "#ffe600"
  mag-ink: "#111111"
  paper-white: "#ffffff"
  sport-band: "#00a650"
  gamer-band: "#7a2cff"
  dyr-band: "#ff8a00"
  rum-band: "#1a2a6c"
  kw-purple: "#5a1290"
  kw-pink: "#ff3d9a"
  kw-ground-top: "#6a1b9a"
  kw-ground-mid: "#a0218f"
  kw-ground-bottom: "#d81b74"
  sticker-pink: "#ff4fa3"
  lilac: "#c9a7ff"
  blush: "#ffd1e8"
  mint: "#7ff0d0"
  sky: "#8fd3ff"
  face-ink: "#3a1450"
  bl-ground: "#26262f"
  bl-ground-check: "#2b2b35"
  bl-ink: "#1b1b22"
  bl-stone: "#3a3a46"
  bl-grass: "#2f8f1f"
  bl-grass-light: "#5ec43a"
  bl-gold: "#ffd23f"
  sf-black: "#0c0c0c"
  sf-panel: "#1b1b1b"
  sf-silver: "#c9c9c9"
  sf-white: "#f4f4f0"
typography:
  display:
    fontFamily: "Lilita One, sans-serif"
    fontSize: "clamp(110px, 24dvh, 220px)"
    fontWeight: 400
    lineHeight: 1
  headline:
    fontFamily: "Lilita One, sans-serif"
    fontSize: "clamp(40px, 6dvh, 60px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  title:
    fontFamily: "Lilita One, sans-serif"
    fontSize: "clamp(26px, 3dvh, 34px)"
    fontWeight: 400
    letterSpacing: "0.01em"
  body:
    fontFamily: "Baloo 2, sans-serif"
    fontSize: "20px"
    fontWeight: 600
  label:
    fontFamily: "Baloo 2, sans-serif"
    fontSize: "24px"
    fontWeight: 800
  forside-display:
    fontFamily: "Anton, sans-serif"
    fontWeight: 400
    letterSpacing: "0.01em"
  masthead:
    fontFamily: "Anton, sans-serif"
    fontSize: "214px"
    fontWeight: 400
  cover-headline:
    fontFamily: "Anton, sans-serif"
    fontSize: "112px"
    fontWeight: 400
    lineHeight: 1.02
  cover-line:
    fontFamily: "Anton, sans-serif"
    fontSize: "50px"
    fontWeight: 400
  kawaii-display:
    fontFamily: "Mochiy Pop One, sans-serif"
    fontWeight: 400
    letterSpacing: "0em"
  purikura-title:
    fontFamily: "Mochiy Pop One, sans-serif"
    fontSize: "92px"
    fontWeight: 400
  bubble-phrase:
    fontFamily: "Mochiy Pop One, sans-serif"
    fontSize: "64px"
    fontWeight: 400
  blokland-display:
    fontFamily: "Pixelify Sans, monospace"
    fontWeight: 700
    letterSpacing: "0em"
  level-up:
    fontFamily: "Pixelify Sans, monospace"
    fontSize: "104px"
    fontWeight: 700
  band-meta:
    fontFamily: "Pixelify Sans, monospace"
    fontSize: "36px"
    fontWeight: 700
  stumfilm-display:
    fontFamily: "Limelight, serif"
    fontWeight: 400
    letterSpacing: "0.02em"
  stumfilm-label:
    fontFamily: "Josefin Sans, sans-serif"
    fontWeight: 600
  caption:
    fontFamily: "Limelight, serif"
    fontSize: "88px"
    fontWeight: 400
    lineHeight: 1.2
  party-line:
    fontFamily: "Josefin Sans, sans-serif"
    fontSize: "30px"
    fontWeight: 600
rounded:
  pill: "999px"
  card: "5.2% / 3.7%"
  cover: "0.6%"
  print: "3.8% / 2.9%"
  photo-window: "46px"
  plate: "22px"
  block: "0"
  title-card: "2px"
spacing:
  pad: "clamp(16px, 2.4vw, 32px)"
  chip-h: "clamp(56px, 10.6dvh, 96px)"
  gap: "14px"
components:
  button-shutter:
    backgroundColor: "{colors.magenta}"
    textColor: "{colors.navy}"
    typography: "{typography.headline}"
    rounded: "{rounded.pill}"
    padding: "0 44px"
    height: "clamp(84px, 13dvh, 120px)"
  button-pill:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "72px"
  button-pill-quiet:
    backgroundColor: "rgb(255 255 255 / 0.1)"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "72px"
  button-pill-danger:
    backgroundColor: "rgb(255 107 90 / 0.16)"
    textColor: "#ffb3aa"
    rounded: "{rounded.pill}"
    height: "72px"
  button-pill-danger-armed:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.navy}"
  chip:
    backgroundColor: "rgb(255 255 255 / 0.08)"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 18px 0 12px"
    height: "{spacing.chip-h}"
  chip-selected:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
  count-badge:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "20px"
    height: "40px"
  toast:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.navy}"
    rounded: "18px"
    padding: "14px 24px"
  forside-button-shutter:
    backgroundColor: "{colors.mag-red}"
    textColor: "{colors.paper-white}"
    typography: "{typography.forside-display}"
    rounded: "{rounded.pill}"
    padding: "0 44px"
    height: "clamp(84px, 13dvh, 120px)"
  forside-button-pill:
    backgroundColor: "{colors.mag-yellow}"
    textColor: "{colors.mag-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "72px"
  forside-button-pill-quiet:
    backgroundColor: "rgb(0 40 80 / 0.25)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    height: "72px"
  forside-chip:
    backgroundColor: "rgb(0 40 80 / 0.22)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    height: "{spacing.chip-h}"
  forside-chip-selected:
    backgroundColor: "{colors.mag-yellow}"
    textColor: "{colors.mag-ink}"
  forside-result-strap:
    backgroundColor: "{colors.mag-yellow}"
    textColor: "{colors.mag-ink}"
    padding: "0.04em 0.3em"
  theme-name-kort:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.pill}"
    padding: "6px 28px"
  theme-name-forside:
    backgroundColor: "{colors.mag-red}"
    textColor: "{colors.paper-white}"
    typography: "{typography.forside-display}"
    rounded: "{rounded.pill}"
    padding: "6px 28px"
  kawaii-button-shutter:
    backgroundColor: "{colors.kw-pink}"
    textColor: "{colors.paper-white}"
    typography: "{typography.kawaii-display}"
    rounded: "{rounded.pill}"
    padding: "0 44px"
    height: "clamp(84px, 13dvh, 120px)"
  kawaii-button-pill:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.kw-purple}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "72px"
  kawaii-button-pill-quiet:
    backgroundColor: "rgb(255 255 255 / 0.16)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    height: "72px"
  kawaii-chip:
    backgroundColor: "rgb(255 255 255 / 0.14)"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.pill}"
    height: "{spacing.chip-h}"
  kawaii-chip-selected:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.kw-purple}"
  theme-name-kawaii:
    backgroundColor: "{colors.kw-pink}"
    textColor: "{colors.paper-white}"
    typography: "{typography.kawaii-display}"
    rounded: "{rounded.pill}"
    padding: "6px 28px"
  blokland-button-shutter:
    backgroundColor: "{colors.bl-grass}"
    textColor: "{colors.paper-white}"
    typography: "{typography.blokland-display}"
    rounded: "{rounded.block}"
    padding: "0 44px"
    height: "clamp(84px, 13dvh, 120px)"
  blokland-button-pill:
    backgroundColor: "{colors.bl-gold}"
    textColor: "{colors.bl-ink}"
    typography: "{typography.blokland-display}"
    rounded: "{rounded.block}"
    height: "72px"
  blokland-button-pill-quiet:
    backgroundColor: "{colors.bl-stone}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.block}"
    height: "72px"
  blokland-chip:
    backgroundColor: "{colors.bl-stone}"
    textColor: "{colors.paper-white}"
    typography: "{typography.blokland-display}"
    rounded: "{rounded.block}"
    height: "{spacing.chip-h}"
  blokland-chip-selected:
    backgroundColor: "{colors.bl-gold}"
    textColor: "{colors.bl-ink}"
  theme-name-blokland:
    backgroundColor: "{colors.bl-grass}"
    textColor: "{colors.paper-white}"
    typography: "{typography.blokland-display}"
    rounded: "{rounded.block}"
    padding: "6px 28px"
  stumfilm-button-shutter:
    backgroundColor: "{colors.sf-white}"
    textColor: "{colors.sf-black}"
    typography: "{typography.stumfilm-display}"
    rounded: "{rounded.title-card}"
    padding: "0 44px"
    height: "clamp(84px, 13dvh, 120px)"
  stumfilm-button-pill:
    backgroundColor: "{colors.sf-white}"
    textColor: "{colors.sf-black}"
    typography: "{typography.stumfilm-label}"
    rounded: "{rounded.title-card}"
    height: "72px"
  stumfilm-button-pill-quiet:
    backgroundColor: "{colors.sf-panel}"
    textColor: "{colors.sf-white}"
    typography: "{typography.stumfilm-label}"
    rounded: "{rounded.title-card}"
    height: "72px"
  stumfilm-chip:
    backgroundColor: "{colors.sf-panel}"
    textColor: "{colors.sf-white}"
    typography: "{typography.stumfilm-label}"
    rounded: "{rounded.title-card}"
    height: "{spacing.chip-h}"
  stumfilm-chip-selected:
    backgroundColor: "{colors.sf-white}"
    textColor: "{colors.sf-black}"
  theme-name-stumfilm:
    backgroundColor: "{colors.sf-white}"
    textColor: "{colors.sf-black}"
    typography: "{typography.stumfilm-display}"
    rounded: "{rounded.title-card}"
    padding: "6px 28px"
---

# Design System: Fotoboksen

## Overview

**Creative North Star: "The Collector's Binder"**

**Kawaii North Star: "The Purikura Sticker Booth"**

**Blokland North Star: "A Level in the Block World"**

**Stumfilm North Star: "A Still from a 1930s Silent Film"**

**Forsiden North Star (hidden): "This Week's Cover"**

Fotoboksen has five worlds on one skeleton. The start screen offers every theme whose registry entry is not marked hidden: today Samlekort, Kawaii, Blokland and Stumfilm. Forsiden is hidden from the picker (2026-11-10): its code, painter and styles stay, and every cover already saved still renders in the gallery and viewer. The choice sets `data-theme` (kort, kawaii, blokland, stumfilm or forside) on the body, and the booth, result, gallery and viewer keep the same structure, controls and motion grammar while ground, accent, display face and picture object change. Every saved picture remembers its own theme, so the gallery holds cards, prints, block prints, film stills and covers side by side, each drawn in its own world; pictures from before themes existed are cards. All tiles on the start screen are equal: nothing marks a theme as chosen or last used, and the app does not remember the last theme. "Skift tema" in the booth (bottom left) and in the gallery header returns there, and the camera keeps running.

**Samlekort.** Every photo is minted as a holo trading card, and the whole app is the binder the card lives in. The ground is deep binder navy; the objects on it are gold card stock, holo foil and cream plates. The live camera is not a viewfinder but the art window of an upright 5:7 card. Everything on the card (gold stock, type-coloured panel, cream mat, navy ribbon, cream stats plate) is drawn on canvas on a fixed 1000 x 1400 grid, so preview, JPEG and print are the same object. Motion belongs to the card: a foil sweep on the live card, a 3D flip reveal, tilt and a finger-tracked foil highlight on the finished card.

**Kawaii.** Every photo prints as a Japanese purikura sticker-photo. The ground is a purple-to-magenta gradient under white polka dots; the print is a 3:4 page in the chosen sticker set's two-colour gradient, dotted, with the photo in a rounded white-rimmed window, die-cut stickers on the top strip and straddling the side edges, a white speech bubble top right and a title band below. Stickers are original shapes (star, heart, sparkle, cat, paw, sakura, cloud), each a thick white die-cut with a gloss dot, and the big ones wear a tiny face (dot eyes, smile, blush). The whole print is drawn on a 1050 x 1400 canvas grid by the same code for the live preview and the saved JPEG. Motion: sparkle glints that run over the frame only, and a reveal where the print pops down like a slapped sticker; the bubble then shows its surprise phrase.

**Blokland.** Every photo becomes a level in an original blocky pixel-game world; it borrows no real game's name, logo, characters, textures or look. The ground is dark stone under a faint 16px pixel checker; the print is a 3:4 page built from 70-unit blocks: one row of the chosen world's textured blocks frames the photo, a stone band carries the party title below, pixel loot (gems, coins, cake, stars, torches, snowflakes) sits in the top corners and straddles the side edges, and an ink banner across the top of the photo reads "KLAR, PARAT, START!" until the shot, then "LEVEL UP!" with a new title. Six worlds (Græs, Grotte, Ørken, Sne, Lava, Hav) each declare three block tones. The whole print is drawn on a 1050 x 1400 canvas grid by the same code for preview and JPEG. Blokland is the one world whose chrome is square: blocks with inset bevels and hard one-step ink shadows instead of pills and soft lift. Motion: no sheen and no foil; the print drops in ten hard steps.

**Stumfilm.** Every photo is a still from a 1930s silent film, in black and white only: no colour anywhere, pictures included, and no sepia. The ground is film black under a soft grey glow; the print is a 3:4 black page in a silver Art Deco frame, with the still above a silent-film title card that carries the caption ("Og så kom kagen …") and, under an ornament rule, the party line. Four frame ornaments (Klassisk stepped corners, Vifte corner fans, Stråler sunburst rays, Perler silver beads) change only the silver drawing in the black border. Every photo, whatever effect the kid picked, then runs through the theme's film finish: grey, a little extra contrast, a vignette, moving grain, a faint flicker and, in half the frames, one vertical scratch. The whole print is drawn on a 1050 x 1400 canvas grid by the same code for preview and JPEG. Chrome is title-card plates: near-square corners, thin silver double rules drawn inside, and a white plate for the chosen state. Motion: a film-leader countdown (crosshair and a sweeping hand) and an iris that opens the still; no sheen and no foil.

**Forsiden (hidden from the picker).** Every photo is this week's magazine cover. The ground is saturated newsstand cyan; the photo runs full bleed on a 3:4 cover under a solid masthead band in the chosen magazine's colour, a black issue strip, and white Anton cover lines with a heavy black outline. A yellow starburst sticker and a barcode box finish the newsstand. The overlay is drawn on a 1050 x 1400 canvas grid. Motion: a gloss that sweeps the masthead only, and a reveal where the cover drops onto the table.

Shared by all: low density and huge controls, two columns of fat chips flanking the picture, both top-aligned, one big shutter under it, every control word backed by an authored icon; chrome only answers touches with a press-scale and a springy pick. The right column's effects come from the theme: every theme offers the six default effects unless its registry entry names its own list, and a painter may add a post finish that runs on the photo after every effect.

**Key Characteristics:**
- One skeleton, five worlds, switched by `data-theme` on the body and on each saved picture; the picker shows only themes not marked hidden.
- The picture (5:7 card, 3:4 print, still or cover) is the largest object on every screen except the gallery grid.
- Samlekort: navy ground, gold and cream objects, magenta reserved for the capture pill; Lilita One display.
- Kawaii: purple-to-magenta dotted ground, white for chosen with purple ink, hot pink for the capture pill; Mochiy Pop One display; die-cut stickers with faces.
- Blokland: dark stone checker ground, gold with ink for chosen, grass green for the capture block; Pixelify Sans 700 for all text; square blocks, inset bevels, hard ink steps.
- Stumfilm: black ground, white for chosen and for the capture plate, silver double rules; Limelight display, Josefin Sans labels; near-square title-card plates; every photo in grainy black-and-white film stock.
- Forsiden (hidden): cyan ground, yellow for chosen, red for the capture pill, ink outlines; Anton display in caps.
- Pills and discs in the chrome of Samlekort, Kawaii and Forsiden; square bevelled blocks in Blokland; near-square ruled plates in Stumfilm; the picture carries the world's corner.

## Colors

Four saturated toy palettes and one without hue. Samlekort: gold and cream on near-black navy with a foil trio. Kawaii: white and hot pink on a plum-to-magenta ground, with a pastel sticker palette. Blokland: gold and grass green on dark stone, ink outlines, and six three-tone world blocks. Stumfilm: white, silver and a dark panel on film black, nothing else. Forsiden: yellow, red, ink and white on newsstand cyan, plus five magazine band colours.

### Primary
- **Card-Stock Gold** (gold): Samlekort selected chips, primary pills, all screen headings, the countdown numeral, count badges and the gold border of the card back. The colour of "this one is chosen". Also the start-screen title and the Samlekort name pill.
- **Stock Shadow Gold** (gold-deep): the inner second ring of the card-back border only.
- **Paper White** (paper-white) as Kawaii's chosen colour: selected chips and primary pills are white with Purikura Purple text (10.9:1).
- **Block Gold** (bl-gold): Blokland's "chosen" colour: selected chips, primary pills, the Samling count, every heading, the countdown numeral, the start-tile title and outer rim, the band's meta line, the banner's gold edge and "LEVEL UP!". Always with ink text (11.9:1).
- **Title-Card White** (sf-white): Stumfilm's "chosen" colour and, because the world has no hue, also its capture plate: selected chips, primary pills, the Samling count, the shutter, the start name plate, every heading, the countdown numeral and "Smil!", and the caption on the print. Always with film black text (17.7:1).
- **Sticker Yellow** (mag-yellow): Forsiden's "chosen" colour: selected chips, primary pills, the count badge, the countdown numeral and ring, the starburst sticker, and the flat strap behind the headline on the result screen. Always with ink text (14.9:1).

### Secondary
- **Shutter Magenta** (magenta): the Samlekort capture pill ("Tag billede!", "Igen!", "Tag det første!") and text selection. Navy text on it (5.7:1).
- **Purikura Hot Pink** (kw-pink): the Kawaii capture pill ("Tag billede!") with white Mochiy Pop One (3.3:1, display size only) and the Kawaii name pill on the start screen. The shipped build also uses it on the Samling count badge, the chosen effect-chip disc and the countdown ring; those three uses diverge from The One Shutter Colour Rule and are not part of the system.
- **Grass Green** (bl-grass): the Blokland capture block ("Tag billede!") and the Blokland name plate on the start screen, both with white Pixelify Sans 700 (4.1:1, display size only). **Fresh Grass** (bl-grass-light) is its lit top bevel and the countdown ring.
- **Masthead Red** (mag-red): the Forsiden capture pill ("TAG FORSIDEN!") with white Anton (3.7:1, display size only), the Forsiden name pill, and the Stjerne magazine band.

### Tertiary
- **Foil Cyan, Foil Magenta, Foil Lemon** (cyan, magenta, lemon): the holo trio. Used together as the 115deg foil gradient on card backs and finished cards, as the specular sheen on the live card, and as 50%-alpha diagonal bands across the gold stock on canvas. Cyan alone is the focus ring in Samlekort and Forsiden; lemon is the focus ring and the "Smil!" hint in Kawaii.
- **Type pairs** (ild, vand, lyn, jungle, galakse, slik; each -light and -dark): the inner card panel runs a vertical gradient from -dark (top) to -light (bottom), scattered with its element glyph at 20% alpha; the type-chip disc uses the same pair at 160deg. -dark also fills the title-row badge glyph and the strength bar.
- **Sticker palette** (sticker-pink, lilac, blush, mint, sky, lemon, paper-white): the fills of the die-cut stickers. Blush and lilac also run with lemon in the pastel soft-light shimmer on the finished print.
- **Sticker-set frames**: each of the six sets (Stjerner, Hjerter, Kattekat, Sakura, Skyer, Blanding) declares a top and bottom frame colour for the print's vertical gradient, which the set's chip disc repeats at 160deg, and an accent (a deep plum, berry or indigo) that strokes the title, rims the bubble and colours its phrase.
- **World blocks**: each of the six Blokland worlds declares a base, light and dark block tone (Græs #4caf3a/#6fd14f/#2f8424, Grotte greys, Ørken sand, Sne ice white, Lava orange-red, Hav blue). Every block is a 10 x 10 pixel texture: the base tone with a fixed noise of light and dark pixels and a darker seam on its right and bottom edge. The world chip shows one such block.
- **Pixel loot palette**: the sprites share one palette (ink #1b1b22, white, gem cyan #3be8e0/#1aa7a0, coin gold #ffd23f/#d99a00, flame #ff9a1a, frosting #ff6fa8, crumb brown #a0582d); a world may recolour a sprite without changing its shape (ruby gem #ff4a5a/#b3122e, ice gem #bff4ff/#6ccbe8).
- **Frame ornaments** (Stumfilm): the four frame options are all silver on black and differ only in the ornament drawn on the print. Their chip discs are black with a silver ring and a white stroked ornament icon.
- **Magazine bands** (Stjerne mag-red, sport-band, gamer-band, dyr-band, rum-band): one flat colour per magazine, filling the masthead band and that magazine's chip disc. Each declares its own band ink: white on Stjerne, Sport and Gamer; ink on Dyreliv; yellow on Rummet.

### Neutral
- **Binder Navy** (navy): Samlekort ground, text on gold/magenta/cream, the card's photo-window backing and ribbon. Also the start-screen ground and the theme colour.
- **Binder Navy Raised** (navy-2, navy-3): the radial glow at the top of the ground, the card-back pinwheel, default type-chip discs, scrollbar thumb.
- **Plate Cream** (cream): body text on navy, the card's photo mat and stats plate, the shutter's outer ring, the toast.
- **Purikura Ground** (kw-ground-top, kw-ground-mid, kw-ground-bottom): the Kawaii ground, a 150deg gradient from plum through berry to magenta under two offset grids of 5px white dots at 12% on a 44px step.
- **Purikura Purple** (kw-purple): text on white chips and pills, the stroke under the countdown numeral and hint, the ground's fallback colour.
- **Sticker Face Ink** (face-ink): the eyes and smile drawn on big stickers; blush is pink at 55%.
- **Newsstand Cyan** (mag-ground): Forsiden ground, under a radial glow that lightens to #1aa6e6 at 50% 30%.
- **Cover Ink** (mag-ink): the issue strip, every cover-line outline, the starburst outline, barcode bars, text on yellow, the countdown stroke, the selected effect-chip disc.
- **Paper White** (paper-white): Kawaii and Forsiden text and headings, the Kawaii shutter ring, photo-window rim, sticker die-cut and bubble; Forsiden cover-line fill, barcode box and shutter ring.
- **Pixel Ground** (bl-ground, bl-ground-check): the Blokland ground, a 16px two-tone checker.
- **Block Ink** (bl-ink): Blokland's dark: text on gold, the shutter's outer ring, chip discs, the 8-unit rim round the photo, the banner plate, the start tile's inner rim line, and every hard pixel shadow.
- **Stone** (bl-stone): unselected Blokland chips and quiet pills, with white text (11.2:1). The print's title band uses its own three stone tones (#3c3c48, #4a4a58, #2c2c36) as blocks.
- **Film Black** (sf-black): Stumfilm's ground (under a radial glow from #2a2a2a at 50% 40%, black by 70%), the print page, the caption card, chip discs, the shutter's inner ring, the stroke under the countdown and every text on white.
- **Film Panel** (sf-panel): unselected Stumfilm chips, quiet pills and the print dialog, with white text (15.6:1).
- **Silver Rule** (sf-silver): Stumfilm's line colour: the thin double rules inside chips and quiet pills, the chip-disc ring, the shutter's outer ring, the print's page rules, ornaments, still edge and caption-card rules, the party line, and the gallery count (11.8:1 on black).
- **Warning Coral** (danger): the armed state of delete only, in every world; its resting state is a 16% tint with #ffb3aa text.
- Quiet surfaces are translucent, not tokens: white at 8-10% over navy (Samlekort), white at 14-16% over the purikura ground (Kawaii), deep blue rgb(0 40 80) at 22-25% over cyan (Forsiden). Blokland and Stumfilm have no translucent quiet surface: their quiet controls are solid stone or solid panel.

### Named Rules
**The One Shutter Colour Rule.** Each world has exactly one solid capture colour: magenta in Samlekort, hot pink in Kawaii, grass green in Blokland, red in Forsiden. It fills only the capture pill (the capture block in Blokland) and, in Kawaii, Blokland and Forsiden, the theme's name pill on the start screen. Everything else that is chosen or primary is gold (Samlekort), white with purple ink (Kawaii), gold with ink (Blokland) or yellow with ink (Forsiden). Stumfilm, which has no hue to spare, is the one exception: its shutter is the same white plate as its chosen state, and is set apart by its black-and-silver double ring, its Limelight label and its size.

**The Declared Ink Rule.** Every frame option declares the ink that reads on its colour. Lyn is the only light card type: its ink, glyph and footer flip to navy. Magazine bands declare bandInk (white, ink or yellow). Any new type, magazine or sticker set with a light colour must declare a dark ink the same way.

**The No Colour Rule.** Stumfilm carries no hue anywhere: chrome is film black, panel, silver and white, and every photo passes through the film finish after its effect, so no effect can bring colour into a still (tested for every effect the theme offers). The start tile is greyscale-filtered so the shared foil drift reads as silver. Shared pieces get a Stumfilm version too: the delete button is a panel plate that turns into a heavy white frame on black when armed, the toast is paper white with black text, the gallery's chosen check is a black tick on white, and the viewer and print-dialog backdrops are black.

## Typography

**Samlekort Display Font:** Lilita One (with sans-serif), weight 400 only
**Kawaii Display Font:** Mochiy Pop One (with sans-serif), weight 400 only, letter-spacing 0, self-hosted via Fontsource (latin subset)
**Forsiden Display Font:** Anton (with sans-serif), weight 400 only, self-hosted via Fontsource (latin subset)
**Blokland Font:** Pixelify Sans (with monospace), weight 700 only, letter-spacing 0, self-hosted via Fontsource (latin subset); in Blokland it replaces both the display face and Baloo 2
**Stumfilm Display Font:** Limelight (with serif), weight 400 only, letter-spacing 0.02em, self-hosted via Fontsource (latin subset)
**Stumfilm Label Font:** Josefin Sans (with sans-serif), weight 600 only, self-hosted via Fontsource (latin subset); in Stumfilm it replaces Baloo 2
**Body Font (Samlekort, Kawaii, Forsiden):** Baloo 2 (with sans-serif), weights 600 and 800 only (self-hosted via Fontsource, latin subset)

**Character:** Samlekort pairs a chunky rounded poster face with a soft, heavy rounded sans, reading as a kids' card game. Kawaii swaps in Mochiy Pop One, a round Japanese pop face, in sentence case. Forsiden swaps in Anton, a tall condensed newsstand grotesque set in caps. Baloo 2 stays for labels so the controls feel the same in those three worlds. Blokland is the exception: Pixelify Sans, a chunky pixel face, sets every word in the world, labels included, because the controls themselves are game blocks. Stumfilm pairs Limelight, an Art Deco display face from the picture-palace era, with Josefin Sans, a geometric 1930s-style sans, for labels.

### Hierarchy
- **Display** (400, clamp(110px, 24dvh, 220px), 1): the countdown numeral; gold with a navy stroke in Samlekort, white Mochiy with a purple stroke in Kawaii, yellow Anton with an ink stroke in Forsiden; gold Pixelify with an ink stroke and a 10px hard ink step in Blokland; white Limelight with a film-black stroke in Stumfilm.
- **Headline** (400, clamp(40px, 6dvh, 60px), 1.05): result title ("Nr. 001 er klar!" / "Dit billede er klart!" / "Slut!" / "FORSIDEN ER KLAR!"); the gallery title (clamp(36px, 5dvh, 52px)), the shutter label (clamp(36px, 5.4dvh, 52px); Kawaii's longer Mochiy label at clamp(30px, 4.6dvh, 44px)) and the card-back title (clamp(40px, 7vw, 76px), rotated -6deg) sit in this band. The result line is display face at clamp(28px, 4.2dvh, 40px): cream with the power in gold (Samlekort), white with the headline on a yellow strap (Forsiden); Kawaii, Blokland and Stumfilm have no result line because the print's own bubble, banner or caption card carries it.
- **Title** (400, clamp(26px, 3dvh, 34px)): picker headings ("Korttype" / "Stickers" / "Verden" / "Ramme" / "BLAD", "Effekt" / "EFFEKT").
- **Body** (600, 20px): default weight for all running text; error and toast copy at 20px.
- **Label** (800, 24px): pills; chips at clamp(20px, 2.6dvh, 26px), clamp(15px, 1.9dvh, 19px) in portrait. Counts use tabular numerals. Labels stay sentence case in every world: Baloo 2, Josefin Sans at its one weight (600) in Stumfilm, or Pixelify Sans in Blokland, where portrait chips drop to clamp(13px, 1.65dvh, 17px) because the pixel face runs wide.
- **Start screen:** title Lilita gold clamp(44px, 7dvh, 72px); theme names clamp(28px, 4dvh, 40px), Lilita for Samlekort, Pixelify 700 for Blokland, Limelight for Stumfilm, Anton caps for Forsiden; Kawaii's Mochiy name at clamp(22px, 3.2dvh, 32px). Tile titles size to their own tile (container query on the card back): Samlekort clamp(20px, 17cqi, 76px), Kawaii clamp(18px, 15cqi, 64px), Blokland and Stumfilm clamp(18px, 14cqi, 64px), both upright.
- **Card type** (canvas, at 1000px card width): party title Lilita 78px fit-to-width, age Lilita 62px, superpower Lilita 96px fit-to-width, strength value Lilita 62px; ribbon Baloo 800 30px uppercase, "STYRKE" Baloo 800 30px uppercase, set mark Baloo 800 26px uppercase.
- **Print type** (canvas, at 1050px print width): party title Mochiy up to 92px, fit to the band, white over a 16px stroke in the set's accent; meta line (class, date, number) Baloo 800 32px, white over an 8px accent stroke; bubble phrase Mochiy up to 64px, fit to the bubble, in the set's accent.
- **Block print type** (canvas, at 1050px print width, all Pixelify Sans 700, each line with a hard ink step down and right): party title up to 104px fit to the band less 120, white, 7 step; meta line (class, date, number) 36px gold, 4 step; "LEVEL UP!" up to 104px gold, 7 step; the awarded title up to 58px white, 4 step; the pre-shot "KLAR, PARAT, START!" up to 54px white, 4 step.
- **Still type** (canvas, at 1050px print width, Stumfilm): caption Limelight up to 88px, fit to the caption box (card width less 140, height less 170) in at most 3 centred lines at line height 1.2, white; before the shot a placeholder "Lys, kamera … optagelse!" at 70%. Party line (title, badge, date, number, separated by middots, uppercase) Josefin Sans 600 30px in silver.
- **Cover type** (canvas, at 1050px cover width, all Anton): masthead up to 214px fit to the band left of the starburst; headline up to 112px, wrapped to at most 3 lines at line height 1.02, bottom-aligned, 12px ink outline; teaser up to 50px, 9px outline; starburst text up to 52px, two lines, rotated 0.2rad; issue strip and barcode price 30px.

### Named Rules
**The Caps Belong To The World Rule.** In Samlekort, uppercase appears only inside the drawn card (ribbon, stat label, set mark) as trading-card printing, and app chrome is sentence case. Kawaii is sentence case throughout, chrome and print. In Blokland, chrome is sentence case and caps belong to the printed banner only ("LEVEL UP!", "KLAR, PARAT, START!"), like a game's level screen. In Stumfilm, chrome and the caption are sentence case and caps belong to the caption card's party line only, as title-card credit lettering. In Forsiden, caps are the magazine's voice: Anton display (picker, result and gallery headings, shutter, countdown hint, theme name) and every cover line are uppercase. In every world chip and pill labels stay sentence case.

**The Stroke-Under Rule.** Display text laid over the photo or a pale frame carries a dark stroke painted under the fill (CSS paint-order: stroke fill; canvas strokeText before fillText) so it reads over any face: navy in Samlekort, purple or the set's accent in Kawaii (countdown, "Smil!", print title and meta line), ink in Forsiden (countdown, "SMIL!", every cover line), ink in Blokland (countdown, "Smil!"), film black in Stumfilm (countdown, "Smil!"). Blokland's canvas lines sit on the ink banner or stone band, not the photo, and use the One Pixel Step instead of a stroke; Stumfilm's caption sits on its black card and needs none.

## Layout

Full-viewport screens, one visible at a time, each padded by the pad token (clamp(16px, 2.4vw, 32px)) or the safe-area inset, whichever is larger. No page scroll; only the gallery binder scrolls. The picture's aspect ratio is one variable (--ratio: 5 / 7 for cards, 3 / 4 for prints, block prints, stills and covers) set on the root by the active theme and per picture on result, viewer and gallery pockets, so every layout below holds for every world.

- **Start:** title, then one pick per visible theme (gap clamp(24px, 5vw, 72px)), today four: each a 5:7 card back in its world's colours (a theme without one gets a sample picture drawn by its painter) with its name plate directly under it (16px), then a hint line and the error plate. Tiles and plates stay together, centred in the row. The pick list is built from the registry and the count of visible themes is set on it (--count), so all tiles share one size. Landscape: one row, tile height min(100dvh - 300px, (100vw - 2 x pad - (count - 1) x gap) / count x 1.4). Portrait: the picks wrap two by two (row gap clamp(20px, 3dvh, 36px)), tile height min((100dvh - 420px) / 2, (100vw - 2 x pad - gap) / 2 x 1.4). Tile titles size by container query to the tile. In landscape, hiding or adding a theme changes the count, never the layout; the portrait grid is sized for two rows, so it holds at most four visible themes.
- **Booth, landscape:** a 1fr | auto | 1fr grid. The picture fills the full row height in the middle column; frame chips stack left (six types, six sticker sets, six worlds, four ornaments or five magazines), effect chips right. Both columns are top-aligned in every theme and orientation, so the headings line up when one column has fewer chips. Row two holds the shutter under the picture and the Samling pill bottom-right.
- **Booth, portrait:** the picture spans both columns on top; the two pickers sit side by side under it as 2-column chip grids, with chip padding 0 10px 0 8px, an 8px gap and the disc at chip-h minus 26px; the shutter is centred below, and the Samling pill hides its word, keeping icon and count.
- **Result and viewer:** picture at full height on the left, a column of actions (max 520px) on the right; in portrait the picture stacks above and the actions become a 2- or 4-column row. The result screen offers only Igen! and Samling; printing lives in Samlingen (the viewer's Print and Vælg), where the adults are.
- **Gallery:** an auto | 1fr | auto header (back; title + count; Vælg, Skift tema and Del alle) over an auto-fill grid of pockets, min clamp(130px, 15vw, 190px), 22px gap; each pocket takes its picture's own ratio.
- **Choosing pictures (gallery, Vælg):** the header swaps to "N valgt" with Annuller and a primary "Print (N)"; every pocket shows a 40px round check in its top-right corner, empty on a dark wash when not chosen (picture at 75% opacity), gold with a navy tick and a 5px gold outline when chosen.
- **Print size dialog:** a navy-2 panel (28px corners) titled "Hvor stort skal det printes?" with three equal size buttons, each a little white A4 sheet showing its slots in gold (3 x 3 Lille, 2 x 2 Mellem, 1 Stor), the size name in the display face, a hint and "N billeder · N ark". Print is laid out in millimetres on A4 with no page margin, our sheet stopping 18mm short of the bottom so iPad Safari's footer has its own strip, and our own 6mm white border as padding: Lille fits each picture in 61 x 85mm (close to a real trading card), Mellem in 93 x 130mm, Stor in the whole 198 x 267mm sheet, 4mm apart, each picture keeping its own shape, never more than one sheet per page.
- **Card grid (1000 x 1400):** inner panel inset 40; content column x 72, width 856. Title row y 64 (104 tall), photo mat y 180 (700 tall) with the photo 16 inside it, ribbon y 900 (60), stats plate y 980 (300), footer y 1290 (56). DOM overlays on the photo window use the same rect in percentages (inset 14% 8.8% 38.3%).
- **Print grid (1050 x 1400):** page corner 40. Photo window x 56 y 56 (938 x 1090, corner 46, 12px white rim), title band x 56 y 1166 (938 x 178), speech bubble x 600 y 92 (370 x 228), faces zone x 170 y 340 (710 x 800). Polka dots 7px at 22% white on a 46px step, alternate rows offset half a step. Ten sticker slots: three on the top strip (150, 100 and 80 across, left of the bubble), seven straddling the side edges (88-104 across). The countdown overlay sits on the faces zone (inset 24% 16% 18.6% 16%).
- **Block grid (1050 x 1400, Blokland):** whole 70-unit blocks, 15 across and 20 down. One block of world texture frames the photo (x 70 y 70, 910 x 1050) on top and sides; the stone title band is the bottom four block rows (y 1120, 280 tall, full width); an 8-unit ink rim outlines the photo. Banner x 160 y 104 (730 x 212) across the top of the photo; faces zone x 150 y 340 (750 x 780). Eight item slots: two in the top corners beside the banner (104 across), six straddling the side edges (84-90 across). Sprites are drawn on whole pixel steps. The countdown overlay sits on the faces zone (inset 24.3% 14.3% 20% 14.3%).
- **Still grid (1050 x 1400, Stumfilm):** black page with a silver double rule round it (inset 26, 4 wide; inset 40, 1.5 wide); the ornament is drawn on the inner rule (Stråler's rays radiate from the top of the caption card, clipped to the inner rule). Still x 80 y 80 (890 x 740), square, edged by a 3-unit silver rule. Caption card x 80 y 860 (890 x 420): black, a 3-unit outer and a 1.2-unit inner silver rule (inset 12) with stepped corners at the top; caption box inset 70 at the sides and 50 at the top; an ornament rule with a centre diamond 96 above the bottom; the party line 48 above the bottom. The still and the card never overlap (tested). The countdown overlay covers the still (inset 5.7% 7.6% 41.4% 7.6%).
- **Cover grid (1050 x 1400, Forsiden):** photo full bleed. Masthead band y 0 (232 tall, full width), issue strip y 232 (52), teaser x 40 y 304 (400 x 70), starburst x 846 y 24 (184 square), headline x 40 y 1036 (760 x 324), barcode x 846 y 1214 (164 x 146). The faces zone is y 400 to 1030, full width.
- **Rhythm:** 14px is the default gap inside controls and stacks; chips gap clamp(8px, 1.3dvh, 12px); chip height is the chip-h token (clamp(56px, 7.4dvh, 84px) in portrait).

### Named Rules
**The Faces Zone Rule.** Every picture that draws over the photo declares a faces zone, and nothing drawn may enter it. On a cover it is the band y 400 to 1030, edge to edge: masthead, strip, teaser and starburst end above it, headline and barcode start below it. On a purikura print it is x 170 to 880, y 340 to 1140: stickers and the bubble stay out of it, and side stickers reach at most 60px into the photo window (54px as shipped), so kids at the edges stay visible. On a block print it is x 150 to 900, y 340 to 1120: items and the banner stay out of it, items stay off the banner and the title band, and side items reach at most 60 units into the photo (45 as shipped). All three are enforced by tests on the layout constants; the block print's tests also hold the photo and band edges to the 70-unit grid. A Stumfilm still draws nothing over the photo but its edge rule, and its caption card sits below the still (tested), so it needs no faces zone.

## Elevation & Depth

Depth is physical: pictures are lifted objects on a table, chrome is mostly flat. In Samlekort, Kawaii and Forsiden, shadows are soft, dark and downward; there are no coloured glows and no hard offsets. A card's depth comes from the 3D tilt (perspective 1400px) and the color-dodge foil layer; a cover has only a soft-light white hotspot (55% at the touch point, fading by 40%) that tracks the finger like gloss paper; a purikura print has a soft-light pastel shimmer (blush, lilac, lemon at 115deg) under a 60% white hotspot fading by 34%. Inside the print, the stickers and the bubble are printed as lifted die-cuts with a soft plum drop. Blokland builds depth from its own materials instead: blocks carry an inset bevel (lit top edge, dark bottom edge), and text and the shutter cast a hard, unblurred ink shadow one step down and right. The print itself still lifts off the table with the shared picture-lift and pocket shadows; it has no foil, no sheen and no gloss layer. Stumfilm's chrome is engraved rather than lifted: thin silver double rules drawn inside each plate, and its chosen chips do not lift. Only the shutter, the print dialog and the pictures cast soft, deep drops. Its stills have no foil, no sheen and no card back; their depth is the vignette and grain printed into the photo.

### Shadow Vocabulary
- **Picture lift** (`box-shadow: 0 24px 60px rgb(0 0 0 / 0.5)`): the live card, print or cover and the finished face; card back and start tiles at 0.45.
- **Pocket** (`box-shadow: 0 10px 24px rgb(0 0 0 / 0.4)`): pictures in the gallery grid.
- **Chosen chip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.3)`): a selected chip lifts slightly off the ground.
- **Shutter** (`box-shadow: 0 0 0 6px var(--cream), 0 16px 36px 4px rgb(0 0 0 / 0.42)`): a cream ring plus a deep drop; on press it compresses to `0 6px 16px 2px` and the button moves down 3px. Kawaii: white ring and a deep plum drop (`0 0 0 6px #ffffff, 0 16px 36px 4px rgb(60 0 70 / 0.45)`). Forsiden: white ring and a deep blue drop (`0 0 0 6px #ffffff, 0 16px 36px 4px rgb(0 30 70 / 0.4)`).
- **Toast** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.4)`).
- **Stone bevel** (Blokland, `box-shadow: inset 0 4px 0 rgb(255 255 255 / 0.12), inset 0 -5px 0 rgb(0 0 0 / 0.35)`): unselected chips and quiet pills.
- **Gold bevel** (Blokland, `box-shadow: inset 0 4px 0 rgb(255 255 255 / 0.45), inset 0 -5px 0 rgb(0 0 0 / 0.25)`): chosen chips and primary pills; the count block is flat gold.
- **Block shutter** (Blokland, `box-shadow: 0 0 0 6px var(--bl-ink), inset 0 6px 0 var(--bl-grass-light), inset 0 -8px 0 rgb(0 0 0 / 0.3), 10px 16px 0 0 rgb(0 0 0 / 0.45)`): ink ring, grass bevel and a hard drop; press moves it down 3px with no scale and no change to the drop.
- **Pixel step** (Blokland text, `text-shadow: Npx Npx 0 var(--bl-ink)`): headings 4px, start-tile title 5px, countdown numeral 10px; on canvas 7 units under 104px lines and 4 under smaller ones.
- **Title-card rule** (Stumfilm, `box-shadow: inset 0 0 0 1px var(--sf-silver), inset 0 0 0 4px var(--sf-panel), inset 0 0 0 5px rgb(201 201 201 / 0.45)`): unselected chips and quiet pills; a hairline, a gap, a fainter hairline.
- **Chosen title card** (Stumfilm, `box-shadow: inset 0 0 0 2px var(--sf-black), inset 0 0 0 4px var(--sf-white), inset 0 0 0 5px var(--sf-black)`): chosen chips and primary pills; no lift. The count block is flat white.
- **Film shutter** (Stumfilm, `box-shadow: 0 0 0 4px var(--sf-black), 0 0 0 6px var(--sf-silver), 0 16px 36px 4px rgb(0 0 0 / 0.6)`): a black then a silver ring and a deep soft drop; press as the shared shutter.
- **Film dialog** (Stumfilm, `box-shadow: inset 0 0 0 1px var(--sf-silver), 0 30px 80px rgb(0 0 0 / 0.6)`): the print-size dialog.
- **Sticker drop** (canvas, Kawaii print only): plum rgba(70, 0, 80, 0.35), blur 8% and offset 3% of the sticker size; the bubble at 0.3 alpha, blur 14, offset 5 on the 1050 grid.

### Named Rules
**The Objects-Lift Rule.** In the chrome, only pictures, the shutter, the chosen chip and the toast cast shadows. Quiet pills, unselected chips and headings sit flat on the ground. Inside a purikura print, stickers and the bubble carry the sticker drop as part of the printed object. In Blokland the bevel belongs to every block control and is not a lift; the shutter is the only control that casts a drop, and it is hard. In Stumfilm the silver rules are engraving, not lift; the shutter is the only control that casts a drop.

**The One Pixel Step Rule.** Blokland's shadows are hard ink with zero blur, offset equally right and down by one pixel step (only the shutter's drop is taller, 10px 16px). They are the world's native material and belong to Blokland only; never soften them, and never carry them into another world.

**The No Shine Rule.** Blokland has no holo foil, no sheen sweep and no gloss: the live print's sheen, the card back and the foil layer are switched off. The one exception is the start tile, which keeps the same drifting glow as the other tiles, rim included, so the three read as a set; its rim is gold with an ink inner line so the glow shimmers on it instead of muddying it. Light in the block world is the bevel and the block texture, nothing that moves over the surface.

## Shapes

Two shape families. Chrome is pills and discs in Samlekort, Kawaii and Forsiden: every button, chip and badge is fully rounded (999px or half its height), and chip icons sit in a circular disc (in Kawaii, frame-chip discs wear a 3px white ring like a die-cut). The picture carries its world's corner. Cards keep trading-card corners: 5.2% / 3.7% on the live card and card back (52px on the 1000px canvas), 5.8% / 4.1% on the image faces and pockets so the JPEG's white corners never show; inside the card, rounded rectangles step down (panel 30, stats plate 26, photo mat 20, photo 10, ribbon fully rounded). Purikura prints are soft sticker sheets: the print corner (3.8% / 2.9%, 40 on the 1050 canvas) on the live print, faces and pockets; the photo window inside is rounded 46 with a 12px white rim; stickers are die-cut silhouettes with a thick round-joined white outline; the bubble is one continuous outline, a pill-shaped balloon whose curved tail grows from its bottom edge, rimmed 8px in the set's accent. Covers are trimmed paper: a near-square 0.6% corner, square drawn elements, and a 14-point starburst; Forsiden's result headline sits on a square yellow strap. The plate radius (22px) is for message plates on the ground (the start error); the toast uses 18px.

Blokland breaks the chrome family on purpose: everything is a square block. Chips, pills, the shutter, chip discs, the count badge, the start tile, its name plate, the live print, the finished faces and the gallery pockets all have radius 0; the bevel, not a curve, gives a control its form. Chip discs are square ink wells; a world chip's disc is filled edge to edge by that world's block. On the canvas every edge is axis-aligned on the 70-unit grid and every sprite pixel is a whole step, rendered with crisp edges.

Stumfilm's chrome is title-card plates: chips, pills, the shutter, the count block, the toast and the print dialog all have near-square 2px corners, edged by thin silver double rules drawn inside. Chip discs stay circular: black wells with a 1.5px silver ring. The live print, the finished faces and the gallery pockets have radius 0, like a trimmed film still; the start tile has a 1% corner and its name plate 2px.

**The Title-Card Plate Rule.** Stumfilm chrome is near-square plates (2px) ruled in silver inside the edge; the chosen state is a white plate with a black-white-black rule. Pills or bevelled blocks in Stumfilm, or ruled plates in another world, mix the families.

**The Square Block Rule.** In Blokland nothing is rounded: radius 0 on every control and picture, with an inset bevel for form. Rounding a Blokland control, or squaring a control in any other world, mixes the families.

Icons come in three authored vector sets on a 24 x 24 grid, plus Blokland's pixel set: filled element glyphs (flame, drop, bolt, leaf, star, heart), filled sticker shapes (star, heart, sparkle, cat, paw, cloud, and sakura as one petal drawn five times), both shared by the UI and the canvas via Path2D; and stroked UI icons at one weight (2.2, round caps and joins) in currentColor, sized 1.15em. The magazine chips use stroked UI icons (star, ball, gamepad, paw, rocket); "Skift tema" uses the palette icon. Stumfilm's frame chips use stroked UI icons drawn for its ornaments (klassisk, vifte, stråler, perler), and Kontrast and Blød have their own stroked icons. Blokland's set is our own pixel drawings, one character per pixel: sprites (gem, coin, cake, star, torch, snowflake) and the 10 x 10 world blocks, shared by the chips (as crisp-edged SVG) and the canvas. Blokland's effect chips keep the stroked UI icons at 1.5em.

## Components

### Buttons
Big, rounded and squashy; everything presses in. In Blokland, big square blocks that push down.
- **Shape:** fully rounded pill (999px); square (0) with a bevel in Blokland.
- **Shutter (primary capture):** height clamp(84px, 13dvh, 120px), min width min(100%, 340px), 6px outer ring, icon + display-face label. Samlekort: magenta, navy Lilita, cream ring. Kawaii: hot pink, white Mochiy, white ring. Blokland: grass green block, white Pixelify, ink ring, lit top bevel and a hard drop; press only moves it down 3px. Forsiden: red, white Anton caps, white ring. Stumfilm: white plate (2px), black Limelight, black then silver ring and a deep drop. A small variant is 84px tall at 38px type (result "Igen!", empty-gallery call). Press: translateY(3px) scale(0.98), shadow compresses, 0.12s.
- **Pill:** 72px tall, Baloo 800 label, icon + word. Gold with navy (Samlekort), white with purple (Kawaii), gold with ink and the gold bevel (Blokland), yellow with ink (Forsiden), white with black and the chosen title-card rule (Stumfilm, Josefin Sans). Press: scale(0.96). Disabled: 40% opacity.
- **Quiet pill:** translucent fill, light text (solid stone with the stone bevel in Blokland, solid panel with the silver title-card rule in Stumfilm); navigation and secondary actions (Samling, Tilbage, Skift tema, Del alle, Luk).
- **Danger pill:** two-tap delete, same in every world. Rests as a coral tint; the first tap arms it to solid coral with navy text and the label "Tryk igen for at slette".
- **Focus:** 4px solid outline, 4px offset, on every button: cyan in Samlekort and Forsiden, lemon in Kawaii, gold in Blokland, white in Stumfilm.

### Chips
- **Style:** pill of chip-h height, translucent fill, Baloo 800 label, a circular disc on the left at chip-h minus 20px (minus 26px in portrait). Type chips fill the disc with their type pair at 160deg; sticker-set chips with the set's frame pair at 160deg, a filled sticker shape and a 3px white ring; magazine chips flat with the band colour and its band ink; Blokland world chips are square stone blocks with the stone bevel and a square ink disc filled by the world's block; Stumfilm chips are panel plates with the silver title-card rule, a Josefin Sans label and a circular black disc with a silver ring and a white stroked icon; effect chips use a translucent disc with a stroked icon (in Blokland an ink well with a white icon).
- **State:** selected chips turn gold/navy (Samlekort), white/purple (Kawaii) or yellow/ink (Forsiden) and lift (chosen-chip shadow), or gold/ink with the gold bevel and no lift (Blokland), or a white plate with black text and the chosen title-card rule and no lift, the disc staying black (Stumfilm); effect discs invert to navy with a gold icon, or ink with a yellow icon (gold icon in Blokland). Selection plays a spring pick (scale 0.9 to 1, 0.45s, cubic-bezier(0.3, 1.6, 0.5, 1)); press scales to 0.96.
- **Effect list:** the effect chips come from the theme. The default six are Normal, Holo, Pixel, Tegneserie, Pop and Spejl; a theme may name its own list from the full set, which adds Kontrast (a tanh S-curve, darks darker, lights lighter, mid grey kept) and Blød (soft focus: a fifth-size copy at 65% over the sharp picture). Stumfilm offers Normal, Kontrast, Blød, Tegneserie, Spejl and Pixel, because Holo and Pop are colour. Changing theme to one that lacks the chosen effect falls back to Normal.

### Cards / Containers
- **Corner Style:** the world's picture corner (see Shapes).
- **Background:** card: canvas-drawn gold stock (diagonal gradient #ffe46b, #f5b800, #ffd84a) under 55px foil bands at 50% alpha, then the type panel. Print: the set's frame gradient with polka dots. Block print: the world's textured blocks round the photo and a stone band below. Still: the black page, its silver frame and the caption card. Cover: the full-bleed photo.
- **Shadow Strategy:** picture lift (see Elevation).
- **Card back:** a navy-2/navy-3 pinwheel (10deg slices) with a faint gold ring, double gold inset border, Lilita gold title rotated -6deg, and a slow foil drift (9s) in color-dodge at 22%. Prints, block prints, stills and covers have no back.

### Theme Pick (start screen)
Each visible theme is offered as a sunburst card back with its name set across it, four today: Samlekort in navy rays inside a gold rim with gold Lilita, Kawaii in violet (#a43be0) and magenta (#e0268a) rays inside a white rim with a pink inner line and white Mochiy, Blokland in grass rays (#4caf3a, #2f8424) with a faint gold ring inside a gold rim with an ink inner line, square-cornered, with the same foil drift as the other tiles and an upright gold Pixelify title on a 5px ink step, Stumfilm in grey rays (#2b2b2b, #101010) with a faint silver ring inside a silver rim (#d6d6d6) with a black inner line, 1% corners, greyscale-filtered so the foil drift turns silver, and an upright white Limelight title over a soft black shadow. All four tiles are 5:7 and share one size (see Layout); each title sizes to its tile. A theme without a card back would get a sample tile drawn by its painter (the hidden Forsiden still has one). Below each, a name pill in the world's voice: gold/navy Lilita, hot pink/white Mochiy (Kawaii), a square grass-green plate with white Pixelify (Blokland), a white 2px plate with black Limelight (Stumfilm), or red/white Anton caps (Forsiden, while hidden not shown). The whole pick presses to scale(0.97). No tile is marked as chosen or last used; every tile starts its theme on the first tap.

### Navigation
No nav bar. Screens are switched by big pills: Samling (quiet pill with a count badge, 40px, tabular numerals; a flat square gold block in Blokland, a flat white plate in Stumfilm) bottom right and Skift tema (quiet pill, back arrow) bottom left in the booth, both icon-only in portrait and both disabled during the countdown; Tilbage, Skift tema and Del alle in the gallery header; the viewer is a full-screen dialog over a navy backdrop at 88%.

### Holo Card (Samlekort signature)
The live card shows the camera mirrored in its photo window with the chosen effect, and a specular sweep (cyan, white, magenta, lemon band at 105deg, overlay blend, 4.5s) crosses the card stock, masked out of the photo window. After capture a white flash (0.7s) fires and the card flips in from its back (1.25s, cubic-bezier(0.25, 1.25, 0.4, 1)) while the foil flashes across. On the result and in the viewer the card rests tilted (rotateX 4deg, rotateY -7deg); touching it tilts toward the finger and raises the foil layer from 32% to 50% opacity, with a radial white hotspot at the touch point.

### Purikura Print (Kawaii signature)
The live print shows the camera in its rounded window under the set's stickers, with the bubble holding three little pink heart stickers until the shot. A sparkle glint (white then blush band at 105deg, on the 4.5s sweep cycle) runs over the frame only, masked by an SVG with the photo window's own rounded corners cut out. After capture the print pops in like a sticker being slapped down: from scale(0.3) rotate(-14deg), fading in by 35%, on the reveal's 1.25s curve; the bubble now holds the surprise phrase, never the same one twice in a row. It tilts under the finger with the pastel shimmer instead of foil.

### Block Print (Blokland signature)
The live print shows the camera in its photo window inside the chosen world's blocks, an ink rim, eight pixel items, and a half-height ink banner reading "KLAR, PARAT, START!". There is no sweep over it. After capture the print drops in block by block: from translateY(-60%), opaque by 10%, in ten hard steps over 0.9s (steps(10, end)). The banner then grows to full height with "LEVEL UP!" and a title from the list (Mester-bygger, Diamant-finder, Kage-kriger and so on), never the same one twice in a row.

**The Ten-Step Drop Rule.** Blokland motion is stepped, never eased: the reveal is one drop in ten hard steps. Smooth curves, flips and pops belong to the other worlds.

### Film Still (Stumfilm signature)
The live print shows the camera through the chosen effect and then the film finish, inside the silver frame, with the caption card's placeholder line under it; the grain moves frame to frame. The film finish (applied to the photo after every effect, live and in the JPEG): luma grey, contrast 1.15 about mid grey, a vignette darkening the corners by up to 55% (quadratic in the distance from centre), grain of up to ±17 levels, a flicker of ±3% per frame and, in half the frames, one bright vertical scratch; each frame is seeded by its time, so the same frame always gets the same grain. There is no sweep over the still. After capture the still opens with an iris (clip-path circle from 0% to 110% at 50% 32%, 1.3s, cubic-bezier(0.3, 0, 0.2, 1)), and the caption card now says a line from the list ("Og så kom kagen …", "Pludselig: en ballon!" and so on), never the same one twice in a row.

### Magazine Cover (Forsiden signature, hidden)
The live cover shows the camera full bleed under the drawn overlay: band-coloured masthead with the magazine name, black issue strip, teaser top left, yellow starburst top right, and a placeholder headline bottom left until the shot is taken. A white gloss band sweeps the masthead only, on the same 4.5s cycle. After capture the cover drops from translateY(-30%) rotate(-7deg) scale(1.08), fading in by 45%, on the reveal's 1.25s curve. Saved covers keep rendering in the gallery and viewer while the theme is hidden.

### Countdown
A progress ring (stroke 7 on a 100 viewBox, round cap, over a 35% navy track) fills over the countdown budget; the numeral pops in each second (scale 1.7 to 1, 0.6s) and "Smil!" sits in stroked display type. Samlekort: gold ring and numeral inside the photo window, cream "Smil!" top-left. Kawaii: white numeral over the faces zone, lemon "Smil!". Blokland: gold numeral with an ink stroke and a 10px ink step over the faces zone, white "Smil!", and a fresh-grass ring with square ends. Stumfilm: an old film leader over the still: a crosshair of 2px white lines at 55% on a 25% black wash, a 40deg white hand at 28% sweeping round once a second, a thin white track ring (stroke 2 at 70%) filled by a stroke-4 white ring, and a white numeral with a black stroke; white "Smil!" at the bottom. Forsiden: yellow ring and numeral over the middle of the cover, white "SMIL!" below the ring. The pickers, shutter and Samling dim to 20% and stop taking touches while it runs.

## Do's and Don'ts

### Do:
- **Do** keep the picture the largest object on any screen, at its world's ratio (5:7 card, 3:4 print, block print, still or cover), with the 0 24px 60px picture-lift shadow.
- **Do** draw anything that belongs to the picture on its canvas grid (1000 x 1400 card, 1050 x 1400 print, still or cover) so preview, JPEG and print match.
- **Do** add a new world as a theme: a registry entry with its own frames, shutter label and surprise, a painter, and a `data-theme` block that re-skins the shared components rather than forking them.
- **Do** give a theme its own effect list when default effects contradict its world, and a painter post finish when every picture in it must share one material, as Stumfilm does with black-and-white film stock; test that the finish holds for every effect it offers.
- **Do** retire a world from the start screen with the registry's hidden flag; keep its painter and styles so the pictures already saved in it still render.
- **Do** mark the chosen option in the world's chosen colour with dark text: gold/navy in Samlekort, white/purple in Kawaii, gold/ink in Blokland, yellow/ink in Forsiden, white/black in Stumfilm; keep the shutter colour for the capture pill and the theme's name pill only.
- **Do** pair every control word with an authored icon: filled element glyphs, filled sticker shapes, stroked UI icons at 2.2, or Blokland's pixel sprites and world blocks.
- **Do** put new controls in pills or chips of at least 72px height, with press-scale feedback; in Blokland, square blocks with the inset bevel; in Stumfilm, near-square plates with the silver title-card rule.
- **Do** stroke display text in the world's dark (navy, purple or the set's accent, ink, film black) whenever it sits on the photo or a pale frame.
- **Do** declare a faces zone for any picture that draws over the photo, and test that nothing drawn enters it.
- **Do** keep every Blokland drawing on the 70-unit block grid and on whole sprite pixels, with a hard one-step ink shadow under its text.
- **Do** offer every visible theme as a tile of one shared size (--count) whose title sizes to the tile, with its name plate directly under it; two by two in portrait.

### Don't:
- **Don't** use uppercase or small tracked captions in Samlekort, Kawaii, Blokland or Stumfilm chrome; caps in Samlekort belong only to card furniture, in Blokland only to the printed banner, in Stumfilm only to the caption card's party line. In Forsiden, caps go on Anton display, never on Baloo labels.
- **Don't** add hard offset shadows in Samlekort, Kawaii, Stumfilm or Forsiden, or coloured glows in any world; depth there is soft dark lift, the foil layer, the gloss hotspot, the pastel shimmer or the printed sticker drop. Hard one-step ink shadows and inset bevels are Blokland's own material and stay in Blokland.
- **Don't** introduce square or slightly rounded rectangles in the chrome of Samlekort, Kawaii or Forsiden; chrome there is pills and discs. Square forms belong to the cover itself, its printed result strap, the whole Blokland world, where nothing is rounded, and Stumfilm's near-square title-card plates.
- **Don't** animate chrome beyond press-scale, the chip pick, the countdown and the result panel's rise-in (0.6s after the reveal); ambient motion belongs to the picture (foil on cards, sparkle glints on the print frame, masthead gloss on covers, film grain and flicker inside stills; none on block prints).
- **Don't** let a frame colour carry light ink when the colour is light (see The Declared Ink Rule).
- **Don't** mix worlds inside one picture: no foil or sheen on covers, prints or block prints, no Anton, Mochiy or Pixelify on cards, no stickers on cards, covers or block prints, no eased or flipping reveal for a block print, no colour, sepia or foil in a still or its chrome, no Limelight or Josefin Sans outside Stumfilm.
- **Don't** borrow a real game's name, logo, characters, textures or on-screen look for Blokland; its blocks, sprites and titles are our own.
- **Don't** let a sticker, item, banner, bubble or cover line reach into a faces zone, or a side sticker or item more than 60px into the photo window.
