import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiSunLine, RiMoonLine, RiArrowRightUpLine, RiGithubFill, RiLinkedinFill, RiMailLine } from 'react-icons/ri'
import { useTheme } from '../context/ThemeContext'
import ProjectsBlog from './ProjectsBlog'
import TetrisBg from './Backgrounds/TetrisBg'
import Shuffle from './TextAnimations/Shuffle'

// ── Custom SVG arrow (rotates based on open state) ──
function ArrowIcon({ active, hovered }) {
  // When active or hovered the row background is var(--accent), so use var(--accent-text).
  // Otherwise use var(--text) so it always contrasts the background regardless of theme.
  const color = (active || hovered) ? 'var(--accent-text)' : 'var(--text)'
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="52"
      height="52"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        flexShrink: 0,
        transform: active ? 'rotate(0deg)' : 'rotate(180deg)',
        transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1), stroke 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      <path d="M15.544 11.5H15V17.5C15 18.4319 15 18.8978 14.8478 19.2654C14.6448 19.7554 14.2554 20.1448 13.7654 20.3478C13.3978 20.5 12.9319 20.5 12 20.5C11.0681 20.5 10.6022 20.5 10.2346 20.3478C9.74458 20.1448 9.35523 19.7554 9.15224 19.2654C9 18.8978 9 18.4319 9 17.5V11.5H8.45596C6.37322 11.5 5.33185 11.5 5.05779 10.8997C4.78372 10.2994 5.49744 9.58174 6.92487 8.14642L10.4689 4.58281C11.1868 3.86094 11.5458 3.5 12 3.5C12.4542 3.5 12.8132 3.86094 13.5311 4.58281L17.0751 8.14643C18.5026 9.58175 19.2163 10.2994 18.9422 10.8997C18.6681 11.5 17.6268 11.5 15.544 11.5Z" />
    </svg>
  )
}

// ── Theme Toggle Button ───────────────────────────────────────────────────────
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--text)',
        color: 'var(--bg)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -30, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 30, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
          style={{ position: 'absolute' }}
        >
          {isDark ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}

