import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07090D]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 relative flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
                  <path d="M8 9h10l-8 7h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 16h8l-2 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
                  <defs>
                    <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                      <stop stopColor="#3B82F6"/>
                      <stop offset="1" stopColor="#8B5CF6"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="leading-none">
                <div className="text-white font-bold text-sm tracking-wider uppercase">Zenvora</div>
                <div className="text-[10px] tracking-[0.2em] text-blue-400 uppercase font-medium">Digital</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(link.href)
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link to={user?.role === 'admin' ? '/admin' : '/'} className="text-sm text-gray-300 hover:text-white flex items-center gap-2">
                    <User size={16} /> {user?.name}
                  </Link>
                  <button onClick={() => logout()} className="text-sm text-gray-400 hover:text-white">Logout</button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white">Log in</Link>
                  <Link to="/signup" className="btn-secondary text-sm py-2 px-4">Sign up</Link>
                </div>
              )}
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary text-sm py-2.5 ml-2"
              >
                Start a Project
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
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
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-[#0D1117] border-l border-white/5 lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/5">
                <span className="text-white font-semibold">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 p-5 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-white/5 space-y-3">
                {isAuthenticated ? (
                  <>
                    <div className="text-sm text-gray-300 mb-2 flex items-center gap-2"><User size={14} /> {user?.name}</div>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="btn-secondary w-full justify-center text-sm">Logout</button>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="btn-secondary flex-1 justify-center text-sm">Log in</button>
                    <button onClick={() => { navigate('/signup'); setMobileOpen(false); }} className="btn-primary flex-1 justify-center text-sm">Sign up</button>
                  </div>
                )}
                <button
                  onClick={() => { navigate('/contact'); setMobileOpen(false); }}
                  className="btn-primary w-full justify-center text-sm"
                >
                  Start a Project
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
