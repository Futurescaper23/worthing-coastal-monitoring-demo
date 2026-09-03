import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  EvidencePanelGrid,
  PlaceholderMap,
  SectionHeading,
  SourceRegisterGrid,
  StatGrid,
  Surface,
  VisualStoryPanel
} from "@/components/ui/cards";
import {
  evidencePanels,
  heroStats,
  missingDataLabel,
  schemeGeometry,
  sourceRegister
} from "@/lib/site-data";

import styles from "@/app/inner-page.module.css";

export const metadata = {
  title: "Scheme Overview",
  description:
    "Worthing frontage overview, public work-area sequence, source basis and client-supplied data boundaries."
};

const schemeVisualStory = {
  lead: {
    eyebrow: "Frontage orientation",
    title: "Worthing frontage overview",
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
    eyebrow: "Proof-area pathway",
    title: "Pier East evidence view",
    summary:
      "This secondary panel makes the data journey legible: public context, proof-area detail and the client-supplied baseline layer.",
    image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
    alt: "Illustrative Worthing proof area with future data callouts",
    chips: ["Proof-area zoom", "Profile proxy", "Client baseline layer"],
    markers: []
  },
  insight: {
    eyebrow: "Monitoring value",
    title: "What this view supports",
    summary:
      "The layout makes the scheme geography, proof-area route and client-supplied evidence layer visible in one place.",
    bullets: [
      "The full frontage is visible before detailed evidence is introduced.",
      "Pier East is separated as the first proof-area view.",
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
            eyebrow="Scheme extent"
            title="Scheme Overview"
            summary="This page introduces the Worthing frontage, the public work-area sequence and the client-supplied post-repair layer that would strengthen future monitoring."
          />
        </Surface>

        <StatGrid items={heroStats} />

        <Surface>
          <SectionHeading
            eyebrow="Imagery-led framing"
            title="Whole-frontage evidence route"
            summary="The page lands as a recognisable frontage, then gives a clear route from scheme overview to proof-area evidence."
          />
          <div style={{ height: 18 }} />
          <VisualStoryPanel
            lead={schemeVisualStory.lead}
            detail={schemeVisualStory.detail}
            insight={schemeVisualStory.insight}
          />
        </Surface>

        <Surface>
          <PlaceholderMap scheme={schemeGeometry} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Evidence model"
            title="What the current evidence can and cannot support"
            summary="This keeps the overview honest while still making the public-data review useful for project scoping."
          />
          <div style={{ height: 18 }} />
          <EvidencePanelGrid items={evidencePanels} />
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
