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

export async function generateMetadata({ params }: BayPageProps) {
  const { bayId } = await params;
  return {
    title: formatBayId(bayId),
    description:
      "Pier East proof-area view showing public evidence context and the client-supplied layers needed for measured Worthing change monitoring."
  };
}

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
                eyebrow: "Pier East proof area",
                title: "A recognisable frontage for measured follow-up",
                summary:
                  "Pier East gives the monitoring work a clear place reference, with public context ready now and client survey records identified as the layer needed for measured change.",
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
              <p className={styles.heroEyebrow}>Pier East focus</p>
              <h2 className={styles.heroTitle}>{bayTitle}</h2>
              <p className={styles.heroSummary}>
                This page turns the wider scheme into a specific, recognisable proof area. It shows how public context,
                profile evidence and client-supplied baseline data can come together.
              </p>
              <div className={styles.pillRow}>
                <span className={styles.pill}>Pier East proof area</span>
                <span className={styles.pill}>Public evidence route</span>
                <span className={`${styles.pill} ${styles.warningPill}`}>{missingDataLabel}</span>
              </div>
              <div className={styles.heroTakeaways}>
                <article className={styles.takeawayCard}>
                  <strong>Why Pier East</strong>
                  <p>It is recognisable, close to the pier and suitable for a focused first monitoring trial.</p>
                </article>
                <article className={styles.takeawayCard}>
                  <strong>Evidence boundary</strong>
                  <p>Measured post-repair change still needs the July 2026 UAV baseline and agreed thresholds.</p>
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
            eyebrow="Pier East visual context"
            title="Bay-level monitoring context"
            summary="These representative views show the kind of site imagery that would sit beside approved project photography, UAV outputs and measured datasets in a live monitoring product."
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
            summary="Pier East provides a recognisable, defensible proof area and a clear route into stronger project-specific monitoring evidence."
          />
          <div style={{ height: 18 }} />
          <FactGrid items={proofFacts} />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
