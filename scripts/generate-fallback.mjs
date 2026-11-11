/**
 * Refresh the bundled content snapshot in src/data.
 *
 * The public content API runs on a dyno that sleeps after a period of
 * inactivity, so the first visitor can wait a long time for JSON. The site
 * ships this snapshot so every visit paints real content immediately and then
 * revalidates against the live API in the background.
 *
 * Run `npm run snapshot` after publishing content changes.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const API =
  process.env.PORTFOLIO_API_URL ||
  "https://portfolio-001-0ce74aa7e84e.herokuapp.com";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "src/data");

async function getJson(path) {
  const response = await fetch(`${API}${path}`, {
    signal: AbortSignal.timeout(60000),
  });
  if (!response.ok) {
    throw new Error(`${path} failed with ${response.status}`);
  }
  return response.json();
}

const [profile, projects, skills] = await Promise.all([
  getJson("/profile"),
  getJson("/projects?page=1&page_size=100"),
  getJson("/skills?page=1&page_size=100"),
]);

await mkdir(outDir, { recursive: true });
await Promise.all([
  writeFile(
    resolve(outDir, "profile.json"),
    `${JSON.stringify(profile, null, 2)}\n`,
    "utf8"
  ),
  writeFile(
    resolve(outDir, "projects.json"),
    `${JSON.stringify(projects.items || [], null, 2)}\n`,
    "utf8"
  ),
  writeFile(
    resolve(outDir, "skills.json"),
    `${JSON.stringify(skills.items || [], null, 2)}\n`,
    "utf8"
  ),
]);

console.log(
  `Snapshot updated: ${projects.items?.length ?? 0} projects, ${
    skills.items?.length ?? 0
  } skills, profile ${profile?.id ?? "?"}`
);
