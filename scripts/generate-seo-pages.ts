import { supabase } from '../src/config/supabase';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  robots?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  structuredData?: any;
  content?: string;
}

async function generateHtmlFile(outputPath: string, seoData: SEOData) {
  const html = `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="format-detection" content="telephone=no">
  <meta name="HandheldFriendly" content="true">
  <meta name="MobileOptimized" content="width">
  
  <!-- Icons -->
  <link rel="icon" href="https://erp-view.pl/images/icony/favicon.png" />
  <link rel="shortcut icon" href="https://erp-view.pl/images/icony/favicon.png" />
  <link rel="apple-touch-icon" href="https://erp-view.pl/images/icony/icon-192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="https://erp-view.pl/images/icony/icon-192.png" />
  <link rel="icon" sizes="192x192" href="https://erp-view.pl/images/icony/icon-192.png" />
  <link rel="icon" sizes="512x512" href="https://erp-view.pl/images/icony/icon-512.png" />
  
  <title>${seoData.title}</title>
  <meta name="description" content="${seoData.description}">
  ${seoData.keywords ? `<meta name="keywords" content="${seoData.keywords}">` : ''}
  ${seoData.robots ? `<meta name="robots" content="${seoData.robots}">` : ''}
  ${seoData.canonicalUrl ? `<link rel="canonical" href="${seoData.canonicalUrl}">` : ''}
  
  <!-- OpenGraph Tags -->
  <meta property="og:title" content="${seoData.ogTitle || seoData.title}">
  <meta property="og:description" content="${seoData.ogDescription || seoData.description}">
  ${seoData.ogImage ? `<meta property="og:image" content="${seoData.ogImage}">` : ''}
  <meta property="og:type" content="article">
  <meta property="og:locale" content="pl_PL">
  <meta property="og:site_name" content="ERP-VIEW.PL">
  ${seoData.canonicalUrl ? `<meta property="og:url" content="${seoData.canonicalUrl}">` : ''}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${seoData.ogTitle || seoData.title}">
  <meta name="twitter:description" content="${seoData.ogDescription || seoData.description}">
  ${seoData.ogImage ? `<meta name="twitter:image" content="${seoData.ogImage}">` : ''}
  
  <!-- Structured Data -->
  ${seoData.structuredData ? `<script type="application/ld+json">
    ${JSON.stringify(seoData.structuredData, null, 2)}
  </script>` : ''}
  
  <link rel="stylesheet" crossorigin href="/assets/css/style-CBZhq_I6.css">
</head>
<body>
  <div id="seo-content">
    ${seoData.content || ''}
  </div>
  <!-- This is a SEO-only page -->
</body>
</html>`;

  const outputDir = path.dirname(outputPath);
  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, html);
  console.log(`Generated SEO page: ${outputPath}`);
}

async function generateHomePage() {
  const seoData = {
    title: 'Raport ERP - Kompleksowy przewodnik po systemach ERP',
    description: 'Poznaj najnowszy raport o systemach ERP w Polsce. Sprawdź ranking, porównaj ceny i funkcjonalności wiodących systemów ERP.',
    keywords: 'erp, system erp, zarządzanie przedsiębiorstwem, oprogramowanie dla firm, raport erp, ranking erp',
    robots: 'index, follow',
    canonicalUrl: 'https://www.raport-erp.pl',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://www.raport-erp.pl",
      "name": "Raport ERP 2025",
      "description": "Kompleksowy przewodnik po systemach ERP",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.raport-erp.pl/slownik-erp?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ERP-VIEW.PL",
        "url": "https://www.raport-erp.pl"
      },
      "inLanguage": "pl-PL",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0]
    },
    content: `
      <article>
        <h1>Raport ERP - Kompleksowy przewodnik po systemach ERP</h1>
        <div class="home-content">
          <p>Poznaj najnowszy raport o systemach ERP w Polsce. Sprawdź ranking, porównaj ceny i funkcjonalności wiodących systemów ERP.</p>
        </div>
      </article>
    `
  };

  await generateHtmlFile(path.join(__dirname, '../public/seo/index.html'), seoData);
}

