import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BlogCard } from '../../components/ui/Cards';
import { AmbientBackground } from '../../components/ui/AmbientBackground';
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
    <div className="bg-[#F8FAFC] min-h-screen">
      <SEO 
        title="Zenvora Digitals Blog | Web Development & Digital Growth" 
        description="Read practical insights about website development, web applications, e-commerce, SEO, SaaS, AI and digital growth for businesses and startups." 
        url="https://www.zenvoradigitals.tech/blog"
      />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#F7F4EE]">
        <AmbientBackground variant="blog" />
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles size={12} /> Blog & Articles
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#171717] mb-4">Insights & Ideas</h1>
            <p className="text-[#5F5A52] text-lg max-w-xl">
              Practical thoughts on technology, development, e-commerce, web applications and building modern digital products.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 bg-[#F7F4EE] relative z-10">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-y border-[#DED9D0] py-5">
            <div className="relative flex-1 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5F5A52]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#DED9D0] rounded-xl pl-9 pr-4 py-2.5 text-xs sm:text-sm text-[#171717] placeholder-[#5F5A52]/60 focus:outline-none focus:border-[#E85D3F] focus:ring-2 focus:ring-[#E85D3F]/10 transition-colors shadow-xs"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#E85D3F] text-white shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#DED9D0] text-[#5F5A52] hover:text-[#171717] hover:border-[#171717]/30'
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
      <section className="pb-20 bg-[#F8FAFC] relative z-10">
        <div className="container-custom">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <p className="text-slate-500">No articles found matching your query.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); }} className="btn-secondary mt-4 text-xs py-2 px-4 rounded-xl">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}



