# Fotoboksen

A self-service photobooth for a 9th birthday party, running on an iPad. Kids pick a card type (the frame) and an effect, tap **Tag billede!**, a 5-second countdown with beeps runs, and the photo comes out as a holo trading card with a surprise superpower. Every card is saved in **Samlingen** (the gallery) on the iPad, where adults can print or share it.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173, also on your LAN
npm test         # unit tests (vitest)
npm run build    # type-check + static build into dist/
```

The camera only works over **https** (or localhost). To try it on the iPad before deploying, deploy a preview to Cloudflare Pages.

## Deploy to Cloudflare Pages

Connect the repo in the Cloudflare dashboard, then set:

- Build command: `npm run build`
- Build output directory: `dist`

Or from the terminal: `npx wrangler pages deploy dist`.

## Party setup on the iPad

1. Open the site in Safari, tap Share › **Add to Home Screen**, and open it from the Home Screen icon (no Safari bars; the time and battery sit on a bar at the top that takes the colour of the theme on screen). If you change the status bar or manifest settings later, remove the icon and add it again: iPadOS only reads them when the app is added.
2. **Offline:** open the Home Screen app once while the iPad is online and leave it open for a few seconds. It stores the whole app on the iPad, and from then on it opens and works with Wi-Fi and mobile data off. Test it: turn on Flight Mode, close the app from the app switcher, and open it again. The Home Screen app keeps its own copy, separate from Safari, so opening the site in Safari does not count. After deploying a new version, open the app online, then close it from the app switcher and open it again: the new version takes over only after the old one has been closed.
3. Tap the card to start and allow the camera.
4. Lock the iPad into the app: Settings › Accessibility › **Guided Access** on, then triple-click the top button inside the app. This also blocks the home gesture.
5. Plug in the charger. The app asks the screen to stay on; if the iPad dims anyway, set Settings › Display & Brightness › Auto-Lock to Never.
6. Before the party, edit `src/config.ts` for the card title, the class shown on the card (2.B) and the countdown length.

## Photos

Cards are stored in the browser's local storage on this iPad only (IndexedDB). They never leave the device unless you share or print them. Uninstalling the Home Screen app or clearing Safari website data deletes them, so after the party open **Samlingen › Del alle** and save them to Photos.

Printing uses the iPad's print dialog (AirPrint). Printing is only in **Samlingen** (open a picture and tap **Print**, or use **Vælg** for several), not on the screen right after the photo. Print first asks for a size: **Lille** (trading-card size, 9 per A4 sheet), **Mellem** (photo size, 4 per sheet) or **Stor** (one per sheet). To print several pictures together, open **Samlingen**, tap **Vælg**, tap the pictures, then **Print**. In the Home Screen app iPadOS has no print dialog for web apps, so there Print first prepares the A4 sheets as pictures and then opens the share sheet: choose **Udskriv**. The **Del** share sheet also has a Print option.
