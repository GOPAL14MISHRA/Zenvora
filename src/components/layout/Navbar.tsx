import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4 sm:px-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div
            className={`flex items-center justify-between px-5 py-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
              scrolled
                ? 'bg-white/95 border-[#DED9D0] shadow-xs'
                : 'bg-[#F7F4EE]/90 border-[#DED9D0]/80 shadow-xs'
            }`}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Zenvora Digitals" className="h-14 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#EBE7DF]/60 border border-[#DED9D0] p-1.5 rounded-full">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                      active
                        ? 'text-[#171717] bg-white border border-[#DED9D0] shadow-xs'
                        : 'text-[#5F5A52] hover:text-[#171717] hover:bg-white/60'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full border border-[#E85D3F]/30 bg-[#FCE8E2]/50 pointer-events-none"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary text-xs py-2.5 px-5 rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Start a Project</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-[#171717] hover:text-[#E85D3F] transition-colors rounded-xl bg-white border border-[#DED9D0] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-[#171717]/40 backdrop-blur-xs lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#F7F4EE] border-l border-[#DED9D0] lg:hidden flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between p-6 border-b border-[#DED9D0]">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Zenvora Digitals" className="h-10 w-auto object-contain" />
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-[#5F5A52] hover:text-[#171717] rounded-xl bg-white border border-[#DED9D0] cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>
                <nav className="p-6 space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive(link.href)
                          ? 'bg-[#FCE8E2] text-[#E85D3F] border border-[#E85D3F]/30'
                          : 'text-[#5F5A52] hover:text-[#171717] hover:bg-white'
                      }`}
                    >
                      {link.label}
                      <ArrowRight size={13} className={`transition-transform ${isActive(link.href) ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-[#DED9D0] bg-white">
                <button
                  onClick={() => { navigate('/contact'); setMobileOpen(false); }}
                  className="btn-primary w-full justify-center text-sm py-3 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


