# Reference System Audit

## Scope

This audit was completed on 28 August 2026 by inspecting the existing FutureScaping reference system read-only.

Reference locations inspected:

- Primary application: `G:\My Drive\Futurescaping\CODEX\Active Projects\change-monitoring-system`
- Related public/client variant: `G:\My Drive\Futurescaping\CODEX\Client Projects\future-monitoring-system`

The two folders are closely related. The active-project folder is the richer working version and includes admin flows, templating and additional survey assets. The client-project folder appears to be a trimmed public/client-facing sibling.

## Executive summary

The current Change Monitoring System is a custom, framework-light Node 20 application serving static HTML/CSS/JS with local JSON and file-backed survey assets. It is not a React or Next.js app. The strongest reusable value is its product grammar rather than its codebase as-is: viewer-first layout, dark FutureScaping styling, survey/area data conventions, section-profile storytelling, and evidence panels that combine imagery, timing and interpretation.

For Worthing, the safest approach is to reuse the visual language and information architecture selectively while building an independent application with public-data-safe content and a stricter provenance model. The Phase 1 Worthing demonstrator should not inherit the reference system's file-writing admin workflows, Padstow-specific copy, or any client survey assets.

## Framework and package versions

Observed in `package.json`:

- Runtime: Node.js `>=20`
- Package name: `future-monitoring-system`
- Version: `0.1.0`
- Module system: ESM (`"type": "module"`)
- NPM scripts:
  - `npm start` -> `node server.js`
  - `npm run check` -> syntax check of `app.js` and `server.js`

Observed hosting/runtime configuration:

- `render.yaml` targets a Node web service on Render
- `NODE_VERSION` is pinned to `20`
- No `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock` was found in the inspected application folder
- No declared npm dependencies were found in `package.json`

Practical conclusion:

- The app is mostly "vanilla web app plus Node server"
- Third-party browser libraries are loaded from CDNs instead of npm
- There is no built-in linting or automated test suite beyond syntax checking

## Application structure and routes

Top-level structure in the active reference app:

- `index.html`: single-page shell
- `styles.css`: global styling and component styles
- `app.js`: large client-side controller and renderer
- `server.js`: custom HTTP server and API routes
- `weather-dashboard.html` and `weather-dashboard.js`: embedded environmental dashboard
- `src/config/` and `src/data/`: reusable config/data modules
- `survey-data/`: survey-round assets by project/date/area
- `shared-data/`: shared overlays and geometry-like assets
- `data/`: project metadata, trend manifests and access users
- `assets/`: hero images and trend panels
- `docs/`: workflow and process documents

HTTP routes handled by `server.js`:

- Public pages:
  - `/` -> `index.html`
  - `/login`
  - static file serving for local assets
- Auth/session endpoints:
  - `/api/site-auth/login`
  - `/api/site-auth/logout`
  - `/api/site-auth/session`
- Admin/data-writing endpoints:
  - `/api/upload`
  - `/api/surveys/create`
  - `/api/admin-auth`
  - `/api/survey-area-metadata`
  - `/api/survey-area-metadata/reset`
  - `/api/volume-change`
  - `/api/access-users`
  - `/api/access-users/update`
  - `/api/access-users/delete`
- Environmental data endpoints:
  - `/api/weather`
  - `/api/tides`

UI route model:

- This is a single-page application with tabbed panels rather than multi-page client routing.
- Main tabs observed in `index.html` and config:
  - `overview`
  - `areas`
  - `weather`
  - `panorama`
  - `volume`
  - `layers`
  - `sections`
  - `admin`

Worthing implication:

- The tabbed information architecture is useful.
- The file-writing admin/server architecture is not needed for the first public-data demonstrator.

## Styling, colours, typography and design tokens

Observed visual system in `styles.css`:

- Base background tokens:
  - `--bg: #07111f`
  - `--bg-2: #0b1628`
- Panel/card tokens:
  - `--panel: rgba(11, 20, 35, 0.9)`
  - `--panel-2: #182743`
  - `--panel-3: #223657`
  - `--card-strong: rgba(23, 37, 61, 0.96)`
  - `--card-soft: rgba(18, 31, 52, 0.92)`
- Text tokens:
  - `--text: #eef4ff`
  - `--muted: #aab9d3`
- Border/shadow tokens:
  - `--line: rgba(255, 255, 255, 0.12)`
  - `--shadow: 0 18px 40px rgba(0, 0, 0, 0.34)`
- Accent tokens:
  - `--accent: #79a7ff`
  - `--accent-2: #5b83d8`

Other styling observations:

