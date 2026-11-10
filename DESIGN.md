---
name: Fotoboksen
description: A party photobooth that mints every photo as your own holo trading card.
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
rounded:
  pill: "999px"
  card: "5.2% / 3.7%"
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
---

# Design System: Fotoboksen

## Overview

**Creative North Star: "The Collector's Binder"**

Every photo is minted as a holo trading card, and the whole app is the binder the card lives in. The ground is deep binder navy; the objects on it are gold card stock, holo foil and cream plates. The live camera is not a viewfinder but the art window of an upright 5:7 card, and the card is always the largest thing on screen.

Density is low and controls are huge: two columns of six fat chips flank the card, one magenta pill under it is the largest control, and every label is a short Danish word backed by an icon. Everything on the card itself (gold stock, type-coloured panel, cream mat, navy ribbon, cream stats plate) is drawn on canvas on a fixed 1000 x 1400 grid, so the live preview, the saved JPEG and the print are the same object.

Motion belongs to the card: a foil sweep on the live card, a 3D flip reveal after capture, tilt and a finger-tracked foil highlight on the finished card. Chrome only answers touches with a press-scale and a springy pick.

**Key Characteristics:**
- Navy ground, gold and cream objects, magenta reserved for the one capture action.
- One upright 5:7 card as the hero on every screen except the gallery grid.
- Six card types, each a saturated light/dark pair plus a filled element glyph.
- Lilita One for everything a kid reads at a distance; Baloo 2 heavy for labels.
- Pills and discs everywhere in the chrome; card-proportioned rounded rectangles for cards.

## Colors

A saturated toy palette on a near-black navy: gold and cream do the work, magenta and the foil trio are accents.

### Primary
- **Card-Stock Gold** (gold): selected chips, primary pills, all screen headings, the countdown numeral, count badges and the gold border of the card back. The colour of "this one is chosen".
- **Stock Shadow Gold** (gold-deep): the inner second ring of the card-back border only.

### Secondary
- **Shutter Magenta** (magenta): the capture pill ("Tag kort!", "Igen!", "Tag det første!") and text selection. Navy text on it (5.7:1).

### Tertiary
- **Foil Cyan, Foil Magenta, Foil Lemon** (cyan, magenta, lemon): the holo trio. Used together as the 115deg foil gradient on card backs and finished cards, as the specular sheen on the live card, and as 50%-alpha diagonal bands across the gold stock on canvas. Cyan alone is the focus ring.
- **Type pairs** (ild, vand, lyn, jungle, galakse, slik; each -light and -dark): the inner card panel runs a vertical gradient from -dark (top) to -light (bottom), scattered with its element glyph at 20% alpha; the type-chip disc uses the same pair at 160deg. -dark also fills the title-row badge glyph and the strength bar.

### Neutral
- **Binder Navy** (navy): page ground, text on gold/magenta/cream, the card's photo-window backing and ribbon. Also the theme colour.
- **Binder Navy Raised** (navy-2, navy-3): the radial glow at the top of the ground, the card-back pinwheel, default type-chip discs, scrollbar thumb.
- **Plate Cream** (cream): body text on navy, the card's photo mat and stats plate, the shutter's outer ring, the toast.
- **Warning Coral** (danger): the armed state of delete only; its resting state is a 16% tint with #ffb3aa text.
- Quiet surfaces are white at 8-10% alpha over navy (chips, quiet pills), not a separate token.

### Named Rules
**The One Magenta Rule.** Solid magenta fills only the capture pill. Everything else that is chosen or primary is gold.

**The Lyn Exception Rule.** Lyn is the only light type: its ink, glyph and footer flip to navy, and its chip disc icon is navy. Any new type with a light -dark tone must declare navy ink the same way.

## Typography

**Display Font:** Lilita One (with sans-serif), weight 400 only
**Body Font:** Baloo 2 (with sans-serif), weights 600 and 800 only (self-hosted via Fontsource, latin subset)

**Character:** A chunky rounded poster face over a soft, heavy rounded sans; both read as a kids' card game, not as an app.

