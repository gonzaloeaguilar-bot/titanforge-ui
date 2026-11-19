import type { Metadata } from "next";
import { SITE_ORIGIN, getRouteMeta, jsonLdForRoute } from "../lib/titanSeo";
import { LaborDayApplicationForm } from "../components/LaborDayApplicationForm";
import { CoachPortraits, CoachProfileButton } from "../components/CoachPortraits";

export const metadata: Metadata = {
  title: "Fitness Coaching Scholarship — 30-Day 1:1 Intensive | Titan Forge Fitness",
  description:
    "Apply for a Titan Forge coaching scholarship: 30 days of 1:1 coaching with Steve Ginevan or Kris Oddo. Up to 3 spots, free to apply, applications open year-round.",
  alternates: { canonical: `${SITE_ORIGIN}/coaching-intensive` },
  openGraph: {
    title: "30 DAYS OF 1:1 COACHING",
    description: "Real coaching, real results. Up to 3 spots. Applications open year-round.",
    url: `${SITE_ORIGIN}/coaching-intensive`,
    type: "website",
  },
};

export default function CoachingIntensivePage() {
  const route = getRouteMeta("/coaching-intensive");

  return (
    <>
      {route ? (
        <script
          type="application/ld+json"
          data-titan-static-jsonld="true"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForRoute(route)) }}
        />
      ) : null}
    <main className="coaching-intensive">
      {/* HERO: Split Layout */}
      <section className="section coaching-intensive__hero">
        <div className="wrap">
          <div className="coaching-intensive__hero-grid">
            {/* Left: Text */}
            <div className="coaching-intensive__hero-text">
              <p className="tf-eyebrow">UP TO 3 SPOTS • OPEN YEAR-ROUND</p>
              <h1 className="tf-display" style={{ fontSize: "clamp(44px, 6vw, 76px)" }}>
                30 DAYS OF FREE 1:1 COACHING
              </h1>
              <p style={{ color: "var(--text-2)", fontSize: "18px", lineHeight: 1.5, marginTop: "16px" }}>
                With Steve Ginevan, PhD or Kris Oddo. Apply in about 3 minutes.
              </p>
              <div className="coaching-intensive__hero-portraits">
                <CoachPortraits />
              </div>
            </div>

            {/* Right: Application form — capture leads on the spot */}
            <div className="coaching-intensive__form-panel">
              <LaborDayApplicationForm />
            </div>
          </div>
        </div>
      </section>

      {/* Everything below the form is optional reading, folded so the
          application is the page. Native <details>: the text stays in the
          server HTML for crawlers; it is collapsed, not removed. */}
      <details className="coaching-intensive__more" id="more">
        <summary className="coaching-intensive__more-summary">
          <span>
            <strong>How the 30 days work</strong>
            <small>What you get, the coaches, real clients and questions.</small>
          </span>
        </summary>
        {/* OFFER SECTION */}
        <section className="section coaching-intensive__offer">
          <div className="wrap">
            <div className="shead shead--center">
              <h2>WHAT HAPPENS IN YOUR 30 DAYS</h2>
            </div>

            <div className="coaching-intensive__offer-grid" style={{ marginTop: "60px", maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
              <div className="coaching-intensive__offer-item">
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  WEEKLY CHECK-INS (30 MIN)
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  Every week, you and your coach review progress, adjust the plan, solve what got in your way. Not templated. Personal.
                </p>
              </div>

              <div className="coaching-intensive__offer-item">
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  DAILY SUPPORT
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  Training question, food question, or an accountability wobble? Start with the support assistant any time. Steve or Kris step in when a coaching decision needs a human.
                </p>
              </div>

              <div className="coaching-intensive__offer-item">
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  ONE TEAM, ONE PLAN
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  Your support covers training, nutrition, and accountability together. You are not put into a separate “training” or “nutrition” track.
                </p>
              </div>

              <div className="coaching-intensive__offer-item">
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  THE COACHING IS FREE
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  The 30 days of coaching are free. Applying is free.
                </p>
                <p style={{ color: "var(--text-3)", fontSize: "13px", lineHeight: 1.5, marginTop: "8px" }}>
                  If you are selected, a $50 deposit holds your spot. No payment is taken in this form.
                </p>
              </div>

              <div className="coaching-intensive__offer-item">
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  YOUR STORY GETS TOLD (OPTIONAL)
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  If you're open to sharing, we'll document your transformation. Completely optional. You can win and stay 100% private.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* COACHES SECTION */}
        <section className="section coaching-intensive__coaches" style={{ background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="shead shead--center">
              <h2>WHO'S COACHING YOU</h2>
            </div>

            <div className="coaching-intensive__coaches-grid" style={{ marginTop: "60px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
              <div>
                <CoachProfileButton coach="steve" />
                <h3 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "4px", letterSpacing: "0.05em" }}>
                  STEVE GINEVAN, PHD
                </h3>
                <p style={{ color: "var(--ember)", fontSize: "12px", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--mono)" }}>
                  SHARED COACHING SUPPORT
                </p>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.7, marginBottom: "16px" }}>
                  Steve helps guide the full 30-day plan around your schedule, progress, training, food, and accountability—not a generic template.
                </p>
                <p style={{ color: "var(--text-3)", fontSize: "15px", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text)" }}>Your 30 Days:</strong> A shared plan, daily support, weekly decisions, and the right coach involved when needed.
                </p>
              </div>

              <div>
                <CoachProfileButton coach="kris" />
                <h3 style={{ fontFamily: "var(--display)", fontSize: "18px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "4px", letterSpacing: "0.05em" }}>
                  KRIS ODDO
                </h3>
                <p style={{ color: "var(--ember)", fontSize: "12px", fontWeight: 600, marginBottom: "20px", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--mono)" }}>
                  SHARED COACHING SUPPORT
                </p>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.7, marginBottom: "16px" }}>
                  Kris helps guide the full 30-day plan around your real life, progress, training, food, and accountability—without rigid rules or guilt.
                </p>
                <p style={{ color: "var(--text-3)", fontSize: "15px", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text)" }}>Your 30 Days:</strong> A shared plan, daily support, weekly decisions, and the right coach involved when needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENT PROOF — published, attributable, and linked to source */}
        <section className="section coaching-intensive__proof" id="client-proof">
          <div className="wrap">
            <div className="shead shead--center">
              <p className="tf-eyebrow">CLIENT PROOF</p>
              <h2>REAL PEOPLE. REAL CONTEXT.</h2>
              <p className="coaching-intensive__proof-intro">
                Results are individual. These are published client stories and coaching context—not promises about what your 30 days will look like.
              </p>
            </div>

            <div className="coaching-intensive__proof-stat" aria-label="Tracked client result">
              <strong>25 LB</strong>
              <span>Tracked 16-week average across 15 completed clients. Individual results vary.</span>
            </div>

            <div className="coaching-intensive__proof-grid">
              <figure className="coaching-intensive__proof-card">
                <blockquote>“I&apos;ve lost 10 lb, which has definitely given me more confidence.”</blockquote>
                <figcaption>Justin <span>— Gains From Geebs client story</span></figcaption>
              </figure>
              <figure className="coaching-intensive__proof-card">
                <blockquote>“Before I couldn&apos;t do a single pull-up, and now I can do five all on my own.”</blockquote>
                <figcaption>Jon Miller <span>— Gains From Geebs client story</span></figcaption>
              </figure>
              <figure className="coaching-intensive__proof-card">
                <blockquote>“He helps me push myself to keep going and never lets me give up.”</blockquote>
                <figcaption>Jhoan Rincon <span>— Gains From Geebs client story</span></figcaption>
              </figure>
            </div>

            <div className="coaching-intensive__proof-sources">
              <a href="https://gainsfromgeebs.com/results" target="_blank" rel="noreferrer">Read Kris&apos;s full client proof ↗</a>
              <a href="/results">See Titan Forge&apos;s proof standards &amp; independent review context →</a>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="section coaching-intensive__faq">
          <div className="wrap">
            <div className="shead shead--center">
              <h2>QUESTIONS BEFORE YOU APPLY?</h2>
            </div>

            <div className="coaching-intensive__faq-grid" style={{ marginTop: "60px", maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
              <div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  IS THE COACHING REALLY FREE?
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  Yes. The 30 days of 1:1 coaching are free. If you are selected, a $50 deposit holds your spot. It is never taken when you apply; it is handled on your selection call.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  DO I HAVE TO SHARE MY RESULTS?
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  No. Completely optional. You can win and stay 100% private. Your choice.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  WHAT IF I MISS A WEEK?
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  Real coaching adapts to real life. We adjust. Goal is 30 days of progress, not 30 days of perfection.
                </p>
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: "16px", fontWeight: 600, textTransform: "uppercase", color: "var(--text)", marginBottom: "12px", letterSpacing: "0.05em" }}>
                  CAN I SWITCH COACHES MID-PROGRAM?
                </h3>
                <p style={{ color: "var(--text-2)", fontSize: "16px", lineHeight: 1.6 }}>
                  No. We match you based on your application. We make sure you're the right fit before day 1.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section coaching-intensive__cta" style={{ background: "var(--bg-1)", textAlign: "center" }}>
          <div className="wrap">
            <h2 className="tf-display" style={{ fontSize: "clamp(44px, 5vw, 60px)", marginBottom: "24px" }}>
              THREE SPOTS. REAL COACHING. REAL RESULTS.
            </h2>
            <p style={{ color: "var(--text-2)", fontSize: "18px", lineHeight: 1.7, maxWidth: "600px", marginLeft: "auto", marginRight: "auto", marginBottom: "12px" }}>
              Real coaching. Real results. Real life. If that's what you need, apply above.
            </p>
            <p style={{ color: "var(--text-3)", fontSize: "15px", marginBottom: "32px" }}>
              Up to 3 scholarships &middot; the coaching is free
            </p>
            <a href="#apply" className="btn btn--ember">
              APPLY TO WIN YOUR SPOT
              <span className="arr">→</span>
            </a>
          </div>
        </section>
      </details>
    </main>
    </>
  );
}
