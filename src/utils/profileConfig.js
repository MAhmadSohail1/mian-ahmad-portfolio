/**
 * Centralized Portfolio Profile Configuration
 *
 * To add your real photograph:
 * 1. Place your real image file in `public/profile.jpg` (or update `photoUrl` below).
 * 2. If the image file is not found, a clean initials placeholder ("AS") is rendered automatically.
 */

export const profileConfig = {
  name: 'Ahmad Sohail',
  initials: 'AS',
  title: 'Junior MERN Stack Developer',
  location: 'Faisalabad, Pakistan',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'ahmadlegend116@gmail.com',
  githubUrl: 'https://github.com/MAhmadSohail1',
  linkedinUrl: 'https://www.linkedin.com/in/muhammad-ahmad-78a243371',
  // Real profile photograph placed at `public/profile.jpg` (works on root and subpath deploys)
  photoUrl: `${import.meta.env.BASE_URL}profile.jpg`,
  typingRoles: [
    'MERN Stack Developer',
    'React.js Developer',
    'Frontend Developer',
    'JavaScript Developer',
  ],
  navItems: [
    { id: 'overview', label: 'Overview', href: '#overview' },
    { id: 'about', label: 'About Me', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],
}
