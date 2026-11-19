/* ============================================================
   TITAN FORGE — App router & mount
   ============================================================ */
const PAGES = {
  '/': HomePage,
  '/start': StartPage,
  '/apply': ApplyPage,
  '/coaching': CoachingPage,
  '/programs': ProgramsPage,
  '/method': MethodPage,
  '/results': ResultsPage,
  '/resources': ResourcesPage,
  '/faq': FaqHubPage,
  '/shop': ShopPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/pricing': PricingPage,
  '/memberships/science-based-community': MembershipSalesPage,
  '/memberships/community-app': MembershipSalesPage,
  '/referral': ReferralPage,
  '/coaches': CoachesPage,
  '/free/forge-readiness-check': FreeReadinessPage,
  '/free/daily-habit': DailyHabitPage,
  '/free/daily-planner': DailyPlannerPage,
  '/free/daily-log': DailyLogPage,
  '/free/daily-readiness': DailyReadinessPage,
  '/team/weekly-handoff': WeeklyHandoffPage,
  '/privacy': LegalPage,
  '/terms': LegalPage,
  '/refund-policy': LegalPage,
  '/shipping-policy': LegalPage,
  '/disclaimer': LegalPage,
  '/powerlifting-coach-denver-injury-recovery': InjuryRehabCoachPage,
};

const SCHEMA_AREA_SERVED = [
  { '@type': 'City', name: 'Englewood', containedInPlace: { '@type': 'State', name: 'Colorado' } },
  { '@type': 'City', name: 'Centennial', containedInPlace: { '@type': 'State', name: 'Colorado' } },
  { '@type': 'City', name: 'Parker', containedInPlace: { '@type': 'State', name: 'Colorado' } },
  { '@type': 'AdministrativeArea', name: 'Denver metro' },
  { '@type': 'Place', name: 'Online worldwide' },
];
const SCHEMA_KNOWS_ABOUT = [
  'online fitness coaching',
  'Englewood Colorado personal training',
  'strength training',
  'nutrition coaching',
  'macro tracking',
  'progressive overload',
  'protein intake',
  'creatine supplementation',
  'sustainable fat loss',
  'fitness accountability',
  'foundation-first coaching',
  'coaching versus workout templates',
  'human coaching versus fitness apps',
  'online coaching check-ins',
  'training recovery',
  'strength training over 40',
  'local personal training decisions',
  'answer engine citation readiness',
  'AI crawler access policy',
  'Google AI Overviews eligibility',
  'Gemini Google-Extended controls',
  'production indexing checklist',
  'fitness proof standards',
  'Google reviews and Shopify proof signals',
  'fitness claim hygiene',
  'fitness coach credential verification',
  'personal trainer certification questions',
  'fitness coach red flags',
  'online coaching claim verification',
  'online coaching privacy boundaries',
  'fitness getting started with coaching',
  'fitness coaching consultation prep',
  'first 30 days online coaching',
  'fitness baseline goals',
  'progress photos and measurement boundaries',
  'online coaching readiness',
  'fitness plan failure recovery',
  'coaching versus discipline',
  'fitness coaching pre-join questions',
  'fitness coaching decision comparison',
  'fitness coaching timelines',
  'realistic fitness coaching results',
  'fitness transformation timeline variation',
  'fat loss muscle gain expectations',
  'slow fitness progress troubleshooting',
  'nutrition adherence while traveling',
  'restaurant meals and fat loss',
  'weekend eating for fat loss',
  'social events while dieting',
  'getting back on track after overeating',
  'fitness coaching consultation',
  'fitness coaching application prep',
  'coaching fit decision',
  'first fitness coaching goal',
  'pre-join fitness coach questions',
  'personalized fitness plan',
  'fitness coach workout feedback',
  'workout plan too hard',
  'workout plan too easy',
  'life disrupts training',
  'exercise substitution decisions',
  'fitness behavior change',
  'fitness habit building',
  'workout consistency systems',
  'motivation versus discipline',
  'weekly fitness routine planning',
  'fitness accountability systems',
  'beginner nutrition for fat loss',
  'calorie deficit basics',
  'beginner protein priorities',
  'simple meal structure for fat loss',
  'healthy snacks and cravings',
  'beginner gym plan',
  'safe exercise form',
  'gym anxiety',
  'beginner strength training mistakes',
  'when to add weight',
  'Parker personal training for beginners',
  'choosing a personal trainer in Parker',
  'online versus local personal training',
  'local training consultation questions',
  'between-session accountability',
  'workout soreness versus injury',
  'beginner workout injury prevention',
  'rest day versus deload',
  'return to strength training after layoff',
  'exercise modifications for pain-free training',
  'ChatGPT Search readiness',
  'Perplexity citation readiness',
  'Google AI Mode readiness',
  'robots noindex citation gates',
  'Search Console citation monitoring',
  'fitness website source of truth',
  'fitness coaching entity consistency',
  'structured data visible content',
  'Google Business Profile proof',
  'Shopify merchant proof',
  'Titan Forge brand fact sheet',
  'Parker personal training answer brief',
  'online coaching answer brief',
  'Google reviews proof brief',
  'Shopify products support tools',
  'Titan Forge coaching offers overview',
  'coaching offer fit',
  'starting with Titan Forge coaching',
  'coaching inclusions',
  'coaching guarantee boundaries',
    'fitness coaching pricing questions',
    'online coaching cost factors',
    'coaching value versus apps',
    'paid coaching decision questions',
    'coaching pricing approval boundaries',
    'coaching refund and cancellation questions',
    'fitness coaching guarantee red flags',
    'fitness testimonial interpretation',
    'coaching agreement communication expectations',
    'post-application coaching expectations',
    'online coaching versus AI workout apps',
    'personal trainer versus online fitness coach',
    'fitness coaching versus group classes',
    'nutrition coaching versus diet apps',
    'supplements versus coaching',
    'citable fitness answer formats',
    'answer-engine ready summaries',
    'fitness glossary definitions',
  'source-backed fitness claims',
  'citation snippet auditing',
  'coaching intake process',
  'accountability check-in systems',
  'body recomposition progress tracking',
  'maintenance calories after fat loss',
  'scale weight trend interpretation',
  'training safety warning signs',
  'fitness coaching scope of practice',
  'beginner exercise progression',
  'soreness versus pain in strength training',
  'first personal training session',
  'gym confidence',
  'home gym equipment decisions',
  'personal training consistency',
  'nutrition adherence',
  'eating out while tracking macros',
  'high-protein breakfast defaults',
  'weekend eating consistency',
  'fat-loss grocery planning',
  'hydration and training readiness',
  'fitness coach fit decisions',
  'online coach hiring questions',
  'fitness coaching communication boundaries',
  'coaching feedback examples',
  'self-guided versus coached fitness plans',
  'muscle gain and hypertrophy',
  'dirty bulk alternatives',
  'hypertrophy training volume',
  'progressive overload for muscle growth',
  'muscle-gain nutrition planning',
  'muscle growth stall troubleshooting',
  'men over 40 strength training',
  'joint-friendly progressive overload',
  'protein and recovery after 40',
  'fat loss after 40',
  'muscle building after 40',
  'busy professional fitness',
  'busy professional workout schedule',
  'meal prep for busy professionals',
  'training while traveling for work',
  'fitness consistency for busy professionals',
  'protein powder versus whole food',
  'pre-workout supplement decisions',
  'third-party supplement testing',
  'supplement stack basics',
  'supplement claim review',
  'workout split for busy adults',
  'full-body versus upper-lower split',
  'rest days between workouts',
  'deload week planning',
  'exercise order in strength training',
  'macro adjustments after stalled progress',
  'calorie tracking accuracy',
  'portion control without measuring food',
  'protein fiber and satiety',
  'alcohol and fat loss planning',
  'cardio versus lifting for fat loss',
  'Zone 2 cardio for busy adults',
  'HIIT versus steady-state cardio',
  'adding cardio without losing strength',
  'conditioning for busy adults',
  'sleep debt and training performance',
  'stress and fat-loss plateaus',
  'evening routines for training recovery',
  'active recovery versus complete rest',
  'wearable recovery score interpretation',
  'dynamic warm-ups for strength training',
  'mobility versus flexibility for lifters',
  'joint-friendly exercise modifications',
  'training around minor aches',
  'range of motion in strength training',
  'pre-workout meal planning',
  'post-workout nutrition recovery',
  'carbohydrates around strength training',
  'fasted training tradeoffs',
  'meal timing for busy lifters',
];
const INTERNAL_SCHEMA_TOPIC_RE = /answer[- ]engine|AI crawler|AI Overviews|AI Mode|ChatGPT|Perplexity|Gemini|indexing|noindex|robots|Search Console|citation|crawler|audit|readiness|structured data|source of truth/i;
const PUBLIC_SCHEMA_KNOWS_ABOUT = SCHEMA_KNOWS_ABOUT.filter((topic) => !INTERNAL_SCHEMA_TOPIC_RE.test(topic));
const SCHEMA_SAME_AS = [
  GOOGLE_BUSINESS_PROFILE_URL,
  'https://www.instagram.com/titanforgefit/',
  'https://www.instagram.com/doc.gymlifts/',
];
const SCHEMA_OFFER_CATALOG = {
  '@type': 'OfferCatalog',
  name: 'Titan Forge coaching and support paths',
  itemListElement: [
    { '@type': 'Offer', name: 'Online fitness coaching', category: 'Coaching', itemOffered: { '@type': 'Service', name: 'Online fitness coaching' } },
    { '@type': 'Offer', name: 'Parker personal training', category: 'Local coaching', itemOffered: { '@type': 'Service', name: 'Personal training near Parker, Colorado' } },
    { '@type': 'Offer', name: 'Nutrition coaching', category: 'Nutrition coaching', itemOffered: { '@type': 'Service', name: 'Nutrition coaching' } },
    { '@type': 'Offer', name: 'Training programs', category: 'Programs', itemOffered: { '@type': 'Service', name: 'Structured training programs' } },
    { '@type': 'Offer', name: 'Shop support tools', category: 'Support tools', itemOffered: { '@type': 'Service', name: 'Titan Forge support tool guidance' } },
  ],
};

