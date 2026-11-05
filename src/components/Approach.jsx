import { motion as Motion } from "framer-motion";
import { Workflow, Boxes } from "lucide-react";
import { NetworkIcon, LightbulbIcon } from "./icons";

const pillars = [
  {
    icon: <NetworkIcon size={22} />,
    title: "Human-Centered Systems",
    description:
      "A behavioral-science background shapes how I design AI: emotion classification, CBT-informed logic, and agent experiences that understand people rather than just inputs.",
    tags: ["Sentiment analysis", "CBT logic", "Human-centered AI"],
  },
  {
    icon: <Workflow size={22} />,
    title: "Agentic Architecture",
    description:
      "I orchestrate stateful multi-agent workflows with LangGraph, LangChain, and Azure AI Foundry — plus RAG grounding over ChromaDB and Azure AI Search for verifiable answers.",
    tags: ["LangGraph", "RAG", "Azure AI"],
  },
  {
    icon: <Boxes size={22} />,
    title: "Production Delivery",
    description:
      "Prototypes are the start. I containerize services with Docker, gate merges with pytest/Vitest and CI/CD, and ship typed FastAPI and React applications people can rely on.",
    tags: ["FastAPI", "Docker", "CI/CD"],
  },
];

export default function Approach() {
  return (
    <section id="approach" className="section bg-white dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 section-title"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ai-500/10 text-ai-500">
              <LightbulbIcon size={16} />
            </span>
            <p className="text-xs font-bold uppercase tracking-widest text-ai-600 dark:text-ai-400">
              Approach
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
            How I Build
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Three ideas that shape the way I approach AI and software
            engineering.
          </p>
        </Motion.div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card flex flex-col p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                {pillar.icon}
              </div>
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {pillar.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {pillar.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
