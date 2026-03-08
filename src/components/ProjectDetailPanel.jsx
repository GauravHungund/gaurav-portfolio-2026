import { motion } from 'framer-motion'

export default function ProjectDetailPanel({ project, onClose }) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9998, backdropFilter: 'blur(4px)' }}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(560px, 100vw)',
          backgroundColor: project.bg,
          zIndex: 9999,
          overflowY: 'auto',
          padding: 'clamp(2rem, 6vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          fontFamily: "'Instrument Sans', sans-serif",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            alignSelf: 'flex-end',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '1.1rem',
            flexShrink: 0,
            transition: 'border-color 0.2s, color 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = project.accent; e.currentTarget.style.color = project.accent }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
        >
          ✕
        </button>

        {/* Header */}
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.75rem' }}>
            {project.year} · {project.category}
          </p>
          <h2 style={{ fontWeight: 700, fontSize: 'clamp(2rem, 6vw, 3.5rem)', color: project.accent, lineHeight: 1.1, letterSpacing: '-0.03em', textTransform: 'uppercase' }}>
            {project.title}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

        {/* Tagline */}
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontStyle: 'italic' }}>
          {project.tagline}
        </p>

        {/* Description */}
        <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
          {project.desc}
        </p>

        {/* Tech stack */}
        <div>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '0.75rem' }}>
            Tech Stack
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map(t => (
              <span key={t} style={{ fontSize: '0.75rem', color: project.accent, border: `1px solid ${project.accent}40`, borderRadius: '100px', padding: '0.35rem 0.85rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '0.85rem', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'all 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          >
            View Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            style={{ flex: 1, backgroundColor: project.accent, borderRadius: '12px', padding: '0.85rem', textAlign: 'center', color: project.bg, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity 0.25s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
          >
            Live Demo →
          </a>
        </div>
      </motion.div>
    </>
  )
}
