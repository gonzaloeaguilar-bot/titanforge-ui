/* ============================================================
   TITAN FORGE — Coaching · Programs · Method
   ============================================================ */

/* ---------------------- COACHING ---------------------- */
const COACH_INCLUDED = [
  ['Assessment before programming', 'Goals, history, schedule, injuries, stress, sleep, and obstacles matter'],
  ['Custom training programming', 'Built for your goals, equipment, recovery, and actual week'],
  ['Nutrition & macro guidance', 'Sustainable, not a crash diet or punishment plan'],
  ['Check-ins with purpose', 'Progress, feedback, adherence, and obstacles reviewed honestly'],
  ['Technique & form review', 'Video feedback or hands-on coaching where appropriate'],
  ['Accountability without theatrics', 'Awareness, ownership, and consistency instead of yelling'],
];

const COACH_MODES = [
  { tag: 'Remote · Worldwide', title: 'Online Coaching', sub: 'Structured programming, nutrition direction, communication, and check-ins delivered remotely. The plan changes from your feedback.', points: ['Training & tracking structure', 'Check-ins reviewed against what actually happened', 'Video form feedback when needed', 'Nutrition targets & habits'], featured: true },
  { tag: 'Englewood, CO', title: 'In-Person Training', sub: 'Hands-on coaching near Englewood for technique, effort, and accountability, with structure that follows you outside the session.', points: ['1:1 coaching sessions', 'Real-time technique cues', 'Programming for off-days', 'Local accountability'] },
  { tag: 'Food First', title: 'Nutrition Coaching', sub: 'A sustainable approach to food built around your life: macros when useful, habits when better, and consistency either way.', points: ['Personalized targets', 'Habit-based coaching', 'Flexible structure', 'Check-ins & adjustments'] },
];

/* Depth sections for /coaching. These mirror the crawler-facing route data in
   app/lib/staticRouteContent.mjs so a human sees what an AI engine quotes.
   Before this, humans saw 518 words and crawlers 2,942 — a 5.7x gap, the widest
   on the site. Every claim here is the same corrected text as the route data:
   Steve leads Titan Forge, Kris coaches only on the joint 30-day intensive, and
   nothing promises an outcome. */
const COACH_PILLARS = [
  ['Individualized training & progressive overload', 'Programming matched to your lifting experience, joint mobility, equipment, and the days you can genuinely train. Compound patterns first: squats, hip hinges, presses, rows, and loaded carries.'],
  ['Nutrition baselines, not food rules', 'A daily protein baseline and calorie guideline set from your body composition and schedule. Sustainable defaults that survive client dinners, travel, and weekends.'],
  ['Multi-signal feedback', 'Scale weight alone is noise. Performance logs, lifting video, circumference measures, sleep, activity, and recovery all feed the read.'],
  ['Contingencies built in advance', 'A shortened session for a hotel gym, a bodyweight fallback when there is no equipment, and eating-out defaults. The aim is to keep the week intact, not to replicate a perfect one.'],
];

const COACH_FIRST_30 = [
  ['01', 'Week 1 · Intake, equipment audit, baseline', 'Assessment of training history, injury background, schedule constraints, and current eating habits. Your coach audits what equipment you actually have, builds the initial split, and sets starting protein and calorie guidelines.'],
  ['02', 'Week 2 · Movement video review, load calibration', 'You submit short clips of the main lifts. Your coach reviews setup, bar path, joint position, tempo, and control, then refines working weights so intensity is appropriate and repeatable.'],
  ['03', 'Week 3 · Nutrition consistency and weekend systems', 'Lifting cadence is established, so the focus moves to adherence and obstacles. If weekends, work dinners, or travel broke the week, the exact point of obstacles gets diagnosed and defaulted around.'],
  ['04', 'Week 4 · Trend review and month two', 'A multi-point review of the month: lifting logs, circumference trends, body-weight moving average, and adherence. Progressions come from the four-week data set, not from how one day felt.'],
];

