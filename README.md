# OTOS Continuity Microsite — Five-Module PMOS-Style Structure

This build keeps the contents-first PMOS-style education-series baseline and restructures the former 14-section OTOS explainer into five substantial modules:

1. The proposed name and what it hides
2. Re-reading the diagnoses
3. A Neurologically Informed Addiction framing
4. The Dual Screen
5. Integrated practice

## What changed in this pass

- Contents page now shows five PMOS-equivalent modules only.
- Horizontal reading navigation now shows five chapter items only.
- Former 14-section material has been folded into the five-module education structure.
- Medication timing now sits inside Module 02.
- NIA / ADHD Lens / PMOS analogy now sits inside Module 03.
- The Dual Screen is now Module 04.
- OTOS continuity, cocoon, boundaries, route advice, small governed test, hold-back and closing are now inside Module 05.

## Run locally

```bash
cd otos_continuity_microsite
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000
```

## Structure

- `index.html` — content and five-module structure
- `styles.css` — PMOS-style visual system, cocoon, lens, medication, dual screen and integrated-practice styling
- `script.js` — contents/reader state, smooth scrolling, active chapter updates, reveal behaviour
- `assets/` — OTOS logo asset

## Boundaries preserved

- NIA is proposed terminology, not an official diagnosis.
- NIA is not a formal consensus rename.
- OTOS does not diagnose, prescribe, treat or make clinical decisions.
- OTOS does not create a merged EPR or service-to-service data-sharing layer.
- Comparator evidence is not presented as OTOS outcomes.
- Public-record first-mover language remains qualified.

## Static Background + Scrolling Glass Pass

This pass keeps the five-module PMOS-style education structure and adds a persistent static OTOS atmosphere layer behind the reading experience. The reader now scrolls over restrained frosted editorial panels. Module-specific background states are controlled through `body[data-active-module]` and update as the chapter navigation state changes.

Implemented states:
- Module 01: faint tangled linework and first amber thread separation.
- Module 02: steadier thread with medication timing atmosphere retained inside the subsection.
- Module 03: abstract ADHD Lens / aperture treatment, explicitly non-surveillance.
- Module 04: dual-panel / dual-lens background field.
- Module 05: cocoon, hold-back, and dawn-route visual states inside integrated practice.

No copy changes, new claims, photography, stock imagery, logos, pills, molecules, dashboards, or service-to-service network visuals were added.

## Static Image Depth + Stat Motion Pass

This pass keeps the five-module PMOS-style education-series structure and deepens the visual atmosphere behind the scrolling glass reader.

Implemented:
- Persistent fixed/sticky abstract image-depth layer behind the reading view.
- Module-specific atmosphere states for Module 01 pattern linework, Module 02 records/medication atmosphere, Module 03 ADHD Lens, Module 04 Dual Screen and Module 05 cocoon/hold-back/close.
- Deliberate scrolling glass panels over the static visual field.
- Subtle Jump-style stat settle animation for evidence and test numbers.
- Progressive enhancement so stats remain visible without JavaScript.
- Reduced-motion support so stats show final values instantly and atmosphere motion is disabled.

No module-order changes, copy rewrites, new claims, photography, pills, molecules, logos, dashboards or product architecture were added.
