import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, X, Upload } from 'lucide-react';
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
    <div className="space-y-6">
      <button onClick={() => navigate('/admin/blog')} className="inline-flex items-center gap-2 text-[#5F5A52] hover:text-[#171717] text-xs font-semibold transition-colors">
        <ArrowLeft size={14} /> Back to Blog
      </button>

      <h1 className="text-xl font-bold text-[#171717]">{isEdit ? 'Edit Article' : 'Publish New Article'}</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {error && <div className="text-red-600 text-xs p-3 bg-red-50 border border-red-200 rounded-xl font-semibold">{error}</div>}

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-4">
              <div>
                <label className="label-base">Title <span className="text-red-500">*</span></label>
                <input value={form.title} onChange={handleTitleChange} placeholder="Article title" className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Slug <span className="text-red-500">*</span></label>
                <input value={form.slug} onChange={(e) => set('slug', e.target.value)} className="input-base font-mono text-xs" />
              </div>
              <div>
                <label className="label-base">Excerpt</label>
                <textarea value={form.excerpt} onChange={(e) => set('excerpt', e.target.value)} rows={2} className="input-base resize-none text-xs" placeholder="Brief summary..." />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
              <label className="label-base mb-1">Content</label>
              <p className="text-[#6B665E] text-[11px] mb-3 font-mono">Supports markdown: ## Heading, **bold**, - list, {'>'} quote</p>
              <textarea value={form.content} onChange={(e) => set('content', e.target.value)}
                rows={20} className="input-base resize-y font-mono text-xs leading-relaxed" placeholder="Write your article content here..." />
            </div>
          </div>

          <div className="space-y-5">
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs space-y-4">
              <div>
                <label className="label-base">Cover Image</label>
                <div className="space-y-2">
                  <input
                    value={form.coverImage}
                    onChange={(e) => set('coverImage', e.target.value)}
                    placeholder="Paste Image URL or Upload File below..."
                    className="input-base text-xs"
                  />
                  <div className="flex items-center gap-2">
                    <label className="btn-secondary text-xs py-1.5 px-3 cursor-pointer inline-flex items-center gap-1.5">
                      <Upload size={13} />
                      <span>Choose Image File</span>
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
                                set('coverImage', reader.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {form.coverImage && (
                    <div className="relative mt-2 rounded-xl overflow-hidden border border-[#DED9D0] bg-[#F7F4EE]">
                      <img
                        src={form.coverImage}
                        alt="preview"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80';
                        }}
                        className="w-full aspect-video object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="label-base">Category</label>
                <select value={form.category} onChange={(e) => set('category', e.target.value)} className="input-base text-xs bg-white">
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label-base">Author</label>
                <input value={form.author} onChange={(e) => set('author', e.target.value)} className="input-base text-xs" />
              </div>
              <div>
                <label className="label-base">Reading Time (min)</label>
                <input type="number" value={form.readingTime} onChange={(e) => set('readingTime', Number(e.target.value))} min={1} className="input-base text-xs" />
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

            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DED9D0] shadow-xs">
              <label className="label-base mb-3">Tags</label>
              <div className="flex gap-2 mb-3">
                <input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag..." className="input-base flex-1 py-2 text-xs" />
                <button type="button" onClick={addTag} className="btn-secondary py-2 px-3 text-xs cursor-pointer"><Plus size={14}/></button>
              </div>
              <div className="flex flex-wrap gap-2">
                {form.tags.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FCE8E2] border border-[#E85D3F]/20 text-[#E85D3F] text-xs font-bold">
                    {t}
                    <button type="button" onClick={() => set('tags', form.tags.filter((x) => x !== t))}><X size={12}/></button>
                  </span>
                ))}
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary w-full justify-center text-xs py-3 disabled:opacity-60 cursor-pointer">
              {saving ? 'Saving...' : (isEdit ? 'Save Article Changes' : 'Publish Article')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
