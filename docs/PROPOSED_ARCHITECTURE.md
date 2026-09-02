# Proposed Architecture

## Objective

Build an independent Worthing Coastal Monitoring Demonstrator that borrows the strongest presentation patterns from the FutureScaping reference system while remaining:

- public-data-safe;
- technically honest;
- easy to extend when client UAV and threshold data arrive;
- fully independent of the Padstow reference project.

## Recommended technical stack

Recommended stack for Phase 1:

- Application framework: Next.js with TypeScript
- UI runtime: React
- Styling: custom CSS modules or global CSS with explicit design tokens
- Mapping: MapLibre GL JS on openly licensed base layers
- Charts:
  - custom SVG or lightweight chart components for profile comparison
  - Chart.js only if needed for weather/tide timelines
- Data validation: Zod or equivalent schema validation for imported datasets
- Data processing:
  - file-based scripts under `scripts/`
  - generated JSON/GeoJSON under `public/data/processed/`
- Hosting target:
  - static-friendly deployment for Phase 1 if possible
  - avoid server-side write dependencies in the first release

Why this stack:

- It keeps the Worthing app more maintainable than the current single-file `app.js` reference
- It supports a proper map experience, which the Worthing brief needs more than the estuary prototype did
- It separates public-data rendering from internal admin/data-writing workflows
- It leaves room for later client-data insertion without changing the public shell

## Architecture principles

1. No runtime dependency on `G:\My Drive\Futurescaping\CODEX`
2. No file-writing admin workflows in Phase 1
3. Every displayed layer must carry provenance metadata
4. Every missing high-value dataset must show a visible placeholder
5. Public-data evidence and client-supplied engineering evidence must remain distinct
6. Profile-derived indicators must be labelled as proxies unless surface data supports stronger claims

## Proposed project structure

```text
Worthing project/
├── AGENTS.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── scheme/
│   │   └── page.tsx
│   ├── bay/
│   │   └── [bayId]/
│   │       └── page.tsx
│   ├── profiles/
│   │   └── page.tsx
│   ├── timeline/
│   │   └── page.tsx
│   ├── status/
│   │   └── page.tsx
│   └── provenance/
│       └── page.tsx
├── components/
│   ├── shell/
│   ├── map/
│   ├── charts/
│   ├── profiles/
│   ├── status/
│   └── provenance/
├── lib/
│   ├── data/
│   ├── formatting/
│   ├── schemas/
│   └── constants/
├── scripts/
├── public/
│   └── data/
│       ├── source/
│       └── processed/
├── docs/
├── research/
└── tests/
```

## Route and screen model

Recommended first demonstration screens:

1. `Scheme Overview`
   - Full frontage map
   - Ten work areas
   - Profile lines
   - Sensor and dataset coverage
   - Prominent unavailable UAV baseline placeholder

2. `Work Area / Selected Bay Detail`
   - Selected work area geometry
   - Groyne range and public context
   - Available profiles
   - Related public imagery/elevation coverage
   - Honest note where exact repaired groyne alignment is unverified

3. `Historical Survey / Profile Comparison`
   - Selected CCO profiles
   - Multi-date overlay chart
   - Proxy interpretation notes
   - Blue for gain/accretion and red for loss/erosion in annotation language

4. `Storm, Tide and Survey Timeline`
   - Survey dates
   - Nearby tide and wave context
   - Worthing Pier met context where available
   - Distinct visual treatment for provisional versus quality-controlled data

5. `Bay Status / Intervention Intent`
   - A non-engineering mock operational panel
   - Status fields for public-data completeness, recent forcing, profile proxy movement and missing client thresholds
   - Required label: `July 2026 UAV baseline — client data required.`

6. `Data Provenance and Uncertainty`
   - Source inventory
   - Licence
   - CRS
   - Capture date
   - Quality notes
   - Known gaps and non-claims

## Data model

Recommended top-level datasets:

- `scheme.json`
  - Scheme extent
  - Work areas
  - Groyne range notes
  - proof-area selection
- `profiles.json`
  - Profile metadata
  - survey dates
  - line geometry
  - derived proxy metrics
- `environment.json`
  - wave/tide/met station metadata
  - event windows
  - survey-timeline joins
- `layers.json`
  - available LiDAR, aerial and asset layers
  - source, licence, CRS and quality fields
- `provenance.json`
  - canonical metadata registry for UI display
- `client-placeholders.json`
  - missing scheme data labels and unlock requirements

Suggested provenance fields for every dataset:

- `id`
- `title`
- `sourceOrganisation`
- `sourceUrl`
- `captureDate`
- `publishedDate`
- `licence`
- `crs`
- `verticalDatum`
- `coverage`
- `qualityStatus`
- `phase`
- `notes`

## UI component plan

Recommended reusable components:

- `MonitoringShell`
- `HeroStage`
- `MetricCard`
- `EvidencePanel`
- `ProvenanceDrawer`
- `SchemeMap`
- `WorkAreaSelector`
- `ProfileComparisonChart`
- `TimelinePanel`
- `BayStatusCard`
- `MissingDataBanner`

Component rules:

- Keep shell and evidence panels reusable across screens
- Keep all wording for engineering certainty centrally controlled
- Avoid hidden assumptions in chart legends or status labels

## Data ingestion workflow

Phase 1 workflow:

1. Store raw public downloads unchanged in `public/data/source/` or `research/`
2. Create reproducible scripts to transform them into app-ready JSON/GeoJSON
3. Validate transformed outputs against schemas
4. Publish only processed derivatives required by the app
5. Keep client-only future data isolated behind explicit placeholders until supplied

## What not to build in Phase 1

- No login system
- No admin upload console
- No measured post-repair volume engine
- No claim of threshold compliance
- No dependence on private APIs that the public demo cannot support
- No direct copy of Padstow survey assets or narrative data

## Upgrade path when client data arrives

Phase 2 additions should slot into the same architecture:

- July 2026 UAV baseline surface
- orthomosaic and metadata
- exact repaired groyne references
- design thresholds
- six shingle-transfer sections
- optional authenticated internal mode for engineering users

That future mode should extend the data model, not replace the public-data shell.