const COACH_CHECKIN = [
  ['Training', 'Workout logs, loads, reps, and perceived exertion.', 'Working loads, set volume, or exercise progressions.'],
  ['Technique', 'Video of the key compound lifts from a clear angle.', 'Specific cues, setup changes, or substitutions for joint comfort.'],
  ['Nutrition', 'Protein intake, calorie adherence, hunger and energy notes.', 'Daily targets, meal structure defaults, or pre-workout fuel.'],
  ['Recovery', 'Sleep, fatigue, soreness, and upcoming calendar conflicts.', 'Deloads, reduced accessory volume, or travel contingencies.'],
];

const COACH_COMPARE = [
  ['Programming', 'Template selected from survey inputs, or written session by session.', 'Built around your schedule, equipment, and recovery, and revised from your data.'],
  ['Form feedback', 'Demonstration videos rather than feedback on your own lifts.', 'Review of your actual lifts with specific corrective cues.'],
  ['Nutrition', 'Calculators, or outside the scope of the session entirely.', 'Protein and calorie targets with weekly adherence review.'],
  ['Between sessions', 'Push notifications and streaks, or no contact at all.', 'Weekly review, direct messaging, and habit tracking.'],
];

const COACH_FIT = [
  ['Busy professionals and executives', 'Demanding careers, business travel, and family commitments that need time-efficient sessions and flexible nutrition defaults.'],
  ['Lifters over 40', 'Building strength and lean mass while managing joint recovery, sleep, and stress.'],
  ['Adults pursuing body recomposition', 'Reducing body fat while preserving or gaining muscle, through progressive resistance training and structured protein intake.'],
  ['Beginners establishing gym confidence', 'New or returning lifters who want movement progressions, safe mechanics, and clear nutritional priorities.'],
];

const COACH_NOT_FIT = [
  ['Quick-fix seekers', 'Anyone looking for a 14-day detox, a fat-burner shortcut, or an extreme restriction plan.'],
  ['Unwilling to track or communicate', 'Coaching is collaborative. If logging sessions, tracking basic nutrition, and honest check-ins are not going to happen, it cannot work.'],
  ['Needing a spotter at every set', 'Online coaching means training independently. If you want someone beside you each set, local in-person training is the better starting point.'],
  ['Active medical rehabilitation', 'Recovering from acute orthopedic injury or managing clinical conditions that need hands-on physical therapy or medical oversight.'],
];

