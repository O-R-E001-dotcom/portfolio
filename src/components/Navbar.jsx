import ThemeToggle from "./ThemeToggle";

import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-extrabold text-naija-green tracking-wide">Abolore Sanni</a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-700 dark:text-gray-300 font-medium">
          <li><a href="#about" className="hover:text-naija-green transition">About</a></li>
          <li><a href="#projects" className="hover:text-naija-green transition">Projects</a></li>
          <li><a href="#skills" className="hover:text-naija-green transition">Skills</a></li>
      
          <li><a href="#contact" className="hover:text-naija-green transition">Contact</a></li>
        </ul>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => document.documentElement.classList.toggle("dark")}
          className=" dark:bg-gray-900 dark:text-white "
        >
          <ThemeToggle />
        </button> 
        
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
        
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-300 dark:border-gray-700 animate-fadeIn">
          <ul className="flex flex-col gap-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
            <li><a href="#projects" onClick={() => setOpen(false)}>Projects</a></li>
            <li><a href="#skills" onClick={() => setOpen(false)}>Skills</a></li>
            <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
            <li>
              <button
                onClick={() => document.documentElement.classList.toggle("dark")}
                className="mt-2 px-4 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Toggle Theme
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
