---
name: Fotoboksen
description: A party photobooth that turns every photo into your own holo trading card or this week's magazine cover.
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
rounded:
  pill: "999px"
  card: "5.2% / 3.7%"
  cover: "0.6%"
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
---

# Design System: Fotoboksen

## Overview

**Creative North Star: "The Collector's Binder"**

**Forsiden North Star: "This Week's Cover"**

Fotoboksen has two worlds on one skeleton. A start screen offers both; the choice sets `data-theme` (kort or forside) on the body, and the booth, result, gallery and viewer keep the same structure, controls and motion grammar while ground, accent, display face and picture object change. Every saved picture remembers its own theme, so the gallery holds cards and covers side by side, each drawn in its own world; pictures from before themes existed are cards. The last-picked theme is remembered and ringed on the start screen; "Skift tema" in the gallery returns there.

**Samlekort.** Every photo is minted as a holo trading card, and the whole app is the binder the card lives in. The ground is deep binder navy; the objects on it are gold card stock, holo foil and cream plates. The live camera is not a viewfinder but the art window of an upright 5:7 card. Everything on the card (gold stock, type-coloured panel, cream mat, navy ribbon, cream stats plate) is drawn on canvas on a fixed 1000 x 1400 grid, so preview, JPEG and print are the same object. Motion belongs to the card: a foil sweep on the live card, a 3D flip reveal, tilt and a finger-tracked foil highlight on the finished card.

**Forsiden.** Every photo is this week's magazine cover. The ground is saturated newsstand cyan; the photo runs full bleed on a 3:4 cover under a solid masthead band in the chosen magazine's colour, a black issue strip, and white Anton cover lines with a heavy black outline. A yellow starburst sticker and a barcode box finish the newsstand. The whole overlay is drawn on a 1050 x 1400 canvas grid over the photo, by the same code for the live preview, the saved JPEG and the start-screen tile. Motion: a gloss that sweeps the masthead only, and a reveal where the cover drops onto the table instead of flipping.

Shared by both: low density and huge controls, two columns of fat chips flanking the picture, one big shutter pill under it, every control word backed by an authored icon; chrome only answers touches with a press-scale and a springy pick.

**Key Characteristics:**
- One skeleton, two worlds, switched by `data-theme` on the body and on each saved picture.
- The picture (5:7 card or 3:4 cover) is the largest object on every screen except the gallery grid.
- Samlekort: navy ground, gold and cream objects, magenta reserved for the capture pill; Lilita One display.
- Forsiden: cyan ground, yellow for chosen, red reserved for the capture pill, ink outlines; Anton display in caps.
- Pills and discs everywhere in the chrome in both worlds; the picture carries the world's corner.

## Colors

Two saturated toy palettes. Samlekort: gold and cream on near-black navy with a foil trio. Forsiden: yellow, red, ink and white on newsstand cyan, plus five magazine band colours.

### Primary
- **Card-Stock Gold** (gold): Samlekort selected chips, primary pills, all screen headings, the countdown numeral, count badges and the gold border of the card back. The colour of "this one is chosen". Also the start-screen title and the Samlekort name pill.
- **Stock Shadow Gold** (gold-deep): the inner second ring of the card-back border only.
- **Sticker Yellow** (mag-yellow): Forsiden's "chosen" colour: selected chips, primary pills, the count badge, the countdown numeral and ring, the starburst sticker, and the flat strap behind the headline on the result screen. Always with ink text (14.9:1).

### Secondary
- **Shutter Magenta** (magenta): the Samlekort capture pill ("Tag kort!", "Igen!", "Tag det første!") and text selection. Navy text on it (5.7:1).
- **Masthead Red** (mag-red): the Forsiden capture pill ("TAG FORSIDEN!") with white Anton (3.7:1, display size only), the Forsiden name pill on the start screen, and the Stjerne magazine band.

### Tertiary
- **Foil Cyan, Foil Magenta, Foil Lemon** (cyan, magenta, lemon): the holo trio. Used together as the 115deg foil gradient on card backs and finished cards, as the specular sheen on the live card, and as 50%-alpha diagonal bands across the gold stock on canvas. Cyan alone is the focus ring.
- **Type pairs** (ild, vand, lyn, jungle, galakse, slik; each -light and -dark): the inner card panel runs a vertical gradient from -dark (top) to -light (bottom), scattered with its element glyph at 20% alpha; the type-chip disc uses the same pair at 160deg. -dark also fills the title-row badge glyph and the strength bar.
- **Magazine bands** (Stjerne mag-red, sport-band, gamer-band, dyr-band, rum-band): one flat colour per magazine, filling the masthead band and that magazine's chip disc. Each declares its own band ink: white on Stjerne, Sport and Gamer; ink on Dyreliv; yellow on Rummet.

