import React from 'react'
import { motion } from 'framer-motion'
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

const SkillsSection = () => {
  return (
    <section id="skills" className="py-20 px-4 transition-all duration-300 dark:bg-accent dark:text-white">
      <div className="container mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold">Technical Skills</h3>
            {skillGroups.map((group, i) => (
              <motion.div
                key={i}
                className="rounded-xl border dark:border-darkMode dark:bg-secondary bg-white p-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-200"
                    >
                      {skill.slug && (
                        <img
                          src={`https://cdn.simpleicons.org/${skill.slug}`}
                          alt={skill.label}
                          className="w-4 h-4 object-contain"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      )}
                      <span className="text-xs font-medium text-primary">{skill.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex items-center justify-center w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <IconCloud images={images} size={550} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