// ── About content ─────────────────────────────────────────────────────────────
function AboutContent() {
  const outside = [
    { icon: '🍳', text: 'Experimenting in the kitchen — baking included; precision helps there too.' },
    { icon: '⚽', text: 'Watching or playing football.' },
    { icon: '🔍', text: 'Noticing small details that make products and experiences better.' },
  ]
  return (
    <div style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        {/* Left col */}
        <div>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '1.5rem' }}>Who I Am</h3>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.85, color: 'var(--text)', marginBottom: '1.25rem' }}>
            I&apos;m a full-stack developer who enjoys building things carefully and learning along the way.
          </p>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.85, color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
            I like taking rough ideas and turning them into working systems — whether that&apos;s a web app, a small backend service, or an AI-powered feature.
            I try to understand how different parts of a system fit together, and I care about writing code that&apos;s simple, readable, and practical.
          </p>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.15rem)', lineHeight: 1.85, color: 'var(--text-muted)' }}>
            I&apos;ve built on my graduate CS training by taking on projects outside the classroom — hackathons, late-night debugging sessions, and going back to improve things until they felt right. That combination of theory and hands-on iteration is what draws me to problems with real users and real stakes.
          </p>
        </div>
        {/* Right col */}
        <div>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '1.5rem' }}>Outside of Coding</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {outside.map(({ icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.2rem', lineHeight: 1, marginTop: '0.15rem', flexShrink: 0 }}>{icon}</span>
                <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.1rem)', lineHeight: 1.85, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
            I&apos;m still learning, still building, and always trying to get a little better —
            whether that&apos;s through a new tool, a cleaner design, or a better approach to a problem.
          </p>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-muted)', marginTop: '0.75rem', fontStyle: 'italic' }}>
            If you&apos;re here, you&apos;ll see what I&apos;m working on — and how I&apos;m learning as I build.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Skills content (using SVG Icons) ──────────────────────────────────────────
const skillsData = [
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
]

function SkillCard({ skill }) {
  return (
    <div
      style={{
        aspectRatio: '1/1',
        borderBottom: '3px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        cursor: 'default',
        overflow: 'hidden',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px'
      }}
    >
      <img 
        src={skill.icon} 
        alt={skill.name} 
        style={{ width: '48px', height: '48px', filter: 'grayscale(0%) opacity(1)' }} 
        loading="lazy" 
      />
      <span
        style={{
          fontFamily: "'Instrument Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.85rem',
          color: 'var(--text)',
          textAlign: 'center'
        }}
      >
        {skill.name}
      </span>
    </div>
  )
}

const coursesData = [
  { name: 'Managing Business Relationships', grade: 'B+' },
  { name: 'Computer Architecture', grade: 'A' },
  { name: 'Design and analysis of algorithms', grade: 'In Progress' },
  { name: 'Data visualization', grade: 'A' },
  { name: 'Design Patterns', grade: 'A' },
  { name: 'Advanced Operating Systems', grade: 'A' },
  { name: 'Directed Research', grade: 'In Progress' },
  { name: 'Machine Learning', grade: 'A' },
  { name: 'Database Systems', grade: 'A' },
  { name: 'Pattern Recognition and Data Mining', grade: 'B+' },
  { name: 'Computer Networks', grade: 'B+' },
  { name: 'Mobile Application Development', grade: 'A' },
]

function SkillsContent() {
  const [activeTab, setActiveTab] = useState('skills')

  const tabStyle = (isActive) => ({
    padding: '0.75rem 1.75rem',
    borderRadius: '100px',
    border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
    backgroundColor: isActive ? 'var(--accent)' : 'var(--card-bg)',
    color: isActive ? 'var(--accent-text)' : 'var(--text)',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
        <button style={tabStyle(activeTab === 'skills')} onClick={() => setActiveTab('skills')}>Skills</button>
        <button style={tabStyle(activeTab === 'courses')} onClick={() => setActiveTab('courses')}>Courses</button>
      </div>

      {activeTab === 'skills' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '2.5rem'
        }}>
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </div>
      )}

      {activeTab === 'courses' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {coursesData.map((course, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.25rem 1.5rem',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              backgroundColor: 'var(--card-bg)'
            }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text)', flex: 1, paddingRight: '1rem' }}>
                {course.name}
              </span>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                padding: '0.4rem 0.75rem', 
                borderRadius: '8px',
                backgroundColor: course.grade === 'In Progress' ? 'var(--bg)' : 'var(--accent)',
                color: course.grade === 'In Progress' ? 'var(--text-muted)' : 'var(--accent-text)',
                border: course.grade === 'In Progress' ? '1px solid var(--border)' : 'none',
                whiteSpace: 'nowrap'
              }}>
                {course.grade}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Contact content ───────────────────────────────────────────────────────────
function ContactContent() {
  const socials = [
    { label: 'GitHub',   href: 'https://github.com/GauravHungund',            icon: <RiGithubFill size={18} /> },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gaurav-hungund/', icon: <RiLinkedinFill size={18} /> },
    { label: 'Devpost',  href: 'https://devpost.com/ghungund',                icon: <RiArrowRightUpLine size={18} /> },
  ]

  return (
    <div style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '1.5rem' }}>Get In Touch</h3>
        <p style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 500, color: 'var(--text)', lineHeight: 1.3, marginBottom: '2.5rem' }}>
          Open to new opportunities and collaborations.
        </p>

        {/* Email */}
        <a
          href="mailto:ghungund@scu.edu"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem', backgroundColor: 'var(--accent)', color: 'var(--accent-text)', padding: '0.9rem 1.6rem', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', letterSpacing: '0.01em', transition: 'opacity 0.2s', marginBottom: '2.5rem' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.82}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          <RiMailLine size={20} />
          ghungund@scu.edu
        </a>

        {/* Social buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {socials.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)', borderRadius: '100px', padding: '0.6rem 1.2rem', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', textDecoration: 'none', backgroundColor: 'var(--card-bg)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent-text)'; e.currentTarget.style.borderColor = 'var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--card-bg)'; e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              {icon} {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Accordion row (3D Flip Animation) ────────────────────────────────────────
const drawerVariants = {
  closed: { height: 0, opacity: 0 },
  open:   { height: 'auto', opacity: 1 },
}

function AccordionRow({ id, label, content, open, onToggle }) {
  const [hovered, setHovered] = useState(false)
  const active  = open === id
  const colored = active || hovered
  const { theme } = useTheme()

  return (
    <div style={{ position: 'relative', borderTop: '1px solid var(--border)' }}>
      {/* Perspective wrapper for 3D flip effect */}
      <div style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        <motion.button
          onClick={() => onToggle(id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{
            rotateX: active ? 0 : (hovered ? -8 : 0),
            backgroundColor: colored ? 'var(--accent)' : 'transparent',
            color: colored ? 'var(--accent-text)' : 'var(--text)',
          }}
          transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 clamp(1.5rem, 5vw, 4rem)',
            cursor: 'pointer',
            pointerEvents: 'auto',
            border: 'none',
            textAlign: 'left',
            minHeight: '140px',
            transformOrigin: 'bottom',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}
          >
            <Shuffle text={label} />
          </span>
          <div style={{ pointerEvents: 'auto' }}>
            <ArrowIcon active={active} hovered={hovered} />
          </div>
        </motion.button>
      </div>

      {/* Drawer */}
      <AnimatePresence initial={false}>
        {active && (
          <motion.div
            key={id}
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{
              overflow: 'hidden',
              backgroundColor: 'var(--bg)',
              pointerEvents: 'auto',
              borderTop: '1px solid var(--border)',
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Experience content ─────────────────────────────────────────────────────────────
function TimelineEntry({ title, meta, items }) {
  return (
    <div style={{ position: 'relative', paddingLeft: '1.5rem', marginBottom: '2.5rem' }}>
      <div style={{ position: 'absolute', left: 0, top: '0.45rem', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent)', flexShrink: 0 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
        <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text)' }}>{title}</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{meta}</span>
      </div>
      {items.map((item, i) => (
        <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>{item}</p>
      ))}
    </div>
  )
}

function ExperienceContent() {
  return (
    <div style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Resume Download */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2.5rem' }}>
        <a 
          href="/GauravHungundResume.pdf" 
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--accent)', color: 'var(--accent-text)', padding: '0.75rem 1.5rem', borderRadius: '100px', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', transition: 'opacity 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 0.85}
          onMouseLeave={e => e.currentTarget.style.opacity = 1}
        >
          Download Resume <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>↓</span>
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
        {/* Education */}
        <div>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '2rem' }}>Education</h3>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '0' }}>
            <TimelineEntry
              title="Santa Clara University"
              meta="Sep 2024 – Jun 2026"
              items={['M.S. in Computer Science', 'GPA: 3.8', 'California, USA']}
            />
            <TimelineEntry
              title="D.Y. Patil College of Engineering"
              meta="Aug 2018 – May 2022"
              items={['B.S. in Computer Science', 'CGPA: 8.54', 'Pune, India']}
            />
          </div>
        </div>
        {/* Experience */}
        <div>
          <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '2rem' }}>Experience</h3>
          <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '0' }}>
            <TimelineEntry
              title="Cognizant — Software Engineer (SDE I)"
              meta="Jun 2022 – Apr 2023"
              items={[
                'Owned development of production features across design, implementation, testing, and peer review.',
                'Reduced backend latency by ~30% through debugging, performance tuning, and iterative refactoring.',
                'Optimized SQL queries and data pipelines to improve reliability across analytics modules.',
              ]}
            />
            <TimelineEntry
              title="Cognizant — Software Engineering Intern"
              meta="Feb 2022 – Jun 2022"
              items={[
                'Contributed to Java-based backend services and REST APIs in a production environment.',
                'Wrote, debugged, and validated code using test cases in Agile workflows under senior mentorship.',
              ]}
            />
          </div>
        </div>
      </div>

      {/* Hackathon Wins */}
      <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
        <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--accent)', marginBottom: '2rem' }}>Hackathon Wins</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              project: 'VoiceCoach',
              hackathon: 'Autonomous Agents Hackathon',
              award: 'Best Use of Neo4j',
              devpost: 'https://devpost.com/software/voicecoach',
              photo: '/VoiceCoach-1.jpeg',
              youtubeUrl: null,
            },
            {
              project: 'MicDrop AI',
              hackathon: 'Production Agents Hackathon',
              award: 'Best Use of Lightpanda',
              devpost: 'https://devpost.com/software/micdrop-ai',
              photo: '/MicDrop.png',
              youtubeUrl: null,
            },
            {
              project: 'Dungeon Forge',
              hackathon: 'The Future of Agents Hackathon',
              award: 'Best Use of Airia Platform',
              devpost: 'https://devpost.com/software/dungeon-forge',
              photo: '/DungeonForge-1.jpeg',
              youtubeUrl: null,
            },
            {
              project: 'Farmer OP',
              hackathon: 'Pending — details to be added',
              award: 'Pending',
              devpost: 'https://devpost.com/software/farmer-op',
              photo: '/VillageSimulation.jpeg',
              youtubeUrl: null,
            },
          ].map(({ project, hackathon, award, devpost, photo, youtubeUrl }) => (
            <div key={project} style={{ border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'var(--card-bg)' }}>
              {/* Photo slot */}
              <div style={{ width: '100%', height: '140px', backgroundColor: 'var(--chip-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
                {photo
                  ? <img src={photo} alt={project} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  : <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.06em' }}>photo — coming soon</span>
                }
              </div>
              <div style={{ padding: '1.25rem' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.3rem' }}>{project}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{hackathon}</p>
                <p style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)', marginBottom: '1rem', letterSpacing: '0.03em' }}>{award}</p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={devpost} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '100px', padding: '0.3rem 0.75rem', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                    Devpost
                  </a>
                  {youtubeUrl && (
                    <a href={youtubeUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '100px', padding: '0.3rem 0.75rem', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                      Watch Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main HomePage ─────────────────────────────────────────────────────────────
const sections = [
  { id: 'about',      label: 'ABOUT',      content: <AboutContent /> },
  { id: 'experience', label: 'EXPERIENCE', content: <ExperienceContent /> },
  { id: 'skills',     label: 'SKILLS & COURSES',     content: <SkillsContent /> },
  { id: 'projects',   label: 'PROJECTS',   content: <ProjectsBlog /> },
  { id: 'contact',    label: 'CONTACT',    content: <ContactContent /> },
]

export default function HomePage() {
  const [open, setOpen] = useState(() => {
    return window.location.hash ? window.location.hash.replace('#', '') : null
  })

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const el = document.getElementById(open)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [open])

  const toggle = id => {
    setOpen(prev => {
      const next = prev === id ? null : id
      if (next) window.history.replaceState(null, '', '#' + next)
      else window.history.replaceState(null, '', window.location.pathname)
      return next
    })
  }
  const { theme } = useTheme()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text)', transition: 'background-color 0.4s, color 0.4s' }}>
        
        {/* Header */}
        <header
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
            pointerEvents: 'auto',
            borderBottom: '1px solid var(--border)',
          }}
        >
        <span style={{ fontWeight: 700, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>
          GH.
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Portfolio&nbsp;&#39;26
          </span>
          <ThemeToggle />
        </div>
      </header>

      {/* Expanded Hero landing section */}
      <div style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
        <TetrisBg />
        <div style={{ position: 'relative', zIndex: 1, padding: '8rem clamp(1.5rem, 5vw, 4rem) 6rem', pointerEvents: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ flex: '1 1 auto' }}>
              <h1 style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 'clamp(4rem, 8vw, 7rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em', textTransform: 'uppercase', margin: 0, color: 'var(--text)' }}>
                <span style={{ display: 'block' }}>Gaurav</span>
                <span style={{ display: 'block' }}>Hungund</span>
              </h1>
              <h2 style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)', fontWeight: 400, color: 'var(--text-muted)', marginTop: '1.5rem', letterSpacing: '0.02em' }}>
                Full-Stack Developer &amp; Creative Engineer
              </h2>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <a href="https://github.com/GauravHungund" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--text)', color: 'var(--bg)', width: '60px', height: '60px', borderRadius: '50%', textDecoration: 'none', transition: 'opacity 0.2s', pointerEvents: 'auto' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                <RiGithubFill size={34} />
              </a>
              <a href="https://www.linkedin.com/in/gaurav-hungund/" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--text)', color: 'var(--bg)', width: '60px', height: '60px', borderRadius: '50%', textDecoration: 'none', transition: 'opacity 0.2s', pointerEvents: 'auto' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                <RiLinkedinFill size={34} />
              </a>
              <a href="https://devpost.com/ghungund?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--text)', color: 'var(--bg)', padding: '1rem 2.25rem', borderRadius: '100px', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem', transition: 'opacity 0.2s', pointerEvents: 'auto' }} onMouseEnter={e => e.currentTarget.style.opacity = 0.7} onMouseLeave={e => e.currentTarget.style.opacity = 1}>
                devpost <RiArrowRightUpLine size={24} />
              </a>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Accordion sections */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        {sections.map(s => (
          <AccordionRow
            key={s.id}
            id={s.id}
            label={s.label}
            content={s.content}
            open={open}
            onToggle={toggle}
          />
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          padding: '2.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
          pointerEvents: 'auto',
          color: 'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        <span>© 2026 Gaurav Hungund</span>
        <span>Built with React + Vite + Framer Motion ✦</span>
        <a
          href="https://gaurav.hungund.com"
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'none', opacity: 0.4, letterSpacing: '0.06em', transition: 'opacity 0.3s' }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.4}
        >
          access file system ↗
        </a>
      </footer>
    </div>
  )
}
