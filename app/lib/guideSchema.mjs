/* Schema a guide adds on top of the generic Article node: the sources it cites,
   and a SoftwareApplication node when the page is a tool.

   Production renders pages through the Next route (app/[[...slug]]) and builds
   JSON-LD with titanSeo.jsonLdForRoute, while the static generator builds it in
   staticRouteContent.mjs. Both call this one function, so a source list or a tool
   cannot show up in one surface and be missing from the other (it did on the first
   deploy of the DTC pages: the static files had citations, production had none). */
import { GUIDES } from './guideContent.mjs';

export function guideSchemaFor(route, url, origin) {
  const guide = GUIDES[route];
  if (!guide) return { citation: null, nodes: [] };
  const citation = guide.sources && guide.sources.length
    ? guide.sources.map(([label, href]) => ({ '@type': 'CreativeWork', name: label, url: href }))
    : null;
  const nodes = [];
  if (guide.tool) {
    nodes.push({
      '@type': 'SoftwareApplication',
      '@id': `${url}#tool`,
      name: guide.title,
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Any web browser',
      url,
      description: guide.description,
      inLanguage: 'en-US',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': `${origin}/#organization` },
      dateModified: guide.updated,
    });
  }
  return { citation, nodes };
}
