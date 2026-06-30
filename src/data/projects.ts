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
  challenges?: string[];
  solutions?: string[];
  features?: string[];
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
      'https://via.placeholder.com/1200x800/1a1a24/6366f1?text=TradingNova+Hero',
      'https://via.placeholder.com/1200x800/1a1a24/8b5cf6?text=TradingNova+Dashboard',
      'https://via.placeholder.com/1200x800/1a1a24/06b6d4?text=TradingNova+Analytics',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/6366f1?text=TradingNova',
    liveUrl: 'https://tradingnova.com',
    githubUrl: 'https://github.com/foxilittlethin29-arch/tradingnova',
    featured: true,
    challenges: [
      'Real-time data synchronization across multiple users',
      'Handling high-frequency trading data updates',
      'Implementing complex charting with technical indicators'
    ],
    solutions: [
      'Used WebSocket (Socket.io) for real-time bidirectional communication',
      'Implemented Redis caching for frequently accessed market data',
      'Integrated Chart.js with custom plugins for advanced technical analysis'
    ],
    features: [
      'Real-time market data streaming',
      'Interactive trading charts with technical indicators',
      'Portfolio performance tracking',
      'AI-powered trading insights',
      'Subscription-based billing system'
    ],
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
      'https://via.placeholder.com/1200x800/1a1a24/8b5cf6?text=AI+Chatbot+Hero',
      'https://via.placeholder.com/1200x800/1a1a24/6366f1?text=AI+Chatbot+Interface',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/8b5cf6?text=AI+Chatbot+SaaS',
    liveUrl: 'https://ai-chatbot-saas.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/ai-chatbot-saas',
    featured: true,
    challenges: [
      'Managing context across long conversations',
      'Reducing API costs while maintaining response quality',
      'Handling multiple concurrent chatbot instances'
    ],
    solutions: [
      'Implemented conversation memory with vector embeddings',
      'Used prompt caching and token optimization strategies',
      'Built scalable microservices architecture with Redis queues'
    ],
    features: [
      'Natural language understanding with OpenAI GPT-4',
      'Multi-platform deployment (Web, Slack, Discord)',
      'Custom training on business data',
      'Analytics dashboard for conversation insights',
      'Multi-tenant architecture for SaaS'
    ],
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
      'https://via.placeholder.com/1200x800/1a1a24/06b6d4?text=Social+Media+AI+Hero',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/06b6d4?text=Social+Media+AI',
    liveUrl: 'https://social-media-ai.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/social-media-ai-automation',
    featured: true,
    challenges: [
      'Generating platform-specific content automatically',
      'Managing multiple social media API integrations',
      'Scheduling posts across different time zones'
    ],
    solutions: [
      'Trained AI model on platform-specific content patterns',
      'Built unified API layer for all social media platforms',
      'Implemented cron-based scheduling with AWS Lambda'
    ],
    features: [
      'AI-powered content generation',
      'Multi-platform posting (Facebook, Twitter, LinkedIn, Instagram)',
      'Smart scheduling based on audience activity',
      'Performance analytics and insights',
      'Media library with AI tagging'
    ],
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
      'https://via.placeholder.com/1200x800/1a1a24/6366f1?text=Weather+Dashboard',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/6366f1?text=Weather+Dashboard',
    liveUrl: 'https://weather-dashboard-react.vercel.app',
    githubUrl: 'https://github.com/foxilittlethin29-arch/weather-dashboard-react',
    featured: false,
    challenges: [
      'Displaying complex weather data in an intuitive way',
      'Handling API rate limits efficiently',
      'Creating responsive maps with weather overlays'
    ],
    solutions: [
      'Designed clean card-based UI with progressive disclosure',
      'Implemented smart caching with localStorage',
      'Used Leaflet.js with custom weather layer integration'
    ],
    features: [
      '7-day weather forecast',
      'Interactive weather maps',
      'Historical data visualization',
      'Location-based weather alerts',
      'Beautiful animated weather icons'
    ],
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
      'https://via.placeholder.com/1200x800/1a1a24/8b5cf6?text=Task+Manager+API',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/8b5cf6?text=Task+Manager+API',
    githubUrl: 'https://github.com/foxilittlethin29-arch/task-manager-api',
    featured: false,
    challenges: [
      'Designing scalable REST API architecture',
      'Implementing secure authentication and authorization',
      'Creating comprehensive API documentation'
    ],
    solutions: [
      'Followed REST best practices with resource-based URLs',
      'Implemented JWT with refresh tokens and role-based access',
      'Used Swagger/OpenAPI for interactive documentation'
    ],
    features: [
      'CRUD operations for tasks and projects',
      'JWT-based authentication',
      'Input validation and error handling',
      'Rate limiting and API security',
      'Interactive Swagger documentation'
    ],
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
      'https://via.placeholder.com/1200x800/1a1a24/06b6d4?text=Authentication+System',
    ],
    thumbnail: 'https://via.placeholder.com/800x600/1a1a24/06b6d4?text=Authentication+System',
    githubUrl: 'https://github.com/foxilittlethin29-arch/authentication-system',
    featured: false,
    challenges: [
      'Implementing secure password hashing',
      'Managing OAuth 2.0 flow with multiple providers',
      'Preventing common security vulnerabilities'
    ],
    solutions: [
      'Used bcrypt with salt rounds for password hashing',
      'Implemented OAuth 2.0 with Google, GitHub, and Facebook',
      'Added rate limiting, CSRF protection, and input sanitization'
    ],
    features: [
      'Email/password authentication',
      'OAuth 2.0 social login',
      'JWT token management',
      'Role-based access control (RBAC)',
      'Email verification and password reset'
    ],
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