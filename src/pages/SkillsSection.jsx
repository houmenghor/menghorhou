import React,{useState, useEffect} from 'react'
import { motion } from 'framer-motion'

const SkillsSection = () => {



  const skills = [
    { name: "Laravel", level: 90 },
    { name: "HTML", level: 85 },
    { name: "CSS", level: 80 },
    { name: "Bootstrap", level: 75 },
    { name: "PHP", level: 60 },
    { name : "UX/UI Designer", level: 50},
    { name: "JavaScript", level: 50 },
    { name: "VueJS", level: 50 },
  ];

  const languages = [
    { name: "Khmer", level: 100 },
    { name: "English", level: 60 },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
            <div className=" dark:border-darkMode rounded-lg border dark:bg-secondary">
              <div className="p-6">
                <div className="space-y-6">
                  {skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full bg-lightMode/5 dark:bg-darkMode rounded-full h-2">
                        <motion.div
                          className="skill-bar bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">Languages</h3>
            <div className=" dark:bg-secondary dark:border-darkMode rounded-lg border mb-8">
              <div className="p-6">
                <div className="space-y-6">
                  {languages.map((language, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{language.name}</span>
                        <span>{language.level}%</span>
                      </div>
                      <div className="w-full bg-lightMode/5 dark:bg-darkMode rounded-full h-2">
                        <motion.div
                          className="skill-bar bg-primary h-2 rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${language.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.1 * index }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Interests & Hobbies</h3>
            <div className=" dark:bg-secondary dark:border-darkMode rounded-lg border">
              <div className="p-6">
                <ul className="list-disc list-inside space-y-2">
                  <li>Learning new technologies</li>
                  <li>Coding</li>
                  <li>Design</li>
                  <li>Listening to music</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
