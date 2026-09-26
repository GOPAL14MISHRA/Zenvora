export interface DetailedService {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  metaTitle: string;
  metaDescription: string;
  whoItIsFor: string[];
  whatIsIncluded: string[];
  process: { step: string; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  relatedProjectSlugs: string[];
}

export const detailedServices: Record<string, DetailedService> = {
  'web-development': {
    slug: 'web-development',
    title: 'Custom Website Development Services',
    shortDescription: 'High-performance, modern business websites engineered for speed, conversion, and brand authority.',
    fullDescription:
      'Zenvora Digital Studio builds custom business websites engineered for speed, brand distinction, and user engagement. We combine clean frontend architecture with responsive design to create fast, search-engine-ready websites for modern companies.',
    icon: 'Globe',
    metaTitle: 'Custom Website Development Company & Services',
    metaDescription:
      'Custom website development services by Zenvora Digital Studio. High-performance, SEO-friendly, mobile-first business websites built with React, Next.js, and TypeScript.',
    whoItIsFor: [
      'Growing business brands needing a professional digital presence',
      'Startups looking to establish strong credibility and market position',
      'Companies redesigning outdated legacy websites into modern web platforms',
      'Service providers needing clear lead-generation digital experiences',
    ],
    whatIsIncluded: [
      'Custom UI/UX layout and typography system',
      'Mobile-first responsive frontend development',
      'Technical SEO, speed optimization, and Core Web Vitals compliance',
      'Content management system (CMS) integration',
      'Contact forms and lead capture workflow integration',
      'Analytics and performance tracking setup',
    ],
    process: [
      { step: '01', title: 'Discovery & Architecture', description: 'We map out site structure, target customer user journeys, and technical requirements.' },
      { step: '02', title: 'UI/UX Design', description: 'We create custom design layouts tailored to your brand identity and conversion goals.' },
      { step: '03', title: 'Frontend Engineering', description: 'We develop clean, accessible code using React, TypeScript, and modern CSS standards.' },
      { step: '04', title: 'Optimization & Launch', description: 'We run speed audits, SEO checks, device testing, and deploy to secure cloud infrastructure.' },
    ],
    faqs: [
      {
        question: 'How long does custom website development take?',
        answer: 'Most custom business websites are designed, developed, tested, and launched within 3 to 6 weeks, depending on scope and feature complexity.',
      },
      {
        question: 'Will my website be mobile-friendly and fast?',
        answer: 'Yes, every website built by Zenvora is mobile-first, responsive, and performance-optimized for top Core Web Vitals scores.',
      },
      {
        question: 'Can I update content on my website after launch?',
        answer: 'Yes, we integrate easy-to-use content management capabilities so your team can update blog posts, projects, and site text effortlessly.',
      },
    ],
    relatedProjectSlugs: ['spiritual-garments', 'bharatskillz'],
  },

  ecommerce: {
    slug: 'ecommerce',
    title: 'E-Commerce Website Development Services',
    shortDescription: 'Conversion-focused online storefronts designed for smooth shopping experiences and order growth.',
    fullDescription:
      'We design and develop custom e-commerce storefronts tailored around product catalog browsing, customer experience, mobile checkout speed, and secure payment integrations.',
    icon: 'ShoppingBag',
    metaTitle: 'Custom E-Commerce Website Development Company',
    metaDescription:
      'Custom e-commerce website development by Zenvora Digital Studio. Fast catalog browsing, seamless checkout flows, mobile-friendly design, and scalable online store architectures.',
    whoItIsFor: [
      'Direct-to-consumer (D2C) product brands',
      'Retail businesses launching or modernizing their online storefronts',
      'Merchants needing custom product catalogues and streamlined checkout flows',
    ],
    whatIsIncluded: [
      'Custom product catalogue and category filtering',
      'Shopping cart and streamlined checkout flow',
      'Secure payment gateway integrations (Stripe, Razorpay, PayPal)',
      'Order & product management dashboard',
      'Mobile-optimized shopping interface',
      'Inventory and notification hooks',
    ],
    process: [
      { step: '01', title: 'Catalog & Store Planning', description: 'We structure product categories, inventory flow, and payment gateway requirements.' },
      { step: '02', title: 'Storefront UI/UX', description: 'We design intuitive product showcase layouts optimized for mobile shoppers.' },
      { step: '03', title: 'Development & Integration', description: 'We engineer store logic, cart functionality, and payment processing security.' },
      { step: '04', title: 'Testing & Store Launch', description: 'We test order placement, mobile checkout responsiveness, and go live.' },
    ],
    faqs: [
      {
        question: 'What payment gateways do you support?',
        answer: 'We integrate Stripe, Razorpay, PayPal, and custom payment processors based on your region and business needs.',
      },
      {
        question: 'Is the e-commerce store optimized for mobile devices?',
        answer: 'Yes, over 70% of online shopping happens on phones, so we prioritize ultra-fast mobile navigation and checkout speed.',
      },
    ],
    relatedProjectSlugs: ['spiritual-garments'],
  },

  'web-applications': {
    slug: 'web-applications',
    title: 'Custom Web Application & SaaS Development',
    shortDescription: 'Scalable web applications, SaaS platforms, and custom digital software built with modern stacks.',
    fullDescription:
      'Zenvora Digital Studio engineers scalable web applications and SaaS platforms. We build custom dashboards, user authentication, REST APIs, and database-backed workflows tailored to your business operations.',
    icon: 'Layers',
    metaTitle: 'Custom Web Application Development Company',
    metaDescription:
      'Custom web application and SaaS product development services by Zenvora Digital Studio. Scalable full-stack software, admin portals, and cloud integrations.',
    whoItIsFor: [
      'SaaS founders building custom software products',
      'Businesses replacing manual processes with web-based operational software',
      'Companies requiring custom client dashboards and data portals',
    ],
    whatIsIncluded: [
      'Full-stack web app development (React, Node.js, Firebase, SQL)',
      'User authentication, RBAC, and session security',
      'Custom database schema design & RESTful API architecture',
      'Admin control panels and data visualization dashboards',
      'Third-party software integrations and webhook automation',
    ],
    process: [
      { step: '01', title: 'Architecture Blueprint', description: 'We specify database models, system workflow logic, and API endpoints.' },
      { step: '02', title: 'Product Interface Design', description: 'We craft clear, intuitive app layouts for desktop and mobile devices.' },
      { step: '03', title: 'Full-Stack Development', description: 'We develop secure API backends and interactive frontend software.' },
      { step: '04', title: 'QA & Cloud Deployment', description: 'We run security audits, performance tests, and launch to cloud servers.' },
    ],
    faqs: [
      {
        question: 'What technology stack do you use for web applications?',
        answer: 'We build with React, TypeScript, Node.js, Next.js, Firebase, MySQL, and PostgreSQL depending on project requirements.',
      },
      {
        question: 'Can you build custom admin dashboards?',
        answer: 'Yes, we design and build complete admin management portals for data control, team access, analytics, and content management.',
      },
    ],
    relatedProjectSlugs: ['plot-ai', 'bharatskillz'],
  },

  'ui-ux': {
    slug: 'ui-ux',
    title: 'UI/UX Design Services for Digital Products',
    shortDescription: 'User-centered design systems, interactive prototypes, and modern interface aesthetics.',
    fullDescription:
      'We craft clear, intuitive UI/UX design systems for websites, mobile web applications, and digital products. We focus on user clarity, conversion psychology, typography, and cohesive visual branding.',
    icon: 'Layout',
    metaTitle: 'UI/UX Design Services Company for Web & SaaS',
    metaDescription:
      'UI/UX design services by Zenvora Digital Studio. Conversion-focused user interfaces, design systems, and responsive website wireframes.',
    whoItIsFor: [
      'Digital products needing a premium, modern visual redesign',
      'Startups needing complete brand visual guidelines and interface wireframes',
      'Businesses looking to improve user retention and conversion rates',
    ],
    whatIsIncluded: [
      'User research and wireframe design',
      'High-fidelity UI visual components',
      'Design systems, color palettes, and typography rules',
      'Responsive mobile and desktop UI specifications',
      'Interactive visual prototypes',
    ],
    process: [
      { step: '01', title: 'User Journey Mapping', description: 'We analyze target audience needs and key conversion pathways.' },
      { step: '02', title: 'Wireframing', description: 'We draft structural layouts to test navigation clarity and component placement.' },
      { step: '03', title: 'High-Fidelity UI Design', description: 'We apply curated color systems, typography, and polished visual components.' },
      { step: '04', title: 'Design Handoff', description: 'We deliver clean design specifications ready for pixel-perfect frontend engineering.' },
    ],
    faqs: [
      {
        question: 'Do you provide both UI design and frontend coding?',
        answer: 'Yes! Zenvora is a full-service digital studio — we handle both the UI/UX design and the complete code implementation.',
      },
    ],
    relatedProjectSlugs: ['bharatskillz', 'plot-ai'],
  },

  'ai-integration': {
    slug: 'ai-integration',
    title: 'AI Integration & Intelligent Automation Services',
    shortDescription: 'Integrate artificial intelligence APIs, smart search, and automated workflows into web software.',
    fullDescription:
      'We help businesses and web platforms leverage practical AI capabilities. From OpenAI / LLM API integration and automated text/image processing to smart recommendation systems, we add intelligent workflows to web products.',
    icon: 'Brain',
    metaTitle: 'AI Integration & Smart Workflow Development Services',
    metaDescription:
      'AI integration services for web applications by Zenvora Digital Studio. OpenAI API integration, automated workflows, and intelligent software features.',
    whoItIsFor: [
      'Products adding AI-powered automated tools for their users',
      'Businesses streamlining internal tasks through intelligent automation',
      'SaaS platforms building next-generation smart features',
    ],
    whatIsIncluded: [
      'OpenAI / LLM API integration',
      'Prompt engineering and structured output handling',
      'Automated content generation and workflow tools',
      'Smart search and recommendation features',
      'Secure server-side API key and token management',
    ],
    process: [
      { step: '01', title: 'Use Case Identification', description: 'We evaluate where AI integration adds genuine value to your business.' },
      { step: '02', title: 'API Integration Setup', description: 'We establish secure backend API connections to AI language models.' },
      { step: '03', title: 'UI Interface Integration', description: 'We build responsive frontend interfaces for user AI interactions.' },
      { step: '04', title: 'Testing & Optimization', description: 'We fine-tune prompt outputs, response latency, and usage limits.' },
    ],
    faqs: [
      {
        question: 'Is AI integration secure for business data?',
        answer: 'Yes, we implement secure server-side API processing and data handling to protect your business logic and user information.',
      },
    ],
    relatedProjectSlugs: ['plot-ai'],
  },

  'backend-api': {
    slug: 'backend-api',
    title: 'Backend API & Database Development',
    shortDescription: 'Secure REST APIs, database architecture, third-party integrations, and cloud backend logic.',
    fullDescription:
      'Zenvora Digital Studio builds secure, high-performance backend systems and custom APIs. We architect clean database models, write REST endpoints, manage server authentication, and integrate third-party services.',
    icon: 'Database',
    metaTitle: 'Backend API & Database Development Company',
    metaDescription:
      'Backend API and database development services by Zenvora Digital Studio. Secure RESTful APIs, Firebase, Node.js, and SQL database architecture.',
    whoItIsFor: [
      'Web applications requiring fast, secure backend APIs',
      'Businesses connecting frontend interfaces to database infrastructure',
      'Companies integrating CRM, payment, or messaging APIs',
    ],
    whatIsIncluded: [
      'RESTful API development and documentation',
      'Database architecture (SQL / NoSQL / Firebase / PostgreSQL)',
      'Secure JWT / Session authentication and data validation',
      'Serverless function deployment and webhook processing',
      'Third-party software API integrations',
    ],
    process: [
      { step: '01', title: 'Data Modeling', description: 'We structure efficient database relationships and security policies.' },
      { step: '02', title: 'API Endpoints Development', description: 'We build REST endpoints with strict input validation.' },
      { step: '03', title: 'Authentication & Security', description: 'We configure token security and data access permissions.' },
      { step: '04', title: 'Deployment & Monitoring', description: 'We deploy to cloud infrastructure and configure error monitoring.' },
    ],
    faqs: [
      {
        question: 'Which databases do you specialize in?',
        answer: 'We work with Firebase Firestore, MySQL, PostgreSQL, MongoDB, and Supabase depending on data scale and requirements.',
      },
    ],
    relatedProjectSlugs: ['spiritual-garments', 'bharatskillz'],
  },
};
