import { MonitoringShell } from "@/components/shell/monitoring-shell";
import { IllustrationGallery, SectionHeading, StatusCardGrid, Surface } from "@/components/ui/cards";
import { missingDataLabel, statusCards, statusIllustrations, statusRows } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export default function StatusPage() {
  return (
    <MonitoringShell activePath="/status">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Screen 6"
            title="Bay Status And Intervention Intent"
            summary="This screen shows how a bay-level status view could separate current evidence, monitoring intent and the client-supplied thresholds needed for operational decisions."
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Operational summary"
            title="What can be shown now and what becomes project-specific"
            summary="This keeps the status screen useful in a meeting by separating public framing from project-specific engineering evidence."
          />
          <div style={{ height: 18 }} />
          <StatusCardGrid items={statusCards} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Operational visuals"
            title="Inspection-ready imagery for the status story"
            summary="This image set gives the status page a more operational tone while keeping the public-data and project-specific evidence boundaries visible."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={statusIllustrations} eyebrow="Status illustration" />
        </Surface>

        <Surface>
          <div className={styles.statusTable}>
            {statusRows.map(([label, value]) => (
              <div
                key={label}
                className={styles.statusRow}
              >
                <strong>{label}</strong>
                <span style={{ color: label === "Client unlock item" ? "#ffe5c8" : "var(--text-soft)" }}>{value}</span>
              </div>
            ))}
          </div>
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Decision rule"
            title="Recommendation logic requires verified thresholds"
            summary="Shingle transfer, threshold compliance and post-repair success/failure should only be shown when the client baseline and agreed engineering trigger data are supplied."
          />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
