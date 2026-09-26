import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User, ExternalLink } from 'lucide-react';
import type { Project, BlogPost, TeamMember } from '../../types';

const GithubIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const getProjectScreenshot = (project: Project): string => {
  const genericCodePattern = /555066931|461749280|517694712|code|editor|vscode/i;
  const slug = project.slug?.toLowerCase() || '';
  const title = project.title?.toLowerCase() || '';

  if (slug.includes('spiritual') || title.includes('spiritual') || project.category.toLowerCase().includes('e-commerce')) {
    if (!project.image || genericCodePattern.test(project.image)) {
      return 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=1200&q=80';
    }
  }
  if (slug.includes('skill') || title.includes('skill') || project.category.toLowerCase().includes('edtech')) {
    if (!project.image || genericCodePattern.test(project.image)) {
      return 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80';
    }
  }
  if (slug.includes('plot') || title.includes('plot') || project.category.toLowerCase().includes('ai')) {
    if (!project.image || genericCodePattern.test(project.image)) {
      return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80';
    }
  }

  if (genericCodePattern.test(project.image || '')) {
    return 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80';
  }

  return project.image || 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80';
};

// ─── Project Card ─────────────────────────────────────────────────────────
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const displayTech = (project.technologies && project.technologies.length > 0)
    ? project.technologies.slice(0, 4)
    : ['React', 'TypeScript', 'Tailwind CSS'];
  const screenshotUrl = getProjectScreenshot(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="bg-white overflow-hidden group rounded-2xl border border-[#DED9D0] hover:border-[#E85D3F]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full shadow-xs"
    >
      <div>
        {/* Browser Top Window Simulation */}
        <div className="bg-[#EBE7DF]/80 border-b border-[#DED9D0] px-3.5 py-2 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#DED9D0]" />
          </div>
          <div className="text-[10px] font-mono text-[#5F5A52] max-w-[160px] truncate">
            {project.liveUrl ? project.liveUrl.replace('https://', '').replace('/', '') : `${project.slug}.zenvoradigitals.tech`}
          </div>
        </div>

        {/* Large Project Screenshot */}
        <div className="relative overflow-hidden aspect-[16/10] bg-[#F7F4EE]">
          <img
            src={screenshotUrl}
            alt={project.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=1200&q=80';
            }}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Category Floating Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-md bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-[10px] font-mono uppercase tracking-wider font-semibold shadow-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E85D3F]" />
              {project.category}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6">
          <h3 className="text-[#171717] font-bold text-xl mb-2 group-hover:text-[#E85D3F] transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
            {project.shortDescription}
          </p>

          {/* Technology Tags */}
          <div className="flex flex-wrap gap-1.5">
            {displayTech.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#F7F4EE] border border-[#DED9D0] text-[#171717] text-[11px] font-medium transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[#DED9D0]/60 mt-auto">
        <Link
          to={`/projects/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-[#E85D3F] hover:text-[#D44C2F] text-xs font-semibold group/btn transition-colors"
        >
          <span>View Project</span>
          <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>

        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#5F5A52] hover:text-[#171717] text-xs font-medium transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink size={12} />
          </a>
        ) : project.githubUrl ? (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#5F5A52] hover:text-[#171717] text-xs font-medium transition-colors"
          >
            <GithubIcon size={12} />
            <span>Code</span>
          </a>
        ) : null}
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
      className="bg-white overflow-hidden group hover:border-[#E85D3F]/40 transition-all duration-300 rounded-2xl border border-[#DED9D0] shadow-xs"
    >
      <div className="relative overflow-hidden aspect-video bg-[#F7F4EE]">
        <img
          src={post.coverImage}
          alt={post.title}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80';
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3.5 left-3.5">
          <span className="px-3 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-[10px] font-mono uppercase tracking-wider font-semibold shadow-xs">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-[#171717] font-bold text-lg mb-2 leading-snug group-hover:text-[#E85D3F] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center gap-3 text-xs text-[#5F5A52] mb-5 pt-3 border-t border-[#DED9D0]">
          <span className="flex items-center gap-1 text-[#171717]"><User size={11} className="text-[#E85D3F]" /> {post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={11} /> {date}</span>
          <span className="flex items-center gap-1"><Clock size={11} /> {post.readingTime} min</span>
        </div>
        <Link
          to={`/blog/${post.slug}`}
          className="flex items-center gap-1.5 text-[#E85D3F] text-xs font-semibold group-hover:gap-2.5 transition-all"
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
      className="bg-white p-7 text-center group hover:border-[#E85D3F]/40 rounded-2xl border border-[#DED9D0] shadow-xs transition-all duration-300 relative overflow-hidden"
    >
      <div className="w-24 h-24 rounded-2xl overflow-hidden mx-auto mb-5 border-2 border-[#DED9D0] group-hover:border-[#E85D3F]/40 transition-all">
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#171717] flex items-center justify-center text-white text-3xl font-bold">
            {member.name.charAt(0)}
          </div>
        )}
      </div>

      <h3 className="text-[#171717] font-bold text-lg mb-1 flex items-center justify-center gap-1.5">
        {member.name}
      </h3>
      <p className="text-[#E85D3F] text-xs font-semibold tracking-wider uppercase mb-3 bg-[#FCE8E2] border border-[#E85D3F]/20 py-1 px-3 rounded-full inline-block">
        {member.role}
      </p>
      <p className="text-[#5F5A52] text-xs sm:text-sm leading-relaxed mb-5">{member.bio}</p>

      {/* Social links */}
      <div className="flex justify-center gap-3 pt-4 border-t border-[#DED9D0]">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] text-[#5F5A52] hover:text-[#171717] hover:bg-white transition-all">
            <GithubIcon size={14} />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] text-[#5F5A52] hover:text-[#E85D3F] hover:bg-[#FCE8E2] transition-all">
            <LinkedinIcon size={14} />
          </a>
        )}
      </div>
    </motion.div>
  );
}


