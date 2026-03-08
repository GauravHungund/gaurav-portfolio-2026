import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onDone }) {
  const [visible, setVisible] = useState(true)
  const letters = ['G', 'H', '.']
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Type letters one by one
    if (count < letters.length) {
      const t = setTimeout(() => setCount(c => c + 1), 220)
      return () => clearTimeout(t)
    }
    // After letters done, wait then exit
    const exit = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 600)
    }, 700)
    return () => clearTimeout(exit)
  }, [count]) // eslint-disable-line

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#0a0a0a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.5rem',
            fontFamily: "'Instrument Sans', sans-serif",
          }}
        >
          {/* Animated name */}
          <div style={{ display: 'flex', gap: '0.05em', overflow: 'hidden' }}>
            {letters.map((l, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={count > i ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 7rem)',
                  fontWeight: 800,
                  color: '#FDFBD4',
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  display: 'block',
                }}
              >
                {l}
              </motion.span>
            ))}
          </div>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--accent)' }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
