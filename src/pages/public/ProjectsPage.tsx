import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { ProjectCard } from '../../components/ui/Cards';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

const categories = ['All', 'E-commerce', 'EdTech', 'AI / SaaS', 'Web'];

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
    <>
      <SEO title="Projects" description="Explore digital products built by Zenvora Digital with thoughtful design and modern engineering." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Work</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Digital Products We've Built</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Digital products built with thoughtful design and modern engineering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-6">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-9 py-2.5 text-sm"
              />
            </div>
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    category === cat
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                      : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
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
      <section className="pb-20">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400">No projects found matching your criteria.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary mt-4 text-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}


