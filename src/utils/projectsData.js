/**
 * Projects Data File
 * Authentic projects only — no dummy projects, fake repositories, or invented metrics.
 *
 * To add project screenshots:
 * Place screenshot files in `public/projects/` (e.g. `/projects/ecommerce.png`)
 * and set `imageUrl` accordingly. When `imageUrl` is null, a clean architecture header renders.
 */

export const projectsData = [
  {
    id: 'mern-ecommerce',
    title: 'MERN E-Commerce Platform',
    status: 'In Progress',
    category: 'Full-Stack MERN',
    description:
      'Full-stack retail web application featuring JWT authentication, product catalog with dynamic filtering, shopping cart state management, checkout endpoints, and RESTful APIs built with MongoDB and Express.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwind CSS'],
    imageUrl: null,
    githubUrl: 'https://github.com/MAhmadSohail1/E-COMMERCE-MERN-STACK',
    liveUrl: null,
  },
  {
    id: 'mern-blogging-platform',
    title: 'MERN Blogging Web Application',
    status: 'Completed',
    category: 'Full-Stack MERN',
    description:
      'Dynamic content publication and blogging platform featuring rich text authoring, multi-category tagging, reader commenting system, user profiles, and structured MongoDB querying.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    imageUrl: null,
    githubUrl: 'https://github.com/MAhmadSohail1',
    liveUrl: null,
  },
  {
    id: 'pharmacy-management-system',
    title: 'Pharmacy Management System',
    status: 'Completed',
    category: 'Full-Stack MERN',
    description:
      'Web-based healthcare operations application featuring medicine inventory tracking, low-stock and expiry alerts, customer prescription logging, point-of-sale invoicing, and role-based staff access.',
    tags: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
    imageUrl: null,
    githubUrl: 'https://github.com/MAhmadSohail1',
    liveUrl: null,
  },
  {
    id: 'portfolio-platform',
    title: 'Developer Portfolio Platform',
    status: 'Completed',
    category: 'Frontend Architecture',
    description:
      'Responsive developer dashboard portfolio built with React.js, Vite, Tailwind CSS, and Framer Motion. Includes a fixed sidebar layout, interactive animations, and direct email integration.',
    tags: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vite'],
    imageUrl: null,
    githubUrl: 'https://github.com/MAhmadSohail1/mian-ahmad-portfolio',
    liveUrl: 'https://mahmadsohail1.github.io/mian-ahmad-portfolio/',
  },
]
