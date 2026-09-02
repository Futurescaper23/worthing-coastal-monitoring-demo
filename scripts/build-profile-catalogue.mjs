import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourcePath = path.join(rootDir, "research", "public-data", "cco-profile-public-transcription.json");
const outputPath = path.join(rootDir, "public", "data", "processed", "profile-catalogue.json");

async function main() {
  const source = JSON.parse(await readFile(sourcePath, "utf8"));

  const payload = {
    generatedAt: source.generatedContextDate,
    surveyUnit: source.surveyUnit,
    proofProfiles: source.proofProfiles,
    ingestionRoute: source.ingestionRoute
  };

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
