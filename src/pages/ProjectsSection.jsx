import React,{useState, useEffect} from "react"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import portfolio from '../assets/images/portfolio.png'
import nike_shoes from '../assets/images/shoes.png'
import uxui from '../assets/images/uxui.png'

const ProjectsSection = () => {

  

  const projects = [
    {
      title: "UX/UI Design Project",
      description: "Interactive prototype design for a modern application interface created in Figma.",
      image: uxui,
      technologies: ["Figma", "UI Design", "UX Design", "Prototyping"],
      liveUrl: "https://www.figma.com/proto/NXf2Hm2tQJFf7VwUFsVSD9/Portfolio?page-id=0%3A1&node-id=5-55&viewport=12%2C435%2C0.33&t=NMZ3JVSpVPDswoUD-1&scaling=min-zoom&content-scaling=fixed",
      githubUrl: "https://github.com/houmenghor"
    }
  ]

  return (
    <section id="projects" className="py-20 px-4 dark:bg-accent transition-all duration-300">
      <div className="container mx-auto">
        <motion.h2
          className="section-title dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <div className="overflow-hidden h-full flex flex-col rounded-lg border dark:bg-secondary dark:border-darkMode transition-all duration-300">
                <div className="relative h-48 w-full">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-4 dark:text-white">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border hover:bg-lightMode/5 dark:border-darkMode dark:hover:bg-darkMode rounded-md text-sm"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary text-white dark:text-black rounded-md text-sm hover:bg-primary/90 transition"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
