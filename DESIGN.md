---
name: Fotoboksen
description: A party photobooth that turns every photo into your own holo trading card or a purikura sticker-photo.
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
rounded:
  pill: "999px"
  card: "5.2% / 3.7%"
  cover: "0.6%"
  print: "3.8% / 2.9%"
  photo-window: "46px"
  plate: "22px"
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
---

# Design System: Fotoboksen

## Overview

**Creative North Star: "The Collector's Binder"**

**Kawaii North Star: "The Purikura Sticker Booth"**

**Forsiden North Star (hidden): "This Week's Cover"**

Fotoboksen has three worlds on one skeleton. The start screen offers every theme whose registry entry is not marked hidden: today Samlekort and Kawaii. Forsiden is hidden from the picker (2026-11-10): its code, painter and styles stay, every cover already saved still renders in the gallery and viewer, and a remembered preference for a hidden theme falls back to Samlekort. The choice sets `data-theme` (kort, kawaii or forside) on the body, and the booth, result, gallery and viewer keep the same structure, controls and motion grammar while ground, accent, display face and picture object change. Every saved picture remembers its own theme, so the gallery holds cards, prints and covers side by side, each drawn in its own world; pictures from before themes existed are cards. The last-picked theme is ringed on the start screen; "Skift tema" in the booth (bottom left) and in the gallery header returns there, and the camera keeps running.

**Samlekort.** Every photo is minted as a holo trading card, and the whole app is the binder the card lives in. The ground is deep binder navy; the objects on it are gold card stock, holo foil and cream plates. The live camera is not a viewfinder but the art window of an upright 5:7 card. Everything on the card (gold stock, type-coloured panel, cream mat, navy ribbon, cream stats plate) is drawn on canvas on a fixed 1000 x 1400 grid, so preview, JPEG and print are the same object. Motion belongs to the card: a foil sweep on the live card, a 3D flip reveal, tilt and a finger-tracked foil highlight on the finished card.

**Kawaii.** Every photo prints as a Japanese purikura sticker-photo. The ground is a purple-to-magenta gradient under white polka dots; the print is a 3:4 page in the chosen sticker set's two-colour gradient, dotted, with the photo in a rounded white-rimmed window, die-cut stickers on the top strip and straddling the side edges, a white speech bubble top right and a title band below. Stickers are original shapes (star, heart, sparkle, cat, paw, sakura, cloud), each a thick white die-cut with a gloss dot, and the big ones wear a tiny face (dot eyes, smile, blush). The whole print is drawn on a 1050 x 1400 canvas grid by the same code for the live preview and the saved JPEG. Motion: sparkle glints that run over the frame only, and a reveal where the print pops down like a slapped sticker; the bubble then shows its surprise phrase.

**Forsiden (hidden from the picker).** Every photo is this week's magazine cover. The ground is saturated newsstand cyan; the photo runs full bleed on a 3:4 cover under a solid masthead band in the chosen magazine's colour, a black issue strip, and white Anton cover lines with a heavy black outline. A yellow starburst sticker and a barcode box finish the newsstand. The overlay is drawn on a 1050 x 1400 canvas grid. Motion: a gloss that sweeps the masthead only, and a reveal where the cover drops onto the table.

Shared by all: low density and huge controls, two columns of fat chips flanking the picture, one big shutter pill under it, every control word backed by an authored icon; chrome only answers touches with a press-scale and a springy pick.

**Key Characteristics:**
- One skeleton, three worlds, switched by `data-theme` on the body and on each saved picture; the picker shows only themes not marked hidden.
- The picture (5:7 card, 3:4 print or cover) is the largest object on every screen except the gallery grid.
- Samlekort: navy ground, gold and cream objects, magenta reserved for the capture pill; Lilita One display.
- Kawaii: purple-to-magenta dotted ground, white for chosen with purple ink, hot pink for the capture pill; Mochiy Pop One display; die-cut stickers with faces.
- Forsiden (hidden): cyan ground, yellow for chosen, red for the capture pill, ink outlines; Anton display in caps.
- Pills and discs everywhere in the chrome in every world; the picture carries the world's corner.

## Colors

Three saturated toy palettes. Samlekort: gold and cream on near-black navy with a foil trio. Kawaii: white and hot pink on a plum-to-magenta ground, with a pastel sticker palette. Forsiden: yellow, red, ink and white on newsstand cyan, plus five magazine band colours.

