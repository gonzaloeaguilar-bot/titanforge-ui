/**
 * The home hero photo — the home page's LCP element.
 *
 * ONE source for two consumers that must agree byte for byte, or the browser
 * downloads the photo twice: the <link rel="preload"> the catch-all route
 * server-renders for "/" (app/[[...slug]]/page.tsx), and the <img srcset> the
 * client bundle renders (page-home.jsx, injected by scripts/build-app-bundle.mjs).
 *
 * Why (local Lighthouse 12 mobile, 2026-10-07, median of 3): LCP 8.2 s, 71% of
 * it "load delay" — the <img> only exists after the 363 KB app bundle runs, so
 * the browser could not discover a 523 KB 1200x1600 JPEG until then. The
 * preload starts it at HTML parse; the WebP variants (q62) are 45-112 KB at
 * phone widths.
 */
export const HOME_HERO_SRC = "/assets/images/site-unnamed-6.jpg";
export const HOME_HERO_SRCSET = [480, 640, 800, 1200]
  .map((w) => `/assets/images/site-unnamed-6-${w}.webp ${w}w`)
  .join(", ");
// Full width below the 860px grid breakpoint (assets/pages.css), half above it.
export const HOME_HERO_SIZES = "(max-width: 860px) 100vw, 50vw";
