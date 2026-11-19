import { preload } from "react-dom";
import { HOME_HERO_SIZES, HOME_HERO_SRC, HOME_HERO_SRCSET } from "./lib/homeHero.mjs";

/*
  The home hero photo is the home page's LCP element, but the <img> only exists
  once the client bundle renders it. React hoists this hint into <head>, so the
  download starts at HTML parse instead of after the 363 KB bundle executes.
  This is an IMAGE hint only — the bundle scripts themselves are deliberately
  not preloaded (see CanonicalBundleLoader.tsx).
*/
export default function HomeHeroPreload() {
  preload(HOME_HERO_SRC, {
    as: "image",
    imageSrcSet: HOME_HERO_SRCSET,
    imageSizes: HOME_HERO_SIZES,
    fetchPriority: "high",
  });
  return null;
}
