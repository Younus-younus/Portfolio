'use client';

import {
  ArrowRight,
  Award,
  Box,
  Brain,
  ChevronDown,
  Code,
  Database,
  Download,
  ExternalLink,
  Github,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Send,
  Sparkles,
  Sun,
  Zap
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

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

// Header Component with Dark Mode
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Education', id: 'education' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Minimal Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="text-xl font-light tracking-tight text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            Full-Stack + ML <span className="font-semibold">Developer</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1, -1).map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm tracking-wide text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300"
            >
              Contact
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 relative">
              <span className={`absolute w-full h-0.5 bg-gray-900 dark:bg-white transition-all ${
                isMenuOpen ? 'rotate-45 top-2' : 'top-0'
              }`}></span>
              <span className={`absolute w-full h-0.5 bg-gray-900 dark:bg-white top-2 transition-opacity ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`absolute w-full h-0.5 bg-gray-900 dark:bg-white transition-all ${
                isMenuOpen ? '-rotate-45 top-2' : 'top-4'
              }`}></span>
            </div>
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded"
              >
                {item.label}
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
  const [ref, isVisible] = useScrollAnimation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto w-full">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Main Heading */}
          <div className="space-y-6 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300">
              <Sparkles className="w-4 h-4" />
              <span>BCA Student • Full-Stack Developer • ML Enthusiast</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-gray-900 dark:text-white leading-tight">
              Hi, I'm <span className="font-semibold">Younus</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-light text-gray-600 dark:text-gray-400">
              Full-Stack Developer & Machine Learning Engineer
            </h2>

            {/* Introduction */}
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Motivated and detail-oriented BCA student with a strong interest in machine learning, data science, and full-stack development. 
              I design and build scalable web applications and intelligent systems using modern technologies, combining software engineering 
              with AI capabilities to create platforms that automate processes, analyze information, and improve decision making.
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-4 pt-4">
              {['Machine Learning', 'Full-Stack Development', 'Data Science', 'AI Systems'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-8">
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 flex items-center gap-2"
              >
                View Projects
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-medium hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center pt-20">
            <button
              onClick={() => scrollToSection('education')}
              className="flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
            >
              <span className="text-sm tracking-wide">Scroll</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Education Section
export const Achievements = () => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <section id="education" className="py-24 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16">
            Education
          </h2>

          <div className="bg-white dark:bg-gray-900 p-8 md:p-12 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-2">
                  Bachelor of Computer Application (BCA)
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  ST. FRANCIS COLLEGE, Bengaluru City University
                </p>
              </div>
              <div className="text-left md:text-right">
                <div className="inline-block px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mb-2">
                  Aug 2023 – Aug 2026
                </div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  CGPA: 8.88
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">Focus Areas</span>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-7">
                  <li>Machine Learning</li>
                  <li>Data Science</li>
                  <li>Web Development</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Code className="w-5 h-5" />
                  <span className="font-medium">Core Subjects</span>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-7">
                  <li>Data Structures</li>
                  <li>Algorithms</li>
                  <li>Database Systems</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Achievements</span>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 ml-7">
                  <li>Strong Academic Performance</li>
                  <li>Practical Project Work</li>
                  <li>Industry Internships</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Featured Projects Section
export const Projects = () => {
  const [ref, isVisible] = useScrollAnimation();

  const projects = [
    {
      title: 'NextHire.AI – AI-Powered Recruitment Platform',
      problem: 'Build an intelligent recruitment platform that streamlines hiring using AI technologies',
      techStack: ['Next.js', 'TypeScript', 'TailwindCSS', 'OpenAI', 'PostgreSQL', 'AI/ML'],
      description: 'Advanced AI-driven recruitment system designed to automate hiring processes including resume screening, candidate matching, and interview scheduling. A complete AI recruitment system that improves candidate selection and reduces hiring time.',
      features: [
        'AI Resume Screening',
        'Smart Candidate Matching',
        'Automated Scheduling',
        'Analytics Dashboard',
        'ATS Integration'
      ],
      github: 'https://github.com/Younus-younus/NextHIre.AI',
      demo: 'https://ai-resume-analysist.onrender.com/'
    },
    {
      title: 'Research Analyst – AI Research Assistant',
      problem: 'Assist researchers in processing large volumes of academic content efficiently',
      techStack: ['Python', 'NLP', 'Machine Learning', 'FastAPI', 'React', 'Vector Database'],
      description: 'AI-powered research platform designed to help analyze academic papers and extract insights from research documents. A powerful research assistant that accelerates literature review and knowledge discovery.',
      features: [
        'Document Analysis',
        'AI Summarization',
        'Semantic Search',
        'Citation Management',
        'Knowledge Graphs'
      ],
      github: 'https://github.com/Younus-younus/Research-Analisyst',
      demo: 'https://research-analisyst.vercel.app/'
    },
    {
      title: 'Advanced Weather Dashboard',
      problem: 'Build a modern weather application using React and API integrations',
      techStack: ['React', 'Vite', 'API Integration', 'Material UI', 'Geolocation'],
      description: 'Modern React-based weather dashboard that displays location-based weather forecasts with a responsive interface. A real-time weather platform providing location-based forecasts and intuitive visualization.',
      features: [
        'Real-time Weather Updates',
        'Location Detection',
        'Multi-day Forecast',
        'Responsive Interface'
      ],
      github: 'https://github.com/Younus-younus/weather-app',
      demo: 'https://younus-younus.github.io/weather-app/'
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-end justify-between mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <a 
              href="#" 
              className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              View All
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="space-y-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 hover:shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Project Image/Diagram */}
                  <div className="bg-gray-100 dark:bg-gray-800 p-12 flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <Brain className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600" />
                      <div className="space-y-2">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Model Architecture</div>
                        <div className="flex justify-center gap-2">
                          <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                          <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-12 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      
                      <div className="mb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Problem</div>
                        <p className="text-gray-700 dark:text-gray-300">{project.problem}</p>
                      </div>

                      <div className="mb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Tech Stack</div>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-700">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">Key Features</div>
                        <ul className="space-y-2">
                          {project.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                              <span className="text-gray-400 dark:text-gray-600 mt-1">•</span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center gap-2 px-6 py-3 border border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </div>
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

// Research / Work Section
export const Research = () => {
  const [ref, isVisible] = useScrollAnimation();

  const workItems = [
    {
      title: 'ML Pipeline Architecture',
      description: 'End-to-end automated machine learning pipeline with data ingestion, preprocessing, training, and deployment',
      tech: ['Airflow', 'MLflow', 'Kubernetes', 'PostgreSQL'],
      type: 'System Architecture'
    },
    {
      title: 'Experiment Tracking System',
      description: 'Custom experiment management platform for tracking thousands of ML experiments with versioning',
      tech: ['MLflow', 'DVC', 'Git', 'MongoDB'],
      type: 'MLOps Tool'
    },
    {
      title: 'Model Deployment Framework',
      description: 'Scalable model serving infrastructure with A/B testing and canary deployments',
      tech: ['Docker', 'Kubernetes', 'Prometheus', 'Grafana'],
      type: 'Infrastructure'
    },
    {
      title: 'Data Engineering Workflow',
      description: 'ETL pipelines processing 100TB+ data daily with real-time feature engineering',
      tech: ['Spark', 'Kafka', 'Airflow', 'S3'],
      type: 'Data Pipeline'
    },
  ];

  return (
    <section id="research" className="py-24 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Research & Work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-16 max-w-3xl">
            Building robust ML systems and infrastructure for production-scale AI applications
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {workItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-800">
                    <Layers className="w-5 h-5 text-gray-900 dark:text-white" />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Flow Diagram */}
          <div className="mt-16 p-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
              ML Deployment Pipeline
            </h3>
            <div className="flex items-center justify-between max-w-4xl mx-auto">
              {['Data', 'Process', 'Train', 'Validate', 'Deploy', 'Monitor'].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-2">
                      <span className="text-xl font-semibold text-gray-900 dark:text-white">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{step}</span>
                  </div>
                  {index < 5 && (
                    <ArrowRight className="w-8 h-8 mx-2 text-gray-300 dark:text-gray-700" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
export const Skills = () => {
  const [ref, isVisible] = useScrollAnimation();

  const skillCategories = [
    {
      category: 'Frontend',
      icon: <Code className="w-6 h-6" />,
      skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Framer Motion']
    },
    {
      category: 'Backend',
      icon: <Layers className="w-6 h-6" />,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'Python', 'FastAPI', 'Prisma ORM', 'Redux']
    },
    {
      category: 'Data Science & ML',
      icon: <Brain className="w-6 h-6" />,
      skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Flask', 'Excel', 'Google Sheets']
    },
    {
      category: 'Databases',
      icon: <Database className="w-6 h-6" />,
      skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Supabase']
    },
    {
      category: 'Cloud & DevOps',
      icon: <Box className="w-6 h-6" />,
      skills: ['Firebase', 'AWS', 'Google Cloud Platform', 'Vercel', 'Cloudflare', 'Render', 'CI/CD Pipelines']
    },
    {
      category: 'Tools & Other',
      icon: <Zap className="w-6 h-6" />,
      skills: ['Git', 'GitHub', 'Postman', 'Chrome DevTools', 'VS Code', 'Cursor', 'n8n', 'API Design', 'Authentication', 'Technical Documentation']
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section
export const Experience = () => {
  const [ref, isVisible] = useScrollAnimation();

  const experiences = [
    {
      role: 'Lead Application Developer Intern',
      company: 'Cloud Institution, Bangalore',
      location: 'Onsite',
      period: 'Apr 2025 – Jul 2025',
      description: 'Led the end-to-end development of a production-grade Learning Management System built with Next.js, TypeScript, and Firebase.',
      achievements: [
        'Built role-based access control supporting multiple user roles',
        'Implemented authentication, attendance tracking, batch management, and real-time synchronization',
        'Developed and integrated REST APIs for backend operations',
        'Maintained the platform for 100+ students and faculty across two branches',
        'Achieved 99.9% uptime throughout the internship period',
        'Automated attendance workflows using QR-based scanning',
        'Reduced manual processing time by 80% through optimized Firebase batch operations'
      ]
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-16">
            Experience
          </h2>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-600 pb-12 last:pb-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-gray-900 dark:bg-white border-4 border-gray-50 dark:border-gray-800"></div>
                
                <div className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700 ml-4">
                  <div className="flex flex-wrap items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="text-gray-600 dark:text-gray-400">
                        {exp.company}
                        {exp.location && <span className="ml-2">({exp.location})</span>}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1">
                      {exp.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-gray-400 dark:text-gray-600 mt-1">•</span>
                        <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                      </div>
                    ))}
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

// Blog / Insights Section
export const Blog = () => {
  const [ref, isVisible] = useScrollAnimation();

  const articles = [
    {
      title: 'Understanding Transformer Architecture in Depth',
      category: 'Deep Learning',
      date: 'Mar 8, 2026',
      readTime: '12 min read',
      excerpt: 'A comprehensive guide to transformer models, attention mechanisms, and their applications in modern NLP tasks.',
      tags: ['Transformers', 'NLP', 'Attention']
    },
    {
      title: 'Building Production-Ready ML Pipelines',
      category: 'MLOps',
      date: 'Feb 28, 2026',
      readTime: '15 min read',
      excerpt: 'Best practices for deploying and maintaining machine learning models at scale in production environments.',
      tags: ['MLOps', 'Deployment', 'Infrastructure']
    },
    {
      title: 'Optimizing Model Performance: A Case Study',
      category: 'Model Optimization',
      date: 'Feb 15, 2026',
      readTime: '10 min read',
      excerpt: 'How we reduced inference time by 70% through quantization, pruning, and architectural improvements.',
      tags: ['Optimization', 'Performance', 'Case Study']
    },
    {
      title: 'Deep Dive into Computer Vision with CNNs',
      category: 'Computer Vision',
      date: 'Jan 30, 2026',
      readTime: '18 min read',
      excerpt: 'Exploring convolutional neural networks and their applications in image classification and object detection.',
      tags: ['CNN', 'Computer Vision', 'Image Processing']
    },
  ];

  return (
    <section id="blog" className="py-24 px-6 bg-white dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
                Blog & Insights
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Technical articles, experiments, and ML insights
              </p>
            </div>
            <a 
              href="#" 
              className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
            >
              View All Posts
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {articles.map((article, index) => (
              <article
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {article.category}
                    </span>
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-600 dark:text-gray-400">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-gray-900 dark:text-white group-hover:gap-3 transition-all">
                    <span className="text-sm font-medium">Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section
export const Contact = () => {
  const [ref, isVisible] = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
                Let's Work Together
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-12 text-lg">
                Open to full-stack development roles, machine learning projects, and collaborative opportunities.
              </p>

              <div className="space-y-6">
                <a 
                  href="mailto:sayeedataj37@gmail.com" 
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                    <div className="text-lg">sayeedataj37@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/younus4webdev/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</div>
                    <div className="text-lg">linkedin.com/in/younus4webdev</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/Younus-younus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">GitHub</div>
                    <div className="text-lg">github.com/Younus-younus</div>
                  </div>
                </a>

                <a 
                  href="/YounusResume_CV.pdf" 
                  download
                  className="flex items-center gap-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Resume</div>
                    <div className="text-lg">Download CV</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-900 p-8 border border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors text-gray-900 dark:text-white"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors text-gray-900 dark:text-white"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-gray-900 dark:focus:border-white focus:outline-none transition-colors text-gray-900 dark:text-white resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>Sending...</>
                  ) : status === 'success' ? (
                    <>Sent Successfully!</>
                  ) : status === 'error' ? (
                    <>Failed to Send</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            © 2026 Younus. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="https://github.com/Younus-younus" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/younus4webdev/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:sayeedataj37@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
