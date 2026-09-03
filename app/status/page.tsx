import { MonitoringShell } from "@/components/shell/monitoring-shell";
import { IllustrationGallery, SectionHeading, StatusCardGrid, Surface } from "@/components/ui/cards";
import { missingDataLabel, statusCards, statusIllustrations, statusRows } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Monitoring Readiness",
  description:
    "Public-data coverage, client-supplied evidence layers and readiness for Worthing operational monitoring."
};

export default function StatusPage() {
  return (
    <MonitoringShell activePath="/status">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Monitoring readiness"
            title="Monitoring Readiness"
            summary="Public evidence can support the first review. Client-supplied survey layers are needed before this becomes an operational bay-status view."
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Readiness summary"
            title="Public-data coverage and project-specific layers"
            summary="The readiness view separates available public context from measured change, UAV baseline and engineering threshold layers."
          />
          <div style={{ height: 18 }} />
          <StatusCardGrid items={statusCards} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Inspection context"
            title="Operational monitoring inputs"
            summary="Representative inspection imagery shows the type of visual record that would sit beside approved project data in a live monitoring product."
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
