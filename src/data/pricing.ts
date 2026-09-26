/**
 * CENTRAL CONFIGURABLE PRICING CONFIGURATION
 * 
 * IMPORTANT PRICING RULE:
 * Do NOT hard-code prices in multiple components.
 * Final prices can be updated here without modifying any UI components.
 * Configurable placeholder values allow easy pricing adjustments.
 */

export interface PricingPackage {
  id: string;
  name: string;
  badge?: string;
  target: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  highlighted: boolean;
}

export interface PricingConfig {
  starterPrice: string;
  businessPrice: string;
  customPrice: string;
  packages: PricingPackage[];
}

// Configurable pricing placeholders - modify prices here to update across all UI
export const starterPrice = '₹3,000 – ₹4,000';
export const businessPrice = '₹8,000 – ₹9,000';
export const customPrice = "Let's Discuss";

export const pricingConfig: PricingConfig = {
  starterPrice,
  businessPrice,
  customPrice,

  packages: [
    {
      id: 'starter',
      name: 'STARTER WEBSITE (STATIC)',
      target: 'For static / normal business websites and landing pages.',
      price: starterPrice,
      priceSubtext: 'Starting range',
      features: [
        'Up to 5 pages',
        'Responsive design',
        'Contact form',
        'WhatsApp integration',
        'Basic SEO setup',
        'Deployment',
        '1 revision round',
      ],
      ctaText: 'Get Started →',
      ctaLink: '/contact?package=starter',
      highlighted: false,
    },
    {
      id: 'business',
      name: 'BUSINESS WEBSITE (DYNAMIC)',
      badge: 'MOST POPULAR',
      target: 'For dynamic websites with custom UI, forms & integrations.',
      price: businessPrice,
      priceSubtext: 'Starting range',
      features: [
        'Up to 8–10 pages',
        'Custom UI & Animations',
        'Dynamic Content / CMS',
        'Contact & Lead forms',
        'WhatsApp integration',
        'SEO setup & Analytics',
        'Deployment',
        'Multiple revision rounds',
      ],
      ctaText: 'Start Your Project →',
      ctaLink: '/contact?package=business',
      highlighted: true,
    },
    {
      id: 'custom',
      name: 'CUSTOM WEB APPLICATION',
      target: 'For startups and businesses needing custom digital products.',
      price: customPrice,
      priceSubtext: 'Scope based',
      features: [
        'Custom UI/UX',
        'Frontend development',
        'Backend/API',
        'Authentication',
        'Database',
        'Admin dashboard',
        'Third-party integrations',
        'Deployment',
        'Post-launch support',
      ],
      ctaText: 'Request A Quote →',
      ctaLink: '/contact?package=custom',
      highlighted: false,
    },
  ],
};
