import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import type {
  ConditionComparisonAsset,
  DatasetCatalogueItem,
  DatasetReadiness,
  EnvironmentContext,
  EvidencePanel,
  IllustrationAsset,
  ProfileCatalogue,
  ProvenanceItem,
  SchemeGeometry,
  ScreenCard,
  StatusCard,
  StoryBeat,
  SourceRegisterItem,
  SchemeAnchor,
  TimelineContextItem,
  TimelineEvent,
  WorkAreaCard
} from "@/lib/site-data";

import styles from "./cards.module.css";

export type ImageMarker = {
  label: string;
  top: string;
  left: string;
  align?: "start" | "center" | "end";
  tone?: "neutral" | "gain" | "loss" | "warning";
};

export type VisualEvidenceCard = {
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  fit?: "cover" | "contain";
  chips?: ReadonlyArray<string>;
  markers?: ReadonlyArray<ImageMarker>;
};

export function SectionHeading({
  eyebrow,
  title,
  summary
}: {
  eyebrow: string;
  title: string;
  summary: string;
}) {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}

export function Surface({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`${styles.surface} ${className}`.trim()}>{children}</section>;
}

export function StatGrid({
  items
}: {
  items: ReadonlyArray<{ label: string; value: string; note: string }>;
}) {
  return (
    <div className={styles.statGrid}>
      {items.map((item) => (
        <article key={item.label} className={styles.statCard}>
          <p className={styles.statLabel}>{item.label}</p>
          <strong className={styles.statValue}>{item.value}</strong>
          <p className={styles.statNote}>{item.note}</p>
        </article>
      ))}
    </div>
  );
}

export function ScreenGrid({ items }: { items: ScreenCard[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <Link key={item.id} href={item.href} className={styles.screenCard}>
          <p className={styles.eyebrow}>{item.eyebrow}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <span className={styles.statusPill}>{item.status}</span>
        </Link>
      ))}
    </div>
  );
}

