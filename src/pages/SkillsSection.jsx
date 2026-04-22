import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { IconCloud } from '../components/ui/IconCloud'

const slugs = [
  "html5", "css", "bootstrap", "javascript", "php",
  "laravel", "vuedotjs", "react", "git", "github",
  "postgresql", "figma",
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
      { label: "PHP",        slug: "php" },
      { label: "Laravel",    slug: "laravel" },
      { label: "VueJS",      slug: "vuedotjs" },
      { label: "ReactJS",    slug: "react" },
    ],
  },
  {
    category: "Version Control",
    skills: [
      { label: "Git",    slug: "git" },
      { label: "GitHub", slug: "github" },
    ],
  },
  {
    category: "API Integration",
    skills: [
      { label: "RESTful API", slug: null },
    ],
  },
  {
    category: "Database",
    skills: [
      { label: "PostgreSQL", slug: "postgresql" },
    ],
  },
  {
    category: "UX/UI Design",
    skills: [
      { label: "Figma", slug: "figma" },
    ],
  },
]

const skillPercents = {
  HTML: 85,
  CSS: 80,
  Bootstrap: 75,
  JavaScript: 70,
  jQuery: 65,
  PHP: 60,
  "UX/UI Designer": 50,
  Tailwindcss: 50,
  Laravel: 50,
  ReactJS: 50,
  VueJS: 55,
  Git: 75,
  GitHub: 72,
  "RESTful API": 80,
  PostgreSQL: 80,
  Figma: 50,
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
