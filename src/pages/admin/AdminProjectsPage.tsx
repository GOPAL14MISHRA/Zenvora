import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Star, StarOff, Search, ExternalLink } from 'lucide-react';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

function ConfirmModal({ open, message, onConfirm, onCancel }: {
  open: boolean; message: string; onConfirm: () => void; onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="card-base p-6 max-w-sm w-full">
        <h3 className="text-white font-semibold mb-2">Confirm</h3>
        <p className="text-gray-400 text-sm mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="btn-secondary text-sm py-2">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}

export function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = projectRepository.subscribe(setProjects);
    return () => unsubscribe();
  }, []);

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const togglePublish = async (p: Project) => {
    await projectRepository.update(p.id, { published: !p.published });
  };

  const toggleFeatured = async (p: Project) => {
    await projectRepository.update(p.id, { featured: !p.featured });
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await projectRepository.delete(deleteId);
    setDeleteId(null);
  };

  return (
    <div>
      <ConfirmModal
        open={!!deleteId}
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-lg font-bold text-white">Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} total</p>
        </div>
        <Link to="/admin/projects/new" className="btn-primary text-sm py-2.5">
          <Plus size={15} /> New Project
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Search projects..." value={search} onChange={(e) => setSearch(e.target.value)}
          className="input-base pl-9 py-2.5 text-sm"
        />
      </div>

      {/* Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5">
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Title</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Technologies</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
                <th className="text-center px-4 py-3 font-medium">Featured</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/2 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0D1117] shrink-0">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-white font-medium text-sm">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="badge bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px]">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {p.technologies.slice(0,3).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-gray-400 text-[10px]">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => togglePublish(p)} className={`px-2 py-1 rounded-lg text-xs font-medium transition-colors ${p.published ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-white/5 text-gray-500 border border-white/10'}`}>
                      {p.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleFeatured(p)} className="p-1.5 rounded-lg hover:bg-white/5 transition-colors">
                      {p.featured ? <Star size={14} className="text-yellow-400 fill-yellow-400" /> : <StarOff size={14} className="text-gray-600" />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <Link to={`/projects/${p.slug}`} target="_blank" className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <ExternalLink size={13} />
                      </Link>
                      <Link to={`/admin/projects/${p.id}/edit`} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-blue-400 transition-colors">
                        <Edit2 size={13} />
                      </Link>
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-sm">No projects found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
