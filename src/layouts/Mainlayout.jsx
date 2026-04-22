import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../pages/HeroSection';
import AboutSection from '../pages/AboutSection';
import SkillsSection from '../pages/SkillsSection';
import EducationSection from '../pages/EducationSection';
import ProjectsSection from '../pages/ProjectsSection';
import ContactSection from '../pages/ContactSection';

const Mainlayout = () => {
  return (
    <main className="app-shell">
      <Header />

      <div className="app-content">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
};

export default Mainlayout;
