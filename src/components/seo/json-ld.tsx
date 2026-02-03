export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Anthony Hasrouny Web Development',
    description: 'Fast, affordable web development. Premium websites starting at $150, delivered in 72 hours.',
    url: 'https://anthonyhasrouny.com',
    priceRange: '$150 - $500+',
    serviceType: 'Web Development',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Web Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Starter Site',
            description: 'One-page website, mobile-ready, delivered in 72h',
          },
          price: '150',
          priceCurrency: 'USD',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Site',
            description: 'Multi-page website with contact form and basic SEO',
          },
          price: '300',
          priceCurrency: 'USD',
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

