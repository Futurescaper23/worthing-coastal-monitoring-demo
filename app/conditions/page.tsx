import { ConditionsDashboard } from "@/components/conditions/conditions-dashboard";
import { MonitoringShell } from "@/components/shell/monitoring-shell";
import { SectionHeading, Surface } from "@/components/ui/cards";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Weather And Tides",
  description:
    "Worthing Pier weather, tide-provider readiness and survey-window context for coastal monitoring."
};

export default function ConditionsPage() {
  return (
    <MonitoringShell activePath="/conditions">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Environmental context"
            title="Weather And Tides"
            summary="A Worthing-facing conditions view for weather, tide exposure, survey-window context and plain-English change-monitoring notes."
          />
        </Surface>

        <ConditionsDashboard />
      </div>
    </MonitoringShell>
  );
}