### Neutral
- **Binder Navy** (navy): Samlekort ground, text on gold/magenta/cream, the card's photo-window backing and ribbon. Also the start-screen ground and the theme colour.
- **Binder Navy Raised** (navy-2, navy-3): the radial glow at the top of the ground, the card-back pinwheel, default type-chip discs, scrollbar thumb.
- **Plate Cream** (cream): body text on navy, the card's photo mat and stats plate, the shutter's outer ring, the toast, the last-used ring on the start screen.
- **Newsstand Cyan** (mag-ground): Forsiden ground, under a radial glow that lightens to #1aa6e6 at 50% 30%.
- **Cover Ink** (mag-ink): the issue strip, every cover-line outline, the starburst outline, barcode bars, text on yellow, the countdown stroke, the selected effect-chip disc.
- **Paper White** (paper-white): Forsiden text and headings, cover-line fill, the barcode box, the Forsiden shutter's outer ring.
- **Warning Coral** (danger): the armed state of delete only, in both worlds; its resting state is a 16% tint with #ffb3aa text.
- Quiet surfaces are translucent, not tokens: white at 8-10% over navy (Samlekort), deep blue rgb(0 40 80) at 22-25% over cyan (Forsiden).

### Named Rules
**The One Shutter Colour Rule.** Each world has exactly one solid capture colour: magenta in Samlekort, red in Forsiden. It fills only the capture pill (and, in Forsiden, its name pill on the start screen). Everything else that is chosen or primary is gold (Samlekort) or yellow with ink (Forsiden).

**The Declared Ink Rule.** Every frame option declares the ink that reads on its colour. Lyn is the only light card type: its ink, glyph and footer flip to navy. Magazine bands declare bandInk (white, ink or yellow). Any new type or magazine with a light colour must declare a dark ink the same way.

## Typography

**Samlekort Display Font:** Lilita One (with sans-serif), weight 400 only
**Forsiden Display Font:** Anton (with sans-serif), weight 400 only, self-hosted via Fontsource (latin subset)
**Body Font (both):** Baloo 2 (with sans-serif), weights 600 and 800 only (self-hosted via Fontsource, latin subset)

**Character:** Samlekort pairs a chunky rounded poster face with a soft, heavy rounded sans, reading as a kids' card game. Forsiden swaps the display face for Anton, a tall condensed newsstand grotesque set in caps; Baloo 2 stays for labels so the controls feel the same in both worlds.

### Hierarchy
- **Display** (400, clamp(110px, 24dvh, 220px), 1): the countdown numeral; gold with a navy stroke in Samlekort, yellow Anton with an ink stroke in Forsiden.
- **Headline** (400, clamp(40px, 6dvh, 60px), 1.05): result title ("Nr. 001 er klar!" / "FORSIDEN ER KLAR!"); the gallery title (clamp(36px, 5dvh, 52px)), the shutter label (clamp(36px, 5.4dvh, 52px)) and the card-back title (clamp(40px, 7vw, 76px), rotated -6deg) sit in this band. The result line is display face at clamp(28px, 4.2dvh, 40px): cream with the power in gold (Samlekort), white with the headline on a yellow strap (Forsiden).
- **Title** (400, clamp(26px, 3dvh, 34px)): picker headings ("Korttype" / "BLAD", "Effekt" / "EFFEKT").
- **Body** (600, 20px): default weight for all running text; error and toast copy at 20px.
- **Label** (800, 24px): pills; chips at clamp(20px, 2.6dvh, 26px), 17-22px in portrait. Counts use tabular numerals. Labels stay Baloo 2 sentence case in both worlds.
- **Start screen:** title Lilita gold clamp(44px, 7dvh, 72px); theme names clamp(28px, 4dvh, 40px), Lilita for Samlekort, Anton caps for Forsiden.
- **Card type** (canvas, at 1000px card width): party title Lilita 78px fit-to-width, age Lilita 62px, superpower Lilita 96px fit-to-width, strength value Lilita 62px; ribbon Baloo 800 30px uppercase, "STYRKE" Baloo 800 30px uppercase, set mark Baloo 800 26px uppercase.
- **Cover type** (canvas, at 1050px cover width, all Anton): masthead up to 214px fit to the band left of the starburst; headline up to 112px, wrapped to at most 3 lines at line height 1.02, bottom-aligned, 12px ink outline; teaser up to 50px, 9px outline; starburst text up to 52px, two lines, rotated 0.2rad; issue strip and barcode price 30px.

