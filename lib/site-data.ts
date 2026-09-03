import phaseOneContent from "@/public/data/processed/phase-1-content.json";
import datasetCatalogueContent from "@/public/data/processed/dataset-catalogue.json";
import environmentContextContent from "@/public/data/processed/environment-context.json";
import profileCatalogueContent from "@/public/data/processed/profile-catalogue.json";
import provenanceContent from "@/public/data/processed/provenance.json";
import schemeGeometryContent from "@/public/data/processed/scheme-geometry.json";
import sourceRegisterContent from "@/public/data/processed/source-register.json";

export type ScreenId =
  | "scheme"
  | "bay-detail"
  | "profiles"
  | "conditions"
  | "timeline"
  | "status"
  | "provenance";

export type ScreenCard = {
  id: ScreenId;
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
};

export type ProvenanceItem = {
  id: string;
  title: string;
  source: string;
  date: string;
  licence: string;
  crs: string;
  quality: string;
  status: string;
  note: string;
};

export type TimelineEvent = {
  date: string;
  title: string;
  detail: string;
  tone: "neutral" | "gain" | "loss" | "warning";
};

export type ProfileSeries = {
  name: string;
  date: string;
  points: number[];
  interpretation: string;
};

export type WorkAreaCard = {
  id: string;
  label: string;
  name: string;
  focus: string;
  status: string;
  relativeStart: number;
  relativeWidth: number;
};

export type SchemeLandmark = {
  id: string;
  label: string;
  relativePosition: number;
};

export type SchemeAnchor = {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
  sourceId: string;
  projected: {
    x: number;
    y: number;
  };
};

export type SchemeArea = {
  id: string;
  label: string;
  publicTitle: string;
  name: string;
  focus: string;
  status: string;
  proofCandidate: boolean;
  extentConfidence: string;
  publicBasis: string;
  note: string;
  spatialOrder: number;
  relativeStart: number;
  relativeEnd: number;
  relativeWidth: number;
  relativeMid: number;
  labelRow: number;
};

export type SchemeGeometry = {
  generatedAt: string;
  method: string;
  scheme: {
    id: string;
    title: string;
    lengthKm: number;
    workAreaCount: number;
    extentDescription: string;
    criticalMissingLabel: string;
  };
  sources: Array<{
    id: string;
    title: string;
    url: string;
    retrievedDate: string;
    notes: string[];
  }>;
  anchors: SchemeAnchor[];
  coastlinePath: Array<{ x: number; y: number }>;
  landmarks: SchemeLandmark[];
  areas: SchemeArea[];
};

export type ProfileCatalogue = {
  generatedAt: string;
  surveyUnit: {
    id: string;
    title: string;
    latestPublicReportMonth: string;
    latestPublicReportTitle: string;
    previousPublicReportMonth: string;
    previousPublicReportTitle: string;
    sourceUrl: string;
  };
  proofProfiles: Array<{
    id: string;
    title: string;
    status: string;
    reason: string;
    evidenceClass: string;
    nextAction: string;
  }>;
  ingestionRoute: {
    reportsCatalogueUrl: string;
    apiDocsUrl: string;
    apiConstraint: string;
    qualityRule: string;
  };
};

export type EnvironmentContext = {
  generatedContextDate: string;
  stations: Array<{
    id: string;
    title: string;
    type: string;
    evidenceClass: string;
    location: string;
    latitude?: number;
    longitude?: number;
    deployedDate: string;
    latestServiceNote?: string;
    status: string;
    sourceUrl: string;
    notes: string[];
  }>;
  rules: string[];
};

export type DatasetReadiness = {
  title: string;
  status: string;
  detail: string;
};

export type StoryBeat = {
  title: string;
  summary: string;
};

export type DatasetCatalogueItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  source: string;
  coverage: string;
  licence: string;
  quality: string;
  action: string;
};

export type EvidencePanel = {
  title: string;
  items: string[];
};

export type SourceRegisterItem = {
  id: string;
  title: string;
  type: string;
  status: string;
  url: string;
  publisher: string;
  dateNote: string;
  whyItMatters: string;
};

export type StatusCard = {
  title: string;
  status: string;
  detail: string;
};

export type TimelineContextItem = {
  title: string;
  detail: string;
};

export type IllustrationAsset = {
  id: string;
  title: string;
  summary: string;
  image: string;
  alt: string;
  tags: string[];
  note: string;
};

export type ConditionComparisonAsset = IllustrationAsset & {
  stateLabel: string;
  conditionCue: string;
};

