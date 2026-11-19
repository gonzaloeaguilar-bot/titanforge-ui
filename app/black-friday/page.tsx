import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "../lib/titanSeo";
import { CoachPortraits } from "../components/CoachPortraits";
import { LaborDayApplicationForm } from "../components/LaborDayApplicationForm";

const TITLE = "Black Friday Fitness Coaching Sale | Titan Forge Fitness";
const DESCRIPTION =
  "Lock in 1:1 fitness coaching at bulk rates: pay 6 months get 8, or pay 12 get 18. Partner seat 30% off. $400 holds your rate until Jan 4.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_ORIGIN}/black-friday` },
  openGraph: {
    title: "BLACK FRIDAY 1:1 COACHING SALE",
    description: "Pay 6 get 8, pay 12 get 18, or bring a training partner for 30% off. Up to 3 spots.",
    url: `${SITE_ORIGIN}/black-friday`,
    type: "website",
  },
};

const pricingTiers = [
  {
    name: "Standard 1:1 Coaching",
    regular: "$400 / month",
    regularNote: "Regular monthly coaching rate",
    deals: [
      {
        plan: "Pay 6, Get 8 Months",
        price: "$2,400",
        effective: "$300 / month",
        savings: "Save $800 (2 months free)",
        badge: "Most popular",
      },
      {
        plan: "Pay 12, Get 18 Months",
        price: "$4,800",
        effective: "$267 / month",
        savings: "Save $2,400 (6 months free)",
        badge: "Strictly limited to 3 spots",
      },
      {
        plan: "Bring a Partner (6 get 8)",
        price: "$4,080 for two",
        effective: "$255 / mo per person",
        savings: "Second seat is 30% off ($1,680)",
        badge: "Partner or gift",
      },
    ],
  },
  {
    name: "Premium 1:1 Coaching",
    regular: "$750 / month",
    regularNote: "Complete concierge support and daily feedback",
    deals: [
      {
        plan: "Pay 6, Get 8 Months",
        price: "$4,500",
        effective: "$563 / month",
        savings: "Save $1,500 (2 months free)",
        badge: "High touch",
      },
      {
        plan: "Pay 12, Get 18 Months",
        price: "$9,000",
        effective: "$500 / month",
        savings: "Save $4,500 (6 months free)",
        badge: "Strictly limited to 3 spots",
      },
      {
        plan: "Bring a Partner (6 get 8)",
        price: "$7,650 for two",
        effective: "$478 / mo per person",
        savings: "Second seat is 30% off ($3,150)",
        badge: "Partner or gift",
      },
    ],
  },
];

const faqs = [
  {
    q: "How does the Titan Forge Black Friday offer work?",
    a: "You prepay 6 months and receive 8 months of coaching, or prepay 12 months and receive 18 months of coaching. If you train with a partner, spouse, or friend, the second person receives 30% off the 6-month package.",
  },
  {
    q: "How much is needed to hold the Black Friday rate?",
    a: "A $400 deposit holds your rate and package. The remaining balance is due by January 4, 2027. You can begin coaching immediately or hold your start date until January 4.",
  },
  {
    q: "Who are the coaches for this program?",
    a: "You are coached 1:1 by Steve Ginevan, PhD (biomechanics and progressive strength programming) or Kris Oddo (nutrition compliance and body recomposition).",
  },
  {
    q: "What if I need to stop coaching early?",
    a: "We follow a fair-play refund rule. Used months are charged at the regular standard monthly rate ($400 for Standard, $750 for Premium), and any unused balance is promptly refunded.",
  },
  {
    q: "When does the Black Friday sale close?",
    a: "The public sale begins Friday November 27 and closes Cyber Monday November 30 at 11:59 pm ET. No countdown timers, no fake extensions.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Titan Forge Black Friday 1:1 Coaching",
  description: DESCRIPTION,
  url: `${SITE_ORIGIN}/black-friday`,
  provider: {
    "@type": "Organization",
    name: "Titan Forge Fitness",
    url: SITE_ORIGIN,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Standard Coaching 6 Get 8",
      price: "2400",
      priceCurrency: "USD",
      url: `${SITE_ORIGIN}/black-friday#apply`,
      validFrom: "2026-11-25T00:00:00-05:00",
      validThrough: "2026-11-30T23:59:59-05:00",
    },
    {
      "@type": "Offer",
      name: "Standard Coaching 12 Get 18",
      price: "4800",
      priceCurrency: "USD",
      url: `${SITE_ORIGIN}/black-friday#apply`,
      validFrom: "2026-11-25T00:00:00-05:00",
      validThrough: "2026-11-30T23:59:59-05:00",
    },
  ],
};

