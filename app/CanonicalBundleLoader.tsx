import { CANONICAL_BUNDLE_SCRIPTS } from "./canonicalBundleScripts";

/*
  The canonical bundle ships as raw <script defer> tags in the initial HTML.

  History, so this is not undone by accident:

  v1 was a "use client" component that waited for hydration (useEffect) and then
  chained the four scripts one at a time. Nothing could even begin downloading
  until Next had hydrated.

  v2 (PR #107) added rel=preload, which fixed the DOWNLOAD — all four now arrive
  in parallel — but execution still waited on hydration. The prerendered crawler
  article was still painted first and the real app still replaced it a beat
  later, which is what a visitor sees as "one page loads, then another one".

  v3 (this) executes on parse instead. `defer` keeps every guarantee the
  hand-rolled loader provided — scripts run in document order, after parsing,
  exactly once — and because the tags sit in the initial HTML the preload
  scanner fetches all four in parallel anyway. The app therefore owns #root
  before the browser's first paint, and the crawler article is never the visible
  page.

  Why this is safe against the hydration history (PR #52 "preserve ALOHA answers
  after hydration", PR #47 "keep membership metadata after hydration"): the
  crawler markup lives inside `<div id="root" dangerouslySetInnerHTML>`. React
  does not reconcile the children of a dangerouslySetInnerHTML node — that
  subtree is opaque to it — and this route is a static server component with no
  state, so it never re-renders and never re-applies the html prop. VERIFY THIS
  ON A PREVIEW DEPLOY, do not take it on faith: mount the page, confirm the form
  still works, and confirm the crawler markup does not reappear after hydration.

  No rel=preload alongside these: the tags are already in the initial HTML, so
  hints would only duplicate the request bookkeeping.
*/
export default function CanonicalBundleLoader() {
  return (
    <>
      {CANONICAL_BUNDLE_SCRIPTS.map((src) => (
        <script key={src} src={src} defer data-titan-loader-src={src} />
      ))}
    </>
  );
}
