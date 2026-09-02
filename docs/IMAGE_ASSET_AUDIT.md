# Image Asset Audit

## Scope

Audit completed on 31 August 2026 for image files currently present inside the Worthing demonstrator workspace.

Reviewed folders:

- `Images/`
- `public/images/`

Purpose:

- determine whether the local image set is safe to ship in the demonstrator;
- separate assets into `safe to use`, `needs permission`, and `do not use`;
- record the reasoning so later replacement or approval work is straightforward.

## Summary

No reviewed asset is currently confirmed `safe to use` in a shipped demonstrator without further provenance or permission work.

The image set splits into two groups:

1. one public-plan/map extract that should be treated as `do not use`;
2. a set of public-facing site photographs of the Worthing coastal works that should be treated as `needs permission` unless an explicit licence or reuse approval is confirmed.

The current stylised hero renders in `public/images/` should also be treated as `needs permission` unless their source inputs are documented and cleared.

## Classification

### Safe to use

None currently confirmed.

Reason:

- this project requires visible provenance and licence status for displayed assets;
- no file in the reviewed set currently has recorded licence metadata in the workspace;
- a public web presence alone is not enough to assume reuse rights for a shipped demo.

### Needs permission

These files appear to be public-facing documentary or promotional photographs of the Worthing works and seafront:

- `Images/Media,171959,smxx.jpg`
- `Images/Media,171960,smxx.jpg`
- `Images/Media,171961,smxx.jpg`
- `Images/Media,171962,smxx.jpg`
- `Images/Media,173419,smxx.jpg`
- `Images/Media,173420,smxx.jpg`
- `Images/Media,173421,smxx.jpg`
- `Images/Media,173666,smxx.jpg`
- `Images/Media,173667,smxx.jpg`
- `Images/Media,173668,smxx.jpg`
- `Images/Media,173776,smxx.jpg`
- `Images/Media,173777,smxx.jpg`
- `Images/Media,173778,smxx.jpg`
- `Images/Media,173779,smxx.jpg`
- `Images/Media,173891,smxx.jpg`
- `Images/Media,173892,smxx.jpg`
- `Images/Media,174024,smxx.jpg`
- `Images/Media,174025,smxx.jpg`
- `Images/Media,174026,smxx.jpg`
- `Images/Media,174027,smxx.jpg`
- `Images/Media,174219,smxx.jpg`
- `Images/Media,174220,smxx.jpg`

Why they fall into this bucket:

- the filenames match the Adur and Worthing Councils media-library pattern;
- the reviewed images read as council or contractor site photography tied to the public scheme pages;
- they may be usable if the council grants reuse permission or if the page/media terms clearly allow republication;
- turning them into AI sketches or stylised derivatives does not by itself remove the underlying rights issue.

Working rule:

- use as internal reference only unless explicit reuse rights are confirmed.

### Do not use

- `Images/Media,171950,smxx.jpg`

Why it falls into this bucket:

- this is a plan/map extract rather than a neutral place photograph;
- the project brief and research notes already warn that the council work-plan basemaps carry third-party copyright and must not be redistributed;
- this type of image is better replaced by redrawn geometry on an openly licensed baselayer.

## Current in-app hero images

These assets are visually polished and useful for presentation, but they should be treated as provisional until their source lineage is documented:

- `public/images/worthing-seafront-hero.png`
- `public/images/worthing-pier-proof-hero.png`

Current status:

- visually suitable for concept presentation;
- not yet confirmed as licence-safe for publication;
- if they were built from restricted or unlicensed source imagery, the stylised output inherits that risk.

## Safe replacement assets created on 31 August 2026

These assets were generated from text prompts only, with no input source photographs supplied to the generation step:

- `public/generated-images/worthing-full-frontage-illustration-v1.png`
- `public/generated-images/worthing-wide-frontage-overview-illustration-v1.png`
- `public/generated-images/worthing-map-derived-frontage-overview-illustration-v1.png`
- `public/generated-images/worthing-pier-east-proof-illustration-v1.png`
- `public/generated-images/worthing-seafront-monitoring-illustration-v1.png`
- `public/generated-images/worthing-timeline-context-illustration-v1.png`
- `public/generated-images/worthing-profile-monitoring-illustration-v1.png`
- `public/generated-images/worthing-status-frontage-illustration-v1.png`
- `public/generated-images/worthing-provenance-observation-illustration-v1.png`
- `public/generated-images/worthing-groyne-before-repair-illustration-v1.png`
- `public/generated-images/worthing-groyne-after-repair-illustration-v1.png`

Status:

- suitable as replacement illustrative artwork for the demonstrator;
- should be labelled and treated as illustrative visuals, not survey evidence;
- safer than the council-media JPEG set because they do not reproduce the original files directly.
- the before/after groyne pair was generated as a presentation aid from text prompts using the existing generated proof-area image as style reference; it must not be described as a documentary record or measured performance comparison.
- the map-derived frontage overview was generated from the supplied flat map screenshot as spatial reference only. It must remain an illustrative overview and must not be treated as copied Google map imagery, a measured basemap, or a GIS-accurate plan.

Remaining caution:

- they are still product assets and should keep a clear internal note that they are generated illustrations inspired by public project facts, not measured or documentary records.

## Recommended next step

The safest route is:

1. keep this `Images/` set as reference material only for now;
2. either obtain explicit permission for selected council photographs or replace them with newly created public-safe artwork;
3. prefer new illustrations or renders built from permitted public sources, labelled clearly as illustrative rather than evidential;
4. continue to avoid any reuse of plan basemap imagery.
