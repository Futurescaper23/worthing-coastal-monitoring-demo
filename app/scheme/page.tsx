import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  AnchorGrid,
  FactGrid,
  DatasetCatalogueGrid,
  EnvironmentContextPanel,
  EvidencePanelGrid,
  IllustrationGallery,
  PlaceholderMap,
  ReadinessGrid,
  SectionHeading,
  SourceRegisterGrid,
  StatGrid,
  Surface,
  VisualStoryPanel
} from "@/components/ui/cards";
import {
  datasetCatalogue,
  datasetReadiness,
  environmentContext,
  evidencePanels,
  heroStats,
  missingDataLabel,
  schemeIllustrations,
  schemeNarrative,
  schemeGeometry,
  sourceRegister,
} from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

const schemeVisualStory = {
  lead: {
    eyebrow: "Client opening frame",
    title: "Use imagery to orient the whole scheme quickly",
    summary:
      "The overview opens with the recognisable seafront and then layers in scheme geography, work-area sequence and evidence boundaries.",
    image: "/generated-images/worthing-map-derived-frontage-overview-illustration-v1.png",
    alt: "Illustrative Worthing seafront overview with scheme callouts",
    fit: "contain",
    chips: ["Public-source frontage", "Ten work areas", "Recognisable seafront first"],
    markers: [
      { label: "Sea View Road", top: "46%", left: "7%", align: "start" },
      { label: "Worthing Pier", top: "68%", left: "36%", tone: "gain" },
      { label: "Brooklands Park", top: "35%", left: "94%", align: "end" }
    ]
  },
  detail: {
    eyebrow: "Evidence ladder",
    title: "Show where the stronger layers will arrive",
    summary:
      "This secondary panel makes the data journey legible: public context, proof-area detail and the client-supplied baseline layer.",
    image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
    alt: "Illustrative Worthing proof area with future data callouts",
    chips: ["Proof-area zoom", "Profile proxy", "Client baseline layer"],
    markers: []
  },
  insight: {
    eyebrow: "Presentation value",
    title: "Why this helps the client conversation",
    summary:
      "The layout makes place and monitoring intent visible before the client reads the explanatory sections below.",
    bullets: [
      "The scheme becomes a place the client can point at straight away.",
      "The proof area feels like a destination, not just another route in the menu.",
      "The client baseline is framed as the next evidence layer rather than a buried caveat."
    ],
    callout:
      "This sharpens visual storytelling without inventing any measured post-repair result."
  }
} as const;

export default function SchemePage() {
  return (
    <MonitoringShell activePath="/scheme">
      <div className={styles.pageStack}>
        <Surface>
          <SectionHeading
            eyebrow="Screen 1"
            title="Scheme Overview"
            summary="This screen introduces the Worthing frontage, the public work-area sequence and the client-supplied post-repair layer that would strengthen future monitoring."
          />
        </Surface>

        <StatGrid items={heroStats} />

        <Surface>
          <SectionHeading
            eyebrow="Imagery-led framing"
            title="What the client should understand before reading the detail"
            summary="The page first lands as a recognisable frontage, then gives a clear route from scheme overview to proof area and future change evidence."
          />
          <div style={{ height: 18 }} />
          <VisualStoryPanel
            lead={schemeVisualStory.lead}
            detail={schemeVisualStory.detail}
            insight={schemeVisualStory.insight}
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Screen artwork"
            title="A fuller visual set for the scheme conversation"
            summary="These supporting visuals help explain the intended monitoring experience before approved project imagery or survey outputs are available."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={schemeIllustrations} eyebrow="Scheme illustration" />
        </Surface>

        <Surface>
          <PlaceholderMap scheme={schemeGeometry} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Frontage basis"
            title="Public-source scheme extent"
            summary="This frontage ordering is derived from the council scheme page and overview plan. It is suitable for orientation and client discussion, with detailed GIS tracing reserved for the live evidence layer."
          />
          <div style={{ height: 18 }} />
          <FactGrid
            items={[
              ["Scheme title", schemeGeometry.scheme.title],
              ["Public extent", schemeGeometry.scheme.extentDescription],
              ["Work areas", `${schemeGeometry.scheme.workAreaCount} public areas in west-to-east frontage order`],
              ["Geometry method", schemeGeometry.method]
            ]}
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Geographic anchors"
            title="Approximate public coordinate control points"
            summary="These public coordinate points ground the frontage trace for presentation and orientation. They are not presented as engineering survey control."
          />
          <div style={{ height: 18 }} />
          <AnchorGrid items={schemeGeometry.anchors} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Scheme framing"
            title={schemeNarrative.headline}
            summary={schemeNarrative.summary}
          />
          <ul className={styles.signalList} style={{ marginTop: 18 }}>
            {schemeNarrative.principles.map((principle) => (
              <li key={principle}>{principle}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Dataset state"
            title="Overview Data Layers"
            summary="The overview separates the public sources already used from the client and survey layers that would support a live monitoring view."
          />
          <div style={{ height: 18 }} />
          <ReadinessGrid items={datasetReadiness} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Evidence model"
            title="What this screen can and cannot support today"
            summary="This keeps the overview honest while still making the demonstrator useful in a client conversation."
          />
          <div style={{ height: 18 }} />
          <EvidencePanelGrid items={evidencePanels} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Dataset catalogue"
            title="First ingestion targets"
            summary="These are the concrete public and client-side datasets the interface is structured to accept."
          />
          <div style={{ height: 18 }} />
          <DatasetCatalogueGrid items={datasetCatalogue} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Environmental context"
            title="Public stations already available for storyline context"
            summary="These sources help explain weather and timing around surveys and repairs, but they do not substitute for measured scheme performance."
          />
          <div style={{ height: 18 }} />
          <EnvironmentContextPanel context={environmentContext} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Public sources"
            title="Verified live source register"
            summary="These are the public sources currently feeding the Worthing build plan. They are the right starting points for ingestion before any client-only material arrives."
          />
          <div style={{ height: 18 }} />
          <SourceRegisterGrid items={sourceRegister} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Non-claim"
            title="Evidence boundaries for this view"
            summary={`${missingDataLabel} This public-data view shows scheme extent and historic context. Measured post-repair surface change, calculated volumes and threshold compliance would be added only from verified client or survey data.`}
          />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
