import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import {
  HeroSection, TrustStrip, StatsSection, ServicesSection,
  WhyZenvoraSection, ProcessSection, CTASection,
} from '../../components/sections/HomeSections';
import { ProjectCard } from '../../components/ui/Cards';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

export function HomePage() {
  const [featured, setFeatured] = useState<Project[]>([]);

  useEffect(() => {
    const unsubscribe = projectRepository.subscribe((data) => {
      setFeatured(data.filter((p) => p.featured));
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <SEO />
      <HeroSection />
      <TrustStrip />
      <StatsSection />
      <ServicesSection />
      <WhyZenvoraSection />
      <ProcessSection />

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
            >
              <div>
                <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Work</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Selected Work</h2>
                <p className="text-gray-400 mt-2">
                  Explore some of the digital products and experiences created by Zenvora Digital.
                </p>
              </div>
              <Link to="/projects" className="btn-secondary whitespace-nowrap shrink-0">
                All Projects <ArrowRight size={14} />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}


