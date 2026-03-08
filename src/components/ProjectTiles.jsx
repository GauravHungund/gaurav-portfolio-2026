import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import ProjectDetailPanel from './ProjectDetailPanel'

const projects = [
  {
    id: 1,
    title: 'Voice Coach AI',
    year: '2025',
    category: 'AI / Full-Stack',
    tagline: 'Real-time speech analysis with async background processing.',
    desc: 'An AI-powered voice coaching application that analyzes speech patterns, tone, pacing, and clarity. Uses asyncio queues for non-blocking entity extraction and WebSockets for real-time feedback delivery.',
    tags: ['React', 'FastAPI', 'Python', 'WebSockets', 'OpenAI', 'asyncio'],
    github: '#',
    live: '#',
    bg: '#111',
    accent: '#FDFBD4',
  },
  {
    id: 2,
    title: 'Memory Garden',
    year: '2025',
    category: 'AI / Graph DB',
    tagline: 'Visual memory tool powered by Reka Vision & Neo4j.',
    desc: 'Upload photos and let AI extract entities, emotions, and relationships. Explore your memories as a living knowledge graph in Neo4j Aura. Includes batch uploads, memory search, and graph visualization.',
    tags: ['React', 'Neo4j', 'Reka Vision', 'FastAPI', 'Graph DB'],
    github: '#',
    live: '#',
    bg: '#0a2a0a',
    accent: '#FDFBD4',
  },
  {
    id: 3,
    title: 'Next Hackathon',
    year: '2025',
    category: 'Platform / Real-time',
    tagline: 'Collaborative hackathon platform built for speed.',
    desc: 'Real-time project syncing, team formation, and submission management. Built for hackathon organizers and participants. Supabase real-time for live updates, Next.js for SSR performance.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    github: '#',
    live: '#',
    bg: '#1a0a2a',
    accent: '#FDFBD4',
  },
  {
    id: 4,
    title: 'AI Study Tool',
    year: '2024',
    category: 'AI / EdTech',
    tagline: 'LLM-powered flashcards and spaced repetition.',
    desc: 'Paste any text or upload a PDF and instantly generate MCQs, summaries, and personalized flashcard decks. Uses LangChain for document parsing, OpenAI for question generation, and a spaced repetition algorithm for scheduling.',
    tags: ['Python', 'LangChain', 'React', 'OpenAI'],
    github: '#',
    live: '#',
    bg: '#2a1a00',
    accent: '#FDFBD4',
  },
  {
    id: 5,
    title: 'Expense Tracker Pro',
    year: '2024',
    category: 'Finance / Full-Stack',
    tagline: 'Full-stack tracker with D3 analytics and budget alerts.',
    desc: 'Comprehensive expense tracking application with category analytics, configurable budget alerts, and beautiful data visualizations built with D3.js. Mobile-first design with offline support via service workers.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    github: '#',
    live: '#',
    bg: '#001a0a',
    accent: '#FDFBD4',
  },
  {
    id: 6,
    title: 'Portfolio 2.0',
    year: '2026',
    category: 'Design / Frontend',
    tagline: 'This portfolio — Instrument Sans, cream & green.',
    desc: 'A design-forward portfolio built entirely in React, Tailwind CSS v3, and Framer Motion. Features an accordion navigation system, diagonal scroll tile projects gallery, Instrument Sans typography, and a cream/green editorial color palette.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    github: '#',
    live: '#',
    bg: '#1a1a1a',
    accent: '#FDFBD4',
  },
]

// ── Individual scrollable card ──────────────────────────────────────────────
function ProjectCard({ project, index, total, scrollYProgress, onSelect }) {
  const [hovered, setHovered] = useState(false)

  // Each card occupies 1/total of the scroll range
  const start = index / total
  const end   = (index + 1) / total
  const mid   = (start + end) / 2

  // X diagonal: enters from right side of stack, exits left
  const x = useTransform(scrollYProgress, [start, mid, end], ['60%', '0%', '-60%'])
  const y = useTransform(scrollYProgress, [start, mid, end], ['30%', '0%', '-20%'])
  const rotateZ = useTransform(scrollYProgress, [start, mid, end], [8, 0, -6])
  const rotateX = useTransform(scrollYProgress, [start, mid, end], [-10, 0, 8])
  const scale = useTransform(scrollYProgress, [start, mid, end], [0.75, 1, 0.75])
  const opacity = useTransform(scrollYProgress, [start, start + 0.02, end - 0.02, end], [0, 1, 1, 0])
  const zIndex = useTransform(scrollYProgress, [start, mid, end], [index, total + 10, index])

  return (
    <motion.div
      style={{ x, y, rotateZ, rotateX, scale, opacity, zIndex, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onSelect(project)}
        animate={hovered ? { y: -18, boxShadow: '0 48px 80px rgba(0,0,0,0.35)' } : { y: 0, boxShadow: '0 12px 40px rgba(0,0,0,0.2)' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        style={{
          width: 'min(680px, 88vw)',
          aspectRatio: '16 / 10',
          backgroundColor: project.bg,
          borderRadius: '20px',
          cursor: 'pointer',
          padding: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Noise texture overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", pointerEvents: 'none' }} />

        {/* Top row: index + category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.7rem', color: project.accent, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7 }}>
            {project.category}
          </span>
        </div>

        {/* Center: title */}
        <div>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            {project.year}
          </p>
          <h3 style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: project.accent, lineHeight: 1.1, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '0.75rem', maxWidth: '420px', lineHeight: 1.6 }}>
            {project.tagline}
          </p>
        </div>

        {/* Bottom: tags + cta hint */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {project.tags.slice(0, 3).map(t => (
              <span key={t} style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '100px', padding: '0.25rem 0.65rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t}
              </span>
            ))}
          </div>
          <motion.span
            animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.75rem', color: project.accent, letterSpacing: '0.08em' }}
          >
            View Details →
          </motion.span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Main ProjectTiles component ─────────────────────────────────────────────
export default function ProjectTiles() {
  const containerRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <>
      {/* Scroll container — tall enough to drive the animation */}
      <div
        ref={containerRef}
        style={{ height: `${projects.length * 100}vh`, position: 'relative', backgroundColor: '#FDFBD4' }}
      >
        {/* Sticky 3D stage */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', perspective: '1200px', perspectiveOrigin: '50% 50%' }}>

          {/* Section label */}
          <div style={{ position: 'absolute', top: '2.5rem', left: 'clamp(2rem, 6vw, 6rem)', zIndex: 50 }}>
            <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.35)' }}>
              Scroll to explore
            </p>
          </div>

          {/* Progress dots */}
          <div style={{ position: 'absolute', right: 'clamp(1.5rem, 4vw, 4rem)', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '0.6rem', zIndex: 50 }}>
            {projects.map((_, i) => {
              const dotStart = i / projects.length
              const dotEnd   = (i + 1) / projects.length
              return (
                <ProgressDot key={i} index={i} start={dotStart} end={dotEnd} progress={scrollYProgress} />
              )
            })}
          </div>

          {/* Card stack */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {projects.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                total={projects.length}
                scrollYProgress={scrollYProgress}
                onSelect={setSelectedProject}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailPanel
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

// ── Progress dot ─────────────────────────────────────────────────────────────
function ProgressDot({ start, end, progress }) {
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.25, 1, 0.25])
  const scale   = useTransform(progress, [start, (start + end) / 2, end], [0.6, 1, 0.6])

  return (
    <motion.div
      style={{ opacity, scale, width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#004700' }}
    />
  )
}
