import { useEffect, useState } from "react";
import pic from "../assets/pic.png";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaDownload, FaRegEye } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Hero() {
  const [profile, setProfile] = useState({ profile_image_url: "", cv_url: "" });

  useEffect(() => {
    fetch(`${API_URL}/profile`)
      .then((res) => res.json())
      .then((data) => setProfile(data || {}))
      .catch(() => {});
  }, []);

  const imageSrc = profile?.profile_image_url || pic;
  const cvUrl = profile?.cv_url || "";
  const cvViewUrl = profile?.cv_url ? `${API_URL}/profile/cv/view` : "";
  const cvDownloadUrl = profile?.cv_url ? `${API_URL}/profile/cv/download` : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="min-h-screen relative flex flex-wrap justify-center items-center text-white text-center px-4 bg-gradient-to-b from-[#080011] via-[#1b0035] to-[#080011] overflow-hidden"
    >
      {/* === Background Glows === */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-900/45 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-800/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-fuchsia-800/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* === Image with Floating Effect === */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="relative z-10 px-5 mt-6"
      >
        <img
          src={imageSrc}
          alt="Profile"
          className="w-80 h-90 object-cover rounded-full border-[5px] border-[#351052] hover:border-purple-600 transition duration-300 shadow-[0_0_45px_rgba(88,28,135,0.75)]"
        />
      </motion.div>

      {/* === Content Card (Glassmorphism) === */}
      <div className="relative z-10 max-w-xl backdrop-blur-md bg-[#140622]/85 p-8 rounded-2xl shadow-2xl border border-purple-950/70">
        <h1 className="text-4xl font-bold mb-2">Hello, I’m <span className="text-purple-500">Abolore Sanni</span> </h1>

        <TypeAnimation
          sequence={[
            "AI Developer",
            2000,
            "Full Stack Developer",
            2000,
            "Psychologist",
            2000,
            "Tech Enthusiast",
            2000,
            "Fashion Entrepreneur",
            2000,
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="text-2xl font-semibold text-purple-300 block mb-4"
        />

        <p className="text-lg opacity-90 mb-6">
          I build intelligent software solutions that merge strong backend logic with beautiful, user-friendly design.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 rounded-lg font-semibold border border-white/40
             hover:bg-purple-600 hover:border-purple-700 hover:text-white transition-all duration-300"
          >
            🚀 View My Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-lg font-semibold border border-white/40
            hover:bg-purple-600 hover:border-purple-700 hover:text-white transition-all duration-300"
          >
            📩 Contact Me
          </a>

          {cvUrl ? (
            <>
              <a
                href={cvViewUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                 border border-white/40 hover:bg-purple-600 hover:border-purple-700 hover:text-white transition-all duration-300"
              >
                <FaRegEye />
                View CV
              </a>

              <a
                href={cvDownloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                border border-white/40 hover:bg-purple-600 hover:border-purple-700 hover:text-white transition-all duration-300"
              >
                <FaDownload />
                Download CV
              </a>
            </>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
