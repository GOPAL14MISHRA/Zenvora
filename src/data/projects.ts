import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Spiritual Garments',
    slug: 'spiritual-garments',
    shortDescription:
      'A modern e-commerce experience designed for a spiritual garments brand.',
    description:
      'Spiritual Garments is a modern e-commerce platform built for a brand that blends traditional spiritual aesthetics with contemporary fashion. The platform delivers a seamless shopping experience with a clean, culturally resonant design.',
    challenge:
      'The brand needed a digital storefront that could authentically represent their spiritual identity while providing a smooth, modern shopping experience that converts visitors into customers.',
    solution:
      'We designed and built a full e-commerce experience with intuitive product browsing, a streamlined checkout flow and an admin panel for product and order management — all wrapped in a design that reflects the brand\'s spiritual identity.',
    keyFeatures: [
      'Product catalogue with category filters',
      'Shopping cart and checkout flow',
      'Order management system',
      'Responsive mobile-first design',
      'Admin product management panel',
    ],
    category: 'E-commerce',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'E-commerce'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
    ],
    liveUrl: undefined,
    githubUrl: undefined,
    featured: true,
    published: true,
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'BharatSkillz',
    slug: 'bharatskillz',
    shortDescription:
      'A modern digital learning platform focused on helping learners develop practical skills.',
    description:
      'BharatSkillz is an EdTech platform designed to bridge the gap between traditional education and practical, job-ready skills. The platform provides learners with structured courses, video content and progress tracking.',
    challenge:
      'Learners in India often lack access to structured, practical skill-building resources. The platform needed to be accessible, easy to navigate and effective at keeping learners engaged.',
    solution:
      'We built a full-stack learning platform with course browsing, enrollment, video lessons and a learner dashboard — built for speed, accessibility and long-term scalability.',
    keyFeatures: [
      'Course catalogue and browsing',
      'Learner enrollment and progress tracking',
      'Video lesson delivery',
      'Responsive design for mobile learners',
      'Admin course management',
    ],
    category: 'EdTech',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'EdTech'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    ],
    liveUrl: 'https://bharat-skillz.vercel.app/',
    githubUrl: undefined,
    featured: true,
    published: true,
    createdAt: '2026-03-10T00:00:00Z',
    updatedAt: '2026-03-10T00:00:00Z',
  },
  {
    id: '3',
    title: 'Plot AI',
    slug: 'plot-ai',
    shortDescription:
      'An AI-powered digital product focused on intelligent workflows and modern user experiences.',
    description:
      'Plot AI is an AI-powered SaaS product that brings intelligent automation to digital workflows. Designed with a clean, modern interface, the product makes it easy for users to interact with AI capabilities in a structured, productive way.',
    challenge:
      'Creating an AI product that feels approachable, functional and genuinely useful — without overwhelming the user with complexity.',
    solution:
      'We designed and built a clean SaaS interface that integrates AI capabilities through a structured workflow system, allowing users to get meaningful outputs without technical friction.',
    keyFeatures: [
      'AI-powered workflow engine',
      'Clean and intuitive SaaS interface',
      'User authentication and dashboard',
      'Structured output generation',
      'Responsive modern design',
    ],
    category: 'AI / SaaS',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'AI / OpenAI', 'SaaS'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    ],
    liveUrl: 'https://plot-1tkvq26i3-mehak277s-projects.vercel.app/',
    githubUrl: undefined,
    featured: true,
    published: true,
    createdAt: '2026-06-01T00:00:00Z',
    updatedAt: '2026-06-01T00:00:00Z',
  },
];
