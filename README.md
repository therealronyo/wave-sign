# Wave Sign

A persistence-of-vision sign in the browser. Type a short message (Hebrew or
English), pick an icon, hold the phone upright with the screen facing the
audience, and wave it side to side. The gyroscope tracks the angle and the
screen lights one column of the message at a time, so viewers see it float in
the air.

**Live:** https://therealronyo.github.io/wave-sign/

## Files

Plain static site, no build step: edit any file (e.g. from an iPad) and push.

| File | What it is |
| --- | --- |
| `index.html` | The app |
| `manifest.webmanifest` | PWA manifest (name, colours, icons, standalone display) |
| `sw.js` | Service worker: network-first, so edits show up at once; cached copy offline |
| `icons/icon.svg` | Editable icon source |
| `icons/*.png` | Pre-rendered icons (192, 512, maskable 512, 180 apple-touch) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Install on a phone

- **iPhone (Safari):** Share → *Add to Home Screen*.
- **Android (Chrome):** menu → *Install app*.

It then opens full-screen from the home screen. On iPhone the motion-sensor
permission prompt has to be triggered by a tap inside the app.

## GitHub Pages

Settings → Pages → *Build and deployment* → Source: **Deploy from a branch**,
Branch: **main**, folder **/ (root)** → Save.
