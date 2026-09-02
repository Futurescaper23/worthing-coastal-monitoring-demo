import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  ConditionComparison,
  FactGrid,
  IllustrationGallery,
  ImageEvidenceCard,
  PlaceholderMap,
  SectionHeading,
  Surface
} from "@/components/ui/cards";
import {
  bayIllustrations,
  groyneConditionComparison,
  missingDataLabel,
  proofArea,
  proofFacts,
  schemeGeometry
} from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

type BayPageProps = {
  params: Promise<{ bayId: string }>;
};

function formatBayId(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function BayPage({ params }: BayPageProps) {
  const { bayId } = await params;
  const bayTitle = formatBayId(bayId);
  const proofContext = {
    ...schemeGeometry,
    areas: schemeGeometry.areas.filter((area) => ["area-2", "area-1", "area-6"].includes(area.id)),
    landmarks: schemeGeometry.landmarks.filter((landmark) =>
      ["worthing-pier", "pier-east", "brooklands"].includes(landmark.id)
    )
  };

  return (
    <MonitoringShell activePath="/bay/area-1-pier-east">
      <div className={styles.pageStack}>
        <Surface>
          <div className={styles.heroGrid}>
            <ImageEvidenceCard
              item={{
                eyebrow: "Proof-area stage",
                title: "Put the proof area on screen as a place, not just a record",
                summary:
                  "This is the point where the presentation becomes specific and recognisable. The view shows where the monitoring story would connect to real survey and project records.",
                image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
                alt: "Illustrative Worthing Pier East proof-area visual with monitoring callouts",
                chips: ["Area 1 / Pier East", "Public evidence route", "Client UAV comparison layer"],
                markers: [
                  { label: "Pier East focus", top: "40%", left: "42%", tone: "gain" },
                  { label: "Historic profile route", top: "27%", left: "76%" },
                  { label: "Client baseline required", top: "55%", left: "68%", tone: "warning" }
                ]
              }}
            />

            <div className={styles.heroPanel}>
              <p className={styles.heroEyebrow}>Screen 2</p>
              <h2 className={styles.heroTitle}>{bayTitle}</h2>
              <p className={styles.heroSummary}>
                This screen turns the whole scheme into a specific, recognisable proof area. It shows how public
                context, profile evidence and client-supplied baseline data can come together.
              </p>
              <div className={styles.pillRow}>
                <span className={styles.pill}>Pier East proof area</span>
                <span className={styles.pill}>Public evidence route</span>
                <span className={`${styles.pill} ${styles.warningPill}`}>{missingDataLabel}</span>
              </div>
              <div className={styles.heroTakeaways}>
                <article className={styles.takeawayCard}>
                  <strong>What improves here</strong>
                  <p>The proof area reads as a visual destination rather than another text section.</p>
                </article>
                <article className={styles.takeawayCard}>
                  <strong>What still matters</strong>
                  <p>The image treatment points to future change evidence without inventing a verified result.</p>
                </article>
              </div>
            </div>
          </div>
        </Surface>

        <Surface>
          <PlaceholderMap scheme={proofContext} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Illustrative before and after"
            title="Make the maintenance benefit visible before the data arrives"
            summary="This comparison shows the type of condition change the monitoring product can explain. In a live project it would be replaced by verified UAV surfaces, profile alignment and client repair records."
          />
          <div style={{ height: 18 }} />
          <ConditionComparison items={groyneConditionComparison} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Proof-area visual set"
            title="More image support for the bay-level conversation"
            summary="This visual sequence helps the proof area feel tangible while the formal evidence layer remains tied to approved project imagery and measured datasets."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={bayIllustrations} eyebrow="Bay illustration" />
        </Surface>

        <div className={styles.twoColumn}>
          <Surface>
            <h3 style={{ marginBottom: 12 }}>Proof area framing</h3>
            <p className={styles.noteText}>{proofArea.summary}</p>
            <ul className={styles.signalList}>
              {proofArea.signals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </Surface>

          <Surface>
            <h3 style={{ marginBottom: 12 }}>Project evidence layer</h3>
            <p className={styles.warningText}>{missingDataLabel}</p>
          </Surface>
        </div>

        <Surface>
          <SectionHeading
            eyebrow="Pier East brief"
            title="Why this bay works as the first proof"
            summary="The value of this screen is to show a recognisable, defensible proof area and the evidence layers that would support stronger project-specific monitoring."
          />
          <div style={{ height: 18 }} />
          <FactGrid items={proofFacts} />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
