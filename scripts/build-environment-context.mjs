import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const sourcePath = path.join(
  rootDir,
  "research",
  "public-data",
  "environment-context-public-transcription.json"
);
const outputPath = path.join(rootDir, "public", "data", "processed", "environment-context.json");

async function main() {
  const payload = JSON.parse(await readFile(sourcePath, "utf8"));

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