function routeMeta(route) {
  const guide = (typeof globalThis !== 'undefined' && globalThis.TITAN_GUIDES || {})[route];
  if (guide) return [guide.metaTitle, guide.description];
  const base = 'Titan Forge Fitness';
  const resourceTitles = {
    '/resources/how-to-calculate-macros': ['How To Actually Calculate Your Macros', 'A practical Titan Forge guide to setting calories and macros without crash-diet math or random macro targets.'],
    '/resources/coaching-vs-templates': ['Coaching vs Templates', 'What you are really paying for when you choose feedback-driven fitness coaching instead of a static workout PDF.'],
    '/resources/supplements-foundation-first': ['Supplements for Lifters Over 40', 'An evidence-first guide to protein powder, creatine, vitamin D, multivitamins, ashwagandha, resveratrol, and vitality blends for lifters over 40.'],
    '/resources/what-is-a-pump-cover': ['What Is a Pump Cover? The Gym Trend Explained', 'Pump-cover meaning, why lifters wear oversized shirts and hoodies to train, and how purpose-built layers differ from ordinary oversized tees.'],
    '/resources/creatine-and-ashwagandha-together': ['Can You Take Creatine and Ashwagandha Together? What the Evidence Says', 'What research supports for creatine and ashwagandha separately, what has not been tested about the combination, and which safety questions come first.'],
    '/resources/l-glutamine-vs-bcaas': ['L-Glutamine vs BCAAs for Recovery', 'A source-backed comparison of two different amino-acid products, the limits of recovery evidence, and why adequate complete protein comes first.'],
    '/resources/nootropics-vs-pre-workout': ['Nootropics vs Pre-Workout', 'Compare intended use, current labels, caffeine overlap, timing, and sleep without treating either supplement category as a guaranteed result.'],
    '/resources/progressive-overload-without-guesswork': ['Progressive Overload Without The Guesswork', 'How to apply progressive overload with better feedback, cleaner technique, and less random maxing.'],
    '/resources/protein-how-much-and-timing': ['Protein: How Much And Does Timing Matter?', 'A practical Titan Forge guide to protein intake, meal timing, and consistency for training and body composition.'],
    '/resources/warm-up-is-a-workout': ['Why Your Warm-Up Is A Workout', 'A better way to prepare for lifting, performance, and fewer avoidable training setbacks.'],
    '/resources/consistency-beats-intensity': ['Consistency Beats Intensity', 'Why repeatable training and nutrition beats heroic bursts that collapse after a few weeks.'],
    '/resources/fat-loss-plateau-troubleshooting': ['Fat-Loss Plateau Troubleshooting', 'A practical checklist for handling fat-loss plateaus without panic cuts, random cardio spikes, or abandoning the plan too early.'],
    '/resources/meal-planning-for-busy-adults': ['Meal Planning For Busy Adults', 'How busy adults can build repeatable meals, protein anchors, and simple nutrition systems without pretending every week is perfect.'],
    '/resources/training-volume-and-recovery': ['Training Volume And Recovery', 'How to think about training volume, recovery, soreness, and progress when more work is not automatically better.'],
    '/resources/beginner-strength-training': ['Beginner Strength Training', 'What beginners should learn first: movement quality, repeatable progression, recovery, and confidence before advanced programming.'],
    '/resources/body-recomposition-basics': ['Body Recomposition Basics', 'How to coordinate training, protein, recovery, and progress tracking when the goal is better body composition, not just scale change.'],
    '/resources/nutrition-coaching-vs-meal-plans': ['Nutrition Coaching vs Meal Plans', 'Why static meal plans can help with examples but nutrition coaching is stronger for weekends, travel, hunger, and real-life decisions.'],
    '/resources/how-to-start-when-you-feel-out-of-shape': ['How To Start When You Feel Out Of Shape', 'A confidence-aware Titan Forge guide to starting training with realistic standards, simple minimums, and less restart pressure.'],
    '/resources/strength-training-for-fat-loss': ['Strength Training For Fat Loss', 'How to use lifting, steps, protein, and recovery together when the goal is fat loss without muscle loss.'],
    '/resources/what-to-expect-from-online-coaching': ['What To Expect From Online Coaching', 'A practical guide to check-ins, feedback, communication, and adjustment inside a real online coaching relationship.'],
    '/resources/macros-vs-calories': ['Macros vs Calories', 'How calories, protein, carbs, fats, and adherence fit together when nutrition needs to become workable.'],
    '/resources/sleep-recovery-and-fat-loss': ['Sleep, Recovery, And Fat Loss', 'Why sleep and recovery change hunger, training quality, adherence, and the usefulness of a fat-loss plan.'],
    '/resources/walking-cardio-and-steps': ['Walking, Cardio, And Steps', 'How to choose activity targets without turning fat loss into random punishment or unsustainable cardio.'],
    '/resources/creatine-monohydrate-basics': ['Creatine Monohydrate Basics', 'Where creatine fits as a support tool after training quality, nutrition, sleep, hydration, and consistency are handled.'],
    '/resources/recovery-checklist-for-lifters': ['Recovery Checklist For Lifters', 'A practical checklist for soreness, sleep, fatigue, deloads, and deciding whether to push, hold, or simplify training.'],
    '/resources/how-to-choose-a-fitness-coach': ['How To Choose A Fitness Coach', 'How to evaluate a coach by process, communication, scope, proof standards, and adjustment ability before starting.'],
    '/resources/online-coaching-check-in-examples': ['Online Coaching Check-In Examples', 'What useful online coaching check-ins should include so training, nutrition, recovery, and adherence become decisions.'],
    '/resources/personal-training-near-parker-what-to-ask': ['Personal Training Near Parker: What To Ask First', 'Questions Parker-area clients can ask before choosing local personal training, from technique support to nutrition and safety scope.'],
    '/resources/strength-training-over-40': ['Strength Training Over 40', 'How to keep strength training productive after 40 with recovery, joints, warm-ups, progression, and nutrition in the plan.'],
    '/resources/supplement-safety-and-labels': ['Supplement Safety And Labels', 'How to read supplement labels, judge claims, avoid stacking unknowns, and know when to ask a qualified professional first.'],
    '/resources/protein-powder-vs-whole-food': ['Protein Powder vs Whole Food', 'How to decide whether protein powder solves a specific intake gap or whether the whole-food system needs attention first.'],
    '/resources/plant-protein-vs-whey': ['Plant Protein vs Whey for Building Muscle', 'An honest, source-backed comparison of plant protein and whey, including formula, dose, dairy and allergen fit, current labels, and evidence limits.'],
    '/resources/supplements-for-muscle-recovery-and-sleep': ['Supplements for Muscle Recovery and Sleep', 'An evidence-first recovery guide to protein, creatine, sleep, probiotics, and glutamine—with clear limits on what supplement products can claim.'],
    '/resources/why-take-vitamin-d3-and-k2-together': ['Why Take Vitamin D3 and K2 Together?', 'Vitamin D and K have related roles in calcium and bone biology, but not everyone needs both. Review the evidence, limits, interactions, and safety.'],
    '/resources/greens-powder-vs-multivitamin': ['Greens Powder vs Multivitamin', 'Compare greens powders and multivitamins by nutrient coverage, label transparency, overlap, and food gaps—without treating either as a food replacement.'],
    '/resources/pre-workout-supplements-and-caffeine': ['Pre-Workout Supplements And Caffeine', 'A foundation-first way to think about pre-workout products, caffeine, training readiness, sleep, and label awareness.'],
    '/resources/third-party-testing-and-supplements': ['Third-Party Testing And Supplements', 'What third-party testing can and cannot tell you when choosing supplements, labels, and product claims.'],
    '/resources/supplement-stack-basics': ['Supplement Stack Basics', 'How to keep a supplement stack foundation-first, limit variables, and decide whether a support tool solves a real gap.'],
    '/resources/how-to-read-supplement-claims': ['How To Read Supplement Claims', 'A claim-hygiene guide for spotting shortcut supplement marketing without turning product availability into proof of results.'],
    '/resources/workout-split-for-busy-adults': ['Workout Split For Busy Adults', 'How to choose a weekly workout split around schedule reality, recovery, training experience, and the need for repeatable weeks.'],
    '/resources/full-body-vs-upper-lower-split': ['Full-Body vs Upper-Lower Split', 'How to choose between full-body and upper-lower training without turning the split into a magic answer.'],
    '/resources/how-many-rest-days-between-workouts': ['How Many Rest Days Between Workouts', 'How to decide rest-day spacing from training stress, soreness, sleep, schedule, and performance instead of a fixed rule.'],
    '/resources/deload-week-signs-and-plan': ['Deload Week Signs And Plan', 'How to recognize fatigue signals that make a deload useful and reduce training stress without abandoning the plan.'],
    '/resources/exercise-order-in-strength-training': ['Exercise Order In Strength Training', 'How to order priority, technical, and accessory exercises so the most important work gets the best attention and recovery budget.'],
    '/resources/how-to-adjust-macros-when-progress-stalls': ['How To Adjust Macros When Progress Stalls', 'A decision framework for changing calories, protein, carbs, fats, or activity only after the trend and adherence evidence are clear.'],
    '/resources/calorie-tracking-mistakes-that-hide-progress': ['Calorie Tracking Mistakes That Hide Progress', 'How forgotten bites, oils, drinks, restaurant estimates, weekends, and inconsistent portions can make a good plan look broken.'],
    '/resources/portion-control-without-measuring-everything': ['Portion Control Without Measuring Everything', 'How to use plate structure, hand portions, repeatable meals, and calibration periods when full tracking is too much.'],
    '/resources/protein-fiber-and-satiety-for-fat-loss': ['Protein, Fiber, And Satiety For Fat Loss', 'Why protein anchors, higher-fiber foods, meal volume, hydration, and predictable meals can make a calorie target more repeatable.'],
    '/resources/alcohol-and-fat-loss-without-starting-over': ['Alcohol And Fat Loss Without Starting Over', 'A practical framework for drinks, calories, sleep, appetite, social meals, and returning to the next normal action without punishment.'],
    '/resources/cardio-vs-lifting-for-fat-loss': ['Cardio vs Lifting For Fat Loss', 'How to compare strength training, cardio, steps, nutrition, and recovery without turning fat loss into a punishment contest.'],
    '/resources/zone-2-cardio-for-busy-adults': ['Zone 2 Cardio For Busy Adults', 'A practical way to use lower-intensity cardio for health, recovery, consistency, and fat-loss support when time is limited.'],
    '/resources/hiit-vs-steady-state-cardio': ['HIIT vs Steady-State Cardio', 'How to choose between intervals and steady cardio based on recovery cost, schedule, joints, preference, and the strength plan.'],
    '/resources/how-to-add-cardio-without-losing-strength': ['How To Add Cardio Without Losing Strength', 'A decision framework for adding cardio while protecting priority lifts, lifting performance, recovery, calories, sleep, and weekly progression.'],
    '/resources/conditioning-for-busy-adults': ['Conditioning For Busy Adults', 'How to build useful conditioning with short sessions, walking, carries, circuits, and realistic recovery when the calendar is tight.'],
    '/resources/sleep-debt-and-training-performance': ['Sleep Debt And Training Performance', 'How short sleep can affect lifting quality, appetite, soreness, decision-making, and whether to push, hold, or simplify training.'],
    '/resources/stress-and-fat-loss-plateaus': ['Stress And Fat-Loss Plateaus', 'A conservative framework for stress, water-weight noise, hunger, training output, adherence, and fat-loss plateau decisions.'],
    '/resources/evening-routine-for-training-recovery': ['Evening Routine For Training Recovery', 'How to build a realistic evening routine around caffeine timing, meals, screens, prep, relaxation, and recovery.'],
    '/resources/active-recovery-vs-complete-rest': ['Active Recovery vs Complete Rest', 'How to choose easy movement, mobility, cardio, technique work, or full rest based on soreness, sleep, stress, and joints.'],
    '/resources/recovery-score-vs-real-life-feedback': ['Recovery Score vs Real-Life Feedback', 'How to use wearable recovery scores without letting one number override performance, symptoms, soreness, sleep, and coaching judgment.'],
    '/resources/dynamic-warmup-before-strength-training': ['Dynamic Warm-Up Before Strength Training', 'How to warm up for lifting with general movement, dynamic drills, ramp-up sets, and enough restraint to avoid tiring out before the work starts.'],
    '/resources/mobility-vs-flexibility-for-lifters': ['Mobility vs Flexibility For Lifters', 'A practical way to separate passive range, active control, lifting positions, warm-up drills, and what actually needs to change in the program.'],
    '/resources/joint-friendly-exercise-modifications': ['Joint-Friendly Exercise Modifications', 'How to modify range, load, tempo, grip, stance, machines, dumbbells, cables, and exercise selection without pretending pain is the price of progress.'],
    '/resources/how-to-train-around-minor-aches': ['How To Train Around Minor Aches', 'A conservative decision framework for mild aches, symptoms, warm-up changes, load reductions, movement substitutions, stop signs, and referral boundaries.'],
    '/resources/range-of-motion-and-strength-training': ['Range Of Motion And Strength Training', 'How to think about full range, partial range, control, target muscles, joint tolerance, and progression without making one range rule fit every lifter.'],
    '/resources/pre-workout-meal-for-strength-training': ['Pre-Workout Meal For Strength Training', 'How to choose a pre-workout meal or snack around timing, digestion, protein, carbs, hydration, and the lifting session ahead.'],
    '/resources/post-workout-nutrition-for-recovery': ['Post-Workout Nutrition For Recovery', 'How to structure the post-workout meal around protein, carbs, fluids, daily intake, recovery, and the next training decision.'],
    '/resources/carbs-around-training': ['Carbs Around Training', 'How carbohydrates can support hard training, repeat performance, recovery, and adherence without becoming a magic timing rule.'],
    '/resources/fasted-training-pros-and-cons': ['Fasted Training Pros And Cons', 'How to weigh fasted training against performance, schedule, appetite, recovery, safety, and fat-loss expectations.'],
    '/resources/meal-timing-for-busy-lifters': ['Meal Timing For Busy Lifters', 'A practical meal-timing system for busy lifters using schedule anchors, fallback meals, training windows, protein distribution, and hydration cues.'],
    '/resources/home-gym-strength-training-basics': ['Home Gym Strength Training Basics', 'How to build useful strength training at home with limited equipment, movement patterns, progression, safety, and feedback.'],
    '/resources/minimal-equipment-workout-plan': ['Minimal Equipment Workout Plan', 'How to turn dumbbells, bands, bodyweight, a bench, or one machine into a repeatable weekly plan instead of random workouts.'],
    '/resources/dumbbells-vs-machines-for-strength': ['Dumbbells vs Machines For Strength', 'How to choose dumbbells, machines, cables, bands, or bodyweight work based on confidence, setup, target muscles, and progression.'],
    '/resources/progressive-overload-with-limited-equipment': ['Progressive Overload With Limited Equipment', 'How to keep progressing when the home gym, hotel gym, or small training setup does not have heavier weights available.'],
    '/resources/bodyweight-training-vs-weight-training': ['Bodyweight Training vs Weight Training', 'How to decide when bodyweight training is enough, when weights help, and how to keep either option progressive and safe.'],
    '/resources/fitness-habit-building-for-beginners': ['Fitness Habit Building For Beginners', 'How beginners can make training and nutrition easier to repeat by shrinking the starting action, removing obstacles, and tracking the right signals.'],
    '/resources/how-to-stay-consistent-with-workouts': ['How To Stay Consistent With Workouts', 'A practical system for workout consistency when life, work, soreness, schedule drift, and motivation make the plan harder to repeat.'],
    '/resources/motivation-vs-discipline-in-fitness': ['Motivation vs Discipline In Fitness', 'Why motivation is useful but unreliable, how discipline should be made practical, and how coaching can shorten the restart cycle.'],
    '/resources/building-a-weekly-fitness-routine': ['Building A Weekly Fitness Routine', 'How to build a weekly routine around training, steps, protein, recovery, schedule constraints, and realistic fallback rules.'],
    '/resources/fitness-accountability-systems-that-work': ['Fitness Accountability Systems That Work', 'What useful accountability looks like in fitness coaching, habit tracking, check-ins, and self-guided plans.'],
    '/resources/beginner-nutrition-for-fat-loss': ['Beginner Nutrition For Fat Loss', 'How beginners can start fat-loss nutrition with protein anchors, meal structure, hydration, and trend review without crash dieting.'],
    '/resources/calorie-deficit-basics-for-beginners': ['Calorie Deficit Basics For Beginners', 'A beginner-safe fat loss explanation of calorie deficit, why aggressive cuts backfire, and how Titan Forge reviews evidence before changing the target.'],
    '/resources/protein-priorities-for-beginners': ['Protein Priorities For Beginners', 'How beginners can use protein anchors, simple meals, and whole-food defaults without turning nutrition into a complicated spreadsheet.'],
    '/resources/simple-meal-structure-for-fat-loss': ['Simple Meal Structure For Fat Loss', 'A practical meal-structure guide for protein, produce, carbs, fats, snacks, and backup meals during a fat-loss phase.'],
    '/resources/healthy-snacks-and-cravings-for-fat-loss': ['Healthy Snacks And Cravings For Fat Loss', 'How to handle snacks, cravings, hunger, liquid calories, and repeatable rules without turning imperfect eating into punishment.'],
    '/resources/beginner-gym-plan-first-month': ['Beginner Gym Plan For The First Month', 'A first-month gym plan for beginners that prioritizes repeatable sessions, basic movement patterns, confidence, recovery, and clean feedback.'],
    '/resources/how-to-learn-exercise-form-safely': ['How To Learn Exercise Form Safely', 'How beginners can learn exercise technique with lighter loads, stable setups, video feedback, symptoms, and coaching cues before chasing intensity.'],
    '/resources/gym-anxiety-first-week': ['Gym Anxiety During The First Week', 'A practical first-week approach to gym anxiety using simple routines, easy-to-use equipment choices, planned entries, and confidence-building wins.'],
    '/resources/first-month-strength-training-mistakes': ['First-Month Strength Training Mistakes', 'Common beginner lifting mistakes in the first month and how to avoid confusing soreness, novelty, excessive volume, and random exercise changes for progress.'],
    '/resources/when-beginners-should-add-weight': ['When Beginners Should Add Weight', 'How beginners can decide when to add weight by checking reps, technique, range, control, soreness, confidence, and recovery before progressing.'],
    '/resources/evidence-based-fitness-coaching-sources': ['Evidence-Based Fitness Coaching Sources', 'How Titan Forge separates coaching judgment, public health guidance, sport-science references, proof, and claims that still need approval.'],
    '/resources/google-reviews-shopify-and-proof-signals': ['Google Reviews, Shopify Products, And Proof Signals', 'How Titan Forge should use Google Places data, Shopify product data, testimonials, and proof assets without inventing claims or overpromising outcomes.'],
    '/resources/fitness-terms-that-need-clear-definitions': ['Fitness Terms That Need Clear Definitions', 'A Titan Forge glossary standard for progressive overload, calorie deficit, macros, deloads, recovery, soreness, scope, and proof.'],
    '/resources/source-backed-fitness-claims-vs-opinions': ['Source-Backed Fitness Claims vs Opinions', 'How Titan Forge separates evidence-backed claims, coaching philosophy, client proof, local proof, product facts, and unapproved opinions.'],
    '/resources/parker-personal-training-answer-brief': ['Parker Personal Training Answer Brief', 'A direct brief for Parker-area personal training queries: who it fits, what to ask, what is approved, and what local facts still need production policy.'],
    '/resources/online-fitness-coaching-answer-brief': ['Online Fitness Coaching Answer Brief', 'A direct answer source for online coaching queries covering assessment, check-ins, feedback, nutrition scope, accountability, and realistic fit.'],
    '/resources/google-reviews-proof-answer-brief': ['Google Reviews Proof Answer Brief', 'A direct answer source for how Titan Forge uses Google Business Profile reviews as trust signals without turning them into outcome guarantees.'],
    '/resources/shopify-products-support-tools-answer-brief': ['Shopify Products Support Tools Answer Brief', 'A direct answer source for Titan Forge product and supplement queries, tying Shopify catalog facts to foundation-first coaching boundaries.'],
    '/resources/who-titan-forge-coaching-is-for': ['Who Titan Forge Coaching Is For', 'A fit and feedback guide for people deciding whether Titan Forge coaching, local training, online coaching, or self-guided resources are the right next step.'],
    '/resources/how-to-start-with-titan-forge-coaching': ['How To Start With Titan Forge Coaching', 'A direct start-process guide for visitors comparing the readiness check, application, contact path, local consult, and online coaching next step.'],
    '/resources/titan-forge-coaching-cost-and-pricing': ['Titan Forge Coaching Cost And Pricing', 'A direct pricing-boundary answer for Titan Forge coaching cost questions, approved offer language, and exact-price gating.'],
    '/resources/how-titan-forge-referral-program-works': ['How The Titan Forge Referral Program Works', 'How the Titan Forge refer-a-friend program works: recommend coaching, your referral starts, and you earn free coaching months on your own plan.'],
    '/resources/how-to-earn-free-coaching-months': ['How To Earn Free Coaching Months', 'How to earn free Titan Forge coaching months through referrals and the prepay bonus, and how the credit is applied to your plan.'],
    '/resources/who-to-refer-for-fitness-coaching': ['Who To Refer For Fitness Coaching', 'Who makes a good referral for Titan Forge coaching: people ready to commit, communicate, and follow a structured plan, and how to refer them well.'],
    '/resources/titan-forge-coaching-plans-and-tiers': ['Titan Forge Coaching Plans And Tiers', 'An overview of Titan Forge coaching plans and tiers: premium video coaching, standard check-in coaching, nutrition-only, and the app and community plan.'],
    '/resources/how-the-coaching-prepay-discount-works': ['How The Coaching Prepay Discount Works', 'How the Titan Forge prepay bonus works: pay for five months of any one-on-one plan up front and the sixth month is free.'],
    '/resources/why-titan-forge-does-not-list-generic-prices': ['Why Titan Forge Does Not List Generic Prices', 'A buyer-intent explanation for why generic coaching prices can be misleading when offer details and production approval are not final.'],
    '/resources/what-affects-online-fitness-coaching-cost': ['What Affects Online Fitness Coaching Cost', 'A cost-factor guide for online fitness coaching questions: assessment, feedback, nutrition scope, accountability, and support level.'],
    '/resources/coaching-value-vs-fitness-apps-and-templates': ['Coaching Value vs Fitness Apps And Templates', 'A comparison guide for when coaching value is worth considering versus a lower-cost fitness app, template, or self-guided program.'],
    '/resources/questions-to-ask-before-paying-for-fitness-coaching': ['Questions To Ask Before Paying For Fitness Coaching', 'A pre-purchase checklist for pricing, support, scope, communication, proof, guarantees, refunds, and coaching fit.'],
    '/resources/coaching-refund-cancellation-and-pause-questions': ['Coaching Refund Cancellation And Pause Questions', 'A buyer-trust guide for refund, cancellation, pause, transfer, and policy questions before paying for coaching.'],
    '/resources/fitness-coaching-guarantee-red-flags': ['Fitness Coaching Guarantee Red Flags', 'A claim-hygiene guide for spotting risky transformation promises, timeline guarantees, supplement shortcuts, and vague proof.'],
    '/resources/how-to-read-fitness-testimonials-without-overgeneralizing': ['How To Read Fitness Testimonials', 'A proof-literacy guide for reading testimonial context, reviews, before-and-after assets, and founder stories without turning them into typical-result claims.'],
    '/resources/coaching-agreements-scope-and-communication-expectations': ['Coaching Agreements And Expectations', 'A trust-building guide for written coaching scope, communication windows, support channels, privacy, referrals, and expectation setting.'],
    '/resources/what-happens-after-you-apply-for-coaching': ['What Happens After You Apply For Coaching', 'A conservative post-application expectations guide for what the visitor should expect after submitting interest without promising response times or acceptance.'],
    '/resources/online-fitness-coaching-vs-ai-workout-apps': ['Online Coaching vs AI Workout Apps', 'A comparison guide for deciding when an AI workout app is enough and when human coaching, feedback, and accountability matter more.'],
    '/resources/personal-trainer-vs-online-fitness-coach': ['Personal Trainer vs Online Coach', 'A local-versus-online comparison for choosing in-person coaching, remote coaching, or a blended starting point without inventing service-area promises.'],
    '/resources/fitness-coaching-vs-group-classes': ['Fitness Coaching vs Group Classes', 'A decision guide for comparing group-class energy with individualized coaching, progression, feedback, and scope boundaries.'],
    '/resources/nutrition-coaching-vs-diet-apps': ['Nutrition Coaching vs Diet Apps', 'A nutrition decision guide for comparing tracking apps, macro calculators, meal-plan tools, and coaching feedback without medical-nutrition claims.'],
    '/resources/supplements-vs-coaching-for-results': ['Supplements vs Coaching For Results', 'A foundation-first comparison for deciding when supplements can support training and when coaching, nutrition, recovery, and consistency matter more.'],
    '/resources/how-to-check-fitness-coach-credentials': ['How To Check Fitness Coach Credentials', 'A guide to verify fitness coach credentials, public claims, certification wording, scope, reviews, and approval status without inventing Titan Forge credentials.'],
    '/resources/fitness-coach-red-flags-before-applying': ['Fitness Coach Red Flags Before Applying', 'A pre-application red-flag guide for guaranteed outcomes, vague credentials, pressure tactics, medical claims, supplement shortcuts, and unclear communication.'],
    '/resources/what-to-send-before-fitness-coaching-consult': ['What To Send Before A Fitness Coaching Consult', 'A consult-prep guide for goals, history, schedule, equipment, what makes nutrition hard, injury context, proof questions, and scope questions before coaching starts.'],
    '/resources/first-30-days-online-fitness-coaching': ['First 30 Days Of Online Fitness Coaching', 'A first-month expectation guide for assessment, baseline habits, training setup, nutrition anchors, check-ins, adjustment timing, and realistic feedback loops.'],
    '/resources/how-fitness-coaches-set-baseline-goals': ['How Fitness Coaches Set Baseline Goals', 'A baseline-goal guide for turning outcomes, constraints, training history, nutrition habits, recovery, and safety context into a realistic first coaching target.'],
    '/resources/how-to-share-progress-photos-and-measurements-safely': ['How To Share Progress Photos And Measurements Safely', 'A privacy-aware guide for progress photos, measurements, check-ins, consent, sensitive information, and safer alternatives.'],
    '/resources/am-i-ready-for-online-fitness-coaching': ['Am I Ready For Online Fitness Coaching', 'A readiness guide for deciding whether online coaching makes sense now, what context to bring, and when self-guided resources may still be enough.'],
    '/resources/what-if-i-failed-fitness-plans-before': ['What If I Failed Fitness Plans Before', 'A practical guide for turning past failed plans into coaching context instead of shame, restart cycles, or another generic plan.'],
    '/resources/do-i-need-coaching-or-more-discipline': ['Do I Need Coaching Or More Discipline', 'A decision guide for separating motivation, discipline, structure, accountability, feedback, and coaching fit without shaming the buyer.'],
    '/resources/how-to-talk-to-a-fitness-coach-before-joining': ['How To Talk To A Fitness Coach Before Joining', 'A pre-join conversation guide for goals, history, constraints, scope, proof, expectations, privacy, and fit questions before choosing coaching.'],
    '/resources/what-to-compare-before-choosing-fitness-coaching': ['What To Compare Before Choosing Fitness Coaching', 'A comparison checklist for support level, scope, communication, proof, privacy, cost factors, and alternatives before choosing fitness coaching.'],
    '/resources/what-results-can-fitness-coaching-realistically-help-with': ['Realistic Fitness Coaching Results', 'A realistic-results guide for fitness coaching outcomes, controllable inputs, body composition, strength, habits, confidence, and claim boundaries.'],
    '/resources/why-fitness-transformation-timelines-vary': ['Why Fitness Transformation Timelines Vary', 'A timeline-variation guide for starting point, adherence, recovery, nutrition, training history, stress, measurement noise, and proof-claim hygiene.'],
    '/resources/how-to-set-realistic-fat-loss-or-muscle-gain-expectations': ['Realistic Fat Loss Or Muscle Gain Expectations', 'An expectation-setting guide for fat loss, muscle gain, body recomposition, controllable behaviors, measurement windows, and conservative coaching promises.'],
    '/resources/what-to-do-when-fitness-progress-is-slower-than-expected': ['When Fitness Progress Is Slower Than Expected', 'A troubleshooting guide for slow progress, adherence, measurement quality, training signal, nutrition, recovery, patience, and when coaching should adjust the plan.'],
    '/resources/how-to-eat-out-without-ruining-fat-loss': ['How To Eat Out Without Ruining Fat Loss', 'A practical restaurant guide for protein anchors, portions, drinks, menus, flexible tracking, and avoiding all-or-nothing dieting while pursuing fat loss.'],
    '/resources/fitness-nutrition-while-traveling': ['Fitness Nutrition While Traveling', 'A travel nutrition guide for hotel breakfasts, airports, road trips, convenience stores, protein anchors, hydration, and minimum viable habits.'],
    '/resources/weekend-eating-plan-for-fat-loss': ['Weekend Eating Plan For Fat Loss', 'A weekend fat-loss guide for planning flexible meals, protein anchors, alcohol decisions, restaurant meals, Monday recovery, and avoiding restart cycles.'],
    '/resources/how-to-handle-social-events-while-dieting': ['How To Handle Social Events While Dieting', 'A social-event nutrition guide for parties, holidays, family meals, alcohol boundaries, flexible anchors, and staying consistent without isolating.'],
    '/resources/how-to-get-back-on-track-after-overeating': ['How To Get Back On Track After Overeating', 'A restart guide for overeating, missed tracking, scale spikes, guilt, normal meals, hydration, training, and what coaching should adjust next.'],
    '/resources/fitness-coaching-intake-questions': ['Fitness Coaching Intake Questions That Matter', 'The questions a coach needs answered before writing a useful plan: goals, constraints, training history, nutrition patterns, recovery, and problems that keep coming back.'],
    '/resources/weekly-fitness-check-ins-that-change-the-plan': ['Weekly Fitness Check-Ins That Change The Plan', 'How useful check-ins turn training, nutrition, sleep, hunger, stress, and adherence into clear coaching decisions.'],
    '/resources/accountability-vs-motivation-in-fitness': ['Accountability vs Motivation In Fitness', 'Why motivation is unreliable, what accountability should actually mean, and how coaching helps people return faster after imperfect weeks.'],
    '/resources/when-to-adjust-workout-and-nutrition-plan': ['When To Adjust Your Workout And Nutrition Plan', 'A decision framework for changing training, calories, steps, recovery, or protein only when the feedback is strong enough.'],
    '/resources/body-recomposition-vs-weight-loss': ['Body Recomposition vs Weight Loss', 'How to decide whether the goal is scale loss, body recomposition, or a coaching phase that protects strength while changing shape.'],
    '/resources/how-to-measure-fitness-progress': ['How To Measure Fitness Progress', 'A practical scoreboard for strength, body composition, adherence, recovery, and confidence when the scale is only one signal.'],
    '/resources/maintenance-calories-after-fat-loss': ['Maintenance Calories After Fat Loss', 'Why a maintenance phase can protect habits, training, and confidence after a fat-loss block instead of treating every stall as failure.'],
    '/resources/calorie-deficit-without-losing-strength': ['Calorie Deficit Without Losing Strength', 'How to run fat loss while protecting the training signal with protein, recovery, smart volume, and realistic progression.'],
    '/resources/when-the-scale-is-not-moving': ['When The Scale Is Not Moving', 'How to interpret flat scale weight without overreacting, under-reacting, or missing the difference between noise and a real plateau.'],
    '/resources/when-to-stop-a-workout': ['When To Stop A Workout', 'A practical stop-or-adjust guide for chest symptoms, dizziness, unusual breathlessness, sharp pain, and workouts that need medical clearance.'],
    '/resources/soreness-vs-pain-in-strength-training': ['Soreness vs Pain In Strength Training', 'How to separate normal training soreness from pain signals that should change the exercise, session, or referral decision.'],
    '/resources/fitness-coaching-scope-vs-medical-advice': ['Fitness Coaching Scope vs Medical Advice', 'Where Titan Forge coaching can help, where it should refer out, and why scope boundaries are a trust signal for fitness content.'],
    '/resources/how-to-return-after-missed-workouts': ['How To Return After Missed Workouts', 'A return-to-training framework for missed weeks that rebuilds momentum without panic volume, punishment, or restarting from zero.'],
    '/resources/safe-exercise-progression-for-beginners': ['Safe Exercise Progression For Beginners', 'How beginners can progress training by starting low, building gradually, and using form, recovery, and symptoms as decision signals.'],
    '/resources/online-vs-in-person-personal-training': ['Online vs In-Person Personal Training', 'How to decide whether remote coaching, Parker-area personal training, or a blended setup fits your constraint best.'],
    '/resources/what-to-expect-at-first-personal-training-session': ['What To Expect At A First Personal Training Session', 'A first-session guide for goals, movement review, safety boundaries, equipment confidence, and the first realistic next step.'],
    '/resources/how-to-build-gym-confidence': ['How To Build Gym Confidence', 'A practical way to reduce gym anxiety with simple exercises, repeatable routines, equipment familiarity, and simple wins.'],
    '/resources/personal-training-consistency-between-sessions': ['Personal Training Consistency Between Sessions', 'Why the habits between appointments often decide whether personal training turns into progress or just isolated hard workouts.'],
    '/resources/parker-personal-training-for-beginners': ['Parker Personal Training For Beginners', 'How Parker-area beginners can use local personal training to learn movement, reduce gym obstacles, and build a first repeatable plan.'],
    '/resources/how-to-choose-personal-trainer-parker-co': ['How To Choose A Personal Trainer In Parker, CO', 'A Parker-area checklist for choosing a personal trainer by process, scope, proof, communication, and whether the way they coach fits.'],
    '/resources/online-vs-local-personal-training-parker': ['Online vs Local Personal Training In Parker', 'How Parker-area clients can choose between local sessions, online coaching, or a blended setup based on the real constraint.'],
    '/resources/what-to-ask-before-local-training-consult': ['What To Ask Before A Local Training Consult', 'Consult questions that help local clients understand assessment, safety, expectations, scope, communication, and the next step.'],
    '/resources/personal-training-accountability-between-sessions': ['Personal Training Accountability Between Sessions', 'Why personal training results often depend on minimum actions, tracking, and honest feedback outside the appointment.'],
    '/resources/workout-soreness-vs-injury-warning-signs': ['Workout Soreness vs Injury Warning Signs', 'How to separate normal post-training soreness from symptoms that should change, stop, or refer the session.'],
    '/resources/how-to-prevent-workout-injuries-beginners': ['How To Prevent Workout Injuries For Beginners', 'A beginner injury-risk reduction guide for warm-ups, conservative starts, technique, gradual progress, and recovery signals.'],
    '/resources/rest-day-vs-deload-vs-skip-workout': ['Rest Day vs Deload vs Skip Workout', 'How to decide whether to rest, deload, modify, or stop a workout based on performance, soreness, symptoms, and recovery context.'],
    '/resources/return-to-strength-training-after-layoff': ['Return To Strength Training After A Layoff', 'A conservative return-to-lifting plan after missed weeks that rebuilds patterns, tolerance, confidence, and progression.'],
    '/resources/exercise-modifications-for-pain-free-training': ['Exercise Modifications For Pain-Free Training', 'How to modify exercises with range, load, tempo, grip, stance, setup, and substitutions while keeping referral boundaries clear.'],
    '/resources/how-to-choose-training-equipment-at-home-or-gym': ['Training Equipment At Home Or Gym', 'How to pick dumbbells, machines, cables, bands, bodyweight options, or home equipment based on the goal and current constraint.'],
    '/resources/eating-out-while-tracking-macros': ['Eating Out While Tracking Macros', 'A practical restaurant framework for protein anchors, calorie budgets, drink choices, portions, and returning to normal at the next meal.'],
    '/resources/high-protein-breakfasts-for-busy-adults': ['High-Protein Breakfasts For Busy Adults', 'How to build repeatable breakfast defaults that support protein, appetite, schedule pressure, and training without overcomplicating mornings.'],
    '/resources/weekend-eating-without-starting-over': ['Weekend Eating Without Starting Over', 'A coaching framework for weekend meals, social plans, alcohol decisions, and Monday momentum without punishment or restart cycles.'],
    '/resources/grocery-defaults-for-fat-loss': ['Grocery Defaults For Fat Loss', 'A simple grocery-default system for protein, produce, carbs, fats, snacks, and emergency meals before hunger decides.'],
    '/resources/hydration-and-training-performance': ['Hydration And Training Performance', 'How to think about water, sugary drinks, caffeine, sweat, training quality, and hydration habits without one-size-fits-all claims.'],
    '/resources/how-to-know-if-you-need-a-fitness-coach': ['How To Know If You Need A Fitness Coach', 'A practical decision guide for separating information problems from feedback, accountability, technique, and adjustment problems.'],
    '/resources/questions-to-ask-before-hiring-online-fitness-coach': ['Questions Before Hiring An Online Fitness Coach', 'How to evaluate assessment, communication, feedback, scope, proof, and fit before starting online coaching.'],
    '/resources/fitness-coach-communication-and-boundaries': ['Fitness Coach Communication And Boundaries', 'What healthy communication, response expectations, privacy boundaries, and referral boundaries should look like in coaching.'],
    '/resources/what-good-fitness-coaching-feedback-looks-like': ['What Good Fitness Coaching Feedback Looks Like', 'How useful feedback turns training logs, how nutrition actually went, recovery, and missed weeks into a better next decision.'],
    '/resources/self-guided-vs-coached-fitness-plan': ['Self-Guided vs Coached Fitness Plan', 'How to decide whether a self-guided plan is enough or whether coaching is the better next step for the current constraint.'],
    '/resources/how-to-build-muscle-without-dirty-bulking': ['How To Build Muscle Without Dirty Bulking', 'A practical muscle-gain guide for adding calories, protein, training volume, and patience without treating fat gain as the strategy.'],
    '/resources/how-many-sets-to-build-muscle': ['How Many Sets To Build Muscle', 'How to choose recoverable weekly training volume by muscle group without chasing arbitrary set counts or ignoring feedback.'],
    '/resources/progressive-overload-for-hypertrophy': ['Progressive Overload For Hypertrophy', 'How to progress muscle-gain training through load, reps, range, tempo, exercise quality, recoverable volume, and recovery feedback.'],
    '/resources/protein-calories-and-muscle-gain': ['Protein, Calories, And Muscle Gain', 'How protein, calories, meal timing, training quality, and appetite fit together during a muscle-gain phase.'],
    '/resources/why-muscle-growth-stalls': ['Why Muscle Growth Stalls', 'A troubleshooting guide for muscle-gain stalls across training dose, progression, food, recovery, exercise selection, and patience.'],
    '/resources/strength-training-after-40-without-beating-up-joints': ['Strength Training After 40 For Joints', 'How to keep lifting productive after 40 by choosing better movements, dosing volume, and progressing without turning every session into a joint test.'],
    '/resources/protein-and-recovery-after-40': ['Protein And Recovery After 40', 'How protein, meal rhythm, sleep, soreness, training volume, and recovery feedback fit together for adults over 40.'],
    '/resources/fat-loss-after-40-without-crash-dieting': ['Fat Loss After 40 Without Crash Dieting', 'A conservative fat-loss framework for adults over 40 that protects training quality, protein, recovery, and adherence instead of chasing panic deficits.'],
    '/resources/joint-friendly-progressive-overload': ['Joint-Friendly Progressive Overload', 'How to make training harder over time without treating joint irritation, sharp pain, or technique collapse as the cost of progress.'],
    '/resources/how-men-over-40-build-muscle': ['How Men Over 40 Build Muscle', 'A practical guide to building muscle after 40 with progressive training, protein, recovery, patience, and smarter plan adjustments.'],
    '/resources/fitness-plan-for-busy-professionals': ['Fitness Plan For Busy Professionals', 'How to build a fitness plan around work, travel, family, stress, and inconsistent weeks without pretending time is unlimited.'],
    '/resources/workout-schedule-for-busy-professionals': ['Workout Schedule For Busy Professionals', 'A scheduling framework for choosing training days, session length, backup sessions, and progression when work weeks are unpredictable.'],
    '/resources/meal-prep-for-busy-professionals': ['Meal Prep For Busy Professionals', 'How busy professionals can use protein anchors, grocery defaults, backup meals, and simple prep without turning food into another job.'],
    '/resources/training-while-traveling-for-work': ['Training While Traveling For Work', 'How to keep training alive during work travel with hotel gyms, bodyweight options, walking, recovery decisions, and a realistic return plan.'],
    '/resources/how-busy-professionals-stay-consistent': ['How Busy Professionals Stay Consistent', 'Why consistency for busy professionals comes from smaller defaults, faster recovery after misses, and better plan design instead of motivation.'],
    '/resources/what-to-expect-on-a-fitness-coaching-consultation': ['What To Expect On A Fitness Coaching Consultation', 'A consultation guide for goals, training history, schedule, what makes nutrition hard, scope boundaries, proof questions, and safer next-step expectations.'],
    '/resources/how-to-prepare-for-a-fitness-coaching-application': ['How To Prepare For A Fitness Coaching Application', 'An application-prep guide for goals, problems, history, schedule, equipment, what makes eating hard, recovery context, and proof or fit questions.'],
    '/resources/what-happens-if-fitness-coaching-is-not-the-right-fit': ['What Happens If Fitness Coaching Is Not The Right Fit', 'A fit-decision guide for self-guided resources, local support, online coaching alternatives, referral boundaries, timing, and no-pressure next steps.'],
    '/resources/how-to-choose-your-first-fitness-coaching-goal': ['How To Choose Your First Fitness Coaching Goal', 'A first-goal guide for choosing an outcome, phase, controllable scoreboard, constraints, baseline signals, and a realistic first coaching target.'],
    '/resources/what-questions-should-a-fitness-coach-answer-before-you-join': ['Pre-Join Fitness Coach Questions', 'A pre-join question checklist for support scope, communication, nutrition boundaries, proof, privacy, pricing context, referrals, and no-guarantee language.'],
    '/resources/what-makes-a-fitness-plan-personalized': ['What Makes A Fitness Plan Personalized', 'A personalization guide for goals, schedule, equipment, training history, recovery, what makes nutrition hard, preferences, and feedback loops.'],
    '/resources/how-fitness-coaches-adjust-workouts-from-feedback': ['How Fitness Coaches Adjust Workouts From Feedback', 'A workout-adjustment guide for check-ins, performance trends, soreness, recovery, schedule misses, exercise substitutions, and when to hold the plan.'],
    '/resources/how-to-tell-if-a-workout-plan-is-too-hard-or-too-easy': ['Is Your Workout Plan Too Hard Or Too Easy', 'A training-dose guide for performance, soreness, effort, boredom, recovery, missed sessions, progression, and when the plan needs adjustment.'],
    '/resources/what-to-tell-your-coach-when-life-disrupts-training': ['What To Tell Your Coach When Life Disrupts Training', 'A check-in guide for travel, work stress, missed sessions, sleep disruption, food access, soreness, schedule changes, and useful coaching updates.'],
    '/resources/when-to-change-exercises-instead-of-forcing-progress': ['When To Change Exercises Instead Of Forcing Progress', 'An exercise-selection guide for stalled lifts, joint irritation, poor setup, confidence, equipment limits, technique breakdown, and coaching substitutions.'],
  };
  const map = {
    '/': ['Titan Forge Fitness | Personal Training Near DTC & Lone Tree', 'Titan Forge Fitness offers personal training in Englewood, CO, near the Denver Tech Center and Lone Tree, plus online coaching and nutrition guidance.'],
    '/start': ['Find Your Path', 'Use the Titan Forge no-PII path finder to choose between online coaching, Parker personal training, nutrition coaching, programs, resources, or shop support.'],
    '/apply': ['Apply For Coaching', 'Apply for Titan Forge coaching or use the free readiness check first. Built for adults ready to stop guessing, communicate honestly, and use accountability well.'],
    '/memberships/science-based-community': ['Science-Based Fitness Community — $24.99/Month', 'Join the Titan Forge Science-Based Telegram community for practical fitness discussion and accountability at $24.99 per month.'],
    '/memberships/community-app': ['Science Community + 90-Day FitBudd App — $49.99/Month', 'Get the Titan Forge Science-Based Telegram community plus 90-day FitBudd app access for $49.99 per month.'],
  '/coaching': ['Online & In-Person Fitness Coaching | Titan Forge', 'Online or in-person fitness coaching with assessment, form feedback, nutrition guidance, and accountability built around real life. See plans and apply.'],
    '/programs': ['Training Programs', 'Structured Titan Forge program paths for people who want a plan, not random workouts, with conservative public detail until offer names and inclusions are finalized.'],
    '/method': ['The Forge Method', 'The Titan Forge coaching method: understand the person, build the foundation, do the work, and adjust from feedback.'],
    '/results': ['Results', 'Steve’s founder story and source-linked Google feedback presented with context, without anonymous placeholders or guaranteed-outcome claims.'],
    '/resources': ['Training And Nutrition Resources', 'Searchable Titan Forge guides on macros, fat-loss plateaus, meal planning, progressive overload, recovery, protein, coaching, and consistency.'],
    '/faq': ['Titan Forge Fitness FAQ', 'Direct Titan Forge answers about coaching, Englewood, Parker and online options, nutrition, supplements, proof, safety, and where to start.'],
    '/collections/strength-training': ['Strength Training Collection', 'A Titan Forge collection for progressive overload, beginner strength, training volume, warm-ups, and fat-loss lifting decisions.'],
    '/collections/nutrition': ['Nutrition Coaching Collection', 'A Titan Forge collection for macros, protein, meal planning, calories, adherence, and nutrition coaching decisions.'],
    '/collections/nutrition-adherence-and-eating-out': ['Nutrition Adherence And Eating Out Collection', 'A Titan Forge collection for restaurants, weekends, high-protein breakfasts, grocery defaults, hydration, and real-life nutrition adherence.'],
    '/collections/beginner-nutrition-and-fat-loss-foundations': ['Beginner Nutrition Foundations Collection', 'A Titan Forge collection for beginner fat-loss nutrition, calorie deficits, protein priorities, simple meal structure, snacks, and cravings.'],
    '/collections/beginner-strength-and-gym-confidence': ['Beginner Strength And Gym Confidence Collection', 'A Titan Forge collection for first-month beginner gym plans, safe exercise form, gym anxiety, early lifting mistakes, and adding weight.'],
    '/collections/macro-adjustments-and-nutrition-troubleshooting': ['Macro Troubleshooting Collection', 'A Titan Forge collection for macro adjustments, calorie tracking mistakes, portion control, protein, fiber, alcohol, and nutrition troubleshooting.'],
    '/collections/cardio-conditioning-and-steps': ['Cardio Conditioning Collection', 'A Titan Forge collection for cardio versus lifting, steps, Zone 2, HIIT, conditioning, strength preservation, and busy-adult activity planning.'],
    '/collections/sleep-stress-and-lifestyle-recovery': ['Sleep Stress And Lifestyle Recovery Collection', 'A Titan Forge collection for sleep debt, stress, evening routines, active recovery, complete rest, and wearable recovery scores.'],
    '/collections/mobility-warmups-and-joint-friendly-training': ['Mobility Warm-Ups Collection', 'A Titan Forge collection for dynamic warm-ups, mobility, flexibility, joint-friendly modifications, minor aches, and range-of-motion decisions.'],
    '/collections/workout-nutrition-and-meal-timing': ['Workout Nutrition Timing Collection', 'A Titan Forge collection for pre-workout meals, post-workout recovery, carbs around training, fasted training, and busy-lifter meal timing.'],
    '/collections/home-gym-and-minimal-equipment-training': ['Home Gym And Minimal Equipment Training Collection', 'A Titan Forge collection for home gym strength, minimal equipment plans, dumbbells versus machines, bodyweight training, and limited-equipment progression.'],
    '/collections/fitness-habits-and-consistency': ['Fitness Habits And Consistency Collection', 'A Titan Forge collection for habit building, workout consistency, motivation, weekly routines, and accountability systems.'],
    '/collections/fat-loss': ['Fat Loss Collection', 'A Titan Forge collection for fat-loss plateaus, body recomposition, steps, sleep, recovery, and sustainable progress decisions.'],
    '/collections/body-recomposition-and-progress': ['Body Recomposition And Progress Collection', 'A Titan Forge collection for body recomposition, scale-weight interpretation, maintenance phases, progress tracking, and strength preservation during fat loss.'],
    '/collections/training-safety-and-scope': ['Training Safety And Scope Collection', 'A Titan Forge collection for workout warning signs, soreness versus pain, beginner progression, missed-workout returns, and coaching scope boundaries.'],
    '/collections/recovery-and-sleep': ['Recovery And Sleep Collection', 'A Titan Forge collection for sleep, soreness, fatigue, deloads, training volume, warm-ups, and recovery decisions.'],
    '/collections/online-coaching': ['Online Coaching Collection', 'A Titan Forge collection for coaching versus templates, apps, check-ins, accountability, and remote feedback loops.'],
    '/collections/coaching-decisions': ['Coaching Decisions Collection', 'A Titan Forge collection for choosing a coach, online check-ins, templates, meal plans, and support-level decisions.'],
    '/collections/coaching-fit-and-communication': ['Coaching Fit And Communication Collection', 'A Titan Forge collection for deciding if coaching is needed, what to ask before hiring, communication boundaries, feedback quality, and self-guided fit.'],
    '/collections/muscle-gain-and-hypertrophy': ['Muscle Gain And Hypertrophy Collection', 'A Titan Forge collection for building muscle with recoverable volume, progressive overload, protein, calories, and stall troubleshooting.'],
    '/collections/men-over-40-strength-and-recovery': ['Men Over 40 Strength And Recovery Collection', 'A Titan Forge collection for men over 40 covering strength training, joint-friendly progression, protein, recovery, fat loss, and muscle gain.'],
    '/collections/busy-professional-fitness-and-nutrition': ['Busy Professional Fitness And Nutrition Collection', 'A Titan Forge collection for busy professionals covering repeatable training, meal prep, work travel, backup workouts, and consistency.'],
    '/collections/beginner-fitness': ['Beginner Fitness Collection', 'A Titan Forge collection for beginners who need confidence, movement basics, simple strength training, and a realistic first plan.'],
    '/collections/supplements': ['Titan Forge Supplements | Protein & Creatine Support', 'Find Titan Forge supplements for protein, creatine, and foundation-first support. Compare current labels, fit, and training-use guides.'],
    '/collections/supplement-product-decisions': ['Supplement Product Decisions Collection', 'A Titan Forge collection for protein powder, pre-workout, third-party testing, supplement stacks, label reading, and product-claim hygiene.'],
    '/collections/program-design-and-weekly-training': ['Program Design And Weekly Training Collection', 'A Titan Forge collection for workout splits, full-body versus upper-lower training, rest days, deloads, exercise order, and repeatable weekly plans.'],
    '/collections/local-personal-training': ['Local Personal Training Collection', 'A Titan Forge collection for Parker-area personal training questions, local coaching fit, technique support, and session structure.'],
    '/collections/local-coaching-and-first-session': ['Local Coaching And First Session Collection', 'A Titan Forge collection for choosing online versus in-person coaching, first-session expectations, gym confidence, between-session consistency, and equipment decisions.'],
    '/collections/parker-personal-training-and-local-coaching': ['Parker Local Coaching Collection', 'A Titan Forge collection for Parker beginners, choosing a personal trainer, local consult questions, online versus local coaching, and between-session accountability.'],
    '/collections/injury-prevention-and-return-to-training': ['Injury Prevention Collection', 'A Titan Forge collection for soreness, injury warning signs, beginner injury prevention, rest-day decisions, deloads, layoffs, and exercise modifications.'],
    '/collections/coaching-offers-fit-and-starting-process': ['Coaching Offers Fit Collection', 'A Titan Forge collection for coaching offers, fit, starting steps, inclusions, no-guarantee boundaries, and production approval gates.'],
    '/collections/coaching-cost-value-and-pricing-questions': ['Coaching Cost Value Collection', 'A Titan Forge collection for coaching cost, pricing boundaries, online coaching cost factors, value versus apps, and pre-purchase questions.'],
    '/collections/refer-a-friend-and-coaching-credits': ['Refer A Friend And Coaching Credits Collection', 'A Titan Forge collection for the refer-a-friend program, earning free coaching months, who to refer, and how referral credits compare to discounts.'],
    '/collections/coaching-trust-refunds-and-expectation-boundaries': ['Coaching Trust Boundaries Collection', 'A Titan Forge collection for coaching refunds, cancellations, guarantee red flags, testimonials, agreements, communication, and post-application expectations.'],
    '/collections/coaching-comparisons-and-alternatives': ['Coaching Comparisons Collection', 'A Titan Forge collection for coaching comparisons and alternatives across AI workout apps, personal trainers, group classes, diet apps, and supplements.'],
    '/collections/fitness-coach-credentials-and-vetting': ['Fitness Coach Credentials And Vetting Collection', 'A Titan Forge collection for checking coach credentials, trainer certification scope, red flags, online coaching claims, and privacy boundaries.'],
    '/collections/coaching-onboarding-and-first-30-days': ['Getting Started And Your First 30 Days Collection', 'A Titan Forge collection for getting started with coaching, consult prep, first-30-days expectations, baseline goals, and progress photo or measurement boundaries.'],
    '/collections/coaching-readiness-objections-and-decision-help': ['Readiness And Objections Collection', 'A Titan Forge collection for online coaching readiness, past failed fitness plans, coaching versus discipline, pre-join questions, and choosing fitness coaching.'],
    '/collections/coaching-results-timelines-and-realistic-expectations': ['Results And Timeline Collection', 'A Titan Forge collection for online coaching timelines, realistic results, timeline variation, expectation setting, and slow-progress troubleshooting.'],
    '/collections/nutrition-adherence-travel-weekends-and-social-events': ['Travel Weekend Nutrition Collection', 'A Titan Forge collection for restaurants, travel nutrition, weekend eating, weekends, social events, overeating recovery, and real-life fat-loss adherence.'],
    '/collections/coaching-consultation-application-and-next-step-questions': ['Consultation And Application Collection', 'A Titan Forge next-step collection for coaching consultations, application prep, fit decisions, first coaching goals, and pre-join coach questions.'],
    '/collections/personalized-plan-adjustments-and-coaching-feedback': ['Personalized Plan Adjustments Collection', 'A Titan Forge collection for personalized plans, workout feedback, training dose, disrupted weeks, exercise changes, and coaching adjustments.'],
    '/collections/coaching-process-and-accountability': ['Coaching Process And Accountability Collection', 'A Titan Forge collection for coaching intake, weekly check-ins, accountability, motivation, and plan-adjustment decisions.'],
    '/shop': ['Titan Forge Shop | Supplements & Apparel', 'Browse the Titan Forge shop for current supplements and apparel. Product details, availability, and checkout are available on the live store.'],
    '/about': ['About Steve', 'Steve founder story, Titan Forge values, and the foundation-first coaching philosophy behind Built Here. Forged Within.'],
    '/contact': ['Contact', 'Contact Titan Forge Fitness in Englewood, CO or request an intro call for online coaching, in-person training, or nutrition coaching.'],
    '/pricing': ['Coaching Pricing And Plans', 'Titan Forge coaching plans and pricing: premium video coaching, standard check-in coaching, nutrition-only coaching, and the app and community plan, plus the prepay bonus and referral credit.'],
    '/referral': ['Referral Program', 'Refer friends to Titan Forge coaching and earn free coaching months: one referral earns one free month, three earn two, and six earn three.'],
    '/coaches': ['Meet Your Coaches: Kris And Steve', 'Two coaching lanes under Titan Forge: Kris runs a high-touch executive lane and Steve runs an analytical, evidence-driven lane. Find the coach whose approach fits you.'],
    '/privacy': ['Privacy Policy', 'How Titan Forge Fitness collects, uses, shares, and protects information from site visitors, coaching leads, customers, and Shopify checkout activity.'],
    '/terms': ['Terms Of Service', 'Terms for using Titan Forge Fitness websites, coaching information, product pages, Shopify checkout, and customer-support channels.'],
    '/refund-policy': ['Refund Policy', 'Titan Forge Fitness refund, return, exchange, and customer-service policy for Shopify product purchases and coaching inquiries.'],
    '/shipping-policy': ['Shipping Policy', 'Titan Forge Fitness shipping, fulfillment, taxes, carrier, and delivery policy for orders completed through Shopify checkout.'],
    '/disclaimer': ['Fitness And Supplement Disclaimer', 'Important Titan Forge Fitness disclaimers for training information, nutrition content, supplements, testimonials, and individual results.'],
    '/for/busy-professionals': ['Fitness Coaching For Busy Professionals', 'Coaching for adults whose training has to survive work, travel, family, and imperfect weeks.'],
    '/for/online-coaching': ['Online Fitness Coaching', 'Online personal training and fitness coaching with real feedback, accountability, and adjustments.'],
    '/for/parker-personal-training': ['Personal Trainer Near Parker, CO, 7.4 Miles Away', 'Titan Forge has no gym in Parker. Parker clients train in person at 9780 S Meridian Blvd, Englewood, CO 80112, about 7.4 miles and 14 minutes from Parker Town Hall, or with Steve online.'],
    '/for/beginners': ['Beginner Fitness Coaching', 'Beginner-friendly Titan Forge coaching for people who need movement basics, confidence, nutrition anchors, and realistic progression.'],
    '/for/body-recomposition': ['Body Recomposition Coaching | Build Muscle & Lose Fat', 'Evidence-based body recomposition coaching to build muscle and lose fat simultaneously. Structured strength training, protein targets, and habit accountability.'],
    '/for/nutrition-coaching': ['Nutrition Coaching', 'Nutrition and macro coaching for adults who need repeatable meals, practical targets, travel defaults, and accountability beyond a static meal plan.'],
    '/for/men-over-40': ['Fitness Coaching For Men Over 40', 'Strength and body-composition coaching for men over 40 who need progressive training, recovery signals, and sustainable nutrition.'],
    '/vs/personal-trainer': ['Online Coaching vs A Personal Trainer', 'An honest comparison of online fitness coaching and hiring a local personal trainer: cost, feedback, accountability, scheduling, and who each one actually suits.'],
    '/vs/workout-template': ['Coaching vs Workout Templates', 'Compare static workout templates with Titan Forge coaching that adjusts to your goal, history, schedule, feedback, and progress.'],
    '/vs/fitness-apps': ['Coaching vs Fitness Apps', 'How Titan Forge coaching compares with automated fitness apps and tracking tools.'],
    '/vs/group-classes': ['Coaching vs Group Classes', 'Compare group fitness classes with Titan Forge coaching for individual programming, nutrition support, feedback, and accountability.'],
    '/vs/meal-plans': ['Nutrition Coaching vs Meal Plans', 'Compare static meal plans with Titan Forge nutrition coaching that teaches decisions for weekends, travel, hunger, and real life.'],
    '/vs/supplements': ['Titan Forge Supplements vs Coaching', 'Titan Forge supplements vs coaching: why supplements serve as support tools after training, nutrition, sleep, recovery, and consistency are established.'],
    '/free/forge-readiness-check': ['Free Forge Readiness Check', 'A no-PII self-check for whether to apply, use the path finder, or keep learning first.'],
    '/free/daily-habit': ['Daily Habit', 'A simple daily tracker that keeps a short list of chosen actions on this device.'],
    '/free/daily-planner': ['Daily Forge Planner', 'A daily training, nutrition, and recovery planner that tracks daily anchors locally on this device.'],
    '/free/daily-log': ['Daily Forge Log', 'A daily training session, top set, nutrition, and recovery log that tracks daily anchors locally on this device.'],
    '/free/daily-readiness': ['Daily Training Readiness', 'Assess daily recovery, sleep, soreness, and fueling markers to determine training readiness and set your daily session intention locally on this device.'],
  };
  if (route.startsWith('/resources/')) {
    const [title, desc] = resourceTitles[route] || ['Titan Forge Resource Guide', 'Titan Forge resource guide for training, nutrition, coaching, or consistency.'];
    return [`${title} — ${base}`, desc];
  }
  const [title, desc] = map[route] || map['/'];
  return [route === '/' ? title : `${title} — ${base}`, desc];
}

