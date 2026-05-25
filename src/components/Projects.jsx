import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { getProjectPath, normalizeItems, parseTechStack } from "../utils/projectUtils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const MotionDiv = motion.div;
const MotionArticle = motion.article;

const filters = [
  { label: "All Work", value: "all" },
  { label: "Frontend", value: "frontend" },
  { label: "Backend", value: "backend" },
  { label: "AI / ML", value: "ai" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const getProjectSkills = (project) => {
  const grouped = parseTechStack(project.tech_stack);
  return Object.values(grouped).flatMap(normalizeItems);
};

const getProjectCategory = (project) => {
  const grouped = parseTechStack(project.tech_stack);
  const firstGroup = Object.keys(grouped)[0];
  return firstGroup || "Project";
};

const matchesFilter = (project, filter) => {
  if (filter === "all") return true;

  const grouped = parseTechStack(project.tech_stack);
  const haystack = [
    project.title,
    project.description,
    ...Object.keys(grouped),
    ...Object.values(grouped).flatMap(normalizeItems),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(filter);
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let alive = true;

    fetch(`${API_URL}/projects?page=1&page_size=100`)
      .then((res) => {
        if (!res.ok) throw new Error("Unable to load projects");
        return res.json();
      })
      .then((data) => {
        if (!alive) return;
        setProjects(data.items || []);
        setStatus("ready");
      })
      .catch(() => {
        if (!alive) return;
        setProjects([]);
        setStatus("error");
      });

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(
    () => projects.filter((project) => matchesFilter(project, activeFilter)),
    [activeFilter, projects]
  );

  const emptyMessage =
    status === "loading"
      ? "Loading projects..."
      : status === "error"
        ? "Projects are unavailable right now."
        : "No projects match this filter yet.";

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-4">
            Portfolio
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-950 dark:text-white mb-4">
            Selected Works & Product{" "}
            <span className="text-purple-600">Experiences</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
            A focused collection of projects across web, backend, AI, and full-stack
            products, built to solve practical problems with clear technical choices.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === filter.value
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:text-purple-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </MotionDiv>

        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            {emptyMessage}
          </div>
        ) : (
          <MotionDiv
            key={activeFilter}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const skills = getProjectSkills(project).slice(0, 5);
                const category = getProjectCategory(project);

                return (
                  <MotionArticle
                    key={project.id}
                    variants={cardVariants}
                    layout
                    whileHover={{ y: -8 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 group transition-shadow duration-300 hover:shadow-2xl"
                  >
                    <Link to={getProjectPath(project)} className="block">
                      <div className="h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-3">
                        {category}
                      </p>
                      <Link to={getProjectPath(project)} className="block">
                        <h3 className="text-lg font-bold text-gray-950 dark:text-white mb-3">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </Link>
                      {skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
                        <Link
                          to={getProjectPath(project)}
                          className="inline-flex items-center gap-2 text-purple-600"
                        >
                          View Details
                          <ArrowRight size={16} />
                        </Link>
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-gray-500 hover:text-purple-600"
                          >
                            <ExternalLink size={15} />
                            Live
                          </a>
                        )}
                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-gray-500 hover:text-purple-600"
                          >
                            <Github size={15} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </MotionArticle>
                );
              })}
            </AnimatePresence>
          </MotionDiv>
        )}

        {projects.length > 0 && activeFilter !== "all" && (
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setActiveFilter("all")}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              View All Projects
              <ArrowRight size={18} />
            </button>
          </MotionDiv>
        )}
      </div>
    </section>
  );
}
