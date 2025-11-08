import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FileText, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const isHomePage = location.pathname === "/";

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Education', href: 'education' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      if (isHomePage) {
        const sections = document.querySelectorAll("section[id]");
        const scrollPosition = window.scrollY + 100;

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute("id") || "";

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionId);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);

    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 left-0 w-full dark:bg-secondary z-50 h-[71px] p-[16px] transition-all duration-300 
                ${isScrolled ? 'backdrop-blur-md bg-opacity-30 dark:bg-secondary/80 shadow-md' : 'bg-transparent'}`}>
      <nav className='container mx-auto'>
        <div className='flex h-[40px] items-center justify-between'>
          {/* Logo */}
          <NavLink to='/' className='flex items-center'>
            <span className='text-[24px] text-primary font-bold'>Hou Menghor</span>
          </NavLink>

          {/* Navigation */}
          <div className='hidden md:flex items-center'>
            <ul className="flex space-x-6 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`hover:text-primary transition-colors ${activeSection === link.href && isHomePage ? "text-primary font-bold " : "dark:text-white"}`}
                >
                  {link.name}
                </button>
              ))}

              {/* <Link onClick={() => window.location.href = '/cv'} className="flex items-center hover:text-primary transition-colors dark:text-white dark:hover:text-primary">
                <FileText className="mr-1 h-4 w-4" /> CV
              </Link> */}

              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="ml-2 p-2 rounded-md hover:bg-secondary/5 dark:hover:bg-gray-700 transition-colors"
            >
              {isMenuOpen ? <X className="h-4 w-4 dark:text-white" /> : <Menu className="h-4 w-4 dark:text-white" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className={`absolute top-[70px] left-0 w-full bg-white dark:bg-secondary dark:border-darkMode transition-all duration-300 border-t-2 md:hidden 
            ${isScrolled ? 'backdrop-blur-md dark:bg-secondary shadow-md' : 'bg-transparent'}`}>
              <div className="px-4 py-4">
                <nav className="flex flex-col space-y-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.name}
                      onClick={() => {
                        scrollToSection(link.href);
                        setIsMenuOpen(false); // Close menu after click
                      }}
                      className={`hover:text-primary transition-colors py-2 text-left ${activeSection === link.href && isHomePage
                          ? "text-primary font-medium"
                          : "text-secondary dark:text-white"
                        }`}
                    >
                      {link.name}
                    </button>
                  ))}

                  {/* <Link
                    to="/cv"
                    className="flex items-center hover:text-primary transition-colors py-2 text-secondary dark:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FileText className="mr-2 h-4 w-4" /> View CV
                  </Link> */}
                </nav>
              </div>
            </div>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Header;
