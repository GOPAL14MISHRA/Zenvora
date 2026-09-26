// ─── SEO & JSON-LD Structured Data Helper ──────────────────────────────────
export const SITE_URL = 'https://zenvora.dev';
export const SITE_NAME = 'Zenvora Digital Studio';
export const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

// 1. Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/favicon.svg`,
      width: '192',
      height: '192',
    },
    description:
      'Zenvora Digital Studio designs and builds web applications, custom websites, e-commerce platforms, UI/UX, AI solutions, and digital software for modern businesses.',
    email: 'mishragopal532a20@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://github.com/zenvoradigital',
      'https://linkedin.com/company/zenvoradigital',
      'https://www.instagram.com/zenvora_digitals_web/',
      'https://x.com/zenvoradigital',
    ],
  };
}

// 2. WebSite Schema
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  };
}

// 3. BreadcrumbList Schema
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// 4. Article Schema (Blog Posts)
export function getArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  publishedAt: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || DEFAULT_OG_IMAGE,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
  };
}

// 5. Service Schema
export function getServiceSchema(service: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    description: service.description,
    url: `${SITE_URL}/services/${service.slug}`,
  };
}

// 6. CreativeWork / SoftwareApplication Schema (Projects)
export function getProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  category: string;
  liveUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    applicationCategory: project.category,
    operatingSystem: 'Web',
    description: project.description,
    image: project.image || DEFAULT_OG_IMAGE,
    url: project.liveUrl || `${SITE_URL}/projects/${project.slug}`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}
