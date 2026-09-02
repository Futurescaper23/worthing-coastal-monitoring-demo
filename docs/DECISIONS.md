# Decisions

## Decision log

### D-001

- Date: 2026-08-28
- Decision: Treat `AGENTS.md`, `docs/PROJECT_BRIEF.md`, and `docs/Worthing_Coastal_Defence_Client_Research.md` as authoritative.
- Reason: The user explicitly instructed that the attached files govern this project and any conflict with historical conversation context must be surfaced rather than guessed through.

### D-002

- Date: 2026-08-28
- Decision: Use the current writable workspace as the temporary Worthing project shell for this first task.
- Reason: The intended sibling folder was not mounted writable in this session, and the user instructed me to use the file setup already provided rather than stop on the folder mismatch.
- Consequence: The project shell and documentation now live in `G:\My Drive\Futurescaping\CODEX\Demo Projects\Worthing_costal_monitoring_demo` for this session.

### D-003

- Date: 2026-08-28
- Decision: Keep the existing FutureScaping Change Monitoring System strictly read-only.
- Reason: The user request and `AGENTS.md` both make the reference project a non-modifiable blueprint. This session's sandbox also does not permit writes to `G:\My Drive\Futurescaping\CODEX`.

### D-004

- Date: 2026-08-28
- Decision: Phase 1 will be a public-data demonstration, not an engineering assessment.
- Reason: The brief explicitly forbids claims of measured post-repair change, calculated post-repair volumes, or threshold compliance before client data is supplied.

### D-005

- Date: 2026-08-28
- Decision: Preserve the FutureScaping analytical convention `blue = gain/accretion` and `red = loss/erosion`.
- Reason: This convention is explicitly required by the brief and matches the reference system's measured-change legend.

### D-006

- Date: 2026-08-28
- Decision: Do not copy Padstow survey data, narrative content, auth flows, or hosted embeds into Worthing.
- Reason: The reference system contains client-specific data, service integrations and project wording that would create licensing, privacy and product-scope risk.

### D-007

- Date: 2026-08-28
- Decision: Recommend a typed modern app stack for Worthing rather than cloning the custom vanilla Node architecture.
- Reason: The reference system proves the product shape, but it has no lint/test baseline beyond syntax checks and no real mapping framework for the geography-heavy Worthing screens.

### D-008

- Date: 2026-08-28
- Decision: Make missing-data placeholders a first-class feature from the start.
- Reason: The July 2026 UAV baseline, exact repaired groyne mapping and engineering thresholds are central to the story but unavailable in the public-data release.

### D-009

- Date: 2026-08-28
- Decision: Use Area 1 / Worthing Pier East as the initial proof candidate, subject to profile-to-groyne alignment verification.
- Reason: It is the clearest public-facing location and best matches the project brief and research dossier.

### D-010

- Date: 2026-08-28
- Decision: Verify the app in a local scratch mirror while continuing to treat the Google Drive workspace as the source of truth.
- Reason: The current session can write project files into the mounted Drive workspace, but `node_modules` installation and linking in that location is incomplete and unreliable.
- Consequence: Build and typecheck results are currently confirmed from a mirrored local verification folder, not from the reference project and not from a stable install inside the Drive workspace itself.

### D-011

- Date: 2026-08-28
- Decision: Treat the council overview plan as authoritative for west-to-east work-area sequencing, and use explicit approximate layout weights until GIS tracing is completed.
- Reason: The public overview plan proves spatial order across the frontage, but OCR is not yet strong enough to support final per-area geometry boundaries for every work area.
- Consequence: The current scheme overview is now public-source-derived rather than hand-placed, while still clearly marked as an approximate demonstrator geometry pending traced boundaries.

### D-012

- Date: 2026-08-29
- Decision: Ground the first public profile evidence layer in CCO report-catalogue metadata and documented candidate proof profiles before attempting live survey ingestion.
- Reason: The official CCO public route clearly shows the latest Worthing survey-unit reporting, but the API documentation also states that requests require an API key and referer configuration.
- Consequence: The profiles screen can now present a truthful public ingestion route immediately, while the actual file-ingestion step remains a defined follow-on task rather than an implied completed capability.

### D-013

- Date: 2026-08-29
- Decision: Replace scheme-layout weights with an approximate public coordinate trace anchored to named frontage landmarks.
- Reason: Public coordinate references are available for Sea View Road, the Lido, Worthing Pier, Warwick Road, Denton Gardens, the Esplanade, Navarino Road, Ophir Road, Brougham Road and Brooklands, which is enough to make the scheme presentation feel geographically grounded before full GIS tracing.
- Consequence: The scheme view now uses approximate public geography instead of pure layout proportions, while remaining clearly labelled as presentation-grade and not engineering geometry.

### D-014

- Date: 2026-08-29
- Decision: Add a public environmental context layer based on confirmed CCO station pages before attempting any live environmental feed integration.
- Reason: Worthing Pier, Arun Platform and Brighton are all identifiable on public CCO pages, and that is enough to support a truthful timeline-context panel without implying quality-controlled engineering forcing analysis.
- Consequence: The scheme and timeline screens now have named public station context with explicit warnings that real-time records are not quality-controlled and nearby stations are context only.
