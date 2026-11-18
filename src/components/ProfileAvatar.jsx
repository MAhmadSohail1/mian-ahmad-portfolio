import { useState } from 'react'
import { profileConfig } from '../utils/profileConfig'

/**
 * Reusable Profile Avatar Component
 * - Displays the user's real photograph with `object-cover`, subtle gradient ring, and hover transition.
 * - Falls back cleanly to a minimalist typographic monogram ("AS") if no photo exists yet.
 * - Never substitutes AI-generated faces or stock photos.
 */
export default function ProfileAvatar({
  src = profileConfig.photoUrl,
  alt = profileConfig.name,
  initials = profileConfig.initials,
  size = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  shape = 'circle', // 'circle' | 'rounded'
  showStatusDot = false,
  className = '',
}) {
  const [hasError, setHasError] = useState(false)

  const sizeMap = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
    xl: 'w-44 h-44 sm:w-52 sm:h-52 text-4xl',
  }

  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-2xl'
  const showImage = Boolean(src) && !hasError

  return (
    <div className={`relative inline-flex flex-shrink-0 group ${className}`}>
      {/* Subtle Gradient Ring */}
      <div
        className={`p-[2px] ${shapeClass} bg-gradient-to-tr from-blue-500/70 via-indigo-500/60 to-violet-500/70 transition-all duration-300 group-hover:from-blue-400 group-hover:via-indigo-400 group-hover:to-violet-400 group-hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.55)]`}
      >
        <div
          className={`relative overflow-hidden ${sizeMap[size]} ${shapeClass} bg-[#0b1120] flex items-center justify-center`}
        >
          {showImage ? (
            <img
              src={src}
              alt={alt}
              onError={() => setHasError(true)}
              className="w-full h-full object-cover object-[55%_22%] transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-[#0f172a] to-indigo-950/90 select-none"
              aria-label={`${alt} initials placeholder`}
            >
              <span className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-200 to-violet-300">
                {initials}
              </span>
              {size === 'xl' && (
                <span className="mt-1.5 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                  Photo Slot
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Optional Online Status Indicator */}
      {showStatusDot && (
        <span
          className="absolute bottom-0.5 right-0.5 flex h-3.5 w-3.5"
          title="Available for opportunities"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#080d1a]" />
        </span>
      )}
    </div>
  )
}
