/* TitanForge homepage: local-first, human-prioritized, detail-oriented. */
function CountUp({ value, suffix = '', durationMs = 900 }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();

          const start = performance.now();
          const step = (now) => {
            const t = Math.min((now - start) / durationMs, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(step);
            else setDisplay(null);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref}>
      {display === null ? value : display}
      {suffix}
    </span>
  );
}

function RailSweep({ children, className = '' }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.dataset.armed = 'true';

    const entrance = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.dataset.seen = 'true';
          entrance.disconnect();
        }
      },
      { threshold: 0.01 }
    );

    entrance.observe(el);

    return () => {
      entrance.disconnect();
    };
  }, []);

  return (
    <div ref={ref} className={`rail-sweep ${className}`.trim()}>
      {children}
    </div>
  );
}

function RailProgress({ seen, total, label = 'reviews seen' }) {
  if (total < 2 || seen < 2) return null;

  const pct = Math.min(100, Math.round((seen / total) * 100));
  const complete = seen >= total;

  return (
    <div className="home-rail-progress">
      <div
        className="home-rail-progress__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={seen}
        aria-label={`${seen} of ${total} ${label}`}
      >
        <div
          className="home-rail-progress__fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="home-rail-progress__label" aria-hidden="true">
        {complete ? 'All reviews seen' : `${seen} of ${total} reviews seen`}
      </p>
    </div>
  );
}

function HomeBook({ id }) {
  return (
    <a
      className="btn btn--ember"
      href="/apply"
      data-cta={id}
      data-analytics-source={id}
      data-analytics-link-kind="apply"
    >
      {editableCopy('home.primaryCta', 'Book a free intro')}
    </a>
  );
}

