import pic2 from "../assets/pic2.jpg";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }} className="min-h-screen max-sm:flex-wrap flex justify-center items-center bg-[#2C3E50] text-white text-center px-1">
      <div className="relative px-5 mt-6">
        <img
          src={pic2}
          alt="Profile"
          className="w-80 h-90 object-cover bg-gray-50 rounded-full border-4 border-white"
        />
      </div>
      <div>
        <h1 className="text-5xl font-bold mb-4">Hi, I’m Abolore Sanni</h1>
      <p className="max-w-xl text-lg mb-6">
        I’m an AI Developer passionate about blending beautiful UI with solid
        backend logic.
      </p>
      <div className="flex gap-4 mx-auto justify-center ">
        <a
        href="#projects"
        className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-white hover:text-blue-700 transition-colors"
      >
        View My Projects
      </a>

      <a
        href="#contact"
        className="bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:bg-white hover:text-blue-700 transition-colors"
      >
        Contact Me
      </a>

      <a
            href="/Abolore_Sanni's_CV.pdf"
            download
            className="flex items-center gap-2 bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:text-blue-700 transition"
          >
            <FaDownload />
            Download CV
          </a>

      </div>
      </div>
    </motion.div>
  );
}

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="min-h-screen flex items-center px-6 md:px-20 pt-28 md:pt-0"
//     >
//       <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
//         {/* LEFT SIDE */}
//         <div>
//           <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
//             Hi, I'm <span className="text-primary">Abolore Sanni</span>
//           </h1>

//           <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
//             Fullstack Developer (React + FastAPI)
//           </h2>

//           <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md leading-relaxed">
//             I build modern, fast and scalable digital experiences using 
//             <span className="text-primary font-semibold"> React, Tailwind, Python, FastAPI & MySQL.</span>
//             Constantly learning, constantly leveling up.
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex gap-4">
//             <a
//               href="#projects"
//               className="px-6 py-3 bg-primary text-blue-500 rounded-lg shadow hover:bg-primary/90 transition"
//             >
//               View Projects
//             </a>

//             <a
//               href="#contact"
//               className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
//             >
//               Hire Me
//             </a>
//           </div>
//         </div>

//         {/* RIGHT SIDE – IMAGE */}
//         <div className="flex justify-center">
//           <div className="w-60 h-60 rounded-full overflow-hidden shadow-xl ring-4 ring-primary/20">
//             <img
//               src= {pic2} // <-- replace with your image
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
