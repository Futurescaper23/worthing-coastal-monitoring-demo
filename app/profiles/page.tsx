import { ProfilePreview } from "@/components/charts/profile-preview";
import { MonitoringShell } from "@/components/shell/monitoring-shell";
import { FactGrid, IllustrationGallery, ProfileCataloguePanel, SectionHeading, Surface } from "@/components/ui/cards";
import { missingDataLabel, profileCatalogue, profileIllustrations, profileSeries } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export default function ProfilesPage() {
  return (
    <MonitoringShell activePath="/profiles">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Screen 3"
            title="Historical Survey And Profile Comparison"
            summary="This screen shows how historical profile evidence would be compared across survey epochs, while clearly separating public profile context from verified project-specific change evidence."
          />
        </Surface>

        <Surface>
          <ProfilePreview />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Method imagery"
            title="Visual support for the monitoring method"
            summary="These visuals help explain where profile, observation and survey evidence sit within the wider monitoring story."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={profileIllustrations} eyebrow="Profiles illustration" />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Public evidence route"
            title="First CCO profile ingestion path"
            summary="This is the first grounded route into public Worthing profile evidence. It identifies the source pathway and the quality checks needed before profile-derived interpretation is used in a live view."
          />
          <div style={{ height: 18 }} />
          <ProfileCataloguePanel catalogue={profileCatalogue} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="How to read this"
            title="Profile interpretation rules"
            summary="This screen is built to show analytical discipline as much as visual polish."
          />
          <div style={{ height: 18 }} />
          <FactGrid
            items={[
              ["Blue", "Material gain or accretion language only, not a post-repair proof label."],
              ["Red", "Material loss or erosion language only, not a failure trigger."],
              ["Current evidence class", "Historic public-profile proxy evidence."],
              ["Project-specific layer", "Ingested CCO profiles, client baseline surface and agreed thresholds."]
            ]}
          />
        </Surface>

        <div className={styles.summaryGrid}>
          {profileSeries.map((series) => (
            <Surface key={series.name} className={styles.summaryCard}>
              <h3 style={{ marginBottom: 10 }}>{series.name}</h3>
              <p className={styles.noteText}>
                <strong style={{ color: "var(--text-primary)" }}>{series.date}:</strong> {series.interpretation}
              </p>
            </Surface>
          ))}
        </div>

        <Surface>
          <SectionHeading
            eyebrow="Important limit"
            title="Profiles Are Proxy Evidence"
            summary={`${missingDataLabel} Profile-derived movement is useful context, but full-bay change proof would require continuous post-repair surfaces and agreed thresholds.`}
          />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