function CoachingPage() {
  useReveal();
  return (
    <>
      <PageHeader eyebrow="Coaching" title={editableCopy('coaching.headline', 'Titan Forge Fitness Coaching')}
        intro={editableCopyNode('coaching.description', 'Titan Forge Fitness coaching provides online coaching, Parker-area personal training, and nutrition support built around assessment, communication, and feedback.', <><a href="/">Titan Forge Fitness</a> coaching provides online coaching, Parker-area personal training, and nutrition support built around assessment, communication, and feedback.</>)} />
      <section className="section">
        <div className="wrap">
          <div className="grid grid--3">
            {COACH_MODES.map((m, i) => <ProgramCard key={i} {...m} href="/apply" />)}
          </div>
        </div>
      </section>

      <section className="section section--inset">
        <div className="wrap split">
          <Photo className="split__media" src="assets/images/site-unnamed-6.jpg" alt="Titan Forge team at a live event" tag="Live site crew" pos="center 20%" />
          <div>
            <Eyebrow>What’s Included</Eyebrow>
            <h3>The coaching system, not just the workouts.</h3>
            <p>Coaching means assessing, teaching, adjusting, and keeping accountability clear. It is not a pile of exercises with a check-in label.</p>
            <ul className="included" style={{ marginTop: 28 }}>
              {COACH_INCLUDED.map(([t, s], i) => <li key={i}>{t}<span>{s}</span></li>)}
            </ul>
            <p style={{ marginTop: 20 }}>Explore specialized coaching paths: <a href="/for/body-recomposition">Body Recomposition</a> · <a href="/for/online-coaching">Online Coaching</a> · <a href="/for/parker-personal-training">Parker Personal Training</a> · <a href="/for/nutrition-coaching">Nutrition Coaching</a></p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="notice">
            <span className="notice__mark">◆</span>
            <div>
              <h3>Foundation before supplements</h3>
              <p><a href="/shop">Supplements</a> can fill gaps or support performance. They do not replace training, nutrition, sleep, hydration, <a href="/resources/training-volume-and-recovery">recovery</a>, or consistency. Foundation first, every time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The Method" title="Four pillars, coordinated."
            intro="Sustainable recomposition, strength, and long-term health need these working together, not one of them working hard." />
          <ul className="included" style={{ marginTop: 32 }}>
            {COACH_PILLARS.map(([t, b], i) => <li key={i}>{t}<span>{b}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section section--inset">
        <div className="wrap">
          <SectionHead eyebrow="First 30 Days" title="What actually happens in month one."
            intro="The first month sets your baseline and removes guesswork. Here is the week-by-week." />
          <div style={{ maxWidth: 880, margin: '40px auto 0' }}>
            {COACH_FIRST_30.map(([n, t, b]) => <Step key={n} n={n} title={t} body={b} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Check-Ins" title="How the plan changes."
            intro="Accountability is a review process, not a guilt trip. Each week you submit, your coach reads, and something specific changes." />
          <div className="comparetable" style={{ marginTop: 32 }}>
            <div className="comparetable__head"><span>Area</span><span>What you submit</span><span>What gets adjusted</span></div>
            {COACH_CHECKIN.map(([a, b, c]) => <div className="comparetable__row" key={a}><b>{a}</b><span>{b}</span><span>{c}</span></div>)}
          </div>
          <p style={{ marginTop: 24, maxWidth: '62ch' }}><strong>The two-to-three week rule.</strong> No knee-jerk changes from one hard session, one unplanned meal, or one jump on the scale. Sodium, sleep, and hard training can move body weight several pounds temporarily. Calorie and volume changes come from two to three weeks of verified trend data.</p>
        </div>
      </section>

      <section className="section section--inset">
        <div className="wrap">
          <SectionHead eyebrow="Compare" title="Coaching, an app, or a local trainer."
            intro="Each of these works for someone. An app is enough when the gap is structure. A local trainer is right when you want hands-on cueing in the room. Coaching is the stronger fit when the problem that keeps coming back is judgment, nutrition, or adapting the plan." />
          <div className="comparetable" style={{ marginTop: 32 }}>
            <div className="comparetable__head"><span>Decision</span><span>App or trainer alone</span><span>Titan Forge 1:1 coaching</span></div>
            {COACH_COMPARE.map(([a, b, c]) => <div className="comparetable__row" key={a}><b>{a}</b><span>{b}</span><span>{c}</span></div>)}
          </div>
          <p style={{ marginTop: 24 }}>Near Englewood and the DTC and want hands-on sessions? See <a href="/for/personal-training-englewood-centennial">personal training in Englewood and Centennial</a> or <a href="/for/parker-personal-training">Parker personal training</a>.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <Eyebrow>Who It Fits</Eyebrow>
            <h3>Coaching is built for specific situations.</h3>
            <ul className="included" style={{ marginTop: 28 }}>
              {COACH_FIT.map(([t, b], i) => <li key={i}>{t}<span>{b}</span></li>)}
            </ul>
          </div>
          <div>
            <Eyebrow>Who It Does Not</Eyebrow>
            <h3>Being clear here saves you time and money.</h3>
            <ul className="included" style={{ marginTop: 28 }}>
              {COACH_NOT_FIT.map(([t, b], i) => <li key={i}>{t}<span>{b}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="notice">
            <span className="notice__mark">◆</span>
            <div>
              <h3>Scope of practice</h3>
              <p>Titan Forge provides evidence-aware strength coaching, exercise programming, and general nutritional guidance for healthy adults. It is educational and performance-oriented. It is not medical care, physical therapy, or medical nutrition therapy, and it does not diagnose or treat conditions. If you manage a chronic condition, take prescription medication, are recovering from surgery, or have persistent joint pain, speak to a physician or physical therapist first.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection route="/coaching" />

      <section className="section section--raised">
        <div className="wrap">
          <SectionHead center eyebrow="The Method" title="Here’s how it works."
            intro="Four steps from first conversation to a plan you can follow. No mystery, no pressure." />
          <div style={{ maxWidth: 880, margin: '40px auto 0' }}>
            {[['01','Apply & Talk','We learn your goals, starting point, background, schedule, and biggest obstacles.'],
              ['02','Assess Fit',<>We decide whether <a href="/">Titan Forge</a> is the right level of support for where you are now.</>],
              ['03','Build The Plan','Training, nutrition, and accountability are matched to your actual life.'],
              ['04','Adjust From Feedback','Check-ins show what is working, what is not, and what changes next.']].map(([n,t,b]) => <Step key={n} n={n} title={t} body={b} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Btn kind="ember" href="/apply" arrow data-analytics-link-kind="apply">{editableCopy('coaching.primaryCta', 'Apply For Coaching')}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------- PROGRAMS ---------------------- */
const PROGRAMS = [
  { tag: 'Pathway preview · Beginner', title: 'Forge Foundations', sub: 'The starting block. Build technique, consistency, and a base you can stand on.', points: ['Training rhythm', 'Technique-first progressions', 'Foundation habits', 'Coach-guided review'] },
  { tag: 'Pathway preview · Muscle', title: 'Hypertrophy Build', sub: 'Add size with intention. Structured volume and progressive overload that actually progresses.', points: ['Volume structure', 'Tracked overload', 'Recovery decisions', 'Coach-guided review'], featured: true },
  { tag: 'Pathway preview · Strength', title: 'Strength Forge', sub: 'Build strength on the lifts that matter without turning every week into a random max-out.', points: ['Main lift focus', 'Technique standards', 'Load progression', 'Coach-guided review'] },
  { tag: 'Pathway preview · Fat Loss', title: 'Lean Protocol', sub: 'Sustainable fat loss that protects training quality and sanity. No crash, no punishment plan.', points: ['Flexible training split', 'Food structure', 'Movement & recovery', 'Coach-guided review'] },
  { tag: 'Hybrid · 12 Weeks', title: 'Hybrid Athlete', sub: 'Strength and conditioning together — for life outside the gym, not just inside it.', points: ['Lift + condition', 'Engine & work capacity', 'Joint-friendly volume', 'Performance focus'] },
  { tag: 'Custom', title: 'Fully Custom', sub: 'Nothing fits exactly? Built from scratch around your goals, equipment, and timeline.', points: ['Coach-built', 'Your equipment', 'Your schedule', 'Add coaching anytime'] },
];

function ProgramsPage() {
  useReveal();
  return (
    <>
      <PageHeader eyebrow="Programs" title={editableCopy('programs.headline', 'Structured. Proven. Yours to run.')}
        intro={editableCopy('programs.description', 'Program paths are shown as coaching pathway previews.')} />
      <section className="section">
        <div className="wrap">
          <div className="grid grid--3">
            {PROGRAMS.map((p, i) => <ProgramCard key={i} {...p} href="/apply" />)}
          </div>
        </div>
      </section>
      <section className="section section--inset">
        <div className="wrap">
          <div className="split split--rev">
            <Photo className="split__media" src="assets/images/site-pump-cover.jpg" alt="Titan Forge branded apparel lifestyle image" tag="Live site apparel" pos="center 20%" />
            <div>
              <Eyebrow>Self-Guided, Not Self-Abandoned</Eyebrow>
              <h3>A program is a map. Coaching is the guide.</h3>
              <p>A program can give structure. <a href="/coaching">Coaching</a> adds judgment: when to push, when to hold, when to change nutrition, and when the problem is not the workout at all.</p>
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Btn kind="ember" href="/apply" arrow data-analytics-link-kind="apply">{editableCopy('programs.primaryCta', 'Add Coaching')}</Btn>
                <Btn kind="ghost" href="/method">{editableCopy('programs.secondaryCta', 'See the method')}</Btn>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection route="/programs" />
    </>
  );
}

/* ---------------------- METHOD ---------------------- */
const PRINCIPLES = [
  ['Intention over intensity', 'Every session has a purpose. We train toward a goal, not just to be tired.'],
  ['Better is better', 'More is not always better. Hard work still has to be technical, recovered, and pointed at the goal.'],
  ['The person, then the plan', 'Your history, schedule, lifestyle, and obstacles shape the program. Never the reverse.'],
  ['Show up, adjust, repeat', 'One bad meal is not a bad week. One missed workout is not a lost month. We keep coming back to the standard.'],
];

const FOUNDATION = [
  ['Consistency', 'The base everything stands on'],
  ['Training & Nutrition', 'The work and the fuel'],
  ['Sleep & Recovery', 'Where progress is actually made'],
  ['Hydration & Habits', 'The daily basics, handled'],
  ['Supplements', 'Support tools — last, not first'],
];

function MethodPage() {
  useReveal();
  return (
    <>
      <PageHeader eyebrow="The Method" title={editableCopy('method.headline', 'Train with intention.')}
        intro={editableCopyNode('method.description', 'A clear, repeatable system for turning effort into progress: assess honestly, build the foundation, follow, review, and adjust.', <>A <a href="/coaching">clear, repeatable system</a> for turning effort into progress: assess honestly, build the foundation, follow, review, and adjust.</>)} />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Principles" title="What we believe." />
          <div className="grid grid--2" style={{ marginTop: 44 }}>
            {PRINCIPLES.map(([t, b], i) => (
              <div className="feat reveal" key={i} style={{ borderTop: '1px solid var(--line)' }}>
                <div className="feat__n">{String(i+1).padStart(2,'0')}</div>
                <h3>{t}</h3><p>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--inset">
        <div className="wrap split">
          <div>
            <Eyebrow>Foundation Before Supplements</Eyebrow>
            <h3>Build from the base up.</h3>
            <p>Most people chase the shiny tool before the foundation is built. We start at the bottom, then add <a href="/collections/supplements">support tools</a> only when the basics are actually holding.</p>
          </div>
          <div className="pyramid">
            {FOUNDATION.map(([t, s], i) => (
              <div className={`tier ${i === FOUNDATION.length - 1 ? 'tier--cap' : ''}`} key={t}>
                <b>{t}</b><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The Process" title="From first call to lasting change."
            intro="Four steps. The same for everyone, tailored to each person." />
          <div style={{ marginTop: 44 }}>
            {[['01','Understand The Person','Goals, schedule, training background, injury history, nutrition habits, sleep, stress, and obstacles all matter.'],
              ['02','Set The Standard','We define the work you can actually repeat and the level of communication needed to coach it well.'],
              ['03','Do The Work','Training, nutrition, movement, and recovery are handled with enough structure to stop guessing.'],
              ['04','Adjust From Feedback','Every check-in looks at progress, follow-through, recovery, and what needs to change next.']].map(([n,t,b]) => <Step key={n} n={n} title={t} body={b} />)}
          </div>
        </div>
      </section>

      <FAQSection route="/method" />

      <section className="section ctaband tf-grain">
        <div className="wrap ctaband__in">
          <Eyebrow center>The Method In Practice</Eyebrow>
          <h2>See it work for you.</h2>
          <p>The method only matters when it is applied. Apply when you are ready to take the next step seriously.</p>
          <div className="ctaband__cta"><Btn kind="ember" href="/apply" arrow data-analytics-link-kind="apply">{editableCopy('method.primaryCta', 'Apply For Coaching')}</Btn>
            <Btn kind="ghost" href="/start">{editableCopy('method.secondaryCta', 'Find Your Path')}</Btn></div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { CoachingPage, ProgramsPage, MethodPage });
