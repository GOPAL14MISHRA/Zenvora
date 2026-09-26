import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import {
  HeroSection, TrustStrip, AboutSection, ServicesSection,
  WhyWorkWithUsSection, ProcessSection, TeamSection, PricingSection, FaqSection, CTASection,
} from '../../components/sections/HomeSections';
import { ProjectCard } from '../../components/ui/Cards';
import { AmbientBackground } from '../../components/ui/AmbientBackground';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import { projects as initialProjects } from '../../data/projects';
import type { Project } from '../../types';

import { getOrganizationSchema, getWebSiteSchema } from '../../utils/seoUtils';

const homeSchemas = [getOrganizationSchema(), getWebSiteSchema()];

export function HomePage() {
  const [featured, setFeatured] = useState<Project[]>(initialProjects.filter(p => p.featured));

  useEffect(() => {
    const unsubscribe = projectRepository.subscribe((data) => {
      setFeatured(data.filter((p) => p.featured));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SEO
        title="Zenvora Digitals | Websites, Web Apps & Digital Solutions"
        description="Zenvora Digitals builds professional websites, web applications, e-commerce stores, SaaS products and AI-powered digital solutions for businesses in India and worldwide."
        schema={homeSchemas}
      />
      <HeroSection />
      <TrustStrip />
      <AboutSection />
      <ServicesSection />

      {/* Featured Projects / Selected Work */}
      {featured.length > 0 && (
        <section className="section-padding relative overflow-hidden bg-[#F7F4EE]">
          <AmbientBackground variant="projects" />
          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-3">
                  SELECTED WORK
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#171717] tracking-tight">
                  Built For Real-World Business.
                </h2>
                <p className="text-[#5F5A52] text-base sm:text-lg mt-2 max-w-xl">
                  A selection of websites and digital products we&apos;ve designed and engineered.
                </p>
              </div>
              <Link to="/projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#DED9D0] text-[#171717] text-xs sm:text-sm font-semibold hover:border-[#E85D3F] hover:text-[#E85D3F] shadow-xs transition-all whitespace-nowrap shrink-0 group">
                <span>View All Projects</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Work With Us Section (After Selected Work) */}
      <WhyWorkWithUsSection />

      {/* Homepage Pricing Preview Section */}
      <PricingSection showFullCta={true} />

      {/* Process Section */}
      <ProcessSection />

      {/* Team Section */}
      <TeamSection />

      {/* FAQ Accordion Section */}
      <FaqSection />

      <CTASection />
    </>
  );
}




