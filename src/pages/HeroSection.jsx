import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Download, FileText, Github, ArrowDown } from 'lucide-react';
import AnimatedProfile from '../components/AnimationProfile';

const HeroSection = () => {

  // Scroll to a specific section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const target = section.offsetTop - 80;
      const start = window.scrollY;
      const distance = target - start;
      const duration = 700;
      let startTime = null;

      const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + distance * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    }
  };



  // Once loading is complete, show HeroSection
  return (
    <section id="home" className="min-h-screen flex items-center pb-[120px] px-4 dark:bg-secondary transition-all duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 dark:text-white">
              Hi everyone, I'm <span className="text-primary">Hou Menghor</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 dark:text-white">Web Developer</h2>
            <p className="text-lg mb-8 text-muted-foreground">
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
                className="flex items-center gap-2 px-4 py-2 dark:border-darkMode dark:text-white dark:hover:bg-darkMode border border-lightMode/30 text-secondary rounded-md hover:bg-lightMode/5 transition-colors"
              >
                <FileText className="mr-2 h-4 w-4" /> View My Projects
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 dark:border-darkMode dark:text-white dark:hover:bg-darkMode border border-lightMode/30 text-secondary rounded-md hover:bg-lightMode/5 transition-colors"
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
            <AnimatedProfile size="lg" />
          </motion.div>
        </div>
        <div className="flex justify-center mt-16">
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
