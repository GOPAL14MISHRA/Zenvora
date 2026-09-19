import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Heart } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { TeamCard } from '../../components/ui/Cards';
import { teamRepository } from '../../repositories/mock/MockTeamRepository';
import { CTASection } from '../../components/sections/HomeSections';
import type { TeamMember } from '../../types';

const values = [
  { icon: CheckCircle2, label: 'Quality', desc: 'We care deeply about the quality of everything we build.' },
  { icon: Target, label: 'Transparency', desc: 'We communicate clearly and honestly at every stage.' },
  { icon: Heart, label: 'Ownership', desc: 'We take full ownership of our work and its outcomes.' },
  { icon: CheckCircle2, label: 'Innovation', desc: 'We embrace modern tools and fresh thinking.' },
  { icon: Target, label: 'Long-Term Thinking', desc: 'We build for scale, not just for today.' },
];

export function AboutPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    teamRepository.getPublished().then(setTeam);
  }, []);

  return (
    <>
      <SEO title="About" description="Learn about Zenvora Digital, our story, mission, values and team." />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">About Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Building Digital Products With Purpose.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
              Zenvora Digital is a software and digital product studio focused on building modern digital experiences for businesses, startups and founders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-[#0D1117]/40">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Story</p>
              <h2 className="text-3xl font-bold text-white mb-5">A Studio Built Around Great Products</h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  Zenvora Digital was founded with a clear purpose: to build digital products that actually work for the businesses and people using them.
                </p>
                <p>
                  We are a modern digital product studio focused on the intersection of design, engineering and practical technology. We work with startups, businesses and founders who want to build something meaningful in the digital world.
                </p>
                <p>
                  Every project we take on starts with a simple question: what problem are we actually solving? From there, we design, engineer and deliver digital experiences built for the real world.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="card-base p-8 border-blue-500/10"
            >
              <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Mission</p>
              <p className="text-2xl font-semibold text-white leading-snug">
                "Make high-quality digital technology accessible to ambitious businesses and founders."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Values</p>
            <h2 className="text-3xl font-bold text-white">What We Stand For</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="card-base p-5 hover:border-blue-500/20 transition-all"
                >
                  <Icon size={18} className="text-blue-400 mb-3" />
                  <h3 className="text-white font-semibold text-sm mb-1.5">{v.label}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-[#0D1117]/40">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto mb-12"
          >
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Team</p>
            <h2 className="text-3xl font-bold text-white mb-3">Meet The Team</h2>
            <p className="text-gray-400">The people building Zenvora Digital.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-5">
            {team.map((m, i) => <TeamCard key={m.id} member={m} index={i} />)}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}


