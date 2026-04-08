import { motion } from 'framer-motion'
import { Mail, Phone, Github, MapPin, Send, Linkedin, CheckCircle, XCircle, Loader } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.message) return
    setLoading(true)
    setStatus(null)

    const text = `📬 New message from portfolio\n\n👤 Name: ${form.name}\n📧 Email: ${form.email || 'N/A'}\n💬 Message: ${form.message}`

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "menghorhou@gmail.com",
      href: "mailto:menghorhou@gmail.com",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: "087947425",
      href: "tel:087947425",
    },
    {
      icon: <FontAwesomeIcon icon={faTelegram} className="h-6 w-6" />,
      label: "Telegram",
      value: "@houmenghor",
      href: "https://t.me/houmenghor",
    },
    {
      icon: <Github className="h-6 w-6" />,
      label: "GitHub",
      value: "houmenghor",
      href: "https://github.com/houmenghor",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      label: "LinkedIn",
      value: "Menghor Hou",
      href: "https://www.linkedin.com/in/menghor-hou-6a978733a/",
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      label: "Address",
      value: "Borey 100 Knong Village, Sangkat Tuek Thla, Khan Sen Sok, Phnom Penh",
      href: "#",
    },
  ]



  return (
    <section id="contact" className="py-20 px-4 dark:bg-secondary dark:text-white transition-all duration-300">
      <div className="container mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Contact Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl p-6 border dark:border-darkMode">
              <h3 className="text-xl font-semibold mb-6">Get In Touch</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border dark:border-darkMode dark:bg-secondary"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md border dark:border-darkMode dark:bg-secondary"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-md border dark:border-darkMode dark:bg-secondary"
                    placeholder="Your Message"
                    rows={4}
                  />
                </div>

                {status === 'success' && (
                  <div className="flex items-center gap-2 text-green-500 text-sm">
                    <CheckCircle className="h-4 w-4" /> Message sent successfully!
                  </div>
                )}
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <XCircle className="h-4 w-4" /> Failed to send. Please try again.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full justify-center flex bg-primary text-white dark:text-black p-3 rounded-md transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <><Loader className="mr-2 h-4 w-4 mt-0.5 animate-spin" /> Sending...</>
                    : <><Send className="mr-2 h-4 w-4 mt-0.5" /> Send Message</>
                  }
                </button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className=" rounded-xl p-6 border dark:border-darkMode">
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-primary">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{item.label}</h4>
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
