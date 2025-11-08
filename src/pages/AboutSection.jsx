import React,{useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import AnimatedProfile from '../components/AnimationProfile'
import { User, Mail, Phone, MapPin, BellIcon as BrandTelegram } from "lucide-react"

const AboutSection = () => {
  

  return (
    <section id='about' className='py-20 px-4 dark:text-white dark:bg-secondary transition-all duration-300'>
      <div className='container mx-auto '>
        <motion.h2
          className='section-title'
          inherit={{opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <motion.div
            inherit={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
              <AnimatedProfile size="sm" showAnimation={false} />
              <div>
                <h3 className="text-xl font-semibold mb-4">Personal Profile</h3>
                <p className="mb-4">
                  I'm Hou Menghor. I was born in Prey Veng province in 2005. My goal is to keep getting better. I'll use
                  what I learn to create something practical for our everyday lives. Specifically, I wish to fulfill my
                  potential as a Full Stack Developer.
                </p>
                <p>
                  I am currently a fourth year IT student at Royal University of Phnom Penh. I looked at a lot of
                  different artifacts and they were all really complicated.
                </p>
              </div>
            </div>
          </motion.div>

          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col justify-start gap-4 h-full"
          > */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
              <div className=" dark:bg-secondary dark:border-darkMode border rounded-2xl p-6">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <User className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Gender:</strong> Male</span>
                  </li>
                  <li className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Email:</strong> menghorhou@gmail.com</span>
                  </li>
                  <li className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Phone:</strong> 087947425</span>
                  </li>
                  <li className="flex items-center">
                    <BrandTelegram className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Telegram:</strong> @houmenghor</span>
                  </li>
                  <li className="flex items-center">
                    <MapPin className="h-5 w-5 mr-3 text-primary" />
                    <span><strong>Address:</strong> Sangkat Tuek Thla, Khan Sen Sok, Phnom Penh</span>
                  </li>
                </ul>
              </div>
            </div>
          {/* </motion.div> */}
        </div>


      </div>
    </section>
  )
}

export default AboutSection
