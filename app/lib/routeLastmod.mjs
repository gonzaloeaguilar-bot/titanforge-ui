// The one place that answers "when did this page last really change?".
// Data is app/lib/routeLastmod.json, written by scripts/route-lastmod.mjs and
// committed, so no build step ever reads git history. A route with no entry
// returns null and the caller must OMIT the date: no lastmod is honest, a guess
// is not.
import ledger from './routeLastmod.json' with { type: 'json' };

export function lastmodForRoute(route) {
  const entry = ledger.routes[route];
  return entry ? entry.date : null;
}
