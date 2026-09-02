import { MonitoringShell } from "@/components/shell/monitoring-shell";
import {
  IllustrationGallery,
  ReadinessGrid,
  SectionHeading,
  ScreenGrid,
  StatGrid,
  StoryBeatGrid,
  Surface,
  VisualStoryPanel
} from "@/components/ui/cards";
import {
  datasetReadiness,
  heroStats,
  homepageIllustrations,
  meetingObjectives,
  nextActions,
  projectMeta,
  screenCards,
  storyBeats,
  workAreas
} from "@/lib/site-data";

const homepageVisualStory = {
  lead: {
    eyebrow: "Imagery-first opening",
    title: "Lead with the frontage, not the feature list",
    summary:
      "The opening screen should immediately feel like a live coastal frontage under observation, with the client able to locate the pier, the scheme ends, and the proof-area focus before any deeper discussion.",
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
    eyebrow: "Proof-area visual",
    title: "Then zoom into a recognisable proof area",
    summary:
      "Pier East is the place where the presentation can stop being abstract. This should feel like the moment the client sees where future change layers and monitoring outputs will actually land.",
    image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
    alt: "Illustrative Worthing Pier East proof area with monitoring overlays",
    chips: ["Area 1 / Pier East", "Public evidence route", "Future UAV insert point"],
    markers: []
  },
  insight: {
    eyebrow: "Why it matters",
    title: "How the stronger evidence layer is introduced",
    summary:
      "The opening view shows the product shape while keeping the evidence boundary clear. Public context is visible now, and client-supplied survey layers can be added without changing the story.",
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
            eyebrow="Client preview"
            title="Ready for the opening conversation"
            summary={`This web version presents a public-data-led Worthing monitoring concept in the style of the FutureScaping change-monitoring system. It is structured for an initial client review, with client-controlled survey layers clearly marked where they would strengthen the evidence. Last updated ${projectMeta.lastUpdated}.`}
          />
          <ul style={{ margin: "18px 0 0", paddingLeft: 20, color: "var(--text-soft)", lineHeight: 1.8 }}>
            {meetingObjectives.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Surface>

        <StatGrid items={heroStats} />

        <Surface>
          <SectionHeading
            eyebrow="Visual opening"
            title="A recognisable Worthing monitoring journey"
            summary="The page opens with the whole frontage, then moves into a proof area and the evidence layers that would support future change-monitoring decisions."
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
            eyebrow="Representative visuals"
            title="Representative visuals for the client-facing story"
            summary="These visuals give the demonstrator a stronger sense of place while avoiding unapproved third-party photography or restricted project imagery."
          />
          <div style={{ height: 18 }} />
          <IllustrationGallery items={homepageIllustrations} eyebrow="Illustrative generated asset" />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Meeting story"
            title="What this demo is designed to prove"
            summary="The aim is to show how a Worthing monitoring interface could connect public context, proof-area detail, environmental conditions and client-supplied survey evidence."
          />
          <div style={{ height: 18 }} />
          <StoryBeatGrid items={storyBeats} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Client review screens"
            title="Review Structure"
            summary="Each screen supports a specific part of the client conversation: orientation, proof area, profiles, weather and tides, chronology, status and provenance."
          />
          <div style={{ height: 18 }} />
          <ScreenGrid items={screenCards} />
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Work Areas"
            title="Initial Frontage Catalogue"
            summary="These are the public work areas in their current west-to-east frontage order, derived from the council overview plan and public updates rather than construction sequence assumptions."
          />
          <div
            style={{
              display: "grid",
              gap: 12,
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              marginTop: 18
            }}
          >
            {workAreas.map((area) => (
              <article
                key={area}
                style={{
                  padding: 16,
                  borderRadius: 20,
                  border: "1px solid rgba(150,205,250,.12)",
                  background: "rgba(16, 28, 45, 0.72)"
                }}
              >
                {area}
              </article>
            ))}
          </div>
        </Surface>

        <Surface>
          <SectionHeading
            eyebrow="Readiness"
            title="Data Layers"
            summary="The interface separates public evidence already used for the review from client-controlled layers that would make the system stronger in a live project."
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
      </div>
    </MonitoringShell>
  );
}
