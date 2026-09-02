import Image from "next/image";
import Link from "next/link";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { projectMeta, screenCards, shellIllustrations } from "@/lib/site-data";

import styles from "./monitoring-shell.module.css";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-display"
});

const bodyFont = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body"
});

type MonitoringShellProps = {
  activePath?: string;
  children: ReactNode;
};

const NAV_ICONS: Record<string, ReactNode> = {
  scheme: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 11.5 12 5l8 6.5V20H4z" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
  "bay-detail": (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="M12 6v12" />
      <path d="M4 12h16" />
    </svg>
  ),
  profiles: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17c2-2 3.5-6 6-6s3.5 4 6 4 3-2 4-4" />
      <path d="M4 20h16" />
    </svg>
  ),
  conditions: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 15a4 4 0 0 1 7.7-1.5A3.5 3.5 0 1 1 15 20H7a4 4 0 0 1-1-7.9" />
      <path d="M17 4v5" />
      <path d="M14.5 6.5h5" />
    </svg>
  ),
  timeline: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6v12" />
      <path d="M12 4v16" />
      <path d="M19 8v8" />
    </svg>
  ),
  status: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 18V9" />
      <path d="M12 18V5" />
      <path d="M19 18v-7" />
    </svg>
  ),
  provenance: (
    <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 18h10a4 4 0 1 0-.9-7.9A5.5 5.5 0 0 0 5 12.5" />
    </svg>
  )
};

const SHELL_STAGE = {
  "/": {
    eyebrow: "Full-frontage demonstrator",
    title: "Worthing Coastal Monitoring",
    summary:
      "A public-data-led monitoring demonstrator for the Worthing seafront, with one detailed proof area around Pier East and clear project-data boundaries.",
    image: shellIllustrations.home.image,
    alt: shellIllustrations.home.alt,
    pills: [
      { label: "Mode", value: "Public-data review", subtext: "Client preview version" },
      { label: "Focus", value: "Whole Worthing frontage", subtext: "Pier East proof nested inside" },
      { label: "Project data layer", value: projectMeta.criticalMissingLabel, subtext: "Client-supplied evidence layer" }
    ],
    dock: "Interface demonstration — representative visual, not project survey evidence."
  },
  "/scheme": {
    eyebrow: "Screen 1",
    title: "Scheme Overview",
    summary:
      "Whole-frontage orientation, public evidence coverage and the client-supplied post-repair layer needed for measured change.",
    image: shellIllustrations.scheme.image,
    alt: shellIllustrations.scheme.alt,
    pills: [
      { label: "Extent", value: "Sea View Road to Brooklands", subtext: "3.7 km public scheme context" },
      { label: "Work areas", value: "10 public areas", subtext: "West-to-east frontage ordering" },
      { label: "Client layer", value: projectMeta.criticalMissingLabel, subtext: "Required for measured change" }
    ],
    dock: "Interface demonstration — representative visual, not project survey evidence."
  },
  "/bay/area-1-pier-east": {
    eyebrow: "Screen 2",
    title: "Pier East Proof Area",
    summary:
      "A recognisable detailed view around Worthing Pier East, separating public context from verified groyne-performance evidence.",
    image: shellIllustrations.bay.image,
    alt: shellIllustrations.bay.alt,
    pills: [
      { label: "Proof area", value: "Area 1 / Pier East", subtext: "Most recognisable first proof" },
      { label: "Evidence class", value: "Public context first", subtext: "Profile alignment still cautious" },
      { label: "Client layer", value: projectMeta.criticalMissingLabel, subtext: "Needed for measured change" }
    ],
    dock: "Interface demonstration — representative visual, not project survey evidence."
  },
  "/profiles": {
    eyebrow: "Screen 3",
    title: "Historical Profiles",
    summary:
      "Public CCO Worthing profile-report context and a cautious view of how cross-shore comparison would be presented.",
    image: shellIllustrations.profiles.image,
    alt: shellIllustrations.profiles.alt,
    pills: [
      { label: "Blue", value: "Accretion", subtext: "Material gain language only" },
      { label: "Red", value: "Erosion", subtext: "Material loss language only" },
      { label: "Evidence class", value: "Profile context", subtext: "Strengthened by survey surfaces" }
    ],
    dock: "Profile values shown are demonstration values until raw CCO profile data is ingested and verified."
  },
  "/conditions": {
    eyebrow: "Screen 4",
    title: "Weather And Tides",
    summary:
      "Worthing-facing environmental context for survey windows, tide exposure and short-term conditions.",
    image: shellIllustrations.timeline.image,
    alt: shellIllustrations.timeline.alt,
    pills: [
      { label: "Location", value: "Worthing Pier", subtext: "50.8088, -0.3695 demonstrator point" },
      { label: "Weather", value: "Open-Meteo archive", subtext: "Rain, wind, pressure and temperature" },
      { label: "Tides", value: "WorldTides-ready", subtext: "Provider key enables live tide feed" }
    ],
    dock: "Weather uses Open-Meteo archive data; tide data is shown only when the WorldTides provider is connected."
  },
  "/timeline": {
    eyebrow: "Screen 5",
    title: "Timeline And Context",
    summary:
      "Repair timing, public survey chronology and nearby environmental context, kept separate from performance claims.",
    image: shellIllustrations.timeline.image,
    alt: shellIllustrations.timeline.alt,
    pills: [
      { label: "Local context", value: "Worthing Pier met", subtext: "Public station confirmed" },
      { label: "Nearby context", value: "Arun Platform and Brighton", subtext: "Context only" },
      { label: "Quality rule", value: "Real-time is not QC", subtext: "Must stay explicitly labelled" }
    ],
    dock: "Chronology gives context only; it does not prove repair performance."
  },
  "/status": {
    eyebrow: "Screen 6",
    title: "Monitoring Readiness",
    summary:
      "A readiness view showing public-data coverage, environmental context and the client-supplied layers needed for operational monitoring.",
    image: shellIllustrations.status.image,
    alt: shellIllustrations.status.alt,
    pills: [
      { label: "Public layer", value: "Scheme framing", subtext: "Ready for review" },
      { label: "Profile layer", value: "Public route established", subtext: "Raw ingestion next" },
      { label: "Client layer", value: projectMeta.criticalMissingLabel, subtext: "Thresholds added when supplied" }
    ],
    dock: "Readiness view only; operational status requires verified project datasets."
  },
  "/provenance": {
    eyebrow: "Screen 7",
    title: "Provenance And Uncertainty",
    summary:
      "Sources, dates, quality notes, evidence boundaries and project-specific data requirements for the live monitoring version.",
    image: shellIllustrations.provenance.image,
    alt: shellIllustrations.provenance.alt,
    pills: [
      { label: "Evidence model", value: "Source-led", subtext: "Trace every displayed claim" },
      { label: "Review stance", value: "Public-data review", subtext: "Not engineering assessment" },
      { label: "Client next step", value: "Supply project layers", subtext: "Enable stronger operational proof" }
    ],
    dock: "Evidence boundary: public-data review first; engineering assessment only when project data is supplied."
  }
} as const;

