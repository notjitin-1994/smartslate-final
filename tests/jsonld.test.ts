import { describe, it, expect } from 'vitest';
import { getOrganizationJsonLd, getWebsiteJsonLd } from '@/components/seo/jsonld';

describe('JSON-LD builders', () => {
  it('builds Organization schema correctly', () => {
    const org = getOrganizationJsonLd();
    expect(org['@context']).toBe('https://schema.org');
    expect(org['@type']).toBe('Organization');
    expect(org.name).toBe('Smartslate');
    expect(org.url).toBe('https://smartslate.io');
    expect(org.logo).toContain('logo');
  });

  it('builds WebSite schema correctly', () => {
    const site = getWebsiteJsonLd();
    expect(site['@context']).toBe('https://schema.org');
    expect(site['@type']).toBe('WebSite');
    expect(site.name).toBe('Smartslate');
    expect(site.url).toBe('https://smartslate.io');
  });
});


