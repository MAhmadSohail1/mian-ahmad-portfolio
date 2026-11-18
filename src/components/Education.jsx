import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import { educationData } from '../utils/educationData'

export default function Education({ education = educationData }) {
  if (!education || education.length === 0) return null

  return (
    <section
      id="education"
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
          <span className="section-eyebrow">05 / Education</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Academic Background
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Formal academic foundation in software engineering and computer science.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-6 sm:pl-9 border-l border-slate-800 ml-2.5 space-y-6">
          {education.map((item, idx) => {
            const isOngoing =
              item.status?.toLowerCase().includes('progress') ||
              item.status?.toLowerCase().includes('present')

            return (
              <motion.div
                key={item.id || item.institution}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className="relative"
              >
                {/* Timeline Marker */}
                <div
                  className={`absolute -left-[35px] sm:-left-[47px] top-6 w-5 h-5 rounded-full bg-[#060913] border-2 flex items-center justify-center ${
                    isOngoing
                      ? 'border-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.65)]'
                      : 'border-slate-600'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isOngoing ? 'bg-indigo-400' : 'bg-slate-500'
                    }`}
                  />
                </div>

                <div className="dashboard-card p-6 space-y-4">
                  {/* Meta Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-mono text-indigo-300">
                        <GraduationCap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{item.institution}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.degree}
                      </h3>
                      {item.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start">
                      {item.period && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-slate-900 text-slate-300 border border-slate-800">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>{item.period}</span>
                        </span>
                      )}
                      {item.status && (
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                            isOngoing
                              ? 'bg-blue-500/10 text-blue-300 border-blue-500/25'
                              : 'bg-slate-800/80 text-slate-300 border-slate-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isOngoing ? 'bg-blue-400' : 'bg-emerald-400'
                            }`}
                          />
                          <span>{item.status}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {item.details && (
                    <p className="text-sm text-slate-300/90 leading-relaxed">{item.details}</p>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
