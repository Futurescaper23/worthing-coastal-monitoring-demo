import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  FactGrid,
  DatasetCatalogueGrid,
  IllustrationGallery,
  ProvenanceTable,
  SectionHeading,
  SourceRegisterGrid,
  Surface
} from "@/components/ui/cards";
import { clientAsk, datasetCatalogue, nonClaims, provenanceIllustrations, provenanceItems, sourceRegister } from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Provenance And Uncertainty",
  description:
    "Worthing monitoring source register, evidence boundaries and project-specific data requirements."
};

export default function ProvenancePage() {
  return (
    <MonitoringShell activePath="/provenance">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Evidence model"
            title="Data Provenance And Uncertainty"
            summary="Source, date, licence, CRS and quality notes show what the current public evidence can support, and which project-specific layers would strengthen the live monitoring view."
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Why this matters"
            title="Source discipline and evidence boundaries"
            summary="Source discipline, evidence boundaries and a practical route from public context to client-specific monitoring."
          />
          <div style={{ height: 18 }} />
          <FactGrid
            items={[
              ["Source discipline", "Every displayed dataset should have a source, date, licence, CRS and quality note."],
              ["Safety discipline", "Client-only evidence is identified clearly rather than hidden behind confident language."],
              ["Meeting outcome", "The next client step is concrete: provide the layers needed for a stronger live version."],
              ["Review stance", "Public-data review first, engineering assessment when project data is supplied."]
            ]}
          />
        </Surface>

        <Surface>
          <ProvenanceTable items={provenanceItems} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Trust visuals"
            title="Observation imagery that supports the provenance story"
            summary="These visuals reinforce evidence discipline and careful observation without presenting representative imagery as proof."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={provenanceIllustrations} eyebrow="Provenance illustration" />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Ingestion queue"
            title="Dataset catalogue"
            summary="This is the data checklist behind the provenance model, showing which sources support the current review and which project layers would strengthen a live product."
          />
          <div style={{ height: 18 }} />
          <DatasetCatalogueGrid items={datasetCatalogue} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Source register"
            title="Verified public pages"
            summary="This source register connects the review to public pages that can be referenced without client-only material."
          />
          <div style={{ height: 18 }} />
          <SourceRegisterGrid items={sourceRegister} />
        </Surface>

        <Surface>
          <h3 style={{ marginBottom: 12 }}>Evidence boundaries</h3>
          <ul className={styles.signalList}>
            {nonClaims.map((claim) => (
              <li key={claim}>{claim}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Client next step"
            title="What the client would send to unlock the stronger version"
            summary="These are the specific inputs that would turn the public-data review into a stronger project-specific monitoring view."
          />
          <ul className={styles.signalList} style={{ marginTop: 18 }}>
            {clientAsk.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Surface>
      </div>
    </MonitoringShell>
  );
}
