import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { inquiryRepository } from '../../repositories/firebase/FirebaseInquiryRepository';
import { useSettings } from '../../context/SettingsContext';
import { AmbientBackground } from '../../components/ui/AmbientBackground';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const COUNTRIES = [
  { code: 'IN', prefix: '+91', name: 'India', digits: 10 },
  { code: 'US', prefix: '+1', name: 'United States', digits: 10 },
  { code: 'UK', prefix: '+44', name: 'United Kingdom', digits: 10 },
  { code: 'AU', prefix: '+61', name: 'Australia', digits: 9 },
  { code: 'CA', prefix: '+1', name: 'Canada', digits: 10 },
  { code: 'AE', prefix: '+971', name: 'United Arab Emirates', digits: 9 },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  fullName: string;
  email: string;
  company: string;
  countryCode: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

const initial: FormData = {
  fullName: '',
  email: '',
  company: '',
  countryCode: 'IN',
  phone: '',
  projectType: '',
  budget: '',
  message: '',
};

import { getBreadcrumbSchema } from '../../utils/seoUtils';

const contactBreadcrumb = getBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact', url: '/contact' },
]);

export function ContactPage() {
  const { settings } = useSettings();
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [state, setState] = useState<FormState>('idle');

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';

    if (form.phone) {
      const country = COUNTRIES.find((c) => c.code === form.countryCode);
      if (country && form.phone.length !== country.digits) {
        e.phone = `Phone number must be ${country.digits} digits`;
      }
    }

    if (!form.projectType) e.projectType = 'Please select a project type';
    if (!form.message.trim()) e.message = 'Project description is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const country = COUNTRIES.find((c) => c.code === newCode);
    const maxDigits = country ? country.digits : 10;
    setForm((prev) => ({
      ...prev,
      countryCode: newCode,
      phone: prev.phone.slice(0, maxDigits),
    }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    const country = COUNTRIES.find((c) => c.code === form.countryCode);
    const maxDigits = country ? country.digits : 10;
    if (value.length <= maxDigits) {
      setForm((prev) => ({ ...prev, phone: value }));
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState('loading');
    try {
      await new Promise((r) => setTimeout(r, 800));
      const selectedCountry = COUNTRIES.find((c) => c.code === form.countryCode);
      const fullPhone = form.phone ? `${selectedCountry?.prefix} ${form.phone}` : '';
      await inquiryRepository.create({
        fullName: form.fullName,
        email: form.email,
        company: form.company || undefined,
        phone: fullPhone || undefined,
        projectType: form.projectType,
        budget: form.budget || undefined,
        message: form.message,
      });
      setState('success');
      setForm(initial);
    } catch {
      setState('error');
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <SEO
        title="Contact Zenvora Digitals | Start Your Digital Project"
        description="Contact Zenvora Digitals to discuss website development, web applications, e-commerce, AI integration or your next digital project."
        url="https://www.zenvoradigitals.tech/contact"
        schema={contactBreadcrumb}
      />

      {/* Hero Header */}
      <section className="relative pt-36 pb-14 overflow-hidden bg-[#F7F4EE]">
        <AmbientBackground variant="contact" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-semibold uppercase tracking-widest mb-4">
              CONTACT US
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#171717] tracking-tight leading-tight mb-4">
              Let&apos;s Talk About Your Project.
            </h1>
            <p className="text-[#5F5A52] text-base sm:text-xl max-w-2xl leading-relaxed font-normal">
              Tell us a little about what you&apos;re building and we&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="pb-24 relative z-10 bg-[#F7F4EE]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            
            {/* LEFT Column: Contact Information + WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 space-y-6"
            >
              {/* WhatsApp Dedicated CTA Card */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm relative overflow-hidden group">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 transition-transform">
                  <MessageCircle size={22} />
                </div>
                <h3 className="text-[#171717] font-bold text-xl mb-2">
                  Chat Directly On WhatsApp
                </h3>
                <p className="text-[#5F5A52] text-sm leading-relaxed mb-6">
                  Prefer a fast direct message? Reach out on WhatsApp for quick feedback on your project ideas.
                </p>
                <a
                  href="https://wa.me/918929932759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md"
                >
                  <span>WhatsApp Us (+91 89299 32759)</span>
                  <ArrowRight size={16} />
                </a>
              </div>

              {/* Direct Info Box */}
              <div className="p-7 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[#5F5A52]/70 text-xs font-mono uppercase tracking-wider mb-1 font-medium">Email Direct</p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-[#171717] text-base font-semibold hover:text-[#E85D3F] transition-colors"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[#5F5A52]/70 text-xs font-mono uppercase tracking-wider mb-1 font-medium">Location</p>
                    <p className="text-[#171717] text-base font-semibold">{settings.contactLocation}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FCE8E2] border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[#5F5A52]/70 text-xs font-mono uppercase tracking-wider mb-1 font-medium">Studio Availability</p>
                    <p className="text-[#171717] text-base font-semibold">{settings.availability}</p>
                  </div>
                </div>
              </div>

              {/* Connect Links */}
              <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs flex items-center justify-between">
                <span className="text-xs font-mono uppercase font-semibold text-[#5F5A52] tracking-wider">
                  Social Channels
                </span>
                <div className="flex items-center gap-2">
                  {settings.github && (
                    <a
                      href={settings.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl border border-[#DED9D0] bg-[#F7F4EE] flex items-center justify-center text-[#171717] hover:text-[#E85D3F] hover:border-[#E85D3F]/30 transition-all"
                      aria-label="Studio GitHub"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {settings.linkedin && (
                    <a
                      href={settings.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-xl border border-[#DED9D0] bg-[#F7F4EE] flex items-center justify-center text-[#171717] hover:text-[#E85D3F] hover:border-[#E85D3F]/30 transition-all"
                      aria-label="Studio LinkedIn"
                    >
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* RIGHT Column: Project Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-7"
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
                {state === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle size={52} className="text-emerald-500 mx-auto mb-4 animate-bounce" />
                    <h3 className="text-slate-900 font-bold text-2xl mb-2">Inquiry Received!</h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                      Thanks for reaching out! Your project details have been received. We&apos;ll review them and respond within 24 hours.
                    </p>
                    <button
                      onClick={() => setState('idle')}
                      className="mt-8 py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold text-xs transition-colors border border-slate-200"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div>
                      <h2 className="text-slate-900 font-bold text-2xl tracking-tight mb-1">
                        Start A Project Inquiry
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm">
                        Fill out the form below and we&apos;ll discuss your requirements.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all ${
                            errors.fullName ? 'border-red-500' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all ${
                            errors.email ? 'border-red-500' : 'border-slate-200/90'
                          }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>

                      {/* Company / Brand */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Company / Brand
                        </label>
                        <input
                          name="company"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Company or brand name"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 text-slate-900 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Phone / WhatsApp
                        </label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleCountryChange}
                            className="px-2.5 py-3 rounded-xl border border-slate-200/90 text-slate-900 bg-white text-xs font-mono cursor-pointer focus:outline-none shrink-0"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c.code} value={c.code}>
                                {c.code} ({c.prefix})
                              </option>
                            ))}
                          </select>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handlePhoneChange}
                            placeholder="Phone number"
                            className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all ${
                              errors.phone ? 'border-red-500' : 'border-slate-200/90'
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Project Type */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Project Type <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="projectType"
                          value={form.projectType}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all ${
                            errors.projectType ? 'border-red-500' : 'border-slate-200/90'
                          }`}
                        >
                          <option value="">Select project type</option>
                          <option value="Business Website">Business Website</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Web Application">Web Application</option>
                          <option value="Website Redesign">Website Redesign</option>
                          <option value="AI Integration">AI Integration</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.projectType && (
                          <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>
                        )}
                      </div>

                      {/* Budget Range (Optional) */}
                      <div>
                        <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                          Budget Range <span className="text-slate-400 font-normal lowercase">(optional)</span>
                        </label>
                        <select
                          name="budget"
                          value={form.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200/90 text-slate-900 bg-white text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                        >
                          <option value="">Select budget range</option>
                          <option value="Under ₹10,000">Under ₹10,000</option>
                          <option value="₹10,000–₹25,000">₹10,000–₹25,000</option>
                          <option value="₹25,000–₹50,000">₹25,000–₹50,000</option>
                          <option value="₹50,000+">₹50,000+</option>
                          <option value="Not Sure Yet">Not Sure Yet</option>
                        </select>
                      </div>
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-xs font-mono uppercase font-semibold text-slate-700 mb-2">
                        Project Description <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us a little about what you're building, key goals and features..."
                        className={`w-full px-4 py-3 rounded-xl border text-slate-900 bg-white placeholder-slate-400 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all ${
                          errors.message ? 'border-red-500' : 'border-slate-200/90'
                        }`}
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {state === 'error' && (
                      <div className="flex items-center gap-2 text-red-600 text-sm p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle size={16} /> Failed to submit inquiry. Please check connection and try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="w-full py-4 px-6 rounded-xl bg-[#E85D3F] hover:bg-[#d44c2e] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {state === 'loading' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Project Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
