"use client";

import { useEffect, useRef, useState } from "react";
import { trackScholarshipEvent } from "../lib/scholarshipAnalytics";
import { browserAcquisition, readGaIdentity, completionParameters, isCompletionReceipt, isTestApplication, UUID_RE, type CaptureInput } from "../lib/applicationCapture";
import { GA_MEASUREMENT_ID } from "../lib/ga";
import { STEVE_BOOKING_URL } from "../lib/booking";
import { EMAIL_MARKETING_CONSENT_TEXT } from "../lib/applicationCapture";

type FormData = {
  name: string;
  email: string;
  phone: string;
  goal: string;
  coachPreference: "steve" | "kris" | "recommendation";
  age: string;
  monthlyIncome: string;
  trainingExperience: string;
  trainingPainPoints: string[];
  sciencePreference: boolean;
  commitment: string;
  proofConsents: {
    photos: boolean;
    testimonial: boolean;
    caseStudy: boolean;
    socialTag: boolean;
  };
  telegramOptIn: boolean;
  emailMarketingOptIn: boolean;
  serviceInterest: string;
  terms: boolean;
};

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  goal: "",
  coachPreference: "recommendation",
  age: "",
  monthlyIncome: "",
  trainingExperience: "",
  trainingPainPoints: [],
  sciencePreference: false,
  commitment: "",
  proofConsents: {
    photos: false,
    testimonial: false,
    caseStudy: false,
    socialTag: false,
  },
  telegramOptIn: false,
  emailMarketingOptIn: false,
  serviceInterest: "",
  terms: false,
};

const GOALS = [
  "Fat loss",
  "Muscle gain",
  "Both — recomp",
  "Strength",
  "Get consistent again",
];

const PAIN_POINTS = [
  "No time",
  "Stuck — no progress",
  "Nutrition is a mystery",
  "Injuries / pain",
  "I quit when motivation drops",
  "Too much conflicting info",
];

const COMMITMENT_OPTIONS = [
  { value: "0-2days", label: "0–2 days/week" },
  { value: "3-4days", label: "3–4 days/week" },
  { value: "5-6days", label: "5–6 days/week" },
  { value: "daily", label: "Daily" },
];

const SERVICE_OPTIONS = ["VIP Coaching", "Standard Coaching", "Custom Workout Coaching", "Nutrition Coaching", "Self Directed Workout Program", "Titan Forge Community", "In Person Training", "One Time Consultation", "Not Sure Yet"];
const REQUEST_SERVICES = new Set(["Self Directed Workout Program", "Titan Forge Community", "In Person Training", "One Time Consultation"]);

