import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, CheckCircle2, Sparkles } from 'lucide-react';

const GithubIcon = () => (<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);
import { SEO } from '../../components/SEO';
import { ProjectCard } from '../../components/ui/Cards';
import { AmbientBackground } from '../../components/ui/AmbientBackground';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';
import { getBreadcrumbSchema, getProjectSchema } from '../../utils/seoUtils';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [related, setRelated] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const unsubscribe = projectRepository.subscribe((all) => {
      const p = all.find((proj) => proj.slug === slug);
      setProject(p || null);
      
      setRelated(all.filter((proj) => proj.slug !== slug).slice(0, 3));
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-24 bg-[#F7F4EE]">
      <div className="w-8 h-8 border-2 border-[#E85D3F]/30 border-t-[#E85D3F] rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-24 text-center px-4 bg-[#F7F4EE]">
      <h1 className="text-3xl font-bold text-[#171717] mb-3">Project Not Found</h1>
      <Link to="/projects" className="btn-primary mt-4 py-2.5 px-6 rounded-xl">← Back to Projects</Link>
    </div>
  );

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const projectSchema = getProjectSchema({
    title: project.title,
    description: project.description || project.shortDescription,
    slug: project.slug,
    image: project.image,
    category: project.category,
    liveUrl: project.liveUrl,
  });

  return (
    <div className="bg-[#F7F4EE] min-h-screen">
      <SEO
        title={`${project.title} Case Study`}
        description={project.shortDescription}
        image={project.image}
        url={`https://www.zenvoradigitals.tech/projects/${project.slug}`}
        schema={[breadcrumbSchema, projectSchema]}
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F4EE]">
        <AmbientBackground variant="projects" />
        <div className="container-custom relative z-10">
          {/* Visible Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs font-semibold text-[#5F5A52]">
              <li><Link to="/" className="hover:text-[#171717]">Home</Link></li>
              <li>/</li>
              <li><Link to="/projects" className="hover:text-[#171717]">Projects</Link></li>
              <li>/</li>
              <li className="text-[#E85D3F] font-bold" aria-current="page">{project.title}</li>
            </ol>
          </nav>
          <Link to="/projects" className="inline-flex items-center gap-2 text-[#5F5A52] hover:text-[#171717] text-xs sm:text-sm mb-8 transition-colors bg-[#FFFFFF] border border-[#DED9D0] px-4 py-2 rounded-xl shadow-xs">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-mono uppercase tracking-wider font-semibold">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#171717] mb-4 max-w-4xl">{project.title}</h1>
          <p className="text-[#5F5A52] text-base sm:text-xl max-w-3xl mb-8 leading-relaxed">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs sm:text-sm py-3 px-6 rounded-xl shadow-sm">
                <ExternalLink size={15} /> Visit Live Website
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs sm:text-sm py-3 px-6 rounded-xl bg-[#FFFFFF] border-[#DED9D0]">
                <GithubIcon /> GitHub Repository
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Image Banner */}
      <div className="container-custom mb-16 relative z-10">
        <div className="rounded-3xl overflow-hidden border border-[#DED9D0] aspect-video bg-[#FFFFFF] shadow-md">
          <img
            src={project.image}
            alt={project.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=1200&q=80';
            }}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="container-custom pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Main Details */}
          <div className="lg:col-span-2 space-y-10">
            {project.description && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm">
                <h2 className="text-2xl font-bold text-[#171717] mb-4 flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E85D3F]" /> Overview
                </h2>
                <p className="text-[#5F5A52] leading-relaxed text-sm sm:text-base">{project.description}</p>
              </motion.div>
            )}
            {project.challenge && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm">
                <h2 className="text-2xl font-bold text-[#171717] mb-4">The Challenge</h2>
                <p className="text-[#5F5A52] leading-relaxed text-sm sm:text-base">{project.challenge}</p>
              </motion.div>
            )}
            {project.solution && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm">
                <h2 className="text-2xl font-bold text-[#171717] mb-4">The Solution</h2>
                <p className="text-[#5F5A52] leading-relaxed text-sm sm:text-base">{project.solution}</p>
              </motion.div>
            )}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-sm">
                <h2 className="text-2xl font-bold text-[#171717] mb-5">Key Features</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.keyFeatures.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-[#171717] text-xs sm:text-sm p-3 rounded-xl bg-[#F7F4EE] border border-[#DED9D0]">
                      <CheckCircle2 size={16} className="text-[#E85D3F] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Tech & Specs Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-[#FFFFFF] border border-[#DED9D0] rounded-2xl shadow-sm">
              <h3 className="text-[#171717] font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#DED9D0]/60 pb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-[#F7F4EE] border border-[#DED9D0] text-[#171717] text-xs font-semibold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 bg-[#FFFFFF] border border-[#DED9D0] rounded-2xl shadow-sm">
              <h3 className="text-[#171717] font-bold text-sm uppercase tracking-wider mb-4 border-b border-[#DED9D0]/60 pb-3">Category</h3>
              <span className="px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-mono font-semibold">
                {project.category}
              </span>
            </div>

            {project.liveUrl && (
              <div className="p-6 bg-[#FFFFFF] border border-[#DED9D0] rounded-2xl shadow-sm">
                <h3 className="text-[#171717] font-bold text-sm uppercase tracking-wider mb-3">Live Deployment</h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#E85D3F] text-sm font-semibold hover:text-[#d44c2e] transition-colors"
                >
                  <ExternalLink size={14} /> Open Live Application
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <div className="mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.gallery.slice(1).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 shadow-sm">
                  <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-slate-200/80">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">More Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




