import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
  const fullTitle = title
    ? `${title} | Zenvora Digital`
    : 'Zenvora Digital – Digital Product & Software Studio';
  const desc =
    description ||
    'Zenvora Digital builds modern websites, web applications, SaaS products, e-commerce platforms and AI-powered solutions for businesses, startups and founders.';

  useEffect(() => {
    document.title = fullTitle;

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

    setMeta('description', desc);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', desc, true);
    setMeta('og:type', 'website', true);
    if (url) setMeta('og:url', url, true);
    if (image) setMeta('og:image', image, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
  }, [fullTitle, desc, image, url]);

  return null;
}
