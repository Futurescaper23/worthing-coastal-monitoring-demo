import { ProfilePreview } from "@/components/charts/profile-preview";
import { MonitoringShell } from "@/components/shell/monitoring-shell";
import { FactGrid, IllustrationGallery, ProfileCataloguePanel, SectionHeading, Surface } from "@/components/ui/cards";
import { missingDataLabel, profileCatalogue, profileIllustrations, profileSeries } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Public Profile Context",
  description:
    "Public CCO Worthing profile-report context and cautious cross-shore profile comparison method."
};

export default function ProfilesPage() {
  return (
    <MonitoringShell activePath="/profiles">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Profile context"
            title="Public Profile Context"
            summary="The public Worthing profile-report route is confirmed. The plotted lines show the intended display format only and are not measured CCO outputs."
          />
        </Surface>

        <Surface>
          <ProfilePreview />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Method context"
            title="Where profile evidence fits"
            summary="These visuals support the method story only. They are not survey records or measured Worthing profile outputs."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={profileIllustrations} eyebrow="Profiles illustration" />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Public evidence route"
            title="Confirmed CCO Worthing report path"
            summary="The public CCO reports catalogue confirms Worthing survey unit 4dSU16, including March 2025 and March 2026 summary reports. Raw chainage and elevation values still need verified ingestion before measured interpretation."
          />
          <div style={{ height: 18 }} />
          <ProfileCataloguePanel catalogue={profileCatalogue} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="How to read this"
            title="Profile interpretation boundaries"
            summary="The chart style is ready, but measured statements should wait for raw CCO profile values, datum/CRS checks, project alignment and the client baseline surface."
          />
          <div style={{ height: 18 }} />
          <FactGrid
            items={[
              ["Blue", "Material gain or accretion language only, not a post-repair proof label."],
              ["Red", "Material loss or erosion language only, not a failure trigger."],
              ["Current evidence class", "Confirmed public report route plus display-format sample."],
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
