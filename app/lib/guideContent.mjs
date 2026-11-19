/* Guide pages: one source of truth for both audiences.

   The site previously authored the crawler view (a HTML string in
   staticRouteContent.mjs) and the human view (JSX in page-more.jsx) separately.
   That is how /coaching ended up serving 14 FAQ answers to an AI engine and 2 to
   the buyer who clicked the citation. These guides are authored once, here.
   staticRouteContent.mjs renders them to crawler HTML; build-app-bundle.mjs
   injects the same object as globalThis.TITAN_GUIDES for the React view.

   Prices are never written into copy. They are read from the offer catalog at
   build time, so a catalog change moves every surface at once.

   Content rules these pages are held to, learned on #243:
     no invented specifics, no guaranteed-outcome language, nothing disparaging
     about other providers, no price literals, and a scope-of-practice notice on
     anything a reader could mistake for medical advice. */

import { STANDARD, PREMIUM, NUTRITION_ONLY, COMMUNITY, APP_COMMUNITY } from './offerCatalog.mjs';
import { MAGNET_GUIDES } from './guideContentMagnets.mjs';
import { GBP_URL, GYM_HOURS_TEXT } from './localBusinessSchema.mjs';

export const GUIDES = {
  '/guides/how-much-does-an-online-fitness-coach-cost': {
    title: 'How Much Does An Online Fitness Coach Cost?',
    metaTitle: 'How Much Does An Online Fitness Coach Cost? — Titan Forge Fitness',
    eyebrow: 'Cost Guide',
    description: 'What online fitness coaching actually costs, what changes the number, what is usually included at each level, and how to tell whether a quote is worth it.',
    keywords: 'how much does an online fitness coach cost, online fitness coaching cost, online coach price, personal trainer cost per month, fitness coaching pricing',
    intent: 'cost',
    shortAnswer: `Online fitness coaching is normally sold as a monthly rate rather than per session. At Titan Forge the published rates are ${NUTRITION_ONLY} for nutrition-only coaching, ${STANDARD} for standard 1:1 coaching, and ${PREMIUM} for premium 1:1 coaching, with lower-cost community options at ${COMMUNITY} and ${APP_COMMUNITY}. Across the wider market the range is wide, and what moves the number is how much of a real person's attention and judgment the plan includes.`,
    sections: [
      {
        id: 'what-you-pay-for',
        heading: 'What The Monthly Number Is Actually Buying',
        paras: [
          'Two coaching offers at very different prices are usually not selling different amounts of training knowledge. They are selling different amounts of human attention. That is the variable worth checking before you compare any two numbers.',
          'At the low end you are typically buying a program plus a place to log it, with support that is templated or community-based. At the high end you are buying individual programming, individual nutrition targets, video review of your lifts, and a named person reading your check-in every week and changing something because of it.',
          'Neither is a rip-off. They answer different questions. The mistake is paying for weekly human judgment when what you needed was structure, or buying structure when the thing you have failed at four times is knowing what to change.',
        ],
        bullets: [
          ['Community or app tier', 'A plan, a place to track it, and group-level support. Cheapest, and enough when you can self-correct.'],
          ['Nutrition-only coaching', 'Calorie and protein targets, habit work, and check-ins on food, without training programming.'],
          ['Standard 1:1 coaching', 'Individual programming and nutrition, weekly check-ins, lifting video review, and plan adjustments.'],
          ['Premium 1:1 coaching', 'The same, with more contact, faster response, and more hands-on involvement.'],
          ['In-person personal training', 'Priced per session rather than per month, so the total depends on how often you meet.'],
        ],
      },
      {
        id: 'what-moves-the-price',
        heading: 'Seven Things That Move The Price',
        ordered: [
          ['Contact frequency', 'Weekly written check-ins cost less to deliver than daily access. Ask what response time is actually promised, not what is implied.'],
          ['Whether nutrition is included', 'Training-only coaching is cheaper. Nutrition coaching is a different kind of work and, for most adults, is where the result actually comes from.'],
          ['Whether a human reviews video', 'Automated form scoring is cheap. A coach watching your set and writing you a cue is not.'],
          ['How individual the programming is', 'A plan selected from a library costs less than a plan written for your equipment, history, injuries, and available days.'],
          ['Commitment length', 'Longer commitments are usually discounted, which is good value if the fit is right and expensive if it is not. Ask what happens if you need to stop.'],
          ['The coach experience and credentials', 'Experience and qualifications carry a real premium. They do not guarantee an outcome, and anybody who says otherwise is telling you something useful about their judgment.'],
          ['Local market and delivery mode', 'In-person training carries the cost of the room and the hour. Online coaching does not, which is most of why the two are priced on different units.'],
        ],
      },
      {
        id: 'per-session-vs-monthly',
        heading: 'Why You Cannot Compare A Session Rate To A Monthly Rate',
        paras: [
          'A personal trainer is normally priced per session, so the cost scales with how often you meet. Online coaching is normally a monthly rate covering programming, check-ins, and messaging regardless of how many times you train.',
          'The honest comparison is not per unit. It is total monthly outlay against what each one covers. Two in-person sessions a week and no nutrition support is a different purchase from a monthly coaching rate that includes programming, nutrition, and weekly review, even where the two totals land close together.',
          'Work out which of those two your own problem sits in before you compare the numbers at all. There is a fuller breakdown on the comparison page.',
        ],
        links: [
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer'],
          ['/pricing', 'Current Titan Forge plans and rates'],
          ['/guides/how-much-does-personal-training-cost-denver-tech-center', 'What personal training costs near the Denver Tech Center'],
          ['/guides/online-coaching-prices-compared', 'Online coaching prices compared, each read from the coach\u2019s own page'],
        ],
      },
      {
        id: 'is-it-worth-it',
        heading: 'How To Tell Whether A Quote Is Worth It',
        paras: [
          'Price alone tells you very little. A higher number does not guarantee a better outcome, and a lower number is not a saving if nothing changes.',
          'The useful test is whether the service addresses the specific thing that has stopped you before. Write down what has stopped you before, in one sentence, then ask each provider how their offer handles that exact sentence. Vague answers are the most reliable warning sign in this market.',
        ],
        bullets: [
          ['Ask what is included, in writing', 'Nutrition, the sessions you do alone, messaging between check-ins. Ambiguity here is the most common source of regret.'],
          ['Ask what gets reviewed, and how often', 'If nothing is named, nothing is reviewed.'],
          ['Ask what happens when progress stalls', 'A good answer describes a process and a timescale.'],
          ['Ask what falls outside their scope', 'Someone who can name the boundary is safer than someone who claims to handle everything.'],
          ['Be wary of guaranteed results', 'No coach controls your sleep, your stress, or your week. Titan Forge does not promise outcomes.'],
          ['Be wary of pressure to decide today', 'A discount that expires in an hour is a sales tactic, not a fit assessment.'],
        ],
      },
      {
        id: 'cheaper-options',
        heading: 'If The Number Is Out Of Reach Right Now',
        paras: [
          'Coaching is not the only step available, and buying it before you are ready to use it is a poor purchase at any price.',
          'A free structured plan you actually follow for eight weeks will teach you more about what is really stopping you than a month of coaching you cannot fully engage with. Community and app tiers exist for exactly this gap, and Titan Forge publishes its cheaper paths alongside its coaching rates rather than hiding them.',
          'If cost is the only barrier, ask. Prepay and referral options are published, and applying costs nothing.',
        ],
        links: [
          ['/free/forge-readiness-check', 'Free readiness check, no sign-up'],
          ['/resources/how-the-coaching-prepay-discount-works', 'How the prepay discount works'],
          ['/resources/how-titan-forge-referral-program-works', 'How the referral program works'],
          ['/programs', 'Structured programs'],
        ],
      },
      {
        id: 'titan-rates',
        heading: 'What Titan Forge Charges',
        paras: [
          `Titan Forge publishes its rates rather than quoting privately. Nutrition-only coaching is ${NUTRITION_ONLY}. Standard 1:1 coaching is ${STANDARD}. Premium 1:1 coaching is ${PREMIUM}. The community tier is ${COMMUNITY} and the community-with-app tier is ${APP_COMMUNITY}.`,
          'In-person training near Parker and Englewood, Colorado is priced separately because it is sold per session rather than per month.',
          'Applications are reviewed by Steve "Doc" Ginevan, PhD, before any call, and fit is assessed before a plan is discussed. If coaching is not the right step, that is a normal outcome of the conversation.',
        ],
        links: [
          ['/pricing', 'Plans and pricing'],
          ['/coaching', 'What coaching includes'],
          ['/coaching-intensive#apply', 'Apply for coaching'],
        ],
      },
    ],
    faqs: [
      ['How much does an online fitness coach cost per month?', `It varies widely across the market because the amount of human attention included varies widely. Titan Forge publishes its own rates: ${NUTRITION_ONLY} for nutrition-only coaching, ${STANDARD} for standard 1:1 coaching, and ${PREMIUM} for premium 1:1 coaching, with community options at ${COMMUNITY} and ${APP_COMMUNITY}.`],
      ['Is online coaching cheaper than a personal trainer?', 'Usually the monthly total is lower than training in person several times a week, because online coaching does not carry the cost of the room and the hour. They are priced on different units though, so compare total monthly outlay against what each one covers rather than comparing a session rate to a monthly rate.'],
      ['Why do some coaches not publish their prices?', 'Some prefer to quote after a call so the price can reflect the scope. That is defensible, but it makes comparison harder for the buyer. Titan Forge publishes its rates on the pricing page.'],
      ['Does a more expensive coach get better results?', 'No. Price tracks the amount of attention and the coach experience included, not the outcome. Fit, what is included, what you actually do, and your circumstances matter more, and no coach controls your sleep, stress, or schedule.'],
      ['What is usually included in online coaching?', 'At the 1:1 level, individual programming, nutrition targets, lifting video review, weekly check-ins, and adjustments to the plan based on what the check-in shows. Below that level, expect a plan and group-level support rather than individual review.'],
      ['Is there a cheaper way to start?', 'Yes. Community and app tiers, structured programs, and the free readiness check all exist for people who are not ready to buy 1:1 coaching. Following one structured plan for eight weeks also tells you what is really stopping you, which makes any later purchase far more useful.'],
      ['Are there discounts?', 'Titan Forge publishes a prepay discount and a referral program rather than running expiring offers. Details are on the resource pages for each.'],
      ['Do I have to commit for a long period?', 'Ask any provider this before paying, including us. What matters is what happens if you need to pause or stop, and whether that is written down.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },

  '/guides/is-online-fitness-coaching-worth-it': {
    title: 'Is Online Fitness Coaching Worth It?',
    metaTitle: 'Is Online Fitness Coaching Worth It? An Honest Assessment — Titan Forge Fitness',
    eyebrow: 'Honest Assessment',
    description: 'An honest assessment of when online fitness coaching is worth paying for, when it is not, what it cannot fix, and how to decide without guessing.',
    keywords: 'is online fitness coaching worth it, is an online coach worth it, do I need a fitness coach, online coaching worth the money, fitness coach worth it',
    intent: 'evaluative',
    shortAnswer: 'It is worth it when what you are missing is knowing what to do and what to change, and you will actually follow a plan once you have one. It is not worth it when you have never followed a structured plan long enough to find out what is actually stopping you, when the real obstacle is something coaching cannot touch, or when you are hoping the purchase itself will create motivation. The honest version of this answer disqualifies a lot of people, including people we would otherwise sell to.',
    sections: [
      {
        id: 'worth-it-when',
        heading: 'When It Is Worth Paying For',
        paras: [
          'Coaching earns its cost when it removes a decision you keep getting wrong, or a delay you keep repeating. The clearest signals are all patterns rather than single bad weeks.',
        ],
        bullets: [
          ['The same plateau keeps returning.', 'You train consistently, the numbers stopped moving months ago, and you do not know whether to add volume, cut it, change the movement, or eat more. That is a judgment problem, and judgment is the product.'],
          ['You train well but plan badly.', 'You do the sessions you are given. Left to write them yourself, you drift, repeat what you enjoy, and avoid what you need.'],
          ['Nutrition is the recurring failure.', 'Weekdays are controlled, weekends undo them, and the month nets flat. Training advice will not fix this.'],
          ['Your week is genuinely unpredictable.', 'Travel, shift work, or a job that eats evenings. A fixed plan keeps breaking and you keep starting over.'],
          ['You have a deadline or a constraint.', 'An event, a medical context that has been cleared by a clinician, or a body-composition goal with a real date on it.'],
          ['You want to stop needing it.', 'You want the reasoning, not just the plan. This is the best reason on the list.'],
        ],
      },
      {
        id: 'not-worth-it-when',
        heading: 'When It Is Not Worth Paying For',
        paras: [
          'This is the section most coaching pages leave out, and it is the one that saves people money.',
        ],
        bullets: [
          ['You have never run one structured plan to completion.', 'Do that first. Eight consistent weeks of anything reasonable will tell you what is really stopping you, and will make any later coaching purchase far more useful. Buying coaching to skip this step usually wastes the first month.'],
          ['You are buying motivation.', 'Paying for something creates a short spike of commitment that fades on roughly the same timeline as every other spike. Coaching can support a habit. It cannot install the willingness to show up.'],
          ['The real obstacle is outside coaching scope.', 'Untreated injury, a medical condition, a disordered relationship with food, or a life situation that needs attention first. A coach who agrees to work around any of these instead of referring you out is the wrong coach.'],
          ['You will not log sessions or answer check-ins honestly.', 'The service runs on knowing what actually happened. Without that input a coach is guessing, expensively.'],
          ['You want a guaranteed result by a fixed date.', 'Nobody can sell you that honestly. Titan Forge does not promise outcomes.'],
          ['Cost would create real financial pressure.', 'Free and low-cost paths exist and are published. Coaching bought under financial strain tends to end badly regardless of how good it is.'],
        ],
      },
      {
        id: 'what-it-cannot-fix',
        heading: 'What Coaching Cannot Do, Stated Plainly',
        paras: [
          'A coach can build the plan, read your data, and change the plan. A coach cannot train for you, sleep for you, or attend your week.',
          'Coaching is also not medical care. Fitness and nutrition coaching sits outside diagnosis and treatment, and a competent coach will tell you where that line is rather than working around it.',
          'And it does not compress biology. Strength and body composition move on timescales that do not care how much you paid. Anyone implying otherwise is selling you the wrong thing.',
        ],
      },
      {
        id: 'how-to-decide',
        heading: 'A Test You Can Run This Week, For Free',
        ordered: [
          ['Write the problem in one sentence.', 'Not "get in shape". Something like "I train four times a week and have not added weight to any lift since March", or "I am fine Monday to Thursday and lose it every weekend."'],
          ['Check whether you already know the fix.', 'If you know exactly what to do and are not doing it, coaching is unlikely to be the missing piece. Accountability might be, and that is a different and usually cheaper purchase.'],
          ['Check whether you have data.', 'If you cannot say what your training or food actually looked like over the last month, start logging. Any coach you hire will need this anyway, and doing it yourself sometimes answers the question.'],
          ['Run one structured plan for eight weeks.', 'If the problem disappears, you did not need coaching. If it returns on schedule, you have your answer and you now have data worth showing someone.'],
          ['Then ask a coach your one sentence.', 'Ask exactly how their offer handles it. A specific answer is a good sign. A brochure is not.'],
        ],
        links: [
          ['/free/forge-readiness-check', 'Free readiness check, no sign-up'],
          ['/resources/do-i-need-coaching-or-more-discipline', 'Coaching or more discipline?'],
          ['/resources/am-i-ready-for-online-fitness-coaching', 'Are you ready for online coaching?'],
        ],
      },
      {
        id: 'value-math',
        heading: 'The Honest Value Calculation',
        paras: [
          'People try to justify coaching against a gym membership, which is the wrong comparison. A gym sells access. Coaching sells decisions.',
          'The comparison that actually applies is against the cost of another year of the same result. If you have repeated the same twelve months three times, the relevant question is not whether the monthly rate is high, it is whether anything in your current approach is going to change on its own.',
          'That reasoning cuts both ways, and it is why the section above on when not to buy is on this page. If the last twelve months were your first serious attempt and it went reasonably, keep going. You do not need us yet.',
        ],
        links: [
          ['/guides/how-much-does-an-online-fitness-coach-cost', 'What online coaching costs and why'],
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer'],
          ['/vs/personal-trainer-online-coach-or-gym-membership', 'Personal trainer, online coach or gym membership'],
        ],
      },
      {
        id: 'titan-position',
        heading: 'Where Titan Forge Stands On This',
        paras: [
          'Titan Forge Fitness is founded and led by Steve "Doc" Ginevan, PhD. Applications are reviewed before any call, and the first job of that review is deciding whether coaching is the right step at all.',
          'People get told no. That is not a scarcity tactic, it is the only way the above can be written honestly on a page that also sells the service. Rates are published on the pricing page rather than quoted after a call, and applying costs nothing.',
        ],
        links: [
          ['/coaching', 'What coaching actually includes'],
          ['/pricing', 'Plans and pricing'],
          ['/coaching-intensive#apply', 'Apply for coaching'],
        ],
      },
    ],
    faqs: [
      ['Is online fitness coaching worth the money?', 'It is worth it when what you are missing is knowing what to do or what to change, and you will follow a plan once you have one. It is not worth it if you have never run a structured plan long enough to find out what is actually stopping you, or if you are hoping the purchase itself will create motivation.'],
      ['Is an online coach worth it for a beginner?', 'Sometimes, but a beginner often gets more from a small block of in-person sessions to learn the lifts safely, or from following one structured beginner plan consistently. Online coaching becomes more valuable once you can train on your own and the problem moves to programming and nutrition.'],
      ['How long before online coaching is worth it?', 'Judge the process before the outcome. Within a few weeks you should be able to see whether check-ins are being read, whether the plan changes when something is not working, and whether you understand why. Body composition and strength move on slower timescales than that and no coach controls the pace.'],
      ['Can I get the same result for free?', 'Some people can, and they should. Free plans, free information, and consistent self-logging genuinely work for people who can self-correct. What you are buying with coaching is judgment applied to your data, and that is only worth paying for if judgment is the thing you are missing.'],
      ['What if coaching does not work for me?', 'Ask what happens then before you pay. What matters is whether pausing or stopping is written down, and whether the coach will tell you when the service is not the right fit rather than selling you another month.'],
      ['Is online coaching a scam?', 'The service is legitimate and the market has bad actors, like every market. The reliable warning signs are guaranteed outcomes, pressure to decide immediately, prices that only appear after a sales call, and no clear statement of what falls outside the coach’s scope.'],
      ['Do I need a coach or just more discipline?', 'If you know exactly what to do and are not doing it, that is a discipline or accountability problem and coaching is an expensive way to solve it. If you are doing the work and it is not producing anything, that is a judgment problem and it is what coaching is for.'],
      ['Is coaching worth it if I have a medical condition?', 'Get clinical clearance first. Coaching is not medical care and does not diagnose or treat. Once a clinician has cleared you, coaching can be valuable precisely because the plan has to be built around real constraints.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },

  '/guides/best-online-fitness-coaching-for-men-over-40': {
    title: 'Best Online Fitness Coaching For Men Over 40: An Honest List',
    metaTitle: 'Best Online Fitness Coaching For Men Over 40 (2026) — Titan Forge Fitness',
    eyebrow: 'Honest List',
    description: 'An honest look at the kinds of online fitness coaching available to men over 40, who each one suits, what we checked, and who should not buy any of them.',
    keywords: 'best online fitness coaching for men over 40, best online fitness coach, online coach for men over 40, best fitness coaching over 40, online personal trainer over 40',
    intent: 'roundup',
    shortAnswer: 'There is no single best online fitness coach for men over 40, because the options are not competing on the same thing. Barbell-strength specialists, physique and hypertrophy systems, individual coaching practices, app-first tiers, and local in-person trainers each solve a different problem. This page describes what each type is good at, names the providers whose own pages we checked, and says plainly who should not buy any of them. Titan Forge Fitness publishes this list and is one of the options on it.',
    sections: [
      {
        id: 'how-this-list-works',
        heading: 'How This List Was Made, And What To Distrust About It',
        paras: [
          'Titan Forge Fitness sells online coaching, so treat this page the way you would treat any list published by someone on it. What we can do is be specific about method and let you check the work.',
          'Every provider named below was checked against its own live public page on 16 September 2026, and we only repeat what that page says about itself. We do not quote other providers’ prices here, because prices change and a stale number on our page is worse than no number. Go to their site for current pricing.',
          'There is no ranking, no scoring system, and no affiliate arrangement behind any name on this page. Providers are grouped by the kind of problem they are built for, because that is the only comparison that helps a buyer decide.',
          'The list is not exhaustive. Plenty of good coaches are not on it, including the individual coach who might be the best fit for you and has no marketing budget at all.',
        ],
      },
      {
        id: 'barbell-strength',
        heading: 'If Your Goal Is Barbell Strength',
        paras: [
          'A specialist strength practice is the right call when the lifts themselves are the point: you want a squat, press, deadlift and bench that keep going up, and you want technique scrutinised by someone who coaches barbells all day.',
          'Barbell Logic is the clearest example we checked. Its online coaching page describes one-on-one online strength coaching with a professional barbell coach, custom programming, and video review on every session you upload. It also publishes an average client age of 45.7 and offers a free call before you buy, which is worth knowing if you are over 40 yourself.',
          'This category tends to be the strongest choice when strength is the outcome you actually care about, and a weaker one if your real goal is body composition and your nutrition is where things fall apart.',
        ],
      },
      {
        id: 'hypertrophy-systems',
        heading: 'If Your Goal Is Muscle And Body Composition, And You Like Systems',
        paras: [
          'Some providers are built around a published training and diet methodology, with apps that deliver it and a 1:1 tier layered on top. If you like reading the reasoning and following a system, this category fits well.',
          'Renaissance Periodization is the example we checked. Its coaching page describes 1:1 coaching alongside its hypertrophy and diet applications, and positions its coaches as building the system around your life. The apps mean you can start cheaply and add a human later, which is a genuinely useful on-ramp.',
          'The trade to understand is that a strong published system is a strong default, not an individual plan. If your constraints are unusual, make sure the tier you buy actually includes a person who will change things for you.',
        ],
      },
      {
        id: 'individual-practices',
        heading: 'If You Want One Named Coach Who Knows Your Week',
        paras: [
          'Small individual practices sell something the larger platforms structurally cannot: the same person reads every check-in, and there is no assignment queue between you and them.',
          'Titan Forge Fitness is ours. It is founded and led by Steve "Doc" Ginevan, PhD, it runs online coaching worldwide and in-person training near Parker and Englewood, Colorado, and it publishes its rates rather than quoting after a sales call. Applications are reviewed before any call and people do get told coaching is not the right step.',
          'Gains From Geebs is a separate brand run by Kris Oddo, NASM-CPT, which we work alongside. Its site describes 1:1 online fitness coaching covering training, nutrition and accountability, with no assistants and no copy-paste programming, and a free application.',
          'The honest weakness of this category is capacity. One person can only carry so many clients, so availability moves, and a practice that always has room is telling you something either good or bad depending on why.',
        ],
        links: [
          ['/coaching', 'What Titan Forge coaching includes'],
          ['/pricing', 'Titan Forge plans and rates'],
        ],
      },
      {
        id: 'app-first',
        heading: 'If You Are Not Ready To Pay For A Person Yet',
        paras: [
          'App-first and community tiers give you a plan, a place to log it, and group-level support, at a fraction of 1:1 pricing. For a man over 40 who has never run a structured plan to completion, this is frequently the correct first purchase and the one that saves the most money.',
          'The reason to start here is diagnostic as much as financial. Eight consistent weeks of any reasonable plan tells you what is actually stopping you. If the plan works, you did not need coaching. If the same problem returns on schedule, you now know what to ask a coach, and you have data worth showing them.',
          'Titan Forge publishes its own community and app tiers next to its coaching rates rather than hiding them, for this reason.',
        ],
        links: [
          ['/programs', 'Structured programs'],
          ['/free/forge-readiness-check', 'Free readiness check'],
        ],
      },
      {
        id: 'local-trainer',
        heading: 'If The Room Is The Problem, Not The Plan',
        paras: [
          'None of the online options above put a person next to you. If you have never trained with a barbell, want hands-on cueing and a spotter, are returning after a long layoff or an injury that a clinician has cleared, or simply need a booked appointment to make training happen, a local trainer beats every online option on this page.',
          'This is also the category most often skipped by men over 40 who are self-conscious about starting, which is unfortunate, because it is the category built for exactly that.',
        ],
        links: [
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer, in detail'],
          ['/for/parker-personal-training', 'In-person training near Parker and Englewood'],
          ['/guides/what-to-expect-first-personal-training-session', 'What to expect at a first personal training session'],
        ],
      },
      {
        id: 'how-to-choose',
        heading: 'How To Choose Between Them',
        ordered: [
          ['Name the problem in one sentence.', 'Not "get in shape". Something like "I train four times a week and no lift has moved since March", or "weekdays are fine and weekends undo them." The sentence points at the category.'],
          ['Match the category to the sentence.', 'Lifts not moving points at strength specialists. Weekends undoing the week points at nutrition-inclusive coaching. Never finished a plan points at the app-first tier. Never touched a barbell points at a local trainer.'],
          ['Check the tier, not the brand.', 'Most providers sell several tiers and only some include a human changing your plan. Confirm which one you would actually be buying.'],
          ['Ask each one your sentence, verbatim.', 'A specific answer is a good sign. A brochure is not. This is the single most useful five minutes in the whole process.'],
          ['Check what falls outside their scope.', 'Anyone who claims to handle injuries, medical conditions and disordered eating alongside your training is the wrong answer regardless of price.'],
          ['Discount anyone who guarantees an outcome.', 'No coach controls your sleep, your stress or your week. A guarantee tells you about their judgment, not your result.'],
        ],
      },
      {
        id: 'over-40-specifics',
        heading: 'What Actually Changes After 40',
        paras: [
          'Most of what you read about training over 40 is either fatalism or denial. The principles do not change. What tends to need more respect is recovery, joint tolerance, warm-up quality, sleep, and the accumulated stress of a life with more obligations in it than a 25-year-old has.',
          'Practically, that means a plan you can repeat beats a plan that is maximally hard, protein and sleep stop being optional details, and the ability to adjust around a bad week matters more than it did twenty years ago. Any of the categories above can do this. The ones that cannot are the ones that hand you a fixed plan and never look at it again.',
          'It also means the medical boundary matters more. More readers at this age are managing something real, and coaching is not medical care.',
        ],
        links: [
          ['/for/men-over-40', 'Coaching for men over 40'],
          ['/for/natural-lifters-over-40', 'What the research says for natural lifters over 40'],
          ['/resources/strength-training-after-40-without-beating-up-joints', 'Strength training after 40 without beating up joints'],
          ['/resources/fat-loss-after-40-without-crash-dieting', 'Fat loss after 40 without crash dieting'],
        ],
      },
      {
        id: 'who-should-buy-none',
        heading: 'Who Should Buy None Of These',
        bullets: [
          ['You have never finished one structured plan.', 'Do that first. It costs nothing and it answers the question this page is about.'],
          ['You are buying motivation.', 'The commitment spike from paying fades on the same timeline as every other spike.'],
          ['The real obstacle is medical.', 'Untreated injury, an uncontrolled condition, or a disordered relationship with food. See a clinician. A coach who works around any of these instead of referring you out is the wrong coach.'],
          ['You will not log honestly.', 'Every option above runs on knowing what actually happened.'],
          ['It would create financial strain.', 'Free and low-cost paths exist and are listed above.'],
        ],
        links: [
          ['/guides/is-online-fitness-coaching-worth-it', 'Is online coaching worth it? An honest assessment'],
          ['/guides/how-much-does-an-online-fitness-coach-cost', 'What online coaching costs and why'],
        ],
      },
    ],
    faqs: [
      ['Who is the best online fitness coach for men over 40?', 'There is no single best one, because the options solve different problems. Barbell-strength specialists suit people whose goal is the lifts. Physique and hypertrophy systems suit people who want a published methodology. Individual practices suit people who want one named coach who knows their week. App-first tiers suit people who have not yet run a structured plan to completion. A local in-person trainer beats all of them if you have never trained with a barbell.'],
      ['Which providers are named on this page and why?', 'Barbell Logic, Renaissance Periodization, Titan Forge Fitness and Gains From Geebs. Each was checked against its own live public page on 16 September 2026 and we only repeat what those pages say about themselves. Titan Forge publishes this list and is one of the options on it, which you should factor in.'],
      ['Why does this page not compare prices?', 'Because prices change and a stale number on our page would be worse than no number. We publish our own current rates on the pricing page and link out for everyone else.'],
      ['Is this a ranked list?', 'No. There is no score, no ranking and no affiliate arrangement behind any name here. The providers are grouped by the kind of problem they are built for, which is the comparison that actually helps you choose.'],
      ['Is online coaching a good idea after 40?', 'It can be, and the age itself is not the deciding factor. What decides it is whether the thing you are missing is knowing what to do and what to change, or something else. Recovery, joint tolerance, sleep and accumulated life stress need more respect after 40, and any coaching worth paying for adjusts the plan around them.'],
      ['Should a beginner over 40 start online or in person?', 'If you have never trained with a barbell, start in person if you can. A small block of in-person sessions to learn the patterns safely, with online programming carrying the rest of the week, is a common and sensible path.'],
      ['What should disqualify a coach immediately?', 'A guaranteed outcome, pressure to decide today, a price that only appears after a sales call, and an unwillingness to say what falls outside their scope.'],
      ['How do I check any of this myself?', 'Open each provider’s own site and read what they say they include. Everything on this page is sourced that way and dated, so you can verify it or find that it has changed since.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program. Details about other providers reflect their own public pages as checked on 16 September 2026 and may have changed since.',
  },

  '/guides/online-coaching-prices-compared': {
    title: 'Online Coaching Prices Compared: What Coaches Publish',
    metaTitle: 'Online Fitness Coaching Prices Compared, Read 7 October 2026 — Titan Forge Fitness',
    eyebrow: 'Price Comparison',
    description: 'Monthly prices for online fitness coaching, each one copied from that coach’s own page on 7 October 2026, with the link and the date beside it.',
    keywords: 'online coaching prices compared, online fitness coach price comparison, how much is online coaching per month, online personal trainer cost, coaching price list',
    intent: 'cost',
    updated: '2026-10-07',
    shortAnswer: `Six coaches publish a monthly price on their own pages, and the rates run from $129 to $479 a month. Titan Forge publishes ${NUTRITION_ONLY} for nutrition only, ${STANDARD} for standard 1:1 coaching, ${PREMIUM} for premium, and ${APP_COMMUNITY} for the app and community. Every outside price below was read from that coach’s own page on 7 October 2026, and the link is beside it.`,
    sections: [
      {
        id: 'published-prices',
        heading: 'What do online coaches publish as a monthly price?',
        paras: [
          'On 7 October 2026 we opened each coach’s own page and copied the number it shows. Six coaches had a clear monthly price on the page. A coach whose page showed no clear monthly number is left out rather than guessed. Nine rates, from $129/mo to $479/mo, passed that test.',
          'Read the table across: the coach, what the price covers, the price, and the page we read it from. Prices change without notice, so if a number on a coach’s page today differs from this table, the coach’s page is right and ours is out of date.',
        ],
        table: {
          head: ['Coach', 'What the price covers', 'Where we read it'],
          rows: [
            ['Stronger By Science', 'Comprehensive coaching, training and nutrition', '$329/mo', 'https://www.strongerbyscience.com/coaching/', '2026-10-07'],
            ['Stronger By Science', 'Training-only coaching', '$249/mo', 'https://www.strongerbyscience.com/coaching/', '2026-10-07'],
            ['Stronger By Science', 'Sport nutrition coaching', '$189/mo', 'https://www.strongerbyscience.com/coaching/', '2026-10-07'],
            ['3D Muscle Journey', 'Off-season and recreational coaching', '$400/mo', 'https://www.3dmusclejourney.com/coaching', '2026-10-07'],
            ['3D Muscle Journey', 'Training-only or nutrition-only coaching', '$350/mo', 'https://www.3dmusclejourney.com/coaching', '2026-10-07'],
            ['Fitomics', 'Fitness and nutrition bundle, 6-month minimum', '$479/mo', 'https://www.fitomics.com/coaching', '2026-10-07'],
            ['Future', '1:1 personal training coaching, after a $50 first month', '$199/mo', 'https://future.co/', '2026-10-07'],
            ['Trainwell', 'Unlimited 1:1 training, billed in 3-month increments', '$149/mo', 'https://www.trainwell.net/', '2026-10-07'],
            ['Precision Nutrition', '1:1 nutrition coaching, one month at a time', '$129/mo', 'https://www.precisionnutrition.com/1-to-1-coaching-offer/', '2026-10-07'],
          ],
        },
      },
      {
        id: 'titan-prices',
        heading: 'What does Titan Forge charge, and what is in each price?',
        paras: [
          'Titan Forge Fitness is our own business, so read this section as a seller’s list. The four rates below are the ones on our pricing page, which we read again on 7 October 2026. Rates are published up front rather than quoted after a call. If the pricing page and this page ever disagree, the pricing page is the one to trust.',
          'The two coaching rates differ by how you reach your coach: premium includes scheduled video calls, and standard uses phone or pre-recorded video check-ins. Nutrition-only coaching has no training plan. The app and community rate includes programming and accountability without 1:1 coaching.',
        ],
        table: {
          head: ['Titan Forge plan', 'What the price covers', 'Where we read it'],
          rows: [
            ['Premium Coaching', 'Scheduled video calls', PREMIUM, 'https://titanforgefit.com/pricing', '2026-10-07'],
            ['Standard Coaching', 'Phone or pre-recorded video check-ins', STANDARD, 'https://titanforgefit.com/pricing', '2026-10-07'],
            ['Nutrition Only', 'Nutrition coaching without a training plan', NUTRITION_ONLY, 'https://titanforgefit.com/pricing', '2026-10-07'],
            ['App + Community', 'Programming and accountability without 1:1 coaching', APP_COMMUNITY, 'https://titanforgefit.com/pricing', '2026-10-07'],
          ],
        },
        links: [
          ['/pricing', 'Titan Forge plans and rates'],
          ['/coaching', 'What coaching includes'],
        ],
      },
      {
        id: 'why-prices-differ',
        heading: 'Why can the same monthly number cost different amounts?',
        paras: [
          'Three rows in the table carry a billing rule that changes what you pay at the start. Fitomics lists $479/mo with a 6-month minimum, so the commitment is about six times the monthly figure. Trainwell lists $149/mo billed in 3-month increments, so you pay for three months at once. Future lists $50 for the first month and then $199/mo, with a full refund if you cancel within 30 days.',
          'None of that makes a price good or bad. It means the number in a headline is not always the number on your first bill. Before comparing two coaches, write down the monthly rate, the minimum term, and what you pay on day one.',
        ],
      },
      {
        id: 'unpublished-prices',
        heading: 'Which coaches do not publish a price?',
        paras: [
          'Some coaches keep the price behind an application. Barbell Logic is one we checked on 7 October 2026. Its online coaching page says what your own plan costs depends on what you need from it, which is what the application is for, so no monthly number appears on the page.',
          'That is a reasonable way to sell a custom service, and it is why Barbell Logic is not in the table above. A price you cannot see on the page cannot be checked against the page, so we do not estimate it. We also left out any coach whose pricing page we could not load or read clearly that day.',
        ],
        links: [
          ['https://barbell-logic.com/online-coaching/', 'Barbell Logic online coaching page, read 7 October 2026'],
        ],
      },
      {
        id: 'before-you-compare',
        heading: 'What should you check before comparing two prices?',
        ordered: [
          ['What reaches you each week.', 'A written check-in, a video call and a chat thread are different amounts of a coach’s time.'],
          ['Whether nutrition is inside the price.', 'Some rows above cover training and nutrition, some only one of them.'],
          ['The minimum term.', 'A 6-month minimum and a month-to-month plan are different purchases at the same monthly number.'],
          ['What you pay on day one.', 'Check the first bill, not the headline rate.'],
          ['How you stop.', 'Ask what happens if the coaching is not working, and get the answer in writing.'],
        ],
        links: [
          ['/guides/how-much-does-an-online-fitness-coach-cost', 'What online coaching costs and why'],
          ['/guides/is-online-fitness-coaching-worth-it', 'Is online coaching worth it?'],
        ],
      },
    ],
    faqs: [
      ['How much does online fitness coaching cost per month?', 'In the nine published rates we read on 7 October 2026, general coaching ran from $129/mo to $479/mo. The lowest was one-month nutrition coaching at Precision Nutrition and the highest was the Fitomics fitness and nutrition bundle with a 6-month minimum.'],
      ['Which published rate in the table is the lowest?', 'Precision Nutrition lists $129/mo for 1:1 nutrition coaching bought one month at a time. It covers nutrition, not a training plan.'],
      ['Which published rate in the table is the highest?', 'Fitomics lists $479/mo for its fitness and nutrition bundle, with a 6-month minimum commitment and a monthly 1-on-1 session.'],
      ['Where did each outside price come from?', 'Each one was copied from the coach’s own page on 7 October 2026, and the link is in the last column of the table. We did not take any price from a review site, a search answer or a list written by someone else.'],
      ['Why does the Titan Forge app and community rate cost so much less than coaching?', `The ${APP_COMMUNITY} rate gives programming and accountability without 1:1 coaching, according to the pricing page. The coaching rates pay for a person who reads your check-ins and changes your plan.`],
      ['Does Titan Forge publish its prices?', `Yes. The pricing page lists ${PREMIUM} for premium coaching, ${STANDARD} for standard coaching, ${NUTRITION_ONLY} for nutrition only, and ${APP_COMMUNITY} for the app and community. Applying costs nothing.`],
      ['How current is this page?', 'It was last updated on 7 October 2026, the day every price was read. We re-read the prices whenever we change the page. Check the coach’s own page before you buy.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. Prices shown for other coaches are what their own pages displayed on the date given and may have changed since.',
  },

  '/guides/how-we-read-a-study': {
    title: 'How We Read A Study: One Worked Example',
    metaTitle: 'How We Read A Study: A Worked Example On Training Frequency — Titan Forge Fitness',
    eyebrow: 'Reading Research',
    description: 'The five checks we run before a study changes what we tell a client, shown on one real example: whether training a muscle twice a week beats once.',
    keywords: 'how to read a fitness study, how to read a meta-analysis, training frequency hypertrophy study, how to check a PMID, evidence based fitness',
    intent: 'article',
    updated: '2026-10-07',
    shortAnswer: 'Before a study changes what we tell a client, we check who was studied, how many studies or people were in it, how long it ran, how big the effect was, and whether a better analysis agreed. Worked example: a 2016 review of ten trials (PMID 27102172) found muscles trained twice a week grew more than muscles trained once, with an effect size of 0.49 against 0.30.',
    sections: [
      {
        id: 'who-was-studied',
        heading: 'Who was studied?',
        paras: [
          'The first check is whether the people in the study look like the person asking. The training-frequency review by Schoenfeld, Ogborn and Krieger (Sports Medicine, 2016, PMID 27102172) only counted trials on human participants without chronic disease or injury.',
          'That tells us the result applies to healthy adults who are lifting. It does not tell us how someone with a joint problem should train, and we do not use it that way. If a study’s group does not match the client, the finding is background, not a recommendation. We also note where a paper was published: this one is in Sports Medicine, a peer-reviewed journal, so other researchers checked it before it was printed.',
        ],
      },
      {
        id: 'how-big',
        heading: 'How many studies or people were in it, and how long did they run?',
        paras: [
          'Next we count. The 2016 review pooled ten studies that directly compared different weekly training frequencies, and each trial had to run at least four weeks. Ten short trials is a useful signal and a small base.',
          'A single trial of 20 people can point the wrong way by chance. Pooling ten trials reduces that risk but does not remove it, and four weeks is short for measuring muscle growth. So we read the result as a reason to look closer, then look for a larger analysis, which is the fourth check. We also look for how the authors searched for trials, because a review that does not say how it found its studies cannot be repeated by anyone else.',
        ],
      },
      {
        id: 'effect-size',
        heading: 'How big was the effect?',
        paras: [
          'A result can be real and small. The review reported that higher training frequency was linked to a larger effect on muscle growth than lower frequency: 0.49 ± 0.08 against 0.30 ± 0.07, with a P value of 0.002.',
          'Those are effect sizes, which express a difference in standard deviations. They are not percentages of muscle. The gap is 0.19. That is a modest advantage, and a P value of 0.002 says it is unlikely to be chance, not that it is large. We keep the numbers in the units the paper used. Ask "larger than what?" every time: an effect of 0.30 for once a week still means muscle grew, and it is the comparison that is smaller.',
        ],
      },
      {
        id: 'better-analysis',
        heading: 'Did a better analysis agree?',
        paras: [
          'Seven years later, Currier and colleagues (British Journal of Sports Medicine, 2023, PMID 37414459) compared training plans across 119 hypertrophy studies with 3,364 participants. Its authors reported that all of the plans they compared promoted muscle growth about equally well.',
          'The highest-ranked plan for muscle growth was higher-load, multiple-set, twice-weekly training, with a result of 0.66 against no exercise (95% credible interval 0.47 to 0.85). So the larger analysis agrees that twice a week works. It does not show that twice a week is the only way, and the first review’s gap looks smaller once many plans are compared.',
        ],
      },
      {
        id: 'what-we-tell-clients',
        heading: 'What do we tell a client after reading both?',
        paras: [
          'The 2016 authors concluded that, with volume matched, training a muscle twice a week promoted better growth than once, and that major muscle groups should be trained at least twice a week. They also stated a limit: an analysis of session frequency could not be carried out because the sample was too small.',
          'So our plain reading is this. Training each muscle twice a week is a sound default for most healthy lifters, a once-a-week split can still work, and the difference is modest. We do not promise a result from it. The full article, with the same citations, is on our science page.',
        ],
        links: [
          ['/science/training-frequency-per-muscle', 'Read the full training-frequency article'],
          ['/science', 'Titan Forge science library'],
        ],
      },
    ],
    faqs: [
      ['What is a PMID and how do I check one?', 'A PMID is the number PubMed gives each paper. Type pubmed.ncbi.nlm.nih.gov/ followed by the number, for example 27102172, and you land on the paper’s record with its abstract.'],
      ['Is a meta-analysis always better than one trial?', 'Not always. A meta-analysis pools several trials, which usually steadies the result, but it can only be as good as the trials it pools. We check how many studies went in and how long they ran.'],
      ['What is an effect size?', 'It states how large a difference is in standard deviations, so studies measured in different units can be compared. A larger number means a bigger difference, and it is not a percentage.'],
      ['Which papers does this example use?', 'Schoenfeld, Ogborn and Krieger 2016 (PMID 27102172) and Currier and colleagues 2023 (PMID 37414459). Every figure on this page can be found in their published abstracts.'],
      ['What if two studies disagree?', 'We say so, and we give the client the more cautious reading. A disagreement usually means the question depends on the people studied, the length of the trial, or how volume was matched.'],
      ['Does this page tell me how to train?', 'No. It shows how we read research. A training plan depends on your history, schedule and health, and a clinician should clear you first if you have a medical condition.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },

  '/for/natural-lifters-over-40': {
    title: 'Natural Lifters Over 40: What The Research Says',
    metaTitle: 'Natural Lifters Over 40: Training, Protein And Recovery Research — Titan Forge Fitness',
    eyebrow: 'Research Summary',
    description: 'What published research says about building muscle, protein and recovery after 40, each figure linked to the study it came from by PubMed number.',
    keywords: 'natural lifters over 40, lifting over 40, muscle after 40 research, protein for lifters over 40, recovery after 40 training',
    intent: 'article',
    updated: '2026-10-07',
    shortAnswer: 'Research on adults past middle age says resistance training raises strength and muscle mass, that people who exercise should eat at least 1.2 g of protein per kg of body weight a day, and that evidence on slower recovery is mixed: 4 of 11 studies found worse recovery in older men, 6 found no difference. Every figure below names its study by PubMed number.',
    sections: [
      {
        id: 'what-natural-means',
        heading: 'What does natural lifter mean, and what does this page not say?',
        paras: [
          'In lifting, "natural" is shorthand for someone who trains without anabolic steroids or similar performance drugs. We use the word here as a topic, because that is how lifters search for this information.',
          'This page makes no claim about any Titan Forge client or coach. The studies below also did not test natural lifters against enhanced ones. They enrolled ordinary adults, and they show what training, protein and recovery do for muscle in people past middle age. Each study is listed with its PubMed number so you can open the original. Nothing here is advice to use or avoid any drug, and we do not discuss either.',
        ],
      },
      {
        id: 'build-muscle',
        heading: 'Can you still build muscle after 40?',
        paras: [
          'A review by Hunter, McCarthy and Bamman (Sports Medicine, 2004, PMID 15107011) found that strength and muscle mass increase after resistance training in older adults. It also found that muscle quality, meaning strength relative to muscle mass, improves.',
          'The same review noted that strength gains can be blunted when aerobic training is added to lifting, and that limiting training to 3 days a week avoided the problem. The review covers older adults without naming a cut-off at 40, so treat it as the direction of the evidence rather than a rule for one age. We start with a review of older adults specifically, not with studies of college-age lifters.',
        ],
        links: [
          ['/science/sarcopenia-and-training-after-40', 'What actually changes about muscle after 40'],
        ],
      },
      {
        id: 'protein',
        heading: 'How much protein does a lifter past 40 need?',
        paras: [
          'The PROT-AGE Study Group, an international panel, published its position in 2013 (Bauer and colleagues, PMID 23867520). It recommended an average of at least 1.0 to 1.2 g of protein per kg of body weight per day for older people, and at least 1.2 g/kg a day for those who exercise.',
          'The panel wrote for people over 65, so for ages 40 to 64 it is the closest published panel guidance, not a rule written for you. It also named an exception: people with severe kidney disease may need to limit protein and should ask their doctor first. The panel also wrote that protein quality and timing may matter, but judged the evidence not yet strong enough for specific advice on either.',
        ],
        links: [
          ['/science/protein-needs-after-40', 'Why protein needs go up, not down, with age'],
          ['/tools/protein-calculator', 'Protein calculator: your daily range in grams'],
        ],
      },
      {
        id: 'dieting',
        heading: 'Is lifting enough while dieting, or does cardio add anything?',
        paras: [
          'Villareal and colleagues (New England Journal of Medicine, 2017, PMID 28514618) randomly assigned 160 obese older adults to a weight-loss program plus aerobic training, resistance training, or both, or to a control group. 141 finished.',
          'The group that did both improved its physical performance score by 21%, against 14% for aerobic training alone and 14% for resistance training alone. Lean mass fell by 3% in the combined group and 2% in the resistance group, against 5% in the aerobic group. The participants were obese adults in a weight-loss program, so the result describes dieting, not a lean lifter at maintenance.',
        ],
      },
      {
        id: 'recovery',
        heading: 'Do older lifters recover more slowly?',
        paras: [
          'The evidence is mixed. A review by Fernandes and colleagues (Journal of Aging and Physical Activity, 2021, PMID 33291066) extracted data from 11 studies in older males. Four reported worse recovery symptoms than in younger men, two reported the opposite, and six found no difference. The authors concluded that resistance training can be practiced in older populations without concern for impaired recovery.',
          'A narrative review by Li and colleagues (Cells, 2024, PMID 38334647) described aged muscle as showing delayed, prolonged and inefficient recovery, and noted that few studies have tested it. We read the two together as: some people recover more slowly, and your own training log tells you more than an average does.',
        ],
        links: [
          ['/science/recovery-capacity-and-training-age', 'Recovery after 40, with the full reviews'],
        ],
      },
      {
        id: 'next-steps',
        heading: 'Where can you read the rest?',
        bullets: [
          ['How we read a study.', 'The five checks we run on any paper, with one worked example on training frequency.'],
          ['Training a muscle twice a week.', 'The full article on weekly frequency and what the meta-analyses found.'],
          ['Coaching for men over 40.', 'How Titan Forge builds a plan around recovery, protein and a real schedule.'],
        ],
        links: [
          ['/guides/how-we-read-a-study', 'How we read a study'],
          ['/science/training-frequency-per-muscle', 'Training frequency article'],
          ['/for/men-over-40', 'Coaching for men over 40'],
        ],
      },
    ],
    faqs: [
      ['Does the research say natural lifters over 40 can build muscle?', 'Studies of older adults found that resistance training raises strength and muscle mass (Hunter and colleagues 2004, PMID 15107011). None of them compared natural lifters with enhanced lifters, so they do not answer that comparison.'],
      ['How much protein per day after 40?', 'The PROT-AGE panel advised at least 1.2 g per kg of body weight per day for older people who exercise (PMID 23867520). It wrote for people over 65, and people with severe kidney disease should ask their doctor first.'],
      ['Do I need more rest days after 40?', 'The research is mixed. Of 11 studies reviewed in 2021, four found worse recovery in older men, two the opposite and six no difference (PMID 33291066). Track how you recover and adjust from your own log.'],
      ['Is lifting or cardio better for older adults who are dieting?', 'In one trial of 160 obese older adults (PMID 28514618), combined aerobic and resistance training improved physical performance the most, and resistance training kept lean mass best. The group studied was obese and in a weight-loss program.'],
      ['Does Titan Forge say its clients are natural?', 'No. This page uses the word only as a topic. It makes no statement about any client or coach.'],
      ['How can I check a number on this page?', 'Every study is named with its PubMed number. Type pubmed.ncbi.nlm.nih.gov/ followed by the number to open the abstract.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },
  '/for/strength-training-on-glp-1': {
    title: 'Strength Training On A GLP-1 Medicine: What The Research Shows',
    metaTitle: 'Keeping Muscle On A GLP-1 Medicine: What The Research Shows — Titan Forge Fitness',
    eyebrow: 'Research Summary',
    description: 'How much of the weight lost on a GLP-1 medicine is lean mass, why it matters, and what trials and clinical groups say about lifting, each figure linked to its PubMed number.',
    keywords: 'strength training on glp-1, keep muscle on ozempic, muscle loss on mounjaro, lifting on glp-1 medication, preserve muscle weight loss medication, glp-1 muscle loss',
    intent: 'article',
    updated: '2026-10-07',
    shortAnswer: 'In a 160-adult body-composition substudy of tirzepatide, about 75% of the weight lost was fat and about 25% was lean mass, the same split as on placebo, and a 2024 review proposes tailored lifting to protect that lean mass. None of the studies on this page tested a lifting plan in people taking these medicines, so lifting is the sound next step, not a proven fix. Your prescriber decides your medicine; a coach builds the training around it.',
    sections: [
      {
        id: 'how-much-is-muscle',
        heading: 'How much of the weight lost on a GLP-1 medicine is lean mass?',
        paras: [
          'A body-composition substudy of the SURMOUNT-1 trial (Look and colleagues, 2025, PMID 39996356) scanned 160 adults with DXA at the start and at week 72. On tirzepatide, body weight fell 21.3%, fat mass 33.9% and lean mass 10.9%. On placebo the falls were 5.3%, 8.2% and 2.6%. Of the weight lost, about 75% was fat and 25% was lean mass, in both groups, and the split stayed consistent across most of the subgroups checked: women and men, and three age bands (under 50, 50 to under 65, and 65 and over).',
          'Two cautions. The substudy was 160 of the 2,539 people in the trial, 73% of them women, with a mean BMI of 38. And a DXA scan estimates lean soft tissue; a 2026 trial (PMID 42668016, 46 people) found that drinking 1,000 mL of water raised the whole-body estimate, so the figure is not a direct count of muscle.',
        ],
      },
      {
        id: 'how-big-is-the-change',
        heading: 'How much weight do these medicines take off?',
        paras: [
          'In the STEP 1 trial (Wilding and colleagues, New England Journal of Medicine, 2021, PMID 33567185), 1,961 adults with overweight or obesity and no diabetes were assigned 2 to 1 to once-weekly semaglutide or placebo, plus lifestyle support, for 68 weeks. Mean body weight changed by -14.9% on semaglutide and -2.4% on placebo, a difference of 12.4 percentage points.',
          'Weight loss of 5% or more was reached by 86.4% of the semaglutide group and 31.5% of the placebo group. At that scale, even a modest share of lean mass is a real amount, which is why the next section matters. The trial was funded by the drug maker, and its main endpoint was body weight, not muscle.',
        ],
      },
      {
        id: 'why-lean-mass-matters',
        heading: 'Why does losing lean mass matter?',
        paras: [
          'A narrative review in Diabetes Care (Locatelli and colleagues, 2024, PMID 38687506) states that incretin medicines induce roughly 15 to 24% weight loss, and that they also cause rapid and significant loss of lean mass, about 10% or about 6 kg, which the authors compare to a decade or more of aging.',
          'The same review notes that maintaining muscle mass and function as people age is crucial to avoiding sarcopenia and frailty, which are strongly linked to illness and death. It also proposes that retaining lean mass during treatment could blunt weight regain when treatment stops. That is a proposal, not a tested result. It is a narrative review, so it summarises other studies rather than reporting a new trial.',
        ],
      },
      {
        id: 'does-lifting-help',
        heading: 'Does lifting help someone taking a GLP-1 medicine?',
        paras: [
          'The same 2024 review reports that supervised resistance training lasting more than 10 weeks can raise lean mass by about 3 kg and strength by about 25% in men and women. That figure comes from studies of people in general, not from people on these medicines.',
          'The closest trial is Lundgren and colleagues (New England Journal of Medicine, 2021, PMID 33951361): 195 adults with obesity, after an 8-week low-calorie diet, were assigned for a year to exercise, liraglutide, both, or placebo. The combination lowered body-fat percentage by 3.9 points, about twice the 1.9 points with liraglutide alone and the 1.7 points with exercise alone. The exercise was a moderate-to-vigorous program, not a lifting plan specifically.',
        ],
        links: [
          ['/science/calorie-deficit-size-and-muscle-retention', 'How big a deficit you can run without losing muscle'],
        ],
      },
      {
        id: 'what-clinical-groups-say',
        heading: 'What do clinical groups recommend about muscle on these medicines?',
        paras: [
          'A joint advisory from the American College of Lifestyle Medicine, the American Society for Nutrition, the Obesity Medicine Association and The Obesity Society (Mozaffarian and colleagues, 2025, PMID 40450457) lists muscle and bone loss among the challenges of GLP-1 treatment, next to side effects, nutrient shortfalls and weight regain.',
          'It calls for a baseline exam that includes muscle strength, function and body composition, and for preserving muscle and bone mass through resistance training and an appropriate diet during treatment. Corrections to the advisory have since been published, so we quote only these headline points from the abstract. The advisory is written for clinicians; it does not give a lifting program.',
        ],
      },
      {
        id: 'what-coaching-adds',
        heading: 'What does a coach add, and what stays with your prescriber?',
        paras: [
          'Your prescriber decides whether you take a medicine, at what dose, and when to stop. A coach does not. Titan Forge coaches training, nutrition and accountability, and its published stance is assessment first, a plan built around real constraints, then weekly check-ins that adjust the plan from measured trends.',
          'If you take a GLP-1 medicine, say so when you apply; Steve "Doc" Ginevan, PhD reviews your goal, training history and schedule before any call. Coaching is online worldwide and in person at 9780 S Meridian Blvd, Englewood, CO 80112. Standard coaching is ' + STANDARD + ' and nutrition-only coaching is ' + NUTRITION_ONLY + '. The pricing page has the full list.',
        ],
        links: [
          ['/coaching-intensive#apply', 'Apply for coaching'],
          ['/pricing', 'Current plans and rates'],
          ['/guides/how-we-read-a-study', 'How we read a study'],
        ],
      },
    ],
    faqs: [
      ['Should I stop my GLP-1 medicine to keep my muscle?', 'That decision belongs to you and your prescriber. This page does not advise starting, changing or stopping any medicine.'],
      ['Is the muscle loss different for women or older adults?', 'In the SURMOUNT-1 substudy (PMID 39996356) the split of about 75% fat and 25% lean mass stayed consistent across most subgroups, including women and men and three age bands. It was a small substudy of 160 people.'],
      ['Is this more muscle loss than from dieting alone?', 'The proportion was the same: about 25% of weight lost was lean mass on tirzepatide and on placebo (PMID 39996356). The amount differs because people on the medicine lost much more weight, with lean mass down 10.9% against 2.6%.'],
      ['Did any study here test a lifting plan in people on a GLP-1 medicine?', 'No. The lifting figures come from studies of people in general (PMID 38687506) and from a trial of exercise with liraglutide that was not specifically lifting (PMID 33951361).'],
      ['What happens to muscle if I stop the medicine?', 'These studies do not answer it. A 2024 review proposes that keeping lean mass during treatment could blunt regain afterwards (PMID 38687506), but it presents that as a proposal.'],
      ['Does Titan Forge give medical advice about these medicines?', 'No. Titan Forge coaches training and nutrition. Questions about a medicine, a dose or side effects go to the clinician who prescribes it.'],
      ['How can I check a number on this page?', 'Every study is named with its PubMed number. Type pubmed.ncbi.nlm.nih.gov/ followed by the number to open the abstract.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician, pharmacist or registered dietitian. It does not advise starting, changing or stopping any medicine. If you take a prescription medicine or have a medical condition, get clinical clearance before starting or changing a training program.',
  },
  '/for/personal-training-englewood-centennial': {
    title: 'Personal Training Near Lone Tree, Inverness And The Denver Tech Center',
    metaTitle: 'Personal Training Near Lone Tree, Inverness And The DTC — Titan Forge Fitness',
    eyebrow: 'In-Person Training',
    description: 'In-person personal training at 9780 S Meridian Blvd, Englewood, CO 80112, in Meridian between Lone Tree, Inverness and Centennial: hours, drive times, who coaches you and what it costs.',
    keywords: 'personal trainer Lone Tree CO, personal training Denver Tech Center, personal trainer DTC, personal training Inverness Englewood, personal trainer Meridian Englewood, personal training Centennial CO, personal trainer 80112',
    intent: 'local',
    updated: '2026-10-13',
    shortAnswer: `Titan Forge Fitness is a personal training gym at 9780 S Meridian Blvd, Englewood, CO 80112, in Meridian just south of Inverness and east of Lone Tree. It is open ${GYM_HOURS_TEXT}. Steve "Doc" Ginevan, PhD leads the coaching, and the phone number is (720) 916-7235.`,
    conversion: {
      mapHref: GBP_URL,
      mapLabel: 'Check the location in Google Maps',
      applyHref: '/apply',
      applyLabel: 'Request a local training conversation',
      source: 'local_personal_training_page',
    },
    sections: [
      {
        id: 'where',
        heading: 'Where exactly is the gym?',
        paras: [
          'The gym is at 9780 S Meridian Blvd, Englewood, CO 80112. The mailing address says Englewood, but the building is not in the City of Englewood or in old Englewood\'s downtown. The US Census geocoder places it in the Meridian census-designated place in Douglas County (read on 13 October 2026), the business area along Meridian Boulevard.',
          'That puts it between the places people usually name when they search: the Inverness business area on Inverness Way S is about 2.8 miles north by road, Lone Tree City Hall is about 3.0 miles west, and the Denver Tech Center is further north along I-25. If you work in Meridian or Inverness, a session before or after work does not need a drive across town.',
        ],
        links: [
          ['https://www.google.com/search?kgmid=/g/11m6cd7w45&hl=en-US&q=Titan+Forge+Fitness,+Corp.&shndl=30&source=sh/x/loc/osrp/m5/1', 'Open Titan Forge Fitness on Google Maps'],
        ],
      },
      {
        id: 'how-far',
        heading: 'How far is the gym from Lone Tree, the Denver Tech Center, Centennial and Parker?',
        paras: [
          'These are driving distances from the gym to a fixed public address in each place. Addresses were matched with the US Census geocoder and routes were calculated with the OSRM routing engine on OpenStreetMap roads, on 7 October 2026 (Inverness on 13 October). Times assume no traffic, so allow more at rush hour.',
        ],
        bullets: [
          ['Inverness.', '2.8 miles, about 6 minutes, to 304 Inverness Way S.'],
          ['Lone Tree.', '3.0 miles, about 7 minutes, to City Hall at 9220 Kimmer Dr.'],
          ['Centennial.', '5.7 miles, about 10 minutes, to Centennial Civic Center at 13133 E Arapahoe Rd.'],
          ['Greenwood Village.', '7.2 miles, about 11 minutes, to City Hall at 6060 S Quebec St.'],
          ['Denver Tech Center.', '7.7 miles, about 12 minutes, to 7800 E Union Ave.'],
          ['Parker.', '8.3 miles, about 13 minutes, to Town Hall at 20120 E Mainstreet.'],
        ],
      },
      {
        id: 'hours',
        heading: 'When is the gym open?',
        paras: [
          `The gym is open ${GYM_HOURS_TEXT}. Those are the hours listed on the Titan Forge Fitness, Corp. Google Business Profile, and the 5 AM weekday opening means a session can fit before a normal working day starts.`,
          'Opening hours are not the same as coaching times: session times and availability are confirmed when you apply. To ask about a specific time before applying, call (720) 916-7235, email Doc@titanforgefit.com, or use the intro request form on the contact page. Holiday hours can differ; the Google profile shows any change first.',
        ],
        links: [
          ['/contact', 'Contact Titan Forge Fitness'],
        ],
      },
      {
        id: 'who-coaches',
        heading: 'Who will coach me?',
        paras: [
          'Titan Forge Fitness is founded and led by Steve "Doc" Ginevan, PhD, who coaches training, nutrition and accountability. Coaching starts with an application, not a sales call: Steve reviews your goal, training history and schedule first, then recommends a starting point, which may be one-to-one coaching, a membership or free resources.',
          'In the gym that means a coach watching your technique, setting the loads and keeping the session on track. Steve describes his approach as assessment first, a plan built around your real constraints, then weekly check-ins that change the plan when a pattern shows up over a few weeks rather than after one bad day. No outcome is guaranteed: results depend on your starting point, consistency, recovery and health. If you have an injury or a medical condition, get cleared by your clinician before you start.',
        ],
        links: [
          ['/about', 'About Steve "Doc" Ginevan, PhD'],
          ['/apply', 'Apply for coaching'],
        ],
      },
      {
        id: 'cost',
        heading: 'What does coaching cost?',
        paras: [
          'The pricing page publishes four monthly coaching plans: ' + PREMIUM + ' for Premium Coaching with scheduled video calls, ' + STANDARD + ' for Standard Coaching with phone or pre-recorded check-ins, ' + NUTRITION_ONLY + ' for Nutrition Only, and ' + APP_COMMUNITY + ' for App + Community, which includes the 90-Day Transformation Program in the TITAN FORGE app. Prepay five months on any one-to-one plan and the sixth month is free.',
          'There is no published price for in-person sessions at the gym. Session pricing and availability are confirmed when you apply, and applying costs nothing. If the drive does not suit you, the one-to-one plans above work online from anywhere, with weekly check-ins instead of a fixed gym time. The pricing page lists what each plan includes.',
        ],
        links: [
          ['/pricing', 'Current plans and rates'],
          ['/for/online-coaching', 'Online coaching'],
        ],
      },
      {
        id: 'altitude',
        heading: 'Does training at almost 6,000 feet feel different?',
        paras: [
          'The gym sits at about 5,927 feet, roughly 1,806 metres, according to the US Geological Survey elevation service (3DEP, read on 7 October 2026).',
          'In a study of eight endurance-trained athletes tested at simulated altitudes from 300 to 2,800 metres (Wehrlin and Hallén, 2006, PMID 16311764), maximal oxygen uptake fell in a straight line, by 6.3% for each 1,000 metres of added altitude (range 4.6 to 7.5%). It was a small study of acute exposure in athletes, not lifters, and it does not tell you how to train. If hard conditioning feels harder after a move to Colorado, altitude is a documented reason, not a verdict on your fitness.',
        ],
        links: [
          ['/for/parker-personal-training', 'In-person training for Parker clients'],
          ['/vs/personal-trainer', 'Online coaching versus a personal trainer'],
        ],
      },
    ],
    faqs: [
      ['Where is Titan Forge Fitness?', 'Titan Forge Fitness is at 9780 S Meridian Blvd, Englewood, CO 80112, in Meridian, Douglas County, just south of Inverness and east of Lone Tree. The phone number is (720) 916-7235.'],
      ['Is the gym in downtown Englewood?', 'No. The mailing address says Englewood, but the US Census geocoder places the building in the Meridian census-designated place in Douglas County (read on 13 October 2026), not inside the City of Englewood.'],
      ['What are the opening hours?', `${GYM_HOURS_TEXT}, as listed on the Titan Forge Fitness, Corp. Google Business Profile. One-to-one session times are confirmed when you apply.`],
      ['How far is the gym from Lone Tree?', 'About 3.0 miles by road, roughly 7 minutes with no traffic, to Lone Tree City Hall at 9220 Kimmer Dr (OSRM routing estimate, 7 October 2026).'],
      ['How far is the gym from the Denver Tech Center?', 'About 7.7 miles by road, roughly 12 minutes with no traffic, to 7800 E Union Ave (OSRM routing estimate, 7 October 2026).'],
      ['Is there a per-session price?', 'The pricing page lists monthly coaching rates and no per-session price. Ask when you apply.'],
      ['Who runs the training?', 'Titan Forge Fitness is founded and led by Steve "Doc" Ginevan, PhD.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have a medical condition, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },
  '/for/strength-training-with-joint-pain': {
    title: 'Strength Training With Joint Pain: What The Research Says',
    metaTitle: 'Strength Training With Joint Pain: Knee, Hip And Guideline Research — Titan Forge Fitness',
    eyebrow: 'Research Summary',
    description: 'What reviews and guidelines say about exercise for knee and hip osteoarthritis and about training through pain, each figure linked to the study it came from by PubMed number.',
    keywords: 'strength training with joint pain, lifting with arthritis, weight training knee osteoarthritis, exercise after physical therapy, should exercise hurt, strength training sore knees',
    intent: 'article',
    updated: '2026-10-07',
    shortAnswer: 'For knee osteoarthritis, a Cochrane review of 54 studies found exercise reduced pain by about 12 points on a 0 to 100 scale; the evidence for the hip is weaker, and a 2019 guideline from the American College of Rheumatology and the Arthritis Foundation strongly recommends exercise for hip and knee osteoarthritis. This page summarises research and is not treatment: clear any plan with your clinician first.',
    sections: [
      {
        id: 'knee',
        heading: 'Does exercise reduce knee osteoarthritis pain?',
        paras: [
          'A Cochrane review (Fransen and colleagues, 2015, PMID 25569281) extracted data from 54 randomised trials of land-based exercise in people with knee osteoarthritis. In 44 trials with 3,537 participants, exercise reduced pain by the equivalent of 12 points on a 0 to 100 scale, from about 44 points in the control groups. Physical function improved by about 10 points in 44 trials, and quality of life by about 4 points in 13.',
          'The authors rated the pain evidence high quality and the function evidence moderate. They also noted that few trials blinded participants and that pain and function were self-reported, and the results were measured immediately after treatment, not years later.',
        ],
      },
      {
        id: 'hip',
        heading: 'Is the evidence the same for the hip?',
        paras: [
          'Less clear. A 2026 Cochrane update on hip osteoarthritis (Hall and colleagues, PMID 42486497) included 18 trials with 1,368 participants. Against no treatment or usual care, exercise probably reduces pain slightly (by 7.19 points on a 0 to 100 scale, 9 studies, 449 participants, moderate certainty), though the authors judged the improvement unlikely to be clinically meaningful.',
          'Against attention control or placebo, exercise may have little to no effect on pain, based on only two studies with 123 participants. Most studies were small and unblinded. The honest reading is that the trials so far show a small benefit on pain and function at the hip. They do not say exercise is useless for any one person.',
        ],
      },
      {
        id: 'guideline',
        heading: 'What does the main US guideline recommend?',
        paras: [
          'The 2019 guideline from the American College of Rheumatology and the Arthritis Foundation (Kolasinski and colleagues, PMID 31908163) covers osteoarthritis of the hand, hip and knee. Its voting panel included rheumatologists, an internist, physical and occupational therapists and patients.',
          'It made strong recommendations for exercise, and for weight loss in people with knee or hip osteoarthritis who are overweight or obese. It made conditional recommendations for balance exercises and yoga. The guideline asks clinicians and patients to decide together, taking account of values, preferences and other health conditions. It is a guideline for treatment decisions, not a lifting program, and it does not name sets, reps or loads.',
        ],
      },
      {
        id: 'should-it-hurt',
        heading: 'Should exercise be pain free?',
        paras: [
          'A systematic review in the British Journal of Sports Medicine (Smith and colleagues, 2017, PMID 28596288) compared exercise where pain was allowed or encouraged with exercise kept pain free, in people with chronic musculoskeletal pain. It found nine papers from seven trials with 385 participants.',
          'In the short term, painful exercise gave a small benefit for pain (effect size -0.27, 95% interval -0.54 to -0.05). For pain in the medium and long term, and for function and disability at every time point, there was no significant difference. The authors concluded that pain during therapeutic exercise need not be a barrier to success. It is not a reason to push through new, sharp or worsening pain, which belongs with a clinician.',
        ],
      },
      {
        id: 'with-a-coach',
        heading: 'How does a coach fit alongside your clinician?',
        paras: [
          'A coach does not diagnose, treat or clear you to train. Your clinician sets the limits, and a plan is only as safe as those limits are accurate. Titan Forge states that its plans are built around real constraints, and limits from your clinician are the most important one. Ask your clinician or therapist to write down which movements, loads and symptoms to avoid, and bring that to your first conversation.',
          'Steve "Doc" Ginevan, PhD reviews your goal, training history and schedule before any call. In-person sessions are at 9780 S Meridian Blvd, Englewood, CO 80112, and coaching is also online. The site also has a longer article on loading, tempo and exercise choice when a joint is sore.',
        ],
        links: [
          ['/science/training-with-joint-pain', 'Training around joint pain, the full article'],
          ['/for/personal-training-englewood-centennial', 'In-person training in Englewood and Centennial'],
          ['/coaching-intensive#apply', 'Apply for coaching'],
        ],
      },
    ],
    faqs: [
      ['Is it safe to lift weights with arthritis?', 'This page cannot say whether it is safe for you. The guideline strongly recommends exercise for hip and knee osteoarthritis (PMID 31908163), but your clinician decides what is right for your joints.'],
      ['How much did exercise reduce knee pain in the Cochrane review?', 'By the equivalent of 12 points on a 0 to 100 scale, from about 44 points in the control groups, in 44 trials with 3,537 participants (PMID 25569281).'],
      ['Does exercise help hip osteoarthritis as much?', 'The 2026 Cochrane update found a smaller effect: probably 7.19 points less pain against usual care, which the authors judged unlikely to be clinically meaningful (PMID 42486497).'],
      ['Should I exercise through pain?', 'A 2017 meta-analysis found painful exercise gave a small short-term pain benefit and no clear difference later (PMID 28596288). It covered supervised programmes; get any new or worsening pain checked.'],
      ['Can I train after physical therapy ends?', 'Often, but it depends on your condition and your therapist. Ask them in writing which movements, loads and symptoms to avoid, and bring that to your first coaching conversation.'],
      ['Does Titan Forge treat joint pain?', 'No. Titan Forge coaches training and nutrition. Diagnosis and treatment belong to a physician or physical therapist.'],
      ['How can I check a number on this page?', 'Every study is named with its PubMed number. Type pubmed.ncbi.nlm.nih.gov/ followed by the number to open the abstract.'],
    ],
    scope: 'Titan Forge Fitness provides fitness and nutrition coaching. It is not medical care, and nothing here diagnoses, treats, or replaces advice from a physician or physical therapist. If you have joint pain, an injury, or symptoms that concern you, get clinical clearance before starting or changing a training program.',
  },
  ...MAGNET_GUIDES,
};

export const GUIDE_ROUTES = Object.keys(GUIDES);
