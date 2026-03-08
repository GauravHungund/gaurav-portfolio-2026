import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { projectsData } from '../data/projectsData'

// Arrow SVG — 45 degree northeast
function ArrowSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

// ── Masonry grid CSS injected once ──────────────────────────────────────────
const masonryCSS = `
  .masonry-grid {
    columns: 3;
    column-gap: 1.5rem;
  }
  @media (max-width: 1024px) { .masonry-grid { columns: 2; } }
  @media (max-width: 640px)  { .masonry-grid { columns: 1; } }

  .masonry-item {
    break-inside: avoid;
    margin-bottom: 1.5rem;
  }
`

// ── Single masonry card ─────────────────────────────────────────────────────
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const allTech = project.techStack
    ? project.techStack.flatMap(cat => cat.items).slice(0, 5)
    : []

  return (
    <div className="masonry-item">
      <Link to={`/projects/${project.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <motion.div
          ref={cardRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            position: 'relative',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            cursor: hovered ? 'none' : 'default',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Image */}
          <div style={{ width: '100%', aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
            <motion.img
              src={project.coverImage}
              alt={project.title}
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            {/* Always-visible bottom bar */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '0.85rem 1rem',
              background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              zIndex: 1,
            }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{project.title}</span>
              {project.award && (
                <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', padding: '0.2rem 0.55rem', borderRadius: '100px', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                  Won
                </span>
              )}
            </div>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '1.5rem',
              pointerEvents: 'none',
            }}
          >
            <div style={{ marginBottom: '0.75rem' }}>
              <p style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text)', marginBottom: '0.5rem' }}>
                {project.title}
              </p>
              {project.award && (
                <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text)', border: '1px solid var(--border)', padding: '0.2rem 0.6rem', borderRadius: '100px', marginBottom: '0.75rem', display: 'inline-block' }}>
                  {project.award}
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: '1rem' }}>
              {project.subtitle}
            </p>
            {allTech.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {allTech.map(t => (
                  <span key={t} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', border: '1px solid var(--border)', borderRadius: '100px', color: 'var(--text-muted)', backgroundColor: 'var(--chip-bg)' }}>
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.div>

          {/* Cursor arrow dot */}
          {hovered && (
            <motion.div
              style={{
                position: 'absolute',
                top: cursor.y,
                left: cursor.x,
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 10,
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'var(--text)',
                color: 'var(--bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <ArrowSVG />
            </motion.div>
          )}
        </motion.div>
      </Link>
    </div>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────
export default function ProjectsBlog() {
  return (
    <>
      <style>{masonryCSS}</style>
      <div style={{ padding: '3rem clamp(1.5rem, 5vw, 4rem)', backgroundColor: 'var(--bg)' }}>
        <div className="masonry-grid">
          {projectsData.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}
