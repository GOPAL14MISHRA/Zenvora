import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Trash2, MessageSquare, Mail, Phone } from 'lucide-react';
import { inquiryRepository } from '../../repositories/firebase/FirebaseInquiryRepository';
import type { Inquiry, InquiryStatus } from '../../types';

const statuses: InquiryStatus[] = ['New', 'Contacted', 'In Discussion', 'Won', 'Lost'];

const statusStyles: Record<InquiryStatus, string> = {
  'New': 'bg-[#FCE8E2] text-[#E85D3F] border-[#E85D3F]/30',
  'Contacted': 'bg-amber-50 text-amber-700 border-amber-200',
  'In Discussion': 'bg-amber-100 text-amber-800 border-amber-300',
  'Won': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Lost': 'bg-gray-100 text-gray-600 border-gray-200',
};

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selected, setSelected] = useState<Inquiry | null>(null);

  useEffect(() => {
    const unsubscribe = inquiryRepository.subscribe(setInquiries);
    return () => unsubscribe();
  }, []);

  const filtered = inquiries.filter((i) => {
    const matchesSearch =
      i.fullName.toLowerCase().includes(search.toLowerCase()) ||
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      i.projectType.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = async (id: string, status: InquiryStatus) => {
    await inquiryRepository.updateStatus(id, status);
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status } : null));
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry record?')) {
      await inquiryRepository.delete(id);
      if (selected?.id === id) setSelected(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Inquiry Detail Drawer */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-xs"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="h-full w-full max-w-full sm:max-w-lg bg-[#FFFFFF] border-l border-[#DED9D0] overflow-y-auto shadow-2xl p-5 sm:p-8 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#DED9D0]/60 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-[#171717]">Inquiry Details</h2>
                  <p className="text-xs text-[#6B665E]">Received on {new Date(selected.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-[#F7F4EE] text-[#171717] hover:bg-[#DED9D0] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Client Info */}
              <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E85D3F] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {selected.fullName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#171717]">{selected.fullName}</h3>
                    <p className="text-xs text-[#6B665E]">{selected.company || 'Individual Client'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-[#DED9D0]/60">
                  <div className="flex items-center gap-2 text-[#5F5A52]">
                    <Mail size={13} className="text-[#E85D3F]" />
                    <a href={`mailto:${selected.email}`} className="hover:text-[#E85D3F] underline truncate">{selected.email}</a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2 text-[#5F5A52]">
                      <Phone size={13} className="text-[#E85D3F]" />
                      <a href={`tel:${selected.phone}`} className="hover:text-[#E85D3F]">{selected.phone}</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Project Requirements */}
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white border border-[#DED9D0]">
                    <span className="text-[#6B665E] font-mono text-[10px] uppercase block mb-1">Project Type</span>
                    <span className="font-bold text-[#171717] text-sm">{selected.projectType}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-[#DED9D0]">
                    <span className="text-[#6B665E] font-mono text-[10px] uppercase block mb-1">Estimated Budget</span>
                    <span className="font-bold text-[#171717] text-sm">{selected.budget || 'Flexible'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[#6B665E] font-mono text-[10px] uppercase block mb-1">Timeline</span>
                  <p className="text-[#171717] font-semibold">{selected.timeline || 'Standard timeline'}</p>
                </div>

                <div>
                  <span className="text-[#6B665E] font-mono text-[10px] uppercase block mb-1">Message / Requirements</span>
                  <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#DED9D0] text-[#171717] leading-relaxed text-xs sm:text-sm whitespace-pre-wrap">
                    {selected.message}
                  </div>
                </div>
              </div>

              {/* Status Manager */}
              <div className="pt-2">
                <span className="text-[#171717] font-bold text-xs uppercase tracking-wider block mb-2.5">
                  Update Lead Status
                </span>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selected.id, s)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        selected.status === s
                          ? `${statusStyles[s]} shadow-2xs font-extrabold`
                          : 'bg-[#F7F4EE] text-[#6B665E] border-[#DED9D0] hover:text-[#171717]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#DED9D0]/60 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selected.id)}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 size={14} />
                Delete Inquiry
              </button>
              <button
                onClick={() => setSelected(null)}
                className="btn-primary text-xs py-2 px-4"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Client Inquiries & Leads</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">
            {inquiries.length} total messages · <span className="font-bold text-[#E85D3F]">{inquiries.filter((i) => i.status === 'New').length} new unread leads</span>
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B665E]" />
          <input
            placeholder="Search by client name, email or project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-base pl-10 py-2 text-xs"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#E85D3F] text-white shadow-2xs'
                  : 'bg-[#F7F4EE] text-[#5F5A52] hover:text-[#171717] hover:bg-white border border-[#DED9D0]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#FFFFFF] border border-[#DED9D0] rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-xs">
            <thead>
              <tr className="border-b border-[#DED9D0] bg-[#F7F4EE]/60 text-[#171717] uppercase tracking-wider font-mono">
                <th className="px-5 py-3.5 font-bold">Client Contact</th>
                <th className="px-4 py-3.5 font-bold hidden md:table-cell">Project Type</th>
                <th className="px-4 py-3.5 font-bold hidden lg:table-cell">Budget</th>
                <th className="px-4 py-3.5 font-bold text-center">Status</th>
                <th className="px-4 py-3.5 font-bold hidden lg:table-cell">Date Received</th>
                <th className="px-5 py-3.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DED9D0]/60">
              {filtered.map((inq) => (
                <motion.tr key={inq.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-[#F7F4EE]/40 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#FCE8E2] text-[#E85D3F] flex items-center justify-center font-bold text-xs shrink-0">
                        {inq.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[#171717] font-bold text-sm leading-snug">{inq.fullName}</p>
                        <p className="text-[#6B665E] text-[11px]">{inq.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell text-[#171717] font-semibold text-xs">
                    {inq.projectType}
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-[#6B665E] text-xs font-mono">
                    {inq.budget || '—'}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${statusStyles[inq.status]}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-[#6B665E] text-xs font-mono">
                    {new Date(inq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <button
                        onClick={() => setSelected(inq)}
                        className="p-1.5 rounded-lg bg-[#F7F4EE] hover:bg-[#FFFFFF] border border-[#DED9D0] text-[#171717] hover:text-[#E85D3F] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold px-2.5"
                        title="View Full Details"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => handleDelete(inq.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-[#5F5A52] hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Lead"
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
                <MessageSquare size={20} />
              </div>
              <h4 className="text-sm font-bold text-[#171717]">No inquiries found</h4>
              <p className="text-xs text-[#6B665E] mt-1">
                Your incoming project enquiries from client contact forms will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