export function shellFontVariables() {
  return `${displayFont.variable} ${bodyFont.variable}`;
}

export function MonitoringShell({ activePath, children }: MonitoringShellProps) {
  const stage = SHELL_STAGE[activePath as keyof typeof SHELL_STAGE] ?? SHELL_STAGE["/"];

  return (
    <div id="top" className={styles.page}>
      <div className={styles.backdrop} />

      <section className={styles.stage}>
        <div className={styles.stageFrame}>
          <Image src={stage.image} alt={stage.alt} fill priority className={styles.stageImage} sizes="100vw" />
          <div className={styles.stageGlow} />

          <div className={styles.brand}>
            <Image
              src="/brand/futurescaping-logo-horizontal-purple-white-rgb.png"
              alt="FutureScaping"
              width={375}
              height={80}
              className={styles.brandLogo}
              priority
            />
            <p className={styles.brandSub}>Worthing Demonstrator</p>
          </div>

          <div className={styles.copy}>
            <p className={styles.stageEyebrow}>{stage.eyebrow}</p>
            <h1 className={styles.stageTitle}>{stage.title}</h1>
            <p className={styles.stageSummary}>{stage.summary}</p>
          </div>

          <nav className={styles.nav} aria-label="Primary">
            <div className={styles.navList}>
              {screenCards.map((screen) => {
                const isActive = activePath === screen.href;
                return (
                  <Link
                    key={screen.id}
                    href={screen.href}
                    className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                  >
                    {NAV_ICONS[screen.id]}
                    <span className={styles.navLabel}>{screen.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className={styles.pills}>
            {stage.pills.map((pill) => (
              <article key={pill.label} className={styles.pill}>
                <p className={styles.pillLabel}>{pill.label}</p>
                <p className={styles.pillValue}>{pill.value}</p>
                <p className={styles.pillSubtext}>{pill.subtext}</p>
              </article>
            ))}
          </div>

          <div className={styles.summaryDock}>{stage.dock}</div>
          <div className={styles.assetBadge}>Interface demonstration — not project survey evidence</div>
        </div>
      </section>

      <main className={styles.main}>{children}</main>

      <a className={styles.topLink} href="#top" aria-label="Back to the top of the page">
        <span aria-hidden="true">↑</span>
        Top
      </a>
    </div>
  );
}
