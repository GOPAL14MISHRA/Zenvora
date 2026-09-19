import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

// Social icon SVGs (lucide-react v1+ removed branded icons)
const GithubIcon = ({ size = 16 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const InstagramIcon = ({ size = 16 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>);
const TwitterXIcon = ({ size = 16 }: { size?: number }) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.265 5.638L18.244 2.25zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77z"/></svg>);
import { SEO } from '../../components/SEO';
import { inquiryRepository } from '../../repositories/firebase/FirebaseInquiryRepository';
import { useSettings } from '../../context/SettingsContext';

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
  timeline: string;
  message: string;
}

const initial: FormData = {
  fullName: '', email: '', company: '', countryCode: 'IN', phone: '',
  projectType: '', budget: '', timeline: '', message: '',
};

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
      const country = COUNTRIES.find(c => c.code === form.countryCode);
      if (country && form.phone.length !== country.digits) {
        e.phone = `Phone number must be ${country.digits} digits`;
      }
    }

    if (!form.projectType) e.projectType = 'Please select a project type';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    const country = COUNTRIES.find(c => c.code === newCode);
    const maxDigits = country ? country.digits : 10;
    setForm(prev => ({
      ...prev,
      countryCode: newCode,
      phone: prev.phone.slice(0, maxDigits)
    }));
    setErrors(prev => ({ ...prev, phone: undefined }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // keep only digits
    const country = COUNTRIES.find(c => c.code === form.countryCode);
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
      await new Promise((r) => setTimeout(r, 900));
      const selectedCountry = COUNTRIES.find(c => c.code === form.countryCode);
      const fullPhone = form.phone ? `${selectedCountry?.prefix} ${form.phone}` : '';
      await inquiryRepository.create({
        fullName: form.fullName, email: form.email,
        company: form.company || undefined, phone: fullPhone || undefined,
        projectType: form.projectType,
        budget: form.budget || undefined, timeline: form.timeline || undefined,
        message: form.message,
      });
      setState('success');
      setForm(initial);
    } catch {
      setState('error');
    }
  };

  return (
    <>
      <SEO title="Contact" description="Start a project with Zenvora Digital. Share your idea and we'll get back to you." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">Contact</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Let's Build Something Great.</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Have an idea, a product or a business problem? Tell us about it and let's explore how we can turn it into a digital solution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="card-base p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Email</p>
                    <a href={`mailto:${settings.contactEmail}`} className="text-white text-sm hover:text-blue-400 transition-colors">
                      {settings.contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <MapPin size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Location</p>
                    <p className="text-white text-sm">{settings.contactLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Clock size={15} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-0.5">Availability</p>
                    <p className="text-white text-sm">{settings.availability}</p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="card-base p-6">
                <p className="text-gray-500 text-xs mb-4 uppercase tracking-wider">Social</p>
                <div className="flex gap-3">
                  {settings.github && (
                    <a href={settings.github} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {settings.linkedin && (
                    <a href={settings.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                      <LinkedinIcon size={16} />
                    </a>
                  )}
                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                      <InstagramIcon size={16} />
                    </a>
                  )}
                  {settings.twitter && (
                    <a href={settings.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 transition-all">
                      <TwitterXIcon size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="card-base p-6 lg:p-8">
                {state === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">Inquiry Received!</h3>
                    <p className="text-gray-400">Thanks! Your project inquiry has been received. We'll get back to you soon.</p>
                    <button onClick={() => setState('idle')} className="btn-secondary mt-6 text-sm">Send Another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-white font-semibold text-lg mb-6">Project Inquiry</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="label-base">Full Name <span className="text-red-400">*</span></label>
                        <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Your name" className={`input-base ${errors.fullName ? 'border-red-500/50' : ''}`} />
                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                      </div>
                      <div>
                        <label className="label-base">Email <span className="text-red-400">*</span></label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" className={`input-base ${errors.email ? 'border-red-500/50' : ''}`} />
                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="label-base">Company</label>
                        <input name="company" value={form.company} onChange={handleChange} placeholder="Company name (optional)" className="input-base" />
                      </div>
                      <div>
                        <label className="label-base">Phone</label>
                        <div className="flex gap-2">
                          <select
                            name="countryCode"
                            value={form.countryCode}
                            onChange={handleCountryChange}
                            className="input-base w-[110px] shrink-0 px-2"
                          >
                            {COUNTRIES.map(c => (
                              <option key={c.code} value={c.code} className="bg-gray-900 text-white">
                                {c.code} ({c.prefix})
                              </option>
                            ))}
                          </select>
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handlePhoneChange}
                            placeholder="00000 00000"
                            className={`input-base flex-1 ${errors.phone ? 'border-red-500/50' : ''}`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="label-base">Project Type <span className="text-red-400">*</span></label>
                        <select name="projectType" value={form.projectType} onChange={handleChange} className={`input-base ${errors.projectType ? 'border-red-500/50' : ''}`}>
                          <option value="">Select type</option>
                          {['Website','Web Application','SaaS','E-commerce','AI Product','UI/UX','Backend/API','Other'].map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                        {errors.projectType && <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>}
                      </div>
                      <div>
                        <label className="label-base">Budget</label>
                        <select name="budget" value={form.budget} onChange={handleChange} className="input-base">
                          <option value="">Select budget</option>
                          {['Below ₹25,000','₹25,000 – ₹50,000','₹50,000 – ₹1,00,000','₹1,00,000+'].map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="label-base">Timeline</label>
                        <select name="timeline" value={form.timeline} onChange={handleChange} className="input-base">
                          <option value="">Select timeline</option>
                          {['ASAP','1–2 Weeks','1 Month','2–3 Months','Flexible'].map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="label-base">Message <span className="text-red-400">*</span></label>
                      <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project..." className={`input-base resize-none ${errors.message ? 'border-red-500/50' : ''}`} />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {state === 'error' && (
                      <div className="flex items-center gap-2 text-red-400 text-sm mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                        <AlertCircle size={14} /> Something went wrong. Please try again.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={state === 'loading'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {state === 'loading' ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={15} /> Send Project Inquiry</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}


