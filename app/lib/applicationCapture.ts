/** Application metadata is untrusted. There is no consent store on this site. */
export const APPLICATION_SOURCE_HOSTNAME = "titanforgefit.com";
export const APPLICATION_FORM_VERSION = "scholarship-2026-09-05";
export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export type CaptureInput = Record<string, unknown>;
export const isTestApplication = (email: string) => /^launch-test\+/i.test(email.trim());
const identifier = (value: unknown, max = 120): string | null =>
  typeof value === "string" && value.length <= max && /^[a-zA-Z0-9][a-zA-Z0-9_. -]*$/.test(value) ? value : null;
export function normalizeGaId(value: unknown, field: "client_id" | "session_id") {
  const text = typeof value === "string" || typeof value === "number" ? String(value) : "";
  return (field === "client_id" ? /^\d{1,20}\.\d{1,20}$/ : /^[1-9]\d{0,15}$/).test(text)
    && (field !== "session_id" || Number.isSafeInteger(Number(text))) ? text : null;
}
export function acquisitionPayload(input: CaptureInput) {
  const values = ["Source", "Medium", "Campaign", "Content"].map(key => identifier(input[`utm${key}`]));
  // A referrer only supplies attribution when there are no actual UTM values.
  if (!values.some(Boolean) && typeof input.referrer === "string" && input.referrer.length <= 2048) {
    try {
      const url = new URL(input.referrer);
      const hostname = url.hostname.replace(/\.$/, "");
      if (["https:", "http:"].includes(url.protocol) && !url.username && !url.password &&
          hostname !== APPLICATION_SOURCE_HOSTNAME && !hostname.endsWith(`.${APPLICATION_SOURCE_HOSTNAME}`)) {
        values[0] = hostname; values[1] = "referral";
      }
    } catch { /* Missing or invalid referrer stays unknown. */ }
  }
  return Object.fromEntries(["source", "medium", "campaign", "content"].map((key, i) => [`current_utm_${key}`, values[i]]));
}
export function applicationCapturePayload(raw: unknown, partial = false) {
  const input: CaptureInput = raw && typeof raw === "object" && !Array.isArray(raw) ? raw as CaptureInput : {};
  const denied = input.analyticsConsent === "denied";
  // PATCH keeps the creation attribution, even when completion arrives elsewhere.
  if (partial) return denied ? { analytics_consent: "denied", ga_client_id: null, ga_session_id: null } : {};
  const entrySource = input.entrySource === "qualified_content" ? "qualified_content" : null;
  return {
    source_hostname: APPLICATION_SOURCE_HOSTNAME,
    form_version: APPLICATION_FORM_VERSION,
    analytics_consent: denied ? "denied" : "unknown",
    ga_client_id: denied ? null : normalizeGaId(input.gaClientId, "client_id"),
    ga_session_id: denied ? null : normalizeGaId(input.gaSessionId, "session_id"),
    entry_source: entrySource,
    entry_content: entrySource ? identifier(input.entryContent) : null,
    bridge_version: entrySource ? identifier(input.bridgeVersion, 64) : null,
    ...acquisitionPayload(input),
  };
}
export type GaGet = (command: "get", target: string, field: "client_id" | "session_id", callback: (value: unknown) => void) => void;
export async function readGaIdentity(gtag: GaGet | undefined, target: string, consent: unknown = "unknown") {
  const read = (field: "client_id" | "session_id"): Promise<string | null> => {
    if (consent === "denied" || !gtag || !target) return Promise.resolve(null);
    return new Promise(resolve => {
      const timer = setTimeout(() => resolve(null), 200);
      try {
        gtag("get", target, field, value => { clearTimeout(timer); resolve(normalizeGaId(value, field)); });
      } catch { clearTimeout(timer); resolve(null); }
    });
  };
  const [gaClientId, gaSessionId] = await Promise.all([read("client_id"), read("session_id")]);
  return { gaClientId, gaSessionId };
}
export function browserAcquisition(search: string, referrer: string): CaptureInput {
  const params = new URLSearchParams(search);
  return {
    utmSource: params.get("utm_source"), utmMedium: params.get("utm_medium"),
    utmCampaign: params.get("utm_campaign"), utmContent: params.get("utm_content"), referrer,
    entrySource: params.get("entry_source"), entryContent: params.get("entry_content"), bridgeVersion: params.get("bridge_version"),
    analyticsConsent: "unknown",
  };
}
/** Success and conversions both require the server's saved-row receipt. */
export function isCompletionReceipt(receipt: unknown): receipt is { applicationId: string; completionEventId: string; isTest?: boolean } {
  if (!receipt || typeof receipt !== "object") return false;
  const value = receipt as Record<string, unknown>;
  return typeof value.applicationId === "string" && UUID_RE.test(value.applicationId) &&
    value.completionEventId === `scholarship-completed:${value.applicationId}`;
}
/** Only the server receipt may supply the conversion identity. */
export function completionParameters(receipt: unknown, email: string) {
  if (!isCompletionReceipt(receipt) || isTestApplication(email) || receipt.isTest === true) return null;
  return { application_id: receipt.applicationId, event_id: receipt.completionEventId };
}

/**
 * Optional "email me training updates" box on step 2. Only a literal boolean true
 * counts as consent, the box is never pre-ticked, and the exact wording shown is
 * stored with it. Both calls (draft at step 2, final at step 3) write the same
 * fields so the stored value is whatever the box said when the form was submitted.
 */
export const EMAIL_MARKETING_CONSENT_TEXT = "Email me training updates from Titan Forge. Unsubscribe any time.";
export const MARKETING_CONSENT_SOURCE = "coaching-intensive-step-2";
export function emailMarketingConsentPayload(optIn: unknown, now: string) {
  const yes = optIn === true;
  return {
    email_marketing_consent: yes,
    email_marketing_consent_text: yes ? EMAIL_MARKETING_CONSENT_TEXT : null,
    marketing_consent_at: yes ? now : null,
    marketing_consent_source: yes ? MARKETING_CONSENT_SOURCE : null,
  };
}
