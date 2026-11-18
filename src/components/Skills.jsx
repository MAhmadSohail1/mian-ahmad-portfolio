import { motion } from 'framer-motion'

const skillCategories = [
  {
    name: 'Frontend',
    accentBar: 'from-blue-500 to-cyan-400',
    description: 'Building modern, responsive, and accessible user interfaces',
    skills: [
      {
        name: 'HTML5',
        role: 'Semantic Markup',
        icon: (
          <svg className="w-5 h-5 text-[#E34F26]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.66H5.406l.707 8.047h8.895l-.332 3.653-2.699.734-2.689-.733-.172-1.933H6.463l.344 4.095 5.17 1.433 5.187-1.433.703-7.859H8.531z" />
          </svg>
        ),
      },
      {
        name: 'CSS3',
        role: 'Responsive Styling',
        icon: (
          <svg className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.236-2.66H5.406l.707 8.047h8.895l-.332 3.653-2.699.734-2.689-.733-.172-1.933H6.463l.344 4.095 5.17 1.433 5.187-1.433.703-7.859H8.531z" />
          </svg>
        ),
      },
      {
        name: 'JavaScript',
        role: 'ES6+ & Logic',
        icon: (
          <svg className="w-5 h-5 text-[#F7DF1E]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.017-.892-1.748-2.138-2.222l-.715-.277c-.503-.195-.832-.423-.832-.777 0-.39.31-.662.83-.662.53 0 .86.234 1.047.662l1.642-1.029c-.477-.966-1.378-1.464-2.689-1.464-1.722 0-2.887 1.016-2.887 2.531 0 1.503 1.016 2.197 2.373 2.709l.647.246c.64.246.906.516.906.918 0 .47-.468.756-1.156.756-.84 0-1.282-.422-1.547-1.031l-1.688.984c.484 1.156 1.531 1.844 3.235 1.844 1.953 0 3.109-1.016 3.109-2.589l-.127-.1zm-9.332 2.324v-8.24h-2.062v8.11c0 1.25-.688 1.703-1.688 1.703-.39 0-.843-.094-1.125-.219l-.359 1.672c.422.188 1.062.297 1.844.297 2.062 0 3.39-1.094 3.39-3.323v.001z" />
          </svg>
        ),
      },
      {
        name: 'React.js',
        role: 'Component UI',
        icon: (
          <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 9.25a2.75 2.75 0 100 5.5 2.75 2.75 0 000-5.5zm0-7.25c-4.418 0-8 2.015-8 4.5 0 .908.477 1.751 1.298 2.443C4.477 9.635 4 10.773 4 12c0 1.227.477 2.365 1.298 3.057C4.477 15.749 4 16.592 4 17.5c0 2.485 3.582 4.5 8 4.5s8-2.015 8-4.5c0-.908-.477-1.751-1.298-2.443.821-.692 1.298-1.83 1.298-3.057 0-1.227-.477-2.365-1.298-3.057C19.523 7.751 20 6.908 20 6c0-2.485-3.582-4.5-8-4.5zm0 1.75c3.553 0 6.25 1.48 6.25 2.75 0 .426-.308.835-.863 1.205C15.86 6.904 14.032 6.5 12 6.5c-2.032 0-3.86.404-5.387 1.205-.555-.37-.863-.779-.863-1.205 0-1.27 2.697-2.75 6.25-2.75z" />
          </svg>
        ),
      },
      {
        name: 'Bootstrap',
        role: 'Responsive UI Kit',
        icon: (
          <svg className="w-5 h-5 text-[#7952B3]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M5.3 2h13.4A3.3 3.3 0 0122 5.3v13.4a3.3 3.3 0 01-3.3 3.3H5.3A3.3 3.3 0 012 18.7V5.3A3.3 3.3 0 015.3 2zm3.2 4.5v11h4.65c2.2 0 3.6-1.08 3.6-2.95 0-1.36-.85-2.34-2.18-2.62v-.06c.98-.32 1.66-1.15 1.66-2.32 0-1.78-1.28-3.05-3.38-3.05H8.5zm2.1 1.7h2.05c.98 0 1.56.48 1.56 1.32 0 .88-.62 1.38-1.66 1.38H10.6V8.2zm0 4.3h2.25c1.14 0 1.78.52 1.78 1.5 0 .98-.66 1.5-1.82 1.5H10.6v-3z" />
          </svg>
        ),
      },
      {
        name: 'Tailwind CSS',
        role: 'Utility-First CSS',
        icon: (
          <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
          </svg>
        ),
      },
    ],
  },
  {
    name: 'Backend & Languages',
    accentBar: 'from-indigo-500 to-violet-500',
    description: 'Server-side runtime, REST APIs, and core programming fundamentals',
    skills: [
      {
        name: 'Node.js',
        role: 'JavaScript Runtime',
        icon: (
          <svg className="w-5 h-5 text-[#4ADE80]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.25l9 5.2v10.4l-9 5.2-9-5.2V7.45l9-5.2zm0 2.31L4.5 9.1v7.6l7.5 4.33 7.5-4.33V9.1L12 4.56z" />
          </svg>
        ),
      },
      {
        name: 'Express.js',
        role: 'Web & API Framework',
        icon: (
          <svg className="w-5 h-5 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth="1.75" />
            <path d="M7 9l3 6M10 9l-3 6M14 9h3M14 12h2.5M14 15h3" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        ),
      },
      {
        name: 'REST APIs',
        role: 'Backend Services',
        icon: (
          <svg className="w-5 h-5 text-[#60A5FA]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        name: 'C++',
        role: 'OOP & Problem Solving',
        icon: (
          <svg className="w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeWidth="1.75" strokeLinejoin="round" d="M12 2.5l8.2 4.75v9.5L12 21.5l-8.2-4.75v-9.5L12 2.5z" />
            <path strokeWidth="1.75" strokeLinecap="round" d="M10.5 9.2a3.3 3.3 0 100 5.6M14 12h2.4M15.2 10.8v2.4M17.6 12H20M18.8 10.8v2.4" />
          </svg>
        ),
      },
    ],
  },
  {
    name: 'Database',
    accentBar: 'from-emerald-500 to-teal-400',
    description: 'NoSQL & relational database modeling, queries, and ODM tooling',
    skills: [
      {
        name: 'MongoDB',
        role: 'NoSQL Database',
        icon: (
          <svg className="w-5 h-5 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0s-5.69 5.625-5.69 12.375c0 5.4 3.75 9.75 5.69 11.625 1.94-1.875 5.69-6.225 5.69-11.625C17.69 5.625 12 0 12 0zm.065 21.75c-.37-.5-1.125-1.5-1.125-1.5s-.81-1.065-.81-2.062c0-.5.25-.875.438-1.25.312-.625.688-1.312.688-2.625 0-.125-.063-.5-.063-.625l.872 8.062z" />
          </svg>
        ),
      },
      {
        name: 'SQL',
        role: 'Relational Queries',
        icon: (
          <svg className="w-5 h-5 text-[#38BDF8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <ellipse cx="12" cy="5.5" rx="7.5" ry="3" strokeWidth="1.75" />
            <path d="M4.5 5.5v13c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-13" strokeWidth="1.75" />
            <path d="M4.5 12c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3" strokeWidth="1.75" />
          </svg>
        ),
      },
      {
        name: 'MySQL',
        role: 'Relational RDBMS',
        icon: (
          <svg className="w-5 h-5 text-[#F59E0B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth="1.75" />
            <path d="M7 15V9l2.5 3.5L12 9v6M15.5 9.5a2 2 0 012 2v1a2 2 0 01-2 2h-1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        name: 'Mongoose',
        role: 'MongoDB ODM',
        icon: (
          <svg className="w-5 h-5 text-[#F87171]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M4 7v10c0 2 3.582 3 8 3s8-1 8-3V7M4 7c0 2 3.582 3 8 3s8-1 8-3M4 7c0-2 3.582-3 8-3s8 1 8 3" />
          </svg>
        ),
      },
    ],
  },
  {
    name: 'Tools',
    accentBar: 'from-violet-500 to-blue-400',
    description: 'Version control, API testing, and daily development workflow',
    skills: [
      {
        name: 'Git',
        role: 'Version Control',
        icon: (
          <svg className="w-5 h-5 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.124 0L8.831 2.564l3.187 3.187a1.8 1.8 0 011.838 1.838l3.07 3.07a1.8 1.8 0 11-1.07 1.055l-2.868-2.868v7.05a1.8 1.8 0 11-1.5 0v-7.05a1.8 1.8 0 01-.98-1.528l-3.18-3.18L.454 10.93a1.5 1.5 0 000 2.124l10.479 10.48a1.5 1.5 0 002.124 0l10.479-10.48a1.5 1.5 0 000-2.124h.01z" />
          </svg>
        ),
      },
      {
        name: 'GitHub',
        role: 'Code Hosting',
        icon: (
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
        ),
      },
      {
        name: 'VS Code',
        role: 'Code Editor',
        icon: (
          <svg className="w-5 h-5 text-[#007ACC]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.234a1 1 0 00-.033 1.442L4.316 12 .294 15.324a1 1 0 00.033 1.442l1.322 1.175a.999.999 0 001.276.057l4.12-3.128 9.46 8.63c.48.438 1.168.562 1.705.29l4.94-2.377A1.5 1.5 0 0024 20.06V3.94a1.5 1.5 0 00-.85-1.353zm-5.65 14.923l-7.228-5.51L17.5 6.49v11.02z" />
          </svg>
        ),
      },
      {
        name: 'Postman',
        role: 'API Testing',
        icon: (
          <svg className="w-5 h-5 text-[#FF6C37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="9" strokeWidth="1.75" />
            <path d="M8.5 15.5L15.5 8.5M11 8.5h4.5V13" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
    ],
  },
]

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-14 sm:py-16 lg:py-20 border-b border-slate-800/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-3">
          <span className="section-eyebrow">02 / Technical Skills</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Core Technologies &amp; Developer Tooling
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Technologies, databases, languages, and tools I actively use to build responsive
            frontends, backend APIs, and full-stack applications.
          </p>
        </div>

        {/* Categorized Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: catIdx * 0.08 }}
              className="dashboard-card p-6 space-y-5 relative overflow-hidden"
            >
              {/* Subtle animated category accent line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.15 + catIdx * 0.08, ease: 'easeOut' }}
                className={`origin-left absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${category.accentBar}`}
              />

              {/* Category Heading */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div>
                  <h3 className="text-base font-bold text-white">{category.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{category.description}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-slate-900 text-slate-300 border border-slate-800 flex-shrink-0">
                  {String(category.skills.length).padStart(2, '0')}
                </span>
              </div>

              {/* Skill Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.08 + skillIdx * 0.04 }}
                    whileHover={{ y: -2 }}
                    className="group flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-950/65 border border-slate-800/80 hover:border-indigo-500/45 hover:bg-slate-900/90 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
                      {skill.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors truncate">
                        {skill.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{skill.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