export const projectMeta = phaseOneContent.project;
export const missingDataLabel = phaseOneContent.project.criticalMissingLabel;
export const heroStats = phaseOneContent.heroStats;
export const meetingObjectives = phaseOneContent.meetingObjectives as string[];
export const storyBeats = phaseOneContent.storyBeats as StoryBeat[];
export const screenCards = phaseOneContent.screens as ScreenCard[];
export const workAreas = phaseOneContent.workAreas;
export const workAreaCards = phaseOneContent.workAreaCards as WorkAreaCard[];
export const datasetReadiness = phaseOneContent.datasetReadiness as DatasetReadiness[];
export const profileSeries = phaseOneContent.profileSeries as ProfileSeries[];
export const timelineEvents = phaseOneContent.timelineEvents as TimelineEvent[];
export const timelineContext = phaseOneContent.timelineContext as TimelineContextItem[];
export const proofArea = phaseOneContent.proofArea;
export const proofFacts = phaseOneContent.proofFacts as [string, string][];
export const schemeNarrative = phaseOneContent.schemeNarrative;
export const statusRows = phaseOneContent.statusRows as [string, string][];
export const statusCards = phaseOneContent.statusCards as StatusCard[];
export const nonClaims = phaseOneContent.nonClaims;
export const clientAsk = phaseOneContent.clientAsk as string[];
export const dataRules = phaseOneContent.dataRules;
export const nextActions = phaseOneContent.nextActions;
export const evidencePanels = phaseOneContent.evidencePanels as EvidencePanel[];
export const datasetCatalogue = datasetCatalogueContent as DatasetCatalogueItem[];
export const environmentContext = environmentContextContent as EnvironmentContext;
export const profileCatalogue = profileCatalogueContent as ProfileCatalogue;
export const schemeGeometry = schemeGeometryContent as SchemeGeometry;
export const sourceRegister = sourceRegisterContent as SourceRegisterItem[];
export const provenanceItems = provenanceContent as ProvenanceItem[];

