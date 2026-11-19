// Permanent replacements for retired internal collections and orphaned legacy
// referral/pricing pages. Both deployment routers and the static generator use
// this list; the regression test checks the Vercel copy too.
export const retiredRoutes = {
  // 2026-10-27: legacy service endpoint had no consumer page and returned 404.
  // /coaching is the maintained explanation of the same service.
  '/services': '/coaching',
  // Internal portfolio/operations material does not belong in a fitness-buyer's
  // indexable blog corpus. Keep the old public URL recoverable, but send it to
  // the maintained resource library rather than presenting it as coaching advice.
  '/blog/2026-08-14-the-3-llm-cto-system-how-we-fully-automated-a-client-s-content-pipeline': '/resources',
  '/collections/evidence-and-proof': '/guides/how-we-read-a-study',
  '/collections/source-of-truth-and-entity-proof': '/guides/how-we-read-a-study',
  '/collections/citable-answer-formats-and-fitness-glossary': '/guides/how-we-read-a-study',
  '/collections/answer-engine-query-and-brand-fact-sheets': '/about',
  '/collections/refer-a-friend-and-coaching-credits': '/referral',
  '/resources/how-titan-forge-referral-program-works': '/referral',
  '/resources/how-to-earn-free-coaching-months': '/referral',
  '/resources/who-to-refer-for-fitness-coaching': '/referral',
  '/resources/titan-forge-coaching-plans-and-tiers': '/pricing',
  '/resources/how-the-coaching-prepay-discount-works': '/pricing',
  // 2026-10-13: templated answer pages with clicks or >50 impressions in 90 days,
  // folded into the closest real page. Decisions: docs/seo/templated-url-decisions-2026-10-13.csv.
  '/resources/when-to-stop-a-workout': '/science/how-close-to-failure-to-train',
  '/resources/beginner-strength-training': '/blog/2026-08-09-hypertrophy-vs-strength-what-actually-builds-muscle-for-beginners',
  '/resources/training-volume-and-recovery': '/science/how-many-sets-per-muscle-per-week',
  '/resources/how-to-build-muscle-without-dirty-bulking': '/science/can-you-build-muscle-and-lose-fat-at-the-same-time',
  '/resources/dynamic-warmup-before-strength-training': '/resources/exercise-order-in-strength-training',
  '/resources/calorie-deficit-basics-for-beginners': '/science/energy-balance-is-not-negotiable',
  '/resources/safe-exercise-progression-for-beginners': '/science/progressive-overload-what-it-really-means',
  '/resources/how-to-start-with-titan-forge-coaching': '/coaching',
  '/resources/pre-workout-supplements-and-caffeine': '/science/caffeine-and-training-performance',
  '/resources/protein-fiber-and-satiety-for-fat-loss': '/science/fibre-satiety-and-appetite',
  '/resources/personal-trainer-vs-online-fitness-coach': '/vs/personal-trainer',
  '/resources/weekly-fitness-check-ins-that-change-the-plan': '/coaching',
  '/resources/how-to-handle-social-events-while-dieting': '/blog/2026-08-09-how-to-track-macros-eating-out-with-clients',
  '/resources/how-to-choose-personal-trainer-parker-co': '/for/parker-personal-training',
  '/resources/evidence-based-fitness-coaching-sources': '/guides/how-we-read-a-study',
  '/resources/fitness-accountability-systems-that-work': '/coaching',
  '/resources/what-to-expect-from-online-coaching': '/for/online-coaching',
  '/resources/range-of-motion-and-strength-training': '/science/range-of-motion-and-growth',
  '/resources/when-to-adjust-workout-and-nutrition-plan': '/coaching',
  '/resources/what-happens-if-fitness-coaching-is-not-the-right-fit': '/start',
  '/resources/strength-training-after-40-without-beating-up-joints': '/for/strength-training-with-joint-pain',
  '/collections/beginner-fitness': '/blog/2026-08-09-hypertrophy-vs-strength-what-actually-builds-muscle-for-beginners',
};
