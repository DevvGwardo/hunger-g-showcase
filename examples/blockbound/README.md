# BLOCKBOUND

An original, unofficial Minecraft-inspired landing-page concept built with React, TypeScript, and Vite. All voxel artwork is authored as SVG/CSS; no game textures, logos, or proprietary artwork are used.

## Run locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

Playwright checks desktop, tablet, and mobile layouts, primary interactions, keyboard flow, audio state, reduced motion, the pinned desktop biome sequence, console errors, horizontal overflow, and automated WCAG 2.1 AA compliance. Screenshots are written to `test-results/`.

Latest production Lighthouse run: **Performance 97**, **Accessibility 100**, **Best Practices 100**, **SEO 100**. Core Web Vitals in that run: LCP 1.0 s, CLS 0.001, TBT 180 ms.

## Experience notes

- GSAP ScrollTrigger drives the hero parallax and desktop biome pin. Lenis provides restrained smooth scrolling.
- Reduced-motion visitors receive an unpinned, fully usable biome layout and static artwork.
- The ambient soundscape is synthesized with Web Audio and starts only after an explicit user action. Its tonal palette follows the active biome.
- Native dialogs provide focus trapping and Escape behavior. Gallery filtering uses View Transitions where supported.
- Local variable fonts, reusable SVG primitives, one adaptive canvas particle field, and CSS environmental effects keep the page lightweight.

BLOCKBOUND is a fan-made concept and is not affiliated with Mojang or Microsoft.
