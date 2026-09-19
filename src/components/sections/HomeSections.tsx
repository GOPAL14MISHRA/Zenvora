import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, ShoppingBag, Brain, Paintbrush, Server,
  Layers, Zap
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

// ─── Hero Section ──────────────────────────────────────────────────────────
function HeroVisual() {
  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center select-none">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute w-60 h-60 rounded-full bg-violet-500/5 blur-3xl translate-x-16" />
      </div>

      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40 rounded-3xl" />

      {/* Main dashboard card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 w-72 bg-[#111827] border border-white/10 rounded-2xl p-4 shadow-2xl"
      >
        {/* Card header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex-1 h-1.5 bg-white/5 rounded-full" />
        </div>
        {/* Fake code */}
        <div className="space-y-1.5 font-mono text-[10px]">
          <div><span className="text-violet-400">const</span> <span className="text-blue-300">product</span> <span className="text-white/40">=</span> <span className="text-green-400">buildWithZenvora</span><span className="text-white/40">(</span><span className="text-orange-300">'your-idea'</span><span className="text-white/40">);</span></div>
          <div><span className="text-violet-400">await</span> <span className="text-blue-300">product</span><span className="text-white/40">.</span><span className="text-yellow-300">launch</span><span className="text-white/40">();</span></div>
          <div className="text-white/20">// → Ready for the world ✓</div>
        </div>
        {/* Stats row */}
        <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2">
          {[['99%', 'Uptime'], ['<2s', 'Load'], ['A+', 'Perf']].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <div className="text-blue-400 text-xs font-bold">{val}</div>
              <div className="text-white/30 text-[9px]">{lbl}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating badges */}
      {[
        { label: 'React', icon: '⚛', x: '-left-4', y: 'top-8', delay: 0 },
        { label: 'TypeScript', icon: 'TS', x: 'right-0', y: 'top-16', delay: 0.5 },
        { label: 'Node.js', icon: '🟢', x: '-left-6', y: 'bottom-16', delay: 1 },
        { label: 'AI', icon: '🤖', x: 'right-2', y: 'bottom-8', delay: 1.5 },
      ].map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: badge.delay + 0.5, duration: 0.4 }}
          className={`absolute ${badge.x} ${badge.y} z-20`}
        >
          <div className="bg-[#0D1117] border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
            <span className="text-xs">{badge.icon}</span>
            <span className="text-white text-[10px] font-medium">{badge.label}</span>
          </div>
        </motion.div>
      ))}

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
        <line x1="15%" y1="20%" x2="40%" y2="45%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="85%" y1="25%" x2="60%" y2="45%" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="15%" y1="75%" x2="40%" y2="55%" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="85%" y1="80%" x2="60%" y2="55%" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

