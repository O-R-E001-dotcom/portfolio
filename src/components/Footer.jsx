
import { Github, Linkedin, Mail, MessageCircle, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-black bg-[#ECF0F1] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Portfolio</h4>
            <p className="text-foreground/70 text-sm">Crafting digital experiences with design and code.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-foreground/70 hover:text-foreground transition-colors">About</a></li>
              <li><a href="#projects" className="text-foreground/70 hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#skills" className="text-foreground/70 hover:text-foreground transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="https://github.com/O-R-E001-dotcom" className="text-foreground/70 hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="www.linkedin.com/in/abolore-sanni-68078b292" className="text-foreground/70 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:aboloresanni001@gmail.com" className="text-foreground/70 hover:text-primary transition-colors">
                <Mail size={20} />
              </a>

              {/* WhatsApp */}
          <a
            href="https://wa.me/2349038503017" className="text-foreground/70 hover:text-primary transition-colors"
          >
            <MessageCircle className="mx-auto mb-3 text-green-500" size={20} />
          
          </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1">Privacy <ExternalLink size={14} /></a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors flex items-center gap-1">Terms <ExternalLink size={14} /></a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8">
          <p className="text-center text-foreground/60 text-sm">
            © {currentYear} Abolore Sanni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
