# AGENTS.md — Worthing Coastal Monitoring Demonstrator

## Mission

Build an independent FutureScaping demonstrator for the Worthing Capital Maintenance Coastal Defence Project. Use publicly available information first. The product supports a client conversation; it is not an engineering assessment and must not invent unavailable post-works results.

## Hard filesystem boundary

- The Worthing project directory is the only writable project area.
- The existing FutureScaping Change Monitoring System is a read-only reference.
- Never edit, rename, move, delete, format, install dependencies into, generate build artefacts inside, or run migrations against the reference project.
- Never use the reference project as the current working directory for mutating commands.
- Before any write, resolve the target path and confirm it is inside the Worthing project.
- If the permission boundary is not enforceable or the path is ambiguous, stop and ask for direction.

## Reference-system use

- Inspect first and write `docs/REFERENCE_SYSTEM_AUDIT.md` before implementation.
- Reuse design ideas deliberately; do not clone or rebrand the old application wholesale.
- Record the source of any copied component, asset, schema or pattern.
- Do not copy secrets, environment files, client data, generated caches or third-party assets without a clear licence.
- The new application must run without the reference project being mounted.

## Product rules

- Preserve the FutureScaping visual family and the convention blue = gain, red = loss.
- Keep the Worthing interface simpler and directed at the repaired coastal-defence frontage.
- Design around the full scheme overview and one detailed proof area.
- Every displayed dataset needs source, date, licence, coordinate system and quality status.
- Label profile-derived metrics as proxies unless a continuous surface supports volume calculations.
- Clearly mark the July 2026 UAV baseline and engineering thresholds as client data required until received.
- Do not infer intervention thresholds from public flood-risk maps or visual appearance.
- Do not redistribute the council work-plan aerial basemaps; recreate factual geometry on a permitted base layer.
- Distinguish provisional real-time sensor data from quality-controlled historical records.

## Working practice

- Preserve raw downloads unchanged under `public/data/source/` or `research/`.
- Put transformations in scripts and generated application data under `public/data/processed/`.
- Maintain `docs/DATA_CATALOGUE.md` and `docs/DECISIONS.md`.
- Prefer reproducible processing over manual editing.
- Keep units, datums, CRS and survey dates explicit.
- Run the discovered lint, build and test commands after material changes.
- Use screenshots/browser checks to verify maps, charts, layout and interaction before calling work complete.

## Phase 1 output

- full-frontage Worthing scheme map;
- ten work areas;
- selected CCO profiles and public-data coverage;
- a Pier East historical comparison, subject to profile alignment verification;
- storm/tide/survey context;
- bay-status interface with honest client-data placeholders;
- provenance/uncertainty view;
- a short client walkthrough.

## Done means

- original reference project has no changes;
- application runs independently from the Worthing directory;
- public facts are traceable and limitations are visible;
- no unsupported engineering claim is made;
- one-area UAV data can later be inserted without redesigning the application;
- build, lint and tests pass;
- visual QA has been completed.
