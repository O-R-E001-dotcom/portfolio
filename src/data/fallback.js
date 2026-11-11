/**
 * Bundled content snapshot.
 *
 * Generated from the live API with `npm run snapshot`. These values render
 * immediately on a first visit, so the page never waits on a sleeping dyno.
 * Every component still revalidates against the API in the background.
 */
import profileSnapshot from "./profile.json";
import projectsSnapshot from "./projects.json";
import skillsSnapshot from "./skills.json";

export const FALLBACK_PROFILE =
  profileSnapshot && typeof profileSnapshot === "object" ? profileSnapshot : {};

export const FALLBACK_PROJECTS = Array.isArray(projectsSnapshot)
  ? projectsSnapshot
  : [];

export const FALLBACK_SKILLS = Array.isArray(skillsSnapshot)
  ? skillsSnapshot
  : [];

export function findFallbackProject(projectId) {
  const id = String(projectId ?? "");
  return FALLBACK_PROJECTS.find((project) => String(project.id) === id) || null;
}
