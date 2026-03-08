import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const techStack = [
  'React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB',
]

const stats = [
  { label: 'Projects Built', value: '20+' },
  { label: 'Technologies', value: '15+' },
  { label: 'Cups of Coffee', value: '∞' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="section-padding bg-gray-50 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-pink-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-60" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">About Me</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mt-2">
            Who I <span className="gradient-text">Am</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image/Avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Decorative rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary-200"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border-2 border-dashed border-pink-200"
              />

              {/* Avatar circle */}
              <div className="absolute inset-8 rounded-full gradient-bg flex items-center justify-center shadow-2xl shadow-primary-200">
                <span className="font-display font-extrabold text-6xl text-white">GH</span>
              </div>

              {/* Tech stack floating chips */}
              {techStack.map((tech, i) => {
                const angle = (i / techStack.length) * 2 * Math.PI
                const r = 165
                const x = r * Math.cos(angle - Math.PI / 2)
                const y = r * Math.sin(angle - Math.PI / 2)
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <span className="glass shadow-sm text-xs font-semibold text-gray-700 px-3 py-1 rounded-full whitespace-nowrap border border-white">
                      {tech}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-display font-bold text-2xl text-gray-900 mb-4">
              Building the web, one component at a time.
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              I&apos;m a passionate Full-Stack Developer with experience building scalable web
              applications. I love bridging the gap between beautiful design and robust engineering.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              When I&apos;m not coding, I&apos;m exploring new frameworks, contributing to open source,
              and leveling up my problem-solving skills through competitive programming and hackathons.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  className="text-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <p className="font-display font-extrabold text-2xl gradient-text">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 gradient-bg text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-primary-200 text-sm"
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
