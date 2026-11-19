/** Server-side exclusions shared by team reports. Never exclude by a person's name. */
export function safeText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}
export function applicationContext(value: unknown): Record<string, unknown> {
  try {
    const parsed = typeof value === 'string' ? JSON.parse(value) : value;
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch { return {}; }
}
export function isExcludedApplication(row: { email?: unknown; is_test?: unknown; test_run_id?: unknown; submission_mode?: unknown }, configuredEmails = '') {
  const email = safeText(row.email)?.toLowerCase() || '';
  const domain = email.split('@')[1] || '';
  const excluded = new Set(configuredEmails.split(/[,;\s]+/).map((s) => s.trim().toLowerCase()).filter(Boolean));
  return row.is_test === true || row.is_test === 'true' || Boolean(safeText(row.test_run_id)) ||
    safeText(row.submission_mode)?.toLowerCase() === 'test' || excluded.has(email) ||
    /(^|\.)(example\.(com|net|org)|example|test|invalid|localhost|titanforgefit\.com|gainsfromgeebs\.com)$/.test(domain);
}
