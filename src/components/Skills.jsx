import { useEffect, useMemo, useState } from 'react';
import {
  FaPython,
  FaReact,
  FaDocker,
  FaDatabase,
  FaBrain,
  FaNodeJs,
  FaFigma,
  FaGitAlt,
  FaAws,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
} from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const iconMap = {
  python: FaPython,
  react: FaReact,
  docker: FaDocker,
  database: FaDatabase,
  ai: FaBrain,
  node: FaNodeJs,
  figma: FaFigma,
  git: FaGitAlt,
  aws: FaAws,
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: FaJsSquare,
};

export default function Skills() {
  const categoryOrder = ['Frontend', 'Backend', 'AI', 'Tools'];
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/skills?page=1&page_size=100`)
      .then((res) => res.json())
      .then((data) => setSkills(data.items || []))
      .catch(() => setSkills([]));
  }, []);

  const grouped = useMemo(() => {
    const map = skills.reduce((acc, s) => {
      acc[s.category] = acc[s.category] || [];
      acc[s.category].push(s);
      return acc;
    }, {});

    const ordered = {};
    categoryOrder.forEach((cat) => {
      if (map[cat]) ordered[cat] = map[cat];
    });
    Object.keys(map).forEach((cat) => {
      if (!ordered[cat]) ordered[cat] = map[cat];
    });

    return ordered;
  }, [skills]);

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-[#1a0033] via-[#2b004d] to-[#130022] text-white">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-700/40 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-500/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-500/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="bg-[#391c4d] border border-border/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
              <div className="flex flex-col gap-3">
                {items.map((skill) => {
                  const Icon = skill.icon_name ? iconMap[skill.icon_name.toLowerCase()] : null;
                  return (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between gap-3 bg-[#640e5dcc] px-3 py-2 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-lg text-white/90">
                          {Icon ? <Icon /> : <span className="text-white/60">•</span>}
                        </div>
                        <span className="text-foreground text-sm">{skill.name}</span>
                      </div>
                      <span className="text-xs text-white/70">{skill.proficiency_level}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}