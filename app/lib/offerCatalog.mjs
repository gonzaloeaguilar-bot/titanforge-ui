// GENERATED FILE — DO NOT EDIT BY HAND.
// Source: offer-catalog/offers.json (catalogVersion 1, 2026-09-15).
// Regenerate with: npm run offers:sync

const OFFERS = [
  {
    "id": "science-based-community",
    "name": "Science-Based Community",
    "fullName": "Titan Forge Science-Based Community",
    "brands": [
      "geebs",
      "titanforge"
    ],
    "status": "live",
    "pricing": {
      "model": "monthly",
      "amountUsd": 24.99
    },
    "purchase": {
      "type": "shopify",
      "shopifyHandle": "titan-forge-science-based-community"
    },
    "legacyHandle": "geebs-science-based-community",
    "analyticsIntent": "science_community_24_99",
    "eyebrow": "Community membership",
    "shortDescription": "A practical Telegram community for lifters who want useful fitness discussion, shared accountability, and a research-minded place to keep learning.",
    "bestFor": "You want a serious fitness community without a coaching contract.",
    "includes": [
      "Access to the Titan Forge Science-Based Telegram community",
      "Training, nutrition, recovery, and research discussion",
      "Shared accountability with like-minded lifters",
      "Monthly access that continues until canceled"
    ],
    "bestForList": [
      "You want a serious fitness community without a coaching contract",
      "You like evidence-aware discussion but still want practical takeaways",
      "You already have a plan and want more accountability around it"
    ],
    "requiresApplication": false
  },
  {
    "id": "community-plus-fitbudd",
    "name": "Community + 90-Day App Program",
    "fullName": "Titan Forge Science-Based Community + 90-Day FitBudd App",
    "brands": [
      "titanforge"
    ],
    "notSoldBy": {
      "geebs": {
        "since": "2026-08-21",
        "reason": "Retired from the Geebs site per the 2026-08-21 call with Kris (gainsfromgeebs-site#444). Still sold by Titan Forge; /memberships/community-app on the Geebs site 301s to the $24.99 community."
      }
    },
    "status": "live",
    "pricing": {
      "model": "monthly",
      "amountUsd": 49.99
    },
    "purchase": {
      "type": "shopify",
      "shopifyHandle": "titan-forge-community-fitbudd-app"
    },
    "analyticsIntent": "science_titan_app_49_99",
    "eyebrow": "Community + app program",
    "shortDescription": "Everything in the Science-Based Community, plus the 90-Day Transformation Program inside the TITAN FORGE app while your membership is active.",
    "bestFor": "You want structured programming to follow plus the community, without 1:1 coaching.",
    "includes": [
      "Everything in the Titan Forge Science-Based Community",
      "The 90-Day Transformation Program inside the TITAN FORGE app",
      "90 days of targeted resistance training organized by muscle group",
      "Progressive overload built into the programming",
      "App access continues while your membership is active"
    ],
    "bestForList": [
      "You want a program to follow, not just a room to talk in",
      "You are self-driven and do not need daily coach contact",
      "You want structure and community in one monthly price"
    ],
    "shopifyProductId": "10939929329948",
    "requiresApplication": false
  },
  {
    "id": "one-time-consultation",
    "name": "One-Time Consultation Call",
    "fullName": "Geebs One-Time Consultation",
    "brands": [
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "one_time",
      "amountUsd": 100
    },
    "purchase": {
      "type": "shopify",
      "shopifyHandle": "geebs-one-time-consultation"
    },
    "analyticsIntent": "geebs_consult_100",
    "eyebrow": "One-time guidance",
    "shortDescription": "A focused 45-minute Zoom with Kris for people who are not ready for monthly coaching yet but still want his read on the problem.",
    "bestFor": "You want direction now without a monthly commitment.",
    "includes": [
      "A focused 45-minute Zoom with Kris",
      "A real diagnosis of what is holding back progress right now",
      "Guidance on training, nutrition, accountability, or schedule",
      "A practical next-step plan even if monthly coaching is not the move yet"
    ],
    "bestForList": [
      "You are not ready for monthly coaching but want Kris's eyes on the problem",
      "You want direction without a recurring commitment"
    ],
    "shopifyProductId": "10889352577308",
    "requiresApplication": false
  },
  {
    "id": "coaching-intensive-30-day",
    "name": "30-Day 1:1 Intensive",
    "fullName": "Fitness Coaching Scholarship — 30-Day 1:1 Intensive",
    "brands": [
      "titanforge",
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "one_time",
      "amountUsd": 50,
      "note": "Applying is free. Selected applicants pay before the 30-day program begins."
    },
    "purchase": {
      "type": "application",
      "url": "https://titanforgefit.com/coaching-intensive"
    },
    "shortDescription": "Thirty days of 1:1 coaching with weekly check-ins, offered as a scholarship to up to three people at a time.",
    "bestFor": "You want a short, structured way to see how coaching fits your week before committing to an ongoing plan.",
    "requiresApplication": true
  },
  {
    "id": "titanforge-premium-coaching",
    "name": "Premium Coaching",
    "brands": [
      "titanforge"
    ],
    "status": "live",
    "pricing": {
      "model": "monthly",
      "amountUsd": 750,
      "note": "Prepay five months and the sixth is free — $3,750 for six months."
    },
    "purchase": {
      "type": "application",
      "url": "https://titanforgefit.com/apply"
    },
    "shortDescription": "The most direct access, with scheduled video calls and coaching decisions from Steve or Kris.",
    "bestFor": "You want the highest level of access and scheduled face-to-face time.",
    "requiresApplication": true
  },
  {
    "id": "titanforge-standard-coaching",
    "name": "Standard Coaching",
    "brands": [
      "titanforge"
    ],
    "status": "live",
    "pricing": {
      "model": "monthly",
      "amountUsd": 400,
      "note": "Prepay five months and the sixth is free on any 1:1 plan."
    },
    "purchase": {
      "type": "application",
      "url": "https://titanforgefit.com/apply"
    },
    "shortDescription": "Custom coaching delivered through phone or pre-recorded check-ins rather than scheduled video calls.",
    "bestFor": "You want real 1:1 coaching without the premium access layer.",
    "requiresApplication": true
  },
  {
    "id": "titanforge-nutrition-only",
    "name": "Nutrition Only",
    "brands": [
      "titanforge"
    ],
    "status": "live",
    "pricing": {
      "model": "monthly",
      "amountUsd": 200
    },
    "purchase": {
      "type": "application",
      "url": "https://titanforgefit.com/apply"
    },
    "shortDescription": "Nutrition decision support and accountability for people whose training is already handled.",
    "bestFor": "Training is covered but food is what breaks the week.",
    "requiresApplication": true
  },
  {
    "id": "vip-1on1",
    "name": "VIP 1:1 Coaching",
    "brands": [
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "quoted",
      "note": "Covered on the strategy call after the application."
    },
    "purchase": {
      "type": "application",
      "url": "/apply"
    },
    "shortDescription": "The most hands-on way to work with Kris: prioritized daily communication, hands-on FaceTime meal prep, a fully custom training plan, form review, and a weekly 30-minute Zoom.",
    "bestFor": "You want a coach managing training, nutrition, and accountability every day.",
    "requiresApplication": true
  },
  {
    "id": "standard-check-in",
    "name": "Standard Check-In Coaching",
    "brands": [
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "quoted",
      "note": "Covered on the strategy call after the application."
    },
    "purchase": {
      "type": "application",
      "url": "/apply"
    },
    "shortDescription": "Custom 1:1 coaching with daily accountability, macros-based nutrition guidance, and a weekly 15-minute phone check-in.",
    "bestFor": "You want real coach direction without the full VIP priority layer.",
    "requiresApplication": true
  },
  {
    "id": "weekly-review",
    "name": "Weekly Review Coaching",
    "brands": [
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "quoted",
      "note": "Covered on the strategy call after the application."
    },
    "purchase": {
      "type": "application",
      "url": "/apply"
    },
    "shortDescription": "Custom training and nutrition without the daily back-and-forth. Once a week Kris sends a recorded review walking through your logged numbers and where you stand.",
    "bestFor": "You are self-driven and want a coach's eyes on the plan rather than a text thread.",
    "requiresApplication": true
  },
  {
    "id": "nutrition-only",
    "name": "Nutrition Only",
    "brands": [
      "geebs"
    ],
    "status": "live",
    "pricing": {
      "model": "quoted",
      "note": "Covered on the strategy call after the application."
    },
    "purchase": {
      "type": "application",
      "url": "/apply"
    },
    "shortDescription": "The grocery, meal-prep, and portioning system built with Kris, for people whose training is already handled.",
    "bestFor": "Your training is handled but food still breaks the week.",
    "requiresApplication": true
  },
  {
    "id": "self-guided-90-day",
    "name": "90-Day Transformation (self-guided)",
    "brands": [
      "geebs"
    ],
    "status": "retired",
    "retiredAt": "2026-08-21",
    "retiredReason": "Standalone self-guided SKU discontinued. The 90-day program itself lives on inside community-plus-fitbudd; it is no longer sold on its own at $90.",
    "pricing": {
      "model": "one_time",
      "amountUsd": 90
    },
    "purchase": {
      "type": "none"
    },
    "shortDescription": "Retired. Never reference this offer in public copy.",
    "requiresApplication": false
  }
];

const byId = new Map(OFFERS.map((o) => [o.id, o]));

/** Fail closed: an unknown or retired offer throws rather than render. */
export function offer(id) {
  const o = byId.get(id);
  if (!o) throw new Error(`offer-catalog: no offer with id "${id}"`);
  if (o.status === "retired")
    throw new Error(`offer-catalog: "${id}" was retired ${o.retiredAt} and must not be rendered`);
  return o;
}

/** The only sanctioned way to put a price in copy. */
export function price(id) {
  const { model, amountUsd } = offer(id).pricing;
  if (model === "quoted") return "quoted on the strategy call";
  const n = Number.isInteger(amountUsd) ? `$${amountUsd}` : `$${amountUsd.toFixed(2)}`;
  return model === "monthly" ? `${n}/mo` : n;
}

export const PREMIUM = price("titanforge-premium-coaching");
export const STANDARD = price("titanforge-standard-coaching");
export const NUTRITION_ONLY = price("titanforge-nutrition-only");
export const APP_COMMUNITY = price("community-plus-fitbudd");
export const COMMUNITY = price("science-based-community");
