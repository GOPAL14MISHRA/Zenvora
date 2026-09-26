import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ProjectCard } from '../../components/ui/Cards';
import { AmbientBackground } from '../../components/ui/AmbientBackground';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

export function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filtered, setFiltered] = useState<Project[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = projectRepository.subscribe((data) => {
      setProjects(data);
      setFiltered(data);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  useEffect(() => {
    let result = projects;
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }
    setFiltered(result);
  }, [category, search, projects]);

  return (
    <div className="bg-[#F7F4EE] min-h-screen">
      <SEO title="Projects" description="Explore web applications, digital products, and custom software built by Zenvora Digital Studio." />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F4EE]">
        <AmbientBackground variant="projects" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/25 text-[#E85D3F] text-xs font-bold uppercase tracking-widest mb-4">
              SELECTED WORK
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#171717] mb-4">Web Development Showcase</h1>
            <p className="text-[#5F5A52] text-base sm:text-lg max-w-2xl leading-relaxed">
              Real websites. Real web applications. Engineered for performance, usability, and business outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-10 relative z-10 bg-[#F7F4EE]">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between border-y border-[#DED9D0] py-5">
            {/* Search */}
            <div className="relative flex-1 max-w-sm w-full">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F5A52]" />
              <input
                type="text"
                placeholder="Search projects by title, stack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-[#DED9D0] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#171717] placeholder-[#5F5A52] focus:outline-none focus:border-[#E85D3F] focus:ring-2 focus:ring-[#E85D3F]/10 transition-colors shadow-xs"
              />
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#E85D3F] text-white shadow-xs'
                      : 'bg-white border border-[#DED9D0] text-[#5F5A52] hover:text-[#171717] hover:border-[#171717]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-28 relative z-10 bg-[#F7F4EE]">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#DED9D0] shadow-xs">
              <p className="text-[#5F5A52] text-sm">No projects found matching your criteria.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary mt-4 text-xs py-2 px-4 rounded-xl">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}




