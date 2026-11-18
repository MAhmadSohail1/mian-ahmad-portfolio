import { motion } from 'framer-motion'
import { ExternalLink, Code2, FolderGit2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'

const statusStyles = {
  Completed: {
    dot: 'bg-emerald-400',
    pill: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  },
  'In Progress': {
    dot: 'bg-amber-400',
    pill: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
  },
  default: {
    dot: 'bg-blue-400',
    pill: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
  },
}

export default function ProjectCard({ project, index = 0 }) {
  const {
    title,
    status,
    category,
    description,
    tags = [],
    imageUrl,
    githubUrl,
    liveUrl,
  } = project

  const badge = statusStyles[status] || statusStyles.default
  const hasLinks = Boolean(githubUrl || liveUrl)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="dashboard-card overflow-hidden flex flex-col justify-between group"
    >
      <div>
        {/* Project Visual Header: Real screenshot when available, or clean architecture header */}
        {imageUrl ? (
          <div className="relative aspect-video w-full overflow-hidden border-b border-slate-800/80 bg-slate-950">
            <img
              src={imageUrl}
              alt={`${title} screenshot`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120]/80 via-transparent to-transparent" />
          </div>
        ) : (
          <div className="relative h-36 w-full overflow-hidden border-b border-slate-800/80 bg-gradient-to-br from-slate-900 via-[#0d152a] to-indigo-950/60 p-5 flex flex-col justify-between">
            <div
              className="pointer-events-none absolute inset-0 bg-grid-mesh opacity-60"
              aria-hidden="true"
            />
            <div className="relative z-10 flex items-center justify-between">
              <div className="w-9 h-9 rounded-lg bg-slate-900/90 border border-slate-700/70 flex items-center justify-center text-blue-400 group-hover:border-indigo-500/50 transition-colors">
                <FolderGit2 className="w-4 h-4" />
              </div>
              {category && (
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950/75 px-2.5 py-1 rounded-md border border-slate-800/90">
                  {category}
                </span>
              )}
            </div>
            <div className="relative z-10 flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Code2 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="truncate">{tags.slice(0, 4).join(' · ')}</span>
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* Status */}
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badge.pill}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
              <span>{status}</span>
            </span>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
          </div>

          {/* Technology Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-950/70 text-slate-300 border border-slate-800/90"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Links */}
      {hasLinks && (
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/40 flex flex-wrap items-center gap-2.5">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary-dash text-xs px-3.5 py-2 min-h-[38px] flex-1 sm:flex-none"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-dash text-xs px-3.5 py-2 min-h-[38px] flex-1 sm:flex-none"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
