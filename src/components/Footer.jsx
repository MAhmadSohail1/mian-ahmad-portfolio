import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { profileConfig } from '../utils/profileConfig'

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {

  const handleScrollTo = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-10 bg-[#050811] border-t border-slate-800/80">
      {/* Subtle Gradient Top Accent */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent"
        aria-hidden="true"
      />

      <div className="dashboard-container py-10 sm:py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          {/* Identity */}
          <div className="md:col-span-5 space-y-2.5">
            <p className="text-lg font-bold tracking-tight text-white">
              {profileConfig.name}
            </p>
            <p className="text-sm font-medium text-blue-400">
              {profileConfig.title}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Building clean, responsive full-stack web applications with React.js, Node.js,
              Express.js, and MongoDB.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Quick Links
            </p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {profileConfig.navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.id)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Direct Contact */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Connect
            </p>
            <div className="flex flex-col gap-2.5 text-xs">
              <a
                href={profileConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-slate-500" />
                <span>GitHub</span>
              </a>
              <a
                href={profileConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-300 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4 text-slate-500" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profileConfig.email}`}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-300 transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                <span>{profileConfig.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {CURRENT_YEAR} {profileConfig.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/45 transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
