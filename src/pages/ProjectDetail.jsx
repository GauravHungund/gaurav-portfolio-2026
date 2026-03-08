import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projectsData } from '../data/projectsData'
import { useEffect } from 'react'

// Section heading helper
function SectionHeading({ children }) {
  return (
    <h2 style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 600 }}>
      {children}
    </h2>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projectsData.find(p => p.slug === slug)

  useEffect(() => {
    // Slight delay so Lenis and React Router don't fight over the scroll position
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 50)
  }, [slug])

  if (!project) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg)', color: 'var(--text)', fontFamily: "'Instrument Sans', sans-serif" }}>
      <p>Project not found.</p>
      <Link to="/#projects" style={{ color: 'var(--accent)', marginLeft: '1rem' }}>Go Home</Link>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      {/* Sticky Nav */}
      <header style={{ padding: '2rem clamp(1.5rem, 5vw, 4rem)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'var(--bg)', backdropFilter: 'blur(12px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/#projects" style={{ fontSize: '1.25rem', fontWeight: 700, textDecoration: 'none', color: 'var(--text)', letterSpacing: '-0.02em' }}>GH.</Link>
          <Link to="/#projects" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
            Back to Portfolio
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem clamp(1.5rem, 5vw, 4rem)' }}>

        {/* ── Hero ── */}
        <div style={{ marginBottom: '4rem', maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 600 }}>
              {project.category} · {project.year}
            </span>
            {project.hackathon && (
              <span style={{ fontSize: '0.75rem', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 500 }}>
                {project.hackathon}
              </span>
            )}
            {project.award && (
              <span style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)', fontSize: '0.75rem', fontWeight: 700, padding: '0.3rem 0.8rem', borderRadius: '100px', letterSpacing: '0.05em' }}>
                {project.award}
              </span>
            )}
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem', color: 'var(--text)' }}>
            {project.title}
          </h1>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', lineHeight: 1.4, color: 'var(--text-muted)', fontWeight: 500 }}>
            {project.tagline || project.subtitle}
          </p>
        </div>

        {/* ── Cover Image ── */}
        <div style={{ marginBottom: '6rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: '#111' }}>
          <img src={project.coverImage} alt={project.title} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
        </div>

        {/* ── Two-col: Overview + Tech ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '6rem', marginBottom: '6rem' }}>
          {/* Left: Overview + Features */}
          <div>
            <SectionHeading>Overview</SectionHeading>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '3rem' }}>
              {project.overview}
            </p>

            {project.features?.length > 0 && (
              <>
                <SectionHeading>Key Features</SectionHeading>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {project.features.map((f, i) => (
                    <li key={i} style={{ fontSize: '1.05rem', color: 'var(--text)', display: 'flex', gap: '0.9rem', alignItems: 'flex-start', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>—</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right: Tech Stack + Links */}
          <div>
            <div style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '2.5rem', marginBottom: '2rem' }}>
              <SectionHeading>Tech Stack</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {project.techStack?.map(stack => (
                  <div key={stack.category}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.6rem', fontWeight: 500, letterSpacing: '0.04em' }}>{stack.category}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {stack.items.map(item => (
                        <span key={item} style={{ fontSize: '0.85rem', backgroundColor: 'var(--chip-bg)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '100px', padding: '0.35rem 0.8rem' }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.links?.live && (
                  <a href={project.links.live} target="_blank" rel="noreferrer" style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)', textAlign: 'center', padding: '0.9rem', borderRadius: '12px', fontWeight: 700, textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    View Live Project
                  </a>
                )}
                {project.devpostUrl && (
                  <a href={project.devpostUrl} target="_blank" rel="noreferrer" style={{ backgroundColor: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', textAlign: 'center', padding: '0.9rem', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    View on Devpost
                  </a>
                )}
                {project.links?.github && (
                  <a href={project.links.github} target="_blank" rel="noreferrer" style={{ backgroundColor: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', textAlign: 'center', padding: '0.9rem', borderRadius: '12px', fontWeight: 600, textDecoration: 'none', fontSize: '0.88rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    View Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── System Flow Table ── */}
        {project.systemFlow?.length > 0 && (
          <div style={{ marginBottom: '6rem' }}>
            <SectionHeading>System Flow</SectionHeading>
            <div style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', backgroundColor: 'var(--card-bg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '3.5rem 1fr 2fr', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--chip-bg)' }}>
                <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Step</div>
                <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Component</div>
                <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Responsibility</div>
              </div>
              {project.systemFlow.map(({ step, component, responsibility }) => (
                <div key={step} style={{ display: 'grid', gridTemplateColumns: '3.5rem 1fr 2fr', borderBottom: '1px solid var(--border)' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--chip-bg)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <div style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>{step}</div>
                  <div style={{ padding: '1rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>{component}</div>
                  <div style={{ padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{responsibility}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Engineering Highlights ── */}
        {project.highlights?.length > 0 && (
          <div style={{ marginBottom: '6rem' }}>
            <SectionHeading>Engineering Highlights</SectionHeading>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {project.highlights.map((h, i) => {
                const tag = h.split(':')[0]
                const body = h.slice(tag.length + 1).trim()
                return (
                  <div key={i} style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '1.75rem' }}>
                    <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' }}>{tag}</p>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--text)' }}>{body}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Gallery ── */}
        {project.images?.length > 1 && (
          <div style={{ marginBottom: '6rem' }}>
            <SectionHeading>Gallery</SectionHeading>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {project.images.slice(1).map((img, i) => (
                <div key={i}>
                  <div style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: '#111', marginBottom: '1rem' }}>
                    <img src={img.src} alt={img.caption} style={{ width: '100%', height: 'auto', display: 'block' }} loading="lazy" />
                  </div>
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{img.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
    </motion.div>
  )
}