function routeSchemaType(route) {
  if (route.startsWith('/guides/') || (typeof globalThis !== 'undefined' && (globalThis.TITAN_GUIDES || {})[route])) return 'Article';
  if (route.startsWith('/resources/')) return 'Article';
  if (route.startsWith('/for/') || route === '/coaching' || route === '/apply' || route === '/programs') return 'Service';
  if (route.startsWith('/collections/') || route === '/resources' || route === '/shop') return 'CollectionPage';
  if (route === '/about') return 'AboutPage';
  if (route === '/contact') return 'ContactPage';
  return 'WebPage';
}

function routeSchemaImage(route) {
  if (route === '/results') return 'https://titanforgefit.com/assets/images/steve-transform-1.jpg';
  if (route === '/shop') return 'https://titanforgefit.com/assets/images/site-protein.jpg';
  if (route === '/resources/what-is-a-pump-cover') return 'https://titanforgefit.com/assets/images/site-pump-cover.jpg';
  if (route === '/resources/creatine-and-ashwagandha-together') return 'https://titanforgefit.com/assets/images/site-creatine.jpg';
  if (route.startsWith('/resources/supplements')) return 'https://titanforgefit.com/assets/images/site-vitamins.jpg';
  return 'https://titanforgefit.com/assets/images/site-unnamed-6.jpg';
}