### Primary
- **Card-Stock Gold** (gold): Samlekort selected chips, primary pills, all screen headings, the countdown numeral, count badges and the gold border of the card back. The colour of "this one is chosen". Also the start-screen title and the Samlekort name pill.
- **Stock Shadow Gold** (gold-deep): the inner second ring of the card-back border only.
- **Paper White** (paper-white) as Kawaii's chosen colour: selected chips and primary pills are white with Purikura Purple text (10.9:1).
- **Sticker Yellow** (mag-yellow): Forsiden's "chosen" colour: selected chips, primary pills, the count badge, the countdown numeral and ring, the starburst sticker, and the flat strap behind the headline on the result screen. Always with ink text (14.9:1).

### Secondary
- **Shutter Magenta** (magenta): the Samlekort capture pill ("Tag kort!", "Igen!", "Tag det første!") and text selection. Navy text on it (5.7:1).
- **Purikura Hot Pink** (kw-pink): the Kawaii capture pill ("Tag billede!") with white Mochiy Pop One (3.3:1, display size only) and the Kawaii name pill on the start screen. The shipped build also uses it on the Samling count badge, the chosen effect-chip disc and the countdown ring; those three uses diverge from The One Shutter Colour Rule and are not part of the system.
- **Masthead Red** (mag-red): the Forsiden capture pill ("TAG FORSIDEN!") with white Anton (3.7:1, display size only), the Forsiden name pill, and the Stjerne magazine band.

### Tertiary
- **Foil Cyan, Foil Magenta, Foil Lemon** (cyan, magenta, lemon): the holo trio. Used together as the 115deg foil gradient on card backs and finished cards, as the specular sheen on the live card, and as 50%-alpha diagonal bands across the gold stock on canvas. Cyan alone is the focus ring in Samlekort and Forsiden; lemon is the focus ring and the "Smil!" hint in Kawaii.
- **Type pairs** (ild, vand, lyn, jungle, galakse, slik; each -light and -dark): the inner card panel runs a vertical gradient from -dark (top) to -light (bottom), scattered with its element glyph at 20% alpha; the type-chip disc uses the same pair at 160deg. -dark also fills the title-row badge glyph and the strength bar.
- **Sticker palette** (sticker-pink, lilac, blush, mint, sky, lemon, paper-white): the fills of the die-cut stickers. Blush and lilac also run with lemon in the pastel soft-light shimmer on the finished print.
- **Sticker-set frames**: each of the six sets (Stjerner, Hjerter, Kattekat, Sakura, Skyer, Blanding) declares a top and bottom frame colour for the print's vertical gradient, which the set's chip disc repeats at 160deg, and an accent (a deep plum, berry or indigo) that strokes the title, rims the bubble and colours its phrase.
- **Magazine bands** (Stjerne mag-red, sport-band, gamer-band, dyr-band, rum-band): one flat colour per magazine, filling the masthead band and that magazine's chip disc. Each declares its own band ink: white on Stjerne, Sport and Gamer; ink on Dyreliv; yellow on Rummet.

### Neutral
- **Binder Navy** (navy): Samlekort ground, text on gold/magenta/cream, the card's photo-window backing and ribbon. Also the start-screen ground and the theme colour.
- **Binder Navy Raised** (navy-2, navy-3): the radial glow at the top of the ground, the card-back pinwheel, default type-chip discs, scrollbar thumb.
- **Plate Cream** (cream): body text on navy, the card's photo mat and stats plate, the shutter's outer ring, the toast, the last-used ring on the start screen.
- **Purikura Ground** (kw-ground-top, kw-ground-mid, kw-ground-bottom): the Kawaii ground, a 150deg gradient from plum through berry to magenta under two offset grids of 5px white dots at 12% on a 44px step.
- **Purikura Purple** (kw-purple): text on white chips and pills, the stroke under the countdown numeral and hint, the ground's fallback colour.
- **Sticker Face Ink** (face-ink): the eyes and smile drawn on big stickers; blush is pink at 55%.
- **Newsstand Cyan** (mag-ground): Forsiden ground, under a radial glow that lightens to #1aa6e6 at 50% 30%.
- **Cover Ink** (mag-ink): the issue strip, every cover-line outline, the starburst outline, barcode bars, text on yellow, the countdown stroke, the selected effect-chip disc.
- **Paper White** (paper-white): Kawaii and Forsiden text and headings, the Kawaii shutter ring, photo-window rim, sticker die-cut and bubble; Forsiden cover-line fill, barcode box and shutter ring.
- **Warning Coral** (danger): the armed state of delete only, in every world; its resting state is a 16% tint with #ffb3aa text.
- Quiet surfaces are translucent, not tokens: white at 8-10% over navy (Samlekort), white at 14-16% over the purikura ground (Kawaii), deep blue rgb(0 40 80) at 22-25% over cyan (Forsiden).

