import { useState } from 'react'
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projectsData } from '../utils/projectsData'

export default function Projects({ projects = projectsData }) {
  const [activeFilter, setActiveFilter] = useState('All')

  if (!projects || projects.length === 0) return null

  const filters = ['All', 'Full-Stack MERN', 'Frontend Architecture']

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <section
      id="projects"
      className="py-14 sm:py-16 lg:py-20 border-b border-slate-800/70"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        {/* Header + Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="space-y-3">
            <span className="section-eyebrow">03 / Projects</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Featured Projects
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Practical full-stack and frontend applications built with the MERN stack and modern
              web technologies.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start md:self-auto"
          >
            {filters.map((filter) => {
              const isSelected = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        {/* Responsive Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id || project.title}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
