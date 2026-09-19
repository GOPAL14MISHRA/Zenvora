import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import type { Project, BlogPost, TeamMember } from '../../types';

// ─── Project Card ─────────────────────────────────────────────────────────
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card-base overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-video bg-[#0D1117]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="badge bg-blue-500/20 border border-blue-500/30 text-blue-300 text-[10px]">
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-blue-100 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.shortDescription}</p>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all"
          >
            Visit Live Site <ArrowRight size={13} />
          </a>
        ) : (
          <Link
            to={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all"
          >
            View Case Study <ArrowRight size={13} />
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// ─── Blog Card ────────────────────────────────────────────────────────────
export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card-base overflow-hidden group hover:border-blue-500/20 transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-video bg-[#0D1117]">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="badge bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px]">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-white font-semibold text-base mb-2 leading-snug group-hover:text-blue-100 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><User size={11} /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {date}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readingTime} min</span>
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all"
        >
          Read Article <ArrowRight size={13} />
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Team Card ────────────────────────────────────────────────────────────
export function TeamCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="card-base p-6 text-center group hover:border-blue-500/20 transition-all"
    >
      <div className="w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4 border border-white/10">
        {member.avatar ? (
          <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-base mb-1">{member.name}</h3>
      <p className="text-blue-400 text-xs font-medium mb-3">{member.role}</p>
      <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
    </motion.div>
  );
}