- Typography relies on Google Fonts `Montserrat`
- The visual system is dark, image-first and gradient-heavy
- Common gradients blend navy, cyan and lighter blue rather than a flat single background
- There are utility colour families for status chips/cards:
  - cyan
  - amber
  - green
  - rose
- Volume/trend legends explicitly use blue for gain and red for loss in the measured-change views

Worthing reuse guidance:

- Safe to reimplement the dark panel language, spacing, rounded-card treatment, and viewer-first hierarchy
- Preserve the analytical convention explicitly:
  - blue = gain or accretion
  - red = loss or erosion
- Avoid inheriting Padstow titles, hero images or social metadata

## Reusable interface and presentation patterns

Strong reusable patterns identified:

- Hero shell / stagebar
  - Branded top shell with image stage, title, summary and survey/area pills
  - Template already exists under `src/templates/futurescaping-hero-shell/`
- Compact left-to-right tab rail
  - Keeps top-level modes visible without heavy navigation chrome
- Viewer-first comparison panel
  - Imagery stays dominant while controls remain compact
- Stats-grid cards
  - Used consistently for summary metrics and quick evidence
- Detail-list panels
  - Good pattern for provenance, method and interpretation notes
- Area cards and quick filters
  - Useful for moving between ten work areas
- Full-screen inspection/lightbox patterns
  - Helpful for change rasters, plan overlays and evidence images
- Timeline panels
  - Strong fit for storm, tide and survey sequencing
- Section workspace
  - Combines a section map and custom chart in one analysis view

Worthing-specific recommendation:

- Reimplement the shell, cards, evidence drawers and comparison workspace
- Simplify the navigation to the six screens already defined in the brief
- Keep the first release lighter than the Padstow system

## Maps, charts, cross-sections, timelines and data components

Observed implementation patterns:

- Maps:
  - No dedicated web mapping library such as Leaflet or Mapbox was found in the reference system
  - "Map-like" views are primarily rendered from static imagery, overlays and area assets
- Charts:
  - `weather-dashboard.html` loads `Chart.js` and `chartjs-adapter-date-fns` from jsDelivr CDNs
  - Weather/tide charts are embedded via iframe into the main app
- Cross-sections:
  - Section charts are custom-rendered SVG inside `app.js`
  - Section hover, comparison and local zoom are custom coded
- Timelines:
  - Timelines are rendered as DOM components in the main app
- Volume/change views:
  - Reference imagery galleries
  - Trend legends
  - Polygon-driven summaries sourced from JSON and GeoJSON-like assets
- Panorama and 3D:
  - Panoramas are embedded by iframe
  - Nira model links are configured per survey

Worthing implication:

- The reference system proves the storytelling pattern, not the final technical choice
- For Worthing, a real slippy map should be introduced for the scheme overview and work-area detail screens
- The section comparison pattern is worth reusing conceptually, but the public-data release must label profile-derived interpretation as proxy evidence

## Data structures and asset-loading methods

Observed configuration modules:

- `src/config/projectConfig.js`
  - Product name, branding assets, default state, navigation tabs and terminology
- `src/data/areas.js`
  - Area count, labels, expected file names, survey/shared roots and filename variants
- `src/data/surveys.js`
  - Survey-round defaults and folder conventions
- `src/data/sections.js`
  - Default section count and tracks
- `src/data/volumeChange.js`
  - Monitored-zone terminology and defaults
- `src/data/environmentalContext.js`
  - Tide provider coordinates and weather window defaults

Observed project dataset model in `data/projects.json`:

- Root `projects[]`
- Per-project fields:
  - metadata
  - site context
  - programme narrative
  - legacy app references
  - `surveys[]`
  - `surveyAreaOverrides`
  - `volumeChangeComparisons`
- Survey records include:
  - `id`
  - `label`
  - `dateFrom`
  - `dateTo`
  - `status`
  - `readiness`
  - `assetFolder`
  - `dataFolder`
  - `comparisonBaseline`

Observed asset conventions:

- Survey assets:
  - `survey-data/<project>/<survey>/<area>/`
- Shared assets:
  - `shared-data/<project>/<area>/`
- Expected filenames:
  - `ortho.jpg`
  - `dsm.png`
  - `contour.png` or `contours.png`
  - `section_lines.png` or `section-lines.png`
  - `section_profiles.csv`
  - `manifest.json`
- Some geometry assets are stored as GeoJSON:
  - `sandbar-polygons.geojson`
  - `line-length.geojson`

Worthing reuse guidance:

