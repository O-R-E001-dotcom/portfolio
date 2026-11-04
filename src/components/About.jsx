import { motion as Motion } from "framer-motion";
import { Briefcase, Code2 } from "lucide-react";
import { NetworkIcon, UserRoundIcon } from "./icons";

const experience = [
  {
    period: "2026 – Present",
    role: "AI/Full-Stack Developer (Contract)",
    company: "Talyn — AI Learning Engagement Platform",
    points: [
      "Built Talyn end-to-end across a three-service platform: FastAPI backend, React + TypeScript frontend, and a Claude-powered AI coach.",
      "Designed 15 API route modules with JWT access/refresh rotation, RBAC, an immutable audit log, and Google ID-token sign-in.",
      "Engineered a 17-endpoint AI coach grounded in a live LearnerContext (XP, streaks, quizzes, missions, progress).",
      "Set up CI/CD on GitHub Actions with real PostgreSQL, pytest/Vitest suites, Docker builds, and API docs checks.",
      "Integrated Paystack payments with HMAC-SHA512 signed webhooks and S3 presigned uploads.",
    ],
  },
  {
    period: "Jun 2026 – Aug 2026",
    role: "AI/Agent Engineer",
    company: "Reliance Infosystems",
    points: [
      "Designed and orchestrated agents with Microsoft Foundry Agent Service and Copilot Studio extensibility.",
      "Built RAG and content-grounding pipelines for accurate, context-aware responses from verified knowledge bases.",
      "Established agent identity and end-to-end observability with Entra Agent ID and Agent 365.",
      "Applied Git, automated testing, and GitHub Actions CI/CD to meet security and responsible-AI governance standards.",
    ],
  },
  {
    period: "Aug 2025 – May 2026",
    role: "AI Developer Intern",
    company: "Publica AI",
    points: [
      "Architected full-stack AI applications with FastAPI, React, and Supabase, containerized with Docker Compose.",
      "Built emotion-detection pipelines fusing local Hugging Face models with Gemini and OpenAI.",
      "Designed stateful multi-agent document-processing systems with LangGraph.",
    ],
  },
  {
    period: "Nov 2025 – Jan 2026",
    role: "Data Annotator",
    company: "Awarri",
    points: [
      "Annotated text, image, and audio datasets for large-scale ML training.",
      "Maintained 98% accuracy across 10,000+ labeled data points for Computer Vision and NLP.",
    ],
  },
];

const highlights = [
  {
    icon: <NetworkIcon size={20} className="text-ai-500" />,
    title: "AI & Agents",
    desc: "LangGraph, LangChain, Azure AI Foundry, MCP/A2A, and RAG over ChromaDB and Azure AI Search.",
  },
  {
    icon: <Code2 size={20} className="text-brand-500" />,
    title: "Full-Stack",
    desc: "FastAPI, PostgreSQL, React + TypeScript, Docker, and GitHub Actions CI/CD.",
  },
  {
    icon: <UserRoundIcon size={20} className="text-pink-500" />,
    title: "Psychology",
    desc: "A B.Sc. in Psychology underpins human-centered agent design and CBT-informed AI.",
  },
];

const principles = [
  { label: "Clean Code", desc: "Readable, typed, tested" },
  { label: "Production-First", desc: "Docker, CI/CD, observability" },
  { label: "User-First", desc: "Accessible, performant UI" },
  { label: "Ship & Iterate", desc: "Deploy, measure, improve" },
];

export default function About() {
  return (
    <section id="about" className="section relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-purple-900/20 blur-[160px]"></div>
      <div className="pointer-events-none absolute bottom-20 right-10 h-[400px] w-[400px] rounded-full bg-indigo-900/20 blur-[140px]"></div>

      <Motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        <div className="section-title mb-14 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            AI/Agent Engineer and full-stack developer designing, building, and
            operating production AI systems.
          </p>
        </div>

        <div className="mb-14 grid gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div className="card p-8 shadow-lg">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="badge badge-ai">AI &amp; Agents</span>
                <span className="badge badge-brand">Full-Stack</span>
                <span className="badge badge-brand">Azure AI</span>
              </div>
              <p className="mb-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                I build multi-agent orchestration with LangGraph, LangChain, and
                the Microsoft Azure AI ecosystem, plus retrieval-augmented
                generation pipelines over ChromaDB and Azure AI Search. On the
                product side I ship FastAPI microservices, PostgreSQL, React and
                TypeScript frontends, and Docker-based delivery.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                A B.Sc. in Psychology underpins my human-centered agent design. I
                care about systems that are secure, observable, and genuinely
                useful — with CI/CD, automated tests, and clear documentation. I
                am based in Lagos, Nigeria and open to remote opportunities.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((item, i) => (
                <Motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="card p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    {item.icon}
                  </div>
                  <div className="mb-1 text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </div>
                  <div className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </div>
                </Motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <div className="card p-8 shadow-lg">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
                  <Briefcase size={20} className="text-brand-500" /> Experience
                </h3>
                <div className="relative space-y-7 pl-7">
                  <div className="absolute bottom-0 left-0 top-2 w-px bg-border"></div>
                  {experience.map((item) => (
                    <div key={`${item.role}-${item.period}`} className="relative">
                      <div className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full border-2 border-brand-500 bg-background"></div>
                      <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        {item.period}
                      </span>
                      <div className="text-base font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </div>
                      <div className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                        {item.company}
                      </div>
                      <ul className="space-y-1">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400"
                          >
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="divider"></div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-2xl font-bold">How I Work</h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                I start with the problem, not the framework. I choose tools that
                fit the job — FastAPI for the backend, React for the interface,
                and LLMs where intelligence genuinely helps. Then I ship,
                measure, and refine.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {principles.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-border bg-slate-50 p-4 dark:bg-slate-800/50"
                >
                  <div className="mb-1 text-xs font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
                    {item.label}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code card instead of a stock photo */}
          <div className="relative hidden md:block">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl"></div>
            <div className="relative z-10 overflow-hidden rounded-3xl border border-border bg-slate-950 shadow-xl">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80"></span>
                <span className="ml-2 font-mono text-[11px] text-slate-400">
                  agent.py
                </span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-[12.5px] leading-relaxed text-slate-300">
                <code>
{`from langgraph.graph import StateGraph

graph = StateGraph(AgentState)
graph.add_node("retrieve", retrieve_context)
graph.add_node("reason", reason)
graph.add_node("answer", compose_answer)

graph.set_entry_point("retrieve")`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </Motion.div>
    </section>
  );
}
