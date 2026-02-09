import pic from "../assets/pic.png";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaDownload, FaRegEye } from "react-icons/fa";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="min-h-screen relative flex flex-wrap justify-center items-center text-white text-center px-4 bg-gradient-to-b from-[#1a0033] via-[#2b004d] to-[#130022] overflow-hidden"
    >
      {/* === Background Glows === */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-500/40 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-400/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-400/30 blur-[120px] rounded-full pointer-events-none"></div>

      {/* === Image with Floating Effect === */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="relative z-10 px-5 mt-6"
      >
        <img
          src={pic}
          alt="Profile"
          className="w-80 h-90 object-cover rounded-full border-[5px] border-transparent hover:border-purple-500 transition duration-300 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
        />
      </motion.div>

      {/* === Content Card (Glassmorphism) === */}
      <div className="relative z-10 max-w-xl backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-lg border border-white/20">
        <h1 className="text-4xl font-bold mb-2">Hello, I’m <span className="text-purple-400">Abolore Sanni</span> </h1>

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
             hover:bg-purple-500 hover:border-purple-500 hover:text-white transition-all duration-300"
          >
            🚀 View My Projects
          </a>

          <a
            href="#contact"
            className="px-6 py-3 rounded-lg font-semibold border border-white/40
            hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-300"
          >
            📩 Contact Me
          </a>

          <a
            href="https://portfolio-eta-flax-91.vercel.app/Abolore_Sanni's_CV.pdf"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
             border border-white/40 hover:bg-green-500 hover:border-green-500 hover:text-white transition-all duration-300"
          >
            <FaRegEye />
            View CV
          </a>

          <a
            href="/Abolore_Sanni's_CV.pdf"
            download
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
            border border-white/40 hover:bg-yellow-500 hover:border-yellow-500 hover:text-white transition-all duration-300"
          >
            <FaDownload />
            Download CV
          </a>
        </div>
      </div>
    </motion.div>
  );
}
