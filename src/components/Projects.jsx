import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const parseGroupString = (value) => {
  const groups = {};
  const parts = value.split(/\s*[;|\n]\s*/).filter(Boolean);
  parts.forEach((part) => {
    const [rawGroup, rawItems] = part.split(":");
    if (!rawGroup || !rawItems) return;
    const group = rawGroup.trim();
    const items = rawItems
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (group && items.length) groups[group] = items;
  });
  return Object.keys(groups).length ? groups : null;
};

const parseTechStack = (value) => {
  if (!value) return null;
  if (typeof value === "object") return value;
  try {
    const obj = JSON.parse(value);
    if (obj && typeof obj === "object") return obj;
  } catch {}
  return parseGroupString(value);
};

const normalizeItems = (items) => {
  if (Array.isArray(items)) return items;
  if (typeof items === "string") {
    return items
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [expanded, setExpanded] = useState(() => new Set());
  const [paused, setPaused] = useState(false);
  const scrollerRef = useRef(null);
  const rafRef = useRef(0);
  const lastRef = useRef(0);

  const toggleExpanded = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const truncate = (text, limit = 140) => {
    if (!text) return "";
    if (text.length <= limit) return text;
    return `${text.slice(0, limit)}...`;
  };

  useEffect(() => {
    fetch(`${API_URL}/projects?page=1&page_size=100`)
      .then((res) => res.json())
      .then((data) => setProjects(data.items || []))
      .catch(() => setProjects([]));
  }, []);

  const cards = useMemo(() => projects, [projects]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const speed = 0.08; // pixels per ms (cinematic slow)

    const tick = (ts) => {
      if (!lastRef.current) lastRef.current = ts;
      const delta = ts - lastRef.current;
      lastRef.current = ts;

      if (!paused) {
        el.scrollLeft += delta * speed;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, cards.length]);

  return (
    <section
      id="projects"
      className="relative py-24 px-6 text-white 
      bg-gradient-to-br from-[#1b1325] via-[#29152f] to-[#1a0f1f]
      overflow-hidden "
    >
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-700/40 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-500/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-500/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-700/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-fuchsia-500/20 blur-3xl rounded-full animate-ping" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-10 text-center tracking-wide"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-500">
            Featured Projects
          </span>
        </motion.h2>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div
            ref={scrollerRef}
            className="w-full overflow-hidden"
          >
            <div className="flex gap-10 w-max">
              {cards.map((project) => {
                const grouped = parseTechStack(project.tech_stack);
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    className="group bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                transition-all duration-500 min-w-[320px] max-w-[320px]"
                    tabIndex={0}
                  >
                    <a href={project.live_url || project.repo_url || "#"} target="_blank">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={project.image_url || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover 
                      transition-transform duration-700 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t 
                    from-black/60 to-transparent opacity-40 
                    group-hover:opacity-70 transition-opacity"
                        />
                      </div>
                    </a>

                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {expanded.has(project.id)
                          ? project.description
                          : truncate(project.description)}
                      </p>
                      {project.description && project.description.length > 140 && (
                        <button
                          onClick={() => toggleExpanded(project.id)}
                          className="mt-2 text-xs text-pink-300 hover:text-pink-200"
                          type="button"
                        >
                          {expanded.has(project.id) ? "Show less" : "Read more"}
                        </button>
                      )}

                      <div className="my-4 space-y-3">
                        {grouped ? (
                          Object.entries(grouped).map(([group, items]) => (
                            <div key={`${project.id}-${group}`}>
                              <div className="text-xs uppercase tracking-wide text-white/60 mb-2">{group}</div>
                              <div className="flex flex-wrap gap-2">
                                {normalizeItems(items).map((tag) => (
                                  <span
                                    key={`${project.id}-${group}-${tag}`}
                                    className="px-3 py-1 bg-white/90 text-black
                      rounded-full text-xs font-medium shadow-sm"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {(project.tech_stack || "").split(",").filter(Boolean).map((tag) => (
                              <span
                                key={`${project.id}-${tag}`}
                                className="px-3 py-1 bg-white/90 text-black
                      rounded-full text-xs font-medium shadow-sm"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-6">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm font-semibold 
                      hover:text-purple-400 transition-colors"
                          >
                            <ExternalLink size={16} /> Live
                          </a>
                        )}

                        {project.repo_url && (
                          <a
                            href={project.repo_url}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm font-semibold 
                      hover:text-purple-400 transition-colors"
                          >
                            <Github size={16} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}