### Named Rules
**The One Shutter Colour Rule.** Each world has exactly one solid capture colour: magenta in Samlekort, hot pink in Kawaii, red in Forsiden. It fills only the capture pill and, in Kawaii and Forsiden, the theme's name pill on the start screen. Everything else that is chosen or primary is gold (Samlekort), white with purple ink (Kawaii) or yellow with ink (Forsiden).

**The Declared Ink Rule.** Every frame option declares the ink that reads on its colour. Lyn is the only light card type: its ink, glyph and footer flip to navy. Magazine bands declare bandInk (white, ink or yellow). Any new type, magazine or sticker set with a light colour must declare a dark ink the same way.

## Typography

**Samlekort Display Font:** Lilita One (with sans-serif), weight 400 only
**Kawaii Display Font:** Mochiy Pop One (with sans-serif), weight 400 only, letter-spacing 0, self-hosted via Fontsource (latin subset)
**Forsiden Display Font:** Anton (with sans-serif), weight 400 only, self-hosted via Fontsource (latin subset)
**Body Font (all):** Baloo 2 (with sans-serif), weights 600 and 800 only (self-hosted via Fontsource, latin subset)

**Character:** Samlekort pairs a chunky rounded poster face with a soft, heavy rounded sans, reading as a kids' card game. Kawaii swaps in Mochiy Pop One, a round Japanese pop face, in sentence case. Forsiden swaps in Anton, a tall condensed newsstand grotesque set in caps. Baloo 2 stays for labels so the controls feel the same in every world.

