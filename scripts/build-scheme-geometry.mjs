import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourcePath = path.join(rootDir, "research", "public-data", "worthing-scheme-public-transcription.json");
const outputPath = path.join(rootDir, "public", "data", "processed", "scheme-geometry.json");

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function projectAnchors(anchors) {
  const longitudes = anchors.map((anchor) => anchor.longitude);
  const latitudes = anchors.map((anchor) => anchor.latitude);
  const minLon = Math.min(...longitudes);
  const maxLon = Math.max(...longitudes);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);

  return anchors.map((anchor) => ({
    ...anchor,
    projected: {
      x: round((anchor.longitude - minLon) / Math.max(maxLon - minLon, 0.00001)),
      y: round(1 - (anchor.latitude - minLat) / Math.max(maxLat - minLat, 0.00001))
    }
  }));
}

function buildCoastlinePath(anchors) {
  return anchors.map((anchor) => ({
    x: anchor.projected.x,
    y: round(0.28 + anchor.projected.y * 0.48)
  }));
}

function interpolatePoint(start, end, fraction) {
  return {
    longitude: start.longitude + (end.longitude - start.longitude) * fraction,
    latitude: start.latitude + (end.latitude - start.latitude) * fraction,
    x: round(start.projected.x + (end.projected.x - start.projected.x) * fraction),
    y: round(start.projected.y + (end.projected.y - start.projected.y) * fraction)
  };
}

async function main() {
  const source = JSON.parse(await readFile(sourcePath, "utf8"));
  const anchors = projectAnchors(source.anchors);
  const anchorLookup = new Map(anchors.map((anchor) => [anchor.id, anchor]));

  const areas = source.spatialOrder.map((area, index) => {
    const startAnchor = anchorLookup.get(area.startAnchorId);
    const endAnchor = anchorLookup.get(area.endAnchorId);

    if (!startAnchor || !endAnchor) {
      throw new Error(`Missing anchor for ${area.id}`);
    }

    const startPoint = interpolatePoint(startAnchor, endAnchor, area.segmentStartFraction);
    const endPoint = interpolatePoint(startAnchor, endAnchor, area.segmentEndFraction);
    const midPoint = interpolatePoint(startAnchor, endAnchor, (area.segmentStartFraction + area.segmentEndFraction) / 2);
    const start = startPoint.x;
    const end = endPoint.x;
    const mid = midPoint.x;

    return {
      id: area.id,
      label: area.label,
      publicTitle: area.publicTitle,
      name: area.displayName,
      focus: area.proofCandidate ? "Priority proof area" : "Public scheme context",
      status:
        area.extentConfidence === "approximate"
          ? "Public extent derived"
          : "Public extent anchored",
      proofCandidate: area.proofCandidate,
      extentConfidence: area.extentConfidence,
      publicBasis: area.publicBasis,
      note: area.note,
      spatialOrder: index + 1,
      anchorStartId: area.startAnchorId,
      anchorEndId: area.endAnchorId,
      relativeStart: round(start),
      relativeEnd: round(end),
      relativeWidth: round(Math.max(end - start, 0.025)),
      relativeMid: round(mid),
      labelRow: index % 2 === 0 ? 0 : 1,
      geographicStart: startPoint,
      geographicEnd: endPoint,
      geographicMid: midPoint
    };
  });

  const landmarks = source.landmarks.map((landmark) => {
    const anchor = anchorLookup.get(landmark.anchorId);

    if (!anchor) {
      throw new Error(`Missing landmark anchor for ${landmark.id}`);
    }

    return {
      id: landmark.id,
      label: landmark.label,
      relativePosition: anchor.projected.x
    };
  });

  const payload = {
    generatedAt: "2026-08-29",
    method:
      "Approximate frontage trace derived from public landmark coordinates, the council works page and overview plan sequence. It is presentation-grade public geography, not engineering geometry.",
    scheme: source.scheme,
    sources: source.sources,
    anchors,
    coastlinePath: buildCoastlinePath(anchors),
    landmarks,
    areas
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
