import type { Metadata } from "next";
import { LaborDayApplicationForm } from "../components/LaborDayApplicationForm";
import { getRouteMeta, jsonLdForRoute } from "../lib/titanSeo";

export const metadata: Metadata = { title: "Apply for Coaching | Titan Forge Fitness", description: "Tell Titan Forge about your goals, schedule, and the coaching support you are looking for.", alternates: { canonical: "/apply" } };

export default function ApplyPage() {
  const route = getRouteMeta("/apply");
  return <>
    {route ? <script type="application/ld+json" data-titan-static-jsonld="true" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForRoute(route)) }} /> : null}
    <main className="coaching-intensive coaching-intensive-apply-page"><section className="section coaching-intensive__hero"><div className="wrap"><div className="coaching-intensive__hero-grid coaching-intensive__apply-grid"><div className="coaching-intensive__hero-text coaching-intensive__apply-intro"><p className="tf-eyebrow">APPLY FOR COACHING</p><h1 className="tf-display">LET&apos;S BUILD A PLAN THAT FITS YOUR LIFE</h1><p>You&apos;re ready to make a change. Let&apos;s find out how Titan Forge can help.</p></div><div className="coaching-intensive__form-panel"><LaborDayApplicationForm application /></div><div className="coaching-intensive__apply-details"><h2>TELL US ABOUT YOURSELF</h2><p>Share your goals, training experience, and the demands on your schedule. You don&apos;t need to have everything figured out before reaching out.</p></div></div></div></section><section className="section"><div className="wrap"><h2>WHAT HAPPENS NEXT?</h2><p>We&apos;ll review what you share and contact you about next steps. The application helps us understand whether our coaching is a good fit; it is not a commitment to coaching.</p><h2>WANT TO COMPARE YOUR OPTIONS FIRST?</h2><p>Explore the available plans, what they include, and their prices.</p><a className="btn btn--ghost" href="/pricing">View Plans &amp; Pricing</a></div></section></main>
  </>;
}
