import { motion } from 'framer-motion';
import { SEO } from '../../components/SEO';
import { ServicesSection, CTASection } from '../../components/sections/HomeSections';

export function ServicesPage() {
  return (
    <>
      <SEO title="Services" description="Explore Zenvora Digital's full range of digital product and software development services." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <CTASection />
    </>
  );
}