function StarIcon({ size = 26 }) {
  return (
    <svg className="home-star" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function HomeRating() {
  const countNum = parseInt(HOME_REVIEWS.count, 10) || 30;
  return (
    <a
      className="home-rating"
      href={GOOGLE_BUSINESS_PROFILE_URL}
      data-cta="google_reviews"
      data-analytics-event="google_business_profile_click"
      data-analytics-source="homepage_local_training"
      data-analytics-link-kind="google_business_profile"
      target="_blank"
      rel="noreferrer"
    >
      <span className="home-rating__stars" aria-hidden="true">
        <StarIcon size={36} /><StarIcon size={36} /><StarIcon size={36} /><StarIcon size={36} /><StarIcon size={36} />
      </span>
      <span className="home-rating__score">5.0</span>
      <span className="home-rating__sep" aria-hidden="true">·</span>
      <span className="home-rating__count"><CountUp value={countNum} /> Google reviews</span>
    </a>
  );
}

function Hero() {
  return (
    <section data-client-ui-test="steve-claude-edit-ok" className="hero hero--fullbleed" data-section="home_hero">
      <div className="hero__backdrop" aria-hidden="true">
        <img
          src={HOME_HERO_SRC}
          srcSet={HOME_HERO_SRCSET}
          sizes="100vw"
          alt="Steve 'Doc' Ginevan, PhD and the Titan Forge coaching team"
          className="hero__backdrop-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero__backdrop-scrim" />
      </div>
      <div className="hero__wrap">
        <div className="hero__content">
          <p className="tf-eyebrow">Englewood · Denver Tech Center · Lone Tree · Online Worldwide</p>
          <h1 className="hero__h1">Personal training in the Denver Tech Center. Science-grounded 1:1 coaching that fits your life.</h1>
          <p className="hero__sub">1:1 training with Steve “Doc” Ginevan, PhD, in Englewood, CO and online worldwide.</p>
          <div className="hero__cta">
            <a
              className="btn btn--ember"
              href="/apply"
              data-cta="hero_book_intro"
              data-analytics-source="hero_book_intro"
              data-analytics-link-kind="apply"
            >
              {editableCopy('home.heroCta', 'GET FORGED')}
            </a>
          </div>
          <p className="hero__secondary">
            <a className="home-secondary-link" href="#starting-point" data-cta="hero_starting_point">Find your starting point ↓</a>
          </p>
          <HomeRating />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [viewedCount, setViewedCount] = React.useState(0);
  const seenIdsRef = React.useRef(new Set());

  const reviews = (HOME_GOOGLE_REVIEWS?.reviews || []).slice(0, 6);
  const weights = ['32 KG', '28 KG', '24 KG', '24 KG', '20 KG', '16 KG'];
  const items = reviews.map((r, idx) => {
    const [year, month] = r.date.split('-');
    const monthName = new Date(r.date + 'T00:00:00Z').toLocaleString('en-US', { month: 'long', timeZone: 'UTC' });
    const hasParagraphs = r.text.includes('\n\n');
    let desc;
    if (hasParagraphs) {
      const parts = r.text.split('\n\n');
      desc = (
        <span className="review-clamp">
          <span>{parts[0]}</span>
          <details className="review-more" id={`review-${r.id}-more`}>
            <summary>Read more</summary>
            {parts.slice(1).map((p, pIdx) => <span key={pIdx} className="review-p">{p}</span>)}
          </details>
        </span>
      );
    } else if (r.text.length > 220) {
      const periodIdx = r.text.indexOf('. ', 140);
      const splitAt = periodIdx > 0 && periodIdx < 260 ? periodIdx + 1 : 200;
      const firstPart = r.text.slice(0, splitAt);
      const rest = r.text.slice(splitAt).trim();
      desc = (
        <span className="review-clamp">
          <span>{firstPart}</span>
          <details className="review-more" id={`review-${r.id}-more`}>
            <summary>Read more</summary>
            <span className="review-p">{rest}</span>
          </details>
        </span>
      );
    } else {
      desc = r.text;
    }

    const isHighlighted = idx === 0;
    const weightLabel = weights[idx % weights.length];

    return {
      id: r.id,
      kind: 'text',
      media: <KettlebellHandle isHighlighted={isHighlighted} />,
      title: r.display_author,
      subtitle: `${monthName} ${year}`,
      description: (
        <span className="home-review">
          <span className="kettlebell-stamp" aria-hidden="true">
            <span>TF · {weightLabel}</span>
            <span>VERIFIED ATHLETE</span>
          </span>
          <span className="home-review__stars" role="img" aria-label={`${r.stars} out of 5 stars`}>
            <BarbellKnurledStars count={r.stars} />
          </span>
          <span className="home-review__body-text">{desc}</span>
        </span>
      ),
      actions: [
        {
          id: 'action_' + r.id,
          label: 'Read it on Google',
          href: GOOGLE_BUSINESS_PROFILE_URL,
        },
      ],
    };
  });

  const handleCardView = React.useCallback(({ id }) => {
    if (!seenIdsRef.current.has(id)) {
      seenIdsRef.current.add(id);
      setViewedCount(seenIdsRef.current.size);
      try {
        if (typeof window.titanTrack === 'function') {
          window.titanTrack('item_view', { item_id: String(id), item_category: 'review' });
        } else if (typeof window.track === 'function') {
          window.track('item_view', { item_id: String(id), item_category: 'review' });
        }
      } catch (err) {}
    }
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const scroller = document.querySelector('.home-reviews-rail .rail__scroller');
    if (!scroller) return;

    let ticking = false;
    const updateCenterCard = () => {
      ticking = false;
      const cards = scroller.querySelectorAll('.rail-card');
      if (!cards || !cards.length) return;
      const scrollerRect = scroller.getBoundingClientRect();
      const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;

      let closestCard = null;
      let closestDist = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - scrollerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestCard = card;
        }
      });

      cards.forEach((card) => {
        if (card === closestCard) {
          if (card.dataset.railCenter !== 'true') card.dataset.railCenter = 'true';
        } else {
          if (card.dataset.railCenter === 'true') delete card.dataset.railCenter;
        }
      });
    };

    updateCenterCard();
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateCenterCard);
        ticking = true;
      }
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="section home-proof" data-section="home_proof">
      <BarbellKnurlDefs />
      <div className="wrap">
        <Eyebrow>Verified client results</Eyebrow>
        <h2 className="home-proof__title">What our clients<br className="home-proof-break" />say about us.</h2>
        <div className="home-reviews-rating">
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            data-cta="google_reviews"
            data-analytics-event="google_business_profile_click"
            data-analytics-source="homepage_local_training"
            data-analytics-link-kind="google_business_profile"
          >
            <RailRating
              value={Number(HOME_REVIEWS.rating)}
              count={HOME_REVIEWS.count}
              countLabel={() => 'Google reviews'}
              source="homepage_google_proof"
            />
          </a>
        </div>
        <p className="home-proof__sub">Real feedback from in-person personal training clients in Englewood<br className="home-proof-sub-break" /> and 1:1 online coaching athletes worldwide.</p>
        <RailSweep className="home-reviews-rail reveal">
          <Rail
            items={items}
            source="homepage_reviews"
            size="md"
            variant="text"
            cta="primary"
            highlightId={items[0]?.id}
            onCardView={handleCardView}
            tailSlot={
              <RailProgress seen={viewedCount} total={items.length} label="reviews seen" />
            }
          />
        </RailSweep>
        <div className="home-proof__footer-cta">
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noreferrer"
            data-cta="proof_google_reviews"
            data-analytics-event="google_business_profile_click"
            data-analytics-source="homepage_local_training"
            data-analytics-link-kind="google_business_profile"
          >
            Read reviews on Google →
          </a>
        </div>
        <p className="home-note">Rating verified {HOME_REVIEWS.verifiedOn}.</p>
      </div>
    </section>
  );
}

