
export default function Skills() {
  const skills = {
    Frontend: ['React', 'Tailwind CSS', 'Javascript'],
    Backend: ['FastAPI', 'MySQL', 'Python'],
    AI: ['Gen AI', 'Deep Learning', 'Natural Language Processing'],
    Tools: ['Git', 'Swagger', 'Vercel', 'Figma', 'VS Code'],
  }

  return (
    <section id="skills" className="py-20 px-6 bg-gradient-to-b from-[#1a0033] via-[#2b004d] to-[#130022] text-white">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-purple-700/40 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-indigo-500/40 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-500/30 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-[#391c4d] border border-border/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#640e5dcc] text-foreground text-sm rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
