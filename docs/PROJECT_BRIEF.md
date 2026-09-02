# Worthing Coastal Monitoring Demonstrator — Codex Kickoff Pack

**Prepared:** 27 August 2026  
**Purpose:** Give a fresh Codex project enough context to inspect the existing FutureScaping Change Monitoring System safely and build an independent Worthing-specific demonstrator.

## 1. Project objective

Build a lightweight, client-facing Worthing coastal-defence monitoring demonstrator using publicly available data first.

The demonstrator should borrow the visual language, interaction patterns and proven presentation ideas from the existing FutureScaping Change Monitoring System, while remaining an independent project with its own directory, code, data and documentation.

The first release is intended to win a technical conversation with Worthing Borough Council and the Environment Agency. It must not imply that FutureScaping has measured post-repair performance before the council releases the July 2026 UAV baseline and engineering thresholds.

## 2. Project locations

Proposed new writable project directory:

`G:\My Drive\Futurescaping\WORTHING_COASTAL_MONITORING`

Existing reference project:

`G:\My Drive\Futurescaping\CODEX`

The existing project is a reference/blueprint only. It must remain unmodified.

## 3. Recommended Codex setup

### Simple setup in the ChatGPT desktop app

1. Create the new Worthing directory as a sibling of the existing `CODEX` directory.
2. Create or open a local Codex project.
3. From the project menu, choose **Edit project**.
4. Add both folders.
5. Make `WORTHING_COASTAL_MONITORING` the primary folder.
6. Keep `CODEX` as the secondary reference folder.

Multi-folder projects make both folders available to Codex. This alone does not technically stop edits to the secondary folder, so use the project instructions below at minimum. For enforced protection, use a custom permissions profile.

### Enforced read-only reference

Create a project-specific `.codex/config.toml` in the new Worthing project after confirming the exact Windows paths and that custom permission profiles are allowed in the current workspace.

The intended policy is:

- minimal system paths: read;
- `WORTHING_COASTAL_MONITORING`: write;
- existing `CODEX`: read only;
- environment/credential files: deny.

Illustrative configuration—have Codex validate this against the installed version before enabling it:

```toml
default_permissions = "worthing-build"

[permissions.worthing-build]
description = "Write Worthing project; read original Change Monitoring project."
extends = ":read-only"

[permissions.worthing-build.workspace_roots]
'G:\My Drive\Futurescaping\WORTHING_COASTAL_MONITORING' = true
'G:\My Drive\Futurescaping\CODEX' = true

[permissions.worthing-build.filesystem]
":minimal" = "read"
'G:\My Drive\Futurescaping\WORTHING_COASTAL_MONITORING' = "write"
'G:\My Drive\Futurescaping\CODEX' = "read"
'**/*.env' = "deny"
```

If the installed Codex version or managed workspace rejects the profile, stop and use an operating-system read-only permission on the reference folder for the duration of the inspection. Do not fall back to unrestricted access.

## 4. Files to place in the new project

At the new project root:

- rename `Worthing_AGENTS_TEMPLATE.md` to `AGENTS.md`;
- place `Worthing_Coastal_Defence_Client_Research.md` under `docs/`;
- retain this kickoff pack under `docs/` as `PROJECT_BRIEF.md`;
- copy the downloaded Worthing source material into `research/`, preserving filenames and provenance.

Suggested structure:

```text
WORTHING_COASTAL_MONITORING/
├── AGENTS.md
├── app/ or src/
├── public/
│   └── data/
│       ├── source/
│       └── processed/
├── research/
│   ├── works-plans/
│   └── public-data/
├── docs/
│   ├── PROJECT_BRIEF.md
│   ├── Worthing_Coastal_Defence_Client_Research.md
│   ├── DATA_CATALOGUE.md
│   └── DECISIONS.md
└── tests/
```

Do not create a runtime symlink from the new application into the original Change Monitoring project. Any design or code pattern selected for use should be deliberately reimplemented or copied into the new project with its origin recorded.

## 5. Existing Change Monitoring System: what to inspect

Known characteristics of the reference system:

- client-facing FutureScaping Change Monitoring / Estuary Monitoring platform;
- repeat drone surveys and scan dates;
- photogrammetry, orthomosaics and DSM/elevation models;
- sediment change maps and volume analysis;
- area-by-area monitoring;
- cross-sections/profile charts;
- panoramas and fixed monitoring points;
- interactive 3D/Nira links;
- client dashboard plus public-facing explanations;
- established analytical colour convention: blue = gain, red = loss;
- black/dark presentation styling, coloured point-cloud imagery, green brand divider/accent, subtle panel/border treatment and FutureScaping branding.

Before writing application code, Codex should inspect:

1. `package.json` and exact framework/version;
2. application entry points and route structure;
3. global styles, design tokens, typefaces and colour variables;
4. reusable map, chart, timeline, card, navigation and evidence components;
5. data schemas and asset-loading patterns;
6. public/private/client-facing separation;
7. local development, build, lint and test commands;
8. licences and origin of any third-party assets.

