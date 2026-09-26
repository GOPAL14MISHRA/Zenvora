import { useEffect } from 'react';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../utils/seoUtils';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service';
  noindex?: boolean;
  publishedTime?: string;
  author?: string;
  schema?: object | object[];
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  publishedTime,
  author,
  schema,
}: SEOProps) {
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const canonicalUrl = url || `${SITE_URL}${currentPath}`;
  const fullTitle = title
    ? (title.includes('Zenvora Digitals') ? title : `${title} | Zenvora Digitals`)
    : 'Zenvora Digitals | Websites, Web Apps & Digital Solutions';

  const desc =
    description ||
    'Zenvora Digitals builds professional websites, web applications, e-commerce stores, SaaS products and AI-powered digital solutions for businesses in India and worldwide.';

  const ogImage = image || DEFAULT_OG_IMAGE;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper for Meta Tags
    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMeta('description', desc);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');

    // 3. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:image', ogImage, true);

    if (publishedTime) {
      setMeta('article:published_time', publishedTime, true);
    }
    if (author) {
      setMeta('article:author', author, true);
    }

    // 5. Twitter / X Card Meta Tags
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', '@zenvoradigital');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', ogImage);

    // 6. JSON-LD Structured Data Injection
    let scriptEl = document.getElementById('jsonld-schema') as HTMLScriptElement | null;
    if (schema) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'jsonld-schema';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [fullTitle, desc, ogImage, canonicalUrl, type, noindex, publishedTime, author, schema]);

  return null;
}
