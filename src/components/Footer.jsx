import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#credentials", label: "Credentials" },
  { href: "/#approach", label: "Approach" },
  { href: "/#contact", label: "Contact" },
];

const socials = [
  {
    href: "https://github.com/O-R-E001-dotcom",
    label: "GitHub",
    icon: <Github size={18} />,
  },
  {
    href: "https://www.linkedin.com/in/abolore-sanni-68078b292",
    label: "LinkedIn",
    icon: <Linkedin size={18} />,
  },
  {
    href: "mailto:aboloresanni001@gmail.com",
    label: "Email",
    icon: <Mail size={18} />,
  },
  {
    href: "https://wa.me/2349038503017",
    label: "WhatsApp",
    icon: <MessageCircle size={18} />,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-12 gap-10 mb-12">
          <div className="md:col-span-5">
            <a
              href="/#home"
              className="text-2xl font-extrabold bg-gradient-to-r from-brand-400 to-ai-400 bg-clip-text text-transparent"
            >
              Abolore Sanni
            </a>
            <p className="mt-4 text-sm leading-relaxed max-w-sm">
              AI agent developer and full-stack engineer building intelligent,
              production-ready software. Open to remote opportunities worldwide.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-500/10 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="mailto:aboloresanni001@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  aboloresanni001@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2349038503017"
                  className="hover:text-white transition-colors"
                >
                  +234 903 850 3017
                </a>
              </li>
              <li className="text-slate-500">Lagos, Nigeria · Remote-friendly</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} Abolore Sanni. All rights reserved.
          </p>
          <p className="text-sm text-slate-500">
            Designed and built end to end with React, FastAPI, and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
