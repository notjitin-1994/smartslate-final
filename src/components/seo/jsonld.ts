export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Smartslate",
    url: "https://smartslate.io",
    logo: "https://smartslate.io/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/smartslate",
      "https://twitter.com/smartslate",
    ],
  } as const;
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Smartslate",
    url: "https://smartslate.io",
  } as const;
}


