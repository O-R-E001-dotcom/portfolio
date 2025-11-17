
export default function Skills() {
  const skills = {
    Frontend: ['React', 'Tailwind CSS', 'Javascript'],
    Backend: ['FastAPI', 'MySQL', 'Python'],
    AI: ['Gen AI', 'Deep Learning', 'Natural Language Processing'],
    Tools: ['Git', 'Swagger', 'Vercel', 'Figma', 'VS Code'],
  }

  return (
    <section id="skills" className="py-20 px-6 bg-[#1e2a37]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">Skills & Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-[#304356] border border-border/50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4 text-primary">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-300 text-foreground text-sm rounded-lg"
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