### Hierarchy
- **Display** (400, clamp(110px, 24dvh, 220px), 1): the countdown numeral, gold with an 8px navy stroke painted under the fill.
- **Headline** (400, clamp(40px, 6dvh, 60px), 1.05): result title "Nr. 001 er klar!"; the gallery title (clamp(36px, 5dvh, 52px)), the shutter label (clamp(36px, 5.4dvh, 52px)) and the card-back title (clamp(40px, 7vw, 76px), rotated -6deg) sit in this band. The superpower line is Lilita at clamp(28px, 4.2dvh, 40px), cream with the power in gold.
- **Title** (400, clamp(26px, 3dvh, 34px)): picker headings "Korttype" and "Effekt", in gold.
- **Body** (600, 20px): default weight for all running text; error and toast copy at 20px.
- **Label** (800, 24px): pills; chips at clamp(20px, 2.6dvh, 26px), 17-22px in portrait. Counts use tabular numerals.
- **Card type** (canvas, at 1000px card width): party title Lilita 78px fit-to-width, age Lilita 62px, superpower Lilita 96px fit-to-width, strength value Lilita 62px; ribbon Baloo 800 30px uppercase, "STYRKE" Baloo 800 30px uppercase, set mark Baloo 800 26px uppercase.

### Named Rules
**The Card-Furniture Caps Rule.** Uppercase Baloo 800 appears only inside the drawn card (ribbon, stat label, set mark), as trading-card printing. App chrome is sentence case.

**The Stroke-Under Rule.** Display text laid over the live photo (countdown numeral, "Smil!") carries a navy -webkit-text-stroke with paint-order: stroke fill, so it reads over any face.

## Layout

Full-viewport screens, one visible at a time, each padded by the pad token (clamp(16px, 2.4vw, 32px)) or the safe-area inset, whichever is larger. No page scroll; only the gallery binder scrolls.

- **Booth, landscape:** a 1fr | auto | 1fr grid. The card fills the full row height at 5:7 in the middle column; type chips stack left, effect chips right, vertically centred. Row two holds the shutter under the card and the Samling pill bottom-right.
- **Booth, portrait:** the card spans both columns on top; the two pickers sit side by side under it as 2-column chip grids; the shutter is centred below, and the Samling pill hides its word, keeping icon and count.
- **Result and viewer:** card at full height on the left, a column of actions (max 520px) on the right; in portrait the card stacks above and the actions become a 2- or 4-column row.
- **Gallery:** a 1fr | auto | 1fr header (back, title + count, share) over an auto-fill grid of 5:7 pockets, min clamp(130px, 15vw, 190px), 22px gap.
- **Card grid:** 1000 x 1400. Inner panel inset 40; content column x 72, width 856. Title row y 64 (104 tall), photo mat y 180 (700 tall) with the photo 16 inside it, ribbon y 900 (60), stats plate y 980 (300), footer y 1290 (56). DOM overlays on the photo window use the same rect in percentages (inset 14% 8.8% 38.3%).
- **Rhythm:** 14px is the default gap inside controls and stacks; chips gap clamp(8px, 1.3dvh, 12px); chip height is the chip-h token (clamp(56px, 7.4dvh, 84px) in portrait).

## Elevation & Depth

Depth is physical: cards are lifted objects on a dark table, chrome is mostly flat. Shadows are soft, black and downward; there are no coloured glows and no hard offsets. The card's own depth comes from the 3D tilt (perspective 1400px) and the color-dodge foil layer, not from more shadow.

### Shadow Vocabulary
- **Card lift** (`box-shadow: 0 24px 60px rgb(0 0 0 / 0.5)`): the live card, the finished card face, the card back (at 0.45).
- **Pocket** (`box-shadow: 0 10px 24px rgb(0 0 0 / 0.4)`): cards in the gallery grid.
- **Chosen chip** (`box-shadow: 0 6px 18px rgb(0 0 0 / 0.3)`): a selected chip lifts slightly off the ground.
- **Shutter** (`box-shadow: 0 0 0 6px var(--cream), 0 16px 36px 4px rgb(0 0 0 / 0.42)`): a cream ring plus a deep drop; on press it compresses to `0 6px 16px 2px` and the button moves down 3px.
- **Toast** (`box-shadow: 0 10px 30px rgb(0 0 0 / 0.4)`).

### Named Rules
**The Objects-Lift Rule.** Only cards, the shutter, the chosen chip and the toast cast shadows. Quiet pills, unselected chips and headings sit flat on the navy.

## Shapes

Two shape families. Chrome is pills and discs: every button, chip and badge is fully rounded (999px or half its height), and chip icons sit in a circular disc. Cards keep trading-card corners: 5.2% / 3.7% on the live card and card back (52px on the 1000px canvas), 5.8% / 4.1% on the image faces and pockets so the JPEG's white corners never show. Inside the card, rounded rectangles step down: panel 30, stats plate 26, photo mat 20, photo 10, ribbon fully rounded. The plate radius (22px) is for message plates on the ground (the start error); the toast uses 18px.

