import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import React from 'react'

const EducationSection = () => {

  const education = [
    {
      period: "2023 - 2026",
      degree: "Bachelor Degree of Computer Science",
      institution: "Royal University of Phnom Penh (RUPP)",
      description: "Studied core computer science fundamentals including data structures, algorithms, software engineering, database systems, and web development. Built multiple real-world projects using Laravel, ReactJS, VueJS, and PostgreSQL.",
      highlights: ["Web Development", "Database Systems", "Software Engineering", "RESTful API"],
    },
    {
      period: "2019 - 2022",
      degree: "High School Diploma",
      institution: "Kamchay Mear High School",
      description: "Completed high school with a focus on sciences and mathematics. Developed strong analytical thinking and problem-solving skills that laid the foundation for pursuing Computer Science.",
      highlights: ["Mathematics", "Sciences", "Critical Thinking"],
    },
  ]

  return (
    <section id="education" className="py-20 px-4 dark:text-white dark:bg-secondary transition-all duration-300">
      <div className="container mx-auto">
        <motion.h2
          className='section-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>

        <ul className="max-w-3xl mx-auto">
          {education.map((item, index) => {
            const isLast = index === education.length - 1
            return (
              <motion.li
                key={index}
                className="relative flex gap-6"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center flex-shrink-0 z-10 shadow-md shadow-primary/20">
                    <GraduationCap className="h-7 w-7 text-primary" />
                  </div>
                  {!isLast && (
                    <div className="w-[2px] flex-1 bg-gradient-to-b from-primary/60 to-primary/10 my-2 min-h-[40px]" />
                  )}
                </div>

                <div className="pb-12 flex-1 min-w-0">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 tracking-wide">
                    {item.period}
                  </span>
                  <div className="rounded-xl border dark:border-darkMode dark:bg-secondary/60 bg-white p-6 shadow-sm hover:shadow-md hover:border-primary/40 dark:hover:border-primary/40 transition-all duration-300">
                    <h3 className="text-xl font-bold dark:text-white mb-1">{item.degree}</h3>
                    <p className="text-sm text-primary font-medium mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block flex-shrink-0" />
                      {item.institution}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}

export default EducationSection
