import { Link } from 'react-scroll'

const navLinks = [
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Contact', to: 'contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-white">
      {/* Gradient accent line */}
      <div className="h-px gradient-bg" />

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="font-display font-extrabold text-lg gradient-text">GH.</span>
          <p className="text-gray-500 text-xs mt-1">Built with React + Framer Motion ✦</p>
        </div>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              offset={-80}
              duration={600}
              className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <p className="text-gray-500 text-xs">© {year} Gaurav Hungund</p>
      </div>
    </footer>
  )
}
