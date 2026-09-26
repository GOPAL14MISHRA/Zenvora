import { motion } from 'framer-motion';
import { CheckCircle2, Target, Heart, Sparkles, ShieldCheck } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { AboutSection, TeamSection, CTASection } from '../../components/sections/HomeSections';

const values = [
  { icon: CheckCircle2, label: 'Quality First', desc: 'We care deeply about code quality, architecture, and UI precision in everything we build.' },
  { icon: Target, label: 'Transparency', desc: 'Direct, honest communication with clear milestones and transparent development progress.' },
  { icon: Heart, label: 'Full Ownership', desc: 'We take end-to-end accountability for our engineering outcomes and user experiences.' },
  { icon: Sparkles, label: 'Modern Stack', desc: 'We leverage modern tools, frameworks, and practical AI to deliver high-velocity results.' },
  { icon: ShieldCheck, label: 'Long-Term Thinking', desc: 'We engineer digital products for long-term scalability, clean maintenance, and business growth.' },
];

export function AboutPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen pt-20">
      <SEO 
        title="About Zenvora Digitals | Digital Solutions Company" 
        description="Learn about Zenvora Digitals, our services, approach and mission to build modern digital solutions for businesses in India and worldwide." 
        url="https://www.zenvoradigitals.tech/about"
      />

      {/* Main Concise About Section */}
      <AboutSection />

      {/* Values */}
      <section className="section-padding bg-[#EBE7DF]/30 border-t border-[#DED9D0]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center max-w-xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-3">
              OUR VALUES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">What We Stand For</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-6 sm:p-7 hover:border-[#E85D3F]/40 rounded-2xl border border-[#DED9D0] transition-all shadow-xs"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center mb-4 text-[#E85D3F]">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-[#171717] font-bold text-base mb-2">{v.label}</h3>
                  <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />

      <CTASection />
    </div>
  );
}
