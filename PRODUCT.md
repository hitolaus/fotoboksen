# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + TypeScript, no UI framework. Static build deployed to Cloudflare Pages (HTTPS is required for camera access on iPad Safari). Canvas 2D for frames and effects. Installed to the iPad Home Screen as a standalone web app; the adult locks it with Guided Access during the party.

## Users

9-year-old children at a birthday party, operating the booth themselves on an iPad on a stand or table, often in groups of 2–4 crowding into the shot. An adult sets it up, and afterwards browses the gallery and prints.

## Product Purpose

A self-service party photobooth: a kid picks a colorful frame and an effect, taps one big button, a countdown runs, and the photo is taken. Success is kids using it again and again without adult help, and the parents ending the day with a gallery of framed photos.

## Operating Context

- iPad, mostly landscape, front camera, on a stand at roughly kid height.
- Noisy party, short attention, a queue of kids; one session should take well under a minute.
- No accounts, no network needed after load.
- The adult uses the gallery after (or during) the party to print and save photos.

## Capabilities and Constraints

- One session = one photo (no strips).
- Self-timer countdown before capture, visible from a step back.
- Choice of colorful frames and live effects, shown on the live camera preview before the photo is taken.
- Every photo is kept in a gallery on the iPad (stored locally in the browser, IndexedDB). Photos never leave the device unless an adult shares or prints them.
- Printing via the iPad's print dialog (AirPrint).
- On-screen text is Danish.
- Assumption (not confirmed): print is available from the result screen and from the gallery.

## Product Principles

1. A 9-year-old can do the whole thing alone, on the first try, without reading instructions.
2. Big, few, obvious choices; the camera picture is always the star.
3. Nothing is lost: every shot lands in the gallery automatically.
4. Private by default: photos of children stay on the iPad.

## Accessibility & Inclusion

Children's reading level: very short Danish words, backed by icons. Touch targets sized for kid fingers and for use while standing back from the screen.
