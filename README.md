# OTOS Continuity™ Interactive Education Microsite

A standalone, static, premium editorial microsite for the OTOS Continuity™ education series: **The Thread the System Keeps Missing**.

The page is built as a pre-NDA strategic explainer. It introduces ADHD-driven addiction / NIA, the person-centred continuity cocoon, NHS route-advice language, safe evidence caveating and the small governed demonstrator — without exposing product mechanics, data model, signal taxonomy or operational playbook.

## Files

- `index.html` — semantic page structure and copy
- `styles.css` — OTOS visual system, responsive layout, diagrams and motion
- `script.js` — reveal animations, scroll progress, active section dots and keyboard section navigation
- `assets/otos-continuity-logo.png` — original supplied OTOS Continuity logo
- `assets/otos-continuity-logo-cropped.png` — display-ready crop of the supplied logo

## How to run locally

Open `index.html` directly in a browser, or run a lightweight local server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Editing copy

Each section is clearly marked in `index.html` with section IDs:

- `#hero`
- `#pattern`
- `#pmos`
- `#system`
- `#cocoon`
- `#waiting`
- `#medication`
- `#what-is`
- `#what-not`
- `#evidence`
- `#record-gap`
- `#route`
- `#test`
- `#nda`
- `#closing`

## Safety / disclosure boundaries included

The microsite states that:

- NIA is proposed founder-originated terminology, not an official diagnosis.
- OTOS is non-clinical infrastructure, not a treatment provider.
- OTOS does not diagnose, prescribe, treat, replace services, write into NHS records or move clinical responsibility.
- OTOS is not a One Record, shared clinical record, merged EPR or service-to-service data-sharing layer.
- Evidence cards are comparator evidence only and not OTOS outcomes.
- Cambridge / CPFT language is framed as a public-record statement, not an absolute national claim.
- NHS ask is route advice / early-market engagement, not procurement.
- Full product mechanics are held back for qualified conversations and NDA review.

## SOURCE NEEDED items

Because the evidence dossier and supporting source PDFs were not present in the workspace, the evidence cards are intentionally marked `SOURCE NEEDED`:

- ADHD over-representation in addiction cohorts
- START France 2025 61.3% outcome claim
- NHS ADHD Taskforce avoidable cost / service pressure claim
- Registry evidence linking ADHD medication to reductions in substance misuse and criminality events

Replace or remove the `SOURCE NEEDED` badges once the claims are verified against the final OTOS Evidence Dossier / Sources, Science & Claims Register.

## Accessibility notes

- Semantic headings and landmarks are used.
- The page has a skip link.
- Navigation anchors are keyboard accessible.
- Reduced-motion preferences are respected.
- Core content remains readable without animation.
- Print CSS strips decorative navigation and backgrounds.

## Next refinements

1. Add final approved evidence citations and remove `SOURCE NEEDED` badges.
2. Replace abstract placeholder visuals with signed-off OTOS image assets.
3. Update contact email in the CTA.
4. Test inside the eventual deployment environment or app framework.
5. Run a formal accessibility check before sharing externally.
