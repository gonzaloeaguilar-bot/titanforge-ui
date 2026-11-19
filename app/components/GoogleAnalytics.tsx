"use client";

import { usePathname } from "next/navigation";
import { GA_MEASUREMENT_ID } from "../lib/ga";
import { useEffect, useRef } from "react";

/**
 * GA4 for titanforgefit.com.
 *
 * WHY THIS FILE EXISTS
 * Until 2026-08-06 this site was served as static HTML and the analytics lived
 * in that static shell. PR #26 ("fix(vercel): restore TITAN-04 production UI
 * routing") removed every `/index.html` rewrite from vercel.json and set
 * `"framework": "nextjs"`, so from that day the Next app served every route —
 * and the Next app had no analytics at all. `analytics.js` at the repo root was
 * left orphaned; nothing imports it.
 *
 * Measured from the GA4 Data API on property 545201342:
 *   Aug 5 = 37 active users -> Aug 6 = 1, and 1-4/day every day since.
 * The site kept ranking and kept serving traffic. It stopped counting.
 *
 * WHAT LOADS THE TAG
 * NOT this component. The gtag loader and its `config` call are server-rendered
 * straight into <head> in app/layout.tsx, so they execute on parse. The first
 * attempt used next/script `afterInteractive`, which shipped only a
 * <link rel="preload"> and deferred execution to post-hydration — GA4 realtime
 * returned ZERO rows for five minutes after a real browser visit. This site has
 * a hydration history (PR #52, PR #47), so measurement must not depend on it.
 *
 * This component only adds SPA route-change page_views, which genuinely require
 * the client. If hydration fails, the initial page_view is still recorded —
 * degraded, not blind.
 */

export function GoogleAnalytics() {
  const pathname = usePathname();
  // The <head> `config` call already reports the first page. Re-sending it here
  // would double-count that load, so skip the first fire and report only real
  // client-side navigations after it.
  const initialLoad = useRef(true);

  useEffect(() => {
    if (initialLoad.current) {
      initialLoad.current = false;
      return;
    }
    // A client-side navigation is a new page for a reader and not for the
    // measurement layer: without this, page two reports NO scroll depth at all
    // (page one already marked 25/50/75/90 as sent) and its dwell counter
    // carries page one's seconds. Adversarial review of PR #260 caught it.
    const reset = (window as unknown as { titanResetSharedAnalytics?: () => void }).titanResetSharedAnalytics;
    reset?.();

    // ONE writer per event name. /titan-events.js reports the route change
    // itself — with the shared cross-brand block on it — so calling gtag here
    // as well sent two page_views for one navigation (seen in a browser on
    // 2026-09-19). Defer to the bridge whenever it is loaded, and keep the
    // direct call only as the degraded path for a page that has no bridge.
    const bridgePageView = (window as unknown as { titanTrackPageView?: () => void }).titanTrackPageView;
    if (typeof bridgePageView === "function") {
      bridgePageView();
      return;
    }
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (typeof gtag !== "function") return;
    // Internal team board: never audience (see app/lib/gaBootstrap.mjs).
    if (/^\/team(\/|$)/.test(pathname)) return;
    gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
