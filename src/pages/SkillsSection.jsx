import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconCloud } from '../components/ui/IconCloud'

const slugs = [
  "html5", "css", "bootstrap", "javascript", "tailwindcss", "php",
  "laravel", "nuxtdotjs", "vuedotjs", "react", "git", "github",
  "postgresql", "mysql", "figma", "docker", "cloudinary", "telegram", "google", "cloudflare",
]

const images = slugs.map((slug) => `https://cdn.simpleicons.org/${slug}/${slug}`)

const skillGroups = [
  {
    category: "Web Development",
    skills: [
      { label: "HTML",       slug: "html5" },
      { label: "CSS",        slug: "css" },
      { label: "Bootstrap",  slug: "bootstrap" },
      { label: "JavaScript", slug: "javascript" },
      { label: "Tailwindcss", slug: "tailwindcss" },
      { label: "PHP",        slug: "php" },
      { label: "Laravel",    slug: "laravel" },
      { label: "NuxtJs",     slug: "nuxtdotjs" },
      { label: "VueJs",      slug: "vuedotjs" },
      { label: "ReactJs",    slug: "react" },
    ],
  },
  {
    category: "Version Control",
    skills: [
      { label: "Git",    slug: "git" },
      { label: "Github", slug: "github" },
    ],
  },
  {
    category: "API & Integration",
    skills: [
      { label: "RESTful API", slug: null },
      { label: "Bakong KHQR", slug: null },
      { label: "Telegram Bot API", slug: "telegram" },
      { label: "Google OAuth", slug: "google" },
      { label: "Cloudflare Turnstile", slug: "cloudflare" },
      { label: "Cloudinary", slug: "cloudinary" },
    ],
  },
  {
    category: "Database Management",
    skills: [
      { label: "PostgreSQL", slug: "postgresql" },
      { label: "MySQL",      slug: "mysql" },
    ],
  },
  {
    category: "UX/UI Design",
    skills: [
      { label: "Figma", slug: "figma" },
    ],
  },
  {
    category: "Deployment",
    skills: [
      { label: "Docker", slug: "docker" },
    ],
  },
]

const skillPercents = {
  HTML: 85,
  CSS: 80,
  Bootstrap: 75,
  JavaScript: 75,
  Tailwindcss: 80,
  PHP: 75,
  Laravel: 85,
  NuxtJs: 80,
  VueJs: 75,
  ReactJs: 65,
  Git: 80,
  Github: 80,
  "RESTful API": 85,
  "Bakong KHQR": 80,
  "Telegram Bot API": 80,
  "Google OAuth": 75,
  "Cloudflare Turnstile": 75,
  Cloudinary: 80,
  PostgreSQL: 80,
  MySQL: 75,
  Figma: 50,
  Docker: 65,
  "UX/UI Designer": 50,
  ReactJS: 65,
  VueJS: 75,
  GitHub: 80,
}

const CategoryBarItem = ({ group, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 0.45 })
  const [displayPercent, setDisplayPercent] = useState(0)
  const total = group.skills.reduce((sum, skill) => sum + (skillPercents[skill.label] ?? 50), 0)
  const targetPercent = Math.round(total / group.skills.length)
  const skillNames = group.skills.map((skill) => skill.label)
  const skillsText = skillNames.join(', ')

  useEffect(() => {
    if (!isInView) {
      setDisplayPercent(0)
      return
    }

    let frameId
    let startTime
    const duration = 1200

    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setDisplayPercent(Math.round(progress * targetPercent))

      if (progress < 1) frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, targetPercent])

  return (
    <div ref={ref} className="space-y-2">
      <h4 className="text-base md:text-lg font-semibold dark:text-white text-secondary leading-relaxed">
        {group.category}
        <span className="ml-2 text-xs md:text-sm font-medium text-slate-600 dark:text-slate-300">({skillsText})</span>
      </h4>

      <div className="relative h-4 w-full rounded-full bg-slate-300 dark:bg-white/75 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary relative"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${targetPercent}%` } : { width: '0%' }}
          transition={{ duration: 1.1, ease: 'easeOut', delay }}
        >
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] md:text-xs font-semibold text-white leading-none">
            {displayPercent}%
          </span>
        </motion.div>
      </div>
    </div>
  )
}

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 md:py-28 px-4 md:pl-8 md:pr-8 transition-all duration-300 dark:bg-accent dark:text-white">
      <div className="container max-w-[1400px] mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-9 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-semibold">Technical Skills</h3>
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                className="rounded-xl border dark:border-darkMode dark:bg-secondary bg-white p-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.25 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <CategoryBarItem group={group} delay={i * 0.08} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <IconCloud images={images} size={400} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
