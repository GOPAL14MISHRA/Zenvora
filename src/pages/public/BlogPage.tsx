import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BlogCard } from '../../components/ui/Cards';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import type { BlogPost } from '../../types';

const categories = ['All', 'Development', 'AI', 'Web Development', 'Business', 'UI/UX', 'Technology'];

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filtered, setFiltered] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = blogRepository.subscribe((data) => {
      setPosts(data);
      setFiltered(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let result = posts;
    if (category !== 'All') result = result.filter((p) => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    setFiltered(result);
  }, [category, search, posts]);

  return (
    <>
      <SEO title="Blog" description="Practical thoughts on technology, development, AI, product building and the digital world." />

      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-4">Blog</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Insights & Ideas</h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Practical thoughts on technology, development, AI, product building and the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-base pl-9 py-2.5 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    category === cat
                      ? 'bg-violet-500/20 border border-violet-500/30 text-violet-300'
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
              <p className="text-gray-400">No articles found.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary mt-4 text-sm">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}