### Named Rules
**The Caps Belong To The World Rule.** In Samlekort, uppercase appears only inside the drawn card (ribbon, stat label, set mark) as trading-card printing, and app chrome is sentence case. In Forsiden, caps are the magazine's voice: Anton display (picker, result and gallery headings, shutter, countdown hint, theme name) and every cover line are uppercase. In both worlds Baloo labels on chips and pills stay sentence case.

**The Stroke-Under Rule.** Display text laid over the photo carries a dark stroke painted under the fill (CSS paint-order: stroke fill; canvas strokeText before fillText) so it reads over any face: navy in Samlekort, ink in Forsiden (countdown, "SMIL!", every cover line).

## Layout

Full-viewport screens, one visible at a time, each padded by the pad token (clamp(16px, 2.4vw, 32px)) or the safe-area inset, whichever is larger. No page scroll; only the gallery binder scrolls. The picture's aspect ratio is one variable (--ratio: 5 / 7 for cards, 3 / 4 for covers) set on the root by the active theme and per picture on result, viewer and gallery pockets, so every layout below holds for both worlds.

- **Start:** title, then the two theme picks side by side (gap clamp(24px, 5vw, 72px)), each a full-height picture (the Samlekort card back, a live-drawn Forsiden cover tile) over its name pill, then a hint line and the error plate.
- **Booth, landscape:** a 1fr | auto | 1fr grid. The picture fills the full row height in the middle column; frame chips stack left (six types or five magazines), effect chips right, vertically centred. Row two holds the shutter under the picture and the Samling pill bottom-right.
- **Booth, portrait:** the picture spans both columns on top; the two pickers sit side by side under it as 2-column chip grids; the shutter is centred below, and the Samling pill hides its word, keeping icon and count.
- **Result and viewer:** picture at full height on the left, a column of actions (max 520px) on the right; in portrait the picture stacks above and the actions become a 2- or 4-column row.
- **Gallery:** a 1fr | auto | 1fr header (back; title + count; Skift tema and Del alle) over an auto-fill grid of pockets, min clamp(130px, 15vw, 190px), 22px gap; each pocket takes its picture's own ratio.
- **Card grid (1000 x 1400):** inner panel inset 40; content column x 72, width 856. Title row y 64 (104 tall), photo mat y 180 (700 tall) with the photo 16 inside it, ribbon y 900 (60), stats plate y 980 (300), footer y 1290 (56). DOM overlays on the photo window use the same rect in percentages (inset 14% 8.8% 38.3%).
- **Cover grid (1050 x 1400):** photo full bleed. Masthead band y 0 (232 tall, full width), issue strip y 232 (52), teaser x 40 y 304 (400 x 70), starburst x 858 y 222 (172 square, overlapping the strip), headline x 40 y 1036 (760 x 324), barcode x 846 y 1214 (164 x 146). The faces zone is y 400 to 1030, full width.
- **Rhythm:** 14px is the default gap inside controls and stacks; chips gap clamp(8px, 1.3dvh, 12px); chip height is the chip-h token (clamp(56px, 7.4dvh, 84px) in portrait).

### Named Rules
**The Faces Zone Rule.** On a cover, nothing drawn may enter the faces band (y 400 to 1030 on the 1050 x 1400 grid, edge to edge): masthead, strip, teaser and starburst end above it, headline and barcode start below it. The band is where a group of kids stands; the cover lines frame them, never cover them.

## Elevation & Depth

Depth is physical: pictures are lifted objects on a table, chrome is mostly flat. Shadows are soft, dark and downward; there are no coloured glows and no hard offsets. A card's depth comes from the 3D tilt (perspective 1400px) and the color-dodge foil layer; a cover has no foil, only a soft-light white hotspot (55% at the touch point, fading by 40%) that tracks the finger like gloss paper.

