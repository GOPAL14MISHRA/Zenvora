import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import type { BlogPost } from '../../types';

type FormData = Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>;

const empty: FormData = {
  title: '', slug: '', excerpt: '', content: '',
  coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  category: 'Development', tags: [], author: 'Gopal Mishra',
  authorAvatar: undefined,
  publishedAt: new Date().toISOString(),
  readingTime: 5, featured: false, published: false,
};

const categories = ['Development', 'AI', 'Web Development', 'Business', 'UI/UX', 'Technology'];

export function AdminBlogFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>(empty);
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      blogRepository.getById(id).then((p) => { if (p) setForm({ ...p }); });
    }
  }, [id, isEdit]);

  const set = (field: keyof FormData, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    set('title', title);
    if (!isEdit) set('slug', title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    set('tags', [...form.tags, tagInput.trim()]);
    setTagInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.slug.trim()) { setError('Title and slug are required.'); return; }
    setError('');
    setSaving(true);
    try {
      if (isEdit && id) await blogRepository.update(id, form);
      else await blogRepository.create(form);
      navigate('/admin/blog');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <button onClick={() => navigate('/admin/blog')} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </button>
      <h1 className="text-lg font-bold text-white mb-6">{isEdit ? 'Edit Article' : 'New Article'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {error && <div className="text-red-400 text-sm p-3 bg-red-500/10 border border-red-500/20 rounded-xl">{error}</div>}

            <div className="card-base p-5 space-y-4">
              <div>
                <label className="label-base">Title <span className="text-red-400">*</span></label>
                <input value={form.title} onChange={handleTitleChange} placeholder="Article title" className="input-base" />
              </div>
              <div>
                <label className="label-base">Slug <span className="text-red-400">*</span></label>
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className="input-base font-mono" />
              </div>
              <div>
                <label className="label-base">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} className="input-base resize-none" placeholder="Brief summary..." />
              </div>
            </div>

            <div className="card-base p-5">
              <label className="label-base mb-2">Content</label>
              <p className="text-gray-600 text-xs mb-2">Supports markdown: ## Heading, **bold**, - list, {'>'} quote</p>
              <textarea value={form.content} onChange={(e) => set('content', e.target.value)}
                rows={20} className="input-base resize-y font-mono text-xs" placeholder="Write your article content here..." />
            </div>
          </div>

          <div className="space-y-5">
            <div className="card-base p-5 space-y-4">
              <div>
                <label className="label-base">Cover Image URL</label>
                <input value={form.coverImage} onChange={(e) => set('coverImage', e.target.value)} className="input-base" />
                {form.coverImage && <img src={form.coverImage} alt="preview" className="mt-2 rounded-lg w-full aspect-video object-cover border border-white/10" />}
              </div>
              <div>
                <label className="label-base">Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input-base">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Author</label>
                <input value={form.author} onChange={(e) => set('author', e.target.value)} className="input-base" />
              </div>
              <div>
                <label className="label-base">Reading Time (min)</label>
                <input type="number" value={form.readingTime} onChange={(e) => set('readingTime', Number(e.target.value))} min={1} className="input-base" />
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

            <div className="card-base p-5">
              <label className="label-base mb-3">Tags</label>
              <div className="flex gap-2 mb-3">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..." className="input-base flex-1 py-2" />
                <button type="button" onClick={addTag} className="btn-secondary py-2 px-3 text-sm"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs">
                    {t}
                    <button type="button" onClick={() => set('tags', form.tags.filter((x) => x !== t))}><X size={10}/></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center disabled:opacity-60">
              {saving ? 'Saving...' : (isEdit ? 'Save Changes' : 'Publish Article')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
