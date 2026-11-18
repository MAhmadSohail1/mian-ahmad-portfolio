import { motion } from 'framer-motion'
import { Code2, Server, Database, Layers, CheckCircle2 } from 'lucide-react'

const focusPillars = [
  {
    icon: Code2,
    title: 'Modern Frontend Development',
    description:
      'Building clean, responsive user interfaces with React.js, modern JavaScript, HTML5, and CSS3.',
    accent: 'text-blue-400 bg-blue-500/10 border-blue-500/25',
  },
  {
    icon: Server,
    title: 'Node.js & Express.js Backends',
    description:
      'Structuring RESTful API endpoints, middleware, validation, and server-side application workflows.',
    accent: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/25',
  },
  {
    icon: Database,
    title: 'MongoDB Data Modeling',
    description:
      'Designing document schemas and managing application data cleanly for real-world full-stack features.',
    accent: 'text-violet-400 bg-violet-500/10 border-violet-500/25',
  },
  {
    icon: Layers,
    title: 'Clean & Maintainable Code',
    description:
      'Writing modular, readable components and backend logic designed for long-term clarity and scalability.',
    accent: 'text-sky-400 bg-sky-500/10 border-sky-500/25',
  },
]

const coreHighlights = [
  'Software Engineering student at University of Agriculture Faisalabad (UAF)',
  'Completed MERN Stack Software Engineering Internship at Edify Codev',
  'Focused on building practical full-stack web applications end to end',
  'Committed to clean code practices, usability, and continuous improvement',
]

export default function About() {
  return (
    <section
      id="about"
      className="py-14 sm:py-16 lg:py-20 border-b border-slate-800/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-3">
          <span className="section-eyebrow">01 / About Me</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Building practical web applications with clarity and purpose
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Narrative Card */}
          <div className="lg:col-span-7 dashboard-card p-6 sm:p-7 space-y-5">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              I&apos;m <span className="text-white font-semibold">Ahmad Sohail</span>, an
              enthusiastic Software Engineering student at the{' '}
              <span className="text-slate-100 font-medium">
                University of Agriculture Faisalabad (UAF)
              </span>{' '}
              and an aspiring{' '}
              <span className="text-blue-300 font-medium">Junior MERN Stack Developer</span>. I
              enjoy turning real-world requirements into dependable full-stack web applications.
            </p>

            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed">
              My work centers on full-stack JavaScript development — crafting responsive frontends
              with <span className="text-white font-medium">React.js</span>, building structured
              APIs with <span className="text-white font-medium">Node.js</span> and{' '}
              <span className="text-white font-medium">Express.js</span>, and persisting application
              data with <span className="text-white font-medium">MongoDB</span>. Through my
              academic studies, personal projects, and internship at{' '}
              <span className="text-white font-medium">Edify Codev</span>, I focus on writing clean,
              maintainable code that solves practical problems.
            </p>

            {/* Verified Highlights */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2.5">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Key Focus
              </p>
              <ul className="space-y-2">
                {coreHighlights.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: 4 Focus Pillar Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {focusPillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  whileHover={{ y: -2 }}
                  className="dashboard-card p-4 sm:p-5 flex items-start gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${pillar.accent}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
