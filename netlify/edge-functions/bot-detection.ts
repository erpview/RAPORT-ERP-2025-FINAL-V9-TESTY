import { Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|preview/i.test(userAgent);

  // If it's a bot and requesting a dictionary page, serve the SEO version
  if (isBot && url.pathname.startsWith('/slownik-erp')) {
    const seoPath = url.pathname === '/slownik-erp' 
      ? '/seo/slownik-erp/index.html'
      : `/seo${url.pathname}/index.html`;
    
    return await context.rewrite(seoPath);
  }

  // For all other cases, serve the SPA
  return await context.rewrite('/index.html');
}
