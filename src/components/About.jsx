
import { motion } from "framer-motion";


export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-[#3978b7] border-2 border-blue-400">
      <motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }} className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-white">About Me</h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-white leading-relaxed">
            <p>
               I’m a creative developer who loves solving problems — from designing APIs with FastAPI and MySQL to crafting smooth, modern interfaces with React and Tailwind CSS. 
        I enjoy learning, building, and bringing ideas to life through code.
            </p>
            <p>
              My expertise spans modern frontend frameworks, backend development, and everything in between. I believe in clean code, thoughtful design, and building products that users love.
            </p>
            <p>
              When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying the great outdoors.
            </p>
          </div>
          <div className="bg-[#0e355b] rounded-lg p-8 border-2 border-blue-300 shadow-lg text-white">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-blue-200">Skills</h3>
                <p className="text-sm text-white">React, Tailwind, FastAPI, Python, MySQL, JavaScript and more</p>
              </div>
              {/* <div>
                <h3 className="font-semibold mb-2">Experience</h3>
                <p className="text-sm text-foreground/70">4+ months in web development and design</p>
              </div> */}
              <div>
                <h3 className="font-semibold mb-2 text-blue-200">Location</h3>
                <p className="text-sm text-foreground/70">Available for remote work worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
