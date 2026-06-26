# OTOS Continuity™ Interactive Education Microsite

Static PMOS-style education-series microsite for OTOS Continuity™.

## Current pass

This version integrates the four approved P1 visual assets only, while preserving the contents-first structure, PMOS-style reader, module order, copy, chapter navigation and restrained OTOS atmosphere.

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

- `index.html` — contents page plus separate reader state and P1 module markup
- `styles.css` — PMOS-style editorial layout, OTOS atmosphere family and P1 SVG/CSS treatments
- `script.js` — contents/reader state, hash navigation, active chapter updates and reveal effects
- `assets/` — OTOS logo assets

## P1 visual assets integrated

- Module 04: editable SVG/HTML/CSS person-centred cocoon diagram
- Module 06: approved medication timing atmosphere preserved and refined
- Module 13: dark controlled-disclosure schematic behind frosted glass
- Module 14: calm dawn/route closing visual

## Notes

- No copy rewrite in this pass.
- No final photography added.
- No extra P2/P3 images generated.
- No new claims added.
- No NHS, partner, pill, molecule, alcohol or stock imagery added.
- Browser visual QA should still be done locally before deployment.
