# Game Concepts

This document records the creative and accessibility decisions behind the five interactive landing pages added after BLOCKBOUND: **Starfall Acre**, **Hollowlight**, **Summit**, **Ember Oath**, and **Driftlight**.

Each site is a promotional design study for an original game concept, not a playable game. Its controls demonstrate the assigned inspiration through original writing, artwork, and interface behavior.

| Concept | Named inspiration | Landing-page genre | Implemented interaction |
| :--- | :--- | :--- | :--- |
| **Starfall Acre** | Stardew Valley | Cozy farming | Season selector |
| **Hollowlight** | Hollow Knight | Atmospheric metroidvania | Realm selector |
| **Summit** | Celeste | Precision platformer | Chapter trail selector |
| **Ember Oath** | Hades | Roguelike | Boon selector and random boon |
| **Driftlight** | Journey | Wordless adventure | Chapter travel log |

## Originality and no-copied-assets policy

The named inspirations are reference points for genre, tone, pacing, and broad interaction conventions. They are not asset sources and do not imply endorsement or affiliation.

- Artwork, animation, maps, interface elements, copy, lore, music, and sound effects must be created specifically for the showcased concept.
- Do not extract, download, repaint, trace, or adapt sprites, textures, models, screenshots, UI kits, logos, characters, level data, or audio from an existing game or fan asset library.
- Do not copy proprietary game code, control scripts, animation rigs, or level logic. General techniques may be implemented independently.
- Third-party software libraries and fonts are allowed only under their own licenses. Their licenses and required attribution must be preserved, and they must not be presented as original project artwork.
- A franchise name may identify the concept's inspiration, but it must never be used to request or supply that franchise's copyrighted visual or audio material.
- Any new asset needs an identifiable author or license, a local source, and a project-specific filename. If provenance is unclear, the asset does not ship.

All concepts remain unofficial and unaffiliated with the creators or publishers of their named inspirations.

---

## Starfall Acre

