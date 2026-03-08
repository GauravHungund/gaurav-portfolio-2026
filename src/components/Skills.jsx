import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'Languages',
    color: 'from-indigo-500 to-primary-600',
    bg: 'bg-indigo-50',
    border: 'border-indigo-100',
    text: 'text-indigo-700',
    skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  },
  {
    category: 'Frontend',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    text: 'text-violet-700',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Redux', 'HTML/CSS'],
  },
  {
    category: 'Backend',
    color: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-50',
    border: 'border-pink-100',
    text: 'text-pink-700',
    skills: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis'],
  },
  {
    category: 'Tools & Cloud',
    color: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-700',
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux', 'Figma'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-20 left-0 w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-60 -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl opacity-60 translate-x-1/2" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">What I Know</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mt-2">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            A collection of technologies and tools I&apos;ve worked with across the full stack.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              {/* Category header */}
              <div className={`inline-flex items-center gap-2 ${group.bg} ${group.border} border rounded-full px-3 py-1 mb-5`}>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${group.color}`} />
                <span className={`text-xs font-semibold ${group.text}`}>{group.category}</span>
              </div>

              {/* Skills */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-2"
              >
                {group.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.08 }}
                    className={`${group.bg} ${group.border} ${group.text} border text-xs font-medium px-3 py-1.5 rounded-full cursor-default`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
