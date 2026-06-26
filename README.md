# OTOS Continuity™ Interactive Education Microsite

Static PMOS-style education-series microsite for OTOS Continuity™.

## Current pass

This version applies the background / visual atmosphere pass while preserving the contents-first structure, module order, chapter navigation and 14-module reading experience.

## Run locally

```bash
cd otos_continuity_microsite
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Structure

- `index.html` — contents page plus separate reader state
- `styles.css` — PMOS-style editorial layout and OTOS background atmosphere family
- `script.js` — contents/reader state, hash navigation, active chapter updates and reveal effects
- `assets/` — OTOS logo assets

## Visual atmosphere family

- Light editorial background: contents page and text-led modules
- Cocoon diagram background: Module 04
- Medication timing background: Module 06, preserved and refined
- Formal proof background: Modules 09–12
- Held-back/NDA background: Module 13
- Closing/dawn background: Module 14

## Notes

- No copy rewrite in this pass.
- No final photography added.
- No new claims added.
- No NHS, partner, pill, molecule or alcohol imagery added.
- Browser screenshot QA should still be done locally before deployment.
