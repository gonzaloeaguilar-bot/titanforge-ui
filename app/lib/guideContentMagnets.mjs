/* Four pages written for the questions a buyer near the Denver Tech Center
   actually types: what personal training costs, which of three options fits, how
   much protein to eat, and what a first session is like.

   They live in their own file so they merge cleanly beside guideContent.mjs, and
   guideContent.mjs spreads MAGNET_GUIDES into GUIDES. From there they go through
   the same pipeline as every other guide: one object renders the served HTML and
   the React view.

   Rules these pages are held to (see test-guide-contracts.mjs):
     - Titan Forge prices come from the offer catalog, never typed.
     - Every outside price sits in a dated table row with the page it was read from.
     - Every research number names its PubMed number and was read in the abstract.
     - Arithmetic is computed here, from the sourced inputs, not typed by hand.
     - No invented reviews, ratings, guarantees or statements about other providers. */

import { STANDARD, PREMIUM, NUTRITION_ONLY, COMMUNITY, APP_COMMUNITY } from './offerCatalog.mjs';

const UPDATED = '2026-10-13';
const READ_ON = '2026-10-13';

const SCOPE = 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician, registered dietitian or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training or eating plan.';

const URL_THUMBTACK = 'https://www.thumbtack.com/co/englewood/personal-trainers';
const URL_JCC = 'https://www.jccdenver.org/fitness/training/';
const URL_NERDWALLET = 'https://www.nerdwallet.com/finance/learn/guide-to-choosing-a-gym-cost-and-other-factors-to-consider';
const URL_NCCA = 'https://www.credentialingexcellence.org/Accreditation/Earn-Accreditation/NCCA';
const URL_PRICING = 'https://titanforgefit.com/pricing';

const pubmed = (pmid) => `https://pubmed.ncbi.nlm.nih.gov/${pmid}/`;

/* ---- cost arithmetic -------------------------------------------------------
   Sessions a week x 52 weeks / 12 months. Computed, so the table cannot drift
   from the rates it is built on. */
const THUMBTACK_LOW = 35;
const THUMBTACK_HIGH = 90;
const JCC_PERSONAL = 89;
const JCC_SENIOR = 94;
const JCC_MASTER = 99;

export function monthlyCost(hourlyRate, sessionsPerWeek) {
  return Math.round((hourlyRate * sessionsPerWeek * 52) / 12);
}
const usd = (n) => `$${n.toLocaleString('en-US')}`;

/* ---- protein tool ---------------------------------------------------------- */
const KG_PER_LB = 0.45359237;

/* Grams of protein per kilogram of body weight per day. Each range is a figure a
   named source states; the source is on the row so the calculator can show it. */
export const PROTEIN_GOALS = [
  {
    id: 'general',
    label: 'Not training, general health',
    low: 0.8,
    high: 0.8,
    older: [1.0, 1.2],
    basis: 'The Recommended Dietary Allowance for adults, 0.8 g/kg (restated in PMID 27529275). For people over 65 the PROT-AGE group advises at least 1.0 to 1.2 g/kg (PMID 23867520).',
  },
  {
    id: 'lift',
    label: 'Lifting to keep or build muscle',
    low: 1.4,
    high: 2.0,
    older: [1.2, 2.0],
    basis: 'The International Society of Sports Nutrition says 1.4 to 2.0 g/kg is sufficient for most exercising people (PMID 28642676). For people over 65 who exercise, PROT-AGE advises at least 1.2 g/kg (PMID 23867520).',
  },
];

export const PER_MEAL = {
  gramsPerKg: 0.25,
  absoluteLow: 20,
  absoluteHigh: 40,
  everyHours: '3 to 4',
  basis: 'The International Society of Sports Nutrition suggests about 0.25 g/kg, or 20 to 40 g, of high-quality protein per serving, spread roughly every 3 to 4 hours (PMID 28642676).',
};

export function proteinRange(kg, goalId, older = false) {
  const goal = PROTEIN_GOALS.find((g) => g.id === goalId);
  if (!goal) throw new Error(`unknown protein goal ${goalId}`);
  const [low, high] = older ? goal.older : [goal.low, goal.high];
  return { lowG: Math.round(kg * low), highG: Math.round(kg * high), perKgLow: low, perKgHigh: high };
}

const lbToKg = (lb) => lb * KG_PER_LB;
const range = (g) => (g.lowG === g.highG ? `${g.lowG} g` : `${g.lowG} to ${g.highG} g`);

const PROTEIN_WEIGHTS_LB = [120, 140, 160, 180, 200, 220];
const proteinGridRows = PROTEIN_WEIGHTS_LB.map((lb) => [
  `${lb} lb (${Math.round(lbToKg(lb))} kg)`,
  range(proteinRange(lbToKg(lb), 'general')),
  range(proteinRange(lbToKg(lb), 'lift')),
]);
const lift180 = proteinRange(lbToKg(180), 'lift');

