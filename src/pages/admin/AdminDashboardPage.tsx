import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderOpen, FileText, MessageSquare, Star, Plus,
  ArrowRight, Users, Settings, Briefcase, Activity, Clock
} from 'lucide-react';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import { inquiryRepository } from '../../repositories/firebase/FirebaseInquiryRepository';
import { testimonialRepository } from '../../repositories/mock/MockTestimonialRepository';
import type { Inquiry } from '../../types';

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  totalPosts: number;
  publishedPosts: number;
  newInquiries: number;
  totalTestimonials: number;
}

export function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    publishedProjects: 0,
    totalPosts: 0,
    publishedPosts: 0,
    newInquiries: 0,
    totalTestimonials: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      projectRepository.getAll(),
      projectRepository.getPublished(),
      blogRepository.getAll(),
      blogRepository.getPublished(),
      inquiryRepository.getAll(),
      testimonialRepository.getAll(),
    ]).then(([allP, pubP, allB, pubB, inq, test]) => {
      setStats({
        totalProjects: allP.length,
        publishedProjects: pubP.length,
        totalPosts: allB.length,
        publishedPosts: pubB.length,
        newInquiries: inq.filter((i) => i.status === 'New').length,
        totalTestimonials: test.length,
      });
      setRecentInquiries(inq.slice(0, 4));
      setLoading(false);
    });

    const unsubscribeInquiries = inquiryRepository.subscribe((inquiries) => {
      setRecentInquiries(inquiries.slice(0, 4));
      setStats((prev) => ({
        ...prev,
        newInquiries: inquiries.filter((i) => i.status === 'New').length,
      }));
    });

    return () => unsubscribeInquiries();
  }, []);

  const statCards = [
    {
      label: 'Projects',
      value: stats.totalProjects,
      sub: `${stats.publishedProjects} Published Projects`,
      icon: FolderOpen,
      href: '/admin/projects',
    },
    {
      label: 'Blog Posts',
      value: stats.totalPosts,
      sub: `${stats.publishedPosts} Published Articles`,
      icon: FileText,
      href: '/admin/blog',
    },
    {
      label: 'New Inquiries',
      value: stats.newInquiries,
      sub: stats.newInquiries === 1 ? '1 unread inquiry' : `${stats.newInquiries} unread inquiries`,
      icon: MessageSquare,
      href: '/admin/inquiries',
      highlight: stats.newInquiries > 0,
    },
    {
      label: 'Testimonials',
      value: stats.totalTestimonials,
      sub: 'Client Reviews',
      icon: Star,
      href: '/admin/testimonials',
    },
  ];

  const quickActions = [
    {
      title: 'New Project',
      description: 'Add a new project to your portfolio.',
      href: '/admin/projects/new',
      icon: Plus,
    },
    {
      title: 'New Blog Post',
      description: 'Publish a new article for your audience.',
      href: '/admin/blog/new',
      icon: FileText,
    },
    {
      title: 'Add Service',
      description: 'Define a new studio capability.',
      href: '/admin/services',
      icon: Briefcase,
    },
    {
      title: 'View Inquiries',
      description: 'Review messages from potential clients.',
      href: '/admin/inquiries',
      icon: MessageSquare,
    },
    {
      title: 'Manage Team',
      description: 'Update developer & founder profiles.',
      href: '/admin/team',
      icon: Users,
    },
    {
      title: 'Site Settings',
      description: 'Update branding, SEO & contact details.',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-[#FCE8E2] text-[#E85D3F] border-[#E85D3F]/30';
      case 'Contacted':
      case 'In Discussion':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Won':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">
          Good to see you, Zenvora.
        </h1>
        <p className="text-[#6B665E] text-sm mt-1">
          Here's what's happening across your website.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={card.href}
                className={`p-3.5 sm:p-5 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs hover:border-[#E85D3F] transition-all block group relative overflow-hidden ${
                  card.highlight ? 'ring-2 ring-[#E85D3F]/20 border-[#E85D3F]' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#6B665E] truncate">
                    {card.label}
                  </span>
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                    card.highlight ? 'bg-[#FCE8E2] text-[#E85D3F]' : 'bg-[#F7F4EE] text-[#171717] group-hover:bg-[#FCE8E2] group-hover:text-[#E85D3F]'
                  }`}>
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight mb-1">
                  {loading ? '...' : card.value}
                </div>
                <div className="text-[11px] sm:text-xs text-[#6B665E] font-medium flex items-center justify-between gap-1">
                  <span className="truncate">{card.sub}</span>
                  <ArrowRight size={13} className="text-[#171717] group-hover:text-[#E85D3F] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Main Grid: Left 60% / Right 40% */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Quick Actions + Recent Activity */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8">
          {/* Quick Actions Grid */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
            <div className="flex items-center justify-between mb-5 border-b border-[#DED9D0]/60 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                Quick Actions
              </h2>
              <span className="text-xs text-[#6B665E] font-mono">CMS Shortcuts</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.title}
                    to={action.href}
                    className="p-4 rounded-xl border border-[#DED9D0] bg-[#FFFFFF] hover:bg-[#F7F4EE] hover:border-[#E85D3F]/50 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#FCE8E2] text-[#E85D3F] flex items-center justify-center">
                          <Icon size={16} />
                        </div>
                        <ArrowRight size={14} className="text-[#6B665E] group-hover:text-[#E85D3F] group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h3 className="text-sm font-bold text-[#171717] group-hover:text-[#E85D3F] transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-xs text-[#6B665E] mt-1 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
            <div className="flex items-center justify-between mb-5 border-b border-[#DED9D0]/60 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={16} className="text-[#E85D3F]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                  Recent Activity
                </h2>
              </div>
              <span className="text-xs text-[#6B665E] font-mono">Live Events</span>
            </div>

            <div className="space-y-4">
              {recentInquiries.length > 0 ? (
                recentInquiries.slice(0, 4).map((inq) => (
                  <div key={inq.id} className="flex items-start gap-3.5 p-3 rounded-xl bg-[#F7F4EE]/60 border border-[#DED9D0]/50">
                    <div className="w-8 h-8 rounded-lg bg-[#FCE8E2] text-[#E85D3F] flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#171717]">
                        New inquiry received from <span className="text-[#E85D3F]">{inq.fullName}</span>
                      </p>
                      <p className="text-[11px] text-[#6B665E] truncate mt-0.5">
                        Project Type: {inq.projectType} ({inq.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#6B665E] shrink-0 font-mono">
                      <Clock size={11} />
                      {new Date(inq.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-[#6B665E]">
                  No recent activities recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Recent Inquiries Preview Widget */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs sticky top-24">
            <div className="flex items-center justify-between mb-5 border-b border-[#DED9D0]/60 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#171717]">
                Recent Inquiries
              </h2>
              <Link
                to="/admin/inquiries"
                className="text-xs font-bold text-[#E85D3F] hover:text-[#d44c2e] transition-colors flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {recentInquiries.length > 0 ? (
              <div className="space-y-3.5">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-xl border border-[#DED9D0] bg-[#FFFFFF] hover:bg-[#F7F4EE] transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#171717]">{inq.fullName}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${getStatusBadge(inq.status)}`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="text-xs text-[#6B665E] space-y-1">
                      <p><strong className="text-[#171717]">Project:</strong> {inq.projectType}</p>
                      <p><strong className="text-[#171717]">Email:</strong> {inq.email}</p>
                      {inq.budget && <p><strong className="text-[#171717]">Budget:</strong> {inq.budget}</p>}
                    </div>

                    <div className="pt-2 border-t border-[#DED9D0]/40 flex items-center justify-between text-[11px] text-[#6B665E]">
                      <span>{new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <Link
                        to="/admin/inquiries"
                        className="font-bold text-[#171717] hover:text-[#E85D3F] transition-colors"
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 border border-dashed border-[#DED9D0] rounded-xl bg-[#F7F4EE]/50">
                <div className="w-10 h-10 rounded-full bg-[#FCE8E2] text-[#E85D3F] flex items-center justify-center mx-auto mb-3">
                  <MessageSquare size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#171717] mb-1">No new inquiries yet.</h4>
                <p className="text-xs text-[#6B665E]">
                  Your incoming project enquiries from client contact forms will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
