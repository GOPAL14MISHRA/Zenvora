import { useEffect, useState } from 'react';
import { Edit2, Trash2, X } from 'lucide-react';
import { serviceRepository } from '../../repositories/mock/MockServiceRepository';
import { testimonialRepository } from '../../repositories/mock/MockTestimonialRepository';
import { teamRepository } from '../../repositories/mock/MockTeamRepository';
import type { Service, Testimonial, TeamMember } from '../../types';
import { useAuth } from '../../context/AuthContext';

// ─── Admin Services Page ──────────────────────────────────────────────────
export function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => serviceRepository.getAll().then(setServices);
  useEffect(() => { load(); }, []);

  const toggle = async (s: Service) => {
    await serviceRepository.update(s.id, { published: !s.published });
    load();
  };

  const del = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await serviceRepository.delete(id);
      load();
    }
  };

  const startCreate = () => {
    setEditing({
      number: `0${services.length + 1}`,
      title: '',
      description: '',
      icon: 'Globe',
      technologies: [],
      order: services.length + 1,
      published: true
    });
  };

  const startEdit = (s: Service) => setEditing({ ...s });

  const handleSave = async () => {
    if (!editing || !editing.title) return;
    setSaving(true);
    if (editing.id) {
      await serviceRepository.update(editing.id, editing);
    } else {
      await serviceRepository.create(editing as Omit<Service, 'id' | 'createdAt' | 'updatedAt'>);
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-6">
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
          <div className="bg-[#FFFFFF] border border-[#DED9D0] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-[#DED9D0]/60 pb-3">
              <h3 className="text-[#171717] font-bold text-base">{editing.id ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setEditing(null)} className="text-[#6B665E] hover:text-[#171717] p-1"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-base">Number (e.g. 01)</label>
                <input value={editing.number ?? ''} onChange={(e) => setEditing({ ...editing, number: e.target.value })} className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Title</label>
                <input value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Description</label>
                <textarea value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-base resize-none text-xs" />
              </div>
              <div>
                <label className="label-base">Icon Name (lucide-react)</label>
                <input value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Order</label>
                <input type="number" value={editing.order ?? 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="input-base text-xs" />
              </div>
            </div>
            <div className="flex gap-2.5 mt-6 pt-4 border-t border-[#DED9D0]/60">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center text-xs disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Studio Capabilities & Services</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">Manage services displayed across your website.</p>
        </div>
        <button onClick={startCreate} className="btn-primary text-xs py-2 px-3 flex items-center gap-2 cursor-pointer">
          Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-1 items-center gap-4 min-w-0">
              <span className="text-xs font-mono font-bold text-[#E85D3F] bg-[#FCE8E2] px-2.5 py-1 rounded-lg shrink-0">{s.number}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[#171717] text-sm font-bold">{s.title}</p>
                <p className="text-[#6B665E] text-xs line-clamp-1">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button
                onClick={() => toggle(s)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                  s.published
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}
              >
                {s.published ? 'Live' : 'Hidden'}
              </button>
              <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-[#F7F4EE] text-[#5F5A52] hover:text-[#E85D3F] transition-colors cursor-pointer">
                <Edit2 size={14} />
              </button>
              <button onClick={() => del(s.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#5F5A52] hover:text-red-600 transition-colors cursor-pointer">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Testimonials Page ──────────────────────────────────────────────
export function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);

  const load = () => testimonialRepository.getAll().then(setItems);
  useEffect(() => { load(); }, []);

  const toggle = async (t: Testimonial) => {
    await testimonialRepository.update(t.id, { published: !t.published });
    load();
  };

  const del = async (id: string) => {
    await testimonialRepository.delete(id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Client Testimonials</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">Manage testimonials displayed on your homepage.</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[#171717] font-bold text-sm">{t.name}</p>
                <p className="text-[#6B665E] text-xs">{t.role} · <span className="font-semibold text-[#171717]">{t.company}</span></p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggle(t)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                    t.published
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {t.published ? 'Visible' : 'Hidden'}
                </button>
                <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-[#5F5A52] hover:text-red-600 transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <p className="text-[#5F5A52] text-xs leading-relaxed italic">"{t.message}"</p>
            <div className="flex gap-0.5 pt-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-amber-500 text-xs">★</span>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-[#6B665E] text-xs">No testimonials yet.</p>}
      </div>
    </div>
  );
}

// ─── Admin Team Page ──────────────────────────────────────────────────────
export function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Partial<TeamMember>>({});
  const [saving, setSaving] = useState(false);

  const load = () => teamRepository.getAll().then(setTeam);
  useEffect(() => { load(); }, []);

  const startEdit = (m: TeamMember) => { setEditing(m); setForm({ ...m }); };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    await teamRepository.update(editing.id, form);
    setSaving(false);
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-6">
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs px-4">
          <div className="bg-[#FFFFFF] border border-[#DED9D0] p-6 w-full max-w-md rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-5 border-b border-[#DED9D0]/60 pb-3">
              <h3 className="text-[#171717] font-bold text-base">Edit Team Member</h3>
              <button onClick={() => setEditing(null)} className="text-[#6B665E] hover:text-[#171717] p-1"><X size={18} /></button>
            </div>
            <div className="space-y-3">
              {([['Name', 'name'], ['Role', 'role'], ['Bio', 'bio'], ['Avatar URL', 'avatar'], ['GitHub', 'github'], ['LinkedIn', 'linkedin']] as [string, keyof TeamMember][]).map(([label, key]) => (
                <div key={key}>
                  <label className="label-base">{label}</label>
                  {key === 'bio' ? (
                    <textarea value={(form[key] as string) ?? ''} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} rows={3} className="input-base resize-none text-xs" />
                  ) : (
                    <input value={(form[key] as string) ?? ''} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="input-base text-xs" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2.5 mt-5 pt-4 border-t border-[#DED9D0]/60">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1 justify-center text-xs">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center text-xs disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-xl font-bold text-[#171717]">Studio Team Members</h1>
        <p className="text-[#6B665E] text-xs mt-0.5">Zenvora direct developer profiles.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {team.map((m) => (
          <div key={m.id} className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#E85D3F] text-white shrink-0 shadow-2xs">
                {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center font-bold text-base">{m.name[0]}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#171717] font-bold text-sm">{m.name}</p>
                <p className="text-[#E85D3F] font-semibold text-xs">{m.role}</p>
                <p className="text-[#6B665E] text-xs mt-1.5 leading-relaxed line-clamp-2">{m.bio}</p>
              </div>
            </div>
            <div className="pt-3 border-t border-[#DED9D0]/60 flex items-center justify-between">
              <button onClick={() => startEdit(m)} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#171717] hover:text-[#E85D3F] transition-colors cursor-pointer">
                <Edit2 size={13} /> Edit Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Media Page ─────────────────────────────────────────────────────
export function AdminMediaPage() {
  const mockImages = [
    { id: '1', name: 'hero-bg.jpg', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400', size: 124000 },
    { id: '2', name: 'project-1.jpg', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', size: 98000 },
    { id: '3', name: 'project-2.jpg', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400', size: 112000 },
    { id: '4', name: 'blog-ai.jpg', url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400', size: 135000 },
  ];

  const [copied, setCopied] = useState<string | null>(null);

  const copy = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#171717]">Media Library</h1>
          <p className="text-[#6B665E] text-xs mt-0.5">Firebase Storage assets & project image URLs.</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-[#FFFFFF] border-2 border-dashed border-[#DED9D0] text-center space-y-2">
        <p className="text-[#171717] font-semibold text-xs">Direct image URL links ready for projects & articles.</p>
        <p className="text-[#6B665E] text-[11px]">Click "Copy URL" on any asset below to copy the link to your clipboard.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockImages.map((img) => (
          <div key={img.id} className="p-3 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs group">
            <div className="aspect-square rounded-xl overflow-hidden bg-[#F7F4EE] border border-[#DED9D0]">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="mt-3 space-y-1">
              <p className="text-[#171717] text-xs font-bold truncate">{img.name}</p>
              <p className="text-[#6B665E] text-[10px] font-mono">{(img.size / 1024).toFixed(0)} KB</p>
              <button
                onClick={() => copy(img.url)}
                className="w-full mt-2 py-1.5 px-3 rounded-xl bg-[#F7F4EE] hover:bg-[#E85D3F] hover:text-white border border-[#DED9D0] text-[#171717] text-xs font-semibold transition-all cursor-pointer"
              >
                {copied === img.url ? '✓ Copied!' : 'Copy Image URL'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Admin Profile Page ───────────────────────────────────────────────────
export function AdminProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-xl font-bold text-[#171717]">Admin Profile</h1>
        <p className="text-[#6B665E] text-xs mt-0.5">Administrator account details.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#E85D3F] text-white flex items-center justify-center font-extrabold text-2xl shadow-xs">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
          <div>
            <h2 className="text-[#171717] font-extrabold text-base">{user?.name || 'Zenvora Admin'}</h2>
            <p className="text-[#6B665E] text-xs">{user?.email || 'admin@zenvora.com'}</p>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-[10px] font-bold uppercase mt-1.5">
              {user?.role || 'administrator'}
            </span>
          </div>
        </div>

        <div className="space-y-3.5 text-xs pt-4 border-t border-[#DED9D0]/60">
          <div>
            <p className="text-[#6B665E] font-mono text-[10px] uppercase mb-0.5">Account Name</p>
            <p className="text-[#171717] font-bold text-sm">{user?.name || 'Zenvora Admin'}</p>
          </div>
          <div>
            <p className="text-[#6B665E] font-mono text-[10px] uppercase mb-0.5">Account Email</p>
            <p className="text-[#171717] font-bold text-sm">{user?.email || 'admin@zenvora.com'}</p>
          </div>
          <div>
            <p className="text-[#6B665E] font-mono text-[10px] uppercase mb-0.5">Access Role</p>
            <p className="text-[#171717] font-bold text-sm capitalize">{user?.role || 'Administrator'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
