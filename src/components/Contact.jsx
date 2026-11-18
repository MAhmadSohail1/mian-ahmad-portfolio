import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Send,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MapPin,
  Download,
} from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './SocialIcons'
import { profileConfig } from '../utils/profileConfig'
import { sendContactEmail } from '../utils/emailService'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validateField(name, value) {
  const trimmed = value.trim()
  switch (name) {
    case 'name':
      if (!trimmed) return 'Please enter your name.'
      if (trimmed.length < 2) return 'Name must be at least 2 characters.'
      return ''
    case 'email':
      if (!trimmed) return 'Please enter your email address.'
      if (!EMAIL_REGEX.test(trimmed))
        return 'Enter a valid email address in the format you@example.com.'
      return ''
    case 'subject':
      if (!trimmed) return 'Please enter a subject for your message.'
      if (trimmed.length < 3) return 'Subject must be at least 3 characters.'
      return ''
    case 'message':
      if (!trimmed) return 'Please write a message before sending.'
      if (trimmed.length < 10) return 'Message must be at least 10 characters long.'
      return ''
    default:
      return ''
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({
    status: null, // 'success' | 'error' | null
    message: '',
    needsActivation: false,
  })
  const [copiedEmail, setCopiedEmail] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Only re-validate live if field was already blurred or failed submit
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }

    if (submitState.status === 'error') {
      setSubmitState({ status: null, message: '', needsActivation: false })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const validateAll = () => {
    const nextErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
    }
    setTouched({ name: true, email: true, subject: true, message: true })
    setErrors(nextErrors)
    return Object.entries(nextErrors).filter(([, msg]) => Boolean(msg))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    const invalidFields = validateAll()
    if (invalidFields.length > 0) {
      const firstInvalidName = invalidFields[0][0]
      const firstInput = formRef.current?.querySelector(`[name="${firstInvalidName}"]`)
      firstInput?.focus()
      return
    }

    setIsSubmitting(true)
    setSubmitState({ status: null, message: '', needsActivation: false })

    try {
      const result = await sendContactEmail(formData)

      setSubmitState({
        status: 'success',
        needsActivation: Boolean(result.needsActivation),
        message: result.needsActivation
          ? `Your message request reached the delivery service. Please confirm the one-time activation email sent to ${profileConfig.email} so messages arrive in your inbox automatically.`
          : `Your message has been delivered to ${profileConfig.email}. Thank you for reaching out!`,
      })

      setFormData({ name: '', email: '', subject: '', message: '' })
      setTouched({})
      setErrors({})
    } catch (err) {
      setSubmitState({
        status: 'error',
        needsActivation: false,
        message:
          err?.message ||
          `Unable to send your message right now. Please try again or email ${profileConfig.email} directly.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileConfig.email)
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <section id="contact" className="py-14 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-3">
          <span className="section-eyebrow">06 / Contact</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Have a project idea, internship or junior developer opportunity, or a question? Send a
            message directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="dashboard-card p-6 space-y-6">
              {/* Email Card */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Direct Email
                </p>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/70 border border-slate-800/90">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <a
                      href={`mailto:${profileConfig.email}`}
                      className="text-xs sm:text-sm font-medium text-slate-100 hover:text-blue-300 transition-colors truncate"
                    >
                      {profileConfig.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-colors flex-shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Location
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>{profileConfig.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Online Profiles
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profileConfig.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-indigo-500/45 transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profileConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-300 hover:text-blue-300 hover:border-blue-500/45 transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Direct CV Download */}
              <div className="pt-4 border-t border-slate-800/80">
                <a
                  href={profileConfig.cvUrl}
                  download={profileConfig.cvFileName}
                  className="btn-secondary-dash w-full text-xs"
                  aria-label="Download Ahmad Sohail CV (PDF)"
                >
                  <Download className="w-4 h-4 text-violet-400" />
                  <span>Download CV (PDF)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Functional Contact Form */}
          <div className="lg:col-span-7">
            <div className="dashboard-card p-6 sm:p-8">
              {submitState.status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  role="status"
                  aria-live="polite"
                  className="py-8 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-bold text-white">
                      {submitState.needsActivation ? 'Almost Ready — Check Inbox' : 'Message Sent'}
                    </h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      {submitState.message}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setSubmitState({ status: null, message: '', needsActivation: false })
                    }
                    className="btn-secondary-dash text-xs mt-2"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Error Notification Banner */}
                  {submitState.status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs sm:text-sm"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-rose-300">Delivery Failed</p>
                        <p className="text-rose-200/90 leading-relaxed">{submitState.message}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-200">
                        Name <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        placeholder="Your full name"
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                        className="input-dash"
                      />
                      {errors.name && (
                        <p id="contact-name-error" className="flex items-center gap-1.5 text-xs text-rose-400">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>Error: {errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-200">
                        Email <span className="text-blue-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isSubmitting}
                        placeholder="you@example.com"
                        aria-invalid={errors.email ? 'true' : 'false'}
                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                        className="input-dash"
                      />
                      {errors.email && (
                        <p id="contact-email-error" className="flex items-center gap-1.5 text-xs text-rose-400">
                          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                          <span>Error: {errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-200">
                      Subject <span className="text-blue-400">*</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      minLength={3}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      placeholder="Project collaboration, internship, or inquiry"
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                      className="input-dash"
                    />
                    {errors.subject && (
                      <p id="contact-subject-error" className="flex items-center gap-1.5 text-xs text-rose-400">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>Error: {errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-200">
                      Message <span className="text-blue-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      minLength={10}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      placeholder="Write your message here..."
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'contact-message-error' : undefined}
                      className="input-dash resize-y"
                    />
                    {errors.message && (
                      <p id="contact-message-error" className="flex items-center gap-1.5 text-xs text-rose-400">
                        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                        <span>Error: {errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <motion.button
                      whileHover={isSubmitting ? undefined : { y: -1 }}
                      whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-dash w-full sm:w-auto min-w-[165px] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>

                    <p className="text-[11px] font-mono text-slate-500">
                      Delivered to {profileConfig.email}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
