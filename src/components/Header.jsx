import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, House, UserRound, Code2, GraduationCap, BriefcaseBusiness, Mail, ChevronLeft } from 'lucide-react';
import profile from '../assets/images/profile.webp';

const Header = () => {
  const currentYear = new Date().getFullYear();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    return localStorage.getItem("sidebar-collapsed") === "true";
  });
  const [isSidebarAnimating, setIsSidebarAnimating] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("home");
  const isHomePage = location.pathname === "/";
  const activeSectionRef = useRef("home");
  const sidebarAnimTimerRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: 'home', icon: House },
    { name: 'About', href: 'about', icon: UserRound },
    { name: 'Skills', href: 'skills', icon: Code2 },
    { name: 'Education', href: 'education', icon: GraduationCap },
    { name: 'Projects', href: 'projects', icon: BriefcaseBusiness },
    { name: 'Contact', href: 'contact', icon: Mail },
  ];

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      const nextScrolled = window.scrollY > 10;
      setIsScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

      if (!isHomePage) return;

      const sections = Array.from(document.querySelectorAll("section[id]"));
      if (sections.length === 0) return;

      const offset = window.innerWidth >= 1024 ? 130 : 95;
      let currentSection = sections[0].getAttribute("id") || "home";

      for (const section of sections) {
        const sectionId = section.getAttribute("id") || "";
        if (!sectionId) continue;

        const top = section.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentSection = sectionId;
        }
      }

      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 12;
      if (nearBottom) {
        const lastSectionId = sections[sections.length - 1].getAttribute("id");
        if (lastSectionId) currentSection = lastSectionId;
      }

      if (currentSection !== activeSectionRef.current) {
        activeSectionRef.current = currentSection;
        setActiveSection(currentSection);
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveSection();
        ticking = false;
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("hashchange", handleScroll);
    };
  }, [isHomePage]);

  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", isSidebarCollapsed);
    localStorage.setItem("sidebar-collapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  useEffect(() => {
    return () => {
      if (sidebarAnimTimerRef.current) {
        clearTimeout(sidebarAnimTimerRef.current);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false);
    activeSectionRef.current = sectionId;
    setActiveSection(sectionId);

    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = window.innerWidth >= 1024 ? 20 : 80;
        const target = section.offsetTop - offset;
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    if (isSidebarAnimating) return;

    setIsSidebarAnimating(true);
    setIsSidebarCollapsed((prev) => !prev);

    if (sidebarAnimTimerRef.current) {
      clearTimeout(sidebarAnimTimerRef.current);
    }

    sidebarAnimTimerRef.current = setTimeout(() => {
      setIsSidebarAnimating(false);
    }, 320);
  };

  return (
    <>
      <aside className={`hidden lg:flex fixed top-0 left-0 h-screen z-50 border-r transition-[width] duration-300 ease-in-out will-change-[width] ${isSidebarCollapsed ? "w-24" : "w-72"} bg-[#03182E] border-[#0d2c4e]`}>
        <button
          aria-label="Sidebar control"
          onClick={toggleSidebar}
          disabled={isSidebarAnimating}
          className={`absolute -right-3 top-28 h-7 w-7 rounded-full bg-primary text-secondary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform duration-200 ${isSidebarAnimating ? "cursor-not-allowed opacity-70" : "hover:scale-105"}`}
        >
          <ChevronLeft className={`h-3.5 w-3.5 transition-transform duration-300 ${isSidebarCollapsed ? "rotate-180" : ""}`} />
        </button>

        <div className="flex w-full flex-col">
          <div className={`text-center border-b border-primary/20 transition-[padding] duration-300 ease-in-out ${isSidebarCollapsed ? "px-3 pt-6 pb-5" : "px-6 pt-8 pb-7"}`}>
            <div className={`mx-auto rounded-full border-2 border-primary/70 p-1.5 shadow-[0_0_0_1px_rgba(0,187,255,0.2)] transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "h-12 w-12" : "h-24 w-24"}`}>
              <img
                src={profile}
                alt="Hou Menghor"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "max-h-0 opacity-0 mt-0" : "max-h-24 opacity-100 mt-4"}`}>
              <h2 className="text-3xl font-semibold text-white leading-none whitespace-nowrap">Hou Menghor</h2>
              <p className="mt-2 text-lg text-primary/70 whitespace-nowrap">Web Developer</p>
            </div>
          </div>

          <nav className={`flex-1 px-0 py-4 bg-[#021327] transition-all duration-300 ${isSidebarCollapsed ? "mt-24" : "mt-8"}`}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href && isHomePage;

              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={`group relative w-full transition-all duration-200 ${isSidebarCollapsed ? "px-0 py-3" : "px-6 py-3 text-left text-[1.1rem]"} ${isActive
                      ? "bg-primary/15 text-white font-semibold"
                      : "text-slate-300 hover:bg-[#0b2748] hover:text-white"
                    }`}
                >
                  <span className={`absolute left-0 top-0 h-full w-1 transition-all duration-200 ${isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/50"}`} />
                  <span className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-2.5"}`}>
                    <Icon className={`h-[18px] w-[18px] ${isActive ? "text-primary" : "text-slate-400 group-hover:text-primary"}`} />
                    <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out ${isSidebarCollapsed ? "max-w-0 opacity-0" : "max-w-[165px] opacity-100"}`}>
                      {link.name}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className={`border-t border-primary/20 px-4 py-3 transition-all duration-300 ${isSidebarCollapsed ? "text-center" : "text-left"}`}>
            <p className={`text-[11px] text-slate-400 leading-tight ${isSidebarCollapsed ? "opacity-0 max-h-0 overflow-hidden" : "opacity-100 max-h-10"}`}>
              &copy; {currentYear} Hou Menghor
            </p>
          </div>
        </div>
      </aside>

      <header className={`lg:hidden sticky top-0 left-0 w-full bg-secondary z-50 h-[71px] p-[16px] transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-secondary/90 shadow-md' : 'bg-secondary'}`}>
        <nav className='container mx-auto'>
          <div className='flex h-[40px] items-center justify-between'>
            <NavLink to='/' className='flex items-center'>
              <span className='text-[24px] text-primary font-bold'>Hou Menghor</span>
            </NavLink>

            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                aria-label="Toggle menu"
                className="ml-2 p-2 rounded-md hover:bg-darkMode transition-colors"
              >
                {isMenuOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
              </button>
            </div>

            {isMenuOpen && (
              <div className="absolute top-[70px] left-0 w-full bg-secondary border-t border-darkMode shadow-md">
                <div className="px-4 py-4">
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.name}
                        onClick={() => {
                          scrollToSection(link.href);
                          setIsMenuOpen(false);
                        }}
                        className={`transition-colors py-2 text-left ${activeSection === link.href && isHomePage
                            ? "text-primary font-medium"
                            : "text-white/90"
                          }`}
                      >
                        {link.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
