# DRIFTLIGHT

An original, unofficial fan-made wordless-adventure concept inspired by the emotional experience of traveling through a quiet desert. DRIFTLIGHT is not affiliated with the creators or publishers of Journey. All site copy, chapter illustrations, companion artwork, icons, and the favicon in this package are original; the shared `DriftScene` supplies the hero landscape and scarf traveler.

## Run

```sh
npm run dev
npm run typecheck
npm run lint
npm run build
npm run preview
```

This example reuses `examples/shared/game-base.css`, `examples/shared/game-ui.tsx`, `examples/shared/scenes.tsx`, and `examples/shared/vite.config.ts`. It expects to remain inside the showcase repository so those shared files and the root tooling are available.

## Interactions

- Four accessible chapter tabs with arrow, Home, and End key support.
- Four silent-signal controls with an illustrated, live response.
- A native accessible dialog for adding a traveler field note.
- Field notes persist in browser `localStorage`; no data is sent to a server.
- Real anchor navigation for the hero, navigation, and final calls to action.

## Accessibility and assets

Semantic sections, a skip link, visible focus states, reduced-motion handling, responsive layouts, and AA contrast are built in. Cormorant Garamond and Manrope are self-hosted locally in `src/assets/fonts`; their SIL Open Font License files are included beside the font binaries.
