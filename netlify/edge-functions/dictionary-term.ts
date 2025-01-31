import { Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  // Get the term slug from the URL
  const url = new URL(request.url);
  const path = url.pathname;
  const slug = path.split('/slownik-erp/')[1]?.replace(/\/$/, '');

  if (!slug) {
    return;
  }

  // Fetch the term data from your API
  const termResponse = await fetch(`${url.origin}/api/dictionary/term/${slug}`);
  if (!termResponse.ok) {
    return;
  }

  const term = await termResponse.json();
  
  // Get the HTML template
  const templateResponse = await fetch(`${url.origin}/dictionary-term.html`);
  if (!templateResponse.ok) {
    return;
  }

  let html = await templateResponse.text();

  // Replace placeholders with actual content
  const plainTextDefinition = term.explanation.replace(/<[^>]+>/g, '');
  
  const replacements = {
    '{Term Name}': term.term,
    '{Term Definition}': plainTextDefinition,
    '{term-slug}': slug
  };

  // Replace all placeholders
  Object.entries(replacements).forEach(([placeholder, value]) => {
    html = html.replace(new RegExp(placeholder, 'g'), value);
  });

  // Return the modified HTML
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'x-robots-tag': 'index,follow'
    }
  });
}
