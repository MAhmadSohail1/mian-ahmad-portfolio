import { MotionConfig } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#060913] text-slate-100 font-sans relative">
        {/* Subtle Global Grid Mesh Background */}
        <div
          className="pointer-events-none fixed inset-0 bg-grid-mesh opacity-50 z-0"
          aria-hidden="true"
        />

        {/* Fixed Left Sidebar (Desktop) + Mobile Top Bar & Slide-Over Drawer */}
        <Sidebar />

        {/* Main Content Workspace */}
        <div className="relative z-10 lg:pl-72 flex flex-col min-h-screen">
          <main className="dashboard-container flex-1">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Education />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
