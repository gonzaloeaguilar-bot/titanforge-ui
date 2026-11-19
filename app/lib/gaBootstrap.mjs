/**
 * The inline GA4 bootstrap that app/layout.tsx server-renders into <head>.
 *
 * It lives here, as plain JS, so scripts/test-ga-bootstrap.mjs can run the
 * exact string the browser runs against fake visitors instead of grepping it.
 *
 * Automated browsers and Steve's own team pages get `dataLayer` and a `gtag`
 * stub (e2e specs and titan-events.js read them) but never gtag.js or a
 * `config` call, so nothing they do reaches GA4.
 *
 * WHY THE SCREEN RULES (measured 2026-10-07, GA4 property 545201342, 28 days):
 * Singapore 184 + China 52 sessions were 43% of 553. The bulk of that cohort
 * was desktop Chrome on screens no person owns — 1280x1200 (121 sessions),
 * 1366x1366 (57), 1600x1600 (2) — or a "Macintosh" UA on a 375x812 screen (4),
 * all at a 2-3 s average session. A webdriver flag and a bot UA did not catch
 * them: they hide both. A desktop UA on a near-square screen, or on a screen
 * narrower than any desktop display, is a headless window size, not a monitor.
 * Mobile UAs are never judged on screen shape (phones and tablets rotate). The
 * square band is 0.94-1.08 so real near-square monitors (LG DualUp 2560x2880,
 * ratio 0.89) stay measured.
 *
 * /team/* is Steve and Kris's internal weekly board (88 page views in the same
 * window), not audience — it is excluded here and in titan-events.js for
 * client-side navigations into it.
 */

export const GA_BOT_UA_PATTERN =
  "bot|crawl|spider|slurp|headless|lighthouse|pagespeed|gptbot|chatgpt-user|oai-searchbot|claudebot|claude-web|perplexity|bytespider|petalbot|semrush|ahrefs|dataforseo|facebookexternalhit|bingpreview|vercelbot|google-inspectiontool";

export function gaBootstrapScript(measurementId) {
  return (
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
    "(function(){var w=window,n=w.navigator||{},ua=String(n.userAgent||''),sc=w.screen||{}," +
    "sw=+sc.width||0,sh=+sc.height||0,path=String((w.location||{}).pathname||'/'),why='';" +
    "if(/^\\/team(\\/|$)/.test(path))why='internal_team_page';" +
    "else if(n.webdriver===true)why='webdriver';" +
    "else if(/" + GA_BOT_UA_PATTERN + "/i.test(ua))why='automated_user_agent';" +
    "else if(sw&&sh&&!/Mobi|Android|iPhone|iPad|iPod/i.test(ua)){" +
    "if(Math.min(sw,sh)<600)why='desktop_ua_phone_screen';" +
    "else if(sw/sh>0.94&&sw/sh<1.08)why='desktop_ua_square_screen';}" +
    "if(why){w.TITAN_GA_SUPPRESSED=why;try{document.documentElement.setAttribute('data-titan-ga-suppressed',why);}catch(e){}return;}" +
    "gtag('js',new Date());gtag('config','" + measurementId + "');" +
    "var s=document.createElement('script');s.async=true;" +
    "s.src='https://www.googletagmanager.com/gtag/js?id=" + measurementId + "';document.head.appendChild(s);})();"
  );
}
