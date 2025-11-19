import { ExternalLink, Github } from "lucide-react";
import p from "./p.png";
import profile from "./profile.png";
import newscard from "./newscard.png";
import { motion } from "framer-motion";

export default function Projects() {
  const projects = [
    {
      title: "Profile Card",
      description: "A profile card built with React and Tailwind.",
      tags: ["React", "Tailwind"],
      image: profile,
      live: "https://tailwind-css-z1fa.vercel.app/",
      code: "https://github.com/O-R-E001-dotcom/Tailwind_CSS/tree/master/Day_1/Task1",
    },
    {
      title: "Expense Tracker",
      description: "Fullstack app with FastAPI backend and React frontend.",
      tags: ["React", "FastAPI", "MySQL", "API"],
      image: "/social-dashboard.jpg",
      live: "https://example.com",
      code: "https://github.com/yourusername/expense-tracker",
    },
    {
      title: "E-Commerce Website",
      description: "An E-Commerce app built with React.",
      tags: ["React", "Tailwind"],
      image: p,
      live: "https://react-nine-orcin.vercel.app/",
      code: "https://github.com/O-R-E001-dotcom/React/tree/master/day_2/exercise_2",
    },
    {
      title: "NewsCards",
      description:
        "NewsCards design featuring entertainment, sports, news articles using React and Tailwind CSS.",
      tags: ["React", "Tailwind"],
      image: newscard,
      live: "https://tailwind-css-five-livid.vercel.app/",
      code: "https://github.com/O-R-E001-dotcom/Tailwind_CSS/tree/master/Day_1/Task3",
    },
  ];

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
      {/* 🔮 Animated Background ORBS */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-700/30 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-fuchsia-500/20 blur-3xl rounded-full animate-ping" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-16 text-center tracking-wide"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-500">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ duration: 0.5 }}
              className="group bg-white/10 backdrop-blur-xl border border-white/20 
                rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
                transition-all duration-500"
            >
              <a href={project.live} target="_blank">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
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

              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/90 text-black
                      rounded-full text-xs font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  <a
                    href={project.live}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-semibold 
                      hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink size={16} /> Live
                  </a>

                  <a
                    href={project.code}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-semibold 
                      hover:text-purple-400 transition-colors"
                  >
                    <Github  size={16} /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