async function generateDictionaryPage() {
  const seoData = {
    title: 'Słownik ERP - Definicje i pojęcia systemów ERP | Raport ERP 2025',
    description: 'Kompleksowy słownik terminów i pojęć związanych z systemami ERP. Poznaj znaczenie kluczowych terminów używanych w systemach zarządzania przedsiębiorstwem.',
    keywords: 'słownik erp, definicje erp, pojęcia erp, terminologia erp, system erp definicja',
    robots: 'index, follow',
    canonicalUrl: 'https://www.raport-erp.pl/slownik-erp',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "name": "Słownik ERP",
      "description": "Kompleksowy słownik terminów i pojęć związanych z systemami ERP"
    },
    content: `
      <article>
        <h1>Słownik ERP - Definicje i pojęcia systemów ERP</h1>
        <div class="dictionary-content">
          <p>Kompleksowy słownik terminów i pojęć związanych z systemami ERP. Poznaj znaczenie kluczowych terminów używanych w systemach zarządzania przedsiębiorstwem.</p>
        </div>
      </article>
    `
  };

  await generateHtmlFile(path.join(__dirname, '../public/seo/slownik-erp/index.html'), seoData);
}

async function generateDictionaryTermPages() {
  console.log('Fetching dictionary terms...');
  const { data: terms, error } = await supabase
    .from('slownik_erp')
    .select('*')
    .order('term');

  if (error) {
    console.error('Error fetching dictionary terms:', error);
    return;
  }

  if (!terms || terms.length === 0) {
    console.log('No dictionary terms found');
    return;
  }

  console.log(`Found ${terms.length} dictionary terms`);

  for (const term of terms) {
    const seoData = {
      title: `${term.term} - Definicja w Słowniku ERP | ERP-VIEW.PL`,
      description: term.explanation.replace(/<[^>]*>/g, '').substring(0, 155) + '...',
      keywords: `${term.term}, definicja ${term.term}, ${term.term} erp, znaczenie ${term.term}, system erp ${term.term}`,
      robots: 'index, follow',
      canonicalUrl: `https://www.raport-erp.pl/slownik-erp/${term.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "name": term.term,
        "description": term.explanation,
        "inDefinedTermSet": {
          "@type": "DefinedTermSet",
          "name": "Słownik ERP",
          "url": "https://www.raport-erp.pl/slownik-erp"
        },
        "url": `https://www.raport-erp.pl/slownik-erp/${term.slug}`
      },
      content: `
        <article>
          <h1>${term.term}</h1>
          <div class="term-content">
            ${term.explanation}
          </div>
        </article>
      `
    };

    await generateHtmlFile(path.join(__dirname, `../public/seo/slownik-erp/${term.slug}/index.html`), seoData);
  }
}

async function generatePartnersPage() {
  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .eq('is_main_partner', true);

  const seoData = {
    title: 'Partnerzy ERP - Zaufani dostawcy systemów ERP | Raport ERP 2025',
    description: 'Poznaj naszych zaufanych partnerów dostarczających systemy ERP. Sprawdź oferty, referencje i doświadczenie wiodących firm wdrażających systemy ERP w Polsce.',
    keywords: 'partnerzy erp, dostawcy erp, wdrożeniowcy erp, firmy wdrażające erp, integratorzy systemów erp',
    robots: 'index, follow',
    canonicalUrl: 'https://www.raport-erp.pl/partnerzy',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Partnerzy ERP",
      "description": "Lista zaufanych partnerów dostarczających systemy ERP",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": partners?.map((partner, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Organization",
            "name": partner.name,
            "url": `https://www.raport-erp.pl/partnerzy/${partner.slug}`
          }
        })) || []
      }
    },
    content: `
      <article>
        <h1>Partnerzy ERP - Zaufani dostawcy systemów ERP</h1>
        <div class="partners-content">
          <p>Poznaj naszych zaufanych partnerów dostarczających systemy ERP. Sprawdź oferty, referencje i doświadczenie wiodących firm wdrażających systemy ERP w Polsce.</p>
        </div>
      </article>
    `
  };

  await generateHtmlFile(path.join(__dirname, '../public/seo/partnerzy/index.html'), seoData);
}

async function generatePartnerPages() {
  const { data: partners } = await supabase
    .from('partners')
    .select('*');

  if (!partners) return;

  for (const partner of partners) {
    const seoData = {
      title: `${partner.name} | Partner Raportu ERP by ERP-VIEW.PL`,
      description: `Poznaj ${partner.name} - partnera Raportu ERP przygotowanego przez portal ERP-VIEW.PL. ${partner.description || ''}`,
      keywords: `partner erp, wdrożenie erp, ${partner.name}, systemy erp, implementacja erp`,
      robots: 'index, follow',
      canonicalUrl: `https://www.raport-erp.pl/partnerzy/${partner.slug}`,
      structuredData: {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": partner.name,
        "description": partner.description,
        "url": `https://www.raport-erp.pl/partnerzy/${partner.slug}`,
        "sameAs": [partner.website_url],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "PL"
        },
        "parentOrganization": {
          "@type": "Organization",
          "name": "ERP-VIEW.PL",
          "url": "https://erp-view.pl"
        }
      },
      content: `
        <article>
          <h1>${partner.name}</h1>
          <div class="partner-content">
            <p>${partner.description}</p>
          </div>
        </article>
      `
    };

    await generateHtmlFile(
      path.join(__dirname, `../public/seo/partnerzy/${partner.slug}/index.html`),
      seoData
    );
  }
}

