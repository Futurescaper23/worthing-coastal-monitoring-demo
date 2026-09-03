import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  ContextGrid,
  EnvironmentContextPanel,
  IllustrationGallery,
  SectionHeading,
  Surface,
  TimelineList
} from "@/components/ui/cards";
import { dataRules, environmentContext, timelineContext, timelineEvents, timelineIllustrations } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Timeline And Context",
  description:
    "Worthing repair timing, public survey chronology and environmental context without performance overclaiming."
};

export default function TimelinePage() {
  return (
    <MonitoringShell activePath="/timeline">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Timeline context"
            title="Storm, Tide And Survey Timeline"
            summary="Repair timing, survey context and environmental conditions are shown around the public evidence base without presenting chronology as performance proof."
          />
        </Surface>

        <Surface>
          <TimelineList items={timelineEvents} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Context imagery"
            title="Coastal context for the timeline"
            summary="Representative visuals keep the chronology anchored in recognisable coastal conditions."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={timelineIllustrations} eyebrow="Timeline illustration" />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Reading the chronology"
            title="What this timeline is actually for"
            summary="This is the public timing narrative behind the review. It explains sequence and context without presenting timing alone as causation."
          />
          <div style={{ height: 18 }} />
          <ContextGrid items={timelineContext} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Public station layer"
            title="Confirmed environmental context sources"
            summary="Worthing Pier gives local meteorological context, while Arun Platform and Brighton remain nearby context only. This supports chronology and caution, not recommendation logic."
          />
          <div style={{ height: 18 }} />
          <EnvironmentContextPanel context={environmentContext} />
        </Surface>

        <Surface>
          <h3 style={{ marginBottom: 12 }}>Data treatment rules</h3>
          <ul className={styles.signalList}>
            {dataRules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </Surface>
      </div>
    </MonitoringShell>
  );
}
