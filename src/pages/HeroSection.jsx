import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Github, ArrowDown } from 'lucide-react';
import profile from '../assets/images/profile.webp';

const HeroSection = () => {

  // Scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const target = section.offsetTop - 80;
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  };



  // Once loading is complete, show HeroSection
  return (
    <section id="home" className="min-h-[calc(100vh-71px)] flex items-center py-16 md:py-24 px-4 md:pl-8 md:pr-8 dark:bg-secondary transition-all duration-300">
      <div className="container max-w-[1400px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-14 md:gap-16">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-5 dark:text-white leading-tight">
              Hi ,I'm <span className="text-primary">Hou Menghor</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-7 dark:text-white">Web Developer</h2>
            <p className="text-xl mb-9 text-muted-foreground max-w-2xl leading-relaxed">
              A passionate web developer focused on creating clean, responsive websites with great user experiences. A recent Computer Science graduate eager to build impactful digital solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* <button
                onClick={handleDownloadCV}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-secondary rounded-md hover:bg-primary-dark transition-colors"
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </button> */}
              <button
                onClick={() => scrollToSection('projects')}
                className="flex items-center gap-2 px-5 py-3 text-base dark:border-darkMode dark:text-white dark:hover:bg-darkMode border border-lightMode/30 text-secondary rounded-md hover:bg-lightMode/5 transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" /> View My Projects
              </button>
              <button
                className="flex items-center gap-2 px-5 py-3 text-base dark:border-darkMode dark:text-white dark:hover:bg-darkMode border border-lightMode/30 text-secondary rounded-md hover:bg-lightMode/5 transition-colors"
              >
                <Link to="https://github.com/houmenghor" target="_blank" className="flex items-center gap-2">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </Link>
              </button>
            </div>
          </motion.div>
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mt-5">
              <div className="w-72 h-72 md:w-[26rem] md:h-[26rem] rounded-full border-4 border-primary overflow-hidden">
                <img src={profile} alt="Menghor Hou" className="object-cover w-full h-full" />
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={() => scrollToSection("about")}
            className="animate-bounce text-primary"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-8 w-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
