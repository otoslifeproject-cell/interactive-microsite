# OTOS Continuity™ Microsite

Static PMOS-style education-series microsite for OTOS Continuity™.

## Current status

Finish pass completed before copy/image work.

This build preserves:

- contents-first opening
- OTOS header left / series title centre / Contents right
- numbered contents list with read times and arrows
- Begin Module 01 CTA
- separate reader state
- horizontal numbered chapter navigation
- 14-module PMOS-style reading structure
- restrained OTOS amber/thread accents

## Files

- `index.html` — full site markup and module content
- `styles.css` — PMOS-style editorial visual system and finish-pass refinements
- `script.js` — contents/reader state, smooth scrolling, active chapter state and reveal behaviour
- `assets/` — OTOS logo asset

## Run locally

```bash
cd otos_continuity_microsite
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Behaviour to test

- `/` opens to the contents-first page.
- `#contents` returns to contents.
- Begin Module 01 enters the reading state.
- Each contents row opens the corresponding module.
- Chapter nav scrolls horizontally on small screens.
- Active chapter updates on scroll.
- Sticky header and chapter nav do not cover section headings.
- Reduced-motion support remains enabled via CSS/JS.

## Notes

No copy rewrite, final photography, source cleanup, new claims, partner logos, NHS logos or product mechanics were added in this pass.
