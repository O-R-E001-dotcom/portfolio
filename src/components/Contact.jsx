import { Mail, MessageSquare, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-[#2a6197]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl text-white font-bold mb-8 text-center">
          Get In Touch
        </h2>
        <p className="text-white text-center mb-12">
          Have a project in mind? Let's collaborate and create something amazing
          together.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-foreground/70 text-sm">
                aboloresanni001@gmail.com
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-4">
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <a
                  href="https://wa.me/2349038503017"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-300 text-black font-semibold shadow-lg hover:bg-blue-400 transition-all hover:shadow-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.52 3.48A11.84 11.84 0 0 0 12 .63a11.92 11.92 0 0 0-10.3 17.9L.17 23.3a1 1 0 0 0 .27 1A1 1 0 0 0 1.8 24l4.94-1.55A12 12 0 1 0 20.52 3.5ZM12 21.5a9.5 9.5 0 1 1 9.5-9.5 9.52 9.52 0 0 1-9.5 9.5Zm5-7.12c-.27-.13-1.63-.8-1.88-.89s-.44-.14-.62.14-.72.89-.88 1.08-.32.2-.6.07a7.76 7.76 0 0 1-3.82-3.35c-.29-.5.29-.46.83-1.54a.53.53 0 0 0 0-.5c-.07-.14-.62-1.48-.85-2-.22-.53-.45-.45-.62-.45h-.53a1 1 0 0 0-.72.34A3 3 0 0 0 6.6 9.3c0 .65.47 1.28.54 1.37s1 1.53 2.42 2.66 2.74 1.74 3.2 1.94a2.85 2.85 0 0 0 1.32.4 2.3 2.3 0 0 0 1.51-.66 1.93 1.93 0 0 0 .43-1.07c.06-.2.06-.37 0-.5s-.24-.14-.5-.27Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <MessageSquare className="text-accent" size={24} />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Message</h3>
              <p className="text-foreground/70 text-sm">Always happy to chat</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card border border-blue-100 rounded-lg p-8 text-white"
        >
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-blue-400 focus:ring-3 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-blue-400 focus:ring-3 transition-colors"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-blue-400 focus:ring-3 transition-colors resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-400 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send size={20} /> Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
