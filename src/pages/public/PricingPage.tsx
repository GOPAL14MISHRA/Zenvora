import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Info } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { PricingSection, FaqSection, CTASection } from '../../components/sections/HomeSections';
import { AmbientBackground } from '../../components/ui/AmbientBackground';

const comparisonRows = [
  { feature: 'Pages', starter: 'Up to 5', business: 'Up to 8–10', custom: 'Custom' },
  { feature: 'Responsive Design', starter: '✓', business: '✓', custom: '✓' },
  { feature: 'Custom UI', starter: 'Standard UI', business: 'Custom UI', custom: 'Bespoke UI/UX' },
  { feature: 'Contact Form', starter: '✓', business: '✓ Lead Forms', custom: '✓ Custom Forms' },
  { feature: 'WhatsApp', starter: '✓', business: '✓', custom: '✓' },
  { feature: 'SEO Setup', starter: 'Basic', business: '✓ Full Setup', custom: '✓ Advanced' },
  { feature: 'Analytics', starter: '—', business: '✓ Integrated', custom: '✓ Custom Dashboard' },
  { feature: 'CMS / Admin', starter: '—', business: '—', custom: '✓ Admin Panel' },
  { feature: 'Backend', starter: '—', business: '—', custom: '✓ Custom API' },
  { feature: 'Database', starter: '—', business: '—', custom: '✓ Scalable DB' },
  { feature: 'Revisions', starter: '1 Round', business: 'Multiple Rounds', custom: 'Ongoing' },
  { feature: 'Support', starter: 'Launch Support', business: '30 Days Support', custom: 'Post-Launch Support' },
];

const pricingNotes = [
  'Domain registration and web hosting fees are separate unless explicitly specified in scope.',
  'Third-party paid services, premium APIs, and external subscriptions are billed separately.',
  'Custom functionality or additions beyond the agreed scope require a separate quote.',
  'Project timelines depend on feature complexity and client feedback turnaround times.',
];

export function PricingPage() {
  return (
    <div className="bg-[#F7F4EE] min-h-screen">
      <SEO
        title="Zenvora Digitals Pricing | Website & Digital Services"
        description="Explore Zenvora Digitals pricing for website development, web applications, e-commerce solutions and other digital services."
        url="https://www.zenvoradigitals.tech/pricing"
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F4EE]">
        <AmbientBackground variant="pricing" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
              PRICING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#171717] tracking-tight leading-tight mb-4">
              Clear Starting Points.<br />
              <span className="text-[#E85D3F]">Flexible Solutions.</span>
            </h1>
            <p className="text-[#5F5A52] text-base sm:text-lg max-w-2xl leading-relaxed">
              Choose a package that fits your needs, or talk to us about a custom project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <PricingSection showFullCta={false} />

      {/* Feature Comparison Table Section */}
      <section className="py-16 sm:py-20 bg-white relative border-t border-[#DED9D0]">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-3">
              COMPARISON
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight">
              Detailed Feature Breakdown
            </h2>
            <p className="text-[#5F5A52] text-sm sm:text-base mt-2">
              Compare package features side-by-side to find the right fit for your business.
            </p>
          </div>

          {/* Horizontally Scrollable Table Container */}
          <div className="overflow-x-auto rounded-2xl border border-[#DED9D0] shadow-xs bg-white">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#F7F4EE] border-b border-[#DED9D0] text-[#171717] font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold w-1/4">Feature</th>
                  <th className="py-4 px-6 font-bold w-1/4">Starter</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-[#E85D3F]">Business</th>
                  <th className="py-4 px-6 font-bold w-1/4">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DED9D0]/60">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="hover:bg-[#F7F4EE]/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-[#171717]">{row.feature}</td>
                    <td className="py-3.5 px-6 text-[#5F5A52]">
                      {row.starter === '✓' ? (
                        <Check size={16} className="text-[#E85D3F]" />
                      ) : row.starter === '—' ? (
                        <span className="text-[#DED9D0] font-medium">—</span>
                      ) : (
                        row.starter
                      )}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-[#171717] bg-[#FCE8E2]/20">
                      {row.business === '✓' ? (
                        <Check size={16} className="text-[#E85D3F]" />
                      ) : row.business === '—' ? (
                        <span className="text-[#DED9D0] font-medium">—</span>
                      ) : (
                        row.business
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-[#5F5A52]">
                      {row.custom === '✓' ? (
                        <Check size={16} className="text-[#E85D3F]" />
                      ) : row.custom === '—' ? (
                        <span className="text-[#DED9D0] font-medium">—</span>
                      ) : (
                        row.custom
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom Quote Section */}
      <section className="py-16 bg-[#F7F4EE] border-t border-[#DED9D0]">
        <div className="container-custom">
          <div className="bg-white rounded-3xl border border-[#DED9D0] p-8 sm:p-12 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#E85D3F] tracking-wider mb-2">
                CUSTOM SCOPE
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight mb-2">
                Need something different?
              </h3>
              <p className="text-[#5F5A52] text-sm sm:text-base leading-relaxed">
                Every project is different. Tell us what you need and we&apos;ll create a custom scope.
              </p>
            </div>
            <Link
              to="/contact?scope=custom"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#E85D3F] hover:bg-[#D44C2F] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all whitespace-nowrap shrink-0 group"
            >
              <span>Get A Custom Quote</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Important Pricing Notes */}
      <section className="py-16 bg-white border-t border-[#DED9D0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-[#171717] font-bold text-lg mb-2">
              <Info size={18} className="text-[#E85D3F]" />
              <span>Important Pricing Notes</span>
            </div>
            <p className="text-[#5F5A52] text-xs sm:text-sm font-medium mb-6">
              Final pricing depends on project scope and requirements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pricingNotes.map((note) => (
                <div key={note} className="p-4 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] text-[#5F5A52] text-xs leading-relaxed flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3F] shrink-0 mt-1.5" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      <CTASection />
    </div>
  );
}
