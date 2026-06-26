# OTOS Continuity™ Microsite — PMOS-Style Structural Reset

This build resets the microsite structure into a contents-first education series, with a separate long-scroll reading experience.

## Files

- `index.html` — contents homepage plus reading state
- `styles.css` — simplified PMOS-style visual system
- `script.js` — routing/state, chapter navigation, reveal effects
- `assets/` — OTOS Continuity logo assets

## How to run locally

Open `index.html` directly in a browser, or run a small local server:

```bash
cd otos_continuity_microsite
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to test

1. Open the homepage. It should show the contents page first, not the explainer.
2. Click `Begin Module 01 →`. The reading experience should open and scroll to Module 01.
3. Click any numbered module row from the homepage. The reading experience should open at that module.
4. Use the horizontal chapter bar on the reading page to jump between modules.
5. Click `CONTENTS` or the logo to return to the contents homepage.
6. Resize to mobile; the chapter bar should become horizontally scrollable.

## Notes

- This pass is structural and visual only.
- Copy has been carried forward as draft content and not newly expanded.
- No new imagery or new claims were added.
- OTOS amber/thread visuals are restrained accents inside the reading structure.
