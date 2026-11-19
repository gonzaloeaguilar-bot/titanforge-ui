/**
 * Public GA4 measurement ID shared by both the Next runtime and the static
 * route generator. The ID is intentionally public: it is served in the
 * Google tag on every page. Keeping the fallback here prevents the static
 * generator from silently emitting a different (or blank) bridge config.
 */
export const FALLBACK_GA_MEASUREMENT_ID = 'G-JQP049J2YR';

export function gaMeasurementId(environment = process.env) {
  const names = [
    'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    'NEXT_PUBLIC_GA4_ID',
    'NEXT_PUBLIC_GOOGLE_TAG_ID',
    'TITAN_GA4_ID',
    'TITAN_GOOGLE_TAG_ID',
  ];
  for (const name of names) {
    const value = environment[name];
    if (typeof value === 'string' && value.trim()) return value.trim();
  }
  return FALLBACK_GA_MEASUREMENT_ID;
}