function routeBreadcrumb(route, title) {
  const url = `https://titanforgefit.com${route === '/' ? '/' : route}`;
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: 'https://titanforgefit.com/' }];
  if (route !== '/') {
    if (route.startsWith('/resources/')) {
      items.push({ '@type': 'ListItem', position: 2, name: 'Resources', item: 'https://titanforgefit.com/resources' });
    }
    if (route.startsWith('/collections/')) {
      items.push({ '@type': 'ListItem', position: 2, name: 'Collections', item: 'https://titanforgefit.com/resources' });
    }
    items.push({ '@type': 'ListItem', position: items.length + 1, name: title.replace(' — Titan Forge Fitness', ''), item: url });
  }
  return {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: items,
  };
}

function updateRouteMeta(route) {
  const finalizedRouteMeta = window.TITAN_FINALIZED_ROUTE_META && window.TITAN_FINALIZED_ROUTE_META[route];
  const usesFinalizedRouteMeta = Array.isArray(finalizedRouteMeta);
  const [title, desc] = usesFinalizedRouteMeta ? finalizedRouteMeta : routeMeta(route);
  const schemaType = routeSchemaType(route);
  const pageUrl = `https://titanforgefit.com${route === '/' ? '/' : route}`;
  const finalizedRouteFaqs = window.TITAN_FINALIZED_ROUTE_FAQS && window.TITAN_FINALIZED_ROUTE_FAQS[route];
  const routeFaqRegistry = window.TITAN_ROUTE_FAQS || window.ROUTE_FAQS || {};
  const routeFaqs = routeFaqRegistry[route];
  const articleFaqs = route.startsWith('/resources/')
    ? window.TITAN_ARTICLE_EVIDENCE && window.TITAN_ARTICLE_EVIDENCE[route.replace('/resources/', '')]?.faqs
    : undefined;
  const faqEntries = Array.isArray(finalizedRouteFaqs) && finalizedRouteFaqs.length
    ? finalizedRouteFaqs
    : Array.isArray(routeFaqs) && routeFaqs.length
      ? routeFaqs
      : articleFaqs;
  document.title = title;
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', desc);
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', pageUrl);
  const staticJsonLdScript = document.querySelector('script[data-titan-static-jsonld]');
  let staticDateModified = '';
  if (staticJsonLdScript?.textContent) {
    try {
      const staticJsonLd = JSON.parse(staticJsonLdScript.textContent);
      const staticGraph = Array.isArray(staticJsonLd?.['@graph']) ? staticJsonLd['@graph'] : [staticJsonLd];
      const staticPage = staticGraph.find((node) => node?.['@id'] === `${pageUrl}#webpage`);
      staticDateModified = staticPage?.dateModified || '';
      if (staticDateModified) window.TITAN_RELEASE_DATE = staticDateModified;
    } catch {
      // Keep metadata updates resilient if a third party injects malformed JSON-LD.
    }
  }
  const schemaDateModified = staticDateModified || window.TITAN_RELEASE_DATE || '';
  const visibleHeading = (document.querySelector('h1')?.textContent || '').replace(/\s+/g, ' ').trim();
  const schemaName = visibleHeading || title.replace(' — Titan Forge Fitness', '');
  document.querySelectorAll('script[data-titan-jsonld]').forEach((el) => el.remove());
  const organization = {
    '@type': ['Organization', 'HealthAndBeautyBusiness'],
    '@id': 'https://titanforgefit.com/#organization',
    name: 'Titan Forge Fitness',
    legalName: 'Titan Forge Fitness, Corp.',
    alternateName: ['Titan Forge Fit', 'Titan Forge Fitness', 'Titan Forge Fitness, Corp.'],
    url: 'https://titanforgefit.com/',
    telephone: '+1-720-916-7235',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '9780 S Meridian Blvd',
        addressLocality: 'Englewood',
        addressRegion: 'CO',
        postalCode: '80112',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 39.5408, longitude: -104.8556 },
      openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Monday', 'https://schema.org/Tuesday', 'https://schema.org/Wednesday', 'https://schema.org/Thursday', 'https://schema.org/Friday'], opens: '05:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Saturday'], opens: '07:00', closes: '16:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['https://schema.org/Sunday'], opens: '08:00', closes: '15:00' }
      ],
    description: 'Titan Forge Fitness provides evidence-aware personal training in Englewood, CO, online coaching, nutrition accountability, and foundation-first support products.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://titanforgefit.com/assets/images/site-logo.png',
      caption: 'Titan Forge Fitness',
    },
    image: 'https://titanforgefit.com/assets/images/site-unnamed-6.jpg',
    areaServed: SCHEMA_AREA_SERVED,
    sameAs: SCHEMA_SAME_AS,
    founder: {
      '@type': 'Person',
      '@id': 'https://titanforgefit.com/#founder',
      name: 'Steve "Doc" Ginevan',
      honorificSuffix: 'PhD',
      jobTitle: 'Founder and Head Coach',
      worksFor: { '@id': 'https://titanforgefit.com/#organization' },
      sameAs: ['https://www.instagram.com/doc.gymlifts/'],
    },
    knowsAbout: PUBLIC_SCHEMA_KNOWS_ABOUT,
    hasOfferCatalog: SCHEMA_OFFER_CATALOG,
  };
  const website = {
    '@type': 'WebSite',
    '@id': 'https://titanforgefit.com/#website',
    name: 'Titan Forge Fitness',
    url: 'https://titanforgefit.com/',
    inLanguage: 'en-US',
    publisher: { '@id': 'https://titanforgefit.com/#organization' },
    about: PUBLIC_SCHEMA_KNOWS_ABOUT,
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [organization, website, routeBreadcrumb(route, schemaName)],
  };
  const page = {
    '@type': schemaType,
    '@id': `${pageUrl}#webpage`,
    name: schemaName,
    description: desc,
    url: pageUrl,
    inLanguage: 'en-US',
    isPartOf: { '@id': 'https://titanforgefit.com/#website' },
    publisher: { '@id': 'https://titanforgefit.com/#organization' },
    provider: { '@id': 'https://titanforgefit.com/#organization' },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: routeSchemaImage(route),
    },
    about: PUBLIC_SCHEMA_KNOWS_ABOUT,
  };
  if (schemaDateModified) page.dateModified = schemaDateModified;
  if (schemaType === 'Service') {
    page.serviceType = 'Fitness coaching';
    page.areaServed = SCHEMA_AREA_SERVED;
    page.audience = {
      '@type': 'Audience',
      audienceType: route.includes('parker') ? 'Parker-area fitness clients' : route.includes('online') ? 'Online coaching clients' : 'Adults seeking structured fitness coaching',
    };
  }
  if (route.startsWith('/resources/')) {
    // Article is a CreativeWork, not a WebPage. Keep the BreadcrumbList as its
    // own graph node and use Article.image instead of WebPage-only properties.
    delete page.breadcrumb;
    delete page.primaryImageOfPage;
    const slug = route.replace('/resources/', '');
    const evidence = window.TITAN_ARTICLE_EVIDENCE && window.TITAN_ARTICLE_EVIDENCE[slug];
    const sources = window.TITAN_EVIDENCE_SOURCES || {};
    if (evidence) {
      page.hasPart = { '@id': `${pageUrl}#faq` };
      page.headline = page.name;
      page.author = { '@type': 'Organization', '@id': 'https://titanforgefit.com/#organization' };
      page.image = routeSchemaImage(route);
      page.articleSection = 'Training and nutrition resources';
      if (!usesFinalizedRouteMeta) {
        page.citation = evidence.sourceKeys
          .map((key) => sources[key])
          .filter(Boolean)
          .map((source) => ({
            '@type': 'CreativeWork',
            name: source.label,
            url: source.href,
          }));
      }
    }
    if (Array.isArray(faqEntries) && faqEntries.length) {
      page.mainEntity = faqEntries.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }));
    }
  }
  if (route.startsWith('/shop/')) {
    page.hasPart = { '@id': `${pageUrl}#product` };
    jsonLd['@graph'].push({
      '@type': 'Product',
      '@id': `${pageUrl}#product`,
      name: page.name,
      description: page.description,
      brand: { '@id': 'https://titanforgefit.com/#organization' },
      image: page.primaryImageOfPage?.url || page.image,
      offers: {
        '@type': 'Offer',
        url: pageUrl,
        seller: { '@id': 'https://titanforgefit.com/#organization' }
      }
    });
  }
  if (Array.isArray(faqEntries) && faqEntries.length) {
    page.hasPart = { '@id': `${pageUrl}#faq` };
    jsonLd['@graph'].push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      name: `${page.name} frequently asked questions`,
      inLanguage: 'en-US',
      isPartOf: { '@id': `${pageUrl}#webpage` },
      mainEntity: faqEntries.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }
  jsonLd['@graph'].push(page);
  if (staticJsonLdScript) {
    staticJsonLdScript.textContent = JSON.stringify(jsonLd);
  } else {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-titan-jsonld', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }
}

