'use client';

import {
  ArrowDown,
  ArrowUp,
  Code,
  Database,
  Download,
  ExternalLink,
  Github,
  Globe,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Server
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { sendEmail } from '../lib/emailjs';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      const currentRef = ref.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

// Header Component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-effect shadow-2xl shadow-blue-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <nav className="flex justify-between items-center">
          {/* Logo with name and profile image */}
          <div className="flex items-center gap-2 sm:gap-4 group cursor-pointer">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-gradient-to-br from-blue-400 to-teal-400 p-0.5 hover:scale-110 transition-transform duration-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/Logo.jpg" 
                alt="Younus" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
              Younus
            </div>
          </div>
          
          {/* Desktop Navigation with enhanced styling */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative group px-3 lg:px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                <span className="relative z-10 font-medium text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/0 via-teal-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:via-teal-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 group-hover:w-full transition-all duration-300"></div>
              </button>
            ))}
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden p-2 sm:p-3 rounded-xl glass-effect border border-gray-600/20 hover:border-blue-400/50 transition-all duration-300 group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6">
              <span className={`absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2 sm:top-2.5' : ''}`}></span>
              <span className={`absolute top-2 sm:top-2.5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`absolute top-4 sm:top-5 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2 sm:top-2.5' : ''}`}></span>
            </div>
          </button>
        </nav>

        {/* Enhanced Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mt-4 py-4 sm:py-6 glass-effect rounded-2xl border border-gray-600/20">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 sm:px-6 py-2 sm:py-3 text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 group relative text-sm sm:text-base"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: isMenuOpen ? 'slideInLeft 0.3s ease-out forwards' : ''
                }}
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-teal-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Component
export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    "Full Stack Developer",
    "React Enthusiast", 
    "Problem Solver",
    "Web Developer"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500/20 rounded-full blur-3xl animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-1/6 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/15 rounded-full blur-3xl animate-float delay-2000"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 sm:left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-16 sm:right-32 w-1 h-1 bg-teal-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-20 sm:left-40 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-60 right-10 sm:right-20 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-2000"></div>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">

        <div className="relative mb-4 sm:mb-6">

          </div>
        {/* Animated Role Switcher */}
        <div className="h-12 sm:h-16 mb-4 flex items-center justify-center">
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-transparent bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text px-4">
            {roles[currentRole]}
          </p>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Full Stack Web Developer passionate about creating modern, responsive web applications. 
          Open to work as a student intern or freelancer, building solutions that make a difference.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-4">
          <button
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto relative group bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto relative group glass-effect px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 border border-blue-400/30 hover:border-blue-400/60"
          >
            <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Contact Me
            </span>
          </button>
          
          <a
            href="/YounusResume.pdf"
            download="Younus_Resume.pdf"
            className="w-full sm:w-auto flex items-center justify-center gap-3 glass-effect px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 group border border-gray-600/30 hover:border-gray-400/50 relative"
            title="Download Resume PDF"
          >
            <Download size={20} className="group-hover:animate-bounce text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resume
            </span>
            {/* Download indicator */}
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          </a>
        </div>

        {/* Enhanced Social Links */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-12 sm:mb-16">
          <a href="https://github.com/Younus-younus" className="group relative p-3 sm:p-4 glass-effect rounded-2xl hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110 border border-gray-600/20">
            <Github size={24} className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a href="https://www.linkedin.com/in/younus4webdev/" className="group relative p-3 sm:p-4 glass-effect rounded-2xl hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110 border border-gray-600/20">
            <Linkedin size={24} className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
          <a href="mailto:sayeedataj37@gmail.com" className="group relative p-3 sm:p-4 glass-effect rounded-2xl hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110 border border-gray-600/20">
            <Mail size={24} className="sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Enhanced Scroll Indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="group relative"
        >
          <div className="animate-bounce">
            <ArrowDown size={28} className="sm:w-9 sm:h-9 text-gray-400 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 sm:w-8 h-12 sm:h-16 border-2 border-gray-600 rounded-full opacity-30">
            <div className="w-1 h-2 sm:h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full mx-auto mt-1 sm:mt-2 animate-bounce"></div>
          </div>
        </button>
      </div>
    </section>
  );
};

