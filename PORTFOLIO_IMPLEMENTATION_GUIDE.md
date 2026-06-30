# Portfolio Implementation Guide - Step-by-Step

This guide provides detailed implementation instructions for each component and feature.

---

## PHASE 1: PROJECT SETUP

### Step 1: Initialize Project

```bash
# Create new Vite + React + TypeScript project
npm create vite@latest portfolio -- --template react-ts

# Navigate to portfolio directory
cd portfolio

# Install dependencies
npm install

# Install Tailwind CSS and dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dependencies
npm install lucide-react react-intersection-observer
npm install -D @types/react-intersection-observer
```

### Step 2: Configure Tailwind

Update `tailwind.config.js` with the configuration from the blueprint.

### Step 3: Update vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
```

### Step 4: Create Folder Structure

Create all folders as outlined in the blueprint:
```
src/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── effects/
├── data/
├── hooks/
├── utils/
├── styles/
└── types/
```

---

## PHASE 2: CORE COMPONENTS

### Component 1: Header/Navigation

**File:** `src/components/layout/Header.tsx`

```tsx
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/80 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold gradient-text">
            MK
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Links & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com/foxilittlethin29-arch" className="text-gray-400 hover:text-white">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <Linkedin size={20} />
            </a>
            <a href="mailto:mehboob@example.com" className="text-gray-400 hover:text-white">
              <Mail size={20} />
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all hover:scale-105"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />
}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
```

### Component 2: Hero Section

**File:** `src/components/sections/Hero.tsx`

```tsx
import { useState, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Full Stack Developer';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTYwIDBMMCAwTDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIi8+PC9zdmc+')] opacity-20"></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in">
          <span className="block text-white mb-2">Mehboob Khalid</span>
          <span className="gradient-text">{text}</span>
          <span className="animate-pulse">|</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-slide-up">
          Building exceptional digital experiences with modern technologies.
          Specialized in AI, SaaS, and Full Stack development.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="https://foxilittlethin29-arch.github.io/resume/"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50 flex items-center gap-2"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all hover:scale-105 backdrop-blur-sm border border-white/20"
          >
            Hire Me
          </a>
          <a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
          >
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a href="https://github.com/foxilittlethin29-arch" className="text-gray-400 hover:text-white transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
            <Linkedin size={24} />
          </a>
          <a href="mailto:mehboob@example.com" className="text-gray-400 hover:text-white transition-colors">
            <Mail size={24} />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="text-gray-400" size={32} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

### Component 3: Tech Stack Cards

**File:** `src/components/sections/TechStack.tsx`

