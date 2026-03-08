import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { Link } from 'react-scroll'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

const FloatingBlob = ({ className, initial, animate, transition }) => (
  <motion.div
    initial={initial}
    animate={animate}
    transition={transition}
    className={`absolute rounded-full filter blur-3xl opacity-20 ${className}`}
  />
)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Floating blobs */}
      <FloatingBlob
        className="w-96 h-96 bg-primary-400 -top-20 -right-20"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <FloatingBlob
        className="w-72 h-72 bg-pink-400 bottom-20 -left-20"
        initial={{ x: 0, y: 0 }}
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <FloatingBlob
        className="w-56 h-56 bg-violet-400 top-1/2 left-1/2"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Grid dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-600 text-sm font-medium px-4 py-1.5 rounded-full mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
            </span>
            Available for work
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 font-medium text-lg mb-3"
          >
            Hi there, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight mb-4"
          >
            <span className="gradient-text">Gaurav Hungund</span>
          </motion.h1>

          {/* Typing animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6 h-12"
          >
            <TypeAnimation
              sequence={[
                'Full-Stack Developer',
                2000,
                'React Enthusiast',
                2000,
                'UI/UX Engineer',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-gray-500 text-lg leading-relaxed max-w-xl mb-10"
          >
            I build beautiful, performant, and accessible web experiences with
            modern technologies. Passionate about clean code and delightful UX.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link to="projects" smooth offset={-80} duration={600}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-bg text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-primary-200 cursor-pointer text-base"
              >
                View My Work
              </motion.button>
            </Link>
            <Link to="contact" smooth offset={-80} duration={600}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-border text-primary-600 font-semibold px-8 py-3.5 rounded-full cursor-pointer text-base hover:bg-primary-50 transition-colors"
              >
                Contact Me
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
