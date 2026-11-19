/*
  Single source of truth for the canonical app bundle's scripts.

  Two places need this list and they must never drift: the catch-all route
  preloads them (so the browser downloads them in parallel, starting from the
  initial HTML), and CanonicalBundleLoader executes them (in this exact order,
  after hydration). A preload for a script that is never executed is wasted
  bandwidth; an executed script that was never preloaded is a serialised
  round-trip. scripts/test-canonical-bundle-contracts.mjs asserts both sides
  read from here.

  Order is a dependency chain, not a preference: react before react-dom before
  the bundle that mounts with them.
*/
export const CANONICAL_BUNDLE_SCRIPTS = [
  "/titan-events.js",
  "/vendor/react.production.min.js",
  "/vendor/react-dom.production.min.js",
  "/assets/app.bundle.js",
] as const;