export function ImageEvidenceCard({
  item,
  compact = false
}: {
  item: VisualEvidenceCard;
  compact?: boolean;
}) {
  if (item.fit === "contain") {
    return (
      <article className={styles.mapEvidenceCard}>
        <div className={styles.mapEvidenceMedia}>
          <Image
            src={item.image}
            alt={item.alt}
            fill
            className={styles.mapEvidenceImage}
            sizes="(max-width: 1080px) 100vw, 50vw"
          />
          <div className={styles.mapEvidenceShade} />

          {item.markers?.map((marker) => (
            <span
              key={`${item.title}-${marker.label}`}
              className={`${styles.visualMarker} ${
                marker.tone === "gain"
                  ? styles.visualMarkerGain
                  : marker.tone === "loss"
                    ? styles.visualMarkerLoss
                    : marker.tone === "warning"
                      ? styles.visualMarkerWarning
                      : styles.visualMarkerNeutral
              } ${
                marker.align === "start"
                  ? styles.visualMarkerStart
                  : marker.align === "end"
                    ? styles.visualMarkerEnd
                    : styles.visualMarkerCenter
              }`}
              style={{ top: marker.top, left: marker.left }}
            >
              {marker.label}
            </span>
          ))}
        </div>
        <div className={styles.mapEvidenceCopy}>
          <p className={styles.eyebrow}>{item.eyebrow}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          {item.chips?.length ? (
            <div className={styles.imageChipRow}>
              {item.chips.map((chip) => (
                <span key={chip} className={styles.imageChip}>
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article
      className={`${styles.imageEvidenceCard} ${compact ? styles.imageEvidenceCardCompact : ""}`.trim()}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        className={styles.imageEvidenceImage}
        sizes="(max-width: 1080px) 100vw, 50vw"
      />
      <div className={styles.imageEvidenceShade} />
      <div className={styles.imageEvidenceScan} aria-hidden="true" />

      {!compact && item.markers?.map((marker) => (
        <span
          key={`${item.title}-${marker.label}`}
          className={`${styles.visualMarker} ${
            marker.tone === "gain"
              ? styles.visualMarkerGain
              : marker.tone === "loss"
                ? styles.visualMarkerLoss
                : marker.tone === "warning"
                  ? styles.visualMarkerWarning
                  : styles.visualMarkerNeutral
          } ${
            marker.align === "start"
              ? styles.visualMarkerStart
              : marker.align === "end"
                ? styles.visualMarkerEnd
                : styles.visualMarkerCenter
          }`}
          style={{ top: marker.top, left: marker.left }}
        >
          {marker.label}
        </span>
      ))}

      <div className={styles.imageEvidenceCopy}>
        <p className={styles.eyebrow}>{item.eyebrow}</p>
        <h3>{item.title}</h3>
        <p>{item.summary}</p>
        {item.chips?.length ? (
          <div className={styles.imageChipRow}>
            {item.chips.map((chip) => (
              <span key={chip} className={styles.imageChip}>
                {chip}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function VisualStoryPanel({
  lead,
  detail,
  insight
}: {
  lead: VisualEvidenceCard;
  detail: VisualEvidenceCard;
  insight: {
    eyebrow: string;
    title: string;
    summary: string;
    bullets: ReadonlyArray<string>;
    callout: string;
  };
}) {
  return (
    <div className={styles.visualStoryPanel}>
      <ImageEvidenceCard item={lead} />

      <div className={styles.visualStorySide}>
        <ImageEvidenceCard item={detail} compact />

        <article className={styles.visualInsightCard}>
          <p className={styles.eyebrow}>{insight.eyebrow}</p>
          <h3>{insight.title}</h3>
          <p>{insight.summary}</p>
          <ul className={styles.bulletList}>
            {insight.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <div className={styles.visualCallout}>{insight.callout}</div>
        </article>
      </div>
    </div>
  );
}

export function IllustrationGallery({
  items,
  eyebrow = "Illustrative visual set"
}: {
  items: readonly IllustrationAsset[];
  eyebrow?: string;
}) {
  return (
    <div className={styles.illustrationPanel}>
      <div className={styles.assetDisclosure}>
        <strong>Visual note</strong>
        <span>
          Representative visuals only. A live project would use approved site photography, UAV outputs, survey imagery
          or client-supplied project records.
        </span>
      </div>
      <div className={styles.illustrationGrid}>
        {items.map((item) => (
          <article key={item.id} className={styles.illustrationCard}>
            <div className={styles.illustrationMedia}>
              <Image src={item.image} alt={item.alt} fill className={styles.illustrationImage} sizes="(max-width: 1080px) 100vw, 33vw" />
              <div className={styles.illustrationShade} />
            </div>
            <div className={styles.illustrationCopy}>
              <p className={styles.eyebrow}>{eyebrow}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className={styles.imageChipRow}>
                {item.tags.map((tag) => (
                  <span key={tag} className={styles.imageChip}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ConditionComparison({
  items
}: {
  items: readonly ConditionComparisonAsset[];
}) {
  return (
    <div className={styles.conditionComparison}>
      {items.map((item) => (
        <article key={item.id} className={styles.conditionPanel}>
          <div className={styles.conditionMedia}>
            <Image
              src={item.image}
              alt={item.alt}
              fill
              className={styles.conditionImage}
              sizes="(max-width: 1080px) 100vw, 50vw"
            />
            <div className={styles.conditionShade} />
            <span className={styles.conditionState}>{item.stateLabel}</span>
          </div>
          <div className={styles.conditionCopy}>
            <p className={styles.eyebrow}>Illustrative condition view</p>
            <h3>{item.title}</h3>
            <strong>{item.conditionCue}</strong>
            <p>{item.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function buildPath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${80 + point.x * 840} ${120 + point.y * 120}`)
    .join(" ");
}

function sampleY(points: Array<{ x: number; y: number }>, target: number) {
  if (points.length === 0) {
    return 230;
  }

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];

    if (target >= previous.x && target <= current.x) {
      const segmentSpan = current.x - previous.x || 1;
      const progress = (target - previous.x) / segmentSpan;
      const interpolated = previous.y + (current.y - previous.y) * progress;

      return 120 + interpolated * 120;
    }
  }

  const finalPoint = points[points.length - 1];
  return 120 + finalPoint.y * 120;
}

export function PlaceholderMap({
  areas = [],
  scheme
}: {
  areas?: WorkAreaCard[];
  scheme?: SchemeGeometry;
}) {
  const fallbackPath = [
    { x: 0.02, y: 0.71 },
    { x: 0.18, y: 0.64 },
    { x: 0.34, y: 0.58 },
    { x: 0.48, y: 0.5 },
    { x: 0.66, y: 0.43 },
    { x: 0.82, y: 0.47 },
    { x: 0.98, y: 0.56 }
  ];

  const renderedAreas = scheme
    ? scheme.areas.map((area) => ({
        id: area.id,
        label: area.label,
        name: area.name,
        status: area.status,
        relativeStart: area.relativeStart,
        relativeWidth: area.relativeWidth,
        relativeMid: area.relativeMid,
        note: area.note,
        proofCandidate: area.proofCandidate,
        extentConfidence: area.extentConfidence,
        labelRow: area.labelRow,
        spatialOrder: area.spatialOrder
      }))
    : areas.map((area, index) => ({
        ...area,
        relativeMid: area.relativeStart + area.relativeWidth / 2,
        note: area.focus,
        proofCandidate: area.id === "area-1",
        extentConfidence: "concept",
        labelRow: index % 2,
        spatialOrder: index + 1
      }));

  const coastlinePath = scheme?.coastlinePath ?? fallbackPath;
  const sourceBasis = scheme
    ? `${scheme.sources[0]?.title ?? "Council scheme source"}, ${scheme.sources[1]?.title ?? "overview plan"}, and public coordinate references for named landmarks.`
    : null;
  const landmarks =
    scheme?.landmarks ?? [
      { id: "seaview-road", label: "Sea View Road", relativePosition: 0 },
      { id: "worthing-pier", label: "Worthing Pier", relativePosition: 0.5 },
      { id: "brooklands", label: "Brooklands", relativePosition: 1 }
    ];
  const anchors = scheme?.anchors ?? [];

  return (
    <div className={styles.mapFrame}>
      <div className={styles.mapGrid} />
      <div className={styles.mapWaterWash} />
      <div className={styles.mapHeader}>
        <div>
          <p className={styles.eyebrow}>Public frontage extent</p>
          <strong>{scheme?.scheme.extentDescription ?? "Scheme-wide demonstrator layout"}</strong>
        </div>
        <span className={styles.statusPill}>
          {scheme ? "Public-source derived frontage" : "Concept layout"}
        </span>
      </div>

      <div className={styles.mapAreaKey} aria-label="Work area sequence">
        {[...renderedAreas]
          .sort((left, right) => left.spatialOrder - right.spatialOrder)
          .map((area) => (
            <article
              key={area.id}
              className={`${styles.mapAreaKeyCard} ${area.proofCandidate ? styles.mapAreaKeyCardProof : ""}`.trim()}
            >
              <span>{area.label}</span>
              <strong>{area.name}</strong>
            </article>
          ))}
      </div>

      <svg viewBox="0 0 1000 330" className={styles.mapSvg} aria-label="Worthing frontage overview">
        {anchors.map((anchor) => {
          const x = 80 + anchor.projected.x * 840;
          const y = 120 + (0.2 + anchor.projected.y * 0.55) * 120;

          return (
            <g key={anchor.id}>
              <circle cx={x} cy={y} r={5.5} className={styles.anchorDot} />
              <circle cx={x} cy={y} r={12} className={styles.anchorHalo} />
            </g>
          );
        })}

        <path d={buildPath(coastlinePath)} className={styles.coastShadow} />
        <path d={buildPath(coastlinePath)} className={styles.coastStroke} />

        {renderedAreas.map((area) => {
          const x = 80 + area.relativeStart * 840;
          const width = Math.max(area.relativeWidth * 840, 44);
          const mid = 80 + area.relativeMid * 840;
          const coastY = sampleY(coastlinePath, area.relativeMid);
          const labelY = 90;
          const labelWidth = 54;

          return (
            <g key={area.id}>
              <line x1={mid} y1={labelY + 30} x2={mid} y2={coastY - 18} className={styles.areaConnector} />
              <rect
                x={mid - labelWidth / 2}
                y={labelY}
                width={labelWidth}
                height={30}
                rx={15}
                className={area.proofCandidate ? styles.areaNumberPillProof : styles.areaNumberPill}
              />
              <text x={mid} y={labelY + 20} textAnchor="middle" className={styles.areaBandNumber}>
                {area.label}
              </text>
              <rect
                x={x}
                y={coastY - 14}
                width={width}
                height={26}
                rx={13}
                className={area.proofCandidate ? styles.areaBandProof : styles.areaBand}
              />
            </g>
          );
        })}

        {landmarks.map((landmark, index) => {
          const x = 80 + landmark.relativePosition * 840;
          const offsets = landmark.id === "worthing-pier" ? { x: -28, y: 300 } : landmark.id === "pier-east-proof-area" ? { x: 48, y: 322 } : { x: 0, y: index % 2 === 0 ? 300 : 312 };
          return (
            <g key={landmark.id}>
              <line x1={x} y1={244} x2={x} y2={274} className={styles.landmarkLine} />
              <text x={x + offsets.x} y={offsets.y} textAnchor="middle" className={styles.landmarkLabel}>
                {landmark.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className={styles.mapLegendRow}>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendSwatchGain}`} />
          Blue = material gain / accretion
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.legendSwatch} ${styles.legendSwatchLoss}`} />
          Red = material loss / erosion
        </span>
      </div>

      <div className={styles.mapFooter}>
        <p>
          {scheme?.method ??
            "Review-grade concept geometry only. A live project view would use verified public-source or client-approved scheme extents."}
        </p>
        {scheme ? (
          <p>
            Source basis: {sourceBasis}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProvenanceTable({ items }: { items: ProvenanceItem[] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Dataset</th>
            <th>Source</th>
            <th>Date</th>
            <th>Licence</th>
            <th>CRS</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <strong>{item.title}</strong>
                <p>{item.note}</p>
              </td>
              <td>{item.source}</td>
              <td>{item.date}</td>
              <td>{item.licence}</td>
              <td>{item.crs}</td>
              <td>
                <span className={styles.statusPill}>{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TimelineList({ items }: { items: TimelineEvent[] }) {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <article key={`${item.date}-${item.title}`} className={styles.timelineItem}>
          <div className={styles.timelineDate}>{item.date}</div>
          <div>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
            <span
              className={`${styles.toneBadge} ${
                item.tone === "gain"
                  ? styles.toneGain
                  : item.tone === "loss"
                    ? styles.toneLoss
                    : item.tone === "warning"
                      ? styles.toneWarning
                      : styles.toneNeutral
              }`}
            >
              {item.tone}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ReadinessGrid({ items }: { items: DatasetReadiness[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.title} className={styles.screenCard}>
          <p className={styles.eyebrow}>Dataset state</p>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
          <span className={styles.statusPill}>{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export function EvidencePanelGrid({ items }: { items: EvidencePanel[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.title} className={styles.screenCard}>
          <p className={styles.eyebrow}>Evidence framing</p>
          <h3>{item.title}</h3>
          <ul className={styles.bulletList}>
            {item.items.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function DatasetCatalogueGrid({ items }: { items: DatasetCatalogueItem[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.id} className={styles.screenCard}>
          <p className={styles.eyebrow}>{item.category}</p>
          <h3>{item.title}</h3>
          <p>{item.coverage}</p>
          <div className={styles.metaStack}>
            <span><strong>Source:</strong> {item.source}</span>
            <span><strong>Licence:</strong> {item.licence}</span>
            <span><strong>Quality:</strong> {item.quality}</span>
            <span><strong>Project step:</strong> {item.action}</span>
          </div>
          <span className={styles.statusPill}>{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export function SourceRegisterGrid({ items }: { items: SourceRegisterItem[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.id} className={styles.screenCard}>
          <p className={styles.eyebrow}>{item.type}</p>
          <h3>{item.title}</h3>
          <p>{item.whyItMatters}</p>
          <div className={styles.metaStack}>
            <span><strong>Publisher:</strong> {item.publisher}</span>
            <span><strong>Date note:</strong> {item.dateNote}</span>
          </div>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className={styles.linkPill}
          >
            Open source
          </a>
          <span className={styles.statusPill}>{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export function StoryBeatGrid({ items }: { items: StoryBeat[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item, index) => (
        <article key={item.title} className={styles.screenCard}>
          <p className={styles.eyebrow}>Story beat {index + 1}</p>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </article>
      ))}
    </div>
  );
}

export function FactGrid({ items }: { items: Array<[string, string]> }) {
  return (
    <div className={styles.factGrid}>
      {items.map(([label, value]) => (
        <article key={label} className={styles.factCard}>
          <p className={styles.factLabel}>{label}</p>
          <p className={styles.factValue}>{value}</p>
        </article>
      ))}
    </div>
  );
}

export function StatusCardGrid({ items }: { items: StatusCard[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.title} className={styles.screenCard}>
          <p className={styles.eyebrow}>Status view</p>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
          <span className={styles.statusPill}>{item.status}</span>
        </article>
      ))}
    </div>
  );
}

export function ContextGrid({ items }: { items: TimelineContextItem[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.title} className={styles.screenCard}>
          <p className={styles.eyebrow}>Timeline context</p>
          <h3>{item.title}</h3>
          <p>{item.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function ProfileCataloguePanel({ catalogue }: { catalogue: ProfileCatalogue }) {
  return (
    <div className={styles.profilePanel}>
      <div className={styles.profilePanelHeader}>
        <div>
          <p className={styles.eyebrow}>Public profile route</p>
          <h3>
            {catalogue.surveyUnit.id} {catalogue.surveyUnit.title}
          </h3>
        </div>
        <span className={styles.statusPill}>Public report route confirmed</span>
      </div>

      <div className={styles.factGrid}>
        <article className={styles.factCard}>
          <p className={styles.factLabel}>Latest public report</p>
          <p className={styles.factValue}>
            {catalogue.surveyUnit.latestPublicReportMonth} - {catalogue.surveyUnit.latestPublicReportTitle}
          </p>
        </article>
        <article className={styles.factCard}>
          <p className={styles.factLabel}>Previous public report</p>
          <p className={styles.factValue}>
            {catalogue.surveyUnit.previousPublicReportMonth} - {catalogue.surveyUnit.previousPublicReportTitle}
          </p>
        </article>
      </div>

      <div className={styles.cardGrid}>
        {catalogue.proofProfiles.map((profile) => (
          <article key={profile.id} className={styles.screenCard}>
            <p className={styles.eyebrow}>{profile.evidenceClass}</p>
            <h3>{profile.title}</h3>
            <p>{profile.reason}</p>
            <div className={styles.metaStack}>
              <span>
                <strong>Status:</strong> {profile.status}
              </span>
              <span>
                <strong>Project step:</strong> {profile.nextAction}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.profileConstraintRow}>
        <article className={styles.factCard}>
          <p className={styles.factLabel}>API constraint</p>
          <p className={styles.factValue}>{catalogue.ingestionRoute.apiConstraint}</p>
        </article>
        <article className={styles.factCard}>
          <p className={styles.factLabel}>Quality rule</p>
          <p className={styles.factValue}>{catalogue.ingestionRoute.qualityRule}</p>
        </article>
      </div>

      <div className={styles.linkRow}>
        <a href={catalogue.surveyUnit.sourceUrl} target="_blank" rel="noreferrer" className={styles.linkPill}>
          Open reports catalogue
        </a>
        <a href={catalogue.ingestionRoute.apiDocsUrl} target="_blank" rel="noreferrer" className={styles.linkPill}>
          Open API documentation
        </a>
      </div>
    </div>
  );
}

export function EnvironmentContextPanel({ context }: { context: EnvironmentContext }) {
  return (
    <div className={styles.profilePanel}>
      <div className={styles.profilePanelHeader}>
        <div>
          <p className={styles.eyebrow}>Environmental context route</p>
          <h3>Public stations for chronology and forcing context</h3>
        </div>
        <span className={styles.statusPill}>Context only</span>
      </div>

      <div className={styles.cardGrid}>
        {context.stations.map((station) => (
          <article key={station.id} className={styles.screenCard}>
            <p className={styles.eyebrow}>{station.evidenceClass}</p>
            <h3>{station.title}</h3>
            <p>{station.notes[0]}</p>
            <div className={styles.metaStack}>
              <span>
                <strong>Type:</strong> {station.type}
              </span>
              <span>
                <strong>Location:</strong> {station.location}
              </span>
              <span>
                <strong>Deployed:</strong> {station.deployedDate}
              </span>
              {station.latestServiceNote ? (
                <span>
                  <strong>Service note:</strong> {station.latestServiceNote}
                </span>
              ) : null}
            </div>
            <a href={station.sourceUrl} target="_blank" rel="noreferrer" className={styles.linkPill}>
              Open source
            </a>
            <span className={styles.statusPill}>{station.status}</span>
          </article>
        ))}
      </div>

      <div className={styles.factGrid}>
        {context.rules.map((rule) => (
          <article key={rule} className={styles.factCard}>
            <p className={styles.factLabel}>Context rule</p>
            <p className={styles.factValue}>{rule}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AnchorGrid({ items }: { items: SchemeAnchor[] }) {
  return (
    <div className={styles.cardGrid}>
      {items.map((item) => (
        <article key={item.id} className={styles.screenCard}>
          <p className={styles.eyebrow}>Anchor point</p>
          <h3>{item.label}</h3>
          <div className={styles.metaStack}>
            <span>
              <strong>Latitude:</strong> {item.latitude.toFixed(6)}
            </span>
            <span>
              <strong>Longitude:</strong> {item.longitude.toFixed(6)}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
