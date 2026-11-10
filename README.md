# TASTE LAB — آزمایشگاه طعم

A cinematic Persian RTL Next.js restaurant demo. Separate original source; no external database, payment gateway or AI video generator required.

## Run

```bash
npm install
npm run dev
npm run build
```

Features: custom sequential pizza-slice intro, creative pizza menu icon, smoothly animated mobile menu, kinetic Persian typography, GSAP scroll scenes, Lenis smooth scrolling, filterable real menu cards, responsive layouts, reservation demo form, FAQ, accessible controls and reduced-motion support.

## Demo disclaimer

Booking is a UI-only demo. Submitting the form does **not** store data, send SMS/email, reserve a real table or accept payments. Replace the demo handler with a server-side booking API in production.

## Deployment

Vercel: import the repository, framework Next.js, Node 22, production branch main. Use the assigned production domain (`<project>.vercel.app`) rather than the unique per-deployment URL. No extra environment variables are required.

Demo photos are bundled during `npm run build` and delivered from the first-party `/media/` path; `scripts/prepare-media.mjs` must successfully cache all eight assets before release. Replace stock photos with owned/licensed content for client production.

## November 2026 fixes
- Every image now uses a local first-party URL. The production build caches eight real JPEGs and fails if any download fails.
- The mobile menu icon is on the right side in both layouts.
- The initial loader uses one fixed pizza slice followed by seven illustrated slices that spiral into an eight-slice pizza.
