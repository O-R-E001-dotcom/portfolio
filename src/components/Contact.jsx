import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const LIMITS = {
  name: 120,
  email: 254,
  subject: 200,
  message: 5000,
};

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name)
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email)
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";

  if (subject.length > LIMITS.subject)
    errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;

  if (!message) errors.message = "Please enter a message.";
  else if (message.length < 10)
    errors.message = "Please add a little more detail (at least 10 characters).";
  else if (message.length > LIMITS.message)
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return errors;
}

function serverMessage(data) {
  const detail = data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => (typeof item?.msg === "string" ? item.msg : ""))
      .filter(Boolean);
    if (messages.length) return messages.join(" ");
  }
  return "Could not send your message. Please try again.";
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="text-xs font-medium text-red-600 dark:text-red-400">
      {message}
    </p>
  );
}

const contactInfo = [
  {
    icon: <Mail size={22} className="text-brand-500" />,
    title: "Email",
    value: "aboloresanni001@gmail.com",
    href: "mailto:aboloresanni001@gmail.com",
    external: false,
  },
  {
    icon: <MessageCircle size={22} className="text-emerald-500" />,
    title: "WhatsApp",
    value: "+234 903 850 3017",
    href: "https://wa.me/2349038503017",
    external: true,
  },
  {
    icon: <MapPin size={22} className="text-blue-500" />,
    title: "Location",
    value: "Lagos, Nigeria · Remote-friendly",
    href: null,
    external: false,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      if (response.ok) {
        toast.success("Message sent. I'll get back to you within 24-48 hours.");
        setFormData(EMPTY_FORM);
        setErrors({});
      } else {
        const data = await response.json().catch(() => ({}));
        toast.error(serverMessage(data));
      }
    } catch {
      toast.error(
        "Could not reach the server. Please try again, or email aboloresanni001@gmail.com."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (hasError) =>
    `w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-brand/20 dark:bg-slate-800 dark:text-white ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-border focus:border-brand"
    }`;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        <div className="section-title mb-16 text-center">
          <h2
            id="contact-heading"
            className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            Get In Touch
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Have a project in mind? Whether you need an AI agent, a full-stack
            application, or just want to connect, I'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-4">
            <div className="space-y-5">
              {contactInfo.map((info) => (
                <div key={info.title} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-900 dark:text-white">
                      {info.title}
                    </h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        {...(info.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-slate-600 transition-colors hover:text-brand dark:text-slate-400"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-400">
                        {info.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-slate-50 p-6 dark:bg-slate-900">
              <h3 className="mb-4 font-bold text-slate-900 dark:text-white">
                Let's build something
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                I typically respond within 24-48 hours. Share your project
                details, timeline, and any questions you have.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://github.com/O-R-E001-dotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="GitHub profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abolore-sanni-68078b292"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:aboloresanni001@gmail.com"
                  className="btn-icon"
                  aria-label="Send an email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="card p-8 shadow-xl lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      autoComplete="name"
                      maxLength={LIMITS.name}
                      required
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                      className={inputClass(Boolean(errors.name))}
                    />
                    <FieldError id="contact-name-error" message={errors.name} />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={LIMITS.email}
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                      className={inputClass(Boolean(errors.email))}
                    />
                    <FieldError id="contact-email-error" message={errors.email} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Subject <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry / Collaboration"
                    maxLength={LIMITS.subject}
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    className={inputClass(Boolean(errors.subject))}
                  />
                  <FieldError id="contact-subject-error" message={errors.subject} />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, the problem you're solving, and your timeline..."
                    rows="6"
                    maxLength={LIMITS.message}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass(Boolean(errors.message))} resize-none`}
                  />
                  <FieldError id="contact-message-error" message={errors.message} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Send size={18} className="mr-2" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