```tsx
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Cloud, Brain, Wrench } from 'lucide-react';

const technologies = [
  // Frontend
  { name: 'React', category: 'frontend', icon: Code2 },
  { name: 'Next.js', category: 'frontend', icon: Code2 },
  { name: 'TypeScript', category: 'frontend', icon: Code2 },
  { name: 'JavaScript', category: 'frontend', icon: Code2 },
  { name: 'HTML5', category: 'frontend', icon: Code2 },
  { name: 'CSS3', category: 'frontend', icon: Code2 },
  { name: 'Tailwind CSS', category: 'frontend', icon: Code2 },
  { name: 'Vite', category: 'frontend', icon: Code2 },

  // Backend
  { name: 'Node.js', category: 'backend', icon: Database },
  { name: 'Express.js', category: 'backend', icon: Database },
  { name: 'Python', category: 'backend', icon: Database },
  { name: 'REST APIs', category: 'backend', icon: Database },

  // Database
  { name: 'MongoDB', category: 'database', icon: Database },
  { name: 'Firebase', category: 'database', icon: Database },
  { name: 'Supabase', category: 'database', icon: Database },

  // AI/ML
  { name: 'OpenAI', category: 'ai', icon: Brain },
  { name: 'Google Gemini', category: 'ai', icon: Brain },
  { name: 'AI Integrations', category: 'ai', icon: Brain },

  // Tools
  { name: 'Git', category: 'tools', icon: Wrench },
  { name: 'GitHub', category: 'tools', icon: Wrench },
  { name: 'Docker', category: 'tools', icon: Wrench },
  { name: 'Authentication', category: 'tools', icon: Wrench },
  { name: 'Responsive Design', category: 'tools', icon: Wrench },
];

const TechStack = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`glass p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 cursor-pointer group ${
                inView ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <tech.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {tech.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
```

---

## PHASE 3: PROJECTS SECTION

### Data Structure

**File:** `src/data/projects.ts`

```typescript
export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string[];
  techStack: string[];
  status: 'completed' | 'in-progress' | 'planned';
  images: string[];
  thumbnail: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  createdAt: Date;
}

export const projects: Project[] = [
  {
    id: '1',
    name: 'TradingNova',
    slug: 'tradingnova',
    description: 'Advanced trading platform with real-time market data, portfolio tracking, and AI-powered insights.',
    longDescription: 'A comprehensive trading platform featuring real-time market data visualization, portfolio management, and AI-driven trading insights.',
    category: ['SaaS', 'Web Apps', 'Business Applications'],
    techStack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Chart.js'],
    status: 'completed',
    images: [
      '/images/projects/tradingnova/hero.jpg',
      '/images/projects/tradingnova/screenshot1.jpg',
      '/images/projects/tradingnova/screenshot2.jpg',
    ],
    thumbnail: '/images/projects/tradingnova/hero.jpg',
    liveUrl: 'https://tradingnova.com',
    githubUrl: 'https://github.com/foxilittlethin29-arch/tradingnova',
    featured: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'AI Chatbot SaaS',
    slug: 'ai-chatbot-saas',
    description: 'Intelligent chatbot platform with natural language processing and multi-platform integration.',
    longDescription: 'A powerful SaaS platform for creating and deploying AI-powered chatbots with advanced NLP capabilities.',
    category: ['AI', 'SaaS', 'Automation'],
    techStack: ['Next.js', 'OpenAI', 'Python', 'PostgreSQL', 'Redis'],
    status: 'completed',
    images: [
      '/images/projects/ai-chatbot-saas/hero.jpg',
      '/images/projects/ai-chatbot-saas/screenshot1.jpg',
    ],
    thumbnail: '/images/projects/ai-chatbot-saas/hero.jpg',
    liveUrl: 'https://ai-chatbot-saas.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/ai-chatbot-saas',
    featured: true,
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Social Media AI Automation',
    slug: 'social-media-ai-automation',
    description: 'Automated social media management with AI-powered content generation and scheduling.',
    longDescription: 'Complete social media automation solution with AI content generation, scheduling, and analytics.',
    category: ['AI', 'SaaS', 'Automation'],
    techStack: ['React', 'Node.js', 'OpenAI', 'MongoDB', 'AWS'],
    status: 'completed',
    images: [
      '/images/projects/social-media-ai-automation/hero.jpg',
    ],
    thumbnail: '/images/projects/social-media-ai-automation/hero.jpg',
    liveUrl: 'https://social-media-ai.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/social-media-ai-automation',
    featured: true,
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Weather Dashboard',
    slug: 'weather-dashboard-react',
    description: 'Beautiful weather dashboard with forecasts, maps, and historical data visualization.',
    longDescription: 'A feature-rich weather application with beautiful UI, detailed forecasts, and interactive maps.',
    category: ['Web Apps', 'Dashboards'],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API', 'Chart.js'],
    status: 'completed',
    images: [
      '/images/projects/weather-dashboard/hero.jpg',
    ],
    thumbnail: '/images/projects/weather-dashboard/hero.jpg',
    liveUrl: 'https://weather-dashboard-react.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/weather-dashboard-react',
    featured: false,
    createdAt: new Date('2024-01-05'),
  },
  {
    id: '5',
    name: 'Task Manager API',
    slug: 'task-manager-api',
    description: 'RESTful API for task management with authentication, validation, and documentation.',
    longDescription: 'A robust REST API for task management with comprehensive features and Swagger documentation.',
    category: ['API', 'Backend'],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Swagger'],
    status: 'completed',
    images: [
      '/images/projects/task-manager-api/hero.jpg',
    ],
    thumbnail: '/images/projects/task-manager-api/hero.jpg',
    githubUrl: 'https://github.com/foxilittlethin29-arch/task-manager-api',
    featured: false,
    createdAt: new Date('2023-12-20'),
  },
  {
    id: '6',
    name: 'Authentication System',
    slug: 'authentication-system',
    description: 'Secure authentication system with OAuth, JWT, and role-based access control.',
    longDescription: 'A complete authentication solution with multiple auth methods and security best practices.',
    category: ['Authentication', 'API'],
    techStack: ['Node.js', 'Express.js', 'JWT', 'OAuth', 'MongoDB'],
    status: 'completed',
    images: [
      '/images/projects/authentication-system/hero.jpg',
    ],
    thumbnail: '/images/projects/authentication-system/hero.jpg',
    githubUrl: 'https://github.com/foxilittlethin29-arch/authentication-system',
    featured: false,
    createdAt: new Date('2023-11-15'),
  },
];

export const categories = [
  'All',
  'AI',
  'SaaS',
  'Web Apps',
  'Dashboards',
  'Automation',
  'API',
  'Authentication',
];
```

### Projects Section Component

**File:** `src/components/sections/Projects.tsx`

```tsx
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, BookOpen, Eye } from 'lucide-react';
import { projects, categories, Project } from '../../data/projects';
import Lightbox from '../ui/Lightbox';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category.includes(selectedCategory));

  const openLightbox = (project: Project, imageIndex: number = 0) => {
    setSelectedProject(project);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'planned':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <section id="projects" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            A selection of projects that showcase my skills and experience
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 group ${
                inView ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => openLightbox(project, 0)}
              >
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="text-white" size={32} />
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all hover:scale-105"
                    >
                      <ExternalLink size={16} />
                      <span className="text-sm">Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all hover:scale-105"
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all hover:scale-105"
                    >
                      <BookOpen size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && selectedProject && (
        <Lightbox
          images={selectedProject.images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setCurrentImageIndex((prev) => 
            (prev + 1) % selectedProject.images.length
          )}
          onPrev={() => setCurrentImageIndex((prev) => 
            (prev - 1 + selectedProject.images.length) % selectedProject.images.length
          )}
        />
      )}
    </section>
  );
};

