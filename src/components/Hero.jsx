import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, Download } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { profileConfig } from '../utils/profileConfig'

function useTypingEffect(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1700) {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState(words[0] || '')
  const [isDeleting, setIsDeleting] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener?.('change', onChange)
    return () => mq.removeEventListener?.('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion || words.length === 0) return

    const currentWord = words[wordIndex % words.length]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseMs)
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }, 120)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            isDeleting
              ? currentWord.slice(0, prev.length - 1)
              : currentWord.slice(0, prev.length + 1)
          )
        },
        isDeleting ? deletingSpeed : typingSpeed
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs, reducedMotion])

  return {
    text: reducedMotion ? words[0] || '' : text,
    reducedMotion,
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Hero() {
  const { text: typedRole, reducedMotion } = useTypingEffect(profileConfig.typingRoles)

  const scrollToSection = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section
      id="overview"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-slate-800/70"
    >
      {/* Subtle Animated Ambient Background Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-orb-1 absolute -top-24 -right-24 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-blue-600/12 blur-3xl" />
        <div className="ambient-orb-2 absolute -bottom-24 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        {/* Left: Developer Introduction & Controls */}
        <div className="xl:col-span-7 space-y-6">
          {/* Status Pill */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-800 text-slate-300 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for MERN Stack &amp; Frontend Opportunities</span>
            </span>
          </motion.div>

          {/* Animated Name Presentation */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="text-sm font-mono uppercase tracking-widest text-blue-400">
              Hello, I&apos;m
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08]">
              <span className="text-gradient-name">{profileConfig.name}</span>
            </h1>

            {/* Static Title + Typing Animation */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-lg sm:text-xl font-semibold text-slate-200">
              <span className="text-slate-400 font-normal">{profileConfig.title}</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="inline-flex items-center font-mono text-base sm:text-lg text-indigo-300 min-h-[1.75rem]">
                <span>{typedRole}</span>
                {!reducedMotion && (
                  <span
                    className="ml-0.5 inline-block w-[2px] h-5 bg-blue-400 animate-pulse"
                    aria-hidden="true"
                  />
                )}
              </span>
            </div>
          </motion.div>

          {/* Concise Developer Summary */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl"
          >
            Software Engineering student at the University of Agriculture Faisalabad (UAF) focused on
            building practical full-stack web applications with{' '}
            <span className="text-white font-medium">MongoDB, Express.js, React.js, and Node.js</span>.
            Passionate about clean code, responsive interfaces, and reliable backend APIs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-1"
          >
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
              className="btn-primary-dash"
            >
              <span>View My Projects</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn-secondary-dash"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>Contact Me</span>
            </motion.a>

            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              href={profileConfig.cvUrl}
              download={profileConfig.cvFileName}
              className="btn-secondary-dash"
              aria-label="Download Ahmad Sohail CV (PDF)"
            >
              <Download className="w-4 h-4 text-violet-400" />
              <span>Download CV</span>
            </motion.a>
          </motion.div>

          {/* Social Links Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Connect
            </span>
            <div className="h-3.5 w-px bg-slate-800" />
            <a
              href={profileConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-800 hover:border-indigo-500/45 hover:text-white transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href={profileConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-900/70 border border-slate-800 hover:border-blue-500/45 hover:text-blue-300 transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </div>

        {/* Right: Clean Profile Photo Only (No extra details underneath) */}
        <motion.div
          variants={itemVariants}
          className="xl:col-span-5 flex justify-center xl:justify-end"
        >
          <div className="relative group w-full max-w-[300px] sm:max-w-[340px]">
            {/* Subtle ambient glow behind portrait */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-3xl bg-gradient-to-tr from-blue-500/35 via-indigo-500/25 to-violet-500/35 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            {/* Gradient Border Frame */}
            <div className="relative p-[2px] rounded-2xl bg-gradient-to-tr from-blue-500/70 via-indigo-500/50 to-violet-500/70 shadow-2xl">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[14px] bg-[#0b1120]">
                {profileConfig.photoUrl ? (
                  <img
                    src={profileConfig.photoUrl}
                    alt={profileConfig.name}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-[55%_18%] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-950">
                    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-violet-300">
                      {profileConfig.initials}
                    </span>
                  </div>
                )}

                {/* Subtle bottom vignette to blend seamlessly into dark theme */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#060913]/55 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
