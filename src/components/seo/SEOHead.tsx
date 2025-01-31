import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProcessedSEOData } from '../../types/seo';
import { seoService } from '../../services/seo';

interface SEOHeadProps {
  pageIdentifier: string;
  dynamicData?: Record<string, any>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ pageIdentifier, dynamicData }) => {
  const [seoData, setSeoData] = useState<ProcessedSEOData | null>(null);

  useEffect(() => {
    const loadSEOData = async () => {
      const processed = await seoService.processSEOData(pageIdentifier, dynamicData);
      if (processed) {
        setSeoData(processed);
      }
    };

    loadSEOData();
  }, [pageIdentifier, dynamicData]);

  if (!seoData) return null;

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      {seoData.robots && <meta name="robots" content={seoData.robots} />}
      
      {/* Canonical URL */}
      {seoData.canonicalUrl && <link rel="canonical" href={seoData.canonicalUrl} />}
      
      {/* OpenGraph Tags */}
      {seoData.ogTitle && <meta property="og:title" content={seoData.ogTitle} />}
      {seoData.ogDescription && (
        <meta property="og:description" content={seoData.ogDescription} />
      )}
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
      <meta property="og:type" content="article" />
      {seoData.canonicalUrl && <meta property="og:url" content={seoData.canonicalUrl} />}
      
      {/* Structured Data */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {seoData.structuredData}
        </script>
      )}
    </Helmet>
  );
};
