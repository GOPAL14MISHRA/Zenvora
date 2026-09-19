import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, FileText, MessageSquare, Star, TrendingUp, Plus } from 'lucide-react';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import { inquiryRepository } from '../../repositories/mock/MockInquiryRepository';
import { testimonialRepository } from '../../repositories/mock/MockTestimonialRepository';
import { useAuth } from '../../context/AuthContext';

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  totalPosts: number;
  publishedPosts: number;
  newInquiries: number;
  totalTestimonials: number;
}

export function AdminDashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats>({ totalProjects:0, publishedProjects:0, totalPosts:0, publishedPosts:0, newInquiries:0, totalTestimonials:0 });

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
    });
  }, []);

  const statCards = [
    { label: 'Total Projects', value: stats.totalProjects, sub: `${stats.publishedProjects} published`, icon: FolderOpen, color: 'blue', href: '/admin/projects' },
    { label: 'Blog Posts', value: stats.totalPosts, sub: `${stats.publishedPosts} published`, icon: FileText, color: 'violet', href: '/admin/blog' },
    { label: 'New Inquiries', value: stats.newInquiries, sub: 'unread messages', icon: MessageSquare, color: 'green', href: '/admin/inquiries' },
    { label: 'Testimonials', value: stats.totalTestimonials, sub: 'sample/demo', icon: Star, color: 'yellow', href: '/admin/testimonials' },
  ];

  const colorMap: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    violet: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  };

  const quickActions = [
    { label: 'New Project', href: '/admin/projects/new', icon: Plus },
    { label: 'New Blog Post', href: '/admin/blog/new', icon: Plus },
    { label: 'View Inquiries', href: '/admin/inquiries', icon: MessageSquare },
    { label: 'Site Settings', href: '/admin/settings', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">Here's an overview of your site.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={card.href} className="card-base p-5 block hover:border-white/20 transition-all group">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-4 ${colorMap[card.color]}`}>
                  <Icon size={16} />
                </div>
                <div className="text-2xl font-bold text-white mb-0.5">{card.value}</div>
                <div className="text-gray-400 text-xs font-medium">{card.label}</div>
                <div className="text-gray-600 text-xs mt-0.5">{card.sub}</div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-gray-300 hover:text-white"
                >
                  <Icon size={14} className="text-blue-400" />
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="card-base p-5">
          <h2 className="text-white font-semibold text-sm mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { text: 'New inquiry from Aditya Kumar', time: '2 days ago', color: 'blue' },
              { text: 'Inquiry status updated to "Contacted"', time: '5 days ago', color: 'green' },
              { text: 'New inquiry from Sneha Patel', time: '1 week ago', color: 'blue' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 bg-${item.color}-400`} />
                <div>
                  <p className="text-gray-300">{item.text}</p>
                  <p className="text-gray-600 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
