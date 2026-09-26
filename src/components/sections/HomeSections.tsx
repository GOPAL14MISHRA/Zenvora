import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, ShoppingBag, Brain, Target,
  Layers, RefreshCw, Check, Plus, Minus, Code2, Smartphone, MessageSquare, Rocket
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { AmbientBackground } from '../ui/AmbientBackground';
import { pricingConfig } from '../../data/pricing';
import { team } from '../../data/team';

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// ─── Hero Section ──────────────────────────────────────────────────────────
export function HeroSection() {
  const capabilityChips = [
    'Business Websites',
    'E-Commerce',
    'Web Applications',
    'AI Integration',
    'UI/UX',
  ];

  const showcaseProjects = [
    {
      title: 'BharatSkillz EdTech',
      tag: 'Web Platform',
      url: 'bharat-skillz.vercel.app',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
    },
    {
      title: 'Spiritual Garments',
      tag: 'E-Commerce Store',
      url: 'spiritualgarments.store',
      image: 'https://images.squarespace-cdn.com/content/v1/63999afeb7020c7bef60443a/1671013464211-43XT1U8UJH5HFWNH59KZ/RZ-Blog-39.png',
    },
    {
      title: 'PlotIQ Engine',
      tag: 'Web Application',
      url: 'plot-ai.app',
      image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    },
  ];

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-[#F7F4EE]">
      <AmbientBackground variant="hero" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-[11px] sm:text-xs font-bold uppercase tracking-widest mb-6 shadow-xs">
              DIGITAL STUDIO
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] leading-[1.12] mb-6 tracking-tight">
              We Design and Build Digital Experiences for Modern Businesses.
            </h1>

            {/* Supporting Text */}
            <p className="text-[#5F5A52] text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-2xl font-normal">
              From web applications and SaaS platforms to UI/UX design, e-commerce, AI solutions, and custom software.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <Link
                to="/contact"
                className="btn-primary text-sm py-3.5 px-7 rounded-xl shadow-xs transition-all w-full sm:w-auto justify-center"
              >
                Start a Project →
              </Link>
              <Link
                to="/projects"
                className="btn-secondary text-sm py-3.5 px-7 rounded-xl transition-all w-full sm:w-auto justify-center"
              >
                View Our Work
              </Link>
            </div>

            {/* Capability Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-[#DED9D0] w-full">
              <span className="text-xs text-[#5F5A52] font-semibold uppercase tracking-wider mr-2">Capabilities:</span>
              {capabilityChips.map((cap) => (
                <span
                  key={cap}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-[#DED9D0] text-[#171717] text-xs font-medium shadow-xs"
                >
                  {cap}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Layered Real Project Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* CARD 2: Layered Back Card (Spiritual Garments Showcase) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -top-6 -right-3 sm:-right-6 w-[88%] bg-white rounded-2xl border border-[#DED9D0] shadow-md overflow-hidden opacity-90 hidden sm:block pointer-events-none z-0"
              >
                {/* Browser Header */}
                <div className="bg-[#EBE7DF]/90 px-3.5 py-2 border-b border-[#DED9D0] flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
                  </div>
                  <div className="bg-white px-3 py-0.5 rounded-md text-[10px] text-[#5F5A52] font-mono flex-1 text-center truncate">
                    {showcaseProjects[1].url}
                  </div>
                </div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={showcaseProjects[1].image}
                    alt={showcaseProjects[1].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* CARD 1: Main Primary Front Card (BharatSkillz Showcase) */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 bg-white rounded-2xl border border-[#DED9D0] shadow-xl overflow-hidden"
              >
                {/* Browser Header Bar */}
                <div className="bg-[#EBE7DF] px-4 py-3 border-b border-[#DED9D0] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="bg-white border border-[#DED9D0] px-4 py-1 rounded-md text-xs text-[#5F5A52] font-mono flex items-center gap-2 max-w-[220px] truncate shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3F] animate-pulse" />
                    https://{showcaseProjects[0].url}
                  </div>
                  <span className="text-[10px] font-semibold text-[#E85D3F] uppercase tracking-wider bg-[#FCE8E2] px-2.5 py-0.5 rounded border border-[#E85D3F]/20">
                    {showcaseProjects[0].tag}
                  </span>
                </div>

                {/* Screenshot Media Window */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-[#F7F4EE]">
                  <img
                    src={showcaseProjects[0].image}
                    alt={showcaseProjects[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/70 via-transparent to-transparent" />

                  {/* On-Image Product Label */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <div>
                      <div className="text-xs font-mono text-[#FCE8E2] uppercase font-semibold tracking-wider">Featured Build</div>
                      <div className="text-base sm:text-lg font-bold text-white leading-tight">{showcaseProjects[0].title}</div>
                    </div>
                    <Link
                      to="/projects"
                      className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#F7F4EE] text-[#171717] text-xs font-semibold shadow-xs transition-all"
                    >
                      Case Study →
                    </Link>
                  </div>
                </div>

                {/* Footer Feature Bar */}
                <div className="p-4 bg-[#F7F4EE] border-t border-[#DED9D0] flex items-center justify-between text-xs text-[#5F5A52]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E85D3F]" />
                    <span className="font-semibold text-[#171717]">React • TypeScript • Tailwind</span>
                  </div>
                  <span className="text-[#171717] font-semibold bg-white px-2.5 py-0.5 rounded-md border border-[#DED9D0]">
                    Live Product
                  </span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────
export function TrustStrip() {
  const { settings } = useSettings();
  const badges = (settings?.techBadges && settings.techBadges.length > 0)
    ? settings.techBadges
    : ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'MySQL', 'Firebase', 'Tailwind CSS', 'AI', 'REST APIs', 'GraphQL'];

  // Duplicate items 4x to ensure smooth seamless marquee translation across all screen widths
  const marqueeItems = [...badges, ...badges, ...badges, ...badges];

  return (
    <section className="py-9 border-y border-[#DED9D0] bg-[#EBE7DF]/30 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-[#5F5A52] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3F] animate-pulse" />
          Modern Web Stack & Engineering Tools
        </p>
      </div>

      {/* Marquee viewport with gradient mask edges */}
      <div className="relative w-full overflow-hidden flex items-center">
        {/* Gradient edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#F4F0E8] via-[#F4F0E8]/70 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#F4F0E8] via-[#F4F0E8]/70 to-transparent z-10 pointer-events-none" />

        {/* Marquee track */}
        <div className="flex gap-3 sm:gap-4 animate-marquee py-1.5">
          {marqueeItems.map((tech, idx) => (
            <div
              key={`${tech}-${idx}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#DED9D0] text-[#171717] text-xs font-semibold hover:border-[#E85D3F] hover:text-[#E85D3F] hover:shadow-xs transition-all cursor-default shrink-0 group/badge"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3F]/40 group-hover/badge:bg-[#E85D3F] transition-colors" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── About Section ─────────────────────────────────────────────────────────
export function AboutSection() {
  const capabilities = [
    'Frontend Engineering',
    'Backend & Database APIs',
    'UI/UX Design',
    'Responsive Web Layouts',
    'E-Commerce & SaaS',
    'Performance Optimization',
  ];

  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
      <AmbientBackground variant="subtle" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
              ABOUT ZENVORA
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.15]">
              We&apos;re A Focused Digital Studio Building Big Ideas.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-6"
          >
            <p className="text-[#5F5A52] text-base sm:text-lg md:text-xl leading-relaxed mb-8 font-normal">
              We&apos;re a two-person web development team focused on building modern websites and web applications for businesses, startups and creators.
            </p>

            <div className="space-y-3">
              <div className="text-xs font-mono uppercase font-semibold text-[#5F5A52] tracking-wider mb-3">
                Capabilities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((item) => (
                  <div
                    key={item}
                    className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#DED9D0] shadow-xs flex items-center gap-3 hover:border-[#E85D3F]/40 transition-all group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] shrink-0 group-hover:bg-[#E85D3F] group-hover:text-white transition-all shadow-xs">
                      <Check size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-[#171717] font-semibold text-xs sm:text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─── Services Section ──────────────────────────────────────────────────────
const serviceIcons: Record<string, React.ElementType> = {
  Globe, Target, ShoppingBag, Layers, RefreshCw, Brain,
};

const serviceData = [
  {
    number: '01',
    slug: 'web-development',
    icon: 'Globe',
    title: 'Custom Web Development',
    description: 'Professional, responsive business websites engineered for speed, conversion, and brand authority.',
  },
  {
    number: '02',
    slug: 'ecommerce',
    icon: 'ShoppingBag',
    title: 'E-Commerce Development',
    description: 'Modern online storefronts designed around products, customers, and smooth shopping experiences.',
  },
  {
    number: '03',
    slug: 'web-applications',
    icon: 'Layers',
    title: 'Web Applications & SaaS',
    description: 'Custom web applications built around your workflows, users, and business requirements.',
  },
  {
    number: '04',
    slug: 'ui-ux',
    icon: 'Layout',
    title: 'UI/UX Design',
    description: 'Transform digital products with modern typography, user research, wireframes, and design systems.',
  },
  {
    number: '05',
    slug: 'ai-integration',
    icon: 'Brain',
    title: 'AI Integration',
    description: 'Add practical AI capabilities, OpenAI APIs, and intelligent automated workflows to modern web apps.',
  },
  {
    number: '06',
    slug: 'backend-api',
    icon: 'Database',
    title: 'Backend API & Database',
    description: 'Secure RESTful APIs, database architecture, third-party software integrations, and cloud logic.',
  },
];

export function ServicesSection({ hideHeader = false }: { hideHeader?: boolean }) {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    import('../../repositories/mock/MockServiceRepository').then(({ serviceRepository }) => {
      serviceRepository.getPublished().then(setServices);
    });
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
      <AmbientBackground variant="services" />
      <div className="container-custom relative z-10">
        {!hideHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-12 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
              SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] mb-4 tracking-tight leading-tight">
              Websites & Web Applications Built For Business.
            </h2>
            <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed">
              From business websites to custom web applications, we design and develop digital experiences around real business goals.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {(services.length > 0 ? services : serviceData).map((service, i) => {
            const Icon = serviceIcons[service.icon] || Globe;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="bg-white p-7 sm:p-8 group rounded-2xl border border-[#DED9D0] hover:border-[#E85D3F]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono font-bold text-[#5F5A52] group-hover:text-[#E85D3F] transition-colors">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] flex items-center justify-center text-[#171717] group-hover:bg-[#FCE8E2] group-hover:border-[#E85D3F]/30 group-hover:text-[#E85D3F] transition-all duration-300 shadow-xs">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                  </div>
                  <h3 className="text-[#171717] font-bold text-xl mb-3 group-hover:text-[#E85D3F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#5F5A52] text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#DED9D0]/60 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#171717] group-hover:text-[#E85D3F] transition-colors group/link"
                  >
                    <span>View Service Details</span>
                    <ArrowRight size={14} className="ml-1.5 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Work With Us Section ─────────────────────────────────────────────
export function WhyWorkWithUsSection() {
  const benefits = [
    {
      number: '01',
      title: 'Direct Communication',
      description: 'Talk directly with Mehak and Gopal, the developers designing and engineering your project.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Modern Development',
      description: 'Built using clean, modern and maintainable web technologies for long-term speed.',
      icon: Code2,
    },
    {
      number: '03',
      title: 'Responsive By Design',
      description: 'Designed to work smoothly across desktop, tablet and mobile devices.',
      icon: Smartphone,
    },
    {
      number: '04',
      title: 'End-to-End Delivery',
      description: 'From planning and design to full development, testing, and deployment.',
      icon: Rocket,
    },
  ];

  const highlighted = benefits[0];
  const otherBenefits = benefits.slice(1);

  return (
    <section className="section-padding relative overflow-hidden bg-[#EBE7DF]/30 border-y border-[#DED9D0]">
      <AmbientBackground variant="about" />
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Intro + Visually Emphasized Benefit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
                WHY WORK WITH US
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#171717] tracking-tight leading-[1.15] mb-4">
                Two Developers.<br />
                <span className="text-[#E85D3F]">Direct Collaboration.</span>
              </h2>
              <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed mb-8">
                With two developers working directly on your project, you get clear communication, faster feedback and hands-on development from start to launch.
              </p>
            </div>

            {/* Emphasized Benefit Card */}
            <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#DED9D0] shadow-xs hover:border-[#E85D3F]/40 transition-all duration-300 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-[#E85D3F] bg-[#FCE8E2] px-2.5 py-1 rounded-md border border-[#E85D3F]/20">
                  {highlighted.number}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] group-hover:bg-[#E85D3F] group-hover:text-white transition-all duration-300 shadow-xs">
                  <highlighted.icon size={18} strokeWidth={1.75} />
                </div>
              </div>
              <h3 className="text-[#171717] font-bold text-xl mb-2 group-hover:text-[#E85D3F] transition-colors">
                {highlighted.title}
              </h3>
              <p className="text-[#5F5A52] text-sm leading-relaxed">
                {highlighted.description}
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Separated List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-0 divide-y divide-[#DED9D0] bg-white p-7 sm:p-10 rounded-2xl border border-[#DED9D0] shadow-xs"
          >
            {otherBenefits.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.number}
                  className="py-6 sm:py-7 first:pt-0 last:pb-0 group transition-all"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono font-bold text-[#5F5A52] group-hover:text-[#E85D3F] transition-colors w-6">
                        {item.number}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] flex items-center justify-center text-[#171717] group-hover:bg-[#FCE8E2] group-hover:border-[#E85D3F]/30 group-hover:text-[#E85D3F] transition-all duration-300 shadow-xs">
                        <Icon size={18} strokeWidth={1.75} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#171717] font-bold text-lg sm:text-xl mb-1.5 group-hover:text-[#E85D3F] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[#5F5A52] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export const WhyZenvoraSection = WhyWorkWithUsSection;

// ─── Process Section ──────────────────────────────────────────────────────
const processSteps = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'We understand your business, target audience, project goals and functional requirements.',
  },
  {
    num: '02',
    title: 'PLAN',
    desc: 'We define the page structure, UI design direction, feature scope and technical approach.',
  },
  {
    num: '03',
    title: 'BUILD',
    desc: 'We design and engineer your website while sharing transparent development updates.',
  },
  {
    num: '04',
    title: 'REFINE',
    desc: 'You review the interactive build and we fine-tune details to perfection.',
  },
  {
    num: '05',
    title: 'LAUNCH',
    desc: 'We deploy the website, verify performance across devices, and complete handover.',
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
      <AmbientBackground variant="subtle" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
            PROCESS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight mb-4">
            From First Conversation To Launch.
          </h2>
          <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed">
            A simple, transparent process designed to keep your project moving.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-11 left-12 right-12 h-[2px] bg-[#DED9D0] z-0" />
          <div className="lg:hidden absolute top-10 bottom-10 left-10 w-[2px] bg-[#DED9D0] z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-6 relative z-10">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-[#DED9D0] hover:border-[#E85D3F]/40 shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between h-full relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] flex items-center justify-center text-[#171717] font-mono font-bold text-sm group-hover:bg-[#E85D3F] group-hover:border-[#E85D3F] group-hover:text-white transition-all duration-300 shadow-xs relative z-10">
                      {step.num}
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#DED9D0] group-hover:bg-[#E85D3F] transition-colors" />
                  </div>
                  <h3 className="text-[#171717] font-bold font-mono text-base uppercase tracking-wider mb-2 group-hover:text-[#E85D3F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Section ──────────────────────────────────────────────────────
export function PricingSection({ showFullCta = true }: { showFullCta?: boolean }) {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
      <AmbientBackground variant="pricing" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
            TRANSPARENT PRICING
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight mb-4">
            Clear Starting Points For Your Project.
          </h2>
          <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed">
            Every project is unique, so our packages give you a clear baseline with custom requirements quoted transparently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {pricingConfig.packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bg-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                pkg.highlighted
                  ? 'border-2 border-[#E85D3F] shadow-md ring-4 ring-[#E85D3F]/10 -translate-y-1 sm:-translate-y-2'
                  : 'border border-[#DED9D0] shadow-xs hover:border-[#171717]/30'
              }`}
            >
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 py-1 rounded-full bg-[#E85D3F] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow-xs">
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-[#171717] font-bold text-lg uppercase font-mono tracking-wider mb-2">
                  {pkg.name}
                </h3>
                <p className="text-[#5F5A52] text-xs sm:text-sm mb-6 leading-relaxed">
                  {pkg.target}
                </p>

                <div className="mb-6 pb-6 border-b border-[#DED9D0]">
                  <span className="text-xs font-mono text-[#5F5A52] block mb-1 font-medium">
                    {pkg.priceSubtext}
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
                    {pkg.price}
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-mono uppercase font-semibold text-[#5F5A52] tracking-wider mb-3">
                    Included Features
                  </div>
                  {pkg.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717] font-medium">
                      <Check size={16} className="text-[#E85D3F] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to={pkg.ctaLink}
                className={`w-full py-3.5 px-5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center inline-flex items-center justify-center gap-2 ${
                  pkg.highlighted
                    ? 'bg-[#E85D3F] hover:bg-[#D44C2F] text-white shadow-xs'
                    : 'bg-[#F7F4EE] hover:bg-white text-[#171717] border border-[#DED9D0]'
                }`}
              >
                <span>{pkg.ctaText}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {showFullCta && (
          <div className="mt-12 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#DED9D0] text-[#171717] text-xs sm:text-sm font-semibold hover:border-[#E85D3F] hover:text-[#E85D3F] shadow-xs transition-all group"
            >
              <span>View Full Pricing</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Team Section ──────────────────────────────────────────────────────────
export function TeamSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#EBE7DF]/30 border-t border-[#DED9D0]">
      <AmbientBackground variant="about" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
            WORKING DIRECTLY WITH DEVELOPERS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight mb-4">
            Two Developers. One Shared Goal.
          </h2>
          <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed">
            No middle managers or bloated overhead. You collaborate directly with Mehak and Gopal from initial concept to launch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#DED9D0] shadow-xs hover:border-[#E85D3F]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#FCE8E2] border-2 border-[#E85D3F]/30 flex items-center justify-center text-[#E85D3F] font-mono font-extrabold text-xl shadow-xs group-hover:scale-105 transition-all">
                    {member.initials || member.name.substring(0, 2).toUpperCase()}
                  </div>
                  {(member.linkedin || member.github) && (
                    <div className="flex items-center gap-2">
                      {member.linkedin && member.linkedin !== 'https://linkedin.com' && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] flex items-center justify-center text-[#5F5A52] hover:text-[#E85D3F] hover:bg-[#FCE8E2] transition-all"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon size={15} />
                        </a>
                      )}
                      {member.github && member.github !== 'https://github.com' && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] flex items-center justify-center text-[#5F5A52] hover:text-[#171717] hover:bg-white transition-all"
                          aria-label={`${member.name} GitHub`}
                        >
                          <GithubIcon size={15} />
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="inline-block px-3 py-1 rounded-md bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                  {member.role}
                </div>

                <h3 className="text-[#171717] font-bold text-2xl mb-3 group-hover:text-[#E85D3F] transition-colors">
                  {member.name}
                </h3>

                {member.bio && (
                  <p className="text-[#5F5A52] text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                )}

                {member.skills && member.skills.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase font-semibold text-[#5F5A52] tracking-wider">
                      Core Skills
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-[#F7F4EE] border border-[#DED9D0] text-[#171717] text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ───────────────────────────────────────────────────────────
export const faqsList = [
  {
    q: 'What type of websites do you build?',
    a: 'We build business websites, landing pages, e-commerce stores, custom web applications, and digital product interfaces tailored to your specific business goals.',
  },
  {
    q: 'How long does a website project take?',
    a: 'Timelines vary depending on project scope, page count, and custom features. After discussing your requirements, we agree on a clear project roadmap before development starts.',
  },
  {
    q: 'Will I work directly with the developers?',
    a: 'Yes! You work directly with Mehak and Gopal throughout the entire project — ensuring fast communication, quick iterations, and technical accuracy.',
  },
  {
    q: 'What information do you need to get started?',
    a: 'We start with your project goals, target audience, brand assets (logos, copy, images), and any specific functional requirements you need built.',
  },
  {
    q: 'Do you provide domain registration and hosting guidance?',
    a: 'Domain registration and hosting fees are separate third-party costs. However, we guide you through setup and handle complete live deployment for your site.',
  },
  {
    q: 'Can you redesign our existing website?',
    a: 'Yes. We can modernize your existing website with a fresh UI design, improved mobile experience, cleaner code, and optimized page speed.',
  },
  {
    q: 'Can custom web application features be added later?',
    a: 'Absolutely. We build with modern, modular architectures so new features, APIs, or database capabilities can easily be integrated as your business grows.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. We offer launch support and ongoing maintenance options to ensure your website remains fast, secure, and fully operational.',
  },
  {
    q: 'How does payment work?',
    a: 'Payments are structured around clear project milestones with an initial deposit to initiate work and remaining balance upon completion and sign-off.',
  },
];

export function FaqSection() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const col1 = faqsList.slice(0, 5);
  const col2 = faqsList.slice(5);

  const renderFaqCard = (faq: typeof faqsList[0], actualIndex: number) => {
    const isOpen = openIndexes.includes(actualIndex);
    return (
      <motion.div
        key={faq.q}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: (actualIndex % 5) * 0.06 }}
        className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
          isOpen
            ? 'border-[#E85D3F]/50 shadow-xs ring-1 ring-[#E85D3F]/10'
            : 'border-[#DED9D0] shadow-xs hover:border-[#171717]/30'
        }`}
      >
        <button
          type="button"
          onClick={() => toggleFaq(actualIndex)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${actualIndex}`}
          className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-[#171717] text-base sm:text-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E85D3F] rounded-2xl group"
        >
          <span className="group-hover:text-[#E85D3F] transition-colors">
            {faq.q}
          </span>
          <div
            className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${
              isOpen
                ? 'bg-[#E85D3F] border-[#E85D3F] text-white'
                : 'bg-[#F7F4EE] border-[#DED9D0] text-[#5F5A52] group-hover:bg-[#FCE8E2] group-hover:border-[#E85D3F]/30 group-hover:text-[#E85D3F]'
            }`}
          >
            {isOpen ? <Minus size={16} strokeWidth={2.2} /> : <Plus size={16} strokeWidth={2.2} />}
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={`faq-answer-${actualIndex}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-[#5F5A52] text-sm sm:text-base leading-relaxed border-t border-[#DED9D0]/60 pt-4">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE] border-t border-[#DED9D0]">
      <AmbientBackground variant="subtle" />
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight">
            Questions, Answered.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-start">
          <div className="space-y-4 sm:space-y-6">
            {col1.map((faq, i) => renderFaqCard(faq, i))}
          </div>
          <div className="space-y-4 sm:space-y-6">
            {col2.map((faq, i) => renderFaqCard(faq, i + 5))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section (High-Impact Dark Charcoal Conclusion) ─────────────────────
export function CTASection() {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[#171717] border border-[#262626] p-10 sm:p-14 lg:p-20 text-center shadow-xl"
        >
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E85D3F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E85D3F]/15 border border-[#E85D3F]/30 text-[#E85D3F] text-xs font-mono font-bold uppercase tracking-widest mb-6">
              READY TO BUILD?
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ready To Build A Website That Means Business?
            </h2>

            <p className="text-[#DED9D0] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
              Tell us about your business goals and vision. We&apos;ll discuss the right approach, scope and timeline to build your website.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
              <Link
                to="/contact"
                className="px-8 py-4 rounded-xl bg-[#E85D3F] hover:bg-[#D44C2F] text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:-translate-y-0.5 inline-flex items-center gap-2.5 group"
              >
                <span>Start A Project</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="https://wa.me/918929932759"
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 rounded-xl bg-[#262626] hover:bg-[#333333] border border-[#404040] text-white font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5 shadow-xs"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
