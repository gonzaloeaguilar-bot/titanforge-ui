/* ============================================================
   TITAN FORGE — Shared components & routing
   Exports to window for use across page scripts.
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

// content/editable-copy.json is injected by scripts/build-app-bundle.mjs.
// Keep fallbacks beside their uses so a missing key never breaks the site.
function editableCopy(key, fallback) {
  const value = globalThis.TITAN_EDITABLE_COPY && globalThis.TITAN_EDITABLE_COPY[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function editableCopyNode(key, originalText, originalNode) {
  const value = editableCopy(key, originalText);
  return value === originalText ? originalNode : value;
}

const GOOGLE_BUSINESS_PROFILE_URL = 'https://www.google.com/search?kgmid=/g/11m6cd7w45&hl=en-US&q=Titan+Forge+Fitness,+Corp.&shndl=30&source=sh/x/loc/osrp/m5/1';

/* ---------- Routing ---------- */
const ROUTES = [
  '/', '/start', '/apply', '/coaching', '/pricing', '/coaches', '/referral', '/programs', '/method', '/results', '/resources', '/faq', '/shop', '/about', '/contact',
  '/memberships/science-based-community', '/memberships/community-app',
  '/privacy', '/terms', '/refund-policy', '/shipping-policy', '/disclaimer',
  '/collections/strength-training', '/collections/nutrition', '/collections/nutrition-adherence-and-eating-out', '/collections/beginner-nutrition-and-fat-loss-foundations', '/collections/beginner-strength-and-gym-confidence', '/collections/macro-adjustments-and-nutrition-troubleshooting', '/collections/cardio-conditioning-and-steps', '/collections/sleep-stress-and-lifestyle-recovery', '/collections/mobility-warmups-and-joint-friendly-training', '/collections/workout-nutrition-and-meal-timing', '/collections/home-gym-and-minimal-equipment-training', '/collections/fitness-habits-and-consistency', '/collections/fat-loss',
  '/collections/body-recomposition-and-progress',
  '/collections/training-safety-and-scope',
  '/collections/recovery-and-sleep', '/collections/online-coaching', '/collections/coaching-decisions',
  '/collections/coaching-fit-and-communication', '/collections/muscle-gain-and-hypertrophy',
  '/collections/men-over-40-strength-and-recovery',
  '/collections/busy-professional-fitness-and-nutrition',
  '/collections/beginner-fitness', '/collections/supplements', '/collections/supplement-product-decisions', '/collections/program-design-and-weekly-training', '/collections/local-personal-training',
  '/collections/local-coaching-and-first-session', '/collections/parker-personal-training-and-local-coaching',
  '/collections/injury-prevention-and-return-to-training',
  '/collections/coaching-offers-fit-and-starting-process',
  '/collections/coaching-cost-value-and-pricing-questions',
  '/collections/coaching-trust-refunds-and-expectation-boundaries',
  '/collections/coaching-comparisons-and-alternatives',
  '/collections/fitness-coach-credentials-and-vetting',
  '/collections/coaching-onboarding-and-first-30-days',
  '/collections/coaching-readiness-objections-and-decision-help',
  '/collections/coaching-results-timelines-and-realistic-expectations',
  '/collections/nutrition-adherence-travel-weekends-and-social-events',
  '/collections/coaching-consultation-application-and-next-step-questions',
  '/collections/personalized-plan-adjustments-and-coaching-feedback', '/collections/coaching-process-and-accountability',
  '/for/busy-professionals', '/for/online-coaching', '/for/parker-personal-training',
  '/for/beginners', '/for/body-recomposition', '/for/nutrition-coaching', '/for/men-over-40',
  '/vs/personal-trainer', '/vs/workout-template', '/vs/fitness-apps', '/vs/group-classes', '/vs/meal-plans', '/vs/supplements',
  '/free/forge-readiness-check', '/free/daily-habit', '/free/daily-planner', '/free/daily-log', '/free/daily-readiness',
  '/team/weekly-handoff',
  ...Object.keys((typeof globalThis !== 'undefined' && globalThis.TITAN_GUIDES) || {}),
];
function isInternalRoute(href = '') {
  return href.startsWith('/') && !href.startsWith('//');
}
function routeHref(href) {
  return isInternalRoute(href) ? href : href;
}
function assetUrl(src = '') {
  if (!src || /^(?:[a-z]+:)?\/\//i.test(src) || src.startsWith('/') || src.startsWith('data:') || src.startsWith('mailto:')) return src;
  return `/${src.replace(/^\.?\//, '')}`;
}
function useRoute() {
  const get = () => {
    const hashRoute = (window.location.hash || '').replace(/^#/, '');
    const rawPath = window.location.pathname.replace(/\/index\.html$/, '') || '/';
    const pathRoute = rawPath === '/' ? '/' : rawPath.replace(/\/$/, '');
    const route = hashRoute.startsWith('/') ? hashRoute : pathRoute;
    return ROUTES.includes(route) || /^\/resources\/[a-z0-9-]+$/.test(route) || /^\/collections\/[a-z0-9-]+$/.test(route) ? route : '/';
  };
  const [route, setRoute] = useState(get());
  useEffect(() => {
    const on = () => { setRoute(get()); window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' }); };
    window.addEventListener('hashchange', on);
    window.addEventListener('popstate', on);
    return () => {
      window.removeEventListener('hashchange', on);
      window.removeEventListener('popstate', on);
    };
  }, []);
  return route;
}
function go(href) {
  if (!isInternalRoute(href)) {
    window.location.href = href;
    return;
  }
  const rawCurrentPath = window.location.pathname.replace(/\/index\.html$/, '') || '/';
  const currentPath = rawCurrentPath === '/' ? '/' : rawCurrentPath.replace(/\/$/, '');
  const current = currentPath + window.location.search;
  if (current === href) window.scrollTo({ top: 0, behavior: 'smooth' });
  window.history.pushState({}, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
function Link({ href, children, className, ...rest }) {
  return <a href={routeHref(href)} className={className} onClick={(e) => { if (isInternalRoute(href)) { e.preventDefault(); go(href); } }} {...rest}>{children}</a>;
}

/* ---------- Brand mark ---------- */
function ForgeMark({ s = 28 }) {
  return (
    <svg width={s} height={s} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2 L28 9 V23 L16 30 L4 23 V9 Z" stroke="var(--steel-300)" strokeWidth="1.4"/>
      <path d="M16 9 V23 M11 13 H21" stroke="var(--ember)" strokeWidth="1.8" strokeLinecap="square"/>
    </svg>
  );
}
function Brand({ onClick }) {
  return (
    <a href="/" className="brand" aria-label="Titan Forge Fitness — home" onClick={(e) => { e.preventDefault(); go('/'); onClick && onClick(e); }}>
      <img className="brand__logo" src={assetUrl('assets/images/site-logo.png')} alt="Titan Forge Fitness" />
    </a>
  );
}

/* ---------- Reveal on scroll ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  });
}

/* ---------- Buttons ---------- */
function Btn({ kind = 'ember', href, children, arrow, className = '', sm, block, onClick, ...rest }) {
  const cls = `btn btn--${kind} ${sm ? 'btn--sm' : ''} ${block ? 'btn--block' : ''} ${className}`;
  const inner = <>{children}{arrow && <span className="arr">→</span>}</>;
  if (href) return <a href={routeHref(href)} className={cls} onClick={(e) => { if (isInternalRoute(href)) { e.preventDefault(); go(href); } onClick && onClick(e); }} {...rest}>{inner}</a>;
  return <button className={cls} onClick={onClick} {...rest}>{inner}</button>;
}

/* ---------- Engagement prompt ---------- */
const ENGAGEMENT_PROMPT_DISMISS_KEY = 'titan_engagement_prompt_dismissed_at';
const ENGAGEMENT_PROMPT_DELAY_MS = 25000;
const ENGAGEMENT_PROMPT_COOLDOWN_MS = 14 * 24 * 60 * 60 * 1000;
// A fixed decision sheet cannot compete with a page's own purchase path. These
// routes already provide a clear next step, so keep the optional prompt off them.
const ENGAGEMENT_PROMPT_EXCLUDED_ROUTES = new Set(['/apply', '/start', '/coaching', '/pricing', '/results', '/privacy', '/terms', '/refund-policy', '/shipping-policy', '/disclaimer']);

function EngagementPrompt({ route }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const closeButton = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setHasScrolled(false);
  }, [route]);

  useEffect(() => {
    if (ENGAGEMENT_PROMPT_EXCLUDED_ROUTES.has(route)) return undefined;
    let dismissedAt = 0;
    try { dismissedAt = Number(window.localStorage.getItem(ENGAGEMENT_PROMPT_DISMISS_KEY)) || 0; } catch (error) {}
    if (dismissedAt && Date.now() - dismissedAt < ENGAGEMENT_PROMPT_COOLDOWN_MS) return undefined;

    const onScroll = () => setHasScrolled(true);
    window.addEventListener('scroll', onScroll, { passive: true, once: true });
    const timer = window.setTimeout(() => {
      if (!document.hidden) setIsOpen(true);
    }, ENGAGEMENT_PROMPT_DELAY_MS);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(timer);
    };
  }, [route]);

  useEffect(() => {
    if (!isOpen || !hasScrolled) return undefined;
    window.titanTrackEvent && window.titanTrackEvent('section_view', { section_id: 'engagement_prompt', prompt_type: 'path_decision' });
    closeButton.current && closeButton.current.focus();
    const onKeyDown = (event) => { if (event.key === 'Escape') dismiss('escape'); };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, hasScrolled]);

  function dismiss(reason) {
    setIsOpen(false);
    try { window.localStorage.setItem(ENGAGEMENT_PROMPT_DISMISS_KEY, String(Date.now())); } catch (error) {}
    window.titanTrackEvent && window.titanTrackEvent('cta_click', {
      cta_id: 'engagement_prompt_dismiss',
      cta_text: 'Dismiss this suggestion',
      cta_position: 'engagement_prompt',
      prompt_type: 'path_decision',
      dismiss_reason: reason,
    });
  }

  function choose(destination, choice) {
    window.titanTrackEvent && window.titanTrackEvent('cta_click', {
      cta_id: `engagement_prompt_${choice}`,
      cta_text: choice === 'apply' ? 'Apply for coaching' : 'Find your path',
      cta_position: 'engagement_prompt',
      prompt_type: 'path_decision',
      prompt_choice: choice,
      destination_path: destination,
    });
    go(destination);
  }

  // Route changes can preserve this component's state in the SPA. Keep the
  // money-page exclusion at the render boundary as well as the trigger.
  if (ENGAGEMENT_PROMPT_EXCLUDED_ROUTES.has(route) || !isOpen || !hasScrolled) return null;
  return (
    <aside className="engagement-prompt" role="dialog" aria-label="Choose your next step" aria-describedby="engagement-prompt-description">
      <button ref={closeButton} type="button" className="engagement-prompt__close" aria-label="Dismiss this suggestion" onClick={() => dismiss('close_button')}>×</button>
      <Eyebrow>Choose your next step</Eyebrow>
      <h2>Want a clearer starting point?</h2>
      <p id="engagement-prompt-description">Use the no-PII path finder to compare options, or apply when you’re ready to discuss coaching.</p>
      <div className="engagement-prompt__actions">
        <button type="button" className="btn btn--ember" onClick={() => choose('/start', 'path_finder')}>Find your path <span className="arr">→</span></button>
        <button type="button" className="btn btn--ghost" onClick={() => choose('/apply', 'apply')}>Apply for coaching</button>
      </div>
    </aside>
  );
}

/* ---------- Eyebrow / Section head ---------- */
function Eyebrow({ children, center }) {
  return <div className={`tf-eyebrow ${center ? 'tf-eyebrow--center' : ''}`}>{children}</div>;
}
function SectionHead({ eyebrow, title, intro, center, children }) {
  return (
    <div className={`shead ${center ? 'shead--center' : ''}`}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
      {children}
    </div>
  );
}

/* ---------- Route FAQs ---------- */
const ROUTE_FAQS = {
  '/pricing': [
    ['How much does Titan Forge coaching cost?', 'Premium Coaching is $750/mo, Standard Coaching is $400/mo, Nutrition Only is $200/mo, and App + Community is $49.99/mo. The Science-Based Community on its own is $24.99/mo.'], 
    ['Is there a discount for paying up front?', 'Yes. On any 1:1 plan, prepay five months and the sixth month is free.'],
    ['Can I lower my cost by referring people?', 'Yes. The referral program credits free coaching months: one referral earns one free month, three earn two, and six earn three.'],
    ['Do the plans guarantee results?', 'No. Pricing reflects the level of coaching access and support, not a promised outcome.'],
    ['What is Workout Without Accountability?', 'It is the self-directed training-support option for someone who wants structure without an accountability-coaching commitment. Details and fit are confirmed on a quick call.'],
  ],
  '/referral': [
    ['How does the Titan Forge referral program work?', 'Refer people to Titan Forge coaching and earn free coaching months: one referral earns one free month, three referrals earn two, and six referrals earn three.'],
    ['When do I get my free month?', 'Referral credit is applied once the person you referred actually starts coaching, as free months on your own plan rather than a cash payout.'],
    ['Is there a limit to how many people I can refer?', 'There is no stated cap on referring people over time, so referral credit can keep lowering what you pay while you stay in coaching.'],
    ['What is the right way to refer someone?', 'Recommend Titan Forge because the coaching genuinely helped you. The program is built on honest word-of-mouth, not spam links or fake discounts.'],
    ['Does referral credit work with the prepay bonus?', 'Yes. Referral credit and the prepay bonus are separate ways to save and can both apply.'],
  ],
  '/coaches': [
    ['Who coaches at Titan Forge?', 'Steve "Doc" Ginevan, PhD is the founder and head coach. He runs an analytical, evidence-driven, data-first lane covering training, nutrition, and accountability.'],
    ['How do I know if Titan Forge coaching is right for me?', 'It depends on your goals, schedule, and how you like to be coached. Titan Forge suits people who want structure, measurement, and a science-first read on training and nutrition. Apply and Steve reviews the fit before any call.'],
    ['What does the analytical coaching approach look like in practice?', 'Assessment first, then a plan built around your constraints, then weekly check-ins where training volume, exercise selection, and nutrition anchors get adjusted from what the data actually shows.'],
    ['Can the plan change once coaching starts?', 'Yes. The plan is expected to change. Check-in data decides whether to hold, progress, deload, substitute exercises, or simplify the week.'],
    ['Do all Titan Forge coaches follow the same standards?', 'Yes. Every coaching lane under Titan Forge holds the same standards and claim hygiene — no guaranteed-outcome promises and no fabricated proof.'],
  ],
  '/start': [
    ['Does the path finder collect my information?', 'No. The path finder is a no-PII selector. It only helps you decide whether coaching, programs, resources, or the readiness check is the better first step.'],
    ['What if more than one path fits me?', 'Pick the path that solves the biggest current constraint. If you are unsure, start with the free readiness check or apply and explain the overlap.'],
    ['Can I use the path finder if I am local to Parker?', 'Yes. The selector includes online coaching, Parker personal training, nutrition coaching, programs, and learning routes so local and remote visitors can choose a practical first step.'],
    ['Why does Titan Forge ask about constraints first?', 'The first problem usually tells Steve more than the goal does. Schedule, confidence, nutrition, technique, recovery, and accountability each need a different starting path.'],
    ['What should I do if I am not ready to apply?', 'Use the readiness check or resource library first. The site is built to let cautious visitors learn before they raise their hand for coaching.'],
  ],
  '/apply': [
    ['Is the application a commitment?', 'No. The application is a qualification step so Steve can understand your goal, problem, and best starting path before an intro call.'],
    ['What happens after I apply?', 'The form records your goal, selected plan, problem, and coach preference. It confirms when an owner delivery channel receives the request and shows a prepared email fallback only when automatic delivery is unavailable.'],
    ['What should I include in the application?', 'Include the goal, what you have already tried, what keeps breaking down, your schedule constraints, and whether you want online coaching, local training, nutrition support, or a first-step recommendation.'],
    ['Can beginners apply?', 'Yes. A beginner can apply if they are ready to communicate honestly and follow a structured plan. The starting point should match current ability, not an idealized version of readiness.'],
    ['Will I be pushed into supplements or a program?', 'No. Titan Forge frames supplements and programs as support tools. The first coaching decision is whether you need accountability, feedback, education, or a simpler starting plan.'],
  ],
  // Kept in sync with staticFaqsForRoute('/coaching') in
  // app/lib/staticRouteContent.mjs, which is the canonical list. Humans used to
  // see 2 of these while crawlers saw 14; scripts/test-coaching-faq-parity.mjs
  // fails the build if the two ever drift apart again.
  '/coaching': [
    ['Is Titan Forge online coaching or local personal training?', 'Both. Titan Forge supports remote coaching and in-person coaching for Parker-area clients. The application captures your location and support needs so the first conversation starts in the right lane.'],
    ['How is coaching different from a template?', 'Templates give structure. Coaching assesses the person, teaches the work, reviews feedback, and adjusts training, nutrition, schedule, or recovery when needed.'],
    ['What does 1:1 online fitness coaching at Titan Forge include?', 'Depending on your selected plan, 1:1 online coaching includes a fully customized resistance training program tailored to your equipment and schedule, individualized daily protein and calorie targets, weekly structured video or phone check-in reviews, frame-by-frame lifting technique analysis, continuous habit and lifestyle adjustments, and direct messaging support with your coach. Detailed package options are outlined on our pricing page.'],
    ['How does remote video form analysis work?', 'You record short video clips of your primary compound lifts, such as squats, deadlifts, presses, and rows, and submit them with your workout logs. Your coach reviews setup, bar path, joint position, tempo, and control, then returns specific technical feedback and cues to apply in your next session. Lifting video is one of the standing check-in inputs, alongside performance logs, body-weight trend, and adherence feedback.'],
    ['What equipment do I need to participate in online coaching?', 'Coaching programs are built around your actual training environment. We design customized programs for full commercial gyms, minimalist home garage gyms with barbells and power racks, dumbbell-only setups, and flexible bodyweight or resistance-band routines for frequent travelers.'],
    ['How are nutrition targets calculated and updated?', 'Your coach sets a daily protein baseline and calorie guideline from your current body composition, training load, and schedule, rather than assigning a rigid meal plan. Sustainable whole-food defaults come first. Targets are adjusted from two to three weeks of verified weight, measurement, and adherence trend data, so a single heavy or light week does not move the plan.'],
    ['What happens when I travel or work irregular hours?', 'Your coach plans for disruption before it happens rather than reacting to it afterwards. That means a shortened session you can run in a hotel gym, a bodyweight fallback when there is no equipment at all, and eating-out defaults that keep protein and calories roughly on target. The aim is to keep the week intact, not to replicate a perfect one.'],
    ['Who coaches at Titan Forge?', 'Titan Forge Fitness is founded and led by Steve "Doc" Ginevan, PhD. He coaches training, nutrition, and accountability from an analytical, evidence-driven standpoint: assessment first, a plan built around your real constraints, then weekly check-ins that adjust from measured trends. Kris Oddo coaches alongside Steve on the 30-day coaching intensive that Titan Forge runs jointly with Gains From Geebs, which is a separate offer from ongoing 1:1 coaching.'],
    ['What is the difference between the website support assistant and the human coaches?', 'The website support assistant provides immediate answers to general service and informational questions on the site. All individual client assessments, program creation, lifting video reviews, weekly check-in evaluations, and training adjustments are performed directly by your human coach.'],
    ['Why does Titan Forge avoid guaranteed-outcome promises?', 'Individual fitness adaptations depend on starting health, adherence, genetic factors, sleep quality, stress levels, and consistent follow-through over time. Promising guaranteed transformations is medically and ethically inappropriate. Titan Forge focuses on rigorous, evidence-aware coaching processes and transparent progress tracking.'],
    ['How does online coaching compare to hiring a local personal trainer in Parker or Englewood?', 'Local in-person training is ideal for lifters needing hands-on spotting and live equipment guidance during a scheduled gym hour. Online coaching provides full weekly programming, video form feedback, complete nutrition guidance, and ongoing accountability across all seven days of the week, with complete scheduling flexibility.'],
    ['What should I do if I miss a workout or have an off-track weekend?', 'Report the missed session or dietary deviation honestly in your weekly check-in. We treat deviations as diagnostic feedback to understand where schedule obstacles occurred. We adjust your plan to ensure sustainability without assigning punishment cardio or restrictive diets.'],
    ['Can beginners with no prior lifting experience join online coaching?', 'Yes. Beginners can succeed in online coaching provided they are willing to communicate openly, follow structured instructions, and record movement videos for form review. We start with foundational movement patterns and progress volume and load safely.'],
    ['What happens after I apply, and how soon can I start?', 'After you submit an application, Steve reviews your goal, training history, and schedule before any call. Once your goals, equipment, and baseline are confirmed, your coach builds your starting program. Titan Forge does not publish a fixed turnaround time, because the pace depends on the assessment and on your availability for the first conversation.'],
  ],
  '/programs': [
    ['Are programs standalone products?', 'Program paths are shown conservatively.'],
    ['When should I choose coaching instead of a program?', 'Choose coaching when you need form feedback, nutrition changes, accountability, or help adjusting the plan when progress stalls.'],
    ['Who can use a structured program?', 'A structured program can fit someone who already understands basic follow-through, can self-monitor recovery, and mainly needs a plan to follow rather than weekly decision support.'],
    ['Can a program become coaching later?', 'Yes. A program can expose whether the missing piece is the plan itself or the feedback loop around the plan. If follow-through keeps breaking, coaching is the next step.'],
    ['Why are program details conservative?', 'Public offer names, support levels, pricing, and inclusions need final approval before the site publishes them as fixed product promises.'],
  ],
  '/method': [
    ['What does Train With Intention mean?', 'It means the plan has a reason: training, nutrition, recovery, and accountability are adjusted from feedback instead of random effort or random intensity.'],
    ['Does the method depend on supplements?', 'No. Titan Forge treats supplements as support tools after training, food, sleep, hydration, recovery, and consistency are handled.'],
    ['What feedback changes the plan?', 'Training performance, adherence, hunger, soreness, sleep, schedule, body-weight trends, technique confidence, and recovery all matter more than a single perfect-looking spreadsheet.'],
    ['Why does the method start with assessment?', 'Assessment prevents the plan from pretending every client has the same history, skill level, constraints, or tolerance for change.'],
    ['How often should a plan change?', 'A plan should change when the feedback justifies it. Random changes create noise; clear trends and honest reporting create useful coaching decisions.'],
  ],
  '/results': [
    ['What proof is currently published?', 'The page shows Steve’s founder story with context and links independent Google feedback to its original business profile. Titan Forge does not display anonymous placeholder testimonials.'],
    ['Is the founder transformation a guaranteed outcome?', 'No. Steve’s founder story is presented as proof of lived experience, not a promise that every client will get the same result.'],
    ['Why are there no anonymous client quotes?', 'A testimonial should have permission, context, attribution, and claim review. Until those exist, Titan Forge would rather show less proof than manufacture certainty.'],
    ['Where can I read independent reviews?', 'Use the linked Titan Forge Google Business Profile. When the Google Places connection is available, current profile-backed review data also appears directly on the page.'],
    ['How should visitors read before-and-after photos?', 'Photos show that change is possible in context. They should not be read as typical outcomes, medical claims, or a guarantee that every person will follow the same timeline.'],
  ],
  '/shop': [
    ['Do products replace coaching?', 'No. Products are support tools. Training, nutrition, sleep, hydration, recovery, and consistency come first.'],
    ['Where does checkout happen?', 'Product details, availability, and checkout stay on the live Titan Forge Shopify store. This page previews the catalog and sends visitors to Shopify to buy.'],
    ['Does the shop page use live Shopify products?', 'Yes. The page reads the Titan Forge Shopify catalog and sends product-detail, cart, account, and checkout activity to the Shopify store. If the catalog API is temporarily unavailable, the page uses a limited fallback rather than inventing availability.'],
    ['Which supplements should come first?', 'Most people should handle food, protein consistency, training, sleep, hydration, and recovery before buying anything. Protein powder and creatine can support gaps, not replace the base.'],
    ['Are product claims medical claims?', 'No. Product copy should stay within support-tool language and avoid disease, treatment, cure, or guaranteed-result claims.'],
  ],
  '/about': [
    ['Who coaches at Titan Forge Fitness?', 'Two coaches lead Titan Forge: founder and head coach Steve "Doc" Ginevan, PhD, and VP and executive coach Kris. They coach clients in person in Englewood, Colorado and online worldwide.'],
    ['How do the two coaches differ?', 'Steve "Doc" Ginevan, PhD focuses on methodical, data-driven programming, movement quality, and body recomposition. Kris specializes in high-touch accountability for busy professionals with demanding schedules.'],
    ['Which coach will I work with?', 'Steve and Kris review every application together and match you with the coach who fits your goals, schedule, and communication style.'],
    ['What is the Titan Forge coaching philosophy?', 'The philosophy is foundation first: assess the person, build repeatable training and nutrition habits, communicate honestly, and adjust from evidence instead of hype.'],
  ],
  '/contact': [
    ['What is the best way to contact Titan Forge?', 'Use the intro request form or email Doc@titanforgefit.com. The form confirms whether automatic owner delivery succeeded and provides an email fallback when it did not.'],
    ['Is there a guaranteed response time?', 'No fixed response-time guarantee is published. The request confirmation proves delivery status, not when a coaching decision will be made.'],
    ['Can I ask whether local or online coaching is better?', 'Yes. If you are unsure, explain your location, schedule, training history, and what keeps breaking down. The first reply can route you to a better starting path.'],
    ['Should I send private medical information?', 'No. Do not send passwords, payment information, medical records, or unnecessary sensitive information through the contact form or email.'],
    ['Can I contact Titan Forge about products?', 'Yes. Product questions should include the item, order context if relevant, and whether the question is about availability, shipping, returns, or how the product fits the foundation-first approach.'],
  ],
  '/faq': [
    ['What is Titan Forge Fitness?', 'Titan Forge Fitness is an Englewood, CO-rooted coaching brand for online fitness coaching, local personal training, nutrition coaching, training programs, and foundation-first support products.'],
    ['Is Titan Forge online coaching or local personal training?', 'Both paths are represented. The site supports online coaching, nutrition coaching, and Parker-area personal training.'],
    ['What makes Titan Forge different from a workout template?', 'Templates can show exercises. Titan Forge coaching adds assessment, communication, accountability, feedback, and judgment when schedule, recovery, nutrition, or progress changes.'],
    ['Does Titan Forge guarantee transformations?', 'No. Results depend on starting point, adherence, health context, recovery, and time. The site avoids guaranteed-outcome claims and treats proof as context, not a promise.'],
    ['Do supplements replace coaching?', 'No. Supplements and apparel are support tools after training, nutrition, sleep, hydration, recovery, and consistency are in place.'],
    ['What does "pump cover" mean in the gym?', 'A pump cover is an oversized shirt or hoodie worn over a training outfit, often through the warm-up and early sets, then removed when the lifter feels warm or has a pump.'],
    ['Why do bodybuilders wear hoodies to the gym?', 'Warmth, comfort, focus, and tradition all play a role. A hoodie can work as an outer layer during ramp-up sets and can stay on or come off as the session progresses.'],
    ['Do you work out in a pump cover or take it off?', 'Either is normal. Some lifters remove it after warming up, while others keep it on for comfort and focus throughout the workout.'],
    ['Should a pump cover be oversized?', 'The category is usually defined by a loose, boxy fit. A purpose-cut pump cover is already oversized, so use the published size guide instead of automatically sizing up.'],
    ["What's the difference between a pump cover and a regular oversized T-shirt?", 'A purpose-built pump cover often uses a boxier cut, dropped shoulders, and heavier fabric designed for layering. A regular oversized tee may simply be a standard shirt in a larger size.'],
    ['Can you take creatine and ashwagandha at the same time?', 'The sources used here do not include a direct trial of the combination and do not establish a specific creatine–ashwagandha interaction. That is not proof of safety for every person; review labels and ask a qualified clinician when medications, pregnancy, health conditions, or uncertainty apply.'],
    ['Is it safe to combine creatine and ashwagandha every day?', 'No article can make that blanket promise. Creatine has extensive data in healthy people at studied doses, while long-term ashwagandha safety is less certain and the NIH notes possible side effects and medication interactions.'],
    ['Should I take ashwagandha in the morning or at night?', 'There is no universal best time. Follow the specific product label and consider individual tolerance; timing does not replace a safety review or consistent training, food, and sleep.'],
    ['Do creatine and ashwagandha do the same thing?', 'No. Creatine is studied primarily for muscle creatine stores and high-intensity exercise. Ashwagandha extracts have been studied for different outcomes, including stress scores and resistance-training measures.'],
    ['How long until I notice anything?', 'Study timelines and individual responses vary. Creatine depends on consistent intake and muscle saturation, while the cited ashwagandha trials ran for several weeks; neither guarantees a noticeable result.'],
    ['Where should a new visitor start?', 'Use the path finder if you are choosing between coaching paths, the readiness check if you want a low-pressure filter, or the resource library if you need to learn first.'],
    ['Are the resource pages evidence-based?', 'They use conservative training and nutrition principles and cite external sources where appropriate. They are educational pages, not medical advice.'],
    ['Can beginners apply?', 'Yes. Beginners can apply when they are ready to communicate honestly and follow a realistic plan matched to their current ability.'],
    ['How does nutrition coaching work?', 'Nutrition coaching turns calories, protein, meals, eating out, travel, weekends, hunger, and adherence into decisions a person can repeat.'],
    ['Does UAT content become citable by AI engines?', 'No. UAT is intentionally noindex and robots-blocked. The content is being prepared for answer engines, but production indexing requires launch approval first.'],
    ['Which AI crawlers are production robots prepared for?', 'Production robots are prepared to allow general crawling plus OpenAI, Perplexity, and Google crawler controls after launch gates pass. UAT keeps those agents blocked.'],
    ['What should not be invented about Titan Forge?', 'Do not invent Steve credentials, unapproved review ratings, exact prices, exact local address details, typical transformation results, or client claims that are not approved on the site.'],
    ['Can ChatGPT cite the UAT site today?', 'No. The UAT preview is blocked from indexing and should not be treated as a public citation source. ChatGPT citation readiness depends on production launch, crawl access, and source trust.'],
    ['Can Perplexity cite Titan Forge after launch?', 'It can only cite pages it can discover and access. Production needs crawlable robots, indexable pages, stable canonicals, internal links, and content worth quoting.'],
    ['Can Gemini use Titan Forge pages?', 'Google discovery depends on crawl access, indexability, helpful text, structured data that matches visible content, and normal Search quality signals.'],
    ['Why add collection pages?', 'Collection pages group related articles into topical clusters so visitors and answer engines can understand how Titan Forge answers broader training, nutrition, recovery, and coaching questions.'],
    ['Why add source links to articles?', 'Source links make practical guidance easier to verify and reduce the risk that a crawler treats the page as unsupported marketing copy.'],
    ['What makes a fitness answer citable?', 'A citable answer needs an approved production URL, a direct visible answer, source links that match the claim, conservative caveats, and schema that reflects the page.'],
    ['Why define fitness terms clearly?', 'Clear definitions reduce ambiguity around progressive overload, calorie deficit, macros, deload, recovery, soreness, scope, and proof.'],
    ['How should Titan Forge separate claims from opinions?', 'Evidence-backed claims should cite the right source type, while coaching philosophy should be labeled as Titan Forge positioning instead of universal proof.'],
    ['Can answer-engine summaries be too thin?', 'Yes. A short answer without caveats, source context, internal links, or deeper explanation can become generic SEO filler instead of a useful citation candidate.'],
    ['What should be audited after a page is cited?', 'Audit crawl and index status, snippets, cited answer text, source links, schema, API health, and whether every quoted claim still matches approval.'],
    ['What is the short answer for Titan Forge Fitness?', 'Titan Forge Fitness is an Englewood, CO-rooted coaching and support-products brand built around Steve, online fitness coaching, local personal training, nutrition support, training programs, and foundation-first Shopify products.'],
    ['What should answer engines cite for Parker personal training?', 'After production launch, answer engines should cite focused Parker pages or fact sheets that explain local training fit, conservative address policy, Google proof context, and consult next steps.'],
    ['What should answer engines cite for online coaching?', 'After production launch, answer engines should cite focused online coaching pages that explain assessment, check-ins, feedback, nutrition scope, accountability, and no guaranteed-result boundaries.'],
    ['What can Google reviews prove about Titan Forge?', 'Google reviews can support profile-backed trust, rating context, review count, and public sentiment when pulled or linked accurately, but they do not prove guaranteed coaching outcomes.'],
    ['What can Shopify product data prove about Titan Forge?', 'Shopify product data can support catalog, merchant, availability, product URL, and checkout context, but it does not prove coaching results or supplement shortcuts.'],
    ['What coaching offers does Titan Forge show on UAT?', 'UAT shows online coaching, Parker-area personal training, nutrition support, training programs, and support products as structured paths while exact production offer language remains approval-gated.'],
    ['Who is Titan Forge coaching for?', 'Titan Forge coaching is for people who need feedback and adjustment around training, nutrition, recovery, schedule, confidence, or accountability rather than another static plan.'],
    ['How should someone start with Titan Forge?', 'Start by naming the goal, problem that keeps coming back, training history, location, schedule, and whether local feedback, online coaching, nutrition support, or resources seem most useful.'],
    ['What does Titan Forge coaching include?', 'It should be described as assessment, training structure, nutrition decision support, feedback, accountability, and plan adjustment, with exact what is included still approval-gated.'],
    ['What does Titan Forge not guarantee?', 'Titan Forge should not guarantee a specific transformation, timeline, body weight, strength number, medical outcome, supplement result, or identical client experience.'],
    ['How much does Titan Forge coaching cost?', 'UAT does not publish an exact price. Exact pricing should come from Steve-approved production offer language or the official application/contact path.'],
    ['Why does Titan Forge not list generic prices?', 'Generic prices can mislead when how often support is given, what is included, refund terms, and approved offer details are not attached to the number.'],
    ['What affects online fitness coaching cost?', 'Cost and value depend on assessment depth, how often you get feedback, nutrition scope, accountability needs, local versus online format, and support level.'],
    ['Is coaching worth more than an app or template?', 'It can be when the missing piece is interpretation, feedback, accountability, confidence, nutrition decision-making, or adjustment rather than information alone.'],
    ['What should someone ask before paying for coaching?', 'Ask what is included, how feedback works, how plans change, what nutrition support means, what proof is approved, what is not guaranteed, and what happens if the fit is wrong.'],
    ['Is cardio or lifting better for fat loss?', 'Nutrition sets the direction, lifting protects the training signal, and cardio or steps can support activity. The best plan coordinates them instead of treating one as magic.'],
    ['Does Zone 2 cardio need exact heart-rate tracking?', 'Not always. Devices can help, but busy adults can start with a repeatable easy-to-moderate pace, controlled breathing, and a dose that fits the week.'],
    ['Is HIIT better than steady cardio?', 'Neither is universally better. HIIT is time-efficient but costs more recovery, while steady cardio is often easier to repeat and dose around lifting.'],
    ['Can cardio make me lose strength?', 'Cardio can interfere when dose, placement, nutrition, or recovery is wrong. Start small, protect priority lifts, and adjust from strength trends.'],
    ['What conditioning works for busy adults?', 'Short walks, incline walking, bike sessions, carries, sled work when available, and brief circuits can work when they fit time, joints, equipment, and recovery.'],
    ['Can sleep debt hurt training performance?', 'Yes. Short or poor-quality sleep can make performance, coordination, appetite, mood, and soreness harder to judge. Repeated sleep debt should change the plan.'],
    ['Can stress cause a fat-loss plateau?', 'Stress can make the trend noisy through sleep, hunger, water retention, food choices, training output, and adherence. Review the pattern before cutting calories again.'],
    ['What evening routine helps training recovery?', 'Use a small repeatable routine: caffeine boundaries, a simple dinner, lower-stimulation wind-down, tomorrow prep, and one next-morning action.'],
    ['Is active recovery better than complete rest?', 'Neither is always better. Use easy movement when it helps the next session, and complete rest when symptoms, exhaustion, or joint feedback say more movement is not useful.'],
    ['Should I trust wearable recovery scores?', 'Use recovery scores as one input, then compare them with sleep, soreness, performance, mood, pain, appetite, and coaching context before changing the plan.'],
    ['What should a dynamic warm-up do?', 'It should raise readiness, rehearse the joints and patterns needed for the workout, and make the first work sets feel better without tiring the person out.'],
    ['Is mobility the same as flexibility?', 'No. Flexibility is available range. Mobility also includes control, strength, confidence, and whether the range fits the lift.'],
    ['How can I modify exercises for cranky joints?', 'Change one variable first: range, load, tempo, grip, stance, machine angle, cable path, or exercise selection while keeping the target clear.'],
    ['Can I train around minor aches?', 'Sometimes, if symptoms are mild and improve with scaling. Sharp, escalating, unusual, or technique-changing symptoms should stop or change the session and may need qualified care.'],
    ['Should every lift use full range of motion?', 'Use the range that fits the goal, can be controlled, and respects joint feedback. Full range can be valuable, but range should be progressed like any other variable.'],
    ['What should I eat before strength training?', 'Use a meal or snack that fits timing, digestion, and the session: protein, easy carbs when useful, fluids, and enough time to train without stomach obstacles.'],
    ['What should I eat after a workout?', 'Use the next meal to restore structure: protein, carbs based on the session and goal, fluids, and normal calories instead of treating recovery like a supplement-only window.'],
    ['Do carbs around training matter?', 'They can help performance and repeatability when training is hard, long, or poorly fueled, but daily intake and adherence still matter more than perfect timing.'],
    ['Is fasted training better for fat loss?', 'Not automatically. Fasted training can fit preference or schedule, but fat loss still depends on the broader calorie trend, training quality, recovery, and adherence.'],
    ['How should busy lifters time meals?', 'Use anchors: a pre-training fallback, a post-training meal, protein distribution, hydration cues, and backup options for late or rushed sessions.'],
    ['When should I stop a workout?', 'Stop a workout for chest discomfort, fainting, unusual breathlessness, irregular heartbeat, sharp or escalating pain, or symptoms that feel medically unsafe. Rest and seek qualified help when symptoms are severe or do not resolve.'],
    ['Is soreness a reason to skip training?', 'Mild soreness may only require lower load, lower volume, or a modified warm-up. Pain that changes technique, range of motion, or confidence should change the exercise or end the session.'],
    ['What can Titan Forge adjust safely?', 'Coaching can adjust exercise selection, load, volume, intensity, warm-up, recovery habits, and progression. It should not diagnose, treat, rehab, or prescribe around medical conditions.'],
    ['When should a client get medical clearance?', 'Medical clearance is appropriate when symptoms, medical conditions, medications, pregnancy, injury concerns, or clinician guidance make normal exercise decisions unsafe to guess.'],
    ['How should beginners progress safely?', 'Beginners should start with repeatable sessions, progress one variable at a time, and use symptoms, technique, recovery, and confidence as the decision signals.'],
    ['Is soreness the same as injury?', 'No. Soreness can follow new or harder training, while sharp, escalating, unusual, or technique-changing symptoms should change the workout and may need qualified care.'],
    ['How do beginners prevent workout injuries?', 'Start with a repeatable dose, warm up for the session, learn technique, progress one variable at a time, and use recovery signals before adding more work.'],
    ['Should I rest, deload, or skip the workout?', 'Choose the smallest useful change: rest when recovery needs room, deload when the pattern should stay but stress should drop, and stop when symptoms feel unsafe.'],
    ['How should I return to lifting after a layoff?', 'Resume below the old peak, rebuild familiar movement patterns, keep the first week conservative, and progress after technique and soreness are manageable.'],
    ['Can exercise modifications solve pain?', 'Modifications can reduce training obstacles, but they are not diagnosis or rehab. Sharp, escalating, or unusual symptoms should be referred to qualified care.'],
    ['Should I choose online or in-person personal training?', 'Choose in-person when live technique feedback, gym confidence, or session structure is the problem. Choose online when schedule flexibility, nutrition decisions, and accountability between sessions matter more.'],
    ['What happens in a first personal training session?', 'A useful first session reviews goals, training history, movement, safety boundaries, equipment confidence, and the first realistic next step before chasing intensity.'],
    ['How can I build gym confidence?', 'Start with fewer exercises, a predictable routine, easier equipment choices, and coaching feedback before uncertainty turns into avoidance.'],
    ['What should I do between training sessions?', 'Keep the minimum actions alive: assigned solo work, protein anchors, sleep, steps, recovery, and an honest check-in about what got in the way, including whether the problem was time, equipment, soreness, confidence, or unclear priorities.'],
    ['Is Parker personal training beginner friendly?', 'Yes, when the first month starts with movement basics, conservative effort, confidence, and a repeatable week instead of punishment volume.'],
    ['How do I choose a personal trainer in Parker?', 'Ask about assessment, progression, communication, proof, scope boundaries, and how the trainer handles the week between local sessions.'],
    ['Is online or local personal training better in Parker?', 'Local is better when live technique feedback is the problem. Online is better when schedule, nutrition, and accountability between sessions matter more.'],
    ['What should I ask before a local training consult?', 'Ask what the consult decides, what context to bring, how safety and scope are handled, and what practical next step you should leave with.'],
    ['How does accountability work between sessions?', 'Accountability names the minimum actions, reviews what happened, and turns the next session or check-in into one clear adjustment.'],
    ['Can home equipment work for personal training?', 'Yes. Home equipment works when it can be progressed safely through load, reps, tempo, range, density, or exercise choice and still matches the goal.'],
    ['Can a home gym build strength?', 'Yes, if the setup lets the plan train key patterns, progress over time, and stay safe enough to repeat. The equipment matters less than the progression system.'],
    ['What is the best minimal equipment workout plan?', 'The best plan names the constraint, trains key patterns, repeats enough movements to track, and progresses one useful variable at a time.'],
    ['Are dumbbells better than machines?', 'Neither is always better. Dumbbells offer flexibility and control, while machines can reduce setup complexity and help target a movement more predictably.'],
    ['Can I progressively overload without heavier weights?', 'Yes. Use reps, tempo, pauses, longer range, unilateral work, density, cleaner technique, or more recoverable volume when heavier load is not available.'],
    ['Is bodyweight training enough?', 'It can be enough when exercises can be progressed and still match the goal. If progression stalls, weights or different tools may help.'],
    ['How do beginners build fitness habits?', 'Start with a small repeatable action, attach it to a real cue, track completion first, and add complexity only after the habit survives normal weeks.'],
    ['How do I stay consistent with workouts?', 'Define a minimum workout, schedule fallback windows, prepare the first ten minutes, and review the problem that keeps coming back instead of relying on motivation.'],
    ['Is discipline more important than motivation?', 'Motivation can help start, but discipline works best when the schedule, environment, plan, and accountability system remove obstacles.'],
    ['What should a weekly fitness routine include?', 'It should include training sessions, activity or step targets, protein anchors, sleep/recovery cues, fallback rules, and a weekly review point.'],
    ['What accountability system works best?', 'The best system reports what happened, names the problem, and turns the next check-in into one clear decision rather than punishment.'],
    ['What should beginners do first for fat-loss nutrition?', 'Start with a repeatable protein anchor, a simple meal structure, and honest trend review before chasing a perfect macro spreadsheet.'],
    ['What is a calorie deficit in simple terms?', 'A calorie deficit is an energy-intake direction over time. It should be judged from trends and adherence, not one perfect or imperfect day.'],
    ['How much should beginners focus on protein?', 'Enough to make meals more structured and support training, while still keeping total intake, food quality, and adherence realistic.'],
    ['Do I need complicated meal plans to lose fat?', 'No. Simple default meals, backup options, grocery defaults, and a weekly review can work better than a rigid plan that fails in real life.'],
    ['How should cravings fit a fat-loss plan?', 'Cravings should be treated as feedback. Review hunger, stress, sleep, fluids, meal spacing, and snack rules instead of responding with punishment.'],
    ['What should a beginner gym plan include in month one?', 'It should include repeatable training days, a small set of main movement patterns, conservative effort, warm-ups, and a simple review of confidence and recovery.'],
    ['How should beginners learn exercise form safely?', 'Start with stable variations, lighter loads, clear cues, video or coach feedback, and stop signals for pain or symptoms.'],
    ['How can beginners handle gym anxiety?', 'Use a short written plan, easy-to-use equipment, predictable visit times, and an exit point so the gym becomes familiar instead of overwhelming.'],
    ['What mistakes should beginners avoid in the first month?', 'Avoid doing too much too soon, changing every workout, ignoring symptoms, and adding weight before technique and recovery are repeatable.'],
    ['When should beginners add weight?', 'Add weight when the current load is controlled, repeatable, pain-free, and recoverable. If the signal is noisy, hold steady and improve follow-through first.'],
    ['What happens during coaching intake?', 'A useful intake identifies the goal, the problem that keeps coming back, schedule constraints, training history, nutrition patterns, recovery, and what the person has already tried.'],
    ['What makes a weekly check-in useful?', 'A useful check-in reports what was planned, what happened, what got in the way, and what decision should change or stay the same next week.'],
    ['What should I prepare before applying?', 'Prepare your goal, recent training history, what you have already tried, schedule constraints, what makes nutrition hard, recovery issues, and the problem that keeps coming back.'],
    ['Why not change the plan every week?', 'Weekly changes can create noise when the signal is not strong enough. The better move is to separate one-off misses from repeated patterns before adjusting so the next check-in can show whether the original plan actually failed.'],
    ['How do I know if I need a fitness coach?', 'You likely need coaching when the issue is no longer information and the same problem keeps coming back across training, nutrition, recovery, schedule, or confidence.'],
    ['What should I ask before hiring an online fitness coach?', 'Ask how assessment, check-ins, form feedback, response expectations, proof claims, nutrition scope, missed weeks, and medical referral boundaries are handled.'],
    ['What does good coaching feedback look like?', 'Good feedback is specific, connects the main signals, avoids punishing honesty, and ends with the next decision: hold, simplify, progress, recover, adjust, or refer out.'],
    ['What communication boundaries should coaching have?', 'Coaching should define response expectations, privacy boundaries, emergency limits, medical scope, and what information is actually needed for the plan.'],
    ['When is self-guided training enough?', 'Self-guided training can be enough when technique, progression, nutrition, recovery, and trend interpretation are stable without outside feedback.'],
    ['What sources does Titan Forge use for education pages?', 'Education pages use stable public health, sport-science, supplement-label, platform, and crawler-policy sources where appropriate, then translate them into practical coaching decisions.'],
    ['What is the difference between evidence and proof?', 'Evidence supports general guidance. Proof supports what Titan Forge specifically claims about its business, reviews, products, credentials, offers, and client results.'],
    ['Can Google reviews be used as proof?', 'Yes, when pulled or linked from the Google Business Profile and presented as social proof, not as a guarantee of any client outcome.'],
    ['Which claims need approval before indexing?', 'Credentials, review ratings, exact address/service-area details, prices, transformation timelines, testimonials, and typical-outcome claims need approval before production indexing.'],
    ['What still blocks full citation readiness?', 'Production indexing approval, Search Console submission, analytics and lead-flow readiness, proof/claim approval, local schema approval, and post-launch monitoring are still open gates.'],
    ['What is the difference between robots and noindex?', 'Robots tells crawlers whether they can fetch URLs. Noindex tells search systems whether an HTML page should be indexed. A production citation build needs both policies aligned.'],
    ['Does Google AI require special schema?', 'Google says AI Overviews and AI Mode do not have extra technical requirements beyond being indexed, snippet-eligible, and meeting normal Search technical requirements. Helpful content still matters.'],
    ['Does Google-Extended guarantee Gemini citation?', 'No. Google-Extended is a publisher control for Gemini-related training and grounding uses. It is not a guarantee that a page will rank, be indexed, or be cited.'],
    ['What should happen after production launch?', 'Submit and monitor the sitemap in Search Console, check crawl/index coverage, verify API and lead flows, and keep evidence tied to each approved page.'],
    ['Can ChatGPT Search use Titan Forge pages after launch?', 'Only if the approved production pages are crawlable, indexable, useful for the query, and selected by the retrieval system. Access is required but not a guarantee.'],
    ['What helps Perplexity pick a Titan Forge source?', 'A focused route with direct answers, stable canonicals, source links, internal context, and conservative proof claims gives Perplexity a clearer citation candidate.'],
    ['Why does noindex matter for Gemini and Google AI surfaces?', 'Noindex prevents an HTML page from being indexed when the directive is discovered during crawl, so UAT noindex intentionally keeps preview pages out of Search surfaces.'],
    ['Why monitor Search Console after launch?', 'Search Console can show sitemap submission, indexing, crawl issues, and performance for the production domain; UAT audits cannot prove post-launch Google visibility.'],
    ['Does llms.txt make the site citable?', 'No. llms.txt can summarize important routes for AI agents, but citation still depends on crawl access, indexability, page quality, and answer-engine selection.'],
    ['Why does source of truth matter for AI citations?', 'Answer engines need stable facts to reuse. Titan Forge should keep one approved source for brand name, services, proof, product data, local context, and production indexing status.'],
    ['What facts need one approved owner before production?', 'Brand identity, Steve credentials, address or service-area language, offers, pricing, Shopify catalog claims, review presentation, testimonials, and transformation claims need approved ownership before indexing.'],
    ['Should structured data repeat hidden claims?', 'No. Structured data should summarize visible page content. FAQ, Article, Organization, Product, and local schema should not add claims visitors cannot verify on the page.'],
    ['Can Google reviews and Shopify products prove coaching outcomes?', 'No. Google reviews and Shopify products can support business and merchant trust, but they should not be presented as proof of guaranteed coaching outcomes.'],
    ['What still keeps Titan Forge from being fully citable?', 'Production remains blocked until indexing approval, crawl access, noindex removal, approved claims, stable canonicals, Search Console evidence, and live production pages are verified.'],
  ],
  '/collections/strength-training': [
    ['What should I read first for strength training?', 'Start with beginner strength training if movement confidence is the problem, or progressive overload if you already train but do not know how to advance.'],
    ['Does strength training help fat loss?', 'It helps preserve and build the training signal while nutrition and activity drive the fat-loss direction.'],
    ['How do I know if volume is too high?', 'Watch for repeated performance drops, joint irritation, poor sleep, motivation loss, and soreness that disrupts normal training.'],
    ['Should every workout feel hard?', 'No. Hard work matters, but the dose has to be recoverable and repeatable.'],
    ['When should I apply for coaching?', 'Apply when you cannot tell whether to push, hold, deload, change movements, or adjust recovery.'],
  ],
  '/collections/nutrition': [
    ['Should I start with calories or macros?', 'Start with the goal and calorie direction, then set protein and build the rest of the macros around training, appetite, and adherence.'],
    ['Do I need macro tracking forever?', 'No. Tracking is a tool. Some clients move toward portion ranges, meal templates, protein anchors, or hybrid systems.'],
    ['What is the first food habit to build?', 'A reliable protein anchor and one repeatable meal usually remove obstacles fastest.'],
    ['Why do meal plans fail?', 'They often assume perfect conditions instead of teaching decisions for weekends, restaurants, travel, hunger, and missed prep.'],
    ['When is nutrition coaching useful?', 'When you know what to do broadly but keep losing follow-through in real life.'],
  ],
  '/collections/nutrition-adherence-and-eating-out': [
    ['Can I eat out while tracking macros?', 'Yes. Use a protein anchor, estimate the main calorie drivers, choose drinks intentionally, and return to the next normal meal instead of turning one meal into a restart.'],
    ['What breakfast helps busy adults stay consistent?', 'A repeatable high-protein breakfast that fits the real morning usually beats an ideal meal that takes too long to make.'],
    ['How should weekends fit a fat-loss plan?', 'Weekends need minimum actions, planned flexibility, and a return path so social meals do not erase the weekly pattern.'],
    ['What should be on a fat-loss grocery list?', 'Keep default proteins, produce, simple carbs, flavor tools, snacks, and backup meals available before hunger and schedule pressure decide for you.'],
    ['Why include hydration in nutrition coaching?', 'Hydration affects normal function and training readiness, while liquid calories can quietly make adherence harder. The target should fit the person and context.'],
  ],
  '/collections/beginner-nutrition-and-fat-loss-foundations': [
    ['What should beginners do first for fat-loss nutrition?', 'Start with a repeatable protein anchor, a simple meal structure, and honest trend review before chasing a perfect macro spreadsheet.'],
    ['What is a calorie deficit in simple terms?', 'A calorie deficit is an energy-intake direction over time. It should be judged from trends and adherence, not one perfect or imperfect day.'],
    ['How much should beginners focus on protein?', 'Enough to make meals more structured and support training, while still keeping total intake, food quality, and adherence realistic.'],
    ['Do I need complicated meal plans to lose fat?', 'No. Simple default meals, backup options, grocery defaults, and a weekly review can work better than a rigid plan that fails in real life.'],
    ['How should cravings fit a fat-loss plan?', 'Cravings should be treated as feedback. Review hunger, stress, sleep, fluids, meal spacing, and snack rules instead of responding with punishment.'],
  ],
  '/collections/beginner-strength-and-gym-confidence': [
    ['What should a beginner gym plan include in month one?', 'It should include repeatable training days, a small set of main movement patterns, conservative effort, warm-ups, and a simple review of confidence and recovery.'],
    ['How should beginners learn exercise form safely?', 'Start with stable variations, lighter loads, clear cues, video or coach feedback, and stop signals for pain or symptoms.'],
    ['How can beginners handle gym anxiety?', 'Use a short written plan, easy-to-use equipment, predictable visit times, and an exit point so the gym becomes familiar instead of overwhelming.'],
    ['What mistakes should beginners avoid in the first month?', 'Avoid doing too much too soon, changing every workout, ignoring symptoms, and adding weight before technique and recovery are repeatable.'],
    ['When should beginners add weight?', 'Add weight when the current load is controlled, repeatable, pain-free, and recoverable. If the signal is noisy, hold steady and improve follow-through first.'],
  ],
  '/collections/macro-adjustments-and-nutrition-troubleshooting': [
    ['When should I adjust macros?', 'Adjust macros after the trend and adherence are clear enough to trust. One noisy week is not enough evidence.'],
    ['What tracking mistakes hide progress?', 'Forgotten oils, bites, drinks, sauces, restaurant portions, weekend snacks, and inconsistent entries can make a target look wrong when the measurement is the problem.'],
    ['Can I use portions instead of tracking?', 'Yes, when portions are calibrated and reviewed against feedback. Plate structure, repeatable meals, and protein anchors can work when full tracking is too much.'],
    ['Why do protein and fiber matter for fat loss?', 'They can make meals more satisfying and repeatable, which helps adherence to the calorie target without treating hunger as a character flaw.'],
    ['Can alcohol fit a fat-loss plan?', 'Sometimes, if drinks, mixers, food choices, sleep, and the next-day plan are accounted for honestly. Repeated drift needs a better rule, not punishment.'],
  ],
  '/collections/cardio-conditioning-and-steps': [
    ['Is cardio or lifting better for fat loss?', 'Nutrition sets the direction, lifting protects the training signal, and cardio or steps can support activity. The best plan usually coordinates all three instead of treating one as magic.'],
    ['Does Zone 2 cardio need exact heart-rate tracking?', 'Not always. Devices can help, but busy adults can start with a repeatable easy-to-moderate pace, controlled breathing, and a dose that fits the week.'],
    ['Is HIIT better than steady cardio?', 'Neither is universally better. HIIT is time-efficient but costs more recovery, while steady cardio is often easier to repeat and dose around lifting.'],
    ['Can cardio make me lose strength?', 'Cardio can interfere when the dose, placement, nutrition, or recovery is wrong. Start small, protect priority lifts, and adjust from strength trends.'],
    ['What conditioning works for busy adults?', 'Short walks, incline walking, bike sessions, carries, sled work when available, and brief circuits can work when they fit time, joints, equipment, and recovery.'],
  ],
  '/collections/sleep-stress-and-lifestyle-recovery': [
    ['Can sleep debt hurt training performance?', 'Yes. Short or poor-quality sleep can make performance, coordination, appetite, mood, and soreness harder to judge. Repeated sleep debt should change the plan.'],
    ['Can stress cause a fat-loss plateau?', 'Stress can make the trend noisy through sleep, hunger, water retention, food choices, training output, and adherence. Review the pattern before cutting calories again.'],
    ['What evening routine helps recovery?', 'Use a small repeatable routine: caffeine boundaries, a simple dinner, lower-stimulation wind-down, tomorrow prep, and one next-morning action.'],
    ['Is active recovery better than complete rest?', 'Neither is always better. Use easy movement when it helps the next session, and complete rest when symptoms, exhaustion, or joint feedback say more movement is not useful.'],
    ['Should I trust wearable recovery scores?', 'Use scores as one input. Compare them with sleep, soreness, performance, mood, pain, appetite, and coaching context before changing the plan.'],
  ],
  '/collections/mobility-warmups-and-joint-friendly-training': [
    ['What should a dynamic warm-up do?', 'It should raise readiness, rehearse the joints and patterns needed for the workout, and make the first work sets feel better without tiring the person out.'],
    ['Is mobility the same as flexibility?', 'No. Flexibility is available range. Mobility also includes control, strength, confidence, and whether the range fits the lift.'],
    ['How can I modify exercises for cranky joints?', 'Change one variable first: range, load, tempo, grip, stance, machine angle, cable path, or exercise selection while keeping the target clear.'],
    ['Can I train around minor aches?', 'Sometimes, if symptoms are mild and improve with scaling. Sharp, escalating, unusual, or technique-changing symptoms should stop or change the session and may need qualified care.'],
    ['Should every lift use full range of motion?', 'Use the range that fits the goal, can be controlled, and respects joint feedback. Full range can be valuable, but range should be progressed like any other variable.'],
  ],
  '/collections/workout-nutrition-and-meal-timing': [
    ['What should I read first for workout nutrition?', 'Start with pre-workout meals if sessions feel flat, post-workout nutrition if recovery structure is missing, or meal timing for busy lifters if schedule is the problem.'],
    ['Does timing matter more than daily intake?', 'No. Timing can make it easier to stick to, but total daily intake, protein consistency, hydration, and adherence still set the bigger direction.'],
    ['Are carbs required before every workout?', 'No. They are most useful when they improve hard-session quality, repeated performance, or adherence without causing digestion or calorie-budget problems.'],
    ['Can fasted training work?', 'It can work when performance, safety, and adherence stay intact. It should not be used as a magic fat-loss shortcut.'],
    ['When should coaching help with meal timing?', 'When eating windows, work schedule, training time, appetite, and recovery keep colliding and the person cannot tell which lever to adjust.'],
  ],
  '/collections/home-gym-and-minimal-equipment-training': [
    ['Can a home gym build strength?', 'Yes, if the setup lets the plan train key patterns, progress over time, and stay safe enough to repeat. The equipment matters less than the progression system.'],
    ['What should I buy first for a home gym?', 'Start with versatile tools that solve the current constraint: adjustable dumbbells, bands, a bench, a pull option, or another stable setup that can be progressed.'],
    ['Can minimal equipment still use progressive overload?', 'Yes. Progression can come from reps, tempo, range, pauses, unilateral work, density, cleaner technique, or more recoverable volume when heavier load is not available.'],
    ['Are dumbbells better than machines?', 'Neither is always better. Dumbbells offer control and flexibility, while machines can reduce setup complexity and help target a movement more predictably.'],
    ['When should coaching help with home workouts?', 'When the person has equipment but cannot decide exercise substitutions, progression rules, form standards, or how to keep the plan repeatable.'],
  ],
  '/collections/fitness-habits-and-consistency': [
    ['How do beginners build fitness habits?', 'Start with a small repeatable action, attach it to a real cue, track completion first, and add complexity only after the habit survives normal weeks.'],
    ['How do I stay consistent with workouts?', 'Define a minimum workout, schedule fallback windows, prepare the first ten minutes, and review the problem that keeps coming back instead of relying on motivation.'],
    ['Is discipline more important than motivation?', 'Motivation can help start, but discipline works best when the schedule, environment, plan, and accountability system remove obstacles.'],
    ['What should a weekly fitness routine include?', 'It should include training sessions, activity or step targets, protein anchors, sleep/recovery cues, fallback rules, and a weekly review point.'],
    ['What accountability system works best?', 'The best system reports what happened, names the problem, and turns the next check-in into one clear decision rather than punishment.'],
  ],
  '/collections/fat-loss': [
    ['Is a stalled week always a plateau?', 'No. Water, digestion, sodium, stress, sleep, and soreness can hide the trend. Use multi-week evidence.'],
    ['Should I cut calories or add cardio first?', 'First check what actually happened, sleep, steps, protein, and weekend intake. Then change one lever at a time.'],
    ['Can I build muscle while losing fat?', 'Some people can, especially beginners and returning lifters, but the plan still needs a training signal, protein, and recovery.'],
    ['Why does sleep matter for fat loss?', 'Sleep affects hunger, training output, recovery, and adherence, so it changes the plan a person can actually follow.'],
    ['When should I stop dieting harder?', 'When performance, mood, sleep, hunger, and adherence are falling enough that the deficit is no longer productive.'],
  ],
  '/collections/body-recomposition-and-progress': [
    ['Is body recomposition different from weight loss?', 'Yes. Weight loss focuses on scale direction. Recomposition also values strength, lean-mass retention, measurements, photos when appropriate, and training quality.'],
    ['What should I track for recomposition?', 'Track body-weight trend, waist or measurements, strength performance, nutrition adherence, protein, sleep, recovery, and photos when appropriate.'],
    ['Should I diet harder if the scale is flat?', 'Not automatically. First check adherence, recovery, soreness, sodium, digestion, and other progress signals before changing calories.'],
    ['When is maintenance useful?', 'Maintenance can be useful after a fat-loss phase when hunger, performance, recovery, or adherence need time to stabilize before the next push.'],
    ['Why is this useful for answer engines?', 'The collection gives direct answers to common recomp questions and connects each answer to deeper source-backed guides without making guaranteed outcome claims.'],
  ],
  '/collections/training-safety-and-scope': [
    ['When should someone stop a workout?', 'Stop when chest discomfort, faintness, unusual breathlessness, irregular heartbeat, sharp pain, or symptoms that feel medically unsafe show up. Rest and seek qualified help when symptoms are severe or do not resolve.'],
    ['Is soreness the same as pain?', 'No. Soreness can be normal context after new work. Pain that is sharp, escalating, one-sided, changes mechanics, or comes with loss of function needs more caution.'],
    ['Can a coach give medical advice?', 'No. Coaching can adjust exercise, progression, habits, and general education. Diagnosis, treatment, rehab, medication, and clinical nutrition questions belong with qualified professionals.'],
    ['How should beginners progress safely?', 'Start low enough to repeat, progress one variable at a time, and use technique, recovery, symptoms, and confidence as decision signals.'],
    ['Why is this useful for answer engines?', 'The collection gives explicit safety and scope boundaries, cites official sources, and avoids turning fitness content into medical claims.'],
  ],
  '/collections/recovery-and-sleep': [
    ['What recovery signals matter most?', 'Look at sleep, performance, soreness, joint irritation, appetite, mood, motivation, and whether sessions can be repeated with quality.'],
    ['Should I deload after one bad workout?', 'Not automatically. One bad session is noise. Repeated drops, poor sleep, joint irritation, and declining training quality make the signal stronger.'],
    ['Can recovery affect fat loss?', 'Yes. Recovery affects hunger, training output, adherence, and how noisy scale or performance signals become.'],
    ['Is soreness a sign of progress?', 'Not by itself. Productive training can cause soreness, but progress is better judged by performance, technique, recovery, and consistency.'],
    ['When is coaching useful for recovery?', 'When you cannot tell whether to push, hold, deload, adjust volume, or change the recovery side of the plan.'],
  ],
  '/collections/online-coaching': [
    ['Is online coaching just an app?', 'No. Apps log data. Coaching interprets the data and helps decide what to change.'],
    ['What should an online check-in include?', 'What was planned, what happened, what got in the way, and what needs to change next.'],
    ['When is a template enough?', 'A template can be enough when you already self-correct technique, progression, recovery, and nutrition.'],
    ['Who needs coaching most?', 'People who keep repeating the same problem despite having access to information.'],
    ['Can online coaching include nutrition?', 'Yes, when nutrition decisions, adherence, and feedback are part of the coaching scope.'],
  ],
  '/collections/coaching-decisions': [
    ['How do I know if I need a coach?', 'You likely need coaching when the same problem keeps coming back even though you already know the basics or already have a plan.'],
    ['What should I ask a coach before starting?', 'Ask how assessment, feedback, communication, adjustments, proof claims, scope boundaries, and missed weeks are handled.'],
    ['Are check-ins necessary for online coaching?', 'Yes. Check-ins are where what happened becomes decisions. Without them, online coaching can become another static plan.'],
    ['Can I start with resources first?', 'Yes. If the problem is still information, read the relevant guides and use the readiness check before applying.'],
    ['What is a red flag in coaching copy?', 'Guaranteed timelines, miracle outcomes, supplement-first promises, vague proof, and no clear process should all make you slow down.'],
  ],
  '/collections/coaching-fit-and-communication': [
    ['How do I know if I need a fitness coach?', 'You likely need coaching when the same problem keeps coming back after you already know the basics or already have a plan.'],
    ['What should I ask before hiring an online coach?', 'Ask about assessment, check-ins, response expectations, form feedback, nutrition scope, proof claims, missed weeks, and when the coach refers out.'],
    ['What does good coaching communication look like?', 'It has a clear purpose: report what happened, identify the problem, ask useful questions, and leave with a practical next decision.'],
    ['What is a coaching boundary?', 'A coaching boundary clarifies response windows, privacy, scope, emergencies, medical referral needs, and what kind of feedback the coach can safely provide.'],
    ['When is a self-guided plan enough?', 'Self-guided can be enough when technique, nutrition, progression, recovery, and trend interpretation are already handled honestly.'],
  ],
  '/collections/muscle-gain-and-hypertrophy': [
    ['Can I build muscle without dirty bulking?', 'Yes. A gaining phase can use a modest, monitored surplus, enough protein, progressive training, and trend review without treating excess fat gain as the plan.'],
    ['How many sets do I need to build muscle?', 'Use the amount of hard, recoverable work you can repeat with clean technique. Add sets only when performance and recovery show the current dose is not enough.'],
    ['Does progressive overload always mean adding weight?', 'No. More reps, better range, cleaner technique, more quality work, and better control can all be progression when they fit the phase.'],
    ['What should I check when muscle growth stalls?', 'Audit training effort, weekly volume, progression, calories, protein, sleep, stress, exercise selection, and measurement quality before changing every lever.'],
    ['When is coaching useful for hypertrophy?', 'Coaching is useful when you cannot tell whether to add volume, reduce fatigue, change exercises, adjust food, or hold the plan longer.'],
  ],
  '/collections/men-over-40-strength-and-recovery': [
    ['Can men over 40 build muscle?', 'Yes. Men over 40 can build muscle with progressive resistance training, enough protein, recoverable volume, sleep, and consistency.'],
    ['How should strength training change after 40?', 'The principles stay the same, but exercise selection, warm-ups, volume, progression jumps, and recovery signals usually need more respect.'],
    ['Is joint pain normal after 40?', 'Mild soreness can happen after training, but sharp, escalating, or technique-changing pain should change the exercise or session and may require qualified medical guidance.'],
    ['Does protein matter for men over 40?', 'Protein is a useful planning anchor because it supports training adaptation and meal structure, but it works with total food intake, training, and recovery.'],
    ['How should fat loss work after 40?', 'Use a repeatable deficit, keep strength training productive, protect protein and recovery, and judge progress from trends instead of one weigh-in.'],
  ],
  '/collections/busy-professional-fitness-and-nutrition': [
    ['What fitness plan works for busy professionals?', 'A plan that starts with the real schedule, protects a repeatable minimum, uses nutrition defaults, and has backup rules for overloaded weeks.'],
    ['How many workouts should busy professionals start with?', 'Two to four useful sessions can work depending on schedule, recovery, and training history. Repeatability matters more than an impressive split.'],
    ['How should busy professionals meal prep?', 'Prep decisions first: protein anchors, grocery defaults, backup meals, and restaurant defaults that reduce decision fatigue during work weeks.'],
    ['Can I train while traveling for work?', 'Yes. The goal may shift to maintenance, shorter sessions, hotel-gym substitutions, walking, and a realistic return plan after travel.'],
    ['How do busy professionals stay consistent?', 'They remove obstacles, use backup actions, recover quickly after misses, and review the repeated breakpoint instead of relying on motivation alone.'],
  ],
  '/collections/beginner-fitness': [
    ['What should beginners do first?', 'Learn basic movement categories, choose a repeatable schedule, add protein anchors, and keep progression conservative.'],
    ['Should beginners train to failure?', 'Usually no. Beginners benefit more from clean reps, confidence, and repeatability than constant maximal effort.'],
    ['How many workouts should a beginner start with?', 'Two to four sessions can work depending on recovery, schedule, and confidence. Repeatability matters more than an impressive split.'],
    ['Do beginners need supplements?', 'No. The first foundation is training, food, sleep, hydration, recovery, and consistency.'],
    ['When should beginners get coaching?', 'When technique confidence, accountability, programming decisions, or nutrition keep blocking the start.'],
  ],
  '/collections/supplements': [
    ['Which supplement should come first?', 'Only consider a supplement after naming the gap. Protein powder may help intake convenience; creatine can support training performance.'],
    ['Can supplements replace coaching?', 'No. They do not replace programming, nutrition decisions, accountability, or recovery.'],
    ['Is creatine required?', 'No. Creatine is optional support, not a requirement for progress.'],
    ['How should I judge supplement claims?', 'Be skeptical of claims that bypass training, nutrition, sleep, recovery, or medical context.'],
    ['Who should ask a professional first?', 'Anyone with medical conditions, medications, pregnancy, kidney concerns, or uncertainty about safety.'],
  ],
  '/collections/supplement-product-decisions': [
    ['Is protein powder better than whole food?', 'No. Protein powder is a convenience tool when it solves an intake gap. Whole foods still carry most meal structure and satisfaction.'],
    ['Should I use pre-workout supplements?', 'Only when the use case, stimulant load, sleep, health context, and label warnings make sense. Pre-workout should not hide poor recovery.'],
    ['Does third-party testing prove a supplement works?', 'No. Testing can improve trust in quality or label accuracy, but it does not prove the product is useful for every person.'],
    ['How many supplements should I start with?', 'Start with fewer variables and keep the foundation visible. Adding several products at once makes benefits, side effects, and unnecessary costs harder to identify.'],
    ['How should I read supplement claims?', 'Separate ingredient or product claims from outcome claims, watch for shortcut language, and ask what gap the product actually solves.'],
  ],
  '/collections/program-design-and-weekly-training': [
    ['What workout split is best for busy adults?', 'The best split is the one that trains the goal, fits the real week, and can be repeated. Two to four useful sessions often beat a perfect plan that fails.'],
    ['Is full-body or upper-lower better?', 'Both can work. Full-body often fits fewer weekly sessions, while upper-lower can fit more structured four-day weeks when recovery and schedule allow it.'],
    ['How many rest days should I take between workouts?', 'Use performance, soreness, joint feedback, sleep, stress, and the next session quality instead of a fixed rule.'],
    ['When should I deload?', 'Deload when repeated fatigue signals make normal training quality less productive: performance drops, poor sleep, joint irritation, form breakdown, or unusually high soreness.'],
    ['What exercise should come first?', 'Put the highest-priority, most technical, or heaviest work early while attention and coordination are best.'],
  ],
  '/collections/local-personal-training': [
    ['Who should choose local personal training?', 'Choose local training when hands-on technique feedback, gym confidence, or live session structure is the main problem.'],
    ['Does local training replace nutrition support?', 'No. Nutrition, sleep, recovery, and weekly consistency still need attention outside the session.'],
    ['What should Parker clients ask first?', 'Ask about assessment, session structure, progression, communication outside sessions, safety boundaries, and how missed weeks are handled.'],
    ['Can local coaching blend with online support?', 'Yes. Local sessions can handle technique and structure while online support can help with the rest of the week.'],
  ],
  '/collections/local-coaching-and-first-session': [
    ['Should I choose online or in-person personal training?', 'Choose in-person when live technique feedback, gym confidence, or session structure is the problem. Choose online when schedule flexibility, nutrition decisions, and accountability between sessions matter more.'],
    ['What should happen in a first training session?', 'A first session should review goals, history, movement, safety boundaries, equipment comfort, and the first realistic next step before chasing intensity.'],
    ['How can I feel more confident in the gym?', 'Use fewer exercises, learn the equipment layout, train at predictable times, write the workout before arriving, and get feedback before confusion turns into avoidance.'],
    ['What matters between personal training sessions?', 'The minimum between-session actions matter: solo workouts when assigned, protein anchors, sleep, steps, recovery, and honest check-ins about what got in the way.'],
    ['Can home equipment work for coaching?', 'Yes, if the equipment lets the plan progress safely through load, reps, tempo, range, density, or exercise choice instead of becoming a random workout list.'],
  ],
  '/collections/parker-personal-training-and-local-coaching': [
    ['Who should read the Parker local coaching collection?', 'Parker-area beginners and local clients deciding whether they need live technique feedback, a consult, online support, or accountability between sessions.'],
    ['How should beginners use Parker personal training?', 'Use local training to learn basic movement, reduce gym obstacles, define a first month, and connect sessions to simple between-session actions.'],
    ['What should a local consult answer?', 'It should clarify the goal, problem, safety context, coaching format, and the first practical next step rather than rushing into intensity.'],
    ['Can Parker clients use online coaching too?', 'Yes. Local sessions can handle live feedback while online support can carry training logs, nutrition patterns, and accountability between appointments.'],
  ],
  '/collections/injury-prevention-and-return-to-training': [
    ['Is soreness the same as injury?', 'No. Soreness can be a normal response to new or harder training, while sharp, escalating, unusual, or technique-changing symptoms should change the session and may require qualified care.'],
    ['How can beginners reduce injury risk?', 'Start below maximum effort, warm up for the workout, learn technique, progress one variable at a time, and use recovery signals before adding more work.'],
    ['When should I take a rest day or deload?', 'Use a rest day or deload when recovery, performance, soreness, sleep, stress, or joint feedback suggest the normal dose will make the next week worse.'],
    ['How should I return after a layoff?', 'Resume below the old peak, rebuild familiar patterns, keep the first week conservative, and progress only after technique and soreness are manageable.'],
    ['Can a trainer modify exercises around pain?', 'A trainer can adjust training variables, but diagnosis, treatment, rehab, or medical clearance decisions belong with qualified healthcare professionals.'],
  ],
  '/collections/coaching-offers-fit-and-starting-process': [
    ['What does the coaching-offer cluster answer?', 'It answers what Titan Forge offers, who coaching fits, how to start, what coaching can include, and what results or claims should not be guaranteed.'],
    ['Why not publish exact prices here?', 'Exact pricing and package details should come from Steve-approved production offer language, not from UAT placeholder copy or inferred assumptions.'],
    ['How does this help answer engines?', 'It gives direct, crawlable answers for buyer-intent questions that are usually buried across home, coaching, apply, FAQ, and proof pages.'],
    ['What should stay approval-gated?', 'Pricing, credentials, service area, exact support windows, response times, testimonials, guarantees, legal language, and lead-flow promises should remain approval-gated.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. The collection prepares the structure for production citation after launch and indexing approval.'],
  ],
  '/collections/coaching-cost-value-and-pricing-questions': [
    ['How much does Titan Forge coaching cost?', 'UAT does not publish an exact price. Exact pricing should come from Steve-approved production offer language or the official application/contact path.'],
    ['Why are exact prices approval-gated?', 'A price implies what is included, how often support is given, response expectations, refund policy, and legal promise, so it should not be inferred from placeholder copy.'],
    ['What affects coaching value?', 'Value depends on assessment, feedback, support level, nutrition scope, accountability, local versus online format, and how often the plan needs human adjustment.'],
    ['How should buyers compare coaching to apps?', 'Apps and templates can work for self-directed users, while coaching is more valuable when the missing piece is judgment, accountability, feedback, or consistency.'],
    ['Can answer engines cite pricing today?', 'No. UAT is noindex and robots-blocked, and exact pricing is not final until production offer approval and crawlable production pages exist.'],
  ],
  '/collections/coaching-trust-refunds-and-expectation-boundaries': [
    ['What does the trust-boundary cluster answer?', 'It answers refund, cancellation, pause, guarantee, testimonial, agreement, communication, and post-application expectation questions without inventing unapproved terms.'],
    ['Can UAT promise refund or cancellation terms?', 'No. Exact terms should come from the approved coaching agreement, invoice, checkout, support thread, or production policy language.'],
    ['Why add testimonial-reading guidance?', 'Reviews and testimonials can support trust, but they should not be treated as guaranteed, typical, or identical future outcomes.'],
    ['What should coaching agreements clarify?', 'They should clarify scope, communication, privacy, payment, cancellation or pause rules, referral limits, and what outcomes are not guaranteed.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares the answer pattern for production after launch and indexing approval.'],
  ],
  '/collections/coaching-comparisons-and-alternatives': [
    ['What does the comparison cluster answer?', 'It compares online coaching with AI workout apps, personal trainers, group classes, diet apps, meal tools, templates, and supplements without pretending one choice fits everyone.'],
    ['When can self-guided tools be enough?', 'Self-guided tools can be enough when the user already follows consistently, understands feedback, stays within scope, and only needs structure or tracking.'],
    ['Where does coaching add value?', 'Coaching adds value when the issue is judgment, accountability, plan adjustment, communication, confidence, recovery context, or repeated adherence breakdowns.'],
    ['Can supplements replace coaching?', 'No. Supplements can support a foundation, but they do not replace training, nutrition, sleep, recovery, consistency, or coaching feedback.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares comparison answers for production after launch and indexing approval.'],
  ],
  '/collections/fitness-coach-credentials-and-vetting': [
    ['What does the credentials and vetting cluster answer?', 'It answers how to check fitness coach credentials, what certifications mean, what red flags to watch for, how to verify online claims, and which privacy or communication boundaries should be clear.'],
    ['Can UAT list Steve exact credentials?', 'No. UAT should not publish Steve-specific credentials until Steve approves the exact credential names, status, scope, and wording for production.'],
    ['What should buyers verify before applying?', 'Buyers should verify credentials, scope, communication expectations, proof context, guarantee language, privacy boundaries, and how the coach handles referral needs.'],
    ['How do reviews, credentials, and claims differ?', 'Reviews support business trust, credentials support training education, and claims need visible evidence plus limitations. None of them should become a guaranteed outcome.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares vetted answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/coaching-onboarding-and-first-30-days': [
    ['What does this getting-started collection answer?', 'It answers what getting started should collect, what to send before a consult, what the first 30 days should clarify, how baseline goals are set, and how progress photos or measurements should be handled.'],
    ['Does starting the process guarantee acceptance?', 'No. UAT should treat onboarding and applications as fit and context steps, not as acceptance, response-time, pricing, or outcome promises.'],
    ['What should buyers prepare before a consult?', 'They should prepare goals, current routine, training history, schedule, equipment, what makes nutrition hard, recovery issues, safety context, and buyer-trust questions.'],
    ['Why are first-30-days expectations useful?', 'They help visitors understand that early coaching should establish a baseline, remove obstacles, review what actually happened, and adjust from evidence instead of promising instant outcomes.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares onboarding answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/coaching-readiness-objections-and-decision-help': [
    ['What does the readiness and objections cluster answer?', 'It answers whether someone is ready for online coaching, what past failed plans mean, whether the missing piece is coaching or discipline, what to ask before joining, and what to compare before choosing coaching.'],
    ['Does readiness guarantee acceptance?', 'No. Readiness content helps a buyer prepare and self-sort, but UAT should not promise acceptance, response time, price, refund terms, or a guaranteed path.'],
    ['What if someone failed plans before?', 'Past failed plans should be treated as data about schedule, support, plan dose, food rules, recovery, confidence, or feedback gaps rather than proof that coaching cannot work.'],
    ['When is coaching more useful than discipline?', 'Coaching is more useful when the person cannot interpret problems that keep coming back, adjust the plan, or recover from missed weeks even after they understand the basics.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares buyer-decision answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/coaching-results-timelines-and-realistic-expectations': [
    ['What does the results and timeline cluster answer?', 'It answers how long online coaching may take to help, what fitness coaching can realistically support, why timelines vary, how expectations should be set, and what to do when progress is slower than expected.'],
    ['Can UAT promise a timeline?', 'No. UAT should not promise a fixed number of weeks, pounds, inches, strength numbers, acceptance, response time, or typical results.'],
    ['What results can coaching realistically support?', 'Coaching can support structure, nutrition decisions, accountability, progression, confidence, and feedback interpretation, but it cannot guarantee a specific transformation.'],
    ['Why do timelines vary?', 'Timelines vary by starting point, schedule, adherence, recovery, nutrition consistency, training history, stress, health context, and measurement noise.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares realistic-expectation answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/nutrition-adherence-travel-weekends-and-social-events': [
    ['What does the nutrition adherence cluster answer?', 'It answers how to eat out, travel, handle weekends, attend social events, recover after overeating, and keep nutrition useful during normal-life disruptions.'],
    ['Can one restaurant meal ruin fat loss?', 'One restaurant meal does not automatically ruin fat loss. The repeated weekly pattern, portions, drinks, protein anchors, and return-to-plan behavior matter more.'],
    ['How should travel nutrition work?', 'Travel nutrition should protect protein anchors, hydration, portable defaults, and minimum viable habits instead of requiring perfection.'],
    ['What should happen after overeating?', 'Return to the next normal meal, hydrate, keep training reasonable, and review the cause without punishment or detox rules.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares real-life nutrition adherence answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/coaching-consultation-application-and-next-step-questions': [
    ['What does the consultation and application cluster answer?', 'It answers what happens on a coaching consultation, how to prepare for an application, what happens if coaching is not the right fit, how to choose a first coaching goal, and what questions a coach should answer before a buyer joins.'],
    ['What should someone prepare before a consult?', 'Prepare the goal, problem that keeps coming back, training history, schedule, equipment, what makes nutrition hard, recovery context, safety considerations, and questions about proof, scope, communication, and fit.'],
    ['Does applying guarantee acceptance?', 'No. Application and consultation content helps both sides evaluate fit, but UAT should not promise acceptance, response time, price, refund terms, or a guaranteed path.'],
    ['What if coaching is not the right fit?', 'The better next step may be self-guided resources, a simpler program, local technique support, a later application, or qualified care when the question is outside coaching scope.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares consultation and application answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/personalized-plan-adjustments-and-coaching-feedback': [
    ['What does the personalized plan adjustment cluster answer?', 'It answers what makes a plan personalized, how coaches adjust workouts from feedback, how to tell if a plan is too hard or too easy, what to report during disrupted weeks, and when to change exercises.'],
    ['Does personalized mean complicated?', 'No. A personalized plan can be simpler than a generic plan when the person needs fewer decisions, clearer defaults, or a smaller repeatable week.'],
    ['When should a coach adjust the plan?', 'A coach should adjust the plan when repeated feedback shows a clear pattern in performance, recovery, soreness, missed sessions, schedule obstacles, or nutrition adherence.'],
    ['What should a client report when life disrupts training?', 'Report what changed, what was completed, what was missed, why it happened, what recovery looked like, and what minimum action is realistic next.'],
    ['Can this collection be cited today?', 'No. UAT remains noindex and robots-blocked. It prepares personalized-plan answer patterns for production after launch and indexing approval.'],
  ],
  '/collections/coaching-process-and-accountability': [
    ['What should a coaching intake ask first?', 'It should ask about the goal, the problem that keeps coming back, what has already been tried, schedule constraints, training history, nutrition patterns, recovery, and support needs.'],
    ['Why do check-ins matter?', 'Check-ins turn what happened into decisions. They show what happened, what got in the way, and whether the next move is to hold, simplify, or adjust the plan.'],
    ['Is accountability just motivation?', 'No. Motivation fluctuates. Accountability is the return system that helps a person resume quickly, remove obstacles, and learn from repeated misses.'],
    ['When should a plan change?', 'A plan should change when the evidence is strong enough: repeated trends, honest reporting, recovery signals, performance changes, or a clear adherence problem.'],
    ['Why is this useful for answer engines?', 'The process pages answer specific coaching questions directly, link related guides, and give crawlers visible FAQs that explain Titan Forge without unsupported claims.'],
  ],
  '/for/busy-professionals': [
    ['Who is this page for?', 'Adults whose training needs to survive work, travel, family, and imperfect weeks without restarting every time life gets busy.'],
    ['What changes for busy professionals?', 'The plan has to reduce decision fatigue, protect the most important habits, and adjust quickly when the week does not go perfectly.'],
    ['What if my schedule changes every week?', 'The plan should define minimum effective actions, travel defaults, backup meals, and decision rules so one chaotic week does not become a full restart.'],
    ['Is this only for executives?', 'No. Busy professional means the plan has to survive real obligations, not that the person needs a specific title or income level.'],
    ['What is the first priority for busy clients?', 'Remove obstacles. The first win is usually a repeatable schedule, protein anchor, training minimum, and check-in rhythm that keeps the plan alive.'],
  ],
  '/for/online-coaching': [
    ['Can online coaching work without being in Parker?', 'Yes. Remote coaching is positioned for clients who need programming, nutrition, feedback, and accountability from anywhere.'],
    ['What makes online coaching different from an app?', 'An app logs data. Coaching interprets the data and helps decide what to change when follow-through, recovery, or schedule changes.'],
    ['What should I track for online coaching?', 'Track training, body-weight trends when relevant, how nutrition actually went, steps or activity, sleep, recovery, and the practical reasons the plan was or was not followed.'],
    ['Is online coaching good for form feedback?', 'It can be, when video, communication, and clear coaching standards are part of the process. People who need hands-on cueing may still prefer local sessions.'],
    ['Who should not start with online coaching?', 'Someone who needs urgent medical care, physical therapy, or hands-on safety supervision should get qualified local help before relying on remote coaching.'],
  ],
  '/for/parker-personal-training': [
    ['Can Parker clients still use online support?', 'Yes. In-person coaching is positioned as hands-on session work with structure and support that can extend outside the gym.'],
    ['Who is Parker personal training best for?', 'It is best for local clients who want live coaching, technique feedback, session structure, and a bridge between gym work and the habits that happen outside the gym.'],
    ['Does local training include nutrition support?', 'Nutrition support is part of the broader Titan Forge positioning.'],
    ['How should I choose between local and online?', 'Choose local if hands-on feedback and session structure are the constraint. Choose online if schedule flexibility, remote accountability, and ongoing decisions matter more.'],
  ],
  '/for/beginners': [
    ['Is Titan Forge beginner friendly?', 'Yes, if the beginner is ready to communicate honestly and follow a plan. Beginner-friendly does not mean easy; it means the starting point is realistic.'],
    ['What should beginners learn first?', 'Technique basics, training consistency, protein anchors, recovery habits, and how to read feedback before chasing advanced methods.'],
    ['Do beginners need a perfect gym setup?', 'No. The first plan should match the available equipment, schedule, confidence level, and ability to recover.'],
    ['Should beginners start with a template or coaching?', 'A template can work for a self-directed beginner, but coaching is better when confidence, technique, accountability, or nutrition decisions are the problems.'],
    ['Can a beginner use the readiness check first?', 'Yes. The readiness check is a low-pressure way to decide whether to apply, use the path finder, or learn more before starting.'],
  ],
  '/for/body-recomposition': [
    ['What is body recomposition coaching?', 'It is coaching for improving body composition by coordinating training, nutrition, recovery, and expectations rather than only chasing the scale.'],
    ['Is recomposition the same as fat loss?', 'No. Fat loss focuses mainly on reducing body weight or body fat. Recomposition may include strength, muscle retention, muscle gain, waist changes, and performance signals.'],
    ['Who is a good fit for recomposition?', 'People who want to look, feel, and perform better, especially when extreme dieting would hurt training consistency or recovery.'],
    ['How long does recomposition take?', 'It is usually slower than a hard cut because the goal is better tissue, training, and habits, not only faster scale movement. No timeline should be guaranteed.'],
    ['What gets tracked besides weight?', 'Strength performance, measurements, photos when appropriate, nutrition adherence, recovery, sleep, steps, and how consistently the plan is followed.'],
    ['What is included in body recomposition coaching at Titan Forge?', 'Coaching includes an individualized strength program with progressive overload, evidence-based protein and calorie targets, multi-point progress tracking (waist measurements, gym performance, recovery), and weekly coach check-ins that adjust the plan based on verified trends.'],
    ['Can you build muscle in a calorie deficit?', 'Yes, particularly for beginners, lifters returning from a layoff, or individuals with higher body fat, provided the deficit is moderate (10–15%), protein intake is anchored around 1.6–2.2g/kg, and resistance training applies progressive mechanical tension.'],
    ['How does nutrition adjust during recomposition coaching?', 'Nutrition starts at maintenance or a conservative deficit based on initial assessment. Adjustments happen every 2 to 3 weeks based on trend data—adjusting calories, macros, or meal timing if recovery, strength, or waist trends stall.'],
  ],
  '/for/nutrition-coaching': [
    ['What is nutrition coaching at Titan Forge?', 'Nutrition coaching means building a repeatable food system around the person: protein, calories, meal structure, grocery defaults, eating out, and feedback.'],
    ['Is nutrition coaching just macros?', 'No. Macros are one tool. The deeper work is making the numbers workable in normal life without turning every meal into a willpower test.'],
    ['Can nutrition coaching help if I travel?', 'Yes. Travel and restaurant defaults should be part of the plan, because a nutrition strategy that only works at home is incomplete.'],
    ['Do I need a meal plan?', 'Some people like meal examples, but a fixed meal plan can fail when life changes. Coaching is stronger when it teaches decisions, not dependence.'],
    ['Does nutrition coaching replace medical nutrition advice?', 'No. Medical conditions, medications, eating-disorder history, allergies, and clinical needs should be handled with qualified healthcare professionals.'],
  ],
  '/for/men-over-40': [
    ['Is training over 40 different?', 'The principles are the same, but recovery, joint tolerance, stress, sleep, and warm-up quality often need more respect.'],
    ['Can men over 40 still build muscle?', 'Yes, but the plan needs progressive training, adequate protein, recovery, and consistency instead of random hard sessions that cannot be repeated.'],
    ['Should fat loss be slower after 40?', 'Often, a moderate approach is smarter because aggressive cuts can hurt performance, recovery, mood, and adherence. The right pace depends on the person.'],
    ['What matters most for long-term strength?', 'Good exercise selection, repeatable technique, progressive overload, recovery signals, and not confusing soreness with progress.'],
    ['When should someone over 40 talk to a doctor first?', 'Before starting if they have medical conditions, symptoms, injuries, medications, or concerns that require clinical clearance.'],
  ],
  '/vs/personal-trainer': [
    ['Is an online coach or a personal trainer better?', 'Neither is better in general; they solve different problems. A local trainer is the stronger choice when you want hands-on cueing and someone physically present for the session. Online coaching is stronger when the thing that keeps stopping you is programming, nutrition, or adapting the plan across a week you cannot fully control. Titan Forge runs both, so the honest answer depends on which of those is actually your situation.'],
    ['Which one costs less?', 'A local trainer is usually priced per session, so the cost scales with how often you meet. Online coaching is usually a monthly rate covering programming, check-ins, and messaging across the whole week rather than a fixed number of hours. Current Titan Forge plan differences are on the pricing page.'],
    ['Can you get good form feedback without a trainer in the room?', 'Yes, through video review, though it works differently. A trainer in the room can correct you mid-set. Video review catches what you did across a whole set and gives you cues to apply next session. For most lifts the trade is workable; for someone who has never touched a barbell, in-person is a better starting point.'],
    ['What if I want both?', 'That is a normal path and Titan Forge supports it near Parker and Englewood, Colorado: in-person sessions for the lifts you want eyes on, with online programming and check-ins covering the rest of the week.'],
    ['Who should NOT choose online coaching?', 'Anyone who needs a spotter at every set, anyone recovering from an acute injury or managing a condition that needs hands-on clinical oversight, and anyone unwilling to log sessions or submit honest check-ins. In those cases local in-person training or a clinician is the right call.'],
    ['Is online coaching as effective as a personal trainer?', 'For someone who can already train on their own, yes, because the limiting factor is usually programming, nutrition, and consistency across the week rather than supervision inside the hour. For someone learning the lifts for the first time, an in-person trainer is more effective at the thing that actually matters for them, which is safe technique under load.'],
    ['How many personal training sessions does a beginner need?', 'There is no fixed number and anyone quoting one without seeing you train is guessing. The practical marker is not a session count, it is whether you can set up and do the main lifts safely at a working weight without someone watching. Some people reach that in a handful of sessions, others take longer.'],
    ['Can I do online coaching and in-person training at the same time?', 'Yes, and near Parker and Englewood that is a path Titan Forge supports directly. In-person sessions cover the lifts you want eyes on while online programming and check-ins cover the rest of the week.'],
    ['Do I need a gym membership for online coaching?', 'You need access to equipment, not a specific gym. Programs are built around what you actually have, whether that is a commercial gym, a home setup, or a hotel fitness room while traveling.'],
    ['What does an online coach do that a workout app does not?', 'An app records what you entered. A coach interprets it. Deciding whether a stalled lift needs more volume, less volume, a different movement, more food, or more sleep is a judgment call about your context, and that judgment is the service.'],
    ['How do I know if my problem is the session or the week?', 'Look at the last three months. If you attended the sessions you planned and still did not progress, the problem is the plan, not attendance, and a trainer will not fix it. If you did not attend, the problem is attendance, and a booked appointment might.'],
    ['Is a personal trainer worth it if I already know how to lift?', 'Sometimes, for specific reasons: a spotter on heavy work, a technique reset on one lift, or a period where you need the appointment to keep showing up. It is a weaker purchase if what you actually need is a plan that adapts between sessions.'],
    ['What should I ask a personal trainer before hiring them?', 'Ask what is included beyond the hour, what happens when progress stalls, what data they look at, what falls outside their scope, and how they handle a week you cannot attend. Specific answers are a good sign; vague ones are the most common source of regret.'],
    ['Does Titan Forge recommend a trainer over online coaching sometimes?', 'Yes. If someone has never lifted, wants hands-on cueing, or needs a spotter at every set, in-person training is the honest recommendation, and Titan Forge offers it near Parker and Englewood rather than steering everyone to online coaching.'],
    ['Is coaching a substitute for medical care?', 'No. Titan Forge provides fitness and nutrition coaching and does not diagnose or treat. If you are managing an injury, a medical condition, or symptoms that concern you, get clinical clearance first.'],
  ],
  '/vs/workout-template': [
    ['When is a workout template enough?', 'A template can work if you already know how to self-correct technique, adjust volume, and stay consistent without feedback.'],
    ['When is coaching the better fit?', 'Coaching is the better fit when you need accountability, nutrition support, form review, or help making decisions when progress stalls.'],
    ['Why do templates fail for some people?', 'They fail when the problem is not exercise selection. Missed sessions, poor recovery, unclear nutrition, bad technique, or schedule chaos require decisions a PDF cannot make.'],
    ['Can templates and coaching work together?', 'Yes. A coach may use structured programming, but the difference is the review and adjustment loop around that structure.'],
    ['What should I try before hiring a coach?', 'Run a plan consistently, track follow-through, and identify the exact problem. If the same problem keeps coming back, coaching is likely more useful than another template.'],
  ],
  '/vs/fitness-apps': [
    ['What do fitness apps do well?', 'Apps can be useful for logging, reminders, and basic structure. They are weaker when the issue requires judgment or context.'],
    ['What does Titan Forge add beyond tracking?', 'Titan Forge adds human interpretation: what to push, what to change, when more is not better, and how to adapt when life, recovery, or adherence changes.'],
    ['Can I use an app while being coached?', 'Yes. Apps can support logging and communication, but they should not replace the coach’s judgment or the client’s context.'],
    ['Why does human feedback matter?', 'Human feedback matters when the data needs interpretation: hunger, stress, poor sleep, technique uncertainty, travel, injury history, or motivation patterns.'],
    ['When is an app enough?', 'An app may be enough if you only need reminders, tracking, and a basic plan, and you already know how to adjust when the signal changes.'],
  ],
  '/vs/group-classes': [
    ['When are group classes a good fit?', 'Group classes can be useful for energy, community, and a scheduled workout if the person does not need individualized programming or nutrition support.'],
    ['When is coaching better than group classes?', 'Coaching is better when the plan needs to reflect your goal, training history, technique, recovery, schedule, and what happens between sessions.'],
    ['Can group classes build consistency?', 'Yes, but consistency alone is not the whole plan. The question is whether the training dose, movement selection, nutrition, and recovery match your goal.'],
    ['Are group classes bad for beginners?', 'Not automatically. Beginners just need enough instruction and scaling so they are not forced into workouts that exceed their skill or recovery.'],
    ['How should I choose?', 'Choose group classes for community and fixed sessions. Choose coaching when individual decisions, accountability, and adjustment are the missing pieces.'],
  ],
  '/vs/meal-plans': [
    ['When is a meal plan useful?', 'A meal plan can be useful for examples, structure, and reducing decision fatigue for a short period. It becomes weak when life does not match the template.'],
    ['What does nutrition coaching add?', 'Nutrition coaching teaches decisions: how to hit protein, adjust calories, eat out, handle weekends, travel, and recover after misses.'],
    ['Why do meal plans fail?', 'They often fail because they assume perfect conditions, fixed preferences, and unlimited compliance instead of teaching a flexible system.'],
    ['Can Titan Forge use meal examples?', 'Yes. Meal examples can support coaching, but the goal is a repeatable decision system, not dependence on one fixed menu.'],
    ['Who should choose coaching over a meal plan?', 'Choose coaching if you keep restarting, struggle with weekends, travel often, need accountability, or do not understand what to adjust.'],
  ],
  '/vs/supplements': [
    ['Can supplements replace coaching?', 'No. Supplements can support a plan, but they cannot replace training, nutrition, sleep, hydration, recovery, and consistent follow-through.'],
    ['When should I buy supplements?', 'Buy only after you know the problem a product solves. Protein powder can help intake gaps; creatine can support performance; neither fixes a chaotic plan.'],
    ['Why does Titan Forge sell products if coaching comes first?', 'Support products can be useful once the foundation is in place. The site keeps the hierarchy clear so products do not become shortcut claims.'],
    ['Are supplements necessary for fat loss?', 'No. Fat loss is driven by energy balance, adherence, training, recovery, and time. Supplements are optional support, not the driver.'],
    ['What should I do before using a supplement?', 'Read labels and warnings, consider medications or medical conditions, and ask a qualified healthcare professional when there is any safety concern.'],
  ],
  '/free/forge-readiness-check': [
    ['Does the readiness check store personal data?', 'No. It is a no-PII self-check designed to help visitors choose whether to apply, use the path finder, or keep learning first.'],
    ['What should I do after the result?', 'If the result points to coaching, apply and explain your problem. If it points to education, start with the resource library and reassess.'],
    ['Is the readiness check a diagnosis?', 'No. It is a simple education tool, not medical, psychological, or clinical advice. It only helps route the next website step.'],
    ['Can I retake the check?', 'Yes. Retake it when your constraint changes, such as moving from education needs to accountability needs or from general training to local support.'],
    ['Why is there no personal data in the tool?', 'UAT keeps the tool lightweight and privacy-safe. It helps visitors self-select without creating a database of sensitive fitness context.'],
  ],
};

/* Guide FAQs come from the same globalThis.TITAN_GUIDES object that produced the
   crawler FAQ schema, so a human never sees fewer answers than an AI engine. */
for (const [route, guide] of Object.entries((typeof globalThis !== 'undefined' && globalThis.TITAN_GUIDES) || {})) {
  ROUTE_FAQS[route] = guide.faqs;
}


function FAQSection({ route, eyebrow = 'Quick Answers', title = 'Common questions.', intro }) {
  const faqs = ROUTE_FAQS[route] || [];
  if (!faqs.length) return null;
  return (
    <section className="section section--tight">
      <div className="wrap">
        {intro && <SectionHead eyebrow={eyebrow} title={title} intro={intro} />}
        <div className="articlefaq" style={intro ? { marginTop: 34 } : undefined}>
          {!intro && <><span className="idx">{eyebrow}</span><h2>{title}</h2></>}
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Photo block ---------- */
function Photo({ tag = 'Photography', src, srcSet, sizes, alt = '', pos, style, className = '', loading = 'lazy', fetchPriority, children }) {
  const mergedStyle = pos ? { ...style, '--photo-pos': pos } : style;
  return (
    <div className={`tf-photo ${className}`} style={mergedStyle}>
      {src && <img className="tf-photo__img" src={assetUrl(src)} srcSet={srcSet} sizes={sizes} alt={alt} loading={loading} fetchPriority={fetchPriority} decoding={fetchPriority === 'high' ? 'sync' : undefined} />}
      {children}
      {tag && <span className="tf-photo__tag">{tag}</span>}
    </div>
  );
}

/* ---------- NAV ---------- */
const NAVLINKS = [
  ['/coaching', 'Coaching'], ['/pricing', 'Plans & Pricing'], ['/results', 'Client Results'], ['/resources', 'Resources'], ['/about', 'About Us'], ['/shop', 'Shop'],
];
function analyticsKindForHref(href) {
  if (href === '/shop') return 'shop';
  if (href === '/resources' || href?.startsWith('/resources/')) return 'resource';
  if (href === '/start') return 'selector';
  if (href?.startsWith('/free/')) return 'free_tool';
  if (href === '/apply') return 'apply';
  return undefined;
}
function Nav({ route }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [route]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  return (
    <header className="nav">
      <div className="nav__in">
        <Brand/>
        <nav className="nav__links">
          {NAVLINKS.map(([h, l]) => (
            <a key={h} href={routeHref(h)} onClick={(e) => { e.preventDefault(); go(h); }} className={route === h || route.startsWith(h + '/') ? 'active' : ''} data-analytics-link-kind={analyticsKindForHref(h)} data-analytics-source="nav_primary">{l}</a>
          ))}
        </nav>
        <div className="nav__right">
          <Btn kind="ember" sm href="/apply" data-analytics-source="nav_primary" data-analytics-link-kind="apply">Apply for Coaching</Btn>
          <button className="nav__burger" type="button" aria-label="Menu" aria-expanded={open ? 'true' : 'false'} aria-controls="mobile-navigation" onClick={() => setOpen(o => !o)}><span></span></button>
        </div>
      </div>
      <div id="mobile-navigation" className={`drawer ${open ? 'open' : ''}`} role="navigation" aria-label="Mobile navigation">
        <a href="/" onClick={(e) => { e.preventDefault(); go('/'); }} className={route === '/' ? 'active' : ''}>Home</a>
        {NAVLINKS.map(([h, l]) => <a key={h} href={routeHref(h)} onClick={(e) => { e.preventDefault(); go(h); }} className={route === h ? 'active' : ''} data-analytics-link-kind={analyticsKindForHref(h)} data-analytics-source="mobile_drawer">{l}</a>)}
        <div className="drawer__cta">
          <Btn kind="ember" block href="/apply" arrow data-analytics-source="mobile_drawer" data-analytics-link-kind="apply">Apply for Coaching</Btn>
        </div>
      </div>
    </header>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <Brand/>
          <div className="foot__tag">Built Here. Forged Within.</div>
          <p>Personalized training and nutrition coaching for busy professionals. Online worldwide and in person in Englewood, Colorado.</p>
        </div>
        <div className="foot__col">
          <h4>Train</h4>
          <Link href="/coaching">Coaching</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/referral">Referral Program</Link>
          <Link href="/apply">Apply for Coaching</Link>
          <Link href="/coaching-intensive">Coaching Intensive (scholarship)</Link>
        </div>
        <div className="foot__col">
          <h4>Learn</h4>
          <Link href="/results">Results</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/free/forge-readiness-check">Free Readiness Check</Link>
          <Link href="/free/daily-habit">Daily Habit</Link>
          <Link href="/free/daily-planner">Daily Planner</Link>
          <Link href="/free/daily-log">Daily Forge Log</Link>
          <Link href="/free/daily-readiness">Daily Readiness</Link>
          <Link href="/shop" data-analytics-source="footer_learn" data-analytics-link-kind="shop">Shop</Link>
        </div>
        <div className="foot__col">
          <h4>Company</h4>
          <Link href="/about">About The Coaches</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/for/personal-training-englewood-centennial">Lone Tree &amp; DTC Training</Link>
          <Link href="/for/parker-personal-training">Parker Training</Link>
          <Link href="/vs/workout-template">Vs Templates</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund-policy">Refunds</Link>
          <Link href="/shipping-policy">Shipping</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noreferrer">Google Business Profile</a>
          <a href="https://www.instagram.com/titanforgefit/" target="_blank" rel="noreferrer">Titan Forge Instagram</a>
          <a href="https://www.instagram.com/doc.gymlifts/" target="_blank" rel="noreferrer">Steve Instagram</a>
        </div>
      </div>
      <div className="wrap foot__bottom">
        <span>© 2026 TITAN FORGE Fitness, Corp.</span>
        <span>Englewood, CO · 39.5408° N</span>
        <span>Strong is built. Consistency wins.</span>
      </div>
    </footer>
  );
}

/* ---------- Cards ---------- */
function PathCard({ idx, title, sub, href, cta = 'Explore', gbpUrl }) {
  return (
    <div className="card pathcard" data-analytics-source="path_preview">
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }} data-analytics-link-kind={analyticsKindForHref(href)}>
        <span className="idx">{idx}</span>
        <h3>{title}</h3>
        <p>{sub}</p>
      </Link>
      <div style={{ marginTop: 'auto', paddingTop: 12, display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <Link href={href} className="pathcard__cta" data-analytics-link-kind={analyticsKindForHref(href)}>{cta} <span className="arr">→</span></Link>
        {gbpUrl && (
          <a
            className="btn btn--ghost btn--sm"
            href={gbpUrl}
            target="_blank"
            rel="noreferrer"
            data-analytics-event="google_business_profile_click"
            data-analytics-source="path_preview_local_training"
            data-analytics-link-kind="google_business_profile"
          >
            Google reviews <span className="arr">→</span>
          </a>
        )}
      </div>
    </div>
  );
}

function ProgramCard({ tag, title, sub, points = [], href, featured }) {
  const target = href || '/contact';
  const cta = target.startsWith('/apply') || target.startsWith('/coaching-intensive') ? 'Apply For Coaching' : featured ? 'Request Intro Call' : 'Learn More';
  return (
    <div className={`card programcard ${featured ? 'programcard--feat' : ''}`}>
      {featured && <span className="programcard__flag">Most chosen</span>}
      <span className="tag">{tag}</span>
      <h3>{title}</h3>
      <p>{sub}</p>
      <ul className="ticklist">
        {points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <Btn kind={featured ? 'ember' : 'ghost'} block href={target} arrow>{cta}</Btn>
    </div>
  );
}

function ProofCard({ quote, name, meta, result }) {
  return (
    <figure className="card proofcard">
      {result && <div className="proofcard__result">{result}</div>}
      <blockquote>“{quote}”</blockquote>
      <figcaption>
        <span className="proofcard__avatar" aria-hidden="true">{name.split(' ').map(n => n[0]).join('')}</span>
        <span><b>{name}</b><em>{meta}</em></span>
      </figcaption>
    </figure>
  );
}

function StarRating({ rating = 0, label = 'Google rating' }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <span className="stars" aria-label={`${safeRating.toFixed(1)} out of 5 ${label}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={star <= Math.round(safeRating) ? 'stars__on' : 'stars__off'} aria-hidden="true">★</span>
      ))}
    </span>
  );
}

function GoogleBusinessReviews() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    fetch('/api/google-reviews', { headers: { accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (alive && payload && payload.ok) setData(payload);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const profileUrl = data?.profileUrl || GOOGLE_BUSINESS_PROFILE_URL;
  const reviews = Array.isArray(data?.reviews) ? data.reviews.slice(0, 5) : [];

  return (
    <section className="section section--raised googleproof" id="google-reviews">
      <div className="wrap">
        <div className="googleproof__head">
          <SectionHead eyebrow="Google Business Profile" title="Reviews from Google." intro="See Titan Forge Fitness on Google Maps, read current reviews, and leave feedback from the business profile." />
          {data?.rating && (
            <a className="googleproof__rating" href={profileUrl} target="_blank" rel="noreferrer" data-analytics-event="google_business_profile_click" data-analytics-source="google_reviews_rating" data-analytics-link-kind="google_business_profile">
              <span className="googleproof__score">{Number(data.rating).toFixed(1)}</span>
              <span>
                <StarRating rating={data.rating} label="Google rating" />
                <em>{data.userRatingCount ? `${data.userRatingCount} Google reviews` : 'View Google reviews'} →</em>
              </span>
            </a>
          )}
        </div>

        {reviews.length ? (
          <div className="grid grid--3 googleproof__grid">
            {reviews.map((review) => (
              <figure className="card googleproof__card" key={review.id}>
                <StarRating rating={review.rating} label="review rating" />
                <blockquote>“{review.text}”</blockquote>
                <figcaption>
                  {review.authorUrl ? <a href={review.authorUrl} target="_blank" rel="noreferrer">{review.author}</a> : <span>{review.author}</span>}
                  {review.time && <em>{review.time}</em>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="card googleproof__fallback">
            <div>
              <span className="idx">Google Business Profile</span>
              <h3>Titan Forge Fitness on Google.</h3>
            </div>
            <a className="btn btn--ember" href={profileUrl} target="_blank" rel="noreferrer" data-analytics-event="google_business_profile_click" data-analytics-source="google_reviews_fallback" data-analytics-link-kind="google_business_profile">Open Google Profile <span className="arr">→</span></a>
          </div>
        )}
      </div>
    </section>
  );
}

const RESOURCE_IMAGES = {
  Nutrition: 'assets/images/site-vitamins.jpg',
  Coaching: 'assets/images/site-unnamed-6.jpg',
  Supplements: 'assets/images/site-hero.jpg',
  Training: 'assets/images/site-tee.jpg',
  Apparel: 'assets/images/site-pump-cover.jpg',
  Mindset: 'assets/images/site-unnamed.jpg',
};

function ResourceCard({ kind, title, mins, href = '/resources' }) {
  return (
    <Link href={href} className="card rescard" data-analytics-event="resource_result_click" data-analytics-link-kind="resource">
      <Photo tag={kind} className="rescard__img" src={RESOURCE_IMAGES[kind] || 'assets/images/site-brandmark-portrait.png'} alt={`Titan Forge ${kind.toLowerCase()} resource`} pos="center" />
      <div className="rescard__body">
        <span className="idx">{kind} · {mins} min read</span>
        <h3>{title}</h3>
        <span className="rescard__more">Read <span className="arr">→</span></span>
      </div>
    </Link>
  );
}

/* ---------- Process step ---------- */
function Step({ n, title, body }) {
  return (
    <div className="step reveal">
      <div className="step__n">{n}</div>
      <div className="step__body">
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </div>
  );
}

/* ---------- Page shell helper ---------- */
function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <section className="section section--tight pagehead">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="pagehead__title tf-steel-text">{title}</h1>
        {intro && <p className="pagehead__intro">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

/* ---------- Titan Forge Chat Widget ---------- */
const TITAN_CHAT_STORAGE_KEY = 'titan_forge_chat_session_v1';
const CHAT_EXPERIMENT_ID = 'chat_quick_reply_v1';
const CONTROL_QUICK_REPLIES = ['Compare coaching options', 'Parker CO training', 'Apply for coaching'];
const ACTION_FIRST_QUICK_REPLIES = ['Apply for coaching', 'Compare coaching options', 'Parker CO training'];

function chatExperimentForSession(sessionId) {
  let hash = 0;
  for (let index = 0; index < sessionId.length; index += 1) hash = (hash * 31 + sessionId.charCodeAt(index)) >>> 0;
  const variant = hash % 2 === 0 ? 'control' : 'action_first';
  return { id: CHAT_EXPERIMENT_ID, variant, quickReplies: variant === 'control' ? CONTROL_QUICK_REPLIES : ACTION_FIRST_QUICK_REPLIES };
}

function titanChatStoredState() {
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(TITAN_CHAT_STORAGE_KEY) || '{}');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

// RULE: routes where the chat widget must never render.
// Gonzalo has asked repeatedly for the chat bubble to stay off the weekly task
// board -- it covers the content and the page is for reading, not converting.
// This list is enforced INSIDE TitanChatWidget rather than at its mount site, so
// a future <TitanChatWidget /> added anywhere else still cannot put the bubble
// back on these routes. Add a route here to block it; never special-case it in
// the app shell.
const CHAT_WIDGET_BLOCKED_ROUTES = [
  '/team/weekly-handoff',
];

function chatWidgetBlocked(pathname) {
  const path = String(pathname || '').replace(/\/+$/, '') || '/';
  return CHAT_WIDGET_BLOCKED_ROUTES.some((blocked) => path === blocked || path.startsWith(blocked + '/'));
}

// Gate wrapper. The bubble's own hooks live in TitanChatWidgetInner, so they are
// never called on a blocked route -- returning null before hooks in the inner
// component would change the hook count across a client-side route change.
// useRoute() is the app's own resolver, so this follows hash and popstate
// navigation exactly like the router does.
function TitanChatWidget() {
  const route = useRoute();
  if (chatWidgetBlocked(route)) return null;
  return <TitanChatWidgetInner />;
}

function TitanChatWidgetInner() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [feedbackByMessageId, setFeedbackByMessageId] = useState({});
  const messagesEndRef = useRef(null);
  const openedTrackedRef = useRef(false);
  const storedChatRef = useRef(titanChatStoredState());
  const sessionIdRef = useRef(
    storedChatRef.current.sessionId || 'web-tf-' + Math.random().toString(36).substring(2, 11),
  );
  const experimentRef = useRef(chatExperimentForSession(sessionIdRef.current));
  const [messages, setMessages] = useState(() => {
    const restored = storedChatRef.current.messages;
    if (Array.isArray(restored) && restored.length > 0) return restored.slice(-16);
    return [{
      id: 'msg-welcome',
      sender: 'bot',
      text: "Welcome! I’m the Titan Forge website coaching assistant. Kris coaches inside Titan Forge, and I can help you compare coaching, Parker personal training, and the best next step.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickReplies: experimentRef.current.quickReplies,
    }];
  });

  useEffect(() => {
    const openWithGoal = (event) => {
      const prefill = event.detail?.prefill;
      setIsOpen(true);
      if (prefill) setInputMsg(prefill);
    };
    window.addEventListener('titan-chat-open', openWithGoal);
    return () => window.removeEventListener('titan-chat-open', openWithGoal);
  }, []);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(TITAN_CHAT_STORAGE_KEY, JSON.stringify({
        sessionId: sessionIdRef.current,
        experiment: experimentRef.current,
        messages: messages.slice(-16),
      }));
    } catch {
      // Reload continuity is best-effort; storage restrictions never block chat.
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasNotification(false);
      if (!openedTrackedRef.current) {
        openedTrackedRef.current = true;
        window.titanTrackEvent?.('chat_widget_opened', { chat_surface: 'titanforge_website' });
        window.titanTrackEvent?.('chat_experiment_exposed', {
          chat_surface: 'titanforge_website',
          experiment_id: experimentRef.current.id,
          experiment_variant: experimentRef.current.variant,
        });
      }
    }
  }, [isOpen, messages]);

  const sendMessage = async (overrideText) => {
    const text = overrideText || inputMsg.trim();
    if (!text || isLoading) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    window.titanTrackEvent?.('chat_widget_message_sent', {
      chat_surface: 'titanforge_website',
      message_length: text.length,
      is_quick_reply: Boolean(overrideText),
      experiment_id: experimentRef.current.id,
      experiment_variant: experimentRef.current.variant,
    });
    if (!overrideText) setInputMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: [...messages, userMsg].slice(-16),
          conversationId: sessionIdRef.current,
        }),
      });
      const data = await res.json();

      if (data.ok) {
        if (data.experiment?.id === CHAT_EXPERIMENT_ID && typeof data.experiment.variant === 'string') {
          experimentRef.current = { ...data.experiment, quickReplies: data.quickReplies || experimentRef.current.quickReplies };
        }
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ctaUrl: data.ctaUrl,
          ctaText: data.ctaText,
          quickReplies: data.quickReplies,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: 'bot',
            text: "my bad, hit a connection snag. apply directly on the site and let's get your training locked in!",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            ctaUrl: '/apply',
            ctaText: 'Apply for 1:1 Coaching →',
          },
        ]);
      }
    } catch (err) {
      console.error('[TitanChatWidget] Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          sender: 'bot',
          text: "The connection was interrupted. You can still apply directly and the Titan Forge coaching team will follow up.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ctaUrl: '/apply',
          ctaText: 'Apply for coaching →',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const recordFeedback = (messageId, rating) => {
    if (feedbackByMessageId[messageId]) return;
    setFeedbackByMessageId((previous) => ({ ...previous, [messageId]: rating }));
    window.titanTrackEvent?.('chat_widget_feedback_submitted', {
      chat_surface: 'titanforge_website',
      feedback_rating: rating,
    });
  };

  return (
    <div className="fixed-chat-root" style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, pointerEvents: 'auto' }}>
      {!isOpen && (
        <button
          className="chat-pill"
          onClick={() => setIsOpen(true)}
          aria-label="Open Titan Forge coaching assistant"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#0e0f12',
            border: '1px solid rgba(230, 74, 25, 0.5)',
            color: '#f5f5f7',
            padding: '12px 18px',
            borderRadius: '9999px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'inherit',
          }}
        >
          {hasNotification && (
            <span style={{ position: 'absolute', top: '-2px', right: '-2px', display: 'flex', height: '12px', width: '12px' }}>
              <span style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: '#e64a19', opacity: 0.75 }} />
              <span style={{ position: 'relative', height: '12px', width: '12px', borderRadius: '9999px', backgroundColor: '#e64a19' }} />
            </span>
          )}
          <div style={{ width: '28px', height: '28px', borderRadius: '9999px', backgroundColor: '#181a20', border: '1px solid rgba(230, 74, 25, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '11px', color: '#e64a19' }}>
            TF
          </div>
          <span className="chat-pill__label" style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.02em', color: '#f5f5f7' }}>
            Ask Titan Forge
          </span>
          <svg className="chat-pill__icon" style={{ width: '16px', height: '16px', color: '#e64a19' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div data-titan-chat-drawer="true" style={{
          width: 'calc(100vw - 2.5rem)',
          maxWidth: '380px',
          height: '520px',
          maxHeight: '85vh',
          backgroundColor: '#0e0f12',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'inherit',
        }}>
          {/* Header */}
          <div style={{ backgroundColor: '#14161c', padding: '14px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '9999px', backgroundColor: '#0e0f12', border: '1px solid #e64a19', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px', color: '#e64a19' }}>
                  TF
                </div>
                <span style={{ position: 'absolute', bottom: '0', right: '0', width: '10px', height: '10px', backgroundColor: '#10b981', borderRadius: '9999px', border: '2px solid #14161c' }} />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#f5f5f7', letterSpacing: '0.01em' }}>Titan Forge Assistant</div>
                <div style={{ fontSize: '11px', color: '#90a4ae', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10b981', display: 'inline-block' }} />
                  Online • Kris & Titan Forge coaching
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
              style={{ background: 'none', border: 'none', color: '#90a4ae', cursor: 'pointer', padding: '6px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((m) => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: '14px',
                  fontSize: '13.5px',
                  lineHeight: '1.5',
                  backgroundColor: m.sender === 'user' ? '#e64a19' : '#14161c',
                  color: m.sender === 'user' ? '#ffffff' : '#e2e8f0',
                  border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  borderBottomRightRadius: m.sender === 'user' ? '2px' : '14px',
                  borderBottomLeftRadius: m.sender === 'bot' ? '2px' : '14px',
                }}>
                  <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{m.text}</p>
                  {m.ctaUrl && (
                    <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <a
                        href={m.ctaUrl}
                        onClick={() => {
                          window.titanTrackEvent?.('chat_widget_cta_clicked', {
                            chat_surface: 'titanforge_website',
                          cta_path: m.ctaUrl,
                            experiment_id: experimentRef.current.id,
                            experiment_variant: experimentRef.current.variant,
                          });
                          setIsOpen(false);
                        }}
                        style={{ color: '#e64a19', fontWeight: '600', fontSize: '12px', textDecoration: 'none' }}
                      >
                        {m.ctaText || 'Learn More →'}
                      </a>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', padding: '0 4px' }}>{m.timestamp}</span>

                {m.sender === 'bot' && m.id === [...messages].reverse().find((message) => message.sender === 'bot')?.id && m.quickReplies && m.quickReplies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px', maxWidth: '95%' }}>
                    {m.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          window.titanTrackEvent?.('chat_experiment_quick_reply_clicked', {
                            chat_surface: 'titanforge_website',
                            experiment_id: experimentRef.current.id,
                            experiment_variant: experimentRef.current.variant,
                            quick_reply_position: idx + 1,
                          });
                          sendMessage(qr);
                        }}
                        style={{
                          fontSize: '12px',
                          backgroundColor: '#14161c',
                          border: '1px solid rgba(230, 74, 25, 0.3)',
                          color: '#cbd5e1',
                          padding: '6px 12px',
                          borderRadius: '9999px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {qr}
                      </button>
                    ))}
                  </div>
                )}

                {m.sender === 'bot' && m.id === [...messages].reverse().find((message) => message.sender === 'bot')?.id && (
                  <div style={{ marginTop: '10px', padding: '8px 10px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', color: '#cbd5e1', fontSize: '11px', maxWidth: '95%' }}>
                    {feedbackByMessageId[m.id] ? (
                      <span role="status">Thanks — your feedback helps improve this assistant.</span>
                    ) : (
                      <>
                        <span style={{ marginRight: '8px' }}>Was this helpful?</span>
                        <button
                          type="button"
                          onClick={() => recordFeedback(m.id, 'helpful')}
                          aria-label="This chat response was helpful"
                          aria-pressed="false"
                          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.16)', color: '#e2e8f0', borderRadius: '9999px', cursor: 'pointer', fontSize: '11px', marginRight: '5px', padding: '3px 8px' }}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => recordFeedback(m.id, 'not_helpful')}
                          aria-label="This chat response was not helpful"
                          aria-pressed="false"
                          style={{ background: 'none', border: '1px solid rgba(255,255,255,0.16)', color: '#e2e8f0', borderRadius: '9999px', cursor: 'pointer', fontSize: '11px', padding: '3px 8px' }}
                        >
                          No
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#90a4ae', padding: '4px 0' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#e64a19' }} />
                <span>Assistant is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            style={{ padding: '12px', backgroundColor: '#14161c', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Ask about 1:1 coaching, Parker training..."
              maxLength={2000}
              style={{
                flex: 1,
                backgroundColor: '#0e0f12',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                fontSize: '13px',
                borderRadius: '10px',
                padding: '8px 12px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              disabled={!inputMsg.trim() || isLoading}
              aria-label="Send message"
              style={{
                backgroundColor: '#e64a19',
                opacity: (!inputMsg.trim() || isLoading) ? 0.5 : 1,
                color: '#ffffff',
                border: 'none',
                padding: '8px 12px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

const COACH_LANES = [
  {
    tag: 'Founder & Head Coach',
    name: 'Steve "Doc" Ginevan, PhD',
    img: '/assets/images/site-founder.jpg',
    pos: '50% 12%',
    sub: 'Methodical, data-driven, science-backed coaching for clients who want structure, measurement, and an evidence-first approach to training and nutrition.',
    points: ['Evidence-driven & data-first', 'Structured, measured progression', 'Founder & Head Coach', 'Scientific approach'],
    href: '/apply',
    external: false,
    cta: 'Apply for coaching',
  },
  {
    tag: 'VP & Executive Coach',
    name: 'Kris',
    img: '/assets/images/kris-hero.jpg',
    pos: '50% 12%',
    sub: 'High-touch, personal-assistant-style coaching for busy executives and professionals who want responsive, hands-on guidance around a packed schedule.',
    points: ['High-touch communication', 'Built for busy professionals', 'Fast, responsive guidance', 'Structured accountability'],
    href: '/apply',
    external: false,
    cta: 'Apply for coaching',
  },
];

function KettlebellHandle({ isHighlighted = false }) {
  return (
    <div className="kettlebell-handle" aria-hidden="true">
      <svg viewBox="0 0 190 74" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={isHighlighted ? "kb-handle-grad-hl" : "kb-handle-grad"} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14171b" />
            <stop offset="25%" stopColor="#262b31" />
            <stop offset="50%" stopColor={isHighlighted ? "#3d3630" : "#343a41"} />
            <stop offset="75%" stopColor="#262b31" />
            <stop offset="100%" stopColor="#14171b" />
          </linearGradient>
          <linearGradient id="kb-top-light" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.30)" />
          </linearGradient>
        </defs>
        {/* Outer kettlebell handle arch */}
        <path
          d="M 32 74 C 32 30, 48 10, 95 10 C 142 10, 158 30, 158 74"
          fill="none"
          stroke={`url(#${isHighlighted ? "kb-handle-grad-hl" : "kb-handle-grad"})`}
          strokeWidth="20"
          strokeLinecap="round"
        />
        {/* Faint top light on the cast iron, no glossy stripe */}
        <path
          d="M 52 74 C 52 42, 62 20, 95 20 C 128 20, 138 42, 138 74"
          fill="none"
          stroke="url(#kb-top-light)"
          strokeWidth="2"
        />
        {/* Handle horns base plates */}
        <rect x="20" y="60" width="24" height="14" rx="3" fill="#14171c" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
        <rect x="146" y="60" width="24" height="14" rx="3" fill="#14171c" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      </svg>
    </div>
  );
}

function BarbellKnurlDefs() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="barbell-steel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0be4a" />
          <stop offset="35%" stopColor="#d9a521" />
          <stop offset="70%" stopColor="#b4830f" />
          <stop offset="100%" stopColor="#8a6305" />
        </linearGradient>
        <radialGradient id="barbell-inner-bevel" cx="50%" cy="32%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function BarbellKnurledStars({ count = 5 }) {
  const starPath = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
  return (
    <div className="barbell-stars">
      {Array.from({ length: 5 }, (_, i) => {
        const isFilled = i < count;
        return (
          <svg
            key={i}
            className="barbell-star"
            viewBox="0 0 24 24"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isFilled ? (
              <>
                <path d={starPath} fill="url(#barbell-steel-grad)" stroke="#6d4c07" strokeWidth="0.8" strokeLinejoin="round" />
                <path d={starPath} fill="url(#barbell-inner-bevel)" />
              </>
            ) : (
              <path d={starPath} fill="#23272e" stroke="#404752" strokeWidth="0.8" strokeLinejoin="round" />
            )}
          </svg>
        );
      })}
    </div>
  );
}

/* expose */
window.TITAN_ROUTE_FAQS = ROUTE_FAQS;
Object.assign(window, {
  useRoute, go, Link, ROUTES, ForgeMark, Brand, useReveal, Btn, Eyebrow, SectionHead,
  FAQSection, ROUTE_FAQS, Photo, Nav, Footer, PathCard, ProgramCard, ProofCard, ResourceCard, Step, PageHeader, NAVLINKS,
  GoogleBusinessReviews, GOOGLE_BUSINESS_PROFILE_URL, TitanChatWidget, COACH_LANES,
  KettlebellHandle, BarbellKnurlDefs, BarbellKnurledStars,
});
