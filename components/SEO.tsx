
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url, type = 'website' }) => {
  const siteTitle = "Galagon | Туры в Северную Осетию, Восхождение на Казбек, Походы";
  const defaultDescription = "Клуб путешествий Галагон. Организация походов, джип-туры и экскурсии по Северной Осетии. Безопасное восхождение на Казбек, треккинг в Дигории, услуги портера и гидов.";
  const defaultImage = "https://galagon.ru/images/kazbek/main.webp"; 
  const siteUrl = "https://galagon.ru";
  
  // Construct absolute URL safely
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const finalTitle = title ? `${title} | Галагон (Galagon)` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : defaultImage;

  // --- SCHEMA.ORG JSON-LD GENERATOR ---
  const schemaOrgJSON = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        "@id": "https://galagon.ru/#organization",
        "name": "Galagon Travel Club",
        "alternateName": ["Галагон", "Galagon", "Клуб путешествий Галагон"],
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logo.png`, // Ensure you have a logo file or use a main image
          "width": 112,
          "height": 112
        },
        "image": finalImage,
        "description": defaultDescription,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Владикавказ",
          "addressRegion": "Северная Осетия - Алания",
          "addressCountry": "RU"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "43.0241", // Vladikavkaz coords approx
          "longitude": "44.6904"
        },
        "telephone": "+7-996-941-71-43",
        "email": "tour_club365@mail.ru",
        "priceRange": "$$",
        "sameAs": [
          "https://www.instagram.com/dankevich__adventure",
          "https://t.me/Galagon_support_bot",
          "https://vk.com/roma155",
          "https://rutube.ru/channel/69171706/"
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://galagon.ru/#website",
        "url": siteUrl,
        "name": "Galagon Travel",
        "publisher": {
          "@id": "https://galagon.ru/#organization"
        },
        "inLanguage": "ru-RU"
      },
      // PRODUCT SCHEMA FOR KAZBEK (High Priority for Rich Snippets)
      {
        "@type": "Product",
        "name": "Восхождение на Казбек (5033м)",
        "image": `${siteUrl}/images/kazbek/main.webp`,
        "description": "Безопасное восхождение на Казбек с севера (из России) с профессиональными гидами. Акклиматизация, горячие источники Кармадона, питание и снаряжение.",
        "brand": {
          "@id": "https://galagon.ru/#organization"
        },
        "offers": {
          "@type": "Offer",
          "url": `${siteUrl}/#tour-kazbek`,
          "priceCurrency": "RUB",
          "price": "55000",
          "priceValidUntil": "2026-12-31",
          "availability": "https://schema.org/InStock",
          "itemCondition": "https://schema.org/NewCondition"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "128",
          "bestRating": "5",
          "worstRating": "1"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* --- Standard Meta Tags --- */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {/* Expanded Keywords based on request */}
      <meta name="keywords" content="Галагон, Galagon, походы, восхождения, туры, экскурсии, портер, восхождение на Казбек, туры в Северную Осетию, треккинг Кавказ, экскурсии Владикавказ, гиды Осетия, джип туры" />
      <link rel="canonical" href={currentUrl} />
      <meta name="author" content="Galagon Travel Team" />
      <meta name="robots" content="index, follow, max-image-preview:large" />

      {/* --- Open Graph (Facebook/LinkedIn/WhatsApp) --- */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:site_name" content="Galagon Travel" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={currentUrl} />

      {/* --- Twitter Cards --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />

      {/* --- JSON-LD Structured Data --- */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSON)}
      </script>
    </Helmet>
  );
};

export default SEO;
