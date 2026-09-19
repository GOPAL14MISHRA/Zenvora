import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag } from 'lucide-react';
import { SEO } from '../../components/SEO';
import { BlogCard } from '../../components/ui/Cards';
import { blogRepository } from '../../repositories/firebase/FirebaseBlogRepository';
import type { BlogPost } from '../../types';

function renderContent(content: string) {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold text-gray-100 mt-6 mb-3">{line.slice(4)}</h3>;
    if (line.startsWith('- ')) return <li key={i} className="text-gray-300 leading-relaxed ml-4">{line.slice(2)}</li>;
    if (line.startsWith('> ')) return (
      <blockquote key={i} className="border-l-4 border-blue-500 pl-4 text-gray-400 italic my-4">{line.slice(2)}</blockquote>
    );
    if (line.trim() === '') return <div key={i} className="h-2" />;
    // Bold
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-gray-300 leading-relaxed mb-1">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
      </p>
    );
  });
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    blogRepository.getBySlug(slug).then((p) => {
      setPost(p);
      setLoading(false);
    });
    blogRepository.getAll().then((all) => {
      setRelated(all.filter((p) => p.slug !== slug).slice(0, 3));
    });
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 text-center px-4">
      <h1 className="text-2xl font-bold text-white mb-3">Article Not Found</h1>
      <Link to="/blog" className="btn-primary mt-4">← Back to Blog</Link>
    </div>
  );

  const date = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <>
      <SEO title={post.title} description={post.excerpt} image={post.coverImage} />

      {/* Hero */}
      <section className="relative pt-28 pb-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="container-custom relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="badge bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3 mb-5 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readingTime} min read</span>
          </div>
        </div>
      </section>

      {/* Cover image */}
      <div className="container-custom max-w-4xl mb-12">
        <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video bg-[#0D1117]">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-90" />
        </div>
      </div>

      {/* Article */}
      <div className="container-custom max-w-4xl pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <article className="lg:col-span-3">
            <div className="prose-custom">
              {renderContent(post.content)}
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/5">
              {post.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-xs">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="card-base p-5 sticky top-24">
              <h3 className="text-white font-semibold text-sm mb-3">Article Info</h3>
              <div className="space-y-2.5 text-xs text-gray-400">
                <div><span className="text-gray-600">Author</span><br/>{post.author}</div>
                <div><span className="text-gray-600">Published</span><br/>{date}</div>
                <div><span className="text-gray-600">Read time</span><br/>{post.readingTime} min</div>
                <div><span className="text-gray-600">Category</span><br/>{post.category}</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p, i) => <BlogCard key={p.id} post={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </>
  );
}


