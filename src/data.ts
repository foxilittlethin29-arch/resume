import { ResumeData } from "./types";

export const resumeData: ResumeData = {
  name: "MEHBOOB KHALID",
  titles: [
    "Full Stack Developer",
    "AI Engineer",
    "SaaS Architect",
    "Automation Specialist"
  ],
  location: "Karachi, Pakistan",
  email: "foxilittlethin29@gmail.com",
  phone: "+92 315-5512194",
  github: "https://github.com/foxilittlethin29",
  linkedin: "https://linkedin.com/in/mehboobkhalid",
  portfolio: "https://mehboobkhalid.dev",
  summary: "Results-driven Full Stack & AI Engineer with 5+ years of experience delivering scalable SaaS platforms, AI-powered automation systems, CRM solutions, and high-performance web applications. Skilled in React, Next.js, Node.js, TypeScript, Python, PostgreSQL, OpenAI APIs, LangChain, Docker, AWS, and cloud-native development. Passionate about building intelligent products that automate business workflows, improve productivity, and solve real-world problems.",
  experiences: [
    {
      role: "Full Stack & AI Engineer",
      company: "Freelance (Direct Client Hunting, Fiverr, Upwork, Freelancer, Truelancer)",
      period: "2022 – Present",
      location: "Remote / Global",
      bullets: [
        "Developed and launched scalable SaaS applications, accelerating client time-to-market by up to 40%.",
        "Built intelligent, context-aware AI Chatbots and automated systems leveraging OpenAI APIs, Whisper, and DALL-E.",
        "Created custom CRM and ERP platforms featuring automated notifications, interactive visual dashboards, and user role management.",
        "Architected and deployed high-performance REST APIs and backend microservices with Express.js and Node.js.",
        "Dockerized production applications to standardize environments and streamline local, staging, and production deployments.",
        "Engineered reliable cloud infrastructures on AWS, ensuring 99.9% uptime and low latency for global user bases."
      ]
    },
    {
      role: "Software Engineer",
      company: "International Remote Clients",
      period: "2016 – Present",
      location: "Remote / International",
      bullets: [
        "Crafted high-fidelity, responsive websites and modern frontends utilizing React, Next.js, and Tailwind CSS.",
        "Developed business analytics dashboards containing real-time data visualizations, charts, and interactive filtering.",
        "Collaborated with fast-paced startups across multiple industries to prototype and deliver AI-powered web applications.",
        "Managed the complete software development lifecycle (SDLC) from design and architecture to deployment and monitoring.",
        "Maintained long-term, high-trust client relationships through clear communication, project management, and stellar business analysis."
      ]
    }
  ],
  projects: [
    {
      title: "TradingNova AI Trading Platform",
      description: "A modern SaaS trading and insights platform. It integrates secure user authentication, interactive dashboards, real-time metrics, AI-generated trading insights, and automatic subscription plans.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
      role: "Lead Full Stack & AI Developer",
      metrics: ["AI Insights Generated: 10k+", "Dashboard Loading: <200ms"],
      highlights: [
        "Designed a sleek, dark-slate visual dashboard displaying mock real-time trading metrics and technical indicators.",
        "Integrated the OpenAI GPT engine to generate daily stock/crypto summaries based on market signals.",
        "Configured robust authentication alongside subscription billing models using database webhooks."
      ]
    },
    {
      title: "Familia Mechanical Corporate Hub",
      description: "Corporate business website and customer portal, featuring CRM integration, automated lead capture, local search engine optimization, and clean speed performance.",
      tags: ["React", "Node.js", "Express", "CRM Integration", "Tailwind CSS"],
      role: "Software Architect",
      metrics: ["SEO Score: 100/100", "Lead Conversion: +28%"],
      highlights: [
        "Engineered a lightning-fast static-site frontend backed by a robust Express middleware layer.",
        "Linked user inquiries directly to a custom CRM database via secure APIs for prompt client follow-up.",
        "Implemented schema markup and optimized image assets to boost local search rankings significantly."
      ]
    },
    {
      title: "New Queens Nails Appointment Hub",
      description: "Modern, high-conversion appointment booking platform featuring a live schedule calendar, instant confirmation, mobile-first design, and interactive local business catalog.",
      tags: ["React", "JavaScript", "Tailwind CSS", "Local Optimization", "Figma"],
      role: "Frontend Engineer",
      metrics: ["Booking Rate: +45%", "Mobile Usability: 99%"],
      highlights: [
        "Crafted a mobile-first visual booking flow allowing clients to select dates, specialists, and nail styles in under 1 minute.",
        "Implemented Client-side memory caching to preserve user form inputs across page refreshes.",
        "Maintained high visual consistency with a warm, minimalist aesthetic styled directly with Tailwind."
      ]
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "Python", "REST API", "Authentication"]
    },
    {
      category: "Database",
      items: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "GraphQL"]
    },
    {
      category: "AI & Automation",
      items: ["OpenAI API", "LangChain", "Prompt Engineering", "AI Chatbots", "Whisper", "DALL-E", "Automation", "Telegram Bot API"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "GitHub Actions", "CI/CD", "Vercel", "DigitalOcean"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "GitHub", "VS Code", "Cursor", "Google AI Studio", "Replit", "Postman", "Figma"]
    },
    {
      category: "Marketing & Growth",
      items: ["Social Media Management", "Facebook Marketing", "Instagram Marketing", "LinkedIn Marketing", "Meta Ads", "Content Strategy", "Analytics"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Commerce (B.Com)",
      institution: "Govt. Degree Science & Commerce College",
      location: "Karachi, Pakistan",
      period: "2013 – 2014"
    },
    {
      degree: "Intermediate (I.Com)",
      institution: "Govt. Degree Science & Commerce College",
      location: "Karachi, Pakistan",
      period: "2011 – 2012"
    },
    {
      degree: "Matriculation (Science)",
      institution: "Margaret Memorial Secondary School",
      location: "Karachi, Pakistan",
      period: "2009 – 2010"
    }
  ],
  traits: [
    "Problem Solving",
    "Leadership",
    "Critical Thinking",
    "Communication",
    "Project Management",
    "Client Communication",
    "Business Analysis",
    "Team Collaboration"
  ],
  availability: {
    types: ["Remote", "Full-Time", "Contract", "Freelance"],
    scope: "Worldwide Opportunities"
  },
  languages: ["English (Professional)", "Urdu (Native)", "Punjabi"]
};
