import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, BellIcon as BrandTelegram } from "lucide-react"

const AboutSection = () => {
  

  return (
    <section id='about' className='py-24 md:py-28 px-4 md:pl-8 md:pr-8 dark:text-white dark:bg-secondary transition-all duration-300'>
      <div className='container max-w-[1400px] mx-auto '>
        <motion.h2
          className='section-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-7 mb-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Personal Profile</h3>
                <p className="text-lg leading-relaxed mb-4">
                  A Computer Science graduate from the Royal University of Phnom Penh (RUPP) with a passion for web development. 
                  Experienced with HTML, CSS, Bootstrap, JavaScript, PHP, Laravel, VueJS, ReactJS, PostgreSQL, and Git. 
                  Demonstrated ability to build responsive and user-friendly websites through hands-on projects. 
                  My dream is to become a professional web developer, and I am fully committed to continuous learning and hard work to achieve this goal.
                </p>
              </div>
            </div>
          </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col justify-start gap-4 h-full"
            >
              <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
              <div className=" dark:bg-secondary dark:border-darkMode border rounded-2xl p-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-primary shrink-0" />
                    <span className="text-lg"><strong>Gender:</strong> Male</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary shrink-0" />
                    <span className="text-lg"><strong>Email:</strong> menghorhou@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
                    <span className="text-lg"><strong>Phone:</strong> 087947425</span>
                  </li>
                  <li className="flex items-center">
                    <BrandTelegram className="h-5 w-5 mr-3 text-primary shrink-0" />
                    <span className="text-lg"><strong>Telegram:</strong> @houmenghor</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 mt-1 text-primary shrink-0" />
                    <span className="text-lg"><strong>Address:</strong> Borey 100 Knong Village, Sangkat Tuek Thla, Khan Sen Sok, Phnom Penh</span>
                  </li>
                </ul>
              </div>
            </motion.div>
        </div>


      </div>
    </section>
  )
}

export default AboutSection