Icons come in two authored sets on a 24 x 24 grid: filled element glyphs (flame, drop, bolt, leaf, star, heart), shared by the UI and the canvas via Path2D, and stroked UI icons at one weight (2.2, round caps and joins) in currentColor, sized 1.15em.

## Components

### Buttons
Big, rounded and squashy; everything presses in.
- **Shape:** fully rounded pill (999px).
- **Shutter (primary capture):** magenta with navy Lilita label and camera icon, height clamp(84px, 13dvh, 120px), min width min(100%, 340px), cream 6px ring. A small variant is 84px tall at 38px type (result "Igen!", empty-gallery call). Press: translateY(3px) scale(0.98), shadow compresses, 0.12s.
- **Pill:** gold with navy Baloo 800 label, 72px tall, icon + word. Press: scale(0.96). Disabled: 40% opacity.
- **Quiet pill:** white 10% over navy, cream text; navigation and secondary actions (Samling, Tilbage, Del alle, Luk).
- **Danger pill:** two-tap delete. Rests as a coral tint; the first tap arms it to solid coral with navy text and the label "Tryk igen for at slette".
- **Focus:** 4px solid cyan outline, 4px offset, on every button.

### Chips
- **Style:** pill of chip-h height, white 8% fill, cream Baloo 800 label, a circular disc on the left at chip-h minus 20px. Type chips fill the disc with their type pair at 160deg; effect chips use a white 10% disc with a stroked icon.
- **State:** selected chips turn gold with navy text and lift (chosen-chip shadow); effect discs invert to navy with a gold icon. Selection plays a spring pick (scale 0.9 to 1, 0.45s, cubic-bezier(0.3, 1.6, 0.5, 1)); press scales to 0.96.

### Cards / Containers
- **Corner Style:** trading-card corners (see Shapes).
- **Background:** canvas-drawn gold stock (diagonal gradient #ffe46b, #f5b800, #ffd84a) under 55px foil bands at 50% alpha, then the type panel.
- **Shadow Strategy:** card lift (see Elevation).
- **Border:** the visible gold stock between the card edge and the inner panel (40px on 1000).
- **Card back:** a navy-2/navy-3 pinwheel (10deg slices) with a faint gold ring, double gold inset border, Lilita gold title rotated -6deg, and a slow foil drift (9s) in color-dodge at 22%.

### Navigation
No nav bar. Screens are switched by big pills: Samling (quiet pill with a gold count badge, 40px, tabular numerals) from the booth; Tilbage and Del alle in the gallery header; the viewer is a full-screen dialog over a navy backdrop at 88%.

### Holo Card (signature)
The live card shows the camera mirrored in its photo window with the chosen effect, and a specular sweep (cyan, white, magenta, lemon band at 105deg, overlay blend, 4.5s) crosses it continuously. After capture a white flash (0.7s) fires and the card flips in from its back (1.25s, cubic-bezier(0.25, 1.25, 0.4, 1)) while the foil flashes across. On the result and in the viewer the card rests tilted (rotateX 4deg, rotateY -7deg); touching it tilts toward the finger and raises the foil highlight from 20% to 50%, with a radial white hotspot at the touch point.

### Countdown
A gold progress ring (stroke 7 on a 100 viewBox, round cap, over a 35% navy track) fills over the countdown budget inside the photo window; the numeral pops in each second (scale 1.7 to 1, 0.6s) and "Smil!" sits top-left in stroked cream Lilita. The pickers, shutter and Samling dim to 20% and stop taking touches while it runs.

## Do's and Don'ts

### Do:
- **Do** keep the card the largest object on any screen, at 5:7, with the 0 24px 60px card-lift shadow.
- **Do** draw anything that belongs to the card on the 1000 x 1400 canvas grid so preview, JPEG and print match.
- **Do** mark the chosen option in gold with navy text; keep solid magenta for the capture pill only.
- **Do** pair every control word with an icon from the two authored sets: filled element glyphs or stroked UI icons at 2.2.
- **Do** put new controls in pills or chips of at least 72px height, with press-scale feedback.
- **Do** stroke display text in navy whenever it sits on the live photo.

### Don't:
- **Don't** use uppercase labels or small tracked captions in app chrome; caps belong only to card furniture.
- **Don't** add hard offset shadows or coloured glows; depth is soft black lift and the foil layer.
- **Don't** introduce square or slightly rounded rectangles in chrome; chrome is pills and discs.
- **Don't** animate chrome beyond press-scale, the chip pick, the countdown and the result panel's rise-in (0.6s after the flip); ambient motion belongs to the card's foil.
- **Don't** set a type's ink to cream when its -dark tone is light (see The Lyn Exception Rule).