**Named inspiration:** Stardew Valley  
**Live:** [devvgwardo.github.io/hunger-g-showcase/starfall-acre/](https://devvgwardo.github.io/hunger-g-showcase/starfall-acre/)  
**Source:** [examples/starfall-acre/](starfall-acre/)

### Original premise

Starfall Acre is a Stardew Valley-inspired cozy farming landing page for an original farming-life concept set in Larkspur Valley. The site introduces a modest acre, curious crops, familiar neighbors, and a letterbox to communicate a life guided by seasons rather than deadlines.

The page presents the fantasy of tending a small farm, making friends, and finding magic in ordinary routines. It does not simulate planting, harvesting, crafting, or relationships; those ideas are communicated through editorial content and seasonal scenes.

### Art direction

The landing page uses hand-authored storybook SVG scenes, warm paper tones, rounded typography, farm maps, neighbor portraits, and seasonal color systems. Spring is soft green and blossom pink, summer is gold and foliage green, fall is amber and rust, and winter is hushed blue-green and snow white. All crops, characters, buildings, and illustrations are original to the project.

### Landing-page interactions

- **Season selector:** Spring, Summer, Fall, and Winter tabs update the seasonal garden artwork, palette, featured crops, weather, daily rhythm, field note, and descriptive copy.
- **World tour:** section links move between the acre, the seasons, neighbors, feature cards, and local letters.
- **Letterbox:** native disclosure elements open short letters from the valley's residents.
- **Editorial feature cards:** farming, friendship, and seasonal-life cards link back to the relevant page sections.

The page does not claim to offer a playable farming loop.

### Accessibility decisions

- The season selector uses a keyboard-operated tab pattern with arrow keys, Home, End, roving focus, `aria-selected`, and a labelled tab panel.
- A polite live region announces the selected season and title.
- Native buttons, anchors, and disclosure elements preserve expected keyboard and screen-reader behavior.
- Decorative artwork is hidden from assistive technology; meaningful farm and garden scenes include text descriptions.
- Crops, weather, and seasonal rhythm are named in text, so the palette is never the only source of information.
- A skip link, semantic headings, visible focus, responsive layouts, and reduced-motion behavior support navigation and comfortable reading.

**Fan-made status:** Starfall Acre is an original, unofficial Stardew Valley-inspired concept. It is not affiliated with or endorsed by ConcernedApe, and it uses no Stardew Valley crops, characters, sprites, music, interface art, code, or other proprietary assets.

---

## Hollowlight

**Named inspiration:** Hollow Knight  
**Live:** [devvgwardo.github.io/hunger-g-showcase/hollowlight/](https://devvgwardo.github.io/hunger-g-showcase/hollowlight/)  
**Source:** [examples/hollowlight/](hollowlight/)

### Original premise

Hollowlight is a Hollow Knight-inspired atmospheric metroidvania landing page for an original story of descent. It introduces Vale's last lantern-bearer and three buried realms—Root Halls, the Choir of Glass, and the Pale Garden—where small discoveries reveal a world that has forgotten the sky.

The website sells mood, mystery, and exploration through field notes, realm lore, and a configurable lantern loadout. It is not a side-scrolling game and does not provide platforming or combat.

### Art direction

The visual language combines ink-dark cavern silhouettes, layered paper-cut forms, restrained amber and cyan light, original masks, botanical silhouettes, and hand-drawn SVG lanterns and sigils. Realm artwork changes atmosphere without relying on imported textures or franchise character designs.

### Landing-page interactions

- **Realm selector:** Root Halls, Choir of Glass, and Pale Garden tabs update the realm sigil, depth, description, hazard, hidden reward, and field note.
- **Route marking:** visitors can mark a realm as their intended descent; the choice is stored locally when browser storage is available.
- **Lantern loadout:** visitors can bind up to two original charms, see the selected loadout, clear it, and retain the choice locally.
- **Field-note browser:** ledger buttons and previous/next controls cycle through original quotations.
- **Downloadable guide:** the field-guide action generates a text file containing the marked route and equipped charms.

The site demonstrates exploration and build customization as concept content rather than gameplay.

### Accessibility decisions

- The realm selector implements an accessible tab list with arrow-key, Home, and End navigation, roving focus, `aria-selected`, and a labelled panel.
- Charm controls use native buttons, `aria-pressed`, explicit capacity limits, and a live summary of the equipped loadout.
- Realm and loadout status messages are announced without requiring visual inspection.
- Decorative lanterns and sigils are hidden from assistive technology, while the surrounding prose carries the meaning.
- Storage failures fall back to an in-memory experience, so the page remains usable.
- Skip links, reduced-motion treatment, visible focus, and readable contrast support a slow, atmospheric reading experience.

**Fan-made status:** Hollowlight is an original, unofficial Hollow Knight-inspired concept. It is not affiliated with Team Cherry, and it uses no Hollow Knight characters, sprites, animation, music, level layouts, logos, code, or other proprietary assets.

---

## Summit

**Named inspiration:** Celeste  
**Live:** [devvgwardo.github.io/hunger-g-showcase/summit/](https://devvgwardo.github.io/hunger-g-showcase/summit/)  
**Source:** [examples/summit/](summit/)

### Original premise

Summit is a Celeste-inspired precision-platformer landing page for an original five-chapter alpine climb. First Light, Blue Hour, Splinter Ridge, The Whiteout, and The Pale Crown introduce momentum, air dashes, wall holds, wind shifts, and a final test of every skill.

The page frames precision as a personal rhythm rather than punishment. It presents a mountain, a practice challenge, and a strong assist-options philosophy; it does not provide a playable platforming course.

### Art direction

Summit uses crisp original SVG alpine panoramas, contour-line route diagrams, snowfields, dark teal rock, sunrise gold, ice blue, and a coral climbing line. Chapter colors distinguish moments in the ascent, while elevation labels and route profiles provide a clear information hierarchy.

### Landing-page interactions

- **Chapter trail selector:** five vertical tabs update the climbing-route diagram, elevation, difficulty, traversal mechanic, chapter note, and selected community challenge.
- **Assist preview:** controls demonstrate game-speed choices, extra air control, frequent checkpoints, screen shake, high-contrast routes, and reduced motion, with reset and balanced presets.
- **Local settings:** assist choices and the personal practice benchmark are stored on the visitor's device when storage is available.
- **Practice clock:** visitors can start, pause, resume, reset, and save a practice time without playing a platformer.
- **Challenge code:** the selected chapter produces a `SUMMIT-01` through `SUMMIT-05` code that can be copied, with the code shown as fallback text.
- **Field notes:** a downloadable text guide summarizes the five chapters, rhythm, and assist philosophy.

### Accessibility decisions

- The chapter trail is a labelled vertical tab list with arrow-key, Home, and End navigation, roving focus, and explicit panel relationships.
- Assist controls use native radio inputs and labelled switch buttons, with a live summary of the current settings.
- Game speed, route mechanics, elevation, and challenge codes are written as text rather than conveyed by color or diagrams alone.
- The practice clock has a timer role, labelled controls, and polite status messages; using it is optional.
- Clipboard failure displays the challenge code directly instead of blocking the interaction.
- High-contrast and reduced-motion previews, visible focus, skip navigation, and responsive route diagrams make the page readable without precision input.

**Fan-made status:** Summit is an original, unofficial Celeste-inspired concept. It is not affiliated with Maddy Makes Games, and it uses no Celeste characters, levels, sprites, animation, music, interface art, code, or other proprietary assets.

---

## Ember Oath

**Named inspiration:** Hades  
**Live:** [devvgwardo.github.io/hunger-g-showcase/ember-oath/](https://devvgwardo.github.io/hunger-g-showcase/ember-oath/)  
**Source:** [examples/ember-oath/](ember-oath/)

### Original premise

Ember Oath is a Hades-inspired roguelike landing page for an original dying-underworld escape story. The site introduces four divine boons, three oathbound weapons, four competing houses, and an escape loop built around repeated descent, adaptation, and memory.

The page demonstrates roguelike build variety and theatrical character presentation. It does not provide combat, a dungeon run, or a playable roguelike loop.

### Art direction

The landing page combines charcoal and obsidian surfaces, lacquer-red accents, tarnished brass, ember particles, monumental architecture, and hand-authored SVG boon glyphs, weapon illustrations, and faction portraits. Each boon has its own color treatment, but names, domains, and inscriptions remain the primary identifiers.

### Landing-page interactions

- **Boon selector:** Cinder Edge, Ashen Wake, Undertow, and Veilstep buttons update the inscription, passive, active ability, cooldown, statistics, and flavor text.
- **Bind action:** visitors can bind the inspected boon to the concept run and receive a status confirmation.
- **Random boon:** the finale's summon action chooses one of the four original boons, updates the inspector, binds it, and announces the result.
- **Weapon selector:** Ember Pike, Gravechain, and Cinder Fists update the illustration, reach, tempo, impact, and signature trait.
- **Editorial sections:** the escape loop and house cards explain repetition, adaptation, and the original cast without starting gameplay.

### Accessibility decisions

- Boon and weapon selectors use native buttons with `aria-pressed` so selected state is available to assistive technology.
- Boon details and result messages use polite live regions to announce changes without moving focus.
- Manual boon selection remains available, so experiencing the page never depends on accepting a random result.
- Statistics and abilities are presented as text; color is reinforced by names, domains, and distinct glyphs.
- Keyboard operation, visible focus, skip navigation, and reduced-motion treatment support reading and selector use without rapid input.
- The page clearly identifies itself as an interactive concept rather than a playable game.

**Fan-made status:** Ember Oath is an original, unofficial Hades-inspired concept. It is not affiliated with Supergiant Games, and it uses no Hades characters, boons, weapons, dialogue, sprites, animation, music, interface art, code, or other proprietary assets.

---

## Driftlight

**Named inspiration:** Journey  
**Live:** [devvgwardo.github.io/hunger-g-showcase/driftlight/](https://devvgwardo.github.io/hunger-g-showcase/driftlight/)  
**Source:** [examples/driftlight/](driftlight/)

### Original premise

Driftlight is a Journey-inspired wordless-adventure landing page for an original crossing through a quiet desert. Four chapters—Dawn, Dunes, Ruins, and Ascent—follow two travelers who learn to notice, answer, and accompany each other without spoken dialogue.

The website presents the emotional arc as an illustrated travel log. It does not include sailing, navigation puzzles, or playable exploration; the crossing is communicated through scenery, encounters, reflections, and wordless signals.

### Art direction

Driftlight uses warm desert light, dusk violet, pale stone, luminous accents, cut-paper silhouettes, flowing scarves, and fine travel-log typography. Original desert travelers and environments carry the story without borrowing Journey's character designs, robe shapes, musical score, or visual assets.

### Landing-page interactions

- **Chapter travel log:** Dawn, Dunes, Ruins, and Ascent tabs update the chapter artwork, terrain, encounter, description, and reflection.
- **Silent-signal selector:** Notice, Follow, Rest, and Look up buttons change the companion scene and a written description of the wordless response.
- **Traveler notes:** visitors can open a native dialog, choose a chapter, and leave a short field note with an optional name and location.
- **Local-only notes:** valid notes are stored in the browser and displayed locally; the page explicitly states that it is not a live service.

The travel log is an editorial interaction, not a steering or route-planning puzzle.

### Accessibility decisions

- The travel log uses a labelled vertical tab list with arrow-key, Home, and End navigation, roving focus, and an associated chapter panel.
- Silent-signal controls use `aria-pressed`, and the companion's response is announced through a polite live region.
- The traveler-note form uses a native dialog with focus management, Escape behavior, associated labels, validation messaging, and a live submission announcement.
- Decorative artwork is hidden from assistive technology; meaningful companion scenes include text alternatives.
- Wordless ideas are also expressed in prose, so meaning never depends on animation, color, or audio alone.
- Storage failures do not prevent a note from appearing during the current visit, and reduced-motion treatment keeps the page calm.

**Fan-made status:** Driftlight is an original, unofficial Journey-inspired concept. It is not affiliated with thatgamecompany, and it uses no Journey characters, environments, scarves, music, animation, interface art, code, or other proprietary assets.

---

## Shared design commitments

Across all five landing pages:

1. **Name the inspiration honestly.** Stardew Valley, Hollow Knight, Celeste, Hades, and Journey are credited explicitly as unofficial inspirations, not hidden behind vague genre labels.
2. **Present a concept, not a false game.** Selectors, previews, logs, and downloads demonstrate the proposed experience without claiming to be playable.
3. **Make every selector keyboard-usable.** Tabs, buttons, switches, and disclosures have semantic roles, visible focus, and understandable selected states.
4. **Communicate beyond color and motion.** Labels, prose, diagrams, live regions, and text alternatives carry essential meaning.
5. **Keep local features local.** Saved routes, loadouts, settings, benchmarks, and traveler notes use browser storage with graceful fallbacks and no implied live service.
6. **Stay original by construction.** Assets and implementation are authored for the project, provenance is recorded, and no material is copied from the named inspirations.
