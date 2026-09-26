import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
import { projectRepository } from '../../repositories/firebase/FirebaseProjectRepository';
import type { Project } from '../../types';

type FormData = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

const empty: FormData = {
  title: '', slug: '', shortDescription: '', description: '',
  challenge: '', solution: '',
  keyFeatures: [],
  category: 'Web',
  technologies: [],
  image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  gallery: [],
  liveUrl: '', githubUrl: '',
  featured: false, published: false,
};

const categories = ['E-commerce', 'EdTech', 'AI / SaaS', 'Web'];

export function AdminProjectFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(empty);
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      projectRepository.getById(id).then((p) => {
        if (p) setForm({ ...p });
      });
    }
  }, [id, isEdit]);

  const set = (field: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    set('title', title);
    if (!isEdit) set('slug', title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const addTech = () => {
    if (!techInput.trim()) return;
    set('technologies', [...form.technologies, techInput.trim()]);
    setTechInput('');
  };

  const removeTech = (t: string) => set('technologies', form.technologies.filter((x) => x !== t));

  const addFeature = () => {
    if (!featureInput.trim()) return;
    set('keyFeatures', [...(form.keyFeatures ?? []), featureInput.trim()]);
    setFeatureInput('');
  };

  const removeFeature = (f: string) =>
    set('keyFeatures', (form.keyFeatures ?? []).filter((x) => x !== f));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) { setError('Title and slug are required.'); return; }
    setError('');
    setSaving(true);
    try {
      if (isEdit && id) {
        await projectRepository.update(id, form);
      } else {
        await projectRepository.create(form);
      }
      navigate('/admin/projects');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={() => navigate('/admin/projects')} className="inline-flex items-center gap-2 text-[#5F5A52] hover:text-[#171717] text-xs font-semibold transition-colors">
        <ArrowLeft size={14} /> Back to Projects
      </button>

      <h1 className="text-xl font-bold text-[#171717]">{isEdit ? 'Edit Project' : 'Create New Project'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {error && <div className="text-red-600 text-xs p-3 bg-red-50 border border-red-200 rounded-xl font-semibold">{error}</div>}

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-4">
              <div>
                <label className="label-base">Title <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={handleTitleChange} placeholder="Project title" className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Slug <span className="text-red-500">*</span></label>
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="project-slug" className="input-base font-mono text-xs" />
              </div>
              <div>
                <label className="label-base">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} placeholder="Brief one-line summary" className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Full Description</label>
                <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} className="input-base resize-none text-xs" />
              </div>
              <div>
                <label className="label-base">Challenge</label>
                <textarea value={form.challenge ?? ''} onChange={(e) => set('challenge', e.target.value)} rows={3} className="input-base resize-none text-xs" />
              </div>
              <div>
                <label className="label-base">Solution</label>
                <textarea value={form.solution ?? ''} onChange={(e) => set('solution', e.target.value)} rows={3} className="input-base resize-none text-xs" />
              </div>
            </div>

            {/* Key Features */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
              <label className="label-base mb-3">Key Features</label>
              <div className="flex gap-2 mb-3">
                <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add a feature..." className="input-base flex-1 py-2 text-xs" />
                <button type="button" onClick={addFeature} className="btn-secondary py-2 px-3 text-xs cursor-pointer"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.keyFeatures ?? []).map((f) => (
                  <span key={f} className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#F7F4EE] border border-[#DED9D0] text-[#171717] text-xs font-semibold">
                    {f}
                    <button type="button" onClick={() => removeFeature(f)} className="text-[#6B665E] hover:text-red-600"><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base">Live URL</label>
                <input value={form.liveUrl ?? ''} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">GitHub URL</label>
                <input value={form.githubUrl ?? ''} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/..." className="input-base text-xs" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-4">
              <div>
                <label className="label-base">Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input-base text-xs bg-white">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Project Image</label>
                <div className="space-y-2">
                  <input
                    value={form.image}
                    onChange={(e) => set('image', e.target.value)}
                    placeholder="Paste Image URL or Upload File below..."
                    className="input-base text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <label className="btn-secondary text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5">
                      <Upload size={13} />
                      <span>Choose Local Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') {
                                set('image', reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {form.image && (
                    <div className="relative mt-2 rounded-xl overflow-hidden border border-[#DED9D0] bg-[#F7F4EE]">
                      <img
                        src={form.image}
                        alt="preview"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556742049-0a67daf4005a?w=1200&q=80';
                        }}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#DED9D0]/60">
                <label className="text-xs font-bold text-[#171717]">Published</label>
                <button type="button" onClick={() => set('published', !form.published)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.published ? 'bg-emerald-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#171717]">Featured</label>
                <button type="button" onClick={() => set('featured', !form.featured)}
                  className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${form.featured ? 'bg-amber-500' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Technologies */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
              <label className="label-base mb-3">Technologies</label>
              <div className="flex gap-2 mb-3">
                <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="Add tech..." className="input-base flex-1 py-2 text-xs" />
                <button type="button" onClick={addTech} className="btn-secondary py-2 px-3 text-xs cursor-pointer"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.technologies.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-bold">
                    {t}
                    <button type="button" onClick={() => removeTech(t)}><X size={12} /></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center text-xs py-3 disabled:opacity-60 cursor-pointer">
              {saving ? 'Saving...' : (isEdit ? 'Save Project Changes' : 'Create Project')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
