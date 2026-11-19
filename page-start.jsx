/* ============================================================
   TITAN FORGE — START / PATH FINDER (interactive)
   ============================================================ */

const FINDER_QUESTIONS = [
  {
    key: 'goal',
    q: 'What are you really after?',
    sub: 'Pick the one that matters most right now. You can do more later; coaching starts where the real constraint is.',
    options: [
      ['fatloss', 'Lose Fat', 'Sustainable fat loss, no crash plans'],
      ['muscle', 'Build Muscle', 'Add size and strength with intention'],
      ['structure', 'Get Structured', 'Stop winging it — train with a real plan'],
      ['nutrition', 'Fix Nutrition', 'Eat in a way that actually fits your life'],
    ],
  },
  {
    key: 'place',
    q: 'Where do you want to train?',
    sub: 'We coach in person near Englewood, CO and online anywhere in the world.',
    options: [
      ['inperson', 'In Person', 'Hands-on, near Englewood, CO'],
      ['online', 'Online', 'Anywhere — fully remote coaching'],
      ['either', 'Either Works', 'Show me what fits best'],
    ],
  },
  {
    key: 'support',
    q: 'How much support do you want?',
    sub: 'Be honest about where you are. The right level of accountability is the one you will actually communicate with and use.',
    options: [
      ['full', 'Full Coaching', 'Programming, nutrition & weekly check-ins'],
      ['nutrition', 'Just Nutrition', 'Macros, habits and food guidance'],
      ['selfguided', 'Self-Guided', 'Give me a solid program to run myself'],
      ['learn', 'Just Learning', 'Not ready to commit — I want to read first'],
    ],
  },
];

const PATH_RESULTS = {
  online:    { tag: 'Recommended Path', t: 'Online Coaching', href: '/coaching', media: 'Online coaching', mediaSrc: 'assets/images/site-unnamed-6.jpg',
    d: 'Structured programming, nutrition direction, and check-ins built around your schedule and reviewed against your real feedback, anywhere in the world.',
    next: 'Apply with your goal, schedule, and the biggest problem so Steve can review whether remote coaching is the right first move.' },
  inperson:  { tag: 'Recommended Path', t: 'In-Person Training', href: '/coaching', media: 'In-person · Englewood, CO', mediaSrc: 'assets/images/site-tee.jpg',
    d: '1:1 sessions near Englewood, CO. Hands-on coaching on technique, intensity, and accountability — with a plan that follows you outside the gym.',
    next: 'Apply with your location, training availability, and what you want coaching to solve before an intro conversation.' },
  nutrition: { tag: 'Recommended Path', t: 'Nutrition Coaching', href: '/coaching', media: 'Nutrition coaching', mediaSrc: 'assets/images/site-vitamins.jpg',
    d: 'Macros, habits, and a sustainable approach to food built around your life — not a meal plan you’ll abandon in a week.',
    next: 'Apply with your current nutrition problem, training context, and what has failed before so the first follow-up can start with context.' },
  programs:  { tag: 'Recommended Path', t: 'Self-Guided Programs', href: '/programs', media: 'Programs library', mediaSrc: 'assets/images/site-pump-cover.jpg',
    d: 'Structured, evidence-based programs you run yourself — with the option to add coaching the moment you want more accountability.',
    next: 'Review the program path first. If you need feedback, accountability, or adjustments, apply and explain where a static plan breaks down.' },
  learn:     { tag: 'Start Here', t: 'Learn First', href: '/resources', media: 'Resources & guides', mediaSrc: 'assets/images/site-hero.jpg',
    d: 'No pressure to commit. Build your foundation with direct, no-nonsense guides, then come back when you are ready to take the work seriously.',
    next: 'Start with the resource library. If the same problem keeps coming back, use the readiness check or apply with that pattern.' },
};

function recommend(a) {
  if (a.support === 'learn') return 'learn';
  if (a.support === 'selfguided') return 'programs';
  if (a.support === 'nutrition' || a.goal === 'nutrition') return 'nutrition';
  if (a.place === 'inperson') return 'inperson';
  return 'online';
}

function whyReasons(a, key) {
  const r = [];
  const goalLabel = { fatloss: 'fat loss', muscle: 'building muscle', structure: 'training with structure', nutrition: 'dialing in nutrition' }[a.goal];
  if (goalLabel) r.push(`Matched to your goal: ${goalLabel}.`);
  if (key === 'inperson') r.push('You want hands-on coaching near Englewood, CO.');
  if (key === 'online') r.push('Remote-friendly — coached anywhere, on your schedule.');
  if (key === 'nutrition') r.push('Nutrition is your priority right now.');
  if (key === 'programs') r.push('You’d rather run a proven program yourself — for now.');
  if (key === 'learn') r.push('No commitment needed — foundation first.');
  r.push('Every coaching path starts by checking fit, goals, starting point, and support level.');
  return r;
}

function PathFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const total = FINDER_QUESTIONS.length;
  const done = step >= total;
  const recommendedKey = done ? recommend(answers) : null;

  useEffect(() => {
    if (!recommendedKey) return;
    window.titanTrackEvent && window.titanTrackEvent('pathfinder_complete', {
      recommended_path: recommendedKey,
      goal: answers.goal || '',
      place: answers.place || '',
      support: answers.support || '',
    });
  }, [recommendedKey]);

  const choose = (key, val) => {
    window.titanTrackEvent && window.titanTrackEvent('pathfinder_answer', {
      question_key: key,
      answer_value: val,
      step_number: step + 1,
    });
    setAnswers(a => ({ ...a, [key]: val }));
    setTimeout(() => setStep(s => s + 1), 220);
  };
  const reset = () => { setAnswers({}); setStep(0); };

  if (done) {
    const key = recommendedKey;
    const res = PATH_RESULTS[key];
    return (
      <div className="finder">
        <div className="finder__progress">
          <span className="finder__count">Your Path</span>
          <div className="finder__bar"><i style={{ width: '100%' }}></i></div>
          <span className="finder__count">Complete</span>
        </div>
        <div className="result">
          <div className="result__card">
            <div className="result__body">
              <span className="result__tag">{res.tag}</span>
              <h2 className="result__t">{res.t}</h2>
              <p className="result__d">{res.d}</p>
              <div className="result__why">
                <h4>Why this fits</h4>
                <ul>{whyReasons(answers, key).map((w, i) => <li key={i}>{w}</li>)}</ul>
              </div>
              <div className="result__why result__next">
                <h4>Next step</h4>
                <p>{res.next}</p>
              </div>
              <div className="result__cta">
                <Btn kind="ember" href="/apply" arrow data-analytics-event="pathfinder_result_apply_click" data-analytics-source={`pathfinder_result_${key}`} data-analytics-link-kind="apply">Apply For Coaching</Btn>
                <Btn kind="ghost" href={res.href}>See the details</Btn>
              </div>
              <button className="result__again" onClick={reset}>↺ Start over</button>
            </div>
            <Photo className="result__media" src={res.mediaSrc} alt="Titan Forge coaching proof photo" tag={res.media} pos="center 18%" />
          </div>
        </div>
      </div>
    );
  }

  const Q = FINDER_QUESTIONS[step];
  return (
    <div className="finder">
      <div className="finder__progress">
        <span className="finder__count">Step {step + 1} / {total}</span>
        <div className="finder__bar"><i style={{ width: `${(step / total) * 100}%` }}></i></div>
        <span className="finder__count">Path Finder</span>
      </div>
      <div className="finder__q" key={Q.key}>
        <Eyebrow>Question {step + 1}</Eyebrow>
        <h2 className="finder__qhead">{Q.q}</h2>
        <p className="finder__qsub">{Q.sub}</p>
        <div className="opts">
          {Q.options.map(([val, t, d]) => {
            const sel = answers[Q.key] === val;
            return (
              <button key={val} className={`opt ${sel ? 'sel' : ''}`} onClick={() => choose(Q.key, val)}>
                <span className="opt__check">{sel ? '✓' : ''}</span>
                <span><span className="opt__t">{t}</span><span className="opt__d">{d}</span></span>
              </button>
            );
          })}
        </div>
        <div className="finder__nav">
          <button className="finder__back" disabled={step === 0} onClick={() => setStep(s => Math.max(0, s - 1))}>← Back</button>
          <span className="finder__count" style={{ color: 'var(--text-3)' }}>Tap an option to continue</span>
        </div>
      </div>
    </div>
  );
}

function StartPage() {
  useReveal();
  return (
    <>
      <PageHeader eyebrow="Find Your Path" title={editableCopy('start.headline', 'Where do you start?')}
        intro={editableCopy('start.description', 'Three quick questions. No form wall, no spam — just an honest read on the first step that matches your goal, location, and support level.')} />
      <section className="section">
        <div className="wrap"><PathFinder/></div>
      </section>
      <FAQSection route="/start" />
      <section className="section section--inset">
        <div className="wrap">
          <SectionHead center eyebrow="Prefer to just talk?" title="Skip the quiz."
            intro={<>If you already know what you need, apply for <a href="/coaching">coaching</a> and give us the context needed to map the next conversation.</>} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
            <Btn kind="ember" href="/apply" arrow data-analytics-link-kind="apply">{editableCopy('start.primaryCta', 'Apply For Coaching')}</Btn>
          </div>
        </div>
      </section>
    </>
  );
}

