import { applicationContext, isExcludedApplication } from "./applicationIdentity.ts";
import { geoFromPhone } from "./applicantGeo.ts";

export type ScholarshipRow = {
  id: string;
  created_at: string;
  updated_at?: string | null;
  completed_at?: string | null;
  last_completed_step?: number | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  goal?: string | null;
  consistency?: string | null;
  monthly_investment?: string | null;
  context?: string | Record<string, unknown> | null;
  booking_status?: string | null;
  is_test?: boolean | null;
  test_run_id?: string | null;
  submission_mode?: string | null;
};

const contextOf = (value: ScholarshipRow["context"]): Record<string, any> => applicationContext(value);

function identity(row: ScholarshipRow) {
  return row.email?.trim().toLowerCase() || row.id;
}

export function buildScholarshipReport(rows: ScholarshipRow[], now = new Date(), configuredEmails = '') {
  const external = rows.filter((row) => !isExcludedApplication(row, configuredEmails));
  const groups = new Map<string, ScholarshipRow[]>();
  for (const row of external) groups.set(identity(row), [...(groups.get(identity(row)) || []), row]);

  const applications = [...groups.values()].map((items) => {
    const ordered = [...items].sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at));
    const ranked = [...items].sort((a, b) =>
      Number(Number(b.last_completed_step) >= 3 && contextOf(b.context).draft !== true) - Number(Number(a.last_completed_step) >= 3 && contextOf(a.context).draft !== true) ||
      Number(b.last_completed_step || 0) - Number(a.last_completed_step || 0) ||
      Date.parse(b.updated_at || b.created_at) - Date.parse(a.updated_at || a.created_at)
    );
    const terminal = { ...ranked[0] };
    for (const field of ['name', 'email', 'phone', 'goal', 'consistency', 'monthly_investment'] as const) {
      terminal[field] = ranked.find(r => typeof r[field] === 'string' && r[field]?.trim())?.[field] || null;
    }
    const ctx = contextOf(terminal.context);
    const geo = ctx.geo || {};
    const phoneGeo = geoFromPhone(terminal.phone);
    const hasPhoneGeo = Boolean(phoneGeo.city || phoneGeo.region || phoneGeo.country);
    const hasConnectionGeo = Boolean(geo.ipCity || geo.ipRegion || geo.ipCountry);
    const hasCompleteConnectionGeo = Boolean(geo.ipCity && geo.ipRegion && geo.ipCountry);
    const usePhoneGeo = hasPhoneGeo && !hasCompleteConnectionGeo;
    const submitted = Number(terminal.last_completed_step || 0) >= 3 && ctx.draft !== true;
    const ageHours = (now.getTime() - Date.parse(ordered[0].created_at)) / 3_600_000;
    const goal = terminal.goal || ctx.goal || null;
    const commitment = terminal.consistency || ctx.commitment || ctx.consistency || null;
    return {
      id: terminal.id,
      name: terminal.name || "",
      email: terminal.email || "",
      phone: terminal.phone || "",
      city: usePhoneGeo ? phoneGeo.city : geo.ipCity || null,
      state: usePhoneGeo ? phoneGeo.region : geo.ipRegion || null,
      country: usePhoneGeo ? phoneGeo.country : geo.ipCountry || null,
      location_source: usePhoneGeo ? "phone number hint" : hasConnectionGeo ? "application connection" : null,
      phone_location_hint: geo.phoneRegion || geo.phoneCountry || null,
      monthly_take_home_income: submitted ? terminal.monthly_investment || null : null,
      goal: goal || null,
      commitment: commitment || null,
      age: ctx.age ?? null,
      training_experience: ctx.trainingExperience ?? null,
      training_pain_points: Array.isArray(ctx.trainingPainPoints) ? ctx.trainingPainPoints : null,
      proof_consents: ctx.proofConsents && typeof ctx.proofConsents === "object" ? ctx.proofConsents : null,
      telegram_opt_in: typeof ctx.telegramOptIn === "boolean" ? ctx.telegramOptIn : null,
      applied_at: ordered[0].created_at,
      status: submitted ? "submitted" : ageHours >= 24 ? "stopped after contact" : "still in progress",
      booking_status: terminal.booking_status || "unbooked",
    };
  }).sort((a, b) => Date.parse(b.applied_at) - Date.parse(a.applied_at));

  const submitted = applications.filter((row) => row.status === "submitted").length;
  const abandoned = applications.filter((row) => row.status === "stopped after contact").length;
  const inProgress = applications.filter((row) => row.status === "still in progress").length;
  const started = applications.length;
  return {
    generated_at: now.toISOString(),
    applications,
    funnel: {
      contact_captured: started,
      submitted,
      stopped_after_contact: abandoned,
      still_in_progress: inProgress,
      completion_rate_pct: started ? Math.round(submitted * 1000 / started) / 10 : null,
      dropoff_rate_pct: started ? Math.round(abandoned * 1000 / started) / 10 : null,
    },
    note: "People are deduplicated by normalized email. A contact is counted as stopped only after 24 hours. Test and internal applications are excluded. When application-location data is missing, city/area, state, and country are conservative phone-number hints and may not match the person's current residence.",
  };
}
