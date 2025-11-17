import { ExternalLink, Github } from "lucide-react";
import p from "./p.png"; 
import profile from "./profile.png";
import newscard from "./newscard.png";

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
      tags: ["React", "Tailwind", ""],
      image: newscard,
      live: "https://tailwind-css-five-livid.vercel.app/",
      code: "https://github.com/O-R-E001-dotcom/Tailwind_CSS/tree/master/Day_1/Task3",
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-[#336ca9] text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Featured Projects
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 
              rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl 
              transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Section */}
              <a href={project.live} target="_blank" rel="noreferrer">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover 
                    transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t 
                  from-black/50 to-transparent opacity-40 
                  group-hover:opacity-60 transition-opacity" />
                </div>
              </a>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-800 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-800 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white text-blue-600 
                      rounded-full text-xs font-medium border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* BUTTONS */}
                <div className="flex items-center gap-6">
                  <a
                    href={project.live}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-semibold 
                    text-blue-700 hover:text-white transition-colors"
                  >
                    <ExternalLink size={16} /> View Live
                  </a>

                  <a
                    href={project.code}
                    target="_blank"
                    className="inline-flex items-center gap-2 text-sm font-semibold 
                    text-gray-700 hover:text-white transition-colors"
                  >
                    <Github size={16} /> Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
