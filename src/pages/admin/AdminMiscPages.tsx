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
    <div>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="card-base p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">{editing.id ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={() => setEditing(null)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-base">Number (e.g. 01)</label>
                <input value={editing.number ?? ''} onChange={(e) => setEditing({ ...editing, number: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="label-base">Title</label>
                <input value={editing.title ?? ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="label-base">Description</label>
                <textarea value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="input-base resize-none" />
              </div>
              <div>
                <label className="label-base">Icon Name (lucide-react)</label>
                <input value={editing.icon ?? ''} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="input-base" />
              </div>
              <div>
                <label className="label-base">Order</label>
                <input type="number" value={editing.order ?? 0} onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })} className="input-base" />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1 justify-center text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center text-sm disabled:opacity-60">
                {saving ? 'Saving...' : 'Save Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-white">Services</h1>
        <button onClick={startCreate} className="btn-primary text-xs py-2 px-3 flex items-center gap-2">
          Add Service
        </button>
      </div>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="card-base p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex flex-1 items-center gap-4 min-w-0">
              <span className="text-xs font-mono text-gray-600 w-6 shrink-0">{s.number}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{s.title}</p>
                <p className="text-gray-500 text-xs line-clamp-1">{s.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
              <button onClick={() => toggle(s)}
                className={`px-2 py-1 rounded-lg text-xs border transition-colors ${s.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                {s.published ? 'Live' : 'Hidden'}
              </button>
              <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors">
                <Edit2 size={13} />
              </button>
              <button onClick={() => del(s.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                <Trash2 size={13} />
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-white">Testimonials</h1>
          <p className="text-gray-500 text-sm">Sample/demo testimonials only.</p>
        </div>
      </div>
      <div className="space-y-3">
        {items.map((t) => (
          <div key={t.id} className="card-base p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-white font-medium text-sm">{t.name}</p>
                <p className="text-gray-500 text-xs">{t.role} · {t.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggle(t)}
                  className={`px-2 py-1 rounded-lg text-xs border transition-colors ${t.published ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-gray-500 border-white/10'}`}>
                  {t.published ? 'Visible' : 'Hidden'}
                </button>
                <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">"{t.message}"</p>
            <div className="flex gap-0.5 mt-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-gray-500 text-sm">No testimonials yet.</p>}
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
    <div>
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="card-base p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white font-semibold">Edit Team Member</h3>
              <button onClick={() => setEditing(null)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="space-y-3">
              {([['Name', 'name'], ['Role', 'role'], ['Bio', 'bio'], ['Avatar URL', 'avatar'], ['GitHub', 'github'], ['LinkedIn', 'linkedin']] as [string, keyof TeamMember][]).map(([label, key]) => (
                <div key={key}>
                  <label className="label-base">{label}</label>
                  {key === 'bio' ? (
                    <textarea value={(form[key] as string) ?? ''} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} rows={3} className="input-base resize-none" />
                  ) : (
                    <input value={(form[key] as string) ?? ''} onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))} className="input-base" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setEditing(null)} className="btn-secondary flex-1 justify-center text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center text-sm disabled:opacity-60">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-lg font-bold text-white mb-6">Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {team.map((m) => (
          <div key={m.id} className="card-base p-5">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-violet-600 shrink-0">
                {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" /> :
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">{m.name[0]}</div>}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{m.name}</p>
                <p className="text-blue-400 text-xs">{m.role}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{m.bio}</p>
              </div>
            </div>
            <button onClick={() => startEdit(m)} className="mt-4 flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors">
              <Edit2 size={12} /> Edit
            </button>
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg font-bold text-white">Media Library</h1>
        <p className="text-gray-500 text-sm">Firebase Storage integration ready.</p>
      </div>
      <div className="card-base p-8 border-dashed border-2 text-center mb-6">
        <p className="text-gray-400 text-sm">Upload functionality will be enabled after Firebase Storage integration.</p>
        <p className="text-gray-600 text-xs mt-1">Architecture is Firebase Storage ready.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {mockImages.map((img) => (
          <div key={img.id} className="card-base overflow-hidden group">
            <div className="aspect-square overflow-hidden bg-[#0D1117]">
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="text-white text-xs font-medium truncate">{img.name}</p>
              <p className="text-gray-500 text-[10px]">{(img.size / 1024).toFixed(0)} KB</p>
              <button onClick={() => copy(img.url)} className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                {copied === img.url ? '✓ Copied!' : 'Copy URL'}
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
    <div>
      <h1 className="text-lg font-bold text-white mb-6">Profile</h1>
      <div className="card-base p-6 max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) ?? 'A'}
          </div>
          <div>
            <h2 className="text-white font-semibold">{user?.name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <span className="badge bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] mt-1">{user?.role}</span>
          </div>
        </div>
        <div className="space-y-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Name</p>
            <p className="text-white">{user?.name}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Email</p>
            <p className="text-white">{user?.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-0.5">Role</p>
            <p className="text-white capitalize">{user?.role}</p>
          </div>
        </div>
        <p className="text-gray-600 text-xs mt-6">Profile editing will be available after Firebase Authentication integration.</p>
      </div>
    </div>
  );
}
