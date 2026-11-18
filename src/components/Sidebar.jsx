import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  User,
  Code2,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Mail,
  Menu,
  X,
  MapPin,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import ProfileAvatar from './ProfileAvatar'
import { profileConfig } from '../utils/profileConfig'

const navIcons = {
  overview: LayoutDashboard,
  about: User,
  skills: Code2,
  projects: FolderGit2,
  experience: Briefcase,
  education: GraduationCap,
  contact: Mail,
}

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Track active section smoothly while scrolling
  useEffect(() => {
    const sectionIds = profileConfig.navItems.map((item) => item.id)
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id)
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // Close drawer on Escape or desktop resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileOpen) setIsMobileOpen(false)
    }
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileOpen) setIsMobileOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
    }
  }, [isMobileOpen])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActiveSection(item.id)
    setIsMobileOpen(false)
    const target = document.getElementById(item.id)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const sidebarContent = (isMobile = false) => (
    <div className="flex flex-col h-full justify-between px-5 py-6">
      {/* Top: Profile Identity */}
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center pt-1 pb-5 border-b border-slate-800/80">
          <a
            href="#overview"
            onClick={(e) => handleNavClick(e, profileConfig.navItems[0])}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full"
            aria-label={`${profileConfig.name} — Back to Overview`}
          >
            <ProfileAvatar size="lg" shape="circle" showStatusDot />
          </a>

          <h2 className="mt-4 text-base font-bold tracking-tight text-white">
            {profileConfig.name}
          </h2>
          <p className="mt-0.5 text-xs font-medium text-blue-400">
            {profileConfig.title}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span>{profileConfig.location}</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Portfolio sections" className="space-y-1">
          <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Navigation
          </p>
          <ul className="space-y-1">
            {profileConfig.navItems.map((item) => {
              const Icon = navIcons[item.id] || LayoutDashboard
              const isActive = activeSection === item.id

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/45'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={isMobile ? 'activeSidebarMobile' : 'activeSidebarDesktop'}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-violet-600/15 border border-indigo-500/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                      />
                    )}
                    <Icon
                      className={`relative z-10 w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive ? 'text-blue-400' : 'text-slate-500'
                      }`}
                    />
                    <span className="relative z-10 truncate">{item.label}</span>
                    {isActive && (
                      <span className="relative z-10 ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      {/* Bottom: Social Links & Quick Status */}
      <div className="pt-5 mt-6 border-t border-slate-800/80 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <a
            href={profileConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            title="GitHub"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800/80 transition-all text-xs font-medium"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a
            href={profileConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all text-xs font-medium"
          >
            <LinkedinIcon className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>
          <a
            href={`mailto:${profileConfig.email}`}
            aria-label="Send Email"
            title={profileConfig.email}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-violet-400 hover:border-violet-500/40 hover:bg-slate-800/80 transition-all"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Open to MERN roles</span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Fixed Desktop Sidebar */}
      <aside
        aria-label="Developer Dashboard Sidebar"
        className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 z-40 bg-[#080d1a]/92 backdrop-blur-xl border-r border-slate-800/80 overflow-y-auto"
      >
        {sidebarContent(false)}
      </aside>

      {/* Mobile & Tablet Compact Header Bar (with Hamburger Toggle) */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between h-16 px-4 sm:px-6 bg-[#080d1a]/90 backdrop-blur-xl border-b border-slate-800/80">
        <a
          href="#overview"
          onClick={(e) => handleNavClick(e, profileConfig.navItems[0])}
          className="flex items-center gap-3 min-w-0"
        >
          <ProfileAvatar size="sm" shape="circle" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate leading-tight">
              {profileConfig.name}
            </p>
            <p className="text-[11px] text-blue-400 truncate leading-tight">
              {profileConfig.title}
            </p>
          </div>
        </a>

        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-expanded={isMobileOpen}
          aria-controls="mobile-sidebar-drawer"
          aria-label={isMobileOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
          className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Slide-Over Sidebar Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.aside
              id="mobile-sidebar-drawer"
              aria-label="Mobile Navigation Sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 34 }}
              className="relative w-72 max-w-[85vw] h-full bg-[#080d1a] border-r border-slate-800 shadow-2xl overflow-y-auto z-10"
            >
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close sidebar"
                className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent(true)}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
