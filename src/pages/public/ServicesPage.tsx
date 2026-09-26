import { motion } from 'framer-motion';
import { SEO } from '../../components/SEO';
import { ServicesSection, CTASection } from '../../components/sections/HomeSections';
import { AmbientBackground } from '../../components/ui/AmbientBackground';

export function ServicesPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen">
      <SEO 
        title="Zenvora Digitals | Web Development & Digital Services" 
        description="Explore Zenvora Digitals services including website development, web applications, e-commerce, UI/UX design, AI integration and backend/API development." 
        url="https://www.zenvoradigitals.tech/services"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F7F4EE]">
        <AmbientBackground variant="services" />
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full lg:w-1/2 max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
                SERVICES
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] mb-6 leading-tight">
                Websites & Web Applications Built For Business.
              </h1>
              <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed max-w-2xl">
                From business websites to custom web applications and e-commerce platforms, we design and build digital products engineered for real business results.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full lg:w-[48%] mt-8 lg:mt-0 relative h-[300px] sm:h-[400px] lg:h-[450px]"
            >
              <img 
                src="/wide_clean_minimal_vector_3d_style_illustration.png" 
                alt="Web development and digital solutions illustration" 
                className="w-full h-full object-cover object-right mix-blend-multiply drop-shadow-sm"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesSection hideHeader={true} />
      <CTASection />
    </div>
  );
}

