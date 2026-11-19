/* The gym as a place: one HealthClub/LocalBusiness node, shared by both JSON-LD
   generators (titanSeo for the served Next routes, staticRouteContent for the
   committed shells) so the two cannot drift.

   Name, address, phone and hours match the Google Business Profile exactly, as
   recorded in the NAP table of titanforge-directory-listings-pack-2026-10-12
   (GBP owner read 2026-10-07). No suite: Google omits it, and the suite question
   is Steve's to answer. No rating or review markup: self-served review schema
   is not eligible, and the count lives in visible copy only. */

export const LOCAL_BUSINESS_ROUTES = new Set(['/', '/for/personal-training-englewood-centennial']);

export const GBP_URL = 'https://www.google.com/search?kgmid=/g/11m6cd7w45&hl=en-US&q=Titan+Forge+Fitness,+Corp.&shndl=30&source=sh/x/loc/osrp/m5/1';

export const GYM_HOURS = [
  { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '05:00', closes: '21:00' },
  { days: ['Saturday'], opens: '07:00', closes: '16:00' },
  { days: ['Sunday'], opens: '08:00', closes: '15:00' },
];

export const GYM_HOURS_TEXT = 'Monday to Friday 5 AM to 9 PM, Saturday 7 AM to 4 PM, and Sunday 8 AM to 3 PM';

export function localBusinessNode(origin) {
  return {
    '@type': ['HealthClub', 'LocalBusiness'],
    '@id': `${origin}/#gym`,
    name: 'Titan Forge Fitness, Corp.',
    alternateName: ['Titan Forge Fitness', 'Titan Forge Fit'],
    url: `${origin}/`,
    telephone: '+1-720-916-7235',
    email: 'Doc@titanforgefit.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '9780 S Meridian Blvd',
      addressLocality: 'Englewood',
      addressRegion: 'CO',
      postalCode: '80112',
      addressCountry: 'US',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 39.5408, longitude: -104.8556 },
    // US Census geocoder, read 2026-10-13: Meridian CDP, Douglas County.
    containedInPlace: { '@type': 'Place', name: 'Meridian, Douglas County, Colorado' },
    hasMap: GBP_URL,
    sameAs: [GBP_URL],
    openingHoursSpecification: GYM_HOURS.map(({ days, opens, closes }) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: days.map((d) => `https://schema.org/${d}`),
      opens,
      closes,
    })),
    image: `${origin}/assets/images/site-unnamed-6.jpg`,
    description: 'Personal training gym at 9780 S Meridian Blvd in Meridian, Douglas County, south of Inverness and east of Lone Tree, led by Steve "Doc" Ginevan, PhD.',
    // GBP service areas, exactly as listed on the profile.
    areaServed: ['Englewood', 'Centennial', 'Parker'].map((name) => ({
      '@type': 'City',
      name,
      containedInPlace: { '@type': 'State', name: 'Colorado' },
    })),
    parentOrganization: { '@id': `${origin}/#organization` },
    employee: { '@id': `${origin}/#founder` },
  };
}