const illustrationLibrary = {
  fullFrontage: {
    id: "full-frontage",
    title: "Whole-frontage opening visual",
    summary:
      "A broad, recognisable Worthing-style frontage image for the first impression of the scheme.",
    image: "/generated-images/worthing-map-derived-frontage-overview-illustration-v1.png",
    alt: "Illustrative aerial-style view of the Worthing seafront frontage and pier",
    tags: ["Illustrative visual", "Whole frontage", "Client opening"],
    note: "Representative generated visual. Not survey evidence."
  },
  pierEastProof: {
    id: "pier-east-proof",
    title: "Pier East proof-area context",
    summary:
      "A closer proof-area illustration that makes the groyne frontage and pier feel specific and discussable.",
    image: "/generated-images/worthing-pier-east-proof-illustration-v1.png",
    alt: "Illustrative proof-area view near Worthing Pier East with repaired groyne frontage",
    tags: ["Illustrative visual", "Proof area", "Pier East"],
    note: "Representative generated visual. Not survey evidence."
  },
  seafrontMonitoring: {
    id: "seafront-monitoring",
    title: "Promenade monitoring atmosphere",
    summary:
      "A wider seafront visual that supports repeated use across summary cards, secondary panels and supporting pages.",
    image: "/generated-images/worthing-seafront-monitoring-illustration-v1.png",
    alt: "Illustrative promenade view of the Worthing seafront with groynes and beach",
    tags: ["Illustrative visual", "Promenade", "Secondary support"],
    note: "Representative generated visual. Not survey evidence."
  },
  timelineContext: {
    id: "timeline-context",
    title: "Weather and shoreline context",
    summary:
      "A timeline-supporting scene that makes chronology and conditions feel grounded in the actual place.",
    image: "/generated-images/worthing-timeline-context-illustration-v1.png",
    alt: "Illustrative Worthing seafront scene with changing weather and shoreline context",
    tags: ["Illustrative visual", "Timeline", "Environmental context"],
    note: "Representative generated visual. Not survey evidence."
  },
  profileMonitoring: {
    id: "profile-monitoring",
    title: "Profile-monitoring field context",
    summary:
      "A beach-level image showing how profile-style observation can be staged without claiming a measured result.",
    image: "/generated-images/worthing-profile-monitoring-illustration-v1.png",
    alt: "Illustrative coastal monitoring setup with survey pole and tripod on the shingle beach",
    tags: ["Illustrative visual", "Profiles", "Monitoring method"],
    note: "Representative generated visual. Not survey evidence."
  },
  statusFrontage: {
    id: "status-frontage",
    title: "Operational frontage condition",
    summary:
      "A tidy, inspection-ready scene that gives the status screen a more operational feeling without implying live triggers.",
    image: "/generated-images/worthing-status-frontage-illustration-v1.png",
    alt: "Illustrative repaired frontage with groynes, rock toe protection and open sea",
    tags: ["Illustrative visual", "Status", "Operational tone"],
    note: "Representative generated visual. Not survey evidence."
  },
  provenanceObservation: {
    id: "provenance-observation",
    title: "Observation and provenance cue",
    summary:
      "A restrained observation scene that supports the provenance and evidence-boundary model.",
    image: "/generated-images/worthing-provenance-observation-illustration-v1.png",
    alt: "Illustrative shoreline observation setup on the Worthing seafront promenade",
    tags: ["Illustrative visual", "Provenance", "Observation"],
    note: "Representative generated visual. Not survey evidence."
  },
  groyneBeforeRepair: {
    id: "groyne-before-repair",
    title: "Pre-repair groyne condition",
    stateLabel: "Before",
    conditionCue: "Weathered timber, rusted fixings and uneven shingle",
    summary:
      "A deliberately restrained pre-works condition visual that helps explain why timber maintenance matters without implying a measured historic record.",
    image: "/generated-images/worthing-groyne-before-repair-illustration-v1.png",
    alt: "Illustrative before-repair view of a weathered timber groyne on a Worthing-style shingle beach",
    tags: ["Illustrative visual", "Before condition", "Maintenance story"],
    note: "Generated from a text prompt using the existing generated proof-area image as style reference. Not survey evidence."
  },
  groyneAfterRepair: {
    id: "groyne-after-repair",
    title: "Post-repair groyne condition",
    stateLabel: "After",
    conditionCue: "Renewed boards, fresh fixings and tidier beach profile",
    summary:
      "A matched post-works condition visual that makes the client benefit immediately visible while keeping performance claims for future measured data.",
    image: "/generated-images/worthing-groyne-after-repair-illustration-v1.png",
    alt: "Illustrative after-repair view of a renewed timber groyne on a Worthing-style shingle beach",
    tags: ["Illustrative visual", "After condition", "Maintenance story"],
    note: "Generated from a text prompt using the existing generated proof-area image as style reference. Not survey evidence."
  }
} satisfies Record<string, IllustrationAsset | ConditionComparisonAsset>;

export const shellIllustrations = {
  home: illustrationLibrary.fullFrontage,
  scheme: illustrationLibrary.fullFrontage,
  bay: illustrationLibrary.pierEastProof,
  profiles: illustrationLibrary.profileMonitoring,
  timeline: illustrationLibrary.timelineContext,
  status: illustrationLibrary.statusFrontage,
  provenance: illustrationLibrary.provenanceObservation
} as const;

export const homepageIllustrations = [
  illustrationLibrary.fullFrontage,
  illustrationLibrary.pierEastProof,
  illustrationLibrary.seafrontMonitoring
] as const;

export const schemeIllustrations = [
  illustrationLibrary.fullFrontage,
  illustrationLibrary.pierEastProof,
  illustrationLibrary.seafrontMonitoring
] as const;

export const bayIllustrations = [
  illustrationLibrary.pierEastProof,
  illustrationLibrary.groyneBeforeRepair,
  illustrationLibrary.groyneAfterRepair,
  illustrationLibrary.profileMonitoring,
  illustrationLibrary.statusFrontage
] as const;

export const groyneConditionComparison = [
  illustrationLibrary.groyneBeforeRepair,
  illustrationLibrary.groyneAfterRepair
] as readonly ConditionComparisonAsset[];

export const profileIllustrations = [
  illustrationLibrary.profileMonitoring,
  illustrationLibrary.pierEastProof,
  illustrationLibrary.provenanceObservation
] as const;

export const timelineIllustrations = [
  illustrationLibrary.timelineContext,
  illustrationLibrary.seafrontMonitoring,
  illustrationLibrary.statusFrontage
] as const;

export const statusIllustrations = [
  illustrationLibrary.statusFrontage,
  illustrationLibrary.pierEastProof,
  illustrationLibrary.seafrontMonitoring
] as const;

export const provenanceIllustrations = [
  illustrationLibrary.provenanceObservation,
  illustrationLibrary.profileMonitoring,
  illustrationLibrary.fullFrontage
] as const;
