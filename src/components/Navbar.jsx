import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDarkMode } from './hooks/useDarkMode';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { darkMode, toggle } = useDarkMode();  // Correct destructuring, no args

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Abolore Sanni
        </a>

        <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300 font-medium">
          <li><a href="#about" className="hover:text-purple-500 transition">About</a></li>
          <li><a href="#projects" className="hover:text-purple-500 transition">Projects</a></li>
          <li><a href="#skills" className="hover:text-purple-500 transition">Skills</a></li>
          <li><a href="#contact" className="hover:text-purple-500 transition">Contact</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button
            onClick={toggle}  // Use the toggle from the hook
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700"
          >
            <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
              <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
              <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
              <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
              <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}