### Shadow Vocabulary
- **Picture lift** (`box-shadow: 0 24px 60px rgb(0 0 0 / 0.5)`): the live card or cover and the finished face; card back and start tiles at 0.45.
- **Pocket** (`box-shadow: 0 10px 24px rgb(0 0 0 / 0.4)`): pictures in the gallery grid.
- **Chosen chip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.3)`): a selected chip lifts slightly off the ground.
- **Shutter** (`box-shadow: 0 0 0 6px var(--cream), 0 16px 36px 4px rgb(0 0 0 / 0.42)`): a cream ring plus a deep drop; on press it compresses to `0 6px 16px 2px` and the button moves down 3px. Forsiden: white ring and a deep blue drop (`0 0 0 6px #ffffff, 0 16px 36px 4px rgb(0 30 70 / 0.4)`).
- **Toast** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.4)`).

### Named Rules
**The Objects-Lift Rule.** Only pictures, the shutter, the chosen chip and the toast cast shadows. Quiet pills, unselected chips and headings sit flat on the ground.

## Shapes

Two shape families. Chrome is pills and discs in both worlds: every button, chip and badge is fully rounded (999px or half its height), and chip icons sit in a circular disc. The picture carries its world's corner. Cards keep trading-card corners: 5.2% / 3.7% on the live card and card back (52px on the 1000px canvas), 5.8% / 4.1% on the image faces and pockets so the JPEG's white corners never show; inside the card, rounded rectangles step down (panel 30, stats plate 26, photo mat 20, photo 10, ribbon fully rounded). Covers are trimmed paper: a near-square 0.6% corner on the live cover, faces, pockets and the start tile, and every element drawn on the cover is square (bands, strip, barcode box) except the 14-point starburst (inner radius 0.8 of outer, 6px ink outline). Forsiden's result headline sits on a square yellow strap, a printed-highlight device native to the cover. The plate radius (22px) is for message plates on the ground (the start error); the toast uses 18px.

Icons come in two authored sets on a 24 x 24 grid: filled element glyphs (flame, drop, bolt, leaf, star, heart), shared by the UI and the canvas via Path2D, and stroked UI icons at one weight (2.2, round caps and joins) in currentColor, sized 1.15em. The magazine chips use stroked UI icons (star, ball, gamepad, paw, rocket); "Skift tema" uses the palette icon.

## Components

### Buttons
Big, rounded and squashy; everything presses in.
- **Shape:** fully rounded pill (999px).
- **Shutter (primary capture):** height clamp(84px, 13dvh, 120px), min width min(100%, 340px), 6px outer ring, icon + display-face label. Samlekort: magenta, navy Lilita, cream ring. Forsiden: red, white Anton caps, white ring. A small variant is 84px tall at 38px type (result "Igen!", empty-gallery call). Press: translateY(3px) scale(0.98), shadow compresses, 0.12s.
- **Pill:** 72px tall, Baloo 800 label, icon + word. Gold with navy (Samlekort), yellow with ink (Forsiden). Press: scale(0.96). Disabled: 40% opacity.
- **Quiet pill:** translucent fill, light text; navigation and secondary actions (Samling, Tilbage, Skift tema, Del alle, Luk).
- **Danger pill:** two-tap delete, same in both worlds. Rests as a coral tint; the first tap arms it to solid coral with navy text and the label "Tryk igen for at slette".
- **Focus:** 4px solid cyan outline, 4px offset, on every button.

### Chips
- **Style:** pill of chip-h height, translucent fill, Baloo 800 label, a circular disc on the left at chip-h minus 20px. Type chips fill the disc with their type pair at 160deg; magazine chips fill it flat with the band colour and its band ink; effect chips use a translucent disc with a stroked icon.
- **State:** selected chips turn gold/navy (Samlekort) or yellow/ink (Forsiden) and lift (chosen-chip shadow); effect discs invert to navy with a gold icon, or ink with a yellow icon. Selection plays a spring pick (scale 0.9 to 1, 0.45s, cubic-bezier(0.3, 1.6, 0.5, 1)); press scales to 0.96.

### Cards / Containers
- **Corner Style:** the world's picture corner (see Shapes).
- **Background:** card: canvas-drawn gold stock (diagonal gradient #ffe46b, #f5b800, #ffd84a) under 55px foil bands at 50% alpha, then the type panel. Cover: the full-bleed photo.
- **Shadow Strategy:** picture lift (see Elevation).
- **Card back:** a navy-2/navy-3 pinwheel (10deg slices) with a faint gold ring, double gold inset border, Lilita gold title rotated -6deg, and a slow foil drift (9s) in color-dodge at 22%. Covers have no back.

### Theme Pick (start screen)
Each theme is offered as its own real picture, not a description: the Samlekort card back and a Forsiden cover tile drawn live by the cover code (Stjerne masthead over a drawn party scene). Below each, a name pill in the world's voice: gold/navy Lilita, or red/white Anton caps. The whole pick presses to scale(0.97). The theme used last time gets a 5px cream outline at 8px offset around its picture; the other stays equally live.

### Navigation
No nav bar. Screens are switched by big pills: Samling (quiet pill with a count badge, 40px, tabular numerals) from the booth; Tilbage, Skift tema and Del alle in the gallery header; the viewer is a full-screen dialog over a navy backdrop at 88%.

### Holo Card (Samlekort signature)
The live card shows the camera mirrored in its photo window with the chosen effect, and a specular sweep (cyan, white, magenta, lemon band at 105deg, overlay blend, 4.5s) crosses the card stock, masked out of the photo window. After capture a white flash (0.7s) fires and the card flips in from its back (1.25s, cubic-bezier(0.25, 1.25, 0.4, 1)) while the foil flashes across. On the result and in the viewer the card rests tilted (rotateX 4deg, rotateY -7deg); touching it tilts toward the finger and raises the foil layer from 32% to 50% opacity, with a radial white hotspot at the touch point.

### Magazine Cover (Forsiden signature)
The live cover shows the camera full bleed under the drawn overlay: band-coloured masthead with the magazine name, black issue strip ("2.B · NR. 001 · 10. NOV 2026"), teaser top left ("+ Vind en ballon"), yellow starburst top right ("NYHED!"), and a placeholder headline bottom left until the shot is taken. A white gloss band (105deg, 60% white) sweeps the masthead only, on the same 4.5s cycle. After capture the cover lands with a surprise headline from that magazine: it drops from translateY(-30%) rotate(-7deg) scale(1.08), fading in by 45%, on the reveal's 1.25s curve. It then tilts under the finger like a card, with the gloss hotspot instead of foil.

### Countdown
A progress ring (stroke 7 on a 100 viewBox, round cap, over a 35% navy track) fills over the countdown budget; the numeral pops in each second (scale 1.7 to 1, 0.6s) and "Smil!" sits in stroked display type. Samlekort: gold ring and numeral inside the photo window, cream "Smil!" top-left. Forsiden: yellow ring and numeral over the middle of the cover, white "SMIL!" below the ring. The pickers, shutter and Samling dim to 20% and stop taking touches while it runs.

## Do's and Don'ts

### Do:
- **Do** keep the picture the largest object on any screen, at its world's ratio (5:7 card, 3:4 cover), with the 0 24px 60px picture-lift shadow.
- **Do** draw anything that belongs to the picture on its canvas grid (1000 x 1400 card, 1050 x 1400 cover) so preview, JPEG and print match.
- **Do** add a new world as a theme: a registry entry with its own frames, shutter label and surprise, a painter, and a `data-theme` block that re-skins the shared components rather than forking them.
- **Do** mark the chosen option in the world's chosen colour with dark text: gold/navy in Samlekort, yellow/ink in Forsiden; keep the shutter colour for the capture pill only.
- **Do** pair every control word with an icon from the two authored sets: filled element glyphs or stroked UI icons at 2.2.
- **Do** put new controls in pills or chips of at least 72px height, with press-scale feedback.
- **Do** stroke display text in the world's dark (navy or ink) whenever it sits on the photo.
- **Do** keep cover lines out of the faces zone (y 400 to 1030 on the cover grid).

### Don't:
- **Don't** use uppercase or small tracked captions in Samlekort chrome; caps there belong only to card furniture. In Forsiden, caps go on Anton display, never on Baloo labels.
- **Don't** add hard offset shadows or coloured glows in either world; depth is soft dark lift, the foil layer or the gloss hotspot.
- **Don't** introduce square or slightly rounded rectangles in chrome; chrome is pills and discs in both worlds. Square forms belong to the cover itself and its printed result strap.
- **Don't** animate chrome beyond press-scale, the chip pick, the countdown and the result panel's rise-in (0.6s after the reveal); ambient motion belongs to the picture (foil on cards, masthead gloss on covers).
- **Don't** let a frame colour carry light ink when the colour is light (see The Declared Ink Rule).
- **Don't** mix worlds inside one picture: no foil on covers, no Anton on cards.
