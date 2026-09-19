import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Trash2 } from 'lucide-react';
import { inquiryRepository } from '../../repositories/firebase/FirebaseInquiryRepository';
import type { Inquiry, InquiryStatus } from '../../types';

const statuses: InquiryStatus[] = ['New', 'Contacted', 'In Discussion', 'Won', 'Lost'];
const statusColors: Record<InquiryStatus, string> = {
  'New': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Contacted': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'In Discussion': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Won': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Lost': 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    const unsubscribe = inquiryRepository.subscribe(setInquiries);
    return () => unsubscribe();
  }, []);

  const filtered = inquiries.filter((i) =>
    i.fullName.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase()) ||
    i.projectType.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = async (id: string, status: InquiryStatus) => {
    await inquiryRepository.updateStatus(id, status);
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  const handleDelete = async (id: string) => {
    await inquiryRepository.delete(id);
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div>
      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="h-full w-full max-w-md bg-[#0D1117] border-l border-white/5 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold">Inquiry Details</h2>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white p-1">✕</button>
              </div>
              <div className="space-y-4">
                {[
                  ['Name', selected.fullName], ['Email', selected.email],
                  ['Company', selected.company || '—'], ['Phone', selected.phone || '—'],
                  ['Project Type', selected.projectType], ['Budget', selected.budget || '—'],
                  ['Timeline', selected.timeline || '—'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-gray-500 text-xs mb-1">{label}</p>
                    <p className="text-white text-sm">{value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-gray-500 text-xs mb-1">Message</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{selected.message}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-2">Status</p>
                  <div className="flex flex-wrap gap-2">
                    {statuses.map((s) => (
                      <button key={s} onClick={() => updateStatus(selected.id, s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selected.status === s ? statusColors[s] : 'bg-white/5 text-gray-500 border-white/10 hover:border-white/20'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-lg font-bold text-white">Inquiries</h1>
          <p className="text-gray-500 text-sm">{inquiries.length} total · {inquiries.filter(i => i.status === 'New').length} new</p>
        </div>
      </div>

      <div className="relative mb-5 max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input placeholder="Search inquiries..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-base pl-9 py-2.5 text-sm" />
      </div>

      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-white/5">
              <tr className="text-gray-500 text-xs uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">Contact</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Project</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Budget</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((inq) => (
                <motion.tr key={inq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/2">
                  <td className="px-4 py-3">
                    <p className="text-white text-sm font-medium">{inq.fullName}</p>
                    <p className="text-gray-500 text-xs">{inq.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-gray-300 text-xs">{inq.projectType}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">{inq.budget || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`badge border text-xs ${statusColors[inq.status]}`}>{inq.status}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-gray-500 text-xs">
                    {new Date(inq.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setSelected(inq)} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                        <Eye size={13} />
                      </button>
                      <button onClick={() => handleDelete(inq.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500 text-sm">No inquiries found.</div>}
        </div>
      </div>
    </div>
  );
}