export default function TitanBlackFridayPage() {
  return (
    <>
      <script
        type="application/ld+json"
        data-titan-static-jsonld="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        data-titan-static-jsonld="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <main className="coaching-intensive">
        {/* HERO SECTION */}
        <section className="section coaching-intensive__hero">
          <div className="wrap">
            <div className="coaching-intensive__hero-grid">
              {/* Left Column: Offer intro */}
              <div className="coaching-intensive__hero-text">
                <p className="tf-eyebrow">BLACK FRIDAY SALE • NOV 27 TO NOV 30 • 3 SPOTS</p>
                <h1 className="tf-display" style={{ fontSize: "clamp(38px, 5.5vw, 68px)", lineHeight: 1.02 }}>
                  PREPAY MONTHS IN BULK, OR BRING A PARTNER
                </h1>
                <p style={{ color: "var(--text-2)", fontSize: "18px", lineHeight: 1.55, marginTop: "16px" }}>
                  Pay 6 months get 8, or pay 12 get 18. Bring a partner, spouse, or friend for 30% off the 6-month plan. $400 holds your rate today with coaching starting any time up to January 4.
                </p>
                <div style={{ marginTop: "24px" }}>
                  <a href="#apply" className="btn btn--ember">
                    Lock In Black Friday Rate
                  </a>
                </div>
                <div className="coaching-intensive__hero-portraits" style={{ marginTop: "28px" }}>
                  <CoachPortraits />
                </div>
              </div>

              {/* Right Column: Application form directly in hero */}
              <div className="coaching-intensive__form-panel" id="apply">
                <LaborDayApplicationForm application />
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="section" style={{ borderTop: "1px solid var(--line)", background: "var(--bg-1)" }}>
          <div className="wrap">
            <div className="shead shead--center" style={{ maxWidth: "720px", margin: "0 auto 48px" }}>
              <p className="tf-eyebrow">BULK COMMITMENT SAVINGS</p>
              <h2 className="tf-display" style={{ fontSize: "clamp(30px, 4vw, 44px)" }}>
                THE BLACK FRIDAY RATES
              </h2>
              <p style={{ color: "var(--text-2)", fontSize: "16px", marginTop: "12px", lineHeight: 1.6 }}>
                Every plan includes full 1:1 programming, biomechanics review, direct coach messaging, and weekly accountability check-ins.
              </p>
            </div>

            <div style={{ display: "grid", gap: "36px", maxWidth: "980px", margin: "0 auto" }}>
              {pricingTiers.map((tier) => (
                <div
                  key={tier.name}
                  style={{
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "28px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "12px", borderBottom: "1px solid var(--line)", paddingBottom: "16px" }}>
                    <h3 style={{ fontFamily: "var(--display)", fontSize: "24px", textTransform: "uppercase", color: "var(--text)" }}>
                      {tier.name}
                    </h3>
                    <div style={{ color: "var(--text-3)", fontSize: "14px", fontFamily: "var(--mono)" }}>
                      Normally {tier.regular} &middot; {tier.regularNote}
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginTop: "24px" }}>
                    {tier.deals.map((deal) => (
                      <div
                        key={deal.plan}
                        style={{
                          background: "var(--bg-1)",
                          border: "1px solid var(--line)",
                          borderRadius: "6px",
                          padding: "20px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ color: "var(--ember)", fontFamily: "var(--mono)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                            {deal.badge}
                          </div>
                          <h4 style={{ fontFamily: "var(--display)", fontSize: "18px", color: "var(--text)", textTransform: "uppercase", marginTop: "8px" }}>
                            {deal.plan}
                          </h4>
                          <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--text)", marginTop: "12px", fontFamily: "var(--display)" }}>
                            {deal.price}
                          </div>
                          <div style={{ color: "var(--text-2)", fontSize: "13px", marginTop: "4px" }}>
                            Effective: {deal.effective}
                          </div>
                          <div style={{ color: "var(--ember-hot)", fontSize: "13px", marginTop: "8px", fontWeight: 500 }}>
                            {deal.savings}
                          </div>
                        </div>

                        <div style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1px solid var(--line)" }}>
                          <a href="#apply" className="btn btn--steel" style={{ width: "100%", textAlign: "center", display: "block", fontSize: "13px" }}>
                            Choose Plan
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NATIVE DETAILS FOR DEEP READING */}
        <section className="section" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead" style={{ marginBottom: "32px" }}>
              <p className="tf-eyebrow">TRANSPARENCY &amp; RULES</p>
              <h2 className="tf-display" style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}>
                TERMS, GUARANTEE, AND NEXT STEPS
              </h2>
            </div>

            <div style={{ display: "grid", gap: "16px" }}>
              <details
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "20px",
                }}
              >
                <summary style={{ cursor: "pointer", color: "var(--text)", fontWeight: 600, fontSize: "17px", listStyle: "none" }}>
                  <strong>Fair-play refund rule &rarr;</strong>
                </summary>
                <div style={{ marginTop: "14px", color: "var(--text-2)", fontSize: "15px", lineHeight: 1.65 }}>
                  <p>
                    Prepaying months in bulk should never be a trapped commitment. If your circumstances change and you need to stop coaching early, you receive a clean refund.
                  </p>
                  <p style={{ marginTop: "8px" }}>
                    Used months are charged at the normal regular monthly rate ($400 for Standard, $750 for Premium), and the remaining balance is returned to you.
                  </p>
                </div>
              </details>

              <details
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "20px",
                }}
              >
                <summary style={{ cursor: "pointer", color: "var(--text)", fontWeight: 600, fontSize: "17px", listStyle: "none" }}>
                  <strong>Partner seat discount &amp; gifting &rarr;</strong>
                </summary>
                <div style={{ marginTop: "14px", color: "var(--text-2)", fontSize: "15px", lineHeight: 1.65 }}>
                  <p>
                    The partner discount is available on the 6-month package (pay 6 get 8). Your partner, spouse, or friend receives 30% off the package ($1,680 instead of $2,400 for Standard).
                  </p>
                  <p style={{ marginTop: "8px" }}>
                    Both clients receive full, private 1:1 coaching, customized workout programming, and dedicated coach feedback. You can pay for both seats together on a single invoice as a gift.
                  </p>
                </div>
              </details>

              <details
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "20px",
                }}
              >
                <summary style={{ cursor: "pointer", color: "var(--text)", fontWeight: 600, fontSize: "17px", listStyle: "none" }}>
                  <strong>Consultation fee credit &rarr;</strong>
                </summary>
                <div style={{ marginTop: "14px", color: "var(--text-2)", fontSize: "15px", lineHeight: 1.65 }}>
                  <p>
                    If you prefer a 1-on-1 consultation before committing, you can book a $100 consultation call. When you move forward with a coaching plan, the full $100 is credited directly to your coaching payment.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="section" style={{ borderTop: "1px solid var(--line)", background: "var(--bg-1)" }}>
          <div className="wrap" style={{ maxWidth: "860px" }}>
            <div className="shead">
              <p className="tf-eyebrow">COMMON QUESTIONS</p>
              <h2 className="tf-display" style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}>
                FREQUENTLY ASKED QUESTIONS
              </h2>
            </div>

            <dl style={{ display: "grid", gap: "28px", marginTop: "32px" }}>
              {faqs.map((faq) => (
                <div key={faq.q}>
                  <dt style={{ color: "var(--text)", fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>
                    {faq.q}
                  </dt>
                  <dd style={{ color: "var(--text-2)", fontSize: "15.5px", lineHeight: 1.65, margin: 0 }}>
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>

            <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--line)", display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
              <a href="#apply" className="btn btn--ember">
                Apply for Black Friday Coaching
              </a>
              <Link href="/pricing" className="btn btn--ghost">
                Compare Regular Rates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