const GOAL_DATA = {
  lose: {
    id: 'lose',
    badge: 'Fat Loss',
    label: 'Lose 20+ lbs and keep it off',
    author: 'Ignacio M.',
    review: 'Steve has been a massive part of my weight loss journey. I’ve went from 225 to 175 in 4 months, then gained a ton of muscle the last two years with his program.',
    prefill: 'I want to lose 20+ lbs and keep it off.',
    image: '/assets/images/starting-recomp.jpg',
    imageAlt: 'Client fat loss and recomposition progression with Steve “Doc” Ginevan',
  },
  strength: {
    id: 'strength',
    badge: 'Strength',
    label: 'Get stronger, I already lift',
    author: 'Bronx B.',
    review: 'What differentiates Titan from other trainers is the approach of performance architecture versus the one-size-fits-all model of other trainers/fitness groups.',
    prefill: 'I want to get stronger. I already lift.',
    image: '/assets/images/starting-strength.jpg',
    imageAlt: 'Strength progression client training with Steve “Doc” Ginevan',
  },
  over40: {
    id: 'over40',
    badge: 'Over 40',
    label: 'First time with a coach, over 40',
    author: 'Tucker T.',
    review: 'I went from never working out to being in the gym nearly every day — all thanks to Doc’s incredible guidance, encouragement, and support.',
    prefill: 'I am over 40 and looking for my first coach.',
    image: '/assets/images/starting-over40.jpg',
    imageAlt: 'Tucker consistency journey: first time with a coach over 40',
  },
};

