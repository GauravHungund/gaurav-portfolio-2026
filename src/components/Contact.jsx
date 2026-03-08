import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline'

const contactInfo = [
  { icon: EnvelopeIcon, label: 'Email', value: 'gaurav@example.com', href: 'mailto:gaurav@example.com' },
  { icon: PhoneIcon, label: 'Phone', value: '+1 (555) 000-0000', href: 'tel:+15550000000' },
  { icon: MapPinIcon, label: 'Location', value: 'San Francisco, CA', href: null },
]

const socials = [
  { name: 'GitHub', url: 'https://github.com', icon: 'GH' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'LI' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'TW' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary-50 via-violet-50 to-pink-50 rounded-full blur-3xl opacity-60" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-semibold text-sm uppercase tracking-widest">Get In Touch</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-gray-900 mt-2">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Whether you have a project in mind or just want to say hi — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href || undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary-100 hover:bg-primary-50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">{item.label}</p>
                  <p className="text-gray-800 font-semibold text-sm group-hover:text-primary-600 transition-colors">{item.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <div className="flex gap-3 mt-2">
              {socials.map((s) => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-200"
                  title={s.name}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              {['name', 'email'].map((field) => (
                <div key={field} className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-gray-700 capitalize">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    required
                    placeholder={field === 'name' ? 'John Doe' : 'john@example.com'}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project or just say hi!"
                className="px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all resize-none"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-bg text-white font-semibold py-3.5 rounded-xl shadow-md shadow-primary-200 text-sm transition-all"
            >
              {sent ? '✓ Message Sent!' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