export function HeroSection() {
  const { settings } = useSettings();

  const techPills = ['Web Development', 'SaaS', 'AI', 'E-commerce', 'UI/UX'];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <Zap size={11} className="fill-current" />
              Digital Product & Software Studio
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
              Turning Ideas Into{' '}
              <span className="gradient-text">Digital Experiences</span>{' '}
              That Drive Growth.
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              {settings.heroDescription}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/contact" className="btn-primary">
                Start a Project
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn-secondary">
                Explore Our Work
              </Link>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {techPills.map((tech) => (
                <span key={tech}
                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            <HeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}

// ─── Trust Strip ──────────────────────────────────────────────────────────
export function TrustStrip() {
  const { settings } = useSettings();
  return (
    <section className="py-12 border-y border-white/5 bg-[#0D1117]/50">
      <div className="container-custom">
        <p className="text-center text-gray-500 text-xs uppercase tracking-widest mb-8 font-medium">
          Built with modern technology. Designed for real-world products.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {settings.techBadges.map((tech) => (
            <span key={tech}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:border-blue-500/30 hover:text-white transition-all cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Stats Section ─────────────────────────────────────────────────────────
export function StatsSection() {
  const { settings } = useSettings();
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {settings.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg-primary p-8 text-center group hover:bg-[#0D1117] transition-colors"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ──────────────────────────────────────────────────────
const serviceIcons: Record<string, React.ElementType> = {
  Layers, Globe, ShoppingBag, Brain, Paintbrush, Server,
};

const serviceData = [
  { number: '01', icon: 'Layers', title: 'Full-Stack Development', description: 'Scalable web applications with powerful frontend experiences and reliable backend architecture.' },
  { number: '02', icon: 'Globe', title: 'Web & SaaS Development', description: 'Modern websites and SaaS platforms designed for performance, usability and long-term growth.' },
  { number: '03', icon: 'ShoppingBag', title: 'E-Commerce Development', description: 'High-converting e-commerce experiences with product, cart, order and admin management.' },
  { number: '04', icon: 'Brain', title: 'AI Integration', description: 'Practical AI-powered features that automate workflows and create smarter digital products.' },
  { number: '05', icon: 'Paintbrush', title: 'UI/UX Development', description: 'Beautiful and intuitive interfaces designed around real users and business goals.' },
  { number: '06', icon: 'Server', title: 'API & Backend Development', description: 'Secure APIs, authentication, databases and backend systems built around your requirements.' },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-[#0D1117]/40">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mb-16"
        >
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything You Need To Build Digital
          </h2>
          <p className="text-gray-400 leading-relaxed">
            From idea to production, we design and engineer digital products that solve real business problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceData.map((service, i) => {
            const Icon = serviceIcons[service.icon] || Layers;
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="card-base p-6 group hover:border-blue-500/20 hover:bg-[#0D1117] transition-all duration-300 cursor-default"
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="text-xs font-mono text-gray-600 font-semibold">{service.number}</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                </div>
                <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-100 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                <div className="flex items-center text-blue-400 text-xs font-medium group-hover:gap-2 gap-1 transition-all">
                  Learn more <ArrowRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Why Zenvora ──────────────────────────────────────────────────────────
const whyItems = [
  { number: '01', title: 'Business First', desc: 'Technology should support your business goals, not complicate them.' },
  { number: '02', title: 'Modern Engineering', desc: 'Use modern technologies and scalable architecture designed for today\'s products.' },
  { number: '03', title: 'Transparent Process', desc: 'Clear communication, milestones and progress throughout development.' },
  { number: '04', title: 'Built To Scale', desc: 'Build today with tomorrow\'s users, features and growth in mind.' },
];

export function WhyZenvoraSection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Why Zenvora</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Technology With Purpose.</h2>
            <p className="text-gray-400 leading-relaxed">
              We don't just write code. We understand the problem, design the solution and build technology around your goals.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyItems.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-base p-5 hover:border-blue-500/20 transition-all"
              >
                <span className="text-[10px] font-mono text-gray-600 font-semibold block mb-3">{item.number}</span>
                <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ──────────────────────────────────────────────────────
const processSteps = [
  { num: '01', title: 'Discover', desc: 'Understand the idea, users, requirements and business goals.' },
  { num: '02', title: 'Plan', desc: 'Define scope, features, architecture and technology.' },
  { num: '03', title: 'Design', desc: 'Create user flows and polished interfaces.' },
  { num: '04', title: 'Build', desc: 'Develop frontend, backend, integrations and functionality.' },
  { num: '05', title: 'Test', desc: 'Test responsiveness, performance, usability and reliability.' },
  { num: '06', title: 'Launch', desc: 'Deploy the product and move it into production.' },
  { num: '07', title: 'Grow', desc: 'Maintain, improve and scale the product.' },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-[#0D1117]/40">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Process</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">From Idea To Launch</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-violet-500/20 to-transparent -translate-x-1/2" />

          <div className="space-y-6 lg:space-y-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:mb-8 ${i % 2 === 0 ? '' : 'lg:direction-rtl'}`}
              >
                <div className={`${i % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'} mb-2 lg:mb-0`}>
                  <div className="card-base p-5 inline-block w-full max-w-sm hover:border-blue-500/20 transition-all">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-mono text-blue-400 font-semibold">{step.num}</span>
                      <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {/* Center dot */}
                <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-bg-primary z-10" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────
export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-[#111827] to-violet-500/10 border border-blue-500/20 p-10 lg:p-16 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-500/10 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
              Have An Idea Worth Building?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Let's turn your idea into a digital product people love to use.
            </p>
            <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
              Start a Project
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