function StartingPoint() {
  const ctaLabel = editableCopy('home.startingPointCta', 'Get Started with Doc');

  const askAssistant = (goalId) => {
    const item = GOAL_DATA[goalId];
    window.titanTrackEvent?.('cta_click', {
      cta_id: `starting_point_${goalId}_ask`,
      cta_text: 'Ask the assistant about this goal',
      cta_position: 'starting_point',
    });
    window.dispatchEvent(new CustomEvent('titan-chat-open', { detail: { prefill: item?.prefill || '' } }));
  };

  return (
    <section className="section doc-entry" id="starting-point" data-section="starting_point">
      <div className="wrap">
        <Eyebrow>Your starting point</Eyebrow>
        <h2>Where are you starting?</h2>
        <p className="section-intro">
          Select the focus that matches your goals. We adapt every training block, nutrition target, and schedule to your real constraints.
        </p>
        <div className="starting-bleeds" role="list">
          {Object.entries(GOAL_DATA).map(([id, item]) => (
            <article key={id} className="starting-bleed-card" role="listitem">
              <div className="starting-bleed-card__bg">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="starting-bleed-card__img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="starting-bleed-card__scrim" aria-hidden="true" />
              </div>
              <div className="starting-bleed-card__content">
                <div className="starting-bleed-card__top">
                  <span className="starting-bleed-card__badge">{item.badge}</span>
                </div>
                <div className="starting-bleed-card__bottom">
                  <h3 className="starting-bleed-card__title">{item.label}</h3>
                  <p className="starting-bleed-card__quote">“{item.review}”</p>
                  <span className="starting-bleed-card__author">{item.author} · Google review</span>
                  <div className="starting-bleed-card__actions">
                    <a
                      className="btn btn--ember starting-bleed-card__cta"
                      href={`/apply?goal=${id}`}
                      data-cta={`starting_point_${id}`}
                      data-analytics-link-kind="apply"
                      onClick={() => {
                        window.titanTrackEvent?.('cta_click', {
                          cta_id: `starting_point_${id}`,
                          cta_text: ctaLabel,
                          cta_position: 'starting_point',
                        });
                      }}
                    >
                      {ctaLabel}
                    </a>
                    <button
                      type="button"
                      className="starting-bleed-card__ask"
                      onClick={() => askAssistant(id)}
                    >
                      Ask Doc's assistant about this →
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeVersus() {
  return (
    <section className="section section--raised home-versus" data-section="home_versus">
      <div className="wrap">
        <Eyebrow>Two ways to train</Eyebrow>
        <h2>Online or in person?</h2>
        <p className="section-intro">Both options feature direct, evidence-based coaching with Steve “Doc” Ginevan, PhD.</p>
        <RailVersus
          layout="panels"
          source="home_versus"
          sides={[
            {
              id: 'gym',
              name: 'In the gym',
              chip: 'Englewood, CO',
              image: {
                src: '/assets/images/two-ways-gym.jpg',
                alt: '1:1 personal training session with coach in the gym',
              },
              score: '1:1',
              scoreLabel: 'with Steve in Englewood',
              stats: [
                {
                  label: 'Format & Focus',
                  value: 'Private 1:1 sessions near the Denver Tech Center with hands-on barbell technique coaching, real-time pacing, and scheduled accountability.',
                },
                {
                  label: 'Weekly Cadence',
                  value: 'Meet Steve for private sessions in Englewood, then execute your customized training and nutrition plan between sessions.',
                },
                {
                  value: (
                    <a
                      href="/apply?format=in-person"
                      className="btn btn--ember home-versus__card-cta"
                      data-analytics-link-kind="apply"
                      onClick={() => {
                        window.titanTrackEvent?.('cta_click', {
                          cta_id: 'versus_in_person_apply',
                          cta_text: 'Apply for In-Person Coaching',
                          cta_position: 'home_versus',
                        });
                      }}
                    >
                      <span>Apply for In-Person Coaching</span>
                      <span className="arr" aria-hidden="true">→</span>
                    </a>
                  ),
                },
              ],
            },
            {
              id: 'online',
              name: 'Online worldwide',
              chip: 'Worldwide',
              image: {
                src: '/assets/images/two-ways-online.jpg',
                alt: '1:1 online coaching consultation on phone',
              },
              score: '1:1',
              scoreLabel: 'from wherever you train',
              stats: [
                {
                  label: 'Format & Focus',
                  value: 'Fully custom strength programming, detailed video technique review, macro targets, and habit tracking with zero commute.',
                },
                {
                  label: 'Weekly Cadence',
                  value: 'Follow your plan anywhere, submit weekly check-ins, and get continuous coaching adjustments around your real schedule.',
                },
                {
                  value: (
                    <a
                      href="/apply?format=online"
                      className="btn btn--ember home-versus__card-cta"
                      data-analytics-link-kind="apply"
                      onClick={() => {
                        window.titanTrackEvent?.('cta_click', {
                          cta_id: 'versus_online_apply',
                          cta_text: 'Apply for Online Coaching',
                          cta_position: 'home_versus',
                        });
                      }}
                    >
                      <span>Apply for Online Coaching</span>
                      <span className="arr" aria-hidden="true">→</span>
                    </a>
                  ),
                },
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}

const NOTEBOOKS = [
  {
    id: 'articles',
    tab: 'Articles',
    vol: 'VOL. I · SCIENCE & RESEARCH',
    title: 'Evidence-Based Training & Nutrition',
    tagline: 'Translating peer-reviewed physiology and energy balance into practical gym protocols.',
    badge: 'Peer-reviewed citations',
    ctaText: 'Browse research library',
    ctaHref: '/resources',
    entries: [
      {
        title: 'The Science of Body Recomposition',
        href: '/resources/body-recomposition-basics',
        summary: 'How to build muscle and drop body fat simultaneously, governed by energy balance and muscle protein synthesis.',
        meta: '8 MIN READ · RESEARCH PROTOCOL',
        pill: 'Recomp',
      },
      {
        title: 'Protein: Exact Daily Targets & Optimal Timing',
        href: '/resources/protein-how-much-and-timing',
        summary: 'Clinical targets from 1.6 to 2.2 g/kg, leucine trigger thresholds, and even daily distribution.',
        meta: '5 MIN READ · NUTRITION SCIENCE',
        pill: 'Protein',
      },
      {
        title: 'Progressive Overload Without Guesswork',
        href: '/resources/progressive-overload-without-guesswork',
        summary: 'Why mechanical tension drives growth, and how to calibrate Repetitions in Reserve (RIR) accurately.',
        meta: '6 MIN READ · STRENGTH ARCHITECTURE',
        pill: 'Hypertrophy',
      },
      {
        title: 'Strength Training for Fat Loss & Longevity Over 40',
        href: '/resources/strength-training-for-fat-loss',
        summary: 'Preserving lean tissue, joint integrity, and resting metabolic rate without punishment cardio.',
        meta: '7 MIN READ · METABOLIC HEALTH',
        pill: 'Longevity',
      },
    ],
  },
  {
    id: 'guides',
    tab: 'Guides',
    vol: 'VOL. II · BUYER & DECISION GUIDES',
    title: 'Coaching, Pricing & Starting Steps',
    tagline: 'Transparent decision guides with no outcome guarantees, lock-in tricks, or hidden rates.',
    badge: 'Transparent rates',
    ctaText: 'View full coaching guides',
    ctaHref: '/guides/how-much-does-an-online-fitness-coach-cost',
    entries: [
      {
        title: 'How Much Does Online Fitness Coaching Actually Cost?',
        href: '/guides/how-much-does-an-online-fitness-coach-cost',
        summary: 'A direct market breakdown of what human coach attention costs, what is included, and how to evaluate rates.',
        meta: '7 MIN READ · COST BREAKDOWN',
        pill: 'Pricing',
      },
      {
        title: 'Personal Trainer vs. Online Coach vs. Gym Membership',
        href: '/vs/personal-trainer-online-coach-or-gym-membership',
        summary: 'Which model solves your real bottleneck: physical hands-on coaching, daily accountability, or self-direction.',
        meta: '5 MIN READ · DECISION GUIDE',
        pill: 'Comparison',
      },
      {
        title: 'What to Expect in Your First Personal Training Session',
        href: '/guides/what-to-expect-first-personal-training-session',
        summary: 'The exact intake flow, movement screening, baseline setting, and joint-friendly ramp for DTC clients.',
        meta: '4 MIN READ · LOCAL WALKTHROUGH',
        pill: 'In-person',
      },
      {
        title: 'Best Online Fitness Coaching for Men Over 40',
        href: '/guides/best-online-fitness-coaching-for-men-over-40',
        summary: 'Navigating recovery capacity, joint wear, and busy executive schedules without extreme deficits.',
        meta: '6 MIN READ · LONGEVITY & RECOVERY',
        pill: 'Men over 40',
      },
    ],
  },
  {
    id: 'tools',
    tab: 'Free Tools',
    vol: 'VOL. III · INTERACTIVE TOOLS & LOGS',
    title: 'Calculators, Scorecards & Daily Logs',
    tagline: 'Free web tools running 100% locally on your device with zero account or PII required.',
    badge: 'No PII · Zero email gates',
    ctaText: 'Launch Daily Readiness tool',
    ctaHref: '/free/daily-readiness',
    entries: [
      {
        title: 'Daily Readiness & Training Session Scorecard',
        href: '/free/daily-readiness',
        summary: 'Rate sleep quality, muscular soreness, and daily stress to generate a customized workout volume recommendation.',
        meta: 'INTERACTIVE TOOL · 30-SEC CHECK',
        pill: 'Daily scorecard',
      },
      {
        title: 'Evidence-Based Daily Protein Target Calculator',
        href: '/tools/protein-calculator',
        summary: 'Compute your exact protein floor and ceiling according to body composition, training frequency, and age.',
        meta: 'INTERACTIVE TOOL · INSTANT CALC',
        pill: 'Calculator',
      },
      {
        title: 'The Forge Readiness Self-Check',
        href: '/free/forge-readiness-check',
        summary: 'A 2-minute diagnostic to determine if you need personalized coaching, a workout template, or foundational habits.',
        meta: 'SELF-ASSESSMENT · 2 MIN',
        pill: 'Readiness check',
      },
      {
        title: 'Daily Habit & Adherence Logbook',
        href: '/free/daily-habit',
        summary: 'A distraction-free habit checklist to lock in non-negotiables without logging into a proprietary platform.',
        meta: 'FREE LOGBOOK · BROWSER STORAGE',
        pill: 'Habit log',
      },
    ],
  },
];

function Notebooks() {
  const [activeNotebook, setActiveNotebook] = React.useState(0);
  const notebook = NOTEBOOKS[activeNotebook];

  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (idx + 1) % NOTEBOOKS.length;
      setActiveNotebook(next);
      document.getElementById(`notebook-tab-${next}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (idx - 1 + NOTEBOOKS.length) % NOTEBOOKS.length;
      setActiveNotebook(prev);
      document.getElementById(`notebook-tab-${prev}`)?.focus();
    }
  };

  return (
    <section className="section section--inset home-notebooks" data-section="home_notebooks">
      <div className="wrap">
        <SectionHead
          eyebrow="Open Archive & Protocols"
          title="Articles, guides, and free resources."
          intro="Peer-reviewed training and nutrition science, transparent coaching guides, and zero-PII interactive tools from Steve “Doc” Ginevan, PhD. Sourced from research, completely free to read and use."
        />

        <div className="home-notebooks__stepper">
          <RailSteps
            at={activeNotebook + 1}
            total={NOTEBOOKS.length}
            label={(at, total) => `Notebook ${at} of ${total}`}
            name="Titan Forge notebooks"
            source="home_notebooks"
            showLabel={true}
          />
        </div>

        <div className="home-notebooks__binder">
          <div className="home-notebooks__tabs" role="tablist" aria-label="Titan Forge notebooks">
            {NOTEBOOKS.map((item, idx) => {
              const isActive = activeNotebook === idx;
              return (
                <button
                  key={item.id}
                  id={`notebook-tab-${idx}`}
                  role="tab"
                  type="button"
                  className={`home-notebooks__tab ${isActive ? 'is-active' : ''}`}
                  aria-selected={isActive}
                  aria-controls={`notebook-panel-${idx}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveNotebook(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                >
                  <span className="home-notebooks__tab-num">0{idx + 1}</span>
                  <span className="home-notebooks__tab-label">{item.tab}</span>
                </button>
              );
            })}
          </div>

          <div
            id={`notebook-panel-${activeNotebook}`}
            role="tabpanel"
            aria-labelledby={`notebook-tab-${activeNotebook}`}
            className="home-notebook"
          >
            <div className="home-notebook__spine" aria-hidden="true">
              <div className="home-notebook__spine-holes" />
              <div className="home-notebook__spine-stitch" />
            </div>

            <div className="home-notebook__sheet">
              <header className="home-notebook__header">
                <div className="home-notebook__meta">
                  <span className="home-notebook__vol">{notebook.vol}</span>
                  <span className="home-notebook__badge">{notebook.badge}</span>
                </div>
                <h3 className="home-notebook__title">{notebook.title}</h3>
                <p className="home-notebook__tagline">{notebook.tagline}</p>
              </header>

              <div className="home-notebook__entries" role="list">
                {notebook.entries.map((entry, idx) => (
                  <article key={idx} className="home-notebook__entry" role="listitem">
                    <div className="home-notebook__entry-top">
                      <span className="home-notebook__entry-num">NOTE {String(idx + 1).padStart(2, '0')}</span>
                      <span className="home-notebook__entry-pill">{entry.pill}</span>
                    </div>
                    <h4 className="home-notebook__entry-title">
                      <a href={entry.href} className="home-notebook__entry-link">
                        {entry.title}
                      </a>
                    </h4>
                    <p className="home-notebook__entry-summary">{entry.summary}</p>
                    <div className="home-notebook__entry-footer">
                      <span className="home-notebook__entry-meta">{entry.meta}</span>
                      <a href={entry.href} className="home-notebook__entry-act" aria-label={`Read ${entry.title}`}>
                        <span>Open</span>
                        <span className="arr" aria-hidden="true">→</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <footer className="home-notebook__footer">
                <Btn kind="ember" href={notebook.ctaHref} arrow>
                  {notebook.ctaText}
                </Btn>
                <div className="home-notebook__stamp">
                  <span>TITAN FORGE · LAB LOGBOOK · NO PAYWALL</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Process = Notebooks;

const HOME_PLANS = [['premium','Premium Coaching'],['standard','Standard Coaching'],['nutrition','Nutrition Only'],['community','App + Community']].map(([id,name])=>[id,name,HOME_PLAN_PRICES[id]]);

function HomePlans() {
  const planItems = HOME_PLANS.map(([id, name, price]) => ({
    id,
    name,
    price,
    period: '/mo',
    features: [
      { id: 'f1', label: id === 'premium' ? 'Weekly scheduled video check-ins' : id === 'standard' ? 'Phone or Loom video check-ins' : id === 'nutrition' ? 'Nutrition targets & grocery planning' : 'Training app access & community' },
      { id: 'f2', label: id === 'community' ? 'Form check library & community' : 'Custom progression & honest feedback' },
      { id: 'f3', label: id === 'community' ? 'Weekly group Q&A with Steve' : 'Direct coach messaging' },
    ],
    action: { label: `See ${name.toLowerCase()} details` },
  }));

  const handleChoose = () => {
    go('/pricing');
  };

  return (
    <section className="section section--raised" id="plans" data-section="home_plans">
      <div className="wrap">
        <Eyebrow>Online coaching</Eyebrow>
        <h2>Choose your support level.</h2>
        <p>Four monthly options. Talk with Steve about which fits your goals.</p>
        <RailSweep className="home-plans-wrap">
          <RailPlans
            plans={planItems}
            label="Coaching plans"
            source="home_plans"
            onChoose={handleChoose}
          />
        </RailSweep>
        <p className="home-note">
          Looking for in-person training? Discuss your schedule and session options with Steve at your intro, or read more about our <a href="/for/online-coaching">online coaching</a> and local programs.
        </p>
      </div>
    </section>
  );
}

function AboutTrainers() {
  return (
    <section className="section section--inset" id="trainers" data-section="about_trainers">
      <div className="wrap">
        <div className="trainers-head">
          <div>
            <Eyebrow>About the trainers</Eyebrow>
            <h2>Meet your coaches.</h2>
            <p className="intro">
              Evidence-led fitness coaching founded and led by Steve &ldquo;Doc&rdquo; Ginevan, PhD and executive coaching led by Kris. Built for people who want structure, measurement, and sustainable results.
            </p>
          </div>
        </div>

        <div
          className="home-trainers-carousel"
          role="region"
          aria-label="Coaches carousel"
        >
          {COACH_LANES.map((c, idx) => (
            <div
              key={c.name}
              className="card programcard programcard--bleed"
              data-coach-index={idx}
            >
              <div className="card-media-wrap card-media-wrap--bleed" aria-hidden="true">
                <img
                  src={c.img}
                  alt=""
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: c.pos || 'center',
                    display: 'block',
                    transformOrigin: c.origin || 'center',
                    transform: c.scale ? `scale(${c.scale})` : undefined,
                  }}
                />
              </div>
              <div className="programcard__body">
                <span className="tag">{c.tag}</span>
                <h3>{c.name}</h3>
                <p>{c.sub}</p>
                <ul className="ticklist">
                  {c.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
                {c.external ? (
                  <a className="btn btn--ghost btn--block" href={c.href} target="_blank" rel="noreferrer">
                    {c.cta} <span className="arr">→</span>
                  </a>
                ) : (
                  <Btn kind="ghost" block href={c.href} arrow data-analytics-link-kind={c.href === '/apply' ? 'apply' : undefined}>
                    {c.cta}
                  </Btn>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="trainers-footer">
          <Btn kind="ghost" href="/coaches" arrow>
            Meet the full coaching team
          </Btn>
        </div>
      </div>
    </section>
  );
}

const FounderProof = AboutTrainers;

function HomeVisit() {
  const addressNode = (
    <>
      9780 S Meridian Blvd<br/>
      Englewood, CO 80112
    </>
  );

  return (
    <section className="section section--inset" data-section="home_visit">
      <div className="wrap home-visit">
        <div>
          <Eyebrow>Meridian · Inverness · Lone Tree</Eyebrow>
          <RailPlace
            label="Titan Forge Fitness location"
            heading="Visit us."
            address={addressNode}
            distance="About 3 miles from Lone Tree City Hall and about 2.8 miles by road from Inverness Way S."
            source="home_visit"
          />
          <div className="home-visit__links">
            <a className="home-call" href="tel:+17209167235" data-cta="visit_call" data-analytics-link-kind="tel">Call (720) 916-7235</a>
            <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noreferrer" data-cta="visit_directions" data-analytics-event="google_business_profile_click" data-analytics-source="homepage_local_training" data-analytics-link-kind="google_business_profile">Get directions →</a>
          </div>
        </div>
        <div>
          <h3>Hours</h3>
          <dl>
            <div><dt>Monday–Friday</dt><dd>5am–9pm</dd></div>
            <div><dt>Saturday</dt><dd>7am–4pm</dd></div>
            <div><dt>Sunday</dt><dd>8am–3pm</dd></div>
          </dl>
          <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="/for/personal-training-englewood-centennial">Personal training near the DTC →</a>
            <a href="/for/parker-personal-training">Training for Parker clients →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFaq() {
  React.useEffect(() => {
    const revealHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      if (!id) return;
      const details = document.getElementById(id);
      if (!(details instanceof HTMLDetailsElement)) return;
      details.open = true;
      requestAnimationFrame(() => {
        details.scrollIntoView({ block: 'start', behavior: 'auto' });
        window.setTimeout(() => details.scrollIntoView({ block: 'start', behavior: 'auto' }), 0);
      });
    };
    revealHashTarget();
    window.addEventListener('hashchange', revealHashTarget);
    return () => window.removeEventListener('hashchange', revealHashTarget);
  }, []);

  return (
    <section className="section doc-entry" data-section="home_faq">
      <div className="wrap home-faq">
        <Eyebrow>Straight answers</Eyebrow>
        <h2>Questions before you start?</h2>
        <p className="section-intro">Direct, verified answers to common questions about personal training and online coaching.</p>
        {HOME_FAQS.slice(0, 5).map(([q, a], idx) => (
          <details id={['cost', 'phd', 'over-40', 'where', 'format'][idx]} key={q}>
            <summary>{q}</summary>
            <p>
              {idx === 0 ? (
                <>
                  {a.replace('See current pricing on the pricing page.', '')}
                  <a href="/pricing">See current pricing on the pricing page.</a>
                </>
              ) : (
                a
              )}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function WhereToNext() {
  const nextItems = [
    {
      id: 'next_online',
      kind: 'text',
      title: 'Online Coaching',
      description: '1:1 programming, nutrition targets, and direct coach feedback from anywhere.',
      actions: [{ id: 'act_online', label: 'Explore online', href: '/for/online-coaching' }],
    },
    {
      id: 'next_in_person',
      kind: 'text',
      title: 'In-Person Training',
      description: 'Private 1:1 sessions at our Englewood facility near the Denver Tech Center.',
      actions: [{ id: 'act_in_person', label: 'In-person details', href: '/for/personal-training-englewood-centennial' }],
    },
    {
      id: 'next_nutrition',
      kind: 'text',
      title: 'Nutrition Coaching',
      description: 'Habit-based nutrition guidance and macro targets without crash diets.',
      actions: [{ id: 'act_nutrition', label: 'Nutrition coaching', href: '/for/nutrition-coaching' }],
    },
    {
      id: 'next_macro_guide',
      kind: 'text',
      title: 'Calculate Macros',
      description: 'How to accurately set and adjust your protein and energy baseline.',
      actions: [{ id: 'act_macros', label: 'Read guide', href: '/resources/how-to-calculate-macros' }],
    },
    {
      id: 'next_coaching_vs_templates',
      kind: 'text',
      title: 'Coaching vs. Templates',
      description: 'What you are really paying for and when personalized feedback matters.',
      actions: [{ id: 'act_vs', label: 'Compare options', href: '/resources/coaching-vs-templates' }],
    },
  ];

  return (
    <section className="section home-where-next" data-section="home_where_next">
      <div className="wrap">
        <Eyebrow>Where to next</Eyebrow>
        <h2>Explore your path.</h2>
        <div className="home-where-next__rail">
          <Rail
            items={nextItems}
            source="home_where_to_next"
            size="sm"
            variant="text"
            cta="primary"
            showControls
            ariaLabel="Explore your path"
            labels={{ position: (from, to, total) => `${from}–${to} of ${total}` }}
          />
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section ctaband tf-grain">
      <div className="wrap">
        <Eyebrow>Start here</Eyebrow>
        <h2>Ready to stop guessing?</h2>
        <p>Book a free 15-minute intro with Steve to discuss your goals, schedule, and the right coaching setup.</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <RailCta
            label={editableCopy('home.primaryCta', 'Book a free intro')}
            href="/apply"
            arrow
            source="final_book_intro"
            className="btn--ember"
          />
          <a className="home-call" href="tel:+17209167235" data-cta="final_call" data-analytics-link-kind="tel">Or call (720) 916-7235</a>
        </div>
      </div>
    </section>
  );
}

function HomeStickyBar() {
  const [parked, setParked] = React.useState(true);
  React.useEffect(() => {
    const hero = document.querySelector('.doc-entry--hero');
    if (!hero || !('IntersectionObserver' in window)) { setParked(false); return undefined; }
    const io = new IntersectionObserver(([entry]) => setParked(entry.isIntersecting), { threshold: 0.15 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div className={parked ? 'home-sticky home-sticky--parked' : 'home-sticky'} data-parked={parked ? 'true' : 'false'}>
      <RailStickyBar
        label="Titan Forge Fitness"
        actions={[
          {
            id: 'sticky_book_intro',
            label: editableCopy('home.primaryCta', 'Book a free intro'),
            href: '/apply',
          },
          {
            id: 'sticky_call',
            label: 'Call',
            href: 'tel:+17209167235',
          },
        ]}
        source="home_sticky"
      />
    </div>
  );
}

function HomePage() {
  useReveal();
  // In-page anchors (e.g. the hero "Find your starting point" link) do not
  // scroll on their own: the router resets the scroll to the top on every
  // hash change, and the target section only exists after React mounts.
  // Mirror the HomeFaq deferred pattern so this runs after that reset.
  React.useEffect(() => {
    const scrollHashTarget = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ''));
      if (!id || id.startsWith('/')) return;
      const el = document.getElementById(id);
      if (!el) return;
      requestAnimationFrame(() => {
        el.scrollIntoView({ block: 'start', behavior: 'auto' });
        window.setTimeout(() => el.scrollIntoView({ block: 'start', behavior: 'auto' }), 0);
      });
    };
    scrollHashTarget();
    window.addEventListener('hashchange', scrollHashTarget);
    return () => window.removeEventListener('hashchange', scrollHashTarget);
  }, []);
  return (
    <div className="home-v2" data-page-type="home">
      <Hero />
      <AboutTrainers />
      <Reviews />
      <StartingPoint />
      <HomeVersus />
      <Notebooks />
      <HomePlans />
      <HomeVisit />
      <HomeFaq />
      <WhereToNext />
      <FinalCTA />
    </div>
  );
}

Object.assign(window, { HomePage });
