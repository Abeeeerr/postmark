# Postmark ☕

**Live: [abeeeerr.github.io/postmark](https://abeeeerr.github.io/postmark/)**

A personal passport for café visits. Log each café with a photo, drink rating,
ambience score, and a one-line note — and every entry becomes a perforated
postage-stamp card, ready to share.

## Features

- **Stamp cards** — every café is a postage stamp: perforated frame, cream paper,
  film-grain texture, and a terracotta passport stamp with the visit date
- **Tone-aware ratings** — leaf ratings tint green for matcha, chocolate brown
  for coffee, warm taupe for everything else
- **Instagram-ready export** — tap any stamp for a 4:5 card, downloaded at
  1080×1350 with fonts and perforation baked in
- **Yours alone** — no accounts, no backend; everything lives in IndexedDB
  with JSON export/import so nothing is ever lost

## Stack

React + Vite, Tailwind CSS v4, `idb`, `html-to-image`, self-hosted
Fraunces & Inter via Fontsource.

## Palette

Pantone Chocolate Lab (19-1214) + Cactus (19-0120) on cream paper.
All tokens live at the top of `src/index.css`.

## Development

```sh
npm install
npm run dev
```

Deploy to GitHub Pages with `npm run deploy`.