### Hierarchy
- **Display** (400, clamp(110px, 24dvh, 220px), 1): the countdown numeral; gold with a navy stroke in Samlekort, white Mochiy with a purple stroke in Kawaii, yellow Anton with an ink stroke in Forsiden.
- **Headline** (400, clamp(40px, 6dvh, 60px), 1.05): result title ("Nr. 001 er klar!" / "Dit billede er klart!" / "FORSIDEN ER KLAR!"); the gallery title (clamp(36px, 5dvh, 52px)), the shutter label (clamp(36px, 5.4dvh, 52px); Kawaii's longer Mochiy label at clamp(30px, 4.6dvh, 44px)) and the card-back title (clamp(40px, 7vw, 76px), rotated -6deg) sit in this band. The result line is display face at clamp(28px, 4.2dvh, 40px): cream with the power in gold (Samlekort), white with the headline on a yellow strap (Forsiden); Kawaii has no result line because the print's own bubble carries the phrase.
- **Title** (400, clamp(26px, 3dvh, 34px)): picker headings ("Korttype" / "Stickers" / "BLAD", "Effekt" / "EFFEKT").
- **Body** (600, 20px): default weight for all running text; error and toast copy at 20px.
- **Label** (800, 24px): pills; chips at clamp(20px, 2.6dvh, 26px), clamp(15px, 1.9dvh, 19px) in portrait. Counts use tabular numerals. Labels stay Baloo 2 sentence case in every world.
- **Start screen:** title Lilita gold clamp(44px, 7dvh, 72px); theme names clamp(28px, 4dvh, 40px), Lilita for Samlekort, Anton caps for Forsiden; Kawaii's Mochiy name at clamp(22px, 3.2dvh, 32px).
- **Card type** (canvas, at 1000px card width): party title Lilita 78px fit-to-width, age Lilita 62px, superpower Lilita 96px fit-to-width, strength value Lilita 62px; ribbon Baloo 800 30px uppercase, "STYRKE" Baloo 800 30px uppercase, set mark Baloo 800 26px uppercase.
- **Print type** (canvas, at 1050px print width): party title Mochiy up to 92px, fit to the band, white over a 16px stroke in the set's accent; meta line (class, date, number) Baloo 800 32px, white over an 8px accent stroke; bubble phrase Mochiy up to 64px, fit to the bubble, in the set's accent.
- **Cover type** (canvas, at 1050px cover width, all Anton): masthead up to 214px fit to the band left of the starburst; headline up to 112px, wrapped to at most 3 lines at line height 1.02, bottom-aligned, 12px ink outline; teaser up to 50px, 9px outline; starburst text up to 52px, two lines, rotated 0.2rad; issue strip and barcode price 30px.

### Named Rules
**The Caps Belong To The World Rule.** In Samlekort, uppercase appears only inside the drawn card (ribbon, stat label, set mark) as trading-card printing, and app chrome is sentence case. Kawaii is sentence case throughout, chrome and print. In Forsiden, caps are the magazine's voice: Anton display (picker, result and gallery headings, shutter, countdown hint, theme name) and every cover line are uppercase. In every world Baloo labels on chips and pills stay sentence case.

**The Stroke-Under Rule.** Display text laid over the photo or a pale frame carries a dark stroke painted under the fill (CSS paint-order: stroke fill; canvas strokeText before fillText) so it reads over any face: navy in Samlekort, purple or the set's accent in Kawaii (countdown, "Smil!", print title and meta line), ink in Forsiden (countdown, "SMIL!", every cover line).

## Layout

Full-viewport screens, one visible at a time, each padded by the pad token (clamp(16px, 2.4vw, 32px)) or the safe-area inset, whichever is larger. No page scroll; only the gallery binder scrolls. The picture's aspect ratio is one variable (--ratio: 5 / 7 for cards, 3 / 4 for prints and covers) set on the root by the active theme and per picture on result, viewer and gallery pockets, so every layout below holds for every world.

- **Start:** title, then one pick per visible theme side by side (gap clamp(24px, 5vw, 72px)), each a full-height picture (the Samlekort card back; for the others a sample picture drawn live by that theme's painter over a drawn party scene) over its name pill, then a hint line and the error plate. The pick list is built from the registry, so hiding a theme removes its door without touching layout.
- **Booth, landscape:** a 1fr | auto | 1fr grid. The picture fills the full row height in the middle column; frame chips stack left (six types, six sticker sets or five magazines), effect chips right, vertically centred. Row two holds the shutter under the picture and the Samling pill bottom-right.
- **Booth, portrait:** the picture spans both columns on top; the two pickers sit side by side under it as 2-column chip grids, with chip padding 0 10px 0 8px, an 8px gap and the disc at chip-h minus 26px; the shutter is centred below, and the Samling pill hides its word, keeping icon and count.
- **Result and viewer:** picture at full height on the left, a column of actions (max 520px) on the right; in portrait the picture stacks above and the actions become a 2- or 4-column row.
- **Gallery:** an auto | 1fr | auto header (back; title + count; Skift tema and Del alle) over an auto-fill grid of pockets, min clamp(130px, 15vw, 190px), 22px gap; each pocket takes its picture's own ratio.
- **Card grid (1000 x 1400):** inner panel inset 40; content column x 72, width 856. Title row y 64 (104 tall), photo mat y 180 (700 tall) with the photo 16 inside it, ribbon y 900 (60), stats plate y 980 (300), footer y 1290 (56). DOM overlays on the photo window use the same rect in percentages (inset 14% 8.8% 38.3%).
- **Print grid (1050 x 1400):** page corner 40. Photo window x 56 y 56 (938 x 1090, corner 46, 12px white rim), title band x 56 y 1166 (938 x 178), speech bubble x 600 y 92 (370 x 228), faces zone x 170 y 340 (710 x 800). Polka dots 7px at 22% white on a 46px step, alternate rows offset half a step. Ten sticker slots: three on the top strip (150, 100 and 80 across, left of the bubble), seven straddling the side edges (88-104 across). The countdown overlay sits on the faces zone (inset 24% 16% 18.6% 16%).
- **Cover grid (1050 x 1400, Forsiden):** photo full bleed. Masthead band y 0 (232 tall, full width), issue strip y 232 (52), teaser x 40 y 304 (400 x 70), starburst x 846 y 24 (184 square), headline x 40 y 1036 (760 x 324), barcode x 846 y 1214 (164 x 146). The faces zone is y 400 to 1030, full width.
- **Rhythm:** 14px is the default gap inside controls and stacks; chips gap clamp(8px, 1.3dvh, 12px); chip height is the chip-h token (clamp(56px, 7.4dvh, 84px) in portrait).

### Named Rules
**The Faces Zone Rule.** Every picture that draws over the photo declares a faces zone, and nothing drawn may enter it. On a cover it is the band y 400 to 1030, edge to edge: masthead, strip, teaser and starburst end above it, headline and barcode start below it. On a purikura print it is x 170 to 880, y 340 to 1140: stickers and the bubble stay out of it, and side stickers reach at most 60px into the photo window (54px as shipped), so kids at the edges stay visible. Both are enforced by tests on the layout constants.

## Elevation & Depth

Depth is physical: pictures are lifted objects on a table, chrome is mostly flat. Shadows are soft, dark and downward; there are no coloured glows and no hard offsets. A card's depth comes from the 3D tilt (perspective 1400px) and the color-dodge foil layer; a cover has only a soft-light white hotspot (55% at the touch point, fading by 40%) that tracks the finger like gloss paper; a purikura print has a soft-light pastel shimmer (blush, lilac, lemon at 115deg) under a 60% white hotspot fading by 34%. Inside the print, the stickers and the bubble are printed as lifted die-cuts with a soft plum drop.

### Shadow Vocabulary
- **Picture lift** (`box-shadow: 0 24px 60px rgb(0 0 0 / 0.5)`): the live card, print or cover and the finished face; card back and start tiles at 0.45.
- **Pocket** (`box-shadow: 0 10px 24px rgb(0 0 0 / 0.4)`): pictures in the gallery grid.
- **Chosen chip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.3)`): a selected chip lifts slightly off the ground.
- **Shutter** (`box-shadow: 0 0 0 6px var(--cream), 0 16px 36px 4px rgb(0 0 0 / 0.42)`): a cream ring plus a deep drop; on press it compresses to `0 6px 16px 2px` and the button moves down 3px. Kawaii: white ring and a deep plum drop (`0 0 0 6px #ffffff, 0 16px 36px 4px rgb(60 0 70 / 0.45)`). Forsiden: white ring and a deep blue drop (`0 0 0 6px #ffffff, 0 16px 36px 4px rgb(0 30 70 / 0.4)`).
- **Toast** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.4)`).
- **Sticker drop** (canvas, Kawaii print only): plum rgba(70, 0, 80, 0.35), blur 8% and offset 3% of the sticker size; the bubble at 0.3 alpha, blur 14, offset 5 on the 1050 grid.

### Named Rules
**The Objects-Lift Rule.** In the chrome, only pictures, the shutter, the chosen chip and the toast cast shadows. Quiet pills, unselected chips and headings sit flat on the ground. Inside a purikura print, stickers and the bubble carry the sticker drop as part of the printed object.

## Shapes

Two shape families. Chrome is pills and discs in every world: every button, chip and badge is fully rounded (999px or half its height), and chip icons sit in a circular disc (in Kawaii, frame-chip discs wear a 3px white ring like a die-cut). The picture carries its world's corner. Cards keep trading-card corners: 5.2% / 3.7% on the live card and card back (52px on the 1000px canvas), 5.8% / 4.1% on the image faces and pockets so the JPEG's white corners never show; inside the card, rounded rectangles step down (panel 30, stats plate 26, photo mat 20, photo 10, ribbon fully rounded). Purikura prints are soft sticker sheets: the print corner (3.8% / 2.9%, 40 on the 1050 canvas) on the live print, faces and pockets; the photo window inside is rounded 46 with a 12px white rim; stickers are die-cut silhouettes with a thick round-joined white outline; the bubble is one continuous outline, a pill-shaped balloon whose curved tail grows from its bottom edge, rimmed 8px in the set's accent. Covers are trimmed paper: a near-square 0.6% corner, square drawn elements, and a 14-point starburst; Forsiden's result headline sits on a square yellow strap. The plate radius (22px) is for message plates on the ground (the start error); the toast uses 18px.

Icons come in three authored sets on a 24 x 24 grid: filled element glyphs (flame, drop, bolt, leaf, star, heart), filled sticker shapes (star, heart, sparkle, cat, paw, cloud, and sakura as one petal drawn five times), both shared by the UI and the canvas via Path2D; and stroked UI icons at one weight (2.2, round caps and joins) in currentColor, sized 1.15em. The magazine chips use stroked UI icons (star, ball, gamepad, paw, rocket); "Skift tema" uses the palette icon.

## Components

### Buttons
Big, rounded and squashy; everything presses in.
- **Shape:** fully rounded pill (999px).
- **Shutter (primary capture):** height clamp(84px, 13dvh, 120px), min width min(100%, 340px), 6px outer ring, icon + display-face label. Samlekort: magenta, navy Lilita, cream ring. Kawaii: hot pink, white Mochiy, white ring. Forsiden: red, white Anton caps, white ring. A small variant is 84px tall at 38px type (result "Igen!", empty-gallery call). Press: translateY(3px) scale(0.98), shadow compresses, 0.12s.
- **Pill:** 72px tall, Baloo 800 label, icon + word. Gold with navy (Samlekort), white with purple (Kawaii), yellow with ink (Forsiden). Press: scale(0.96). Disabled: 40% opacity.
- **Quiet pill:** translucent fill, light text; navigation and secondary actions (Samling, Tilbage, Skift tema, Del alle, Luk).
- **Danger pill:** two-tap delete, same in every world. Rests as a coral tint; the first tap arms it to solid coral with navy text and the label "Tryk igen for at slette".
- **Focus:** 4px solid outline, 4px offset, on every button: cyan in Samlekort and Forsiden, lemon in Kawaii.

### Chips
- **Style:** pill of chip-h height, translucent fill, Baloo 800 label, a circular disc on the left at chip-h minus 20px (minus 26px in portrait). Type chips fill the disc with their type pair at 160deg; sticker-set chips with the set's frame pair at 160deg, a filled sticker shape and a 3px white ring; magazine chips flat with the band colour and its band ink; effect chips use a translucent disc with a stroked icon.
- **State:** selected chips turn gold/navy (Samlekort), white/purple (Kawaii) or yellow/ink (Forsiden) and lift (chosen-chip shadow); effect discs invert to navy with a gold icon, or ink with a yellow icon. Selection plays a spring pick (scale 0.9 to 1, 0.45s, cubic-bezier(0.3, 1.6, 0.5, 1)); press scales to 0.96.

### Cards / Containers
- **Corner Style:** the world's picture corner (see Shapes).
- **Background:** card: canvas-drawn gold stock (diagonal gradient #ffe46b, #f5b800, #ffd84a) under 55px foil bands at 50% alpha, then the type panel. Print: the set's frame gradient with polka dots. Cover: the full-bleed photo.
- **Shadow Strategy:** picture lift (see Elevation).
- **Card back:** a navy-2/navy-3 pinwheel (10deg slices) with a faint gold ring, double gold inset border, Lilita gold title rotated -6deg, and a slow foil drift (9s) in color-dodge at 22%. Prints and covers have no back.

### Theme Pick (start screen)
Each visible theme is offered as a sunburst card back with its name set across it: Samlekort in navy rays inside a gold rim with gold Lilita, Kawaii in violet (#a43be0) and magenta (#e0268a) rays inside a white rim with a pink inner line and white Mochiy. Both tiles are 5:7. A theme without a card back would get a sample tile drawn by its painter (the hidden Forsiden still has one). Below each, a name pill in the world's voice: gold/navy Lilita, hot pink/white Mochiy (Kawaii), or red/white Anton caps (Forsiden, while hidden not shown). The whole pick presses to scale(0.97). The theme used last time gets a 5px cream outline at 8px offset around its picture; the others stay equally live.

### Navigation
No nav bar. Screens are switched by big pills: Samling (quiet pill with a count badge, 40px, tabular numerals) bottom right and Skift tema (quiet pill, back arrow) bottom left in the booth, both icon-only in portrait and both disabled during the countdown; Tilbage, Skift tema and Del alle in the gallery header; the viewer is a full-screen dialog over a navy backdrop at 88%.

### Holo Card (Samlekort signature)
The live card shows the camera mirrored in its photo window with the chosen effect, and a specular sweep (cyan, white, magenta, lemon band at 105deg, overlay blend, 4.5s) crosses the card stock, masked out of the photo window. After capture a white flash (0.7s) fires and the card flips in from its back (1.25s, cubic-bezier(0.25, 1.25, 0.4, 1)) while the foil flashes across. On the result and in the viewer the card rests tilted (rotateX 4deg, rotateY -7deg); touching it tilts toward the finger and raises the foil layer from 32% to 50% opacity, with a radial white hotspot at the touch point.

### Purikura Print (Kawaii signature)
The live print shows the camera in its rounded window under the set's stickers, with the bubble holding three little pink heart stickers until the shot. A sparkle glint (white then blush band at 105deg, on the 4.5s sweep cycle) runs over the frame only, masked by an SVG with the photo window's own rounded corners cut out. After capture the print pops in like a sticker being slapped down: from scale(0.3) rotate(-14deg), fading in by 35%, on the reveal's 1.25s curve; the bubble now holds the surprise phrase, never the same one twice in a row. It tilts under the finger with the pastel shimmer instead of foil.

### Magazine Cover (Forsiden signature, hidden)
The live cover shows the camera full bleed under the drawn overlay: band-coloured masthead with the magazine name, black issue strip, teaser top left, yellow starburst top right, and a placeholder headline bottom left until the shot is taken. A white gloss band sweeps the masthead only, on the same 4.5s cycle. After capture the cover drops from translateY(-30%) rotate(-7deg) scale(1.08), fading in by 45%, on the reveal's 1.25s curve. Saved covers keep rendering in the gallery and viewer while the theme is hidden.

### Countdown
A progress ring (stroke 7 on a 100 viewBox, round cap, over a 35% navy track) fills over the countdown budget; the numeral pops in each second (scale 1.7 to 1, 0.6s) and "Smil!" sits in stroked display type. Samlekort: gold ring and numeral inside the photo window, cream "Smil!" top-left. Kawaii: white numeral over the faces zone, lemon "Smil!". Forsiden: yellow ring and numeral over the middle of the cover, white "SMIL!" below the ring. The pickers, shutter and Samling dim to 20% and stop taking touches while it runs.

## Do's and Don'ts

### Do:
- **Do** keep the picture the largest object on any screen, at its world's ratio (5:7 card, 3:4 print or cover), with the 0 24px 60px picture-lift shadow.
- **Do** draw anything that belongs to the picture on its canvas grid (1000 x 1400 card, 1050 x 1400 print or cover) so preview, JPEG and print match.
- **Do** add a new world as a theme: a registry entry with its own frames, shutter label and surprise, a painter, and a `data-theme` block that re-skins the shared components rather than forking them.
- **Do** retire a world from the start screen with the registry's hidden flag; keep its painter and styles so the pictures already saved in it still render.
- **Do** mark the chosen option in the world's chosen colour with dark text: gold/navy in Samlekort, white/purple in Kawaii, yellow/ink in Forsiden; keep the shutter colour for the capture pill and the theme's name pill only.
- **Do** pair every control word with an icon from the three authored sets: filled element glyphs, filled sticker shapes, or stroked UI icons at 2.2.
- **Do** put new controls in pills or chips of at least 72px height, with press-scale feedback.
- **Do** stroke display text in the world's dark (navy, purple or the set's accent, ink) whenever it sits on the photo or a pale frame.
- **Do** declare a faces zone for any picture that draws over the photo, and test that nothing drawn enters it.

### Don't:
- **Don't** use uppercase or small tracked captions in Samlekort or Kawaii chrome; caps in Samlekort belong only to card furniture. In Forsiden, caps go on Anton display, never on Baloo labels.
- **Don't** add hard offset shadows or coloured glows in any world; depth is soft dark lift, the foil layer, the gloss hotspot, the pastel shimmer or the printed sticker drop.
- **Don't** introduce square or slightly rounded rectangles in chrome; chrome is pills and discs in every world. Square forms belong to the cover itself and its printed result strap.
- **Don't** animate chrome beyond press-scale, the chip pick, the countdown and the result panel's rise-in (0.6s after the reveal); ambient motion belongs to the picture (foil on cards, sparkle glints on the print frame, masthead gloss on covers).
- **Don't** let a frame colour carry light ink when the colour is light (see The Declared Ink Rule).
- **Don't** mix worlds inside one picture: no foil on covers or prints, no Anton or Mochiy on cards, no stickers on cards or covers.
- **Don't** let a sticker, bubble or cover line reach into a faces zone, or a side sticker more than 60px into the photo window.
