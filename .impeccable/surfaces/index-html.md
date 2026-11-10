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
