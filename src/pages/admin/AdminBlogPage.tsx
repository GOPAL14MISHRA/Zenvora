import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, ExternalLink, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import type { BlogPost } from '../../types';

function ConfirmModal({ open, onConfirm, onCancel }: { open: boolean; onConfirm: () => void; onCancel: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
      <div className="bg-[#FFFFFF] border border-[#DED9D0] p-6 max-w-sm w-full rounded-2xl shadow-lg">
        <h3 className="text-[#171717] font-bold text-base mb-2">Delete Article</h3>
        <p className="text-[#6B665E] text-xs leading-relaxed mb-6">Are you sure you want to delete this blog post? This action cannot be undone.</p>
        <div className="flex gap-2.5 justify-end">
          <button onClick={onCancel} className="btn-secondary text-xs py-2 px-4 rounded-xl">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer">
            Delete Article
          </button>
        </div>
      </div>
    </div>
  );
}

export function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () => blogRepository.getAll().then(setPosts);
  useEffect(() => { load(); }, []);

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (p: BlogPost) => {
    await blogRepository.update(p.id, { published: !p.published });
    load();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await blogRepository.delete(deleteId);
    setDeleteId(null);
    load();
  };

  return (
    <div className="space-y-6">
      <ConfirmModal open={!!deleteId} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Blog & Articles Management</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">
            {posts.length} total articles · {posts.filter((p) => p.published).length} published
          </p>
        </div>
        <Link to="/admin/blog/new" className="btn-primary text-xs py-2.5 px-4">
          <Plus size={15} /> New Post
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B665E]" />
          <input
            placeholder="Search articles by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-10 py-2 text-xs"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-[#FFFFFF] border border-[#DED9D0] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#DED9D0] bg-[#F7F4EE]/60 text-[#171717] uppercase tracking-wider font-mono">
                <th className="px-5 py-3.5 font-bold">Article</th>
                <th className="px-4 py-3.5 font-bold hidden md:table-cell">Category</th>
                <th className="px-4 py-3.5 font-bold hidden lg:table-cell">Author</th>
                <th className="px-4 py-3.5 font-bold text-center">Status</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED9D0]/60">
              {filtered.map((p) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#F7F4EE] border border-[#DED9D0] shrink-0">
                        <img
                          src={p.coverImage}
                          alt={p.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[#171717] font-bold text-sm leading-snug line-clamp-1">{p.title}</p>
                        <p className="text-[#6B665E] text-[11px] font-mono">{p.readingTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="px-2.5 py-1 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-[11px] font-semibold">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-[#171717] font-semibold text-xs">
                    {p.author}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <button
                      onClick={() => togglePublish(p)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                        p.published
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                      }`}
                    >
                      {p.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link
                        to={`/blog/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg hover:bg-[#F7F4EE] text-[#5F5A52] hover:text-[#171717] transition-colors"
                        title="View Published Article"
                      >
                        <ExternalLink size={14} />
                      </Link>
                      <Link
                        to={`/admin/blog/${p.id}/edit`}
                        className="p-1.5 rounded-lg hover:bg-[#F7F4EE] text-[#5F5A52] hover:text-[#E85D3F] transition-colors"
                        title="Edit Article"
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#5F5A52] hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Article"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-12 px-4">
              <div className="w-10 h-10 rounded-full bg-[#FCE8E2] text-[#E85D3F] flex items-center justify-center mx-auto mb-3">
                <FileText size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#171717]">No blog posts found</h4>
              <p className="text-xs text-[#6B665E] mt-1">Try changing your search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
