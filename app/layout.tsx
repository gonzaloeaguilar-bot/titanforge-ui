import type { Metadata } from "next";
import "./next-shell.css";
import "./coaching-intensive.css";
import { ALLOW_INDEXING, SITE_NAME, SITE_ORIGIN } from "./lib/titanSeo";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { GA_MEASUREMENT_ID } from "./lib/ga";
import { gaBootstrapScript } from "./lib/gaBootstrap.mjs";

const FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Hanken+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  title: "Titan Forge Fitness",
  description: "Evidence-aware fitness coaching in Englewood, CO and online worldwide.",
  robots: ALLOW_INDEXING
    ? { index: true, follow: true }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {/*
          GA4 is server-rendered directly into <head> ON PURPOSE.

          The first attempt used next/script with strategy="afterInteractive".
          That shipped only a <link rel="preload" as="script"> into the HTML and
          left the actual execution to the client runtime after hydration — and
          five minutes of GA4 realtime polling after a real browser visit
          returned ZERO rows. This site has a documented hydration history (PR
          #52 "preserve ALOHA answers after hydration", PR #47 "keep membership
          metadata after hydration"), so making measurement depend on hydration
          is making it depend on the exact thing that keeps breaking here.

          Raw tags in <head> execute on parse, before React is involved at all.
          Measurement must not be able to fail quietly again.
        */}
        {/*
          Automated browsers (webdriver, crawlers, AI agents, headless window
          sizes) and the internal /team/* pages get dataLayer but never gtag.js
          or a config, so nothing they do reaches GA4. A live probe on
          2026-09-23 showed a webdriver visit still sending a page_view; on
          2026-10-07 Singapore/China headless desktops on square screens were
          43% of sessions. The rules and the evidence live in
          app/lib/gaBootstrap.mjs, which scripts/test-ga-bootstrap.mjs executes.
          Still a raw inline tag, so it runs on parse and does not depend on
          hydration.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: gaBootstrapScript(GA_MEASUREMENT_ID),
          }}
        />
        {/*
          The ONE measurement layer for this site.

          /titan-events.js is the single writer: it injects the shared
          cross-brand block (brand, page_type, locale, variant) on every event,
          emits the contract leg beside each legacy name, and loads and
          initialises /analytics/track.js — the shared auto-instrumentation
          module that measures section_view, scroll_depth, page_dwell,
          media_play, search, filter_apply, item_view and error_shown.

          It replaces the inline wk-engagement block that lived here. That
          block emitted `scroll_depth` with a `percent_scrolled` parameter and
          `page_active_dwell`, neither of which is the contract shape, and it
          only ran on Next routes while the static shells had no scroll or
          dwell signal at all. See ~/.claude/durable/ANALYTICS_CONTRACT.md.

          Loaded here, in the server-rendered <head>, for the same reason the
          gtag loader above is: this site has a hydration history (PR #52, PR
          #47) and measurement must not depend on hydration. The catch-all
          route's canonical bundle also lists this file; titan-events.js
          returns early on a second load, so it executes exactly once.
        */}
        <script src="/titan-events.js" defer />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/*
          Web fonts load WITHOUT blocking the first paint. They used to be
          @imported from /assets/tokens.css, a three-hop render-blocking chain
          (HTML -> tokens.css -> cross-origin font css -> woff2) that held the
          home page's first paint until after the client app had mounted, so
          the server-rendered hero photo never painted on its own and mobile
          LCP was 8.2 s (Lighthouse 12, 2026-10-07). A script-inserted
          stylesheet does not block rendering; display=swap already shows the
          fallback face until the woff2 arrives.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" as="style" href={FONT_STYLESHEET} />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(FONT_STYLESHEET)};document.head.appendChild(l);})();`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href={FONT_STYLESHEET} />
        </noscript>
        <link rel="stylesheet" href="/assets/tokens.css" />
        <link rel="stylesheet" href="/assets/site.css" />
        <link rel="stylesheet" href="/assets/components.css" />
        <link rel="stylesheet" href="/assets/pages.css" />
        <link rel="stylesheet" href="/assets/start.css" />
        <link rel="stylesheet" href="/assets/misc.css" />
        <link rel="stylesheet" href="/assets/coaching-intensive.css" />
      </head>
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
