import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

const projects = [
  {
    title: 'Voice Coach AI',
    desc: 'An AI-powered voice coaching app that analyzes speech patterns, provides real-time feedback, and tracks progression using async background processing.',
    tags: ['React', 'FastAPI', 'Python', 'WebSockets', 'OpenAI'],
    gradient: 'from-indigo-500 to-violet-600',
    glow: 'shadow-indigo-200',
    live: '#',
    github: '#',
  },
  {
    title: 'Memory Garden',
    desc: 'A visual AI memory tool powered by Reka Vision and Neo4j. Upload photos, extract entities, and explore a knowledge graph of your memories.',
    tags: ['React', 'Neo4j', 'Reka Vision', 'FastAPI', 'Graph DB'],
    gradient: 'from-violet-500 to-pink-600',
    glow: 'shadow-violet-200',
    live: '#',
    github: '#',
  },
  {
    title: 'Next Hackathon App',
    desc: 'A collaborative hackathon platform with real-time project syncing, team formation, and submission management built for speed.',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
    gradient: 'from-pink-500 to-rose-600',
    glow: 'shadow-pink-200',
    live: '#',
    github: '#',
  },
  {
    title: 'Portfolio 2.0',
    desc: 'This very portfolio — built with React, Tailwind CSS, and Framer Motion. Smooth animations, glassmorphism design, and fully responsive.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    gradient: 'from-amber-500 to-orange-600',
    glow: 'shadow-amber-200',
    live: '#',
    github: '#',
  },
  {
    title: 'AI Study Assistant',
    desc: 'Smart quiz and flashcard generator using LLMs. Paste any text and get personalized MCQs, summaries, and spaced repetition schedules.',
    tags: ['Python', 'LangChain', 'React', 'OpenAI'],
    gradient: 'from-teal-500 to-cyan-600',
    glow: 'shadow-teal-200',
    live: '#',
    github: '#',
  },
  {
    title: 'Expense Tracker Pro',
    desc: 'Full-stack expense tracking with category analytics, budget alerts, and beautiful data visualizations. Mobile-first design.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'D3.js'],
    gradient: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-200',
    live: '#',
    github: '#',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-padding bg-gray-50 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 bg-primary-50 rounded-full blur-3xl opacity-50" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">My Work</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            A selection of projects I&apos;ve built — from AI-powered tools to full-stack web apps.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:${project.glow} transition-shadow duration-300 flex flex-col`}
            >
              {/* Gradient top banner */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />

              <div className="p-6 flex flex-col flex-1">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-4 shadow-md`}>
                  <CodeBracketIcon className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{project.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <CodeBracketIcon className="w-4 h-4" /> Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                  >
                    <ArrowTopRightOnSquareIcon className="w-4 h-4 text-primary-500" /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
