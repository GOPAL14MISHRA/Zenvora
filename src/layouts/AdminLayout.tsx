import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FolderOpen, FileText, Briefcase, Star,
  MessageSquare, Image, Settings, Users, LogOut, Menu,
  Bell, ChevronRight, ExternalLink
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { inquiryRepository } from '../repositories/firebase/FirebaseInquiryRepository';
import { SEO } from '../components/SEO';

const sidebarLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard, exact: true },
  { label: 'Projects', href: '/admin/projects', icon: FolderOpen },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
  { label: 'Testimonials', href: '/admin/testimonials', icon: Star },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Team', href: '/admin/team', icon: Users },
  { label: 'Media', href: '/admin/media', icon: Image },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

function SidebarContent({ onClose, unreadInquiries }: { onClose?: () => void; unreadInquiries?: number }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (href: string, exact?: boolean) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col h-full bg-[#171717] text-white">
      {/* Logo Header */}
      <div className="p-5 border-b border-white/10">
        <Link to="/admin" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-9 h-9 rounded-xl bg-[#E85D3F] flex items-center justify-center text-white shadow-xs shrink-0">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path d="M8 9h10l-8 7h10" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 16h8l-2 7" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="text-white font-extrabold text-sm tracking-wide">ZENVORA</div>
            <div className="text-[10px] tracking-[0.2em] text-[#E85D3F] font-mono font-bold uppercase">ADMIN PANEL</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto no-scrollbar">
        <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-[#A39E93]">Management</div>
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href, link.exact);
          const isNavInquiries = link.label === 'Inquiries';
          return (
            <Link
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-[#E85D3F] text-white shadow-xs font-semibold'
                  : 'text-[#A39E93] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} className={active ? 'text-white' : 'text-[#A39E93]'} />
              <span className="flex-1">{link.label}</span>
              {isNavInquiries && !!unreadInquiries && unreadInquiries > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  active ? 'bg-white text-[#E85D3F]' : 'bg-[#E85D3F] text-white'
                }`}>
                  {unreadInquiries}
                </span>
              )}
              {active && !isNavInquiries && <ChevronRight size={14} className="opacity-80" />}
            </Link>
          );
        })}
      </nav>

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-white/10 bg-[#121212] space-y-1">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#E85D3F] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-white truncate">{user?.name || 'Zenvora Admin'}</div>
            <div className="text-[10px] text-[#A39E93] capitalize">Administrator</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-[#A39E93] hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = inquiryRepository.subscribe((inquiries) => {
      const newCount = inquiries.filter((i) => i.status === 'New').length;
      setUnreadCount(newCount);
    });
    return () => unsubscribe();
  }, []);

  const currentPage = sidebarLinks.find((l) =>
    l.exact ? location.pathname === l.href : location.pathname.startsWith(l.href)
  );

  return (
    <div className="min-h-screen bg-[#F7F4EE] flex">
      <SEO title={`${currentPage?.label ?? 'Dashboard'} | Admin Portal`} noindex />
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-[#171717] border-r border-[#26231E] fixed top-0 bottom-0 left-0 z-30 shadow-md">
        <SidebarContent unreadInquiries={unreadCount} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-60 bg-[#171717] border-r border-[#26231E] lg:hidden shadow-xl"
            >
              <SidebarContent onClose={() => setSidebarOpen(false)} unreadInquiries={unreadCount} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen bg-[#F7F4EE] w-full min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#DED9D0] h-16 flex items-center px-3 sm:px-6 lg:px-8 justify-between shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              className="lg:hidden p-2 text-[#171717] hover:bg-[#F7F4EE] rounded-xl transition-colors shrink-0 cursor-pointer"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-base font-bold text-[#171717] truncate">{currentPage?.label ?? 'Dashboard'}</h1>
              <p className="text-[11px] text-[#6B665E] hidden sm:block">Zenvora CMS Studio Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Site CTA */}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-[#DED9D0] bg-[#F7F4EE] hover:bg-[#FFFFFF] text-[#171717] hover:text-[#E85D3F] text-xs font-semibold transition-all shadow-2xs"
            >
              <span className="hidden sm:inline">View Site</span>
              <ExternalLink size={13} />
            </Link>

            {/* Notifications Button */}
            <Link
              to="/admin/inquiries"
              className="relative p-2 text-[#5F5A52] hover:text-[#171717] hover:bg-[#F7F4EE] rounded-xl transition-colors"
              title={unreadCount > 0 ? `${unreadCount} new inquiries` : 'No new notifications'}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#E85D3F] ring-2 ring-white animate-pulse" />
              )}
            </Link>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-[#DED9D0]">
              <div className="w-8 h-8 rounded-full bg-[#171717] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                Z
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
