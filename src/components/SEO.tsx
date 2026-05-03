"use client";

import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

const SEO = ({ title, description, keywords, canonical }: SEOProps) => {
  useEffect(() => {
    // Update Title
    document.title = `${title} | KnowledgeWorld`;

    // Update Description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description || "KnowledgeWorld.in offers world-class education for JEE, NEET, CCC, and State Board exams.");
    }

    // Update Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords || "JEE, NEET, CCC, online learning, education India");
    }

    // Update Canonical
    const linkCanonical = document.querySelector('link[rel="canonical"]');
    if (linkCanonical) {
      linkCanonical.setAttribute('href', canonical || window.location.href);
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;