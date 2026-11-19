import { applicationContext, isExcludedApplication, safeText } from './applicationIdentity.ts';

export type CoachingRow = {
  id: string; created_at: string; updated_at?: string | null; started_at?: string | null;
  completed_at?: string | null; last_completed_step?: number | null;
  name?: string | null; email?: string | null; phone?: string | null; ig_handle?: string | null;
  goal?: string | null; consistency?: string | null; monthly_investment?: string | null;
  ready_to_commit?: string | null; context?: unknown; status?: string | null;
  booking_status?: string | null; booked_at?: string | null; booking_scheduled_at?: string | null;
  source_path?: string | null; landing_path?: string | null; utm_source?: string | null;
  utm_medium?: string | null; utm_campaign?: string | null;
  is_test?: boolean | null; test_run_id?: string | null; submission_mode?: string | null;
};
// The apply form is embedded on the homepage hero, resources, blog and tools
// pages, not only /apply. Keying on source_path dropped a real qualified lead
// (2026-09-25, homepage hero via Instagram). Everything that is not a
// scholarship application is a coaching application.
const LABOR_DAY = /^\/labor-day(?:[/?]|$)/;
export function isCoachingApplication(row: CoachingRow) {
  return !/scholarship/i.test(row.utm_medium || '') &&
    !LABOR_DAY.test(row.source_path || '') && !LABOR_DAY.test(row.landing_path || '');
}
export function completionState(row: CoachingRow): 'submitted' | 'incomplete' | 'unknown' {
  const ctx = applicationContext(row.context);
  if (ctx.draft === true || row.status === 'partial' || row.status === 'draft') return 'incomplete';
  if (row.last_completed_step != null) return row.last_completed_step >= 3 ? 'submitted' : 'incomplete';
  // Before progressive saving, the table accepted only these final statuses.
  if (!row.started_at && ['qualified', 'downsell'].includes(row.status || '')) return 'submitted';
  return 'unknown';
}
function timestamp(value: unknown) {
  const n = typeof value === 'string' ? Date.parse(value) : NaN;
  return Number.isFinite(n) ? n : 0;
}
export function applicationMonth(value: string | null) {
  if (!timestamp(value)) return null;
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit' }).formatToParts(new Date(value!));
  return `${parts.find(p => p.type === 'year')!.value}-${parts.find(p => p.type === 'month')!.value}`;
}
const labels: Record<string, string> = {
  fat_loss: 'Fat loss', muscle_gain: 'Muscle gain', mobility: 'Mobility', performance: 'Performance', confidence: 'Confidence',
  never: 'Barely / never', occasional: 'Occasionally', mostly: 'Mostly consistent', always: 'Dialed in already',
  yes: 'Yes', no: 'No', talk_it_through: 'Talk it through',
};
function readable(value: unknown) {
  const s = safeText(value);
  return s && Object.hasOwn(labels, s) ? labels[s] : s;
}
export function nextStepAnswer(value: unknown) {
  const s = safeText(value);
  const next: Record<string, string> = { '500_plus': 'Talk with Kris about 1:1 coaching', '300_500': 'See if a lighter coaching option fits', lower_cost_first: 'Start with a lower-cost option', not_sure_value_clear: 'Not sure yet' };
  const budget: Record<string, string> = { '0_100': '$0–$100', '100_200': '$100–$200', '200_500': '$200–$500', '500_1k': '$500–$1,000', '1k_plus': '$1,000+' };
  if (s && Object.hasOwn(next, s)) return { label: 'Selected next step (from saved choice)', value: next[s] };
  if (s && Object.hasOwn(budget, s)) return { label: 'Historic monthly budget range', value: budget[s] };
  return { label: 'Next step / historic budget answer', value: s };
}
export function buildCoachingReport(rows: CoachingRow[], configuredEmails = '', now = new Date()) {
  const groups = new Map<string, CoachingRow[]>();
  for (const row of rows) {
    if (!isCoachingApplication(row) || isExcludedApplication(row, configuredEmails)) continue;
    const key = safeText(row.email)?.toLowerCase() || row.id;
    groups.set(key, [...(groups.get(key) || []), row]);
  }
  const applications = [...groups.values()].map(items => {
    const ordered = [...items].sort((a,b) => Number(completionState(b) === 'submitted') - Number(completionState(a) === 'submitted') || timestamp(b.updated_at || b.created_at) - timestamp(a.updated_at || a.created_at));
    const terminal = ordered[0];
    const pick = (key: keyof CoachingRow) => ordered.map(r => safeText(r[key])).find(Boolean) || null;
    const earliest = items.map(r => r.started_at || r.created_at).filter(timestamp).sort((a,b) => timestamp(a)-timestamp(b))[0] || null;
    const latest = items.map(r => r.updated_at || r.created_at).filter(timestamp).sort((a,b) => timestamp(b)-timestamp(a))[0] || null;
    // Answers only fill gaps; a later incomplete attempt cannot overwrite a complete answer.
    const answer = (key: keyof CoachingRow, requiredStep: number) => ordered.filter(r => completionState(r) === 'submitted' || (requiredStep < 3 && (r.last_completed_step ?? 0) >= requiredStep)).map(r => safeText(r[key])).find(Boolean) || null;
    const step = nextStepAnswer(answer('monthly_investment', 3));
    const booking = [...items].sort((a,b) => timestamp(b.updated_at || b.created_at)-timestamp(a.updated_at || a.created_at))[0];
    const ctx = applicationContext(terminal.context);
    const notes = typeof terminal.context === 'string' && !/^[\s]*[\[{]/.test(terminal.context) ? terminal.context.replace(/(?:^|\n)Package interest:.*$/gm, '').trim() : safeText(ctx.context);
    return {
      id: terminal.id, name: pick('name'), email: pick('email'), phone: pick('phone'), ig_handle: pick('ig_handle'),
      applied_at: earliest, latest_at: latest, months: [...new Set(items.map(r => applicationMonth(r.started_at || r.created_at)).filter(Boolean))],
      completion: completionState(terminal), last_saved_step: terminal.last_completed_step ?? null,
      budget_status: step.label === 'Historic monthly budget range' ? 'stated' : step.value == null ? 'unanswered' : 'not_stated',
      budget_range: step.label === 'Historic monthly budget range' ? step.value : null,
      readiness: step.label.startsWith('Selected') ? 'Included in selected next step' : readable(answer('ready_to_commit', 3)),
      booking_status: safeText(booking.booking_status),
      booking_scheduled_at: safeText(booking.booking_scheduled_at), follow_up: 'Follow-up not recorded',
      answers: [{ label: 'Goal', value: readable(answer('goal', 2)) }, { label: 'Consistency', value: readable(answer('consistency', 2)) }, step, { label: 'Additional information', value: completionState(terminal) === 'submitted' ? notes || null : null }],
      source: { path: pick('source_path'), source: pick('utm_source'), medium: pick('utm_medium'), campaign: pick('utm_campaign') },
    };
  }).sort((a,b) => timestamp(b.latest_at)-timestamp(a.latest_at));
  return { generated_at: now.toISOString(), timezone: 'America/New_York', applications, months: [...new Set(applications.flatMap(a => a.months))].sort().reverse() };
}
