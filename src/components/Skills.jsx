import { useEffect, useMemo, useState } from "react";
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Network,
  Server,
  Wrench,
} from "lucide-react";
import { readCache, writeCache } from "../utils/apiCache";
import { FALLBACK_SKILLS } from "../data/fallback";
import { fetchJsonWithRetry } from "../utils/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const CATEGORY_ORDER = [
  "AI & Agent Engineering",
  "RAG & Knowledge Systems",
  "Machine Learning",
  "Backend & APIs",
  "Frontend",
  "Databases & Cloud",
  "DevOps",
  "Languages",
  "Tools",
  "Other",
];

// Older skill rows use short category names. Normalize them for display so the
// grid does not show duplicate groups.
const CATEGORY_ALIASES = {
  AI: "AI & Agent Engineering",
  Backend: "Backend & APIs",
};

const canonicalCategory = (category) => {
  const value = (category || "").trim() || "Other";
  return CATEGORY_ALIASES[value] || value;
};

const CATEGORY_ICONS = {
  "AI & Agent Engineering": Network,
  "RAG & Knowledge Systems": Database,
  "Machine Learning": Cpu,
  "Backend & APIs": Server,
  Frontend: Code2,
  "Databases & Cloud": Database,
  DevOps: Wrench,
  Languages: Code2,
  Tools: Wrench,
};

export default function Skills() {
  const [skills, setSkills] = useState(
    () => readCache("skills") || FALLBACK_SKILLS
  );
  const [status, setStatus] = useState(() =>
    (readCache("skills") || FALLBACK_SKILLS).length > 0 ? "ready" : "loading"
  );

  useEffect(() => {
    let alive = true;

    fetchJsonWithRetry(`${API_URL}/skills?page=1&page_size=100`)
      .then((data) => {
        if (!alive) return;
        const items = data.items || [];
        setSkills(items);
        setStatus("ready");
        writeCache("skills", items);
      })
      .catch(() => {
        if (!alive) return;
        setSkills((current) => (current.length > 0 ? current : []));
        setStatus((current) => (current === "ready" ? current : "error"));
      });

    return () => {
      alive = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = {};
    const seen = {};

    skills.forEach((skill) => {
      const category = canonicalCategory(skill.category);
      const name = (skill.name || "").trim().toLowerCase();
      if (!name) return;

      map[category] = map[category] || [];
      seen[category] = seen[category] || new Set();
      if (seen[category].has(name)) return;

      seen[category].add(name);
      map[category].push(skill);
    });

    const ordered = {};
    CATEGORY_ORDER.forEach((category) => {
      if (map[category]) ordered[category] = map[category];
    });
    Object.keys(map).forEach((category) => {
      if (!ordered[category]) ordered[category] = map[category];
    });

    return ordered;
  }, [skills]);

  const groups = Object.entries(grouped);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section relative overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent dark:from-purple-900/20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent dark:from-blue-900/20" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="section-title mb-12 text-center">
          <h2
            id="skills-heading"
            className="mb-3 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
          >
            Skills &amp; Expertise
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            The tools and frameworks I use to design, build, and ship production
            AI and full-stack systems.
          </p>
        </div>

        {status === "loading" && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="card animate-pulse p-6">
                <div className="mb-6 h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3">
                  <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800/70" />
                  <div className="h-8 rounded-lg bg-slate-100 dark:bg-slate-800/70" />
                  <div className="h-8 w-4/5 rounded-lg bg-slate-100 dark:bg-slate-800/70" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="card mx-auto max-w-xl p-8 text-center">
            <p className="font-semibold text-foreground">
              Skills are unavailable right now
            </p>
            <p className="mt-2 text-sm text-muted">
              Please refresh the page, or{" "}
              <a href="#contact" className="text-brand-600 hover:underline dark:text-brand-400">
                get in touch
              </a>{" "}
              for a full technical breakdown.
            </p>
          </div>
        )}

        {status === "ready" && groups.length === 0 && (
          <div className="card mx-auto max-w-xl p-8 text-center">
            <p className="font-semibold text-foreground">No skills listed yet</p>
            <p className="mt-2 text-sm text-muted">
              Check back soon, or view the{" "}
              <a href="#projects" className="text-brand-600 hover:underline dark:text-brand-400">
                projects
              </a>{" "}
              for examples of the work.
            </p>
          </div>
        )}

        {groups.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {groups.map(([category, items]) => {
              const Icon = CATEGORY_ICONS[category] || Layers;

              return (
                <div key={category} className="card p-6">
                  <div className="mb-5 flex items-start justify-between gap-3">
                    <h3 className="flex items-center gap-2.5 text-base font-bold text-foreground">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                        <Icon size={17} />
                      </span>
                      {category}
                    </h3>
                    <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-0.5 text-xs font-semibold text-brand-600 dark:text-brand-400">
                      {items.length}
                    </span>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <li key={skill.id} className="skill-pill !text-sm">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-brand-500/70"
                        />
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Want to see these in action?{" "}
            <a
              href="#projects"
              className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
            >
              Explore the projects
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