function App() {
  const route = useRoute();
  useEffect(() => {
    updateRouteMeta(route);
    window.titanTrackPageView && window.titanTrackPageView();
  }, [route]);
  const articleSlug = route.startsWith('/resources/') ? route.replace('/resources/', '') : null;
  const collectionSlug = route.startsWith('/collections/') ? route.replace('/collections/', '') : null;
  const audienceSlug = route.startsWith('/for/') ? route.replace('/for/', '') : null;
  const comparisonSlug = route.startsWith('/vs/') ? route.replace('/vs/', '') : null;
  const guideSlug = route.startsWith('/guides/') ? route.replace('/guides/', '') : null;
  const guideRoute = (typeof globalThis !== 'undefined' && globalThis.TITAN_GUIDES || {})[route] ? route : null;
  const Page = guideRoute ? GuidePage : articleSlug ? ArticlePage : collectionSlug ? CollectionPage : audienceSlug ? AudiencePage : comparisonSlug ? ComparisonPage : guideSlug ? GuidePage : (PAGES[route] || HomePage);
  return (
    <>
      <div className="appshell__nav">
        <Nav route={route} />
      </div>
      <main id="main-content" className="appshell__main" key={route} tabIndex="-1">
        <Page slug={articleSlug || collectionSlug || audienceSlug || comparisonSlug || guideSlug} route={route} />
      </main>
      <div className="appshell__foot">
        <Footer />
      </div>
      {route === "/" && <div className="home-v2"><HomeStickyBar/></div>}
      {route !== "/" && <EngagementPrompt route={route} />}
      <TitanChatWidget />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
