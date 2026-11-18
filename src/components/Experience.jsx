import { motion } from 'framer-motion'
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react'

const internshipEntries = [
  {
    id: 'edify-codev-internship',
    company: 'Edify Codev',
    role: 'Software Engineering Intern (MERN Stack)',
    type: 'Internship',
    status: 'Completed',
    location: 'Faisalabad, Pakistan',
    description:
      'Hands-on software engineering internship contributing to full-stack web applications, REST API development, and responsive frontend interfaces.',
    highlights: [
      'Designed, built, and tested modular RESTful API endpoints using Node.js and Express.js with input validation.',
      'Developed interactive, responsive client-side components using React.js.',
      'Worked on database models and queries using MongoDB.',
      'Collaborated using Git and GitHub for version control, issue tracking, and code reviews.',
    ],
    skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Git', 'GitHub'],
  },
]

export default function Experience() {
  return (
    <section
      id="experience"
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
          <span className="section-eyebrow">04 / Experience</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Internship Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Practical industry exposure applying MERN stack fundamentals in a collaborative team
            environment.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-9 border-l border-slate-800 ml-2.5 space-y-6">
          {internshipEntries.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline Marker */}
              <div className="absolute -left-[35px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#060913] border-2 border-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.6)]">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              </div>

              <div className="dashboard-card p-6 sm:p-7 space-y-5">
                {/* Top Row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{exp.company}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800">
                      {exp.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{exp.status}</span>
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 leading-relaxed">{exp.description}</p>

                {/* Responsibilities */}
                <ul className="space-y-2.5">
                  {exp.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300/90">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/80">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-950/70 text-slate-300 border border-slate-800/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
