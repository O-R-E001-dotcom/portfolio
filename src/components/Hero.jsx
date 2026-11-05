import { useEffect, useState } from "react";
import pic from "../assets/pic.webp";
import { motion as Motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaDownload, FaRegEye, FaCode } from "react-icons/fa";
import { LayersIcon } from "./icons";
import { readCache, writeCache } from "../utils/apiCache";
import { fetchJsonWithRetry } from "../utils/api";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Hero() {
  const [profile, setProfile] = useState(
    () => readCache("profile") || { profile_image_url: "", cv_url: "" }
  );

  useEffect(() => {
    let alive = true;
    fetchJsonWithRetry(`${API_URL}/profile`)
      .then((data) => {
        if (!alive) return;
        setProfile(data || {});
        writeCache("profile", data || {});
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const imageSrc = profile?.profile_image_url || pic;
  const cvDownloadUrl = profile?.cv_url
    ? `${API_URL}/profile/cv/download`
    : "/cv.pdf";
  const cvViewUrl = profile?.cv_url
    ? `${API_URL}/profile/cv/view`
    : "/cv.pdf";

  const roleItems = [
    "AI/Agent Engineer",
    "Full-Stack Developer",
    "LangGraph & RAG Builder",
    "Azure AI Engineer",
  ];

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center items-center text-center px-4 pt-28 pb-20 bg-gradient-to-b from-[#080011] via-[#1b0035] to-[#080011] overflow-hidden"
    >
      {/* === Background Mesh Gradients === */}
      <div className="absolute inset-0 z-0 bg-gradient-mesh pointer-events-none"></div>
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/30 blur-[180px] rounded-full pointer-events-none animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-900/25 blur-[160px] rounded-full pointer-events-none animate-blob" style={{ animationDelay: "-2s" }}></div>
      <div className="absolute top-40 right-10 w-[400px] h-[400px] bg-pink-900/20 blur-[140px] rounded-full pointer-events-none animate-blob" style={{ animationDelay: "-4s" }}></div>

      {/* === Floating Decorative Elements (desktop only) === */}
      <div className="absolute top-1/4 left-8 hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 animate-pulse md:flex">
        <FaCode size={24} className="text-purple-400" />
      </div>
      <div className="absolute top-1/3 right-8 hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 animate-pulse md:flex" style={{ animationDelay: "1s" }}>
        <LayersIcon size={22} className="text-blue-400" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-2">
        {/* === Profile Image === */}
        <Motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-block"
        >
          <img
            src={imageSrc}
            alt="Portrait of Abolore Sanni"
            width="224"
            height="224"
            className="h-40 w-40 rounded-full border-4 border-[#351052] object-cover shadow-[0_0_50px_rgba(168,85,247,0.4)] transition-all duration-500 hover:border-purple-500 md:h-56 md:w-56"
          />
        </Motion.div>

        <div className="mt-12 sm:mt-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-tight break-words bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-blue-300">
            Hello, I’m <span className="text-purple-400">Abolore Sanni</span>
          </h1>

          <TypeAnimation
            sequence={[
              roleItems[0],
              2000,
              roleItems[1],
              2000,
              roleItems[2],
              2000,
              roleItems[3],
              2000,
            ]}
            wrapper="span"
            speed={45}
            repeat={Infinity}
            className="text-lg md:text-2xl font-semibold text-slate-300 block mb-6 min-h-[1.75rem]"
          />

          <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-10 max-w-lg w-full mx-auto leading-relaxed px-2">
            I build intelligent, production-ready software — combining AI
            agents, full-stack engineering, and a psychology-informed approach
            to human-centered design.
          </p>

          {/* === Action Buttons === */}
          <div className="mx-auto flex w-full max-w-lg flex-col justify-center gap-3 sm:max-w-3xl sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#projects"
              className="btn btn-primary group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work <span aria-hidden="true">▸</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>

            <a
              href={cvViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline !border-white/25 !text-white group hover:!border-white/40 hover:!bg-white/10"
            >
              <FaRegEye size={18} className="mr-2" />
              View CV
            </a>

            <a
              href={cvDownloadUrl}
              download
              className="btn btn-outline !border-white/25 !text-white group hover:!border-white/40 hover:!bg-white/10"
            >
              <FaDownload size={18} className="mr-2" />
              Download CV
            </a>

            <a href="#contact" className="btn btn-outline !border-white/25 !text-white group hover:!border-white/40 hover:!bg-white/10">
              <span className="relative z-10 flex items-center gap-2">
                Get In Touch <span aria-hidden="true">▸</span>
              </span>
            </a>
          </div>

          {/* === Quick Facts === */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-6 opacity-80">
            <div className="text-center">
              <div className="text-lg font-bold text-white">AI Agents</div>
              <div className="text-xs text-slate-400">LangGraph · RAG</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Full-Stack</div>
              <div className="text-xs text-slate-400">FastAPI · React</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Psychology</div>
              <div className="text-xs text-slate-400">B.Sc. · Lead City</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Lagos, NG</div>
              <div className="text-xs text-slate-400">Open to remote</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
