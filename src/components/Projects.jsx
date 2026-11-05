import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  Github,
  LayoutGrid,
  List,
  Server,
} from "lucide-react";
import {
  formatProjectTitle,
  getProjectPath,
  normalizeItems,
  parseTechStack,
  sortProjects,
} from "../utils/projectUtils";
import { readCache, writeCache } from "../utils/apiCache";
import { fetchJsonWithRetry } from "../utils/api";
import ProjectCover from "./ProjectCover";
import { NetworkIcon } from "./icons";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const MotionDiv = Motion.div;

const FILTERS = [
  { label: "All Work", value: "all", icon: <LayoutGrid size={16} /> },
  { label: "Frontend", value: "frontend", icon: <Code2 size={16} /> },
  { label: "Backend", value: "backend", icon: <Server size={16} /> },
  { label: "AI / Agents", value: "ai", icon: <NetworkIcon size={16} /> },
];

const FILTER_KEYWORDS = {
  frontend: [
    "frontend",
    "front-end",
    "react",
    "next.js",
    "nextjs",
    "typescript",
    "javascript",
    "tailwind",
    "css",
    "html",
    "vite",
    "redux",
    "zustand",
    "ui",
    "ux",
    "framer",
  ],
  backend: [
    "backend",
    "back-end",
    "fastapi",
    "flask",
    "django",
    "node",
    "express",
    "postgresql",
    "postgres",
    "mysql",
    "sqlite",
    "sqlalchemy",
    "redis",
    "api",
    "rest",
    "graphql",
    "supabase",
    "celery",
    "docker",
  ],
  ai: [
    "ai",
    "agent",
    "agents",
    "agentic",
    "llm",
    "llms",
    "rag",
    "langgraph",
    "langchain",
    "openai",
    "anthropic",
    "claude",
    "gemini",
    "gpt",
    "embedding",
    "embeddings",
    "chromadb",
    "chroma",
    "nlp",
    "ml",
    "machine",
    "learning",
    "prompt",
    "copilot",
    "azure",
    "foundry",
    "mcp",
    "a2a",
    "hugging",
    "face",
  ],
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getProjectSkills = (project) => {
  const grouped = parseTechStack(project.tech_stack);
  return Object.values(grouped).flatMap(normalizeItems);
};

const getProjectCategory = (project) => {
  const grouped = parseTechStack(project.tech_stack);
  const firstGroup = Object.keys(grouped)[0];
  return firstGroup || "Project";
};

const getHaystack = (project) => {
  const grouped = parseTechStack(project.tech_stack);
  return [
    project.title,
    project.description,
    ...Object.keys(grouped),
    ...Object.values(grouped).flatMap(normalizeItems),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9+#.]+/g, " ");
};

const matchesFilter = (project, filter) => {
  if (filter === "all") return true;
  const haystack = getHaystack(project);
  return FILTER_KEYWORDS[filter].some((keyword) =>
    new RegExp(`(^|\\s)${escapeRegex(keyword)}(?=\\s|$)`).test(haystack)
  );
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState(() => {
    const cached = readCache("projects");
    return cached ? sortProjects(cached) : [];
  });
  const [status, setStatus] = useState(() =>
    readCache("projects") ? "ready" : "loading"
  );
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    let alive = true;

    fetchJsonWithRetry(`${API_URL}/projects?page=1&page_size=100`)
      .then((data) => {
        if (!alive) return;
        const items = data.items || [];
        setProjects(sortProjects(items));
        setStatus("ready");
        writeCache("projects", items);
      })
      .catch(() => {
        if (!alive) return;
        // Keep cached content visible if a revalidation fails.
        setProjects((current) => (current.length > 0 ? current : []));
        setStatus((current) => (current === "ready" ? current : "error"));
      });

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter, projects]
  );

  const isGrid = viewMode === "grid";

  const emptyMessage =
    status === "error"
      ? "Selected work is temporarily unavailable."
      : activeFilter === "all"
        ? "No projects published yet."
        : "No projects in this category yet.";

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section bg-slate-50 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Code2 size={16} />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
              Selected Work
            </p>
          </div>
          <h2
            id="projects-heading"
            className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
          >
            AI systems and full-stack products
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            A focused collection of production-minded projects, built end to end
            with clean architecture, tested APIs, and clear documentation.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-2">
              {[
                { mode: "grid", icon: <LayoutGrid size={16} />, label: "Grid view" },
                { mode: "list", icon: <List size={16} />, label: "List view" },
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg transition-all ${
                    viewMode === mode
                      ? "bg-brand text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  aria-label={`Switch to ${label}`}
                  aria-pressed={viewMode === mode}
                  type="button"
                >
                  {icon}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                    activeFilter === filter.value
                      ? "border-brand bg-brand text-white shadow-lg shadow-brand/30"
                      : "border-border bg-card text-slate-600 hover:border-brand/50 hover:text-brand dark:text-slate-400"
                  }`}
                  aria-pressed={activeFilter === filter.value}
                  type="button"
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </MotionDiv>

        {status === "loading" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((item) => (
              <div key={item} className="card animate-pulse overflow-hidden">
                <div className="h-64 bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-3 p-6">
                  <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-5 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
                  <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/70" />
                </div>
              </div>
            ))}
          </div>
        )}

        {status !== "loading" && filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
              <Code2 size={32} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">
              {emptyMessage}
            </h3>
            {projects.length > 0 && activeFilter !== "all" && (
              <button
                onClick={() => setActiveFilter("all")}
                className="btn btn-outline mt-6"
                type="button"
              >
                View All Work
              </button>
            )}
          </div>
        )}

        {status !== "loading" && filtered.length > 0 && (
          <MotionDiv
            key={viewMode + activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              isGrid
                ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-5"
            }
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const skills = getProjectSkills(project).slice(0, isGrid ? 5 : 7);
                const category = getProjectCategory(project);

                return (
                  <Motion.article
                    key={project.id}
                    variants={cardVariants}
                    className={`group card relative overflow-hidden ${
                      isGrid ? "" : "flex flex-col sm:flex-row"
                    }`}
                  >
                    <Link
                      to={getProjectPath(project)}
                      className={
                        isGrid
                          ? "relative block h-64 overflow-hidden"
                          : "relative block h-48 overflow-hidden sm:h-auto sm:min-h-[15rem] sm:w-72 sm:shrink-0"
                      }
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      <ProjectCover
                        project={project}
                        category={category}
                        className="transition-transform duration-700 group-hover:scale-105"
                        imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {isGrid && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                          <div className="absolute inset-x-0 bottom-0 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                              {category}
                            </span>
                          </div>
                        </>
                      )}
                    </Link>

                    <div
                      className={
                        isGrid ? "p-6" : "flex flex-1 flex-col p-6 sm:p-7"
                      }
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <Link
                          to={getProjectPath(project)}
                          className="text-xs font-bold uppercase tracking-wider text-brand-600 hover:underline dark:text-brand-400"
                        >
                          {category}
                        </Link>
                        <Link
                          to={getProjectPath(project)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-colors hover:bg-brand hover:text-white dark:bg-slate-800"
                          aria-label={`View ${formatProjectTitle(project.title)}`}
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                      <Link to={getProjectPath(project)} className="block">
                        <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-brand">
                          {formatProjectTitle(project.title)}
                        </h3>
                        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {project.description}
                        </p>
                      </Link>

                      {skills.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span key={skill} className="skill-pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-auto flex flex-wrap items-center gap-3">
                        <Link
                          to={getProjectPath(project)}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline dark:text-brand-400"
                        >
                          Case Study <ArrowRight size={14} />
                        </Link>

                        {!project.live_url && !project.repo_url && (
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            Private build
                          </span>
                        )}

                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-brand dark:text-slate-400"
                          >
                            <ExternalLink size={14} />
                            Live
                          </a>
                        )}

                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition-colors hover:text-brand dark:text-slate-400"
                          >
                            <Github size={14} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </Motion.article>
                );
              })}
            </AnimatePresence>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
