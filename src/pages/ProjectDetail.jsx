import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, TrendingUp, X } from "lucide-react";
import { normalizeItems, parseTechStack } from "../utils/projectUtils";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const MotionDiv = motion.div;

const formatYear = (value) => {
  if (!value) return "Recent";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Recent" : date.getFullYear();
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

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

  const project = useMemo(
    () => projects.find((item) => String(item.id) === String(projectId)),
    [projectId, projects]
  );

  const grouped = parseTechStack(project?.tech_stack);
  const skills = Object.values(grouped).flatMap(normalizeItems);
  const primaryCategory = Object.keys(grouped)[0] || "Project";

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-[2000] bg-white dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (status === "error" || !project) {
    return (
      <div className="fixed inset-0 z-[2000] bg-white dark:bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white mb-4">
            Project not found
          </h2>
          <Link to="/" className="text-purple-600 font-semibold hover:underline">
            Back to Home
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
      className="fixed inset-0 z-[2000] bg-white dark:bg-gray-950 overflow-y-auto"
    >
      <div className="sticky top-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
        <h2 className="text-lg md:text-xl font-bold text-gray-950 dark:text-white">
          {project.title}
        </h2>
        <button
          onClick={() => navigate("/")}
          className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300 hover:rotate-90"
          aria-label="Close project details"
        >
          <X size={18} />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="h-80 md:h-96 bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden mb-10"
        >
          <img
            src={project.image_url || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap gap-8 mb-10"
        >
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
              Category
            </span>
            <span className="font-bold text-gray-950 dark:text-white">{primaryCategory}</span>
          </div>
          {skills.length > 0 && (
            <div>
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
                Stack
              </span>
              <span className="font-bold text-gray-950 dark:text-white">
                {skills.slice(0, 4).join(", ")}
              </span>
            </div>
          )}
          <div>
            <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold block mb-1">
              Year
            </span>
            <span className="font-bold text-gray-950 dark:text-white">
              {formatYear(project.created_at)}
            </span>
          </div>
        </MotionDiv>

        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="text-2xl font-bold text-gray-950 dark:text-white mb-4">Overview</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
            {project.description}
          </p>

          {Object.keys(grouped).length > 0 && (
            <>
              <h3 className="text-2xl font-bold text-gray-950 dark:text-white mb-6">
                Technical Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {Object.entries(grouped).map(([group, items]) => (
                  <div
                    key={group}
                    className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-5"
                  >
                    <h4 className="font-bold text-purple-600 mb-3">{group}</h4>
                    <div className="flex flex-wrap gap-2">
                      {normalizeItems(items).map((item) => (
                        <span
                          key={item}
                          className="text-xs px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="text-2xl font-bold text-gray-950 dark:text-white mb-4">
            Project Access
          </h3>
          <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900 p-6 rounded-2xl mb-10">
            <p className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-5">
              <TrendingUp size={20} />
              Explore the source, live build, or return to the portfolio.
            </p>
            <div className="flex flex-wrap gap-3">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg font-semibold transition"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {project.repo_url && (
                <a
                  href={project.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-950 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold transition"
                >
                  <Github size={18} />
                  Source Code
                </a>
              )}
            </div>
          </div>

          <div className="text-center pb-8">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </button>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
