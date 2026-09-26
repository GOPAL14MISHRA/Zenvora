import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle2, HelpCircle,
  Sparkles, Layers, Globe, ShoppingBag, Layout, Brain, Database
} from 'lucide-react';
import { SEO } from '../../components/SEO';
import { detailedServices } from '../../data/servicesData';
import { projects } from '../../data/projects';
import { ProjectCard } from '../../components/ui/Cards';
import { AmbientBackground } from '../../components/ui/AmbientBackground';
import { CTASection } from '../../components/sections/HomeSections';
import { getBreadcrumbSchema, getServiceSchema } from '../../utils/seoUtils';

const serviceIconMap: Record<string, any> = {
  Globe, ShoppingBag, Layers, Layout, Brain, Database,
};

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const service = slug ? detailedServices[slug] : null;

  if (!service) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] pt-36 pb-20 flex flex-col items-center justify-center px-4 text-center">
        <SEO title="Service Not Found" noindex />
        <h1 className="text-3xl font-bold text-[#171717] mb-3">Service Not Found</h1>
        <p className="text-[#5F5A52] text-sm mb-6 max-w-md">
          The service page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/services" className="btn-primary text-xs py-2.5 px-5">
          <ArrowLeft size={14} /> Back to Services
        </Link>
      </div>
    );
  }

  const IconComponent = serviceIconMap[service.icon] || Globe;

  const relatedProjects = projects.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/services/${service.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const serviceSchema = getServiceSchema({
    name: service.title,
    description: service.shortDescription,
    slug: service.slug,
  });

  return (
    <div className="bg-[#F7F4EE] min-h-screen">
      <SEO
        title={service.metaTitle}
        description={service.metaDescription}
        url={`https://zenvora.dev/services/${service.slug}`}
        type="service"
        schema={[breadcrumbSchema, serviceSchema]}
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F4EE] border-b border-[#DED9D0]/60">
        <AmbientBackground variant="services" />
        <div className="container-custom relative z-10">
          {/* Visible Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-[#5F5A52]">
              <li>
                <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/services" className="hover:text-[#171717] transition-colors">Services</Link>
              </li>
              <li>/</li>
              <li className="text-[#E85D3F] font-bold" aria-current="page">{service.title}</li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-5 shadow-xs">
              <IconComponent size={14} />
              <span>{service.title}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] leading-tight mb-6 tracking-tight">
              {service.title}
            </h1>
            <p className="text-[#5F5A52] text-base sm:text-lg leading-relaxed mb-8">
              {service.fullDescription}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary text-xs sm:text-sm py-3 px-6 rounded-xl shadow-xs"
              >
                <span>Discuss Your Project</span>
                <ArrowRight size={14} />
              </button>
              <Link to="/projects" className="btn-secondary text-xs sm:text-sm py-3 px-6 rounded-xl">
                View Related Case Studies
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid: Who It Is For & What Is Included */}
      <section className="section-padding relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Who it is for */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl bg-white border border-[#DED9D0] shadow-xs"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717] mb-6 flex items-center gap-2">
                <Sparkles size={20} className="text-[#E85D3F]" />
                Who This Service Is For
              </h2>
              <ul className="space-y-4">
                {service.whoItIsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
                    <CheckCircle2 size={18} className="text-[#E85D3F] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What is included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl bg-white border border-[#DED9D0] shadow-xs"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-[#171717] mb-6 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-[#E85D3F]" />
                What Is Included
              </h2>
              <ul className="space-y-4">
                {service.whatIsIncluded.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#5F5A52] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#E85D3F] shrink-0 mt-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-16 bg-[#EBE7DF]/40 border-y border-[#DED9D0] relative z-10">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mb-3">
              Our Development Process
            </h2>
            <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed">
              We follow a structured 4-step engineering workflow from discovery to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((p) => (
              <div key={p.step} className="p-6 rounded-2xl bg-white border border-[#DED9D0] shadow-xs space-y-3">
                <span className="text-xs font-mono font-bold text-[#E85D3F] bg-[#FCE8E2] px-2.5 py-1 rounded-lg inline-block">
                  {p.step}
                </span>
                <h3 className="text-base font-bold text-[#171717]">{p.title}</h3>
                <p className="text-xs text-[#5F5A52] leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects / Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="section-padding relative z-10">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                  Related Case Studies & Projects
                </h2>
                <p className="text-xs sm:text-sm text-[#5F5A52] mt-1">
                  Explore how we applied {service.title} in real-world products.
                </p>
              </div>
              <Link to="/projects" className="text-xs font-bold text-[#E85D3F] hover:underline hidden sm:block">
                View All Projects →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((proj, idx) => (
                <ProjectCard key={proj.id} project={proj} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions (FAQs) */}
      {service.faqs.length > 0 && (
        <section className="py-16 bg-white border-t border-[#DED9D0] relative z-10">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mb-3 flex items-center justify-center gap-2">
                <HelpCircle size={22} className="text-[#E85D3F]" />
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-[#5F5A52]">
                Common questions regarding our {service.title.toLowerCase()}.
              </p>
            </div>

            <div className="space-y-4">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-[#F7F4EE] border border-[#DED9D0] space-y-2">
                  <h3 className="text-base font-bold text-[#171717]">{faq.question}</h3>
                  <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </div>
  );
}