async function generateSystemsPage() {
  const { data: systems } = await supabase
    .from('systems')
    .select('*')
    .eq('status', 'published');

  const seoData = {
    title: 'Systemy ERP w Polsce - Kompleksowy przegląd i porównanie | Raport ERP 2025',
    description: 'Kompleksowy przegląd i porównanie systemów ERP dostępnych na polskim rynku. Poznaj wiodące rozwiązania, ich funkcjonalności i możliwości.',
    keywords: 'systemy erp, porównanie erp, ranking erp, oprogramowanie erp, wdrożenie erp',
    robots: 'index, follow',
    canonicalUrl: 'https://www.raport-erp.pl/systemy-erp',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Systemy ERP w Polsce",
      "description": "Kompleksowy przegląd i porównanie systemów ERP dostępnych na polskim rynku",
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": systems?.map((system, index) => ({
          "@type": "SoftwareApplication",
          "name": system.name,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "All",
          "position": index + 1
        })) || []
      }
    },
    content: `
      <article>
        <h1>Systemy ERP w Polsce - Kompleksowy przegląd i porównanie</h1>
        <div class="systems-content">
          <p>Kompleksowy przegląd i porównanie systemów ERP dostępnych na polskim rynku. Poznaj wiodące rozwiązania, ich funkcjonalności i możliwości.</p>
        </div>
      </article>
    `
  };

  await generateHtmlFile(path.join(__dirname, '../public/seo/systemy-erp/index.html'), seoData);
}

async function generateCostPage() {
  const seoData = {
    title: 'Ile kosztuje wdrożenie ERP? Kompleksowy przewodnik po kosztach wdrożenia ERP | Kalkulator ERP',
    description: 'Sprawdź, ile kosztuje wdrożenie systemu ERP. Poznaj wszystkie składniki kosztów, porównaj modele wdrożenia i dowiedz się, jak zaplanować budżet na system ERP.',
    keywords: 'koszt erp, wdrożenie erp cena, ile kosztuje erp, koszty systemu erp, budżet erp',
    robots: 'index, follow',
    canonicalUrl: 'https://www.raport-erp.pl/koszt-wdrozenia-erp',
    ogTitle: 'Ile kosztuje wdrożenie ERP? Kompleksowy przewodnik po kosztach wdrożenia ERP | Kalkulator ERP',
    ogDescription: 'Sprawdź, ile kosztuje wdrożenie systemu ERP. Poznaj wszystkie składniki kosztów i dowiedz się, jak zaplanować budżet.',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Ile kosztuje wdrożenie systemu ERP?",
      "description": "Kompleksowy przewodnik po kosztach wdrożenia systemu ERP",
      "author": {
        "@type": "Organization",
        "name": "ERP-VIEW.PL"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ERP-VIEW.PL",
        "url": "https://www.raport-erp.pl"
      },
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString().split('T')[0],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.raport-erp.pl/koszt-wdrozenia-erp"
      }
    },
    content: `
      <article>
        <h1>Ile kosztuje wdrożenie ERP? Kompleksowy przewodnik po kosztach wdrożenia ERP</h1>
        <div class="cost-content">
          <p>Sprawdź, ile kosztuje wdrożenie systemu ERP. Poznaj wszystkie składniki kosztów, porównaj modele wdrożenia i dowiedz się, jak zaplanować budżet na system ERP.</p>
        </div>
      </article>
    `
  };

  await generateHtmlFile(path.join(__dirname, '../public/seo/koszt-wdrozenia-erp/index.html'), seoData);
}

async function main() {
  try {
    console.log('Starting SEO pages generation...');
    
    // Generate static pages
    await generateHomePage();
    await generateDictionaryPage();
    await generateDictionaryTermPages();
    await generatePartnersPage();
    await generatePartnerPages();
    await generateSystemsPage();
    await generateCostPage();
    
    console.log('SEO pages generation completed successfully!');
  } catch (error) {
    console.error('Error generating SEO pages:', error);
    process.exit(1);
  }
}

main();
