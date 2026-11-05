import { motion as Motion } from "framer-motion";
import { GraduationCap, BadgeCheck, Languages, Code2 } from "lucide-react";
import { NetworkIcon, ServerIcon } from "./icons";

const education = [
  {
    degree: "B.Sc. Psychology",
    school: "Lead City University, Ibadan, Nigeria",
    period: "2019 – 2023",
    note: "Behavioral-science foundation applied to human-centered AI and agent design.",
  },
];

const certifications = [
  {
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    detail: "Azure AI services, responsible AI, and cloud AI workloads.",
    status: "Oct 2026",
  },
  {
    title: "Generative AI Fellowship — AI Developer Track",
    issuer: "Certificate of Completion",
    detail: "Applied generative AI and agent engineering.",
    status: "Completed",
  },
  {
    title: "Mastercard Foundation Associate Programme",
    issuer: "Jobberman Nigeria · Prep2Soar",
    detail:
      "Emotional intelligence, communication, problem-solving, digital safety, and professional effectiveness.",
    status: "Certificate of Achievement",
  },
];

const competencyGroups = [
  {
    icon: <NetworkIcon size={18} />,
    title: "AI & Agent Engineering",
    items: [
      "LangGraph & LangChain",
      "Azure AI Foundry & Copilot Studio",
      "RAG (ChromaDB, Azure AI Search)",
      "MCP, A2A & prompt engineering",
    ],
  },
  {
    icon: <ServerIcon size={18} />,
    title: "Backend & Data",
    items: [
      "FastAPI & REST API design",
      "PostgreSQL, MySQL & Supabase",
      "SQLAlchemy & Alembic",
      "JWT, RBAC & signed webhooks",
    ],
  },
  {
    icon: <Code2 size={18} />,
    title: "Frontend & Delivery",
    items: [
      "React, TypeScript & Vite",
      "Tailwind CSS & Zustand",
      "Docker & GitHub Actions",
      "Microsoft Azure & AWS S3",
    ],
  },
];

const highlights = [
  { value: "10,000+", label: "Data points annotated", sub: "at 98% accuracy" },
  { value: "6", label: "Flagship case studies", sub: "agents, RAG & full-stack" },
  { value: "3", label: "Certifications", sub: "Azure AI, Gen AI, Mastercard" },
];

export default function Credentials() {
  return (
    <section id="credentials" className="section bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 section-title">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-slate-900 dark:text-white">
            Education & Credentials
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            A behavioral-science foundation applied to production AI
            engineering.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-14">
          {highlights.map((h) => (
            <div key={h.label} className="card p-5 text-center">
              <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400">
                {h.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {h.label}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                {h.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <GraduationCap size={22} className="text-brand-500" /> Education
            </h3>
            {education.map((item) => (
              <div key={item.degree}>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {item.degree}
                </div>
                <div className="text-sm font-medium text-brand-600 dark:text-brand-400">
                  {item.school}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                  {item.period}
                </div>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.note}
                </p>
              </div>
            ))}
          </Motion.div>

          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
              <BadgeCheck size={22} className="text-ai-500" /> Certifications
            </h3>
            <ul className="space-y-5">
              {certifications.map((cert) => (
                <li key={cert.title} className="border-l-2 border-brand-500/40 pl-4">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {cert.title}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {cert.issuer} · {cert.status}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {cert.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {competencyGroups.map((group) => (
            <div key={group.title} className="card p-6">
              <div className="mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  {group.icon}
                </span>
                <h3 className="text-sm font-bold">{group.title}</h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <Languages size={16} /> Native English and Yoruba
        </div>
      </div>
    </section>
  );
}