export function LaborDayApplicationForm({ application = false }: { application?: boolean }) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [savingDraft, setSavingDraft] = useState(false);
  const draftSavePending = useRef(false);
  const applicationStarted = useRef(false);
  const draftCaptured = useRef(false);
  const capture = useRef<CaptureInput | null>(null);
  const draftRowId = useRef<string | null>(null);

  useEffect(() => {
    capture.current = browserAcquisition(window.location.search, document.referrer);
    if (application) {
      const plan = new URLSearchParams(window.location.search).get("plan");
      if (plan === "intensive") { window.location.replace("/coaching-intensive#apply"); return; }
      const matched = SERVICE_OPTIONS.find((option) => option.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "") === plan);
      if (matched) setFormData((current) => ({ ...current, serviceInterest: matched }));
    }
    trackScholarshipEvent("scholarship_page_view", { campaign_surface: "landing_page" });
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (!applicationStarted.current) {
      applicationStarted.current = true;
      trackScholarshipEvent("scholarship_application_started", { form_step: step });
    }

    if (type === "checkbox") {
      if (name === "sciencePreference" || name === "telegramOptIn" || name === "emailMarketingOptIn" || name === "terms") {
        setFormData((prev) => ({
          ...prev,
          [name]: (e.target as HTMLInputElement).checked,
        }));
      } else if (name.startsWith("proof_")) {
        const field = name.replace("proof_", "") as keyof FormData["proofConsents"];
        setFormData((prev) => ({
          ...prev,
          proofConsents: {
            ...prev.proofConsents,
            [field]: (e.target as HTMLInputElement).checked,
          },
        }));
      } else if (name.startsWith("painpoint_")) {
        const painpoint = name.replace("painpoint_", "");
        setFormData((prev) => ({
          ...prev,
          trainingPainPoints: (e.target as HTMLInputElement).checked
            ? [...prev.trainingPainPoints, painpoint]
            : prev.trainingPainPoints.filter((p) => p !== painpoint),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (name === "monthlyIncome") {
        trackScholarshipEvent("scholarship_income_range_selected", { form_step: 3 });
      }
    }
  };

  const step1Valid = formData.goal !== "" && formData.commitment !== "" && (!application || formData.serviceInterest !== "");
  const step2Valid =
    formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "";

  const navigateToStep = (nextStep: 1 | 2 | 3) => {
    setStep(nextStep);
    window.requestAnimationFrame(() => {
      document.getElementById("apply")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const captureMetadata = async () => {
    const origin = capture.current ?? browserAcquisition(window.location.search, document.referrer);
    const identity = await readGaIdentity(window.gtag, GA_MEASUREMENT_ID, origin.analyticsConsent);
    capture.current = { ...origin, ...identity };
    return capture.current;
  };

  const captureDraftLead = async () => {
    if (draftCaptured.current) return true;
    const response = await fetch("/api/labor-day-applications/draft", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, capture: await captureMetadata() }),
    });
    if (!response.ok) return false;
    // Keep the draft row id so the final submit updates that row instead of
    // inserting a second one for the same person.
    try {
      const body = (await response.json()) as { applicationId?: string };
      draftRowId.current = body?.applicationId ?? null;
    } catch {
      draftRowId.current = null;
    }
    if (typeof draftRowId.current !== "string" || !UUID_RE.test(draftRowId.current)) {
      draftRowId.current = null;
      return false;
    }
    draftCaptured.current = true;
    if (!isTestApplication(formData.email)) trackScholarshipEvent("scholarship_lead_captured", { form_step: 2 });
    return true;
  };

  const continueFromContact = async (form: HTMLFormElement) => {
    if (draftSavePending.current || !step2Valid || !form.reportValidity()) return;
    draftSavePending.current = true;
    setSavingDraft(true);
    setSubmitError("");
    try {
      if (!(await captureDraftLead())) throw new Error("Draft save failed");
      trackScholarshipEvent("scholarship_application_step_completed", { form_step: 2 });
      trackScholarshipEvent("scholarship_application_step_viewed", { form_step: 3 });
      navigateToStep(3);
    } catch {
      setSubmitError("We couldn't save your details yet. Please try again.");
    } finally {
      draftSavePending.current = false;
      setSavingDraft(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 2) {
      await continueFromContact(e.currentTarget);
      return;
    }
    if (step !== 3 || submitStatus === "submitting") return;
    setSubmitStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/labor-day-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, draftId: draftRowId.current, capture: await captureMetadata() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit application");
      }

      const receipt = await response.json();
      if (!isCompletionReceipt(receipt)) throw new Error("We couldn't confirm your application was saved. Please try again.");
      const completion = completionParameters(receipt, formData.email);
      setSubmitStatus("success");
      if (!application) setFormData(EMPTY_FORM);
      if (completion) {
        trackScholarshipEvent("scholarship_application_submitted", {
          ...completion,
          form_step: 3,
          coach_preference: formData.coachPreference,
        });
        trackScholarshipEvent("generate_lead", {
          ...completion,
          lead_type: "coaching_scholarship_application",
          coach_preference: formData.coachPreference,
        });
      }
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  if (submitStatus === "success") {
    if (application) {
      const request = REQUEST_SERVICES.has(formData.serviceInterest);
      return <div className="form-success" id="apply"><h2>{request ? "Request received" : "Application received"}</h2><p>{request ? "Thank you. We've received your request and will contact you about next steps." : "Thank you for sharing your goals. We've received your application and will contact you about next steps."}</p></div>;
    }
    return (
      <div className="form-success" id="apply">
        <h2>✓ APPLICATION IN</h2>
        <p>
          We read every application personally. Finalists hear from us by email
          &mdash; keep an eye on your inbox.
        </p>
        <p>
          Up to three people get the 30-day 1:1 sprint. A handful of strong applicants get 3
          months of the Science Community free. Either way, you&apos;ll hear from us.
        </p>
        <p>
          Want to talk sooner? Book a free call with Steve:
        </p>
        <p>
          <a
            className="btn btn--ember"
            href={STEVE_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-event="coach_booking_click"
            data-analytics-source="coaching_intensive_success"
            data-analytics-link-kind="booking"
          >
            Book a call with Steve
          </a>
        </p>
        <p style={{ marginBottom: 0 }}>
          Meanwhile —{" "}
          <a
            href="https://instagram.com/titanforgefit"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--steel-100)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            follow @titanforgefit
          </a>{" "}
          to see how the winners train.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="coaching-intensive-form" id="apply">
      <p className="form-step-indicator">STEP {step} OF 3</p>

      {/* STEP 1 — Two taps, zero typing (Geebs funnel pattern) */}
      {step === 1 && (
        <fieldset className="form-section">
          <legend>See If You Qualify</legend>

          <div className="form-group">
            {application && <><label htmlFor="serviceInterest">I&apos;m interested in <span className="required">*</span></label><select id="serviceInterest" name="serviceInterest" required value={formData.serviceInterest} onChange={handleInputChange}><option value="">Select an option</option>{SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}</select></>}
            <label>
              What matters most right now? <span className="required">*</span>
            </label>
            <div className="pill-group">
              {GOALS.map((g) => (
                <label key={g} className={formData.goal === g ? "pill pill--active" : "pill"}>
                  <input
                    type="radio"
                    name="goal"
                    value={g}
                    checked={formData.goal === g}
                    onChange={handleInputChange}
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              Realistic training days per week? <span className="required">*</span>
            </label>
            <div className="pill-group">
              {COMMITMENT_OPTIONS.map((c) => (
                <label
                  key={c.value}
                  className={formData.commitment === c.value ? "pill pill--active" : "pill"}
                >
                  <input
                    type="radio"
                    name="commitment"
                    value={c.value}
                    checked={formData.commitment === c.value}
                    onChange={handleInputChange}
                  />
                  <span>{c.label}</span>
                </label>
              ))}
            </div>
            <small>Honest beats ambitious. Pick what you&apos;ll actually do.</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="next-button"
              disabled={!step1Valid}
              onClick={() => {
                trackScholarshipEvent("scholarship_application_step_completed", { form_step: 1 });
                trackScholarshipEvent("scholarship_application_step_viewed", { form_step: 2 });
                navigateToStep(2);
              }}
            >
              CONTINUE →
            </button>
          </div>
          <small>~3 minutes total. Up to 3 spots. The coaching is free.</small>
        </fieldset>
      )}

      {/* STEP 2 — Contact (lead captured before the heavy questions) */}
      {step === 2 && (
        <fieldset className="form-section">
          <legend>Where Do We Reach You?</legend>

          <div className="form-group">
            <label htmlFor="name">
              Full name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              autoComplete="name"
              placeholder="First Last"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              autoComplete="email"
              placeholder="you@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              Phone <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              autoComplete="tel"
              placeholder="(555) 123-4567"
            />
            <small>Your coach texts finalists to confirm before day 1.</small>
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  id="emailMarketingOptIn"
                  name="emailMarketingOptIn"
                  checked={formData.emailMarketingOptIn}
                  onChange={handleInputChange}
                />
                <span>{EMAIL_MARKETING_CONSENT_TEXT} (optional)</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            {submitError && <div className="error-message" role="alert">{submitError}</div>}
            <button type="button" className="back-button" disabled={savingDraft} onClick={() => navigateToStep(1)}>
              ← BACK
            </button>
            <button
              type="button"
              className="next-button"
              disabled={!step2Valid || savingDraft}
              onClick={(event) => { if (event.currentTarget.form) void continueFromContact(event.currentTarget.form); }}
            >
              {savingDraft ? "SAVING…" : "CONTINUE →"}
            </button>
          </div>
          <small>We only use your details for this application and coaching follow-up.</small>
        </fieldset>
      )}

      {/* STEP 3 — Fit: quick structured context, consent, submit */}
      {step === 3 && (
        <fieldset className="form-section">
          <legend>Last Step — Your Fit</legend>

          <div className="form-group">
            <label>What gets in the way? Pick any that fit.</label>
            <div className="pill-group">
              {PAIN_POINTS.map((point) => (
                <label
                  key={point}
                  className={
                    formData.trainingPainPoints.includes(point) ? "pill pill--active" : "pill"
                  }
                >
                  <input
                    type="checkbox"
                    name={`painpoint_${point}`}
                    checked={formData.trainingPainPoints.includes(point)}
                    onChange={handleInputChange}
                  />
                  <span>{point}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group form-group--split">
            <div>
              <label htmlFor="age">
                Age <span className="required">*</span>
              </label>
              <select id="age" name="age" value={formData.age} onChange={handleInputChange} required>
                <option value="">Select</option>
                <option value="18-25">18–25</option>
                <option value="26-30">26–30</option>
                <option value="31-35">31–35</option>
                <option value="36-45">36–45</option>
                <option value="46-55">46–55</option>
                <option value="56+">56+</option>
              </select>
            </div>
            <div>
              <label htmlFor="trainingExperience">
                Experience <span className="required">*</span>
              </label>
              <select
                id="trainingExperience"
                name="trainingExperience"
                value={formData.trainingExperience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select</option>
                <option value="never">Never trained seriously</option>
                <option value="less-than-1yr">Less than 1 year</option>
                <option value="1-2yrs">1–2 years</option>
                <option value="3-5yrs">3–5 years</option>
                <option value="5plus-yrs">5+ years</option>
                <option value="used-to">Took a break</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="monthlyIncome">
              Which range best matches your monthly take-home income (USD)? <span className="required">*</span>
            </label>
            <select
              id="monthlyIncome"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a range</option>
              <option value="under-2k">Under $2,000</option>
              <option value="2k-5k">$2,000–$5,000</option>
              <option value="5k-10k">$5,000–$10,000</option>
              <option value="10k-20k">$10,000–$20,000</option>
              <option value="20k+">$20,000+</option>
            </select>
          </div>
          <small style={{ marginTop: "-8px" }}>
            This stays private and helps us make sure coaching is realistic after the scholarship.
          </small>

          <div className="form-group" style={{ marginTop: "20px" }}>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="proof_testimonial"
                  checked={formData.proofConsents.testimonial}
                  onChange={handleInputChange}
                />
                <span>If I win, you may share my story/results (optional — you can stay private)</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="telegramOptIn"
                  checked={formData.telegramOptIn}
                  onChange={handleInputChange}
                />
                <span>Add me to the cohort Telegram</span>
              </label>
              <label>
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  required
                />
                <span>
                  I agree to the{" "}
                  <a href="/coaching-intensive/terms" target="_blank" rel="noopener noreferrer">
                    terms &amp; scope
                  </a>{" "}
                  <span className="required">*</span>
                </span>
              </label>
            </div>
          </div>
          <small data-deposit-note style={{ display: "block", marginTop: "-8px", opacity: 0.7 }}>
            Applying is free. If you are selected, a $50 deposit holds your spot. Nothing is charged here.
          </small>

          {submitError && <div className="error-message">{submitError}</div>}

          <div className="form-actions">
            <button type="button" className="back-button" onClick={() => navigateToStep(2)}>
              ← BACK
            </button>
            <button type="submit" className="submit-button" disabled={submitStatus === "submitting"}>
              {submitStatus === "submitting" ? "SUBMITTING…" : (application && REQUEST_SERVICES.has(formData.serviceInterest) ? "Send Request" : "Submit Application")}
            </button>
          </div>
        </fieldset>
      )}
    </form>
  );
}
