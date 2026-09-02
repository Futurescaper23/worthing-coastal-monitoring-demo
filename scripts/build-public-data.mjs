import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  "build-environment-context.mjs",
  "build-profile-catalogue.mjs",
  "build-scheme-geometry.mjs",
  "build-source-register.mjs"
];

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(__dirname, scriptName)], {
      stdio: "inherit"
    });

    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${scriptName} exited with code ${code}`));
    });
  });
}

for (const scriptName of scripts) {
  await runScript(scriptName);
}
