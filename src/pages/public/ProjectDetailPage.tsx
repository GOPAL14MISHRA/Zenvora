import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const GithubIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>);
import { SEO } from '../../components/SEO';
import { ProjectCard } from '../../components/ui/Cards';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

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
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  if (!project) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
      <h1 className="text-2xl font-bold text-white mb-3">Project Not Found</h1>
      <Link to="/projects" className="btn-primary mt-4">← Back to Projects</Link>
    </div>
  );

  return (
    <>
      <SEO title={project.title} description={project.shortDescription} image={project.image} />

      {/* Hero */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative z-10">
          <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="badge bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 max-w-3xl">{project.title}</h1>
          <p className="text-gray-400 text-lg max-w-2xl mb-8">{project.shortDescription}</p>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm py-2.5">
                <ExternalLink size={14} /> Live Website
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2.5">
                <GithubIcon /> GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Image */}
      <div className="container-custom mb-16">
        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#0D1117]">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {project.description && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-400 leading-relaxed">{project.description}</p>
              </motion.div>
            )}
            {project.challenge && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-white mb-4">Challenge</h2>
                <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
              </motion.div>
            )}
            {project.solution && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-white mb-4">Solution</h2>
                <p className="text-gray-400 leading-relaxed">{project.solution}</p>
              </motion.div>
            )}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-xl font-bold text-white mb-4">Key Features</h2>
                <ul className="space-y-2">
                  {project.keyFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-gray-400 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-5">
            <div className="card-base p-5">
              <h3 className="text-white font-semibold text-sm mb-3">Category</h3>
              <span className="badge bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">{project.category}</span>
            </div>
            {project.liveUrl && (
              <div className="card-base p-5">
                <h3 className="text-white font-semibold text-sm mb-3">Live Project</h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 text-sm hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={13} /> Visit Live Site
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {project.gallery.length > 1 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-white mb-6">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.slice(1).map((img, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/10 aspect-video bg-[#0D1117]">
                  <img src={img} alt={`${project.title} gallery ${i + 1}`} className="w-full h-full object-cover opacity-80" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-white mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}