export const MAGNET_GUIDES = {
  /* ------------------------------------------------------------------ 1 */
  '/guides/how-much-does-personal-training-cost-denver-tech-center': {
    title: 'How Much Does Personal Training Cost Near The Denver Tech Center?',
    metaTitle: 'Personal Training Cost Near The DTC (2026) — Titan Forge Fitness',
    eyebrow: 'Cost Guide',
    description: 'What one-on-one personal training costs per hour and per month near the Denver Tech Center, with every outside price linked to the page it came from, and Titan Forge’s published monthly rates.',
    keywords: 'how much does personal training cost, personal trainer cost denver, personal training prices denver tech center, personal trainer cost per session colorado, personal training cost englewood co',
    intent: 'cost',
    updated: UPDATED,
    shortAnswer: `In the Denver area, one-on-one personal training is usually priced by the hour. Thumbtack lists $${THUMBTACK_LOW} to $${THUMBTACK_HIGH} an hour near Englewood, and JCC Denver posts $${JCC_PERSONAL} to $${JCC_MASTER} for a single 60-minute session depending on the trainer’s experience (both read 13 October 2026). Titan Forge Fitness publishes monthly rates instead: ${PREMIUM} for Premium Coaching, ${STANDARD} for Standard, ${NUTRITION_ONLY} for Nutrition Only and ${APP_COMMUNITY} for App + Community. It does not publish a price for in-person sessions; that is confirmed when you apply.`,
    sections: [
      {
        id: 'hourly-rates',
        heading: 'What do trainers charge per hour near the Denver Tech Center?',
        paras: [
          `We could verify two public price points. Both describe the wider Denver area, not a studio near the Denver Tech Center. Thumbtack, a marketplace where trainers advertise, says to expect between $${THUMBTACK_LOW} and $${THUMBTACK_HIGH} an hour for a personal trainer near Englewood. JCC Denver, a community center in central Denver, posts a full rate card and prices the same 60-minute session by the trainer’s experience.`,
          'The spread inside one rate card is the useful part. The JCC’s lowest tier is a trainer with an approved personal training certification or an associate degree in health or exercise science. Its top tier asks for at least two of a master’s degree in that field, approved certifications, or 14 or more years as a trainer. Across the three tiers a single session differs by ten dollars, and its 4, 8 and 12-session packs lower the price of each session.',
        ],
        table: {
          head: ['Source', 'Price and what it covers', 'Where we read it'],
          rows: [
            ['Thumbtack, Englewood CO', 'typical cost per hour of personal training near Englewood', `$${THUMBTACK_LOW} to $${THUMBTACK_HIGH}`, URL_THUMBTACK, READ_ON],
            ['JCC Denver, personal trainer tier', 'one 60-minute private session', `$${JCC_PERSONAL}`, URL_JCC, READ_ON],
            ['JCC Denver, senior trainer tier', 'one 60-minute private session', `$${JCC_SENIOR}`, URL_JCC, READ_ON],
            ['JCC Denver, master trainer tier', 'one 60-minute private session', `$${JCC_MASTER}`, URL_JCC, READ_ON],
          ],
        },
      },
      {
        id: 'monthly-total',
        heading: 'What does a month of in-person training add up to?',
        paras: [
          'The hourly price matters less than how often you go. The table turns the rates above into a month, using 52 weeks divided by 12, which is about 4.3 weeks. It is arithmetic on the published rates, not a quote from any trainer.',
          'Two sessions a week at the top of Thumbtack’s range comes close to the Premium coaching rate. The comparison is only fair if you also count what each one includes. An hourly trainer is paid for the hour you are in the room. A monthly coaching rate also pays for the plan changes and check-ins between sessions.',
        ],
        grid: {
          caption: 'Monthly cost of one-hour sessions, worked out from the rates above',
          head: ['How often', `At $${THUMBTACK_LOW} an hour`, `At $${THUMBTACK_HIGH} an hour`, `At $${JCC_SENIOR} an hour`],
          rows: [1, 2, 3].map((perWeek) => [
            `${perWeek} ${perWeek === 1 ? 'session' : 'sessions'} a week`,
            usd(monthlyCost(THUMBTACK_LOW, perWeek)),
            usd(monthlyCost(THUMBTACK_HIGH, perWeek)),
            usd(monthlyCost(JCC_SENIOR, perWeek)),
          ]),
          note: `Columns: the low end of Thumbtack’s range, the high end, and the JCC senior-trainer session. Sessions a week multiplied by 52, divided by 12, multiplied by the hourly rate.`,
        },
      },
      {
        id: 'titan-forge-rates',
        heading: 'What does Titan Forge charge?',
        paras: [
          `Titan Forge publishes monthly rates, not hourly ones. Premium Coaching is ${PREMIUM} with scheduled video calls. Standard Coaching is ${STANDARD} with phone or pre-recorded Loom check-ins. Nutrition Only is ${NUTRITION_ONLY}. App + Community is ${APP_COMMUNITY} and includes the 90-Day Transformation Program in the TITAN FORGE app.`,
          'There is no published price for an in-person session at the gym at 9780 S Meridian Blvd. Session pricing and availability are confirmed when you apply, and applying costs nothing. If you prepay five months on any one-to-one plan, the sixth month is free.',
          'The one-to-one plans work online from anywhere, so the drive to Meridian is optional. Distances from Lone Tree, Inverness and the Denver Tech Center are on the local training page.',
        ],
        links: [
          ['/pricing', 'Current plans and rates'],
          ['/for/personal-training-englewood-centennial', 'Training near Lone Tree, Inverness and the Denver Tech Center'],
          ['/coaching-intensive#apply', 'Apply for coaching'],
        ],
      },
      {
        id: 'compare-fairly',
        heading: 'How do you compare a monthly rate with a per-session rate?',
        paras: [
          'Count the whole month, not the unit price. Add up what you would pay for the sessions you would actually attend, then ask what you get on the days between them. Two sessions a week leaves five days with no one in the room.',
          'A monthly coaching rate usually pays for that part: a written plan, a check-in on a set day, and changes when the week goes wrong. Neither is better in general. In-person training is the better buy when the problem is technique, confidence in a gym, or needing a person beside you. Coaching is the better buy when the problem is the other five days.',
        ],
        links: [
          ['/vs/personal-trainer-online-coach-or-gym-membership', 'Personal trainer, online coach or gym membership'],
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer'],
        ],
      },
      {
        id: 'ask-before-paying',
        heading: 'What should you ask before you pay any trainer?',
        ordered: [
          ['What is the rate per session, and per package?', 'Ask for both in writing. Packages usually lower the price of each session, and the JCC rate card shows it.'],
          ['What happens if you cancel or miss a session?', 'The JCC card says its packages are non-transferable and non-refundable and that appointments need 24 hours’ notice. Rules like these are normal. The point is to know them before you pay.'],
          ['Who is the trainer, and what do they hold?', 'Ask which certification they have and whether an independent body accredits it. The National Commission for Certifying Agencies publishes a directory of accredited certification programs you can check.'],
          ['What do I get between sessions?', 'A plan you can follow alone, a way to ask questions, someone who reads your log. If the answer is nothing, treat the sessions as the whole service.'],
          ['What happens if it is not working?', 'A good answer names a time frame and what would change, such as reviewing the plan.'],
        ],
        links: [
          ['/guides/what-to-expect-first-personal-training-session', 'What to expect at a first personal training session'],
        ],
      },
      {
        id: 'cheaper-start',
        heading: 'Is there a cheaper way to start?',
        paras: [
          `Yes. The Science-Based Community is ${COMMUNITY}, and App + Community at ${APP_COMMUNITY} adds a 90-day program to follow. Both are monthly memberships with no coaching contract, and neither includes one-to-one coaching.`,
          'The free readiness check takes a minute, needs no sign-up, and matches you to the coach whose way of working fits your week. It does not tell you whether you need a trainer at all; the questions above help with that.',
        ],
        links: [
          ['/free/forge-readiness-check', 'Free readiness check, no sign-up'],
          ['/guides/online-coaching-prices-compared', 'Online coaching prices compared, each read from the coach’s own page'],
        ],
      },
    ],
    faqs: [
      ['How much does a personal trainer cost per hour in Englewood, Colorado?', `Thumbtack lists $${THUMBTACK_LOW} to $${THUMBTACK_HIGH} an hour for personal trainers near Englewood (read 13 October 2026). That is a marketplace estimate, so ask any trainer for the rate in writing.`],
      ['What does JCC Denver charge for personal training?', `On the rate card we read on 13 October 2026, a single 60-minute private session is $${JCC_PERSONAL} with a personal trainer, $${JCC_SENIOR} with a senior trainer and $${JCC_MASTER} with a master trainer. Packages of 4, 8 and 12 sessions lower the price of each session.`],
      ['How much does Titan Forge charge?', `Titan Forge publishes monthly coaching rates: ${PREMIUM} for Premium Coaching, ${STANDARD} for Standard Coaching, ${NUTRITION_ONLY} for Nutrition Only and ${APP_COMMUNITY} for App + Community. There is no published price for in-person sessions. It is confirmed when you apply.`],
      ['Is online coaching cheaper than in-person personal training?', 'Per month it often is, but the two are priced on different units: the hour for a trainer, the month for coaching. Compare the total for the month and what each includes between sessions.'],
      ['Is a more expensive trainer a better trainer?', 'Price tracks experience, credentials and attention, not outcome. The JCC prices three tiers by qualifications and years of service. No trainer controls your sleep or your week, and none can honestly guarantee a result.'],
      ['Do session packages save money?', 'Usually they lower the price of each session. The catch is the terms: the JCC’s packages are non-refundable, so read the cancellation and expiry rules before you buy a large pack.'],
      ['Does Titan Forge offer a discount for paying up front?', 'Yes. On any one-to-one plan, prepay five months and the sixth month is free. The pricing page lists the current terms.'],
    ],
    sources: [
      ['Thumbtack, personal trainers in Englewood, CO', URL_THUMBTACK, READ_ON],
      ['JCC Denver, personal training rates', URL_JCC, READ_ON],
      ['National Commission for Certifying Agencies', URL_NCCA, READ_ON],
      ['Titan Forge Fitness, pricing', URL_PRICING, READ_ON],
    ],
    scope: SCOPE,
  },

  /* ------------------------------------------------------------------ 2 */
  '/vs/personal-trainer-online-coach-or-gym-membership': {
    title: 'Personal Trainer, Online Coach Or Gym Membership: Which Fits?',
    metaTitle: 'Personal Trainer, Online Coach Or Gym Membership — Titan Forge Fitness',
    eyebrow: 'Honest Comparison',
    description: 'What a gym membership, a personal trainer and online coaching each buy, what each costs with the source for every number, and how to pick by the problem you actually have.',
    keywords: 'personal trainer vs gym membership, online coaching vs personal trainer vs gym, is a personal trainer worth it, gym membership or personal trainer, should i hire a personal trainer or join a gym',
    intent: 'comparison',
    updated: UPDATED,
    shortAnswer: `A gym membership buys access to equipment, a personal trainer buys a person’s attention for the hour you are in the room, and online coaching buys a plan that is changed every week. Prices follow that order: monthly gym dues averaged $65 in 2023 (a Health & Fitness Association figure quoted by NerdWallet), Englewood trainers list $${THUMBTACK_LOW} to $${THUMBTACK_HIGH} an hour on Thumbtack, and Titan Forge’s coaching runs ${NUTRITION_ONLY} to ${PREMIUM}. Pick by the problem you have, not by the price.`,
    sections: [
      {
        id: 'what-each-buys',
        heading: 'What does each option actually buy?',
        paras: [
          'The three are often compared on price, which hides the real difference: each one pays for a different thing. A membership pays for the building. A trainer pays for the hour. Coaching pays for the days in between.',
        ],
        grid: {
          caption: 'The three options side by side',
          head: ['', 'Gym membership', 'Personal trainer, in person', 'Online coaching'],
          rows: [
            ['What you pay for', 'Access to equipment and space', 'A trainer’s attention during the session', 'A written plan, check-ins and changes between them'],
            ['How it is priced', 'Per month', 'Per hour, or a pack of sessions', 'Per month'],
            ['Who watches your lifts', 'No one, unless you pay extra', 'The trainer, live', 'The coach, from video you send or on a call'],
            ['Who changes the plan', 'You', 'The trainer, at your sessions', 'The coach, after each check-in'],
            ['Works when you travel', 'Only with a branch nearby', 'No', 'Yes'],
            ['Best when', 'You already know what to do', 'Technique or gym confidence is the problem', 'Knowing what to change each week is the problem'],
          ],
        },
      },
      {
        id: 'prices',
        heading: 'What did each cost, and where did the numbers come from?',
        paras: [
          'Every outside number is copied from the page named in the table, on the date shown. The gym figure is second-hand: NerdWallet quotes the Health & Fitness Association’s 2024 U.S. Health & Fitness Consumer Report, and we did not open that report ourselves.',
          'These are averages and marketplace ranges, so a studio near you may charge more or less. Use them to judge whether a quote is ordinary, then ask for the rate in writing.',
        ],
        table: {
          head: ['Source', 'Price and what it covers', 'Where we read it'],
          rows: [
            ['NerdWallet, quoting the Health & Fitness Association', 'average monthly fitness facility dues in 2023', '$65/mo', URL_NERDWALLET, READ_ON],
            ['NerdWallet', 'typical range for a gym membership', '$10 to $100/mo', URL_NERDWALLET, READ_ON],
            ['Thumbtack, Englewood CO', 'typical cost per hour of personal training near Englewood', `$${THUMBTACK_LOW} to $${THUMBTACK_HIGH}`, URL_THUMBTACK, READ_ON],
            ['Titan Forge Fitness', 'online coaching, Nutrition Only up to Premium Coaching', `${NUTRITION_ONLY} to ${PREMIUM}`, URL_PRICING, READ_ON],
          ],
        },
      },
      {
        id: 'which-fits',
        heading: 'Which one fits which problem?',
        bullets: [
          ['You do not know what to do in a gym.', 'Start with a few sessions with a trainer, or with a coach who gives you a written plan. A membership alone leaves the question open.'],
          ['You know what to do and keep not doing it.', 'A membership plus a fixed booking with someone waiting for you can be enough. Accountability is usually cheaper than programming.'],
          ['You have never lifted, or technique worries you.', 'In-person training. Being corrected live in the first weeks is what a person beside you is for.'],
          ['Travel or shifts keep breaking your plan.', 'Online coaching, because the plan changes when the week does and does not depend on a booked hour.'],
          ['Food is where it keeps falling apart.', 'Nutrition coaching. Neither a membership nor an hour of training fixes what you eat on the other days.'],
          ['You want the cheapest start.', 'A membership and one structured plan followed for eight weeks, or a community tier. Running one plan to the end tells you what is really stopping you.'],
        ],
      },
      {
        id: 'does-supervision-help',
        heading: 'Does having someone supervise your training change results?',
        paras: [
          'A 2024 systematic review and meta-analysis in Sports Medicine (PMID 38647999) compared supervised and unsupervised exercise in 34 randomized trials with 2,830 adults aged 60 and over. Attendance was the same, 81%, in both groups, and neither had serious adverse events.',
          'Supervised groups gained more knee extension strength (standardized mean difference 0.18, p = 0.002), and the authors also found small advantages on other tests of physical function. Only the knee strength result held in their sensitivity checks. The authors call for more high-quality research to confirm it.',
          'Read it for what it is: older adults, strength and function tests, no comparison with any Titan Forge client. Unsupervised programs also worked. Supervision helped a little, not a lot.',
        ],
      },
      {
        id: 'combine',
        heading: 'Can you combine them?',
        paras: [
          'Yes, and many people do. A membership plus online coaching gives you the building and the plan. A few in-person sessions to learn the lifts, followed by coaching to keep going, is a common middle path.',
          'Titan Forge supports in-person training at 9780 S Meridian Blvd with online programming and check-ins for the rest of the week. There is no published price for in-person sessions; it is confirmed when you apply.',
        ],
        links: [
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer, in detail'],
          ['/for/personal-training-englewood-centennial', 'Training near Lone Tree, Inverness and the Denver Tech Center'],
          ['/guides/how-much-does-personal-training-cost-denver-tech-center', 'What personal training costs near the Denver Tech Center'],
        ],
      },
      {
        id: 'decide-this-week',
        heading: 'How do you decide this week?',
        ordered: [
          ['Write the problem in one sentence.', 'Not "get fit". Something like "I do not know what to do when I get there" or "I plan well and cannot keep it up when I travel".'],
          ['Match it to the table.', 'Knowledge points at a trainer or coach. Consistency points at accountability. Technique points at in-person training.'],
          ['Ask one provider your sentence word for word.', 'A specific answer is a good sign. A brochure is not.'],
          ['Get the price and the cancellation terms in writing.', 'Then sleep on it. A discount that expires today is a sales tactic, not a fit assessment.'],
        ],
        links: [
          ['/free/forge-readiness-check', 'Free readiness check, no sign-up'],
        ],
      },
    ],
    faqs: [
      ['Is a personal trainer better than a gym membership?', 'They buy different things. A membership pays for access to equipment. A trainer pays for a person’s attention during the session. If you already know what to do, the membership may be enough. If you do not, the trainer or a coach fills the gap.'],
      ['How much does the average gym membership cost?', 'NerdWallet reports a typical range of $10 to $100 a month, and quotes the Health & Fitness Association figure of $65 a month for average dues in 2023. We read both on 13 October 2026 and did not open the association’s report.'],
      ['Is online coaching cheaper than a personal trainer?', 'Per month it often is, but they are priced on different units. An hourly trainer scales with how often you meet. A monthly coaching rate covers the plan and check-ins for the whole week.'],
      ['Does supervised training work better than training alone?', 'In a 2024 meta-analysis of 34 trials in adults aged 60 and over (PMID 38647999), supervised groups gained somewhat more knee strength, with the same attendance. Both ways of training worked.'],
      ['Can I use a gym membership and an online coach together?', 'Yes. The coach writes and adjusts the plan and the membership gives you somewhere to do it. That is a common setup.'],
      ['What does Titan Forge offer?', `Online coaching from ${NUTRITION_ONLY} to ${PREMIUM}, a community and app tier at ${APP_COMMUNITY}, and in-person training at its gym in Meridian, near Lone Tree and Inverness. In-person pricing is confirmed when you apply.`],
    ],
    sources: [
      ['NerdWallet, guide to choosing a gym', URL_NERDWALLET, READ_ON],
      ['Thumbtack, personal trainers in Englewood, CO', URL_THUMBTACK, READ_ON],
      ['Sports Medicine 2024, supervised versus unsupervised exercise in older adults', pubmed('38647999'), READ_ON],
      ['Titan Forge Fitness, pricing', URL_PRICING, READ_ON],
    ],
    scope: SCOPE,
  },

  /* ------------------------------------------------------------------ 3 */
  '/tools/protein-calculator': {
    title: 'Protein Calculator: How Many Grams A Day?',
    metaTitle: 'Protein Calculator: Grams Per Day To Build Muscle — Titan Forge Fitness',
    eyebrow: 'Free Calculator',
    description: 'Enter your weight and goal for a daily protein range in grams, with each range tied to the study or position statement it comes from. Free, no sign-up, and your weight is not stored.',
    keywords: 'protein calculator, how much protein do i need, protein intake calculator, how much protein to build muscle, how much protein per day, protein for body recomposition, protein per pound',
    intent: 'tool',
    updated: UPDATED,
    shortAnswer: `Most people who lift need about 1.4 to 2.0 grams of protein per kilogram of body weight a day, which is 0.64 to 0.91 grams per pound. A 180-pound person lands between ${lift180.lowG} and ${lift180.highG} grams. Enter your weight and goal below for your own range. Each range comes from a named study or position statement, not from a supplement label.`,
    tool: {
      kind: 'protein',
      title: 'Daily protein range',
      goals: PROTEIN_GOALS,
      perMeal: PER_MEAL,
      kgPerLb: KG_PER_LB,
      noscript: 'The calculator needs JavaScript. Without it, the table of worked examples below gives the range for six common body weights.',
    },
    sections: [
      {
        id: 'how-it-works',
        heading: 'How does the calculator work?',
        paras: [
          'It multiplies your body weight in kilograms by a grams-per-kilogram range for the goal you pick. Pounds are converted at 0.4536 kilograms each. The ranges are the ones in the table below, each tied to the paper or position statement that states it.',
          'It uses the weight you type. The studies report protein per kilogram of body weight, so someone carrying a lot of extra weight may prefer to enter a goal weight. The studies do not settle that choice, so treat the result as a starting range, not a prescription.',
        ],
      },
      {
        id: 'where-ranges-come-from',
        heading: 'Where does each range come from?',
        paras: [
          'The adult Recommended Dietary Allowance of 0.8 g/kg is the floor for people who are not training. The International Society of Sports Nutrition position stand (PMID 28642676) says 1.4 to 2.0 g/kg a day is sufficient for most people who exercise, and that lean, resistance-trained people eating in a calorie deficit may need 2.3 to 3.1 g per kilogram of fat-free mass, not of total body weight, to hold on to muscle. This calculator asks only for body weight, so it has no fat-loss setting: applying that figure to total weight would overstate it.',
          'A pooled analysis of 49 trials with 1,863 people (PMID 28698222) found that protein supplements stopped adding muscle once total intake passed about 1.62 g/kg a day. For people over 65 the PROT-AGE group (PMID 23867520) advises at least 1.0 to 1.2 g/kg, and at least 1.2 g/kg for those who exercise.',
        ],
        grid: {
          caption: 'Grams of protein per kilogram of body weight per day, and the source for each',
          head: ['Goal', 'Range', 'Source'],
          rows: PROTEIN_GOALS.map((g) => [
            g.label,
            g.low === g.high ? `${g.low} g/kg` : `${g.low} to ${g.high} g/kg`,
            g.basis,
          ]),
        },
      },
      {
        id: 'worked-examples',
        heading: 'What does that look like at common body weights?',
        paras: [
          'The table is the calculator’s output for six body weights, so you can read your range without running it. Values are rounded to the nearest gram.',
        ],
        grid: {
          caption: 'Daily protein in grams, by body weight and goal',
          head: ['Body weight', 'General health', 'Lifting'],
          rows: proteinGridRows,
          note: 'Weight in pounds converted to kilograms at 0.4536, multiplied by the ranges in the sources table above. People over 65 use the adjusted ranges in the calculator.',
        },
      },
      {
        id: 'per-meal',
        heading: 'How should you spread protein across the day?',
        paras: [
          'The International Society of Sports Nutrition suggests about 0.25 grams per kilogram of body weight, or an absolute 20 to 40 grams, of high-quality protein per serving, spread roughly every 3 to 4 hours (PMID 28642676). For an 80-kilogram person that is about 20 grams.',
          'The same position stand says advice on the per-serving amount is mixed and depends on age and recent training. Treat 20 to 40 grams as a sensible target, not a threshold your muscles check.',
        ],
      },
      {
        id: 'is-more-better',
        heading: 'Is more protein always better?',
        paras: [
          'Not for building muscle. In the pooled analysis of 49 supplementation trials (PMID 28698222), total protein above about 1.62 g/kg a day gave no further gain in fat-free mass. The ISSN notes early evidence that very high intakes, above 3 g/kg, may help resistance-trained people lose fat, which is a narrow case.',
          'Not everyone agrees extra protein is needed. A 2007 review (PMID 18577776) reports that the US and Canadian dietary reference panel suggested no additional protein for healthy adults who exercise. Sports nutrition groups since then have recommended more for lifters, which is why the calculator shows the sports ranges and labels them.',
          'If you have kidney disease, ask your clinician before you raise protein.',
        ],
      },
      {
        id: 'what-it-cannot-do',
        heading: 'What can a calculator not tell you?',
        paras: [
          `It cannot set your calories, judge your food choices, or know your health history. Protein is one number in a plan. If food is where the plan keeps falling apart, Nutrition Only coaching is ${NUTRITION_ONLY} and the application costs nothing. Steve “Doc” Ginevan, PhD reviews every application before any call.`,
        ],
        links: [
          ['/coaching-intensive#apply', 'Apply for coaching'],
          ['/for/nutrition-coaching', 'Nutrition coaching'],
          ['/for/body-recomposition', 'Body recomposition coaching'],
        ],
      },
    ],
    faqs: [
      ['How much protein do I need per day?', 'It depends on your goal. The adult allowance is 0.8 g/kg of body weight. People who lift are advised 1.4 to 2.0 g/kg (PMID 28642676). For a 180-pound person that is 114 to 163 grams a day. The calculator on this page does the sum for your weight.'],
      ['How much protein per pound of body weight?', 'Multiply grams per kilogram by 0.4536. The 1.4 to 2.0 g/kg range for lifters is about 0.64 to 0.91 grams per pound of body weight.'],
      ['How much protein do I need for body recomposition?', 'Body recomposition means losing fat while keeping or building muscle, so the useful range is the lifting range of 1.4 to 2.0 g/kg of body weight (PMID 28642676). Lean lifters in a calorie deficit may need more, 2.3 to 3.1 g per kilogram of fat-free mass in the ISSN position stand, which needs a body-composition measurement the calculator does not ask for. A pooled analysis of supplementation trials saw no further muscle gain above about 1.62 g/kg of total intake (PMID 28698222).'],
      ['Do I need protein powder?', 'No. The total matters, not the source. Powder is a convenient way to reach a number. A pooled analysis of 49 trials (PMID 28698222) found that protein supplements added a small amount of muscle and strength during lifting programs, and that the extra stopped adding muscle once total intake passed about 1.62 g/kg a day.'],
      ['Is high protein safe?', 'For healthy adults the ranges on this page are within what position statements describe for exercising people. If you have kidney disease or another condition, ask your clinician first. This page does not give medical advice.'],
      ['Does the calculator store my weight?', 'No. Your weight is worked out in your browser and is not sent or saved. Like every page on this site, it is counted by the site’s analytics, and for this tool that includes which goal option was chosen.'],
    ],
    sources: [
      ['ISSN position stand: protein and exercise (2017), PMID 28642676', pubmed('28642676'), READ_ON],
      ['Protein supplementation and resistance training: meta-analysis (2018), PMID 28698222', pubmed('28698222'), READ_ON],
      ['PROT-AGE position paper on protein in older people (2013), PMID 23867520', pubmed('23867520'), READ_ON],
      ['Protein requirements during aging (2016), PMID 27529275', pubmed('27529275'), READ_ON],
      ['Dietary protein requirements in athletes (2007), PMID 18577776', pubmed('18577776'), READ_ON],
    ],
    scope: SCOPE,
  },

  /* ------------------------------------------------------------------ 4 */
  '/guides/what-to-expect-first-personal-training-session': {
    title: 'What To Expect At A First Personal Training Session, And What To Ask',
    metaTitle: 'What To Expect At A First Personal Training Session — Titan Forge Fitness',
    eyebrow: 'Beginner Guide',
    description: 'What usually happens at a first personal training session, why a trainer asks health questions first, what to bring, and the questions worth asking before you pay.',
    keywords: 'what to expect first personal training session, first session with a personal trainer, questions to ask a personal trainer, what to ask a personal trainer before hiring, first time personal training',
    intent: 'how-to',
    updated: UPDATED,
    shortAnswer: 'A good first session is mostly questions, a health screen and a few basic movements, not a punishing workout. Expect the trainer to ask about your goal, history, injuries and week, watch how you move, and agree a plan before you leave. JCC Denver, for example, describes its free first hour as a fitness assessment, an introduction to proper form and equipment use, and a program set-up (read 13 October 2026). At Titan Forge, coaching starts with an application that Steve “Doc” Ginevan, PhD reviews before any call.',
    sections: [
      {
        id: 'what-happens',
        heading: 'What usually happens in a first session?',
        paras: [
          'There is no single standard, so use this as a checklist, not a promise from any one gym. JCC Denver publishes what its free Foundations Program includes: a full fitness assessment, an introduction to proper form and equipment use, and a results-based training program set-up. It runs 60 minutes with a certified personal trainer.',
          'Most first sessions follow the same order. A conversation about your goal and your week comes first. Health questions come next. Then the trainer watches a handful of basic movements such as a squat, a hinge and a push, and finishes with a short, easy workout and an agreed plan. If you leave unable to say what you will do next week, ask for it in writing.',
        ],
      },
      {
        id: 'health-questions',
        heading: 'Why will the trainer ask health questions first?',
        paras: [
          'Because screening is how a trainer decides how hard to start. The American College of Sports Medicine updated its screening model in 2015 (PMID 26473759). Its roundtable proposed using three factors: your current level of physical activity, whether you have signs or symptoms or a known heart, metabolic or kidney condition, and how hard you plan to exercise.',
          'The same paper notes that exercise is safe for most people and that the older screening rules may have sent too many people to a doctor, which can become a barrier to starting. So expect questions, answer them honestly, and know that a clearance from your clinician may come first if you have symptoms or a diagnosed condition.',
        ],
      },
      {
        id: 'what-to-bring',
        heading: 'What should you bring and say?',
        bullets: [
          ['Shoes and clothes you can squat in.', 'Flat, stable shoes are the usual choice for lifting.'],
          ['Your goal in one sentence.', 'Not "get fit". Something like "get strong enough to lift without back pain" or "lose weight and keep my muscle".'],
          ['Injuries, surgeries and medicines.', 'Tell the trainer what hurts, what you avoid, and what your clinician has said. A trainer cannot diagnose it, and should not guess.'],
          ['Your real week.', 'Which days you can train, how long, and what usually breaks the plan. A plan built for the week you wish you had will fail.'],
          ['Two or three questions.', 'The list below is a start. Trainers expect questions.'],
        ],
      },
      {
        id: 'questions-to-ask',
        heading: 'What should you ask before you sign up?',
        ordered: [
          ['Which certification do you hold, and who accredits it?', 'The National Commission for Certifying Agencies publishes a directory of accredited certification programs. A trainer who can name theirs is easy to check.'],
          ['What will the first month look like?', 'A good answer describes sessions, a plan for the days between them, and when it will be reviewed.'],
          ['How do you track progress?', 'Weights, reps, photos, measurements or how you feel. Any of these is fine if there is one and it is written down.'],
          ['What falls outside what you do?', 'Someone who can name the boundary, such as injury treatment or medical nutrition, is safer than someone who claims to handle everything.'],
          ['What is the price, the package terms and the cancellation rule?', 'Get all three in writing. The JCC card, for example, says packages are non-transferable and non-refundable.'],
        ],
        links: [
          ['/guides/how-much-does-personal-training-cost-denver-tech-center', 'What personal training costs near the Denver Tech Center'],
        ],
      },
      {
        id: 'warning-signs',
        heading: 'What are the warning signs on day one?',
        bullets: [
          ['A guaranteed result by a date.', 'No trainer controls your sleep, stress or week. Titan Forge does not promise outcomes.'],
          ['Pressure to buy a large package today.', 'A discount that expires in an hour is a sales tactic. You can take the terms home.'],
          ['No questions about your health.', 'A session that skips screening skips the part that decides how hard to start.'],
          ['The same workout for everyone.', 'If you could swap your plan for the next client’s without anyone noticing, nothing was built for you.'],
          ['Diagnosing a pain.', 'Naming a cause for an injury is a clinician’s job. A trainer should refer you out.'],
        ],
      },
      {
        id: 'titan-forge-first-step',
        heading: 'What does the first step look like at Titan Forge?',
        paras: [
          'Coaching starts with an application, not a sales call. Steve “Doc” Ginevan, PhD reviews your goal, training history and schedule first, then recommends a starting point, which may be one-to-one coaching, a membership or free resources. Applying costs nothing.',
          'In the gym at 9780 S Meridian Blvd that means a coach watching your technique, setting the loads and keeping the session on track. There is no published price for in-person sessions; it is confirmed when you apply. You can also ask a question first by calling (720) 916-7235.',
        ],
        links: [
          ['/coaching-intensive#apply', 'Apply for coaching'],
          ['/contact', 'Contact Titan Forge Fitness'],
          ['/for/personal-training-englewood-centennial', 'Hours, drive times and location'],
        ],
      },
    ],
    faqs: [
      ['What happens at a first personal training session?', 'Usually a conversation about your goal and week, health questions, a check of a few basic movements, a short easy workout, and an agreed plan. JCC Denver describes its first hour as a fitness assessment, an introduction to form and equipment, and a program set-up.'],
      ['Will my first session be a hard workout?', 'It should not be. The first session sets a starting point, so expect screening and technique work first and a light workout last.'],
      ['Why does a trainer ask about my health?', 'Screening decides how hard to start. The American College of Sports Medicine’s 2015 model looks at your current activity, any signs, symptoms or known conditions, and the intensity you plan (PMID 26473759).'],
      ['What should I wear to a first session?', 'Clothes you can squat in and flat, stable shoes. Bring a water bottle and a list of any injuries or medicines.'],
      ['What should I ask a personal trainer before I hire them?', 'Their certification and who accredits it, what the first month looks like, how progress is tracked, what falls outside their scope, and the price, package terms and cancellation rule in writing.'],
      ['How do I check a trainer’s certification?', 'Ask which one they hold, then see whether it appears in the directory of accredited programs kept by the National Commission for Certifying Agencies.'],
      ['How do I start at Titan Forge?', 'Apply on the site. Steve Ginevan, PhD reviews your goal, history and schedule before any call and recommends a starting point. Applying costs nothing.'],
    ],
    sources: [
      ['JCC Denver, personal training and the Foundations Program', URL_JCC, READ_ON],
      ['ACSM exercise preparticipation health screening (2015), PMID 26473759', pubmed('26473759'), READ_ON],
      ['National Commission for Certifying Agencies', URL_NCCA, READ_ON],
    ],
    scope: SCOPE,
  },
};
