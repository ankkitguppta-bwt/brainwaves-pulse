// Canonical production origin used for absolute SEO links (canonical tags, sitemaps).
// Lighthouse/SEO crawlers require canonical hrefs to be absolute URLs, not paths.
export const SITE_URL = "https://www.brainwavestech.co.in";

export function canonicalUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
