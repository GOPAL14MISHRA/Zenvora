import fs from 'fs';
import path from 'path';

// Load the compiled index.html
const distDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) {
  console.error('dist directory not found. Run npm run build first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

// Define the static routes and their exact metadata
const routes = [
  {
    path: '/services',
    title: 'Zenvora Digitals | Web Development & Digital Services',
    description: 'Explore Zenvora Digitals services including website development, web applications, e-commerce, UI/UX design, AI integration and backend/API development.'
  },
  {
    path: '/projects',
    title: 'Zenvora Digitals | Web Development Projects & Case Studies',
    description: 'Explore websites, web applications, e-commerce platforms and digital products built by Zenvora Digitals for businesses, startups and growing brands.'
  },
  {
    path: '/pricing',
    title: 'Zenvora Digitals Pricing | Website & Digital Services',
    description: 'Explore Zenvora Digitals pricing for website development, web applications, e-commerce solutions and other digital services.'
  },
  {
    path: '/blog',
    title: 'Zenvora Digitals Blog | Web Development & Digital Growth',
    description: 'Read practical insights about website development, web applications, e-commerce, SEO, SaaS, AI and digital growth for businesses and startups.'
  },
  {
    path: '/about',
    title: 'About Zenvora Digitals | Digital Solutions Company',
    description: 'Learn about Zenvora Digitals, our services, approach and mission to build modern digital solutions for businesses in India and worldwide.'
  },
  {
    path: '/contact',
    title: 'Contact Zenvora Digitals | Start Your Digital Project',
    description: 'Contact Zenvora Digitals to discuss website development, web applications, e-commerce, AI integration or your next digital project.'
  }
];

// Helper to replace SEO tags
function injectSEO(html, route) {
  const url = `https://www.zenvoradigitals.tech${route.path}`;
  
  let result = html;
  
  // Replace title
  result = result.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );
  
  // Replace description
  result = result.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${route.description}" />`
  );
  
  // Replace canonical
  result = result.replace(
    /<link rel="canonical" href=".*?" \/>/,
    `<link rel="canonical" href="${url}" />`
  );
  
  // Replace og:url
  result = result.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${url}" />`
  );
  
  // Replace og:title
  result = result.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${route.title}" />`
  );
  
  // Replace og:description
  result = result.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${route.description}" />`
  );
  
  // Replace twitter:title
  result = result.replace(
    /<meta name="twitter:title" content=".*?" \/>/,
    `<meta name="twitter:title" content="${route.title}" />`
  );
  
  // Replace twitter:description
  result = result.replace(
    /<meta name="twitter:description" content=".*?" \/>/,
    `<meta name="twitter:description" content="${route.description}" />`
  );
  
  return result;
}

// Generate the files
for (const route of routes) {
  const routeDir = path.join(distDir, route.path.substring(1)); // remove leading slash
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  const html = injectSEO(templateHtml, route);
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
  console.log(`Generated prerendered HTML for ${route.path}`);
}

console.log('Prerendering completed.');
