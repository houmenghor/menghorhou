import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import shoes from '../assets/images/shoes.png'

const ProjectsSection = () => {
  const sliderRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const projects = [
    {
      title: "Book Store API",
      description: "A RESTful API built with Laravel 12 for a full-featured bookstore system. Covers user authentication with OTP email verification, product & category management, order processing with stock validation, and QR-based payment integration via Bakong KHQR.",
      image: "https://book-store-api-images.s3.ap-southeast-1.amazonaws.com/profiles/book-store-logo.png",
      technologies: ["Laravel", "PHP", "PostgreSQL", "RESTful API", "Bakong KHQR"],
      liveUrl: "https://bookstoreapi.sainnovationresearchlab.com/",
      githubUrl: "https://github.com/codehub-devkh/book.store.api",
      status: "in-progress",
    },
    {
      title: "SAIRL Blog API",
      description: "A RESTful API built with Laravel 12 for the Software and Application Innovation Research Lab (SAIRL) blog platform at RUPP. Features multi-method authentication (Passport OAuth2, email OTP, social login), role-based access control, blog post management with categories and tags, research team management with author request workflows, announcement broadcasting, and AWS S3 file storage.",
      image: "https://sairl-demo.s3.ap-southeast-1.amazonaws.com/profiles/sairl.jpg",
      technologies: ["Laravel", "PHP", "PostgreSQL", "RESTful API", "Laravel Passport", "AWS S3"],
      liveUrl: null,
      githubUrl: "https://github.com/codehub-devkh/sairl.api",
      status: "in-progress",
    },
    {
      title: "Nike Shoes Website",
      description: "A responsive static website showcasing Nike shoes products with modern UI design.",
      image: shoes,
      technologies: ["HTML", "CSS", "JavaScript"],
      liveUrl: "https://houmenghor.github.io/Nike-Shoes/",
      githubUrl: "https://github.com/houmenghor/Nike-Shoes",
      status: "completed",
    }
  ]

  const enableDesktopScroll = projects.length > 3
  const showDesktopScrollHint = enableDesktopScroll && activeIndex < projects.length - 1

  const updateActiveIndex = () => {
    const slider = sliderRef.current
    if (!slider) return

    const cards = slider.querySelectorAll("[data-project-card]")
    if (cards.length === 0) return

    const viewportCenter = slider.scrollLeft + slider.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const distance = Math.abs(cardCenter - viewportCenter)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
  }

  const scrollToProject = (index) => {
    const slider = sliderRef.current
    if (!slider) return

    const cards = slider.querySelectorAll("[data-project-card]")
    const targetCard = cards[index]
    if (!targetCard) return

    const targetLeft = targetCard.offsetLeft - (slider.clientWidth - targetCard.clientWidth) / 2
    slider.scrollTo({ left: targetLeft, behavior: "smooth" })
  }

  useEffect(() => {
    updateActiveIndex()

    const slider = sliderRef.current
    if (!slider) return undefined

    slider.addEventListener("scroll", updateActiveIndex)
    window.addEventListener("resize", updateActiveIndex)

    return () => {
      slider.removeEventListener("scroll", updateActiveIndex)
      window.removeEventListener("resize", updateActiveIndex)
    }
  }, [])

  return (
    <section id="projects" className="py-24 md:py-28 px-4 md:pl-8 md:pr-8 dark:bg-accent transition-all duration-300">
      <div className="container max-w-[1400px] mx-auto">
        <motion.h2
          className="section-title dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          Projects Experience
        </motion.h2>

        <div>
          <div className="relative">
            <div
              ref={sliderRef}
              className={`flex gap-4 overflow-x-auto overscroll-x-contain pb-2 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${enableDesktopScroll ? "md:gap-6" : "md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:overflow-visible md:snap-none"}`}
              style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
            >
              <div aria-hidden="true" className="w-[6%] shrink-0 md:hidden" />
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  data-project-card
                  className={`w-[88%] shrink-0 snap-center ${enableDesktopScroll ? "md:w-[32%]" : "md:w-full"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
              <div className="group relative h-full overflow-hidden rounded-2xl border border-darkMode/70 bg-secondary/95 shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(0,0,0,0.45)]">
                <div className="relative h-60 w-full overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2.5 py-1 rounded-full border border-primary/30 bg-secondary/75 text-primary text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2 text-white">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-2 border border-primary/45 bg-secondary/75 hover:bg-primary/15 rounded-md text-xs"
                      >
                        <Github className="mr-1.5 h-3.5 w-3.5" />
                        GitHub
                      </a>

                      {project.status === "in-progress" ? (
                        <span className="inline-flex items-center px-3 py-2 bg-primary/25 text-primary rounded-md text-xs cursor-not-allowed opacity-80">
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Live Demo
                        </span>
                      ) : (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-2 bg-primary text-secondary rounded-md text-xs hover:bg-primary/90 transition"
                        >
                          <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                  <span
                    className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shadow transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 ${project.status === "in-progress"
                        ? "bg-yellow-400/90 text-yellow-900"
                        : "bg-emerald-400/90 text-emerald-900"
                      }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${project.status === "in-progress" ? "bg-yellow-700 animate-pulse" : "bg-emerald-700"}`} />
                    {project.status === "in-progress" ? "In Progress" : "Completed"}
                  </span>
                </div>

                <div className="p-6 flex-grow">
                  <h3 className="text-2xl font-semibold dark:text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">{project.description}</p>
                </div>
              </div>
              </motion.div>
              ))}
              <div aria-hidden="true" className="w-[6%] shrink-0 md:hidden" />
            </div>

            {showDesktopScrollHint && (
              <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 items-center justify-end bg-gradient-to-l from-accent via-accent/85 to-transparent md:flex lg:w-36">
                <span className="mr-2 rounded-full border border-primary/30 bg-secondary/70 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                  Scroll for more
                </span>
              </div>
            )}
          </div>

          {projects.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
              {projects.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToProject(index)}
                  aria-label={`Go to project ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === index ? "w-6 bg-primary" : "w-2.5 bg-primary/35"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
