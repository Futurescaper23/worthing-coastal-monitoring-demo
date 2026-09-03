import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  ReadinessGrid,
  SectionHeading,
  StatGrid,
  Surface,
  VisualStoryPanel
} from "@/components/ui/cards";
import {
  datasetReadiness,
  heroStats,
  nextActions,
  projectMeta,
} from "@/lib/site-data";

export const metadata = {
  title: "Worthing Coastal Monitoring Demonstrator",
  description:
    "FutureScaping client preview for a public-data-led Worthing coastal monitoring demonstrator."
};

const homepageVisualStory = {
  lead: {
    eyebrow: "Frontage orientation",
    title: "Whole-frontage context",
    summary:
      "The Worthing frontage is shown first so the pier, scheme ends and Pier East focus are clear before the detailed evidence view.",
    image: "/generated-images/worthing-map-derived-frontage-overview-illustration-v1.png",
    alt: "Illustrative Worthing seafront overview with visual monitoring callouts",
    fit: "contain",
    chips: ["3.7 km frontage", "10 public work areas", "Whole-frontage context first"],
    markers: [
      { label: "Sea View Road end", top: "46%", left: "7%", align: "start" },
      { label: "Worthing Pier", top: "68%", left: "36%", tone: "gain" },
      { label: "Brooklands Park end", top: "35%", left: "94%", align: "end" }
    ]
  },
  detail: {
    eyebrow: "Proof-area view",
    title: "Area 1 / Pier East",
    summary:
      "Pier East shows how public context, profile routes and client-supplied survey layers can meet in one recognisable monitoring view.",
    image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
    alt: "Illustrative Worthing Pier East proof area with monitoring overlays",
    chips: ["Area 1 / Pier East", "Public evidence route", "Future UAV insert point"],
    markers: []
  },
  insight: {
    eyebrow: "Evidence pathway",
    title: "From public context to measured monitoring",
    summary:
      "Public context is visible now, while client-supplied survey layers are clearly separated from measured change claims.",
    bullets: [
      "The frontage is presented as a recognisable place before detailed evidence is introduced.",
      "The proof area is separated from the whole-scheme overview.",
      "Client-controlled UAV and survey layers are clearly identified as the next evidence step."
    ],
    callout:
      "The July 2026 UAV baseline is shown as a client-supplied evidence layer, not as a public-data assumption."
  }
} as const;

export default function HomePage() {
  return (
    <MonitoringShell activePath="/">
      <div style={{ display: "grid", gap: 20 }}>
        <Surface>
          <SectionHeading
            eyebrow="Worthing monitoring"
            title="Public evidence first, project evidence next"
            summary={`A Worthing-specific monitoring demonstrator for the repaired frontage from Sea View Road to Brooklands. It shows the public evidence already available, the Pier East proof-area focus, and the client-supplied survey layers needed for measured post-repair monitoring. Last updated ${projectMeta.lastUpdated}.`}
          />
        </Surface>

        <StatGrid items={heroStats} />

        <Surface>
          <SectionHeading
            eyebrow="Worthing frontage"
            title="Scheme extent and first proof area"
            summary="The overview starts with the whole frontage, then moves into Pier East and the evidence layers that would support future change-monitoring decisions."
          />
          <div style={{ height: 18 }} />
          <VisualStoryPanel
            lead={homepageVisualStory.lead}
            detail={homepageVisualStory.detail}
            insight={homepageVisualStory.insight}
          />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Readiness"
            title="Data Layers"
            summary="The interface separates public evidence already used for the review from client-controlled layers that would make a live product stronger."
          />
          <div style={{ height: 18 }} />
          <ReadinessGrid items={datasetReadiness} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Client data pathway"
            title="What would strengthen the live version"
            summary="These are the practical data layers that would turn the public-data concept into a more operational monitoring view."
          />
          <ul style={{ margin: "18px 0 0", paddingLeft: 20, color: "var(--text-soft)", lineHeight: 1.8 }}>
            {nextActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Next step"
            title="Discuss a Pier East monitoring trial"
            summary="A short technical review of Area 1 / Pier East would confirm source access, client UAV inputs, profile alignment and the practical route from this demonstrator to a live monitoring view."
          />
        </Surface>
      </div>
    </MonitoringShell>
  );
}
