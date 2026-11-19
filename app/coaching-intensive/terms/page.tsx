import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Scope | Coaching Intensive Coaching Scholarship",
  robots: { index: false, follow: false },
};

export default function CoachingIntensiveTermsPage() {
  return (
    <main className="terms-page">
      <div className="terms-container">
        <h1>Coaching Intensive 30-Day Coaching Scholarship Terms</h1>
        <p className="last-updated">Updated August 27, 2026</p>

        {/* Section 1 */}
        <section className="terms-section">
          <h2>1. Program Overview</h2>
          <p>
            The Coaching Intensive 30-Day Coaching Scholarship ("Program") is a limited-time fitness coaching
            offering by Titan Forge Fitness and Gains From Geebs. The Program provides one 30-day
            coaching sprint to two selected applicants (one per coach). This is NOT a subscription, NOT a
            membership, and is a one-time offering.
          </p>
        </section>

        {/* Section 2 */}
        <section className="terms-section">
          <h2>2. Program Cost & Payment</h2>
          <h3>2.1 $50 Deposit</h3>
          <p>
            The 30 days of coaching are free. Selected applicants must pay a $50 deposit before their
            30-day block begins. The deposit holds your spot. It is refunded or credited as set out in
            Section 2.2, and is non-refundable only once the program has begun (Section 8.2).
          </p>

          <h3>2.2 Refund Policy</h3>
          <p>
            The $50 deposit is refunded ONLY if:
          </p>
          <ul>
            <li>You are not selected as a winner; OR</li>
            <li>
              You do NOT wish to continue coaching after the 30-day program ends and decline any
              continuation offer (refund issued within 14 days of request)
            </li>
          </ul>
          <p>
            If you continue coaching after 30 days, the $50 is credited toward your first month of
            continuation coaching.
          </p>

          <h3>2.3 Continuation Coaching</h3>
          <p>
            After the 30-day program, continuation coaching is OPTIONAL. Your coach will walk you
            through the continuation options and pricing during the program (around Day 21). You have
            until Day 30 to decide. No automatic charges; you must affirmatively choose a continuation
            option, and your $50 deposit is credited toward it if you do.
          </p>
        </section>

        {/* Section 3 */}
        <section className="terms-section">
          <h2>3. Program Scope & Deliverables</h2>

          <h3>3.1 What You Get (Common to Both Coaches)</h3>
          <ul>
            <li>
              <strong>One 30-minute weekly live check-in call</strong> (via Zoom or phone). Scheduled in
              advance; you choose your preferred day/time within reason.
            </li>
            <li>
              <strong>Daily async support</strong> (email or Telegram, your choice):
              <ul>
                <li>Form reviews, form field corrections, workout feedback</li>
                <li>Nutritional guidance (if nutrition-focused coach)</li>
                <li>General motivation, accountability, and check-ins</li>
                <li>Response within 24 business hours on non-emergency questions</li>
              </ul>
            </li>
            <li>
              <strong>Structured 4-week progression</strong> tailored to your goals and lifestyle
            </li>
            <li>
              <strong>Baseline & final assessment</strong> (Day 1 and Day 30). You'll provide baseline
              measurements (weight, key lifts, photos if consented, wellness metrics). On Day 30, we'll do
              an outcome review.
            </li>
          </ul>

          <h3>3.2 Coach-Specific Scope</h3>

          <h4>Steve Ginevan (Titan Forge)</h4>
          <p>Specializes in strength training and muscle building for busy professionals.</p>
          <ul>
            <li>Personalized 4-week progressive strength program (3–4 sessions/week, 45–60 min)</li>
            <li>
              Video form feedback: submit 1–2 videos of key lifts per week; Steve gives written or video
              feedback
            </li>
            <li>Macro guidance: daily or weekly tracking, your preference</li>
            <li>Progression adjustments based on weekly check-in performance</li>
            <li>Access to Titan Forge methodology documentation</li>
          </ul>

          <h4>Kris Oddo (Gains From Geebs)</h4>
          <p>Specializes in nutrition coaching for sustainable compliance and real-life eating.</p>
          <ul>
            <li>
              Personalized meal framework: does NOT require meal prep, calorie counting, or restriction
            </li>
            <li>
              Weekly compliance review: you log your eating patterns; Kris adjusts the framework based on
              your actual life
            </li>
            <li>One live cook-along or meal-prep demonstration</li>
            <li>Energy, digestion, and wellness check-ins every week</li>
            <li>Access to Gains From Geebs protocol documentation</li>
          </ul>

          <h3>3.3 What This Program Does NOT Include</h3>
          <ul>
            <li>Guaranteed results (e.g., "lose 10 lbs" or "gain 15 lbs of muscle")</li>
            <li>24/7 emergency support (urgent medical issues → see your doctor, not your coach)</li>
            <li>Coaching beyond 30 days (unless you purchase continuation)</li>
            <li>Workout equipment, supplements, meal prep services, or other products (unless purchased separately)</li>
            <li>Group coaching or access to other clients' programs</li>
            <li>Post-30-day coaching accountability (continuation is separate)</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="terms-section">
          <h2>4. Your Responsibilities</h2>
          <p>By enrolling in this Program, you agree to:</p>
          <ul>
            <li>
              <strong>Effort & Consistency:</strong> You will make a good-faith effort to follow the program
              as designed. "Good faith" means doing the work 70% of the time, not perfection 100%.
            </li>
            <li>
              <strong>Communication:</strong> You will attend your weekly check-in calls and respond to async
              feedback within 48–72 hours so your coach can help you adjust.
            </li>
            <li>
              <strong>Safety:</strong> You are responsible for your own health and safety. Do not perform any
              exercise that causes pain (not to be confused with discomfort or fatigue). If you have a
              medical condition, injury, or concern, consult your doctor first.
            </li>
            <li>
              <strong>Honesty:</strong> You will provide honest information about your eating, training, and
              lifestyle so your coach can give accurate guidance.
            </li>
            <li>
              <strong>Respect for the Coach:</strong> Your coach is human. Respect their time, their expertise,
              and their boundaries. If you have a concern, communicate directly and respectfully.
            </li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="terms-section">
          <h2>5. Proof, Testimonials & Content Consent</h2>

          <h3>5.1 Sharing Your Story is Optional</h3>
          <p>
            Winning this scholarship does NOT require you to share your transformation, testimonial, photos,
            or case study. Proof sharing is entirely optional and is a separate decision from coaching.
          </p>

          <h3>5.2 If You Opt In</h3>
          <p>
            If you check "yes" to any proof-sharing option during application or Day 30, you grant Titan
            Forge Fitness and Gains From Geebs permission to:
          </p>
          <ul>
            <li>
              <strong>Testimonial quotes:</strong> Use your progress in your own words (text-only) in
              marketing, social media, email, website, or other promotional channels
            </li>
            <li>
              <strong>Before/after photos:</strong> Use your fitness photos (shoulders, abs, legs, full-body)
              in case studies, carousels, Reels, posts, or website features
            </li>
            <li>
              <strong>Video testimonial:</strong> Record a 2–3 minute interview (Zoom, phone, or in-person).
              You will review and approve the final cut before any publication.
            </li>
            <li>
              <strong>Social tagging:</strong> Tag you in social media posts featuring your progress
            </li>
          </ul>

          <h3>5.3 Your Approval Rights</h3>
          <p>
            Before any testimonial, photo, or video is published, you will be asked for written approval. You
            have the right to:
          </p>
          <ul>
            <li>Review any content before it's posted</li>
            <li>Request edits or changes (e.g., crop a photo, adjust a quote)</li>
            <li>Decline publication if you change your mind</li>
            <li>Request removal from posts 30 days after publication</li>
          </ul>

          <h3>5.4 Rescinding Consent</h3>
          <p>
            You may rescind your proof consent at any time by emailing{" "}
            <a href="mailto:hello@titanforgefit.com">hello@titanforgefit.com</a>. We will remove new content
            within 30 days and stop using your photos, quotes, or video in future materials. (Archived or
            published content may remain in some channels for historical reasons, but we will not create new
            posts using your content.)
          </p>

          <h3>5.5 No Compensation</h3>
          <p>
            You will not receive monetary compensation for testimonials, photos, or case studies. The
            coaching itself is your compensation.
          </p>
        </section>

        {/* Section 6 */}
        <section className="terms-section">
          <h2>6. Privacy & Data</h2>
          <p>
            Your name, email, phone, age, fitness data, and program progress are stored securely and used
            only for:
          </p>
          <ul>
            <li>Coaching and program delivery</li>
            <li>Follow-up communication about continuation coaching</li>
            <li>Creating testimonials or case studies (if you consent)</li>
            <li>Aggregate analytics (never individual data)</li>
          </ul>
          <p>
            We do not sell, share, or rent your data to third parties. We comply with all applicable privacy
            laws. Your consent to proof sharing (Section 5) is separate from your privacy permissions.
          </p>
        </section>

        {/* Section 7 */}
        <section className="terms-section">
          <h2>7. Limitation of Liability</h2>
          <p>
            <strong>Coaching is not medical advice.</strong> Your coach is not a doctor, therapist, or
            medical professional. If you have a medical condition, injury, mental health concern, or
            medication question, consult your doctor or qualified healthcare provider.
          </p>
          <p>
            <strong>Results vary.</strong> Fitness outcomes depend on your genetics, effort, adherence,
            sleep, stress, and dozens of other factors. Your coach cannot guarantee specific results (e.g.,
            "guaranteed 10 lb weight loss"). Any results claimed are anecdotal and should not be interpreted
            as a promise or guarantee.
          </p>
          <p>
            <strong>Assumption of risk.</strong> You acknowledge that fitness training carries inherent
            risks (injury, soreness, fatigue). By enrolling, you assume full responsibility for your safety
            and agree not to hold Titan Forge Fitness, Gains From Geebs, their coaches, or their employees
            liable for any injury or harm resulting from your participation in this program.
          </p>
        </section>

        {/* Section 8 */}
        <section className="terms-section">
          <h2>8. Cancellation & Refunds</h2>

          <h3>8.1 Before Program Start (Sep 11)</h3>
          <p>
            If you are selected as a winner and change your mind before Sep 11, email{" "}
            <a href="mailto:hello@titanforgefit.com">hello@titanforgefit.com</a> to request a full $50
            refund. Refunds are issued within 7–10 business days.
          </p>

          <h3>8.2 During the Program (Sep 11 – Oct 11)</h3>
          <p>
            Once the program begins, the $50 deposit is non-refundable. If you need to pause or stop early due
            to emergency or injury, contact your coach immediately to discuss your situation. We may be able
            to adjust your program or extend your timeline, but refunds are not available mid-program.
          </p>

          <h3>8.3 After the Program Ends</h3>
          <p>
            See Section 2.2 (Refund Policy) above. If you decline continuation coaching, your $50 is
            refunded within 14 days.
          </p>
        </section>

        {/* Section 9 */}
        <section className="terms-section">
          <h2>9. Changes to Program</h2>
          <p>
            Titan Forge Fitness and Gains From Geebs reserve the right to modify program details (pricing,
            scope, continuation terms) with 14 days' written notice. Changes will not affect your 30-day
            program; only future cohorts or continuation pricing may change.
          </p>
        </section>

        {/* Section 10 */}
        <section className="terms-section">
          <h2>10. Dispute Resolution</h2>
          <p>
            If you have a complaint or dispute, email <a href="mailto:hello@titanforgefit.com">
              hello@titanforgefit.com
            </a>{" "}
            with a detailed description. We will respond within 5 business days. We aim to resolve issues
            fairly and amicably.
          </p>
        </section>

        {/* Section 11 */}
        <section className="terms-section">
          <h2>11. Acknowledgment</h2>
          <p>
            By applying for or enrolling in this program, you acknowledge that you have read, understood,
            and agree to these terms. You confirm that:
          </p>
          <ul>
            <li>You are at least 18 years old</li>
            <li>You are in good general health (or have cleared this program with your doctor)</li>
            <li>
              You understand that coaching is not medical advice and that you are fully responsible for your
              safety
            </li>
            <li>You agree to respect the coach, the program, and these terms</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="terms-section terms-footer">
          <h2>Questions?</h2>
          <p>
            Email <a href="mailto:hello@titanforgefit.com">hello@titanforgefit.com</a> or call Steve or
            Kris directly.
          </p>
        </section>
      </div>
    </main>
  );
}
