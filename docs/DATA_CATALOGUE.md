# Data Catalogue

## Purpose

This catalogue tracks every dataset considered for the Worthing demonstrator and records whether it is ready for public-demo use.

## Status key

- `ready` = available and suitable for Phase 1
- `pending-download` = public source identified but not yet ingested
- `pending-validation` = data located but still needs CRS/licence/date review
- `client-data-required` = required for enhanced proof but not publicly available here
- `do-not-redistribute` = reference-only or third-party restricted

## Core datasets

| ID | Dataset | Source | Coverage | Licence | CRS / Datum | Status | Notes |
|---|---|---|---|---|---|---|---|
| worthing-scheme-brief | Project brief / kickoff pack | Internal handover | Whole demonstrator | Internal | n/a | ready | Authoritative instructions for setup and scope. |
| worthing-client-research | Worthing client research dossier | Internal handover | Whole demonstrator | Internal | n/a | ready | Authoritative background summary for client context. |
| worthing-agents-template | AGENTS instructions | Internal handover | Whole demonstrator | Internal | n/a | ready | Authoritative workflow and safety rules. |
| worthing-derived-scheme-geometry | Generated scheme extent and work-area sequence | Derived from Adur & Worthing public page, overview PDF and public landmark coordinate references | Scheme frontage | Internal derivative of public sources | Approximate public coordinate trace | ready | Uses the public west-to-east area sequence and approximate public coordinate anchors until GIS tracing is completed. |
| worthing-profile-catalogue | Generated CCO profile-route catalogue | Derived from CCO reports catalogue and API documentation | Pier East proof-area evidence route | Internal derivative of public sources | n/a | ready | Confirms the current public route into 4dSU16 Worthing reporting and records API/key constraints before live download work. |
| worthing-environment-context | Generated public station context layer | Derived from CCO realtime station pages and public station listing | Timeline and status context | Internal derivative of public sources | WGS84-style public coordinates where published | ready | Provides local Worthing Pier met context plus nearby Arun Platform and Brighton context with explicit non-QC cautions. |
| council-work-area-pdfs | Worthing work-area PDF plans | Adur & Worthing Councils | Ten work areas | Review required | Unknown | pending-download | Useful for geometry interpretation; do not reuse basemap imagery directly. |
| cell4-defence-shapefile-2014 | Cell 4 coastal defence shapefile | Local research material | Regional | Likely OGL; verify | Unknown | pending-validation | Historical/generalised reference only; not an as-built groyne register. |
| cco-profiles-4dSU16 | Cross-shore profile series | Channel Coastal Observatory | Worthing frontage | Verify | Likely OSGB36 + local vertical reference; verify | pending-download | Highest-value public morphologic time series for Phase 1. |
| cco-lidar | CCO LiDAR layers | Channel Coastal Observatory | Worthing / wider frontage | Verify | Verify per dataset | pending-download | Use only with explicit capture dates. |
| ea-national-lidar | EA timestamped LiDAR | Environment Agency | Worthing and surroundings | Open government source; verify exact terms | Verify per tile | pending-download | Better for historic context than post-repair proof. |
| cco-orthophoto | Regional orthorectified aerial imagery | Channel Coastal Observatory | Worthing frontage | Verify | Verify per layer | pending-download | Check copyright and publication date before use. |
| cco-asset-register | Coastal Defence Asset Register extracts | Channel Coastal Observatory | Assets / groynes | OGL or service-specific; verify | Verify | pending-download | Candidate source for public asset context. |
| cco-wave-tide-api | Historic and real-time environmental feeds | Channel Coastal Observatory | Nearby stations | API terms apply | n/a | pending-download | Distinguish provisional live feeds from quality-controlled history. |
| cco-storm-catalogue | Storm event catalogue | Channel Coastal Observatory | Regional | Verify | n/a | pending-download | Useful for event windows between surveys. |
| worthing-pier-met | Worthing Pier meteorological station history | CCO / regional monitoring | Local | Verify | n/a | pending-download | Candidate for local environmental context. |
| rustington-wave | Rustington wave buoy data | CCO / regional monitoring | Nearby offshore | Verify | n/a | pending-download | Nearest candidate wave context source. |
| arun-brighton-tide-context | Arun Platform / Brighton tide and met context | CCO / regional monitoring | Nearby | Verify | n/a | pending-download | Nearby context only, not a Worthing tide gauge. |
| ea-eia-notice | Flood defences environmental notice | Environment Agency | Whole scheme | Public source | n/a | ready | Key source for scheme extent and six transfer sections. |
| mmo-licence-package | MMO licence and attachments | Public register | Whole scheme | Verify | n/a | pending-download | Needed before any formal proposal claims. |
| july-2026-uav-baseline | July 2026 UAV baseline — client data required. | Client / council | Post-repair scheme proof | Client controlled | Unknown until supplied | client-data-required | Must be clearly labelled unavailable in Phase 1. |
| repaired-groyne-ids | Exact repaired groyne IDs and repair types | Client / council | Work-area detail | Client controlled | n/a | client-data-required | Needed for strong bay-level assertions. |
| design-thresholds | Design beach profile / crest / threshold values | Client / council | Status / intervention views | Client controlled | Unknown until supplied | client-data-required | Do not infer from public sources. |
| transfer-sections | Six shingle-transfer boundaries and target volumes | Client / council | Intervention view | Client controlled | Unknown until supplied | client-data-required | Needed before any movement/volume recommendation. |

## Restrictions and red lines

| Item | Restriction |
|---|---|
| Council work-plan aerial basemaps | Do not redistribute. Recreate geometry on permitted baselayers instead. |
| Reference project survey imagery and CSVs | Do not copy into Worthing. |
| Private API keys or hosted client embeds | Do not copy into Worthing. |
| Public flood-risk layers | Context only; not a substitute for engineering thresholds. |

## Immediate ingestion priorities

1. CCO profile series for the Pier East proof area
2. Work-area geometry derived from public plans without copying restricted imagery
3. Public environmental context sources for timeline panels
4. Timestamped elevation context from CCO or EA
5. Asset reference layers that can legally support public display
6. GIS tracing of the public work-area plans onto a permitted baselayer
7. Direct public download or approved access route for candidate Worthing profile files