function ApplyPage() {
  useReveal();
  const [sent, setSent] = useState(false);
  const [leadEvent, setLeadEvent] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    goal: 'Fat loss & recomp',
    path: 'In-person DTC (Englewood)',
    schedule: '3–4 days/week',
    notes: '',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const goalParam = urlParams.get('goal');
      const goalLabelMap = {
        lose: 'Lose 20+ lbs and keep it off',
        strength: 'Get stronger / already lift',
        over40: 'First time with a coach, over 40',
      };
      if (goalParam && goalLabelMap[goalParam]) {
        setForm((prev) => ({ ...prev, goal: goalLabelMap[goalParam] }));
      }
    }
  }, []);

  const setField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));
  const valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid) {
      window.titanTrackEvent?.('apply_form_invalid_submit', {
        form_id: 'apply_page',
        has_name: Boolean(form.name.trim()),
        has_email: Boolean(form.email.trim()),
      });
      return;
    }

    window.titanTrackEvent?.('apply_form_valid_submit', {
      form_id: 'apply_page',
      primary_goal: form.goal,
      starting_path: form.path,
    });

    const leadResult = typeof postLeadEvent === 'function'
      ? await postLeadEvent({ ...form, coach: 'steve' }, 'coaching application')
      : { ok: true, leadId: 'client-offline' };

    setLeadEvent(leadResult);
    window.titanTrackEvent?.('lead_server_submit', {
      form_id: 'apply_page',
      ok: Boolean(leadResult.ok),
      lead_id: leadResult.leadId,
    });
    setSent(true);
  };

  const discoveryUrl = 'https://calendly.com/titanforgefit/discovery';

  return (
    <div className="apply-page-wrap rail-sweep" data-page-type="apply">
      <PageHeader
        eyebrow="1:1 Coaching Intake"
        title="Let's build a plan that fits your life."
        intro="Tell Steve your goals, current routine, and available schedule. Every inquiry is reviewed directly to match you with the right coaching setup."
      />
      <section className="section">
        <div className="wrap" style={{ maxWidth: 840 }}>
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 'var(--r, 12px)', padding: 'clamp(24px, 4vw, 40px)', marginBottom: 32 }}>
            <h3 style={{ marginTop: 0, fontSize: 22 }}>Prefer to pick a time right now?</h3>
            <p style={{ color: 'var(--text-2)', margin: '8px 0 20px' }}>
              Skip the intake form and select a 15-minute slot directly on Steve’s calendar, or call the gym directly.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <RailCta
                label="Book Steve on Calendly"
                href={discoveryUrl}
                arrow
                source="apply_page_fasttrack"
                className="btn--ember"
              />
              <a className="home-call" href="tel:+17209167235" data-analytics-link-kind="tel">Call (720) 916-7235</a>
            </div>
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 'var(--r, 12px)', padding: 'clamp(24px, 4vw, 40px)' }}>
            {sent ? (
              <div className="formdone" style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontFamily: 'var(--display)', fontSize: 48, color: 'var(--ember)', marginBottom: 12 }}>✓</div>
                <h3>Your application is submitted.</h3>
                <p style={{ color: 'var(--text-2)', maxWidth: '52ch', margin: '12px auto 24px' }}>
                  Steve will review your details and reach out within 24 hours. You can also lock in your intro call slot on Calendly right now.
                </p>
                <a
                  className="btn btn--ember"
                  href={discoveryUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-analytics-event="coach_booking_click"
                  data-analytics-source="apply_success"
                  data-analytics-link-kind="booking"
                >
                  Pick your time on Calendly →
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
                <h3 style={{ margin: 0, fontSize: 24 }}>Share your starting details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={setField('name')}
                      placeholder="Your name"
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={setField('email')}
                      placeholder="you@example.com"
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Phone (Optional)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={setField('phone')}
                      placeholder="(720) 000-0000"
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Primary Goal</label>
                    <select
                      value={form.goal}
                      onChange={setField('goal')}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    >
                      <option>Fat loss & recomp</option>
                      <option>Build strength & muscle</option>
                      <option>Over 40 / Foundation first</option>
                      <option>Nutrition accountability only</option>
                      <option>General health & consistency</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Coaching Format</label>
                    <select
                      value={form.path}
                      onChange={setField('path')}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    >
                      <option>In-person DTC (Englewood facility)</option>
                      <option>1:1 Online coaching (Worldwide)</option>
                      <option>Either / Help me choose</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Target Training Days</label>
                    <select
                      value={form.schedule}
                      onChange={setField('schedule')}
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit' }}
                    >
                      <option>2–3 days/week</option>
                      <option>3–4 days/week</option>
                      <option>4–5 days/week</option>
                      <option>Unsure / Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6 }}>What has been the biggest challenge? (Optional)</label>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={setField('notes')}
                    placeholder="Past diets, injuries, work travel, lack of accountability..."
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text)', borderRadius: 6, font: 'inherit', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <button type="submit" className="btn btn--ember" style={{ cursor: 'pointer' }}>
                    Send Application →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { StartPage, ApplyPage });
