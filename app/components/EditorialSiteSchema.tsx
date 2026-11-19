import { getRouteMeta, jsonLdForRoute } from '../lib/titanSeo';

// Editorial routes share the same business identity as the main site. Keep
// article/FAQ schema with each article, and avoid inventing a second identity.
export default function EditorialSiteSchema() {
  const source = jsonLdForRoute(getRouteMeta('/')!);
  const graph = source['@graph'].filter((node) =>
    node['@type'] === 'Organization' || node['@type'] === 'WebSite',
  );
  return <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
  }} />;
}
