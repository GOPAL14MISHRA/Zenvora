import { Link } from 'react-router-dom';
import { Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const GithubIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);
const LinkedinIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>);
const InstagramIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>);
const TwitterXIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.265 5.638L18.244 2.25zm-1.16 17.52h1.833L7.084 4.126H5.117L17.084 19.77z"/></svg>);
const WhatsAppIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>);

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Full-Stack Development', href: '/services/web-development' },
  { label: 'SaaS Development', href: '/services/web-applications' },
  { label: 'E-commerce', href: '/services/ecommerce' },
  { label: 'AI Integration', href: '/services/ai-integration' },
  { label: 'UI/UX Design', href: '/services/ui-ux' },
  { label: 'Backend & APIs', href: '/services/backend-api' },
];

export function Footer() {
  const { settings } = useSettings();

  return (
    <footer className="bg-[#171717] border-t border-[#262626] text-[#DED9D0] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[500px] h-60 bg-[#E85D3F]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Main Footer Grid ──────────────────────── */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand – 4 cols */}
          <div className="lg:col-span-4">
            <Link to="/" className="block mb-5">
              <img src="/logo.png" alt="Zenvora Digitals" className="h-16 md:h-20 w-auto object-contain" />
            </Link>
            <p className="text-[#A39E93] text-sm leading-relaxed mb-6 max-w-sm">
              We design and build modern websites, e-commerce platforms, and custom web applications for growing businesses and ambitious brands.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-7">
              <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-3 text-[#DED9D0] hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-[#E85D3F]/10 border border-[#E85D3F]/20 flex items-center justify-center shrink-0 group-hover:bg-[#E85D3F]/20 transition-colors">
                  <Mail size={14} className="text-[#E85D3F]" />
                </div>
                {settings.contactEmail}
              </a>
              <a href="https://wa.me/918929932759" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[#DED9D0] hover:text-white text-sm transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <MessageCircle size={14} className="text-emerald-400" />
                </div>
                +91 89299 32759
              </a>
              <span className="flex items-center gap-3 text-[#DED9D0] text-sm">
                <div className="w-8 h-8 rounded-xl bg-[#E85D3F]/10 border border-[#E85D3F]/20 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-[#E85D3F]" />
                </div>
                {settings.contactLocation}
              </span>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {settings.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#A39E93] hover:text-white hover:border-[#E85D3F]/50 hover:bg-[#E85D3F]/10 transition-all">
                  <GithubIcon />
                </a>
              )}
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#A39E93] hover:text-white hover:border-[#E85D3F]/50 hover:bg-[#E85D3F]/10 transition-all">
                  <LinkedinIcon />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#A39E93] hover:text-white hover:border-pink-500/50 hover:bg-pink-500/10 transition-all">
                  <InstagramIcon />
                </a>
              )}
              {settings.twitter && (
                <a href={settings.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#A39E93] hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                  <TwitterXIcon />
                </a>
              )}
              <a href="https://wa.me/918929932759" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-[#262626] flex items-center justify-center text-[#A39E93] hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
                <WhatsAppIcon />
              </a>
            </div>
          </div>

          {/* Navigation – 2 cols */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 tracking-wider uppercase">
              <span className="w-1.5 h-4 rounded-full bg-[#E85D3F] inline-block" />
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-[#A39E93] hover:text-white text-sm transition-colors inline-flex items-center gap-1.5 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E85D3F] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services – 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 tracking-wider uppercase">
              <span className="w-1.5 h-4 rounded-full bg-[#E85D3F] inline-block" />
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-[#A39E93] hover:text-white text-sm transition-colors inline-flex items-center gap-1.5 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#E85D3F] text-xs">›</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact CTA – 3 cols */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-sm mb-5 flex items-center gap-2 tracking-wider uppercase">
              <span className="w-1.5 h-4 rounded-full bg-emerald-500 inline-block" />
              Get In Touch
            </h3>
            <div className="space-y-3.5">
              <div className="p-4 border border-[#262626] hover:border-[#E85D3F]/30 transition-all bg-[#222222]/60 rounded-xl group">
                <p className="text-[#A39E93] text-xs leading-relaxed mb-3">
                  Have a project in mind? Share your details and let's explore how we can help.
                </p>
                <Link to="/contact" className="flex items-center gap-1.5 text-[#E85D3F] text-xs font-semibold group-hover:gap-2 transition-all">
                  Send Inquiry <ArrowRight size={12} />
                </Link>
              </div>
              <div className="p-4 border border-[#262626] hover:border-emerald-500/40 transition-all bg-[#222222]/60 rounded-xl group">
                <p className="text-[#A39E93] text-xs mb-1.5">Direct Messaging</p>
                <a
                  href="https://wa.me/918929932759"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-emerald-400 text-xs font-semibold group-hover:gap-2.5 transition-all"
                >
                  <WhatsAppIcon /> WhatsApp +91 89299 32759
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────── */}
      <div className="border-t border-[#262626] bg-[#0F0F0F]">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-[#787268] text-xs font-medium">© 2026 Zenvora Digitals. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-[#787268] hover:text-[#DED9D0] text-xs transition-colors">Privacy Policy</Link>
            <span className="w-px h-3 bg-[#262626]" />
            <Link to="/terms" className="text-[#787268] hover:text-[#DED9D0] text-xs transition-colors">Terms & Conditions</Link>
            <span className="w-px h-3 bg-[#262626]" />
            <Link to="/contact" className="text-[#787268] hover:text-[#DED9D0] text-xs transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


