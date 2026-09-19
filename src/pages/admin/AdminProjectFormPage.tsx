import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
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
    <div>
      <button onClick={() => navigate('/admin/projects')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Projects
      </button>
      <h1 className="text-lg font-bold text-white mb-6">{isEdit ? 'Edit Project' : 'New Project'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-5">
            {error && <div className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-xl">{error}</div>}

            <div className="card-base p-5 space-y-4">
              <div>
                <label className="label-base">Title <span className="text-red-400">*</span></label>
                <input value={form.title} onChange={handleTitleChange} placeholder="Project title" className="input-base" />
              </div>
              <div>
                <label className="label-base">Slug <span className="text-red-400">*</span></label>
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} placeholder="project-slug" className="input-base font-mono" />
              </div>
              <div>
                <label className="label-base">Short Description</label>
                <input value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} placeholder="Brief one-line description" className="input-base" />
              </div>
              <div>
                <label className="label-base">Full Description</label>
                <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={4} className="input-base resize-none" />
              </div>
              <div>
                <label className="label-base">Challenge</label>
                <textarea value={form.challenge ?? ''} onChange={(e) => set('challenge', e.target.value)} rows={3} className="input-base resize-none" />
              </div>
              <div>
                <label className="label-base">Solution</label>
                <textarea value={form.solution ?? ''} onChange={(e) => set('solution', e.target.value)} rows={3} className="input-base resize-none" />
              </div>
            </div>

            {/* Key Features */}
            <div className="card-base p-5">
              <label className="label-base mb-3">Key Features</label>
              <div className="flex gap-2 mb-3">
                <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                  placeholder="Add a feature..." className="input-base flex-1 py-2" />
                <button type="button" onClick={addFeature} className="btn-secondary py-2 px-3 text-sm"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(form.keyFeatures ?? []).map((f) => (
                  <span key={f} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-xs">
                    {f}
                    <button type="button" onClick={() => removeFeature(f)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="card-base p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-base">Live URL</label>
                <input value={form.liveUrl ?? ''} onChange={(e) => set('liveUrl', e.target.value)} placeholder="https://..." className="input-base" />
              </div>
              <div>
                <label className="label-base">GitHub URL</label>
                <input value={form.githubUrl ?? ''} onChange={(e) => set('githubUrl', e.target.value)} placeholder="https://github.com/..." className="input-base" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card-base p-5 space-y-4">
              <div>
                <label className="label-base">Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input-base">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Main Image URL</label>
                <input value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="https://..." className="input-base" />
                {form.image && <img src={form.image} alt="preview" className="mt-2 rounded-lg w-full aspect-video object-cover border border-white/10" />}
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Published</label>
                <button type="button" onClick={() => set('published', !form.published)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.published ? 'bg-blue-500' : 'bg-white/10'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Featured</label>
                <button type="button" onClick={() => set('featured', !form.featured)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.featured ? 'bg-yellow-500' : 'bg-white/10'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Technologies */}
            <div className="card-base p-5">
              <label className="label-base mb-3">Technologies</label>
              <div className="flex gap-2 mb-3">
                <input value={techInput} onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  placeholder="Add tech..." className="input-base flex-1 py-2" />
                <button type="button" onClick={addTech} className="btn-secondary py-2 px-3 text-sm"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.technologies.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                    {t}
                    <button type="button" onClick={() => removeTech(t)}><X size={10} /></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
              {saving ? 'Saving...' : (isEdit ? 'Save Changes' : 'Create Project')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
