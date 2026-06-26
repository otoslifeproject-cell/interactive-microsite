# OTOS Continuity™ Microsite

PMOS-style contents-first education-series microsite for OTOS Continuity™.

## Structure

- `index.html` — contents page plus separate reading state with 14 modules.
- `styles.css` — stripped-back PMOS-style visual system with restrained OTOS amber/thread accents.
- `script.js` — contents/reader state switching, smooth module navigation, active chapter tracking, reduced-motion support.
- `assets/` — OTOS Continuity™ logo assets.

## Current pass completed

Whole-site UX / visual / interaction refinement pass for the current live microsite:

- Refined contents-first homepage composition.
- Reduced header/logo dominance and kept the PMOS-style header: logo left, series title centre, Contents right.
- Preserved separate reading state rather than a pasted continuous page.
- Refined horizontal numbered chapter navigation with active states.
- Strengthened Module 04 as the person-centred continuity cocoon diagram.
- Strengthened Module 06 as an abstract medication-timing visual moment.
- Made Modules 07–08 more screenshot-able as definition/boundary modules.
- Made Modules 09–12 more formal, careful and buyer-safe.
- Made Module 13 feel gated/held back.
- Made Module 14 calmer and more earned.
- Removed duplicated CSS from previous pass and rebuilt a cleaner single visual system.

## Run locally

```bash
cd otos_continuity_microsite
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Test anchors

- `/` opens the contents page.
- `#contents` returns to contents.
- `#module-01` enters reading mode at Module 01.
- `#module-04` enters reading mode at the cocoon module.
- Chapter navigation scrolls horizontally on small screens.

## Notes

No copy rewrite, new claims, final photography, partner logos, NHS logos, pills, bottle imagery, molecule imagery or product-mechanics disclosure were added in this pass.
