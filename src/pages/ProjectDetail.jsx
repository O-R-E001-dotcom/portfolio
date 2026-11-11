import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Layers, X } from "lucide-react";
import {
  formatProjectTitle,
  normalizeItems,
  parseTechStack,
  splitProjectTitle,
} from "../utils/projectUtils";
import { readCache } from "../utils/apiCache";
import { findFallbackProject } from "../data/fallback";
import { fetchJsonWithRetry } from "../utils/api";
import ProjectCover from "../components/ProjectCover";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const MotionDiv = Motion.div;

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState(() => {
    // Paint the project from cache or the bundled snapshot right away; the
    // live request below only refreshes it.
    const cached = readCache("projects");
    const initial =
      (Array.isArray(cached) &&
        cached.find((item) => String(item.id) === String(projectId))) ||
      findFallbackProject(projectId);

    return {
      projectId,
      status: initial ? "ready" : "loading",
      project: initial || null,
    };
  });

  const status = state.projectId === projectId ? state.status : "loading";
  const project = state.projectId === projectId ? state.project : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  useEffect(() => {
    let alive = true;

    fetchJsonWithRetry(`${API_URL}/projects/${projectId}`)
      .then((data) => {
        if (!alive) return;
        setState({ projectId, status: "ready", project: data });
      })
      .catch(() => {
        if (!alive) return;
        // Keep the cached or bundled project visible if revalidation fails.
        setState((previous) =>
          previous.projectId === projectId && previous.project
            ? previous
            : { projectId, status: "error", project: null }
        );
      });

    return () => {
      alive = false;
    };
  }, [projectId]);

  useEffect(() => {
    if (!project) return;

    const title = formatProjectTitle(project.title);
    const summary = (project.description || "").replace(/\s+/g, " ").trim();
    const url = `https://portfolio-eta-flax-91.vercel.app/project/${project.id}`;
    const meta = document.querySelector('meta[name="description"]');
    const canonical = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    const previous = {
      title: document.title,
      description: meta?.getAttribute("content"),
      canonical: canonical?.getAttribute("href"),
      ogUrl: ogUrl?.getAttribute("content"),
      ogTitle: ogTitle?.getAttribute("content"),
      ogDescription: ogDescription?.getAttribute("content"),
    };

    document.title = `${title} | Abolore Sanni`;
    if (summary) {
      meta?.setAttribute("content", summary.slice(0, 155));
      ogDescription?.setAttribute("content", summary.slice(0, 200));
    }
    canonical?.setAttribute("href", url);
    ogUrl?.setAttribute("content", url);
    ogTitle?.setAttribute("content", `${title} | Abolore Sanni`);

    return () => {
      document.title = previous.title;
      if (previous.description) meta?.setAttribute("content", previous.description);
      if (previous.canonical) canonical?.setAttribute("href", previous.canonical);
      if (previous.ogUrl) ogUrl?.setAttribute("content", previous.ogUrl);
      if (previous.ogTitle) ogTitle?.setAttribute("content", previous.ogTitle);
      if (previous.ogDescription)
        ogDescription?.setAttribute("content", previous.ogDescription);
    };
  }, [project]);

  const grouped = useMemo(() => parseTechStack(project?.tech_stack), [project]);
  const primaryCategory = Object.keys(grouped)[0] || "Project";
  const { name: projectName, tagline: projectTagline } = splitProjectTitle(
    project?.title
  );

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
          <p className="text-sm text-muted">Loading project...</p>
        </div>
      </div>
    );
  }

  if (status === "error" || !project) {
    return (
      <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-background px-6">
        <div className="text-center">
          <h2 className="mb-3 text-2xl font-bold text-foreground">
            Project not found
          </h2>
          <p className="mb-6 text-muted">
            This project may have been moved or removed.
          </p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[2000] overflow-y-auto bg-background"
    >
      <div className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted transition-colors hover:text-brand"
          >
            <ArrowLeft size={16} /> All Projects
          </Link>
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:rotate-90 hover:bg-card"
            aria-label="Close project details"
            type="button"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10 md:py-14">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 overflow-hidden rounded-3xl border border-border bg-card"
        >
          <ProjectCover
            project={project}
            category={primaryCategory}
            width={1600}
            sizes="(max-width: 768px) 100vw, 1024px"
            className="h-64 w-full md:h-96"
            imgClassName="h-64 w-full object-cover md:h-96"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="badge badge-brand">
              <Layers size={13} /> {primaryCategory}
            </span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            <span className="block">{projectName}</span>
            {projectTagline && (
              <span className="mt-2 block text-xl font-semibold leading-snug text-muted md:text-2xl">
                {projectTagline}
              </span>
            )}
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
            {project.repo_url && (
              <a
                href={project.repo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Github size={18} /> Source Code
              </a>
            )}
          </div>

          {!project.live_url && !project.repo_url && (
            <p className="mt-6 max-w-2xl rounded-2xl border border-border bg-card p-4 text-sm text-muted">
              Source code and a public demo are not available for this build.{" "}
              <a
                href="/#contact"
                className="font-semibold text-brand-600 hover:underline dark:text-brand-400"
              >
                Ask about the architecture
              </a>
              .
            </p>
          )}
        </MotionDiv>

        <div className="divider my-10" />

        {Object.keys(grouped).length > 0 && (
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
          >
            <h2 className="mb-6 text-2xl font-bold text-foreground">
              Technical Stack
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(grouped).map(([group, items]) => (
                <div
                  key={group}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {group}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {normalizeItems(items).map((item) => (
                      <span key={item} className="skill-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </MotionDiv>
        )}

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34 }}
          className="mt-12 rounded-3xl border border-brand-500/20 bg-brand-500/5 p-8 text-center"
        >
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Interested in working together?
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-muted">
            I build AI agents and full-stack products like this one. Let's talk
            about your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/#contact" className="btn btn-primary">
              Get In Touch
            </Link>
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline"
              type="button"
            >
              <ArrowLeft size={18} /> Back to Portfolio
            </button>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
