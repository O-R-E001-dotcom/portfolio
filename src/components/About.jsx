import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-gradient-to-b from-[#1a0033] via-[#2b004d] to-[#130022] border-2 border-[#480448]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-700/40 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-500/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-500/30 blur-[120px] rounded-full pointer-events-none"></div>
        <h2 className="text-4xl font-bold mb-8 text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              I’m a creative developer who loves solving problems — from
              designing APIs with FastAPI and MySQL to crafting smooth, modern
              interfaces with React and Tailwind CSS. I enjoy learning,
              building, and bringing ideas to life through code.
            </p>
            <p>
              My expertise spans modern frontend frameworks, backend
              development, and everything in between. I believe in clean code,
              thoughtful design, and building products that users love.
            </p>
            <p>
              When I'm not coding, you can find me exploring new design trends,
              contributing to open-source projects, or enjoying the great
              outdoors.
            </p>
          </div>
          <div className="bg-[#2b1b42] rounded-lg p-8 border-2 border-[#461443] shadow-lg text-white">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-200">Skills</h3>
                <p className="text-sm text-white">
                  React, Tailwind, FastAPI, Python, MySQL, JavaScript and more
                </p>
              </div>
              {/* <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-sm text-foreground/70">4+ months in web development and design</p>
              </div> */}
              <div>
                <h3 className="font-semibold mb-2 text-blue-200">Location</h3>
                <p className="text-sm text-foreground/70">
                  Available for remote work worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
