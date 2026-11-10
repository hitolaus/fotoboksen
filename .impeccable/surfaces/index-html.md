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

## Start screen tiles

Every offered theme's tile is the Samlekort sunburst card back in that theme's colours. The user's words (2026-11-10, about the Kawaii tile): "I don't like the people on the Kawaii theme on the theme selector. Use the same "star" style as with the card theme, but use other colors". Blokland follows the same rule.

## Direction contract: Blokland (fourth theme)

User asked for a "Minecraft theme". We do not recreate that game (no name, logo, characters, textures or its on-screen look); the user agreed to an original blocky pixel-game world called Blokland, with a "LEVEL UP!" banner awarding a random title.

THESIS: Your photo becomes a level in a block world: framed by pixel blocks, with pixel loot on the edges and a LEVEL UP! banner naming your new title. Refuses a costume of any real game.

OWN-WORLD: Dark stone ground with a faint pixel checker (#26262f/#2b2b35); grass green shutter (#2f8f1f with a lighter top bevel); gold (#ffd23f) for chosen chips, headings and LEVEL UP!; ink #1b1b22 outlines and one-step hard pixel shadows. Square corners with inset bevels. Pixelify Sans 700 everywhere. Worlds: Græs, Grotte, Ørken, Sne, Lava, Hav, each a three-tone block texture.

STORY: Kid picks a world, taps "Tag billede!", countdown, the print drops in step by step and the banner says LEVEL UP! with a title like "Mester-bygger".

FIRST VIEWPORT: Centre: one 3:4 print, photo window on the 70-unit block grid, items on the corners and side edges, banner across the top of the photo, stone title band below. Left "Verden" six chips, right "Effekt" six, green "Tag billede!" block button, Skift tema bottom left, Samling bottom right.

FORM: the direction was set by the user's request and the two answers above, so no concept roll ran and there is no seed. Signature move: items and banner never cover faces (blokLayout.faces, side items reach at most 60px into the photo, tested); the reveal drops in ten hard steps.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
