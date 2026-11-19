type ScholarshipEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Campaign events intentionally exclude applicant PII. In GA4 use
 * `scholarship_application_submitted` / `generate_lead` as the key event.
 */
export function trackScholarshipEvent(name: string, params: ScholarshipEventParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, {
    campaign_name: "september_2026_coaching_scholarship",
    page_path: window.location.pathname,
    ...params,
  });
}
