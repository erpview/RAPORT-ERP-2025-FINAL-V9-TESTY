import { writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Get current directory name
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// Create _redirects file content
const redirects = `
# SEO redirects
/slownik-erp    /seo/slownik-erp/index.html    200!    Cookie=__prerender_bypass
/slownik-erp/*  /seo/slownik-erp/:splat/index.html    200!    Cookie=__prerender_bypass

# Handle all other routes with SPA
/*    /index.html   200
`;

// Write to _redirects file in dist
writeFileSync(join(__dirname, 'dist', '_redirects'), redirects.trim());
console.log('Created _redirects file');