Produce an inspection report before copying or reimplementing anything. The report should distinguish:

- safe to reuse directly;
- safe to reimplement;
- project-specific and unsuitable for Worthing;
- third-party/licensing check required;
- data or secrets that must not be copied.

## 6. Worthing demonstrator scope

### Full-frontage overview

- 3.7 km scheme from groyne 69 at Sea View Road to groyne 140 at Brooklands;
- ten public work areas;
- CCO survey profiles and available elevation/imagery coverage;
- relevant assets and environmental/context layers;
- nearby wave, tide and meteorological sources;
- source date, licence and quality status for every layer.

### Detailed proof area

Initial candidate: Area 1 / frontage immediately east of Worthing Pier.

Reasons:

- council confirms repair of the groyne immediately east of the pier;
- historic shingle placement is recorded at profiles 4d00824–4d00825;
- the pier gives an immediately recognisable client location;
- it supports a small proof rather than an unpaid whole-frontage analysis.

Confirm profile-to-groyne alignment before making any technical claim.

### Initial screens

1. Scheme overview map.
2. Work-area and selected-bay detail.
3. Historical survey/profile comparison.
4. Storm, tide and survey timeline.
5. Intended bay-status/intervention panel.
6. Data provenance and uncertainty view.

### Honest limitations

The public-data release must not claim:

- measured post-repair surface or volume change;
- compliance with a design beach profile;
- an engineering recommendation to recycle shingle;
- an exact relationship between a repaired groyne and an unverified profile;
- quality-controlled Worthing wave/tide observations where only nearby sensors exist.

The unavailable post-works layer should be clearly labelled, for example: **“July 2026 UAV baseline — client data required.”**

## 7. Data currently available

### Locally collected research material

- official overview and ten work-area PDFs;
- rendered reference images of those plans;
- 2014 Cell 4 coastal-defence shapefile and supporting files;
- cited client research dossier.

### Public sources identified but not yet fully downloaded

- CCO topographic profiles for survey unit 4dSU16 / management unit 4dMU8B;
- CCO LiDAR, aerial photography, bathymetry and 3D/asset records;
- CCO real-time/historic wave, tide and meteorological data;
- CCO storm catalogue;
- Environment Agency timestamped National LiDAR data;
- Shoreline Management Plan and coastal-risk context;
- final MMO licence package and environmental attachments.

### Client data required for the enhanced proof

- July 2026 UAV DSM/DTM or point cloud;
- orthomosaic;
- flight/QC metadata and coordinate reference system;
- latest spring/autumn profiles;
- repaired groyne IDs and repair types;
- design beach profile, crest or volume thresholds;
- relevant as-built sketches;
- six shingle-transfer section boundaries and target volumes.

## 8. Phase 1 workflow

1. Inspect the reference project read-only.
2. Write `docs/REFERENCE_SYSTEM_AUDIT.md`.
3. Confirm the new app’s technology stack and record the decision.
4. Create the new project shell.
5. Build a data catalogue with source, date, licence, coordinate system and status.
6. Download and validate public Worthing profile/elevation data.
7. Build the full-frontage overview.
8. Build the Pier East detailed example.
9. Add provenance, limitations and client-data placeholders.
10. Verify the application visually and technically.
11. Produce a short client walkthrough/storyboard.
12. Review internally before any contact with Worthing Borough Council.

## 9. Phase 1 definition of done

- application runs locally from the new Worthing directory;
- original Change Monitoring project has no modified files;
- every displayed value is traceable to a public source;
- no third-party aerial image has been redistributed without permission;
- map and charts work at normal desktop and presentation sizes;
- public-data limitations are prominent and unambiguous;
- the design visibly belongs to the FutureScaping family without looking like a renamed copy;
- one-area client data can later be inserted without rebuilding the application architecture;
- lint/build/tests pass using the commands discovered from the selected stack;
- a concise meeting walkthrough exists.

## 10. First prompt for Codex

Use this in a new chat after the folders and project files have been added:

> We are starting the Worthing Coastal Monitoring Demonstrator. Read `AGENTS.md`, `docs/PROJECT_BRIEF.md` and `docs/Worthing_Coastal_Defence_Client_Research.md` completely before acting. The primary Worthing project is writable. The existing FutureScaping Change Monitoring System is a read-only reference: do not edit, format, install into, generate files inside, or run destructive commands against it. First inspect its package, routes, styling, components, data patterns and licences. Then produce `docs/REFERENCE_SYSTEM_AUDIT.md` and a proposed Worthing architecture. Do not start implementation until the audit establishes what can safely be reused or reimplemented. The initial product is a public-data demonstration, not an engineering assessment, and must clearly identify every unavailable or unverified layer.

## 11. First-session checks

Ask Codex to report:

- primary and secondary folder paths;
- active instruction files;
- active permission profile;
- write test result inside the new Worthing project;
- confirmation that it did not attempt a write in the reference project;
- reference project framework and start/build/test commands;
- any missing files required before implementation.

Do not begin the build if Codex cannot distinguish the writable project from the read-only reference.