export default Projects;
```

---

## PHASE 4: UI COMPONENTS

### Lightbox Component

**File:** `src/components/ui/Lightbox.tsx`

```tsx
import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          onNext();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
      >
        <X size={32} />
      </button>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-4 text-white/80 hover:text-white p-2 z-10"
          >
            <ChevronLeft size={48} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-4 text-white/80 hover:text-white p-2 z-10"
          >
            <ChevronRight size={48} />
          </button>
        </>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Image */}
      <div
        className="relative max-w-7xl max-h-screen p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Project screenshot ${currentIndex + 1}`}
          className={`max-w-full max-h-[90vh] object-contain transition-transform ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />
      </div>

      {/* Zoom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm flex items-center gap-2">
        <ZoomIn size={16} />
        Click image to zoom
      </div>
    </div>
  );
};

export default Lightbox;
```

---

## PHASE 5: ADDITIONAL SECTIONS

### About Section

**File:** `src/components/sections/About.tsx`

```tsx
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div ref={ref} className={inView ? 'animate-slide-in-left' : 'opacity-0'}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="space-y-4 text-gray-300 text-lg">
              <p>
                I'm a passionate <span className="text-primary font-semibold">Full Stack Developer</span> with expertise in building modern web applications, AI-powered solutions, and scalable SaaS products.
              </p>
              <p>
                With a strong foundation in both frontend and backend technologies, I create seamless user experiences backed by robust, efficient code.
              </p>
              <p>
                My focus areas include:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span><strong>Full Stack Development</strong> - React, Node.js, TypeScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span><strong>AI Development</strong> - OpenAI, Gemini, Machine Learning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span><strong>SaaS Applications</strong> - Scalable, multi-tenant solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span><strong>Automation</strong> - Workflow optimization and integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">▹</span>
                  <span><strong>Performance Optimization</strong> - Fast, efficient applications</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Stats/Visual */}
          <div ref={ref} className={inView ? 'animate-slide-in-right' : 'opacity-0'}>
            <div className="glass p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Experience</span>
                  <span className="text-primary font-semibold">3+ Years</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Projects Completed</span>
                  <span className="text-primary font-semibold">20+</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Technologies</span>
                  <span className="text-primary font-semibold">25+</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Specialization</span>
                  <span className="text-primary font-semibold">Full Stack & AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

---

## PHASE 6: GLOBAL STYLES

### Global CSS

**File:** `src/styles/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-white font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer components {
  .glass {
    @apply bg-surface/70 backdrop-blur-xl border border-white/10 rounded-2xl;
  }

  .gradient-text {
    @apply bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent;
  }

  .btn-primary {
    @apply px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50;
  }

  .section-title {
    @apply text-4xl md:text-5xl font-bold mb-4;
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease-out;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.5s ease-out;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

---

## PHASE 7: MAIN APP STRUCTURE

### App.tsx

```tsx
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import TechStack from './components/sections/TechStack';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Skills from './components/sections/Skills';
import Services from './components/sections/Services';
import Statistics from './components/sections/Statistics';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Skills />
        <Services />
        <Statistics />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
```

---

## PHASE 8: DEPLOYMENT

### Build and Deploy

```bash
# Build the project
npm run build

# Install gh-pages for deployment
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "gh-pages -d dist"

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## IMPORTANT NOTES

1. **Images**: Start with placeholder images, then replace with real project screenshots
2. **Content**: Fill in your actual projects, experience, and skills
3. **Testing**: Test on multiple devices and browsers
4. **Performance**: Optimize images before deployment
5. **SEO**: Add meta tags and Open Graph tags
6. **Accessibility**: Ensure keyboard navigation works
7. **Analytics**: Consider adding Google Analytics or similar

---

## NEXT STEPS AFTER BUILDING

1. Update resume website to link to portfolio
2. Add real project screenshots
3. Test on multiple devices
4. Optimize performance
5. Deploy to GitHub Pages
6. Share with the world! 🚀

Good luck building your amazing portfolio! You've got this! 💪