- Safe to reuse the idea of explicit project/survey/area folders
- Safe to reuse manifest-driven asset readiness
- Safe to reimplement a typed project dataset with explicit provenance fields
- Do not inherit Padstow-specific field content or survey states directly

## Build, development, lint and testing commands

Commands discovered:

- Local development:
  - `node server.js`
  - `npm start`
  - `run-local.cmd`
- Syntax check:
  - `npm run check`

What was not found:

- No ESLint configuration
- No unit or integration test runner
- No build step beyond hosting the Node service
- No TypeScript compiler

Worthing implication:

- The reference system is useful as a product prototype but light on engineering safeguards
- The Worthing demonstrator should adopt a stronger development baseline than syntax checks alone

## Third-party dependencies and licensing considerations

Third-party services and assets observed:

- Google Fonts:
  - `Montserrat` loaded from `fonts.googleapis.com` / `fonts.gstatic.com`
- Charting:
  - `Chart.js` loaded from jsDelivr CDN
  - `chartjs-adapter-date-fns` loaded from jsDelivr CDN
- Tide data:
  - WorldTides API via `WORLDTIDES_API_KEY`
- Weather data:
  - Open-Meteo archive referenced in the weather dashboard copy
- Panorama hosting:
  - Netlify-hosted panorama embeds
- 3D model hosting:
  - Nira links per survey
- Hosting:
  - Render deployment config

Licensing/compliance actions for Worthing:

- Check licences/terms before reusing any CDN-loaded libraries in a public deployment
- Do not copy Nira URLs, Netlify panorama URLs or any hosted client assets
- Do not redistribute aerial or survey imagery from the reference system
- Do not reuse third-party basemaps from council plan PDFs
- Replace any external embeds with Worthing-specific, permissioned or openly licensed equivalents

## Public/private separation and sensitive material

Sensitive or client-specific material identified:

- `data/projects.json`
  - Contains Padstow project narrative, area notes, operational observations and survey timing detail
- `survey-data/`
  - Contains project survey outputs and processed imagery
- `shared-data/`
  - Contains overlays and project geometry
- `data/access-users.json`
  - Access-control store
- `login.html` and auth routes
  - Site access pattern that should not be copied into a public demo without purpose
- `.env.example`
  - Signals required server secrets
- WorldTides API integration
  - Requires non-public API key
- Nira and panorama embed URLs
  - Client/project-specific hosted resources
- Client-project temp browser profile folders
  - Operational artefacts that must not be copied

Additional note:

- `privacy.html`, `cookies.html` and `contact.html` are public-facing support pages, but their project wording and contact content are still specific to the existing monitoring product and should not be copied wholesale.

## Reuse classification

### Safe to reuse directly

- `src/templates/futurescaping-hero-shell/`
  - Safe only if origin is recorded and branding/content is replaced
- General folder conventions for `survey-data/` and `shared-data/`
  - Safe as a pattern, not as copied content

### Safe to reimplement

- Dark FutureScaping visual language
- Viewer-first layout
- Survey/area switching model
- Evidence cards, summary metrics and provenance drawers
- Timeline and environmental context layout
- Comparison workspace concept
- Section analysis workspace concept
- Manifest/readiness concept for assets

### Project-specific and unsuitable for Worthing

- Padstow copy, titles, summaries and survey chronology
- Sandbar-specific narrative when no measured Worthing comparison exists
- Client login/access-user workflows for the initial public-data demo
- Padstow assets, hero images, area imagery and section overlays
- Area IDs, counts and narratives
- Tide coordinates and environmental defaults for Padstow

### Third-party/licensing check required

- Montserrat webfont loading
- Chart.js CDN usage
- Any future external basemap or tile provider
- Any external panorama or 3D embed
- Any reference-system documentation or imagery intended for reuse

### Must not be copied

- Any `survey-data/` imagery, CSVs, manifests or outputs
- Any `shared-data/` geometry or overlays derived from the existing client project
- `data/projects.json` content
- `data/access-users.json`
- Any `.env` or secret-backed configuration
- Any Nira/private hosted model links
- Any temporary browser profile folders or operational local artefacts

## Recommended takeaways for Worthing

1. Keep the independent Worthing app separate from the reference runtime and data folders.
2. Reuse the product grammar, not the Padstow payload.
3. Upgrade the engineering baseline from ad hoc static JS to a maintainable typed application.
4. Use a real map stack for Worthing's geography-heavy overview and work-area detail screens.
5. Make provenance, uncertainty and missing-data labels first-class UI elements from the start.
6. Exclude admin upload, auth and measured-volume flows from the first public-data demonstration.