// About Component
export const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [imageRef, imageVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 via-slate-800/30 to-gray-900/50"></div>
      <div className="absolute top-20 left-5 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-20 right-5 sm:right-10 w-32 sm:w-40 h-32 sm:h-40 bg-teal-500/5 rounded-full blur-2xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Column - Enhanced Image */}
          <div 
            ref={imageRef}
            className={`text-center lg:text-left transition-all duration-1000 delay-200 ${
              imageVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="relative inline-block">
              {/* Main avatar */}
              <div className="w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 mx-auto lg:mx-0 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-gradient-to-br from-blue-400 via-teal-400 to-purple-500 p-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/assets/Logo.jpg" 
                  alt="Younus Profile" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              
              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float">
                <Code size={20} className="sm:w-6 sm:h-6 text-blue-400" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center animate-float delay-1000">
                <Globe size={20} className="sm:w-6 sm:h-6 text-teal-400" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-64 sm:w-72 lg:w-80 h-64 sm:h-72 lg:h-80 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400/20 via-teal-400/20 to-purple-500/20 rounded-3xl blur-2xl -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* Right Column - Enhanced Content */}
          <div 
            ref={contentRef}
            className={`space-y-6 sm:space-y-8 transition-all duration-1000 delay-400 ${
              contentVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="glass-effect p-4 sm:p-6 rounded-2xl border border-gray-600/20">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  I&apos;m a passionate <span className="text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text font-semibold">full-stack developer</span> specializing in modern web technologies. 
                  I love creating innovative web applications that solve real-world problems and provide exceptional user experiences.
                </p>
              </div>
              
              <div className="glass-effect p-4 sm:p-6 rounded-2xl border border-gray-600/20">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                  My journey in tech started with curiosity about how websites work, and now I&apos;m building complex applications 
                  using React, Node.js, MongoDB, and other modern technologies. I&apos;m always eager to learn and take on challenging projects.
                </p>
              </div>
            </div>

            {/* Enhanced Info Cards */}
            <div className="grid gap-3 sm:gap-4">
              <div className="group glass-effect p-4 sm:p-6 rounded-xl border border-gray-600/20 hover:border-blue-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500/20 to-teal-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Code className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">Full Stack Web Developer</div>
                    <div className="text-xs sm:text-sm text-gray-400">React • Node.js • MongoDB</div>
                  </div>
                </div>
              </div>
              
              <div className="group glass-effect p-4 sm:p-6 rounded-xl border border-gray-600/20 hover:border-teal-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-teal-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Globe className="text-teal-400" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">Open Source Contributor</div>
                    <div className="text-xs sm:text-sm text-gray-400">10+ Projects on GitHub</div>
                  </div>
                </div>
              </div>
              
              <div className="group glass-effect p-4 sm:p-6 rounded-xl border border-gray-600/20 hover:border-purple-400/30 transition-all duration-300">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-purple-500/20 to-orange-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">Available for</div>
                    <div className="text-xs sm:text-sm text-gray-400">Internships & Freelance Projects</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats or achievements */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              <div className="text-center glass-effect p-3 sm:p-4 rounded-xl border border-gray-600/20">
                <div className="text-lg sm:text-2xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text">13+</div>
                <div className="text-xs sm:text-sm text-gray-400">Repositories</div>
              </div>
              <div className="text-center glass-effect p-3 sm:p-4 rounded-xl border border-gray-600/20">
                <div className="text-lg sm:text-2xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text">78+</div>
                <div className="text-xs sm:text-sm text-gray-400">Contributions</div>
              </div>
              <div className="text-center glass-effect p-3 sm:p-4 rounded-xl border border-gray-600/20">
                <div className="text-lg sm:text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text">24/7</div>
                <div className="text-xs sm:text-sm text-gray-400">Passionate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Component
export const Skills = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [skillsRef, skillsVisible] = useScrollAnimation();

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Code className="text-blue-400" size={32} />,
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 80 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Bootstrap', level: 90 }
      ],
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderGradient: 'from-blue-400 to-cyan-400'
    },
    {
      title: 'Backend Development',
      icon: <Server className="text-green-400" size={32} />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 90 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'Authentication', level: 80 },
        { name: 'Server-side Logic', level: 85 }
      ],
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderGradient: 'from-green-400 to-emerald-400'
    },
    {
      title: 'Database',
      icon: <Database className="text-orange-400" size={32} />,
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'Mongoose', level: 80 },
        { name: 'Database Design', level: 75 },
        { name: 'Data Modeling', level: 80 },
        { name: 'Cloudinary', level: 85 }
      ],
      gradient: 'from-orange-500/20 to-amber-500/20',
      borderGradient: 'from-orange-400 to-amber-400'
    },
    {
      title: 'Tools & Others',
      icon: <Globe className="text-purple-400" size={32} />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'GitHub', level: 95 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'EJS Templates', level: 80 },
        { name: 'Material-UI', level: 85 }
      ],
      gradient: 'from-purple-500/20 to-pink-500/20',
      borderGradient: 'from-purple-400 to-pink-400'
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full mt-4 sm:mt-6"></div>
        </div>

        <div 
          ref={skillsRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 transition-all duration-1000 delay-300 ${
            skillsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className={`group relative glass-effect rounded-2xl p-6 sm:p-8 border border-gray-600/20 hover:border-gray-400/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${category.borderGradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                  {category.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 text-center sm:text-left">
                  {category.title}
                </h3>
              </div>
              
              {/* Skills with animated progress bars */}
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group/skill">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm sm:text-base text-gray-300 font-medium group-hover/skill:text-white transition-colors duration-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${category.borderGradient} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s`
                        }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                      </div>
                      {/* Glow effect */}
                      <div 
                        className={`absolute top-0 h-full bg-gradient-to-r ${category.borderGradient} rounded-full opacity-50 blur-sm transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating decoration */}
              <div className={`absolute -top-2 -right-2 w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-br ${category.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse border border-white/20`}></div>
            </div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <div className="glass-effect px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-gray-600/20">
            <p className="text-sm sm:text-base text-gray-400 text-center">
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text font-semibold">Always learning</span> • 
              <span className="text-transparent bg-gradient-to-r from-teal-400 to-purple-400 bg-clip-text font-semibold ml-2">Always growing</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Component
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [titleRef, titleVisible] = useScrollAnimation();
  const [projectsRef, projectsVisible] = useScrollAnimation();

  const projects = [
    {
      title: 'Wonderlust - Airbnb Clone',
      description: 'A full-stack travel booking platform with user authentication, reviews, and image uploads',
      image: '/api/placeholder/400/250',
      tags: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Cloudinary'],
      category: 'Full Stack',
      github: 'https://github.com/Younus-younus/Wonderlust',
      demo: '#'
    },
    {
      title: 'Weather App',
      description: 'A responsive weather application built with React and Vite, featuring real-time weather data',
      image: '/api/placeholder/400/250',
      tags: ['React', 'Vite', 'API Integration', 'Material-UI'],
      category: 'Frontend',
      github: 'https://github.com/Younus-younus/weather-app',
      demo: '#'
    },
    {
      title: 'Simon Says Game',
      description: 'Interactive memory game with responsive design and score tracking',
      image: '/api/placeholder/400/250',
      tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
      category: 'Frontend',
      github: 'https://github.com/Younus-younus/Simon-Says-Game',
      demo: '#'
    },
    {
      title: 'Tic Tac Toe',
      description: 'Classic tic-tac-toe game with clean UI and game logic',
      image: '/api/placeholder/400/250',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/Younus-younus/tictactoe',
      demo: '#'
    },
    {
      title: 'Math Game',
      description: 'Educational math game for practicing arithmetic operations',
      image: '/api/placeholder/400/250',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/Younus-younus/Maths_Game',
      demo: '#'
    },
    {
      title: 'Calculator',
      description: 'Functional calculator with modern design and responsive layout',
      image: '/api/placeholder/400/250',
      tags: ['HTML', 'CSS', 'JavaScript'],
      category: 'Frontend',
      github: 'https://github.com/Younus-younus/Calculator',
      demo: '#'
    }
  ];

  const filters = ['All', 'Frontend', 'Full Stack'];
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-16 sm:py-20 bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={titleRef}
          className={`transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
        </div>

        <div 
          ref={projectsRef}
          className={`transition-all duration-1000 delay-300 ${
            projectsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Filter Buttons */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="flex flex-wrap gap-2 sm:gap-4 bg-gray-800 p-2 rounded-lg">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 sm:px-6 py-2 rounded-lg transition-all duration-300 text-sm sm:text-base ${
                    activeFilter === filter
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 shadow-lg">
                <div className="h-40 sm:h-48 bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center">
                  <div className="text-4xl sm:text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs sm:text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a href={project.github} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                      <Github size={16} className="sm:w-5 sm:h-5" />
                      Code
                    </a>
                    <a href={project.demo} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm sm:text-base">
                      <ExternalLink size={16} className="sm:w-5 sm:h-5" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Component
export const Experience = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [experienceRef, experienceVisible] = useScrollAnimation();

  const experiences = [
    {
      title: 'Open Source Contributor',
      company: 'Various Projects',
      period: '2024 - Present',
      description: 'Contributing to multiple open source projects including LMS systems and UI/UX improvements. Worked on projects like PPGS and cloud institution LMS.',
      skills: ['React', 'TypeScript', 'Node.js', 'Git', 'UI/UX Design']
    },
    {
      title: 'Full Stack Web Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Building modern web applications using MERN stack. Created projects like Wonderlust (Airbnb clone) and weather applications with focus on user experience.',
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Cloudinary', 'Authentication']
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div 
          ref={titleRef}
          className={`transition-all duration-1000 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
            Experience
          </h2>
        </div>

        <div 
          ref={experienceRef}
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${
            experienceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-6 sm:pl-8 pb-8 sm:pb-12 last:pb-0">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-400"></div>
              {/* Timeline Dot */}
              <div className="absolute left-0 top-2 w-3 h-3 bg-blue-400 rounded-full transform -translate-x-1/2"></div>
              
              <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 ml-4 sm:ml-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{exp.title}</h3>
                  <span className="text-xs sm:text-sm text-blue-400 bg-blue-400/10 px-2 sm:px-3 py-1 rounded-full w-fit">
                    {exp.period}
                  </span>
                </div>
                
                <h4 className="text-base sm:text-lg text-blue-400 mb-3">{exp.company}</h4>
                <p className="text-sm sm:text-base text-gray-300 mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 sm:px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs sm:text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Component
export const Achievements = () => {
  const achievements = [
    {
      title: 'Open Source Contributor',
      description: 'Contributed to 10+ open source projects on GitHub with meaningful improvements',
      date: '2024'
    },
    {
      title: 'Pull Shark Achievement',
      description: 'Earned GitHub Pull Shark badge for significant contributions',
      date: '2024'
    },
    {
      title: 'Full Stack Projects',
      description: 'Built multiple full-stack applications including travel booking platform',
      date: '2023-2024'
    }
  ];

  return (
    <section id="achievements" className="py-16 sm:py-20 bg-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-4 sm:p-6 text-center hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-lg sm:text-2xl font-bold">{index + 1}</span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3">{achievement.description}</p>
              <span className="text-blue-400 text-xs sm:text-sm">{achievement.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Component
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const result = await sendEmail(formData);
      
      setStatus({
        type: 'success',
        message: result.message || 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again or contact me directly.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Let&apos;s work together</h3>
              <p className="text-gray-400 text-base sm:text-lg">
                I&apos;m always interested in new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
                Your message will be sent directly to my email address below.
                Open for internships and freelance work.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Email</div>
                  <div className="text-gray-400 text-sm sm:text-base">sayeedataj37@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Phone</div>
                  <div className="text-gray-400 text-sm sm:text-base">Available on request</div>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-blue-400" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Location</div>
                  <div className="text-gray-400 text-sm sm:text-base">India</div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 sm:gap-4">
              <a href="https://github.com/Younus-younus" className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/younus4webdev/" className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:sayeedataj37@gmail.com" className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Mail size={20} />
              </a>
              <a href="/YounusResume.pdf" download="Younus_Resume.pdf" className="w-10 sm:w-12 h-10 sm:h-12 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors group" title="Download Resume">
                <Download size={20} className="group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-800/50 rounded-xl p-6 sm:p-8">
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-300">
                <Mail className="inline w-4 h-4 mr-2" />
                Fill out the form below and I&apos;ll receive your message directly at sayeedataj37@gmail.com
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm sm:text-base"
                  placeholder="Your message..."
                ></textarea>
              </div>

              {/* Status Message */}
              {status.message && (
                <div className={`p-3 sm:p-4 rounded-lg ${
                  status.type === 'success' 
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                    : 'bg-red-500/20 border border-red-500/30 text-red-400'
                }`}>
                  <p className="text-sm sm:text-base">{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isLoading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 transform hover:scale-105'
                } px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} className="sm:w-5 sm:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
              Portfolio
            </div>
            <p className="text-sm sm:text-base text-gray-400">Building the future, one line of code at a time.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
              Made with <Heart size={14} className="sm:w-4 sm:h-4 text-red-500" /> by Younus
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
            >
              <ArrowUp size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
          <p className="text-sm sm:text-base">&copy; 2024 Younus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
