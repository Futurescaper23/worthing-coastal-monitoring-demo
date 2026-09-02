# Phase 1 Plan

## Goal

Create a client-facing Worthing coastal monitoring demonstrator using public data only, with strong provenance and explicit non-claims.

## Success conditions

- The app clearly communicates the scheme extent, work areas, public data coverage and historical context
- No screen implies measured post-repair performance
- Every visible dataset has source, date, licence, CRS and quality notes
- Missing client layers are obvious and honestly labelled
- The design feels recognisably FutureScaping without looking like a renamed Padstow clone

## Proposed build sequence

### 1. Project shell and design system

- Establish the independent Worthing app structure
- Recreate the FutureScaping shell and token system
- Define explicit colour semantics including blue gain and red loss

### 2. Data ingestion and validation

- Ingest public scheme geometry references
- Ingest CCO profile datasets for the selected proof area
- Ingest public environmental context sources
- Ingest public elevation and imagery references
- Record provenance and validation results in `docs/DATA_CATALOGUE.md`

### 3. Screen delivery

- Screen 1: Scheme overview map
- Screen 2: Work-area and selected-bay detail
- Screen 3: Historical survey/profile comparison
- Screen 4: Storm, tide and survey timeline
- Screen 5: Bay-status/intervention-intent mock panel
- Screen 6: Data provenance and uncertainty

### 4. Safety and claim review

- Check all copy for engineering overstatement
- Check all legends and annotations for colour correctness
- Confirm the required missing-data label is visible:
  - `July 2026 UAV baseline — client data required.`

### 5. Verification

- Run build/lint/test commands from the selected stack
- Perform browser QA at desktop and presentation sizes
- Confirm that no content depends on the reference project being mounted

## First demonstration screens

1. Scheme Overview
2. Work Area Detail
3. Historical Profiles
4. Environmental Timeline
5. Bay Status
6. Provenance and Uncertainty

## Known blockers

- July 2026 UAV baseline is unavailable in this workspace
- exact repaired groyne IDs are unavailable
- design thresholds and target volumes are unavailable
- public datasets still need downloading and validation
- the intended sibling Worthing folder is still not the mounted primary workspace for this session

## Immediate next implementation task

The independent application shell, routing and placeholder data model are now in place.

Next build focus:

1. replace schematic frontage placeholders with public-data-derived geometry and extents
2. add reproducible ingestion scripts for profile, source and provenance transforms
3. strengthen visual presentation with presentation-ready hero imagery and map polish
4. prepare a concise demo script using `docs/CLIENT_WALKTHROUGH.md`

Progress note on 2026-08-28:

- scheme overview now uses a generated public-source frontage sequence instead of manual placeholder ordering
- reproducible scripts now generate processed scheme geometry and the public source register

Progress note on 2026-08-29:

- profiles screen now includes a generated public CCO profile-route catalogue for Worthing survey unit `4dSU16`
- the project now records the API/key constraint explicitly rather than implying that live public profile downloads are already wired
- scheme overview now uses approximate public coordinate anchoring across named frontage landmarks rather than only relative width assumptions
