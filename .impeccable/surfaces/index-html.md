---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: []
---

# Booth app (index.html)

Scope: the whole photobooth web app: start screen, booth (live card preview, frame and effect pickers, shutter, countdown), result reveal, gallery (Samlingen) with print/share/delete. Visitor mode: Operate (a 9-year-old completes "take my picture" alone, many times). iPad landscape first, portrait must work.

Memorable moment: your photo comes out as a holo collector's card with a surprise superpower, and the foil follows your finger when you touch it.

Unresolved: printer model and paper size at the party (print CSS targets a card-sized image centred on 10x15 photo paper); card title and age are constants in src/config.ts.

## Direction contract

THESIS: Every photo is minted as your own holo trading card: the live camera is the card's artwork. Refuses the camera-app default (full-bleed preview, thumbnail strip, white shutter ring).

OWN-WORLD: Deep collector-binder navy ground (#141a4d) with gold card stock (#ffcf1f), holo foil (cyan, magenta, lemon sweeps) and cream text plates (#fff7e0). Six card types, each one saturated colour plus a drawn element icon (Ild, Vand, Lyn, Jungle, Galakse, Slik). Lilita One for card names and numerals, Baloo 2 for labels; authored SVG icons, one stroke weight.

STORY: Kid sees a giant card with their own face in it, taps a type on the left and an effect on the right, taps "Tag kort!", runs back, a 5-second countdown with beeps, flash, the card flips in with a surprise superpower. Adults later open Samlingen to print and share.

FIRST VIEWPORT: Centre: one upright card (5:7) as tall as the screen allows minus the shutter row, live camera in its art window. Left column: "Korttype" six big type chips. Right column: "Effekt" six chips. Bottom centre: big magenta pill "Tag kort!", the largest control. Bottom right: "Samling" with count.

FORM: IMPECCABLE'S PICK, candidate 1 of 7 on my ordered list (holo trading card). seed:6dd77bb0f3fe7548. Signature move: holo foil sweep on the live card; on the result and in the gallery the card tilts in 3D and the foil highlight tracks the finger. Motion grammar: the card flip reveal after capture, springy chip selection; nothing else animates.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Direction contract: Forsiden (second theme, hidden)

Hidden from the start screen at the user's request (2026-11-10); the code and old covers keep working.

The app opens on a theme picker (Samlekort or Forsiden); the booth, result, gallery and viewer keep one structure and change world per theme. The contract above still governs Samlekort.

THESIS: Your photo is this week's magazine cover: full-bleed photo under a giant masthead, with silly cover lines about you. Refuses the props-and-white-frame party app.

OWN-WORLD: Saturated newsstand cyan ground (#0a8fd0), masthead band colour per magazine (Stjerne red #ff2a3d, Sport green, Gamer purple, Dyreliv orange, Rummet navy), yellow starburst sticker (#ffe600), ink black (#111) strip and outlines, white cover lines with black stroke. Anton for mastheads, cover lines and UI display; Baloo 2 for labels.

STORY: Kid picks a magazine, taps "Tag forsiden!", countdown over the faces, the cover lands with a surprise headline. Adults find covers mixed with cards in Samlingen.

FIRST VIEWPORT: Centre: one 3:4 cover as tall as the screen allows, live camera full bleed under masthead and issue strip. Left "BLAD" five magazine chips, right "EFFEKT" six chips, bottom centre red "TAG FORSIDEN!" pill, bottom right Samling.

FORM: IMPECCABLE'S PICK, candidate 1 of 7 on my ordered list (magazine cover). seed:d4c55e93e0668a64. Signature move: cover lines stay outside the faces zone (coverLayout.faces); the cover lands on the table on reveal; gloss sweeps the masthead only.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Direction contract: Kawaii (third theme)

User-pinned brief: anime/Japanese kawaii style, vibrant pink and purple, "think Hello Kitty style" (original motifs only, no licensed characters), with stars and speech bubbles. User chose auto-placed sticker sets and a random bubble phrase.

THESIS: The booth becomes a Japanese purikura: your photo prints as a sticker-photo with a polka-dot frame, die-cut stickers and a speech bubble saying something cute. Refuses the plain props overlay.

OWN-WORLD: Purple-to-magenta ground (#6a1b9a to #d81b74) with white polka dots; hot pink shutter (#ff3d9a); white selected chips with purple ink (#5a1290); lemon (#ffe14d) and lilac accents. Stickers are white-outlined die-cuts with gloss and tiny faces (eyes, smile, blush). Mochiy Pop One for display, Baloo 2 for labels.

STORY: Kid picks a sticker set (Stjerner, Hjerter, Kattekat, Sakura, Skyer, Blanding), taps "Tag billede!", countdown, the print pops in like a sticker and the bubble reveals a phrase.

FIRST VIEWPORT: Centre: one 3:4 purikura print, live photo in a rounded white-rimmed window, stickers on the top strip and the frame edges, bubble top right, title band below. Left "Stickers" six chips, right "Effekt" six, pink "Tag billede!" pill, Samling bottom right.

FORM: the direction was pinned by the user's brief, so no concept roll ran and there is no seed. Signature move: stickers never cover faces (purikuraLayout.faces, side stickers reach at most 60px into the photo); the print pops in with a tilt; sparkle glints run over the frame only.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
