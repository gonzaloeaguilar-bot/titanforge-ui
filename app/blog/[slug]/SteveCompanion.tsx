"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

type Faq = { question: string; answer: string };
type Variant = "control" | "dock" | "dm";
type Tab = "answer" | "questions" | "fit";
type IntakeStep = 1 | 2 | 3 | 4;

type TitanTrackEvent = (
  eventName: "experiment_exposure" | "cta_click" | "form_start" | "form_step" | "form_submit",
  params?: Record<string, string | number | boolean>,
) => unknown;

type SteveCompanionProps = {
  slug: string;
  title: string;
  shortAnswer: string;
  faqs: Faq[];
};

const EXPERIMENT_ID = "coach_companion_tf";
const HOLDOUT_KEY = "tf_steve_companion_holdout";
const DM_SEEN_KEY = "tf_steve_companion_dm_seen";
const DISMISSED_KEY = "tf_steve_companion_dismissed";

const GOALS = ["Build muscle", "Lose fat", "Get consistent"];
const LOCATIONS = ["Englewood gym", "Online coaching", "Not sure yet"];
const BLOCKERS = ["Time", "Nutrition", "Knowing what to do"];

function track(eventName: Parameters<TitanTrackEvent>[0], params: Parameters<TitanTrackEvent>[1] = {}) {
  const tracker = (window as unknown as { titanTrackEvent?: TitanTrackEvent }).titanTrackEvent;
  if (typeof tracker !== "function") return;
  tracker(eventName, {
    brand: "titan",
    page_type: "blog",
    locale: "en",
    experiment_id: EXPERIMENT_ID,
    ...params,
  });
}

export default function SteveCompanion({ slug, title, shortAnswer, faqs }: SteveCompanionProps) {
  const [mounted, setMounted] = useState(false);
  const [variant, setVariant] = useState<Variant>("dock");
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>(shortAnswer ? "answer" : faqs.length ? "questions" : "fit");
  const [intakeStep, setIntakeStep] = useState<IntakeStep>(1);
  const [intakeStarted, setIntakeStarted] = useState(false);
  const [goal, setGoal] = useState("");
  const [location, setLocation] = useState("");
  const [blocker, setBlocker] = useState("");

  const answeredTitle = useMemo(() => title.replace(/\s+/g, " ").trim(), [title]);

  useEffect(() => {
    let assigned: Variant = "dock";

    try {
      let bucket = localStorage.getItem(HOLDOUT_KEY);
      if (!bucket) {
        const forced = new URLSearchParams(window.location.search).get("tf_companion_variant");
        bucket = forced === "control" ? "control" : Math.random() < 0.2 ? "control" : "treatment";
        localStorage.setItem(HOLDOUT_KEY, bucket);
      }

      if (bucket === "control") {
        setVariant("control");
        setMounted(true);
        track("experiment_exposure", { experiment_id: EXPERIMENT_ID, variant: "control" });
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const dmFirstVisit = params.get("utm_medium") === "dm" && !sessionStorage.getItem(DM_SEEN_KEY);
      const dismissed = sessionStorage.getItem(DISMISSED_KEY) === "1";
      assigned = dmFirstVisit ? "dm" : "dock";
      setVariant(assigned);
      if (dmFirstVisit) {
        sessionStorage.setItem(DM_SEEN_KEY, "1");
        if (!dismissed) setOpen(true);
      }
      track("experiment_exposure", { experiment_id: EXPERIMENT_ID, variant: assigned });
    } catch {
      setVariant("dock");
      track("experiment_exposure", { experiment_id: EXPERIMENT_ID, variant: "dock" });
    }

    setMounted(true);
  }, []);

  const closeSheet = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(DISMISSED_KEY, "1");
    } catch {}
    track("cta_click", {
      cta_id: "steve_companion_close",
      cta_text: "Close",
      cta_position: "blog_companion_sheet",
      variant,
    });
  }, [variant]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-steve-companion-open", open);
    return () => document.documentElement.removeAttribute("data-steve-companion-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSheet();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeSheet]);

  const openSheet = useCallback(() => {
    setOpen(true);
    track("cta_click", {
      cta_id: "steve_companion_open",
      cta_text: "Ask Steve",
      cta_position: "blog_companion_dock",
      variant,
    });
  }, [variant]);

  const startIntake = () => {
    if (intakeStarted) return;
    setIntakeStarted(true);
    track("form_start", { form_id: "steve_companion_fit_check", variant });
  };

  const selectTab = (nextTab: Tab) => {
    setTab(nextTab);
    if (nextTab === "fit") startIntake();
  };

  const choose = (step: 1 | 2 | 3, value: string) => {
    startIntake();
    if (step === 1) setGoal(value);
    if (step === 2) setLocation(value);
    if (step === 3) setBlocker(value);
    track("form_step", {
      form_id: "steve_companion_fit_check",
      step: String(step),
      variant,
    });
    const nextStep = (step + 1) as IntakeStep;
    setIntakeStep(nextStep);
    if (step === 3) {
      track("form_submit", { form_id: "steve_companion_fit_check", variant });
    }
  };

  const resetIntake = () => {
    setGoal("");
    setLocation("");
    setBlocker("");
    setIntakeStep(1);
    setIntakeStarted(false);
  };

  if (!mounted || variant === "control") return null;

  return (
    <>
      <button
        type="button"
        className="steve-companion-dock"
        onClick={openSheet}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-steve-companion-dock
      >
        <img src="/companion/steve-72.png" alt="" width={72} height={72} />
        <span>STEVE</span>
      </button>

      {open && (
        <div className="steve-companion-shell" role="presentation" data-steve-companion-sheet>
          <section
            className="steve-companion-sheet"
            role="dialog"
            aria-modal="false"
            aria-labelledby="steve-companion-title"
          >
            <div className="steve-companion-head">
              <div>
                <p className="steve-companion-label">STEVE</p>
                <h2 id="steve-companion-title">Quick help for this post</h2>
              </div>
              <button type="button" className="steve-companion-close" onClick={closeSheet} aria-label="Close Steve">
                Close
              </button>
            </div>

            <div className="steve-companion-tabs" role="tablist" aria-label="Steve companion sections">
              <button type="button" aria-selected={tab === "answer"} onClick={() => selectTab("answer")}>
                Short answer
              </button>
              <button type="button" aria-selected={tab === "questions"} onClick={() => selectTab("questions")}>
                Questions
              </button>
              <button type="button" aria-selected={tab === "fit"} onClick={() => selectTab("fit")}>
                Fit check
              </button>
            </div>

            {tab === "answer" && (
              <div className="steve-companion-panel">
                <p className="steve-companion-kicker">From the article</p>
                <h3>{answeredTitle}</h3>
                <p>{shortAnswer || "This post answers the question directly in the article and FAQ below."}</p>
              </div>
            )}

            {tab === "questions" && (
              <div className="steve-companion-panel">
                <p className="steve-companion-kicker">FAQ from this post</p>
                {faqs.length ? (
                  <div className="steve-companion-faqs">
                    {faqs.slice(0, 4).map((faq) => (
                      <details key={faq.question}>
                        <summary>{faq.question}</summary>
                        <p>{faq.answer}</p>
                      </details>
                    ))}
                  </div>
                ) : (
                  <p>This post does not have a separate FAQ section.</p>
                )}
              </div>
            )}

            {tab === "fit" && (
              <div className="steve-companion-panel">
                <p className="steve-companion-kicker">Is coaching for you?</p>
                {intakeStep === 1 && <ChoiceGroup title="What are you trying to do?" choices={GOALS} onChoose={(value) => choose(1, value)} />}
                {intakeStep === 2 && <ChoiceGroup title="Where would you train?" choices={LOCATIONS} onChoose={(value) => choose(2, value)} />}
                {intakeStep === 3 && <ChoiceGroup title="What gets in the way?" choices={BLOCKERS} onChoose={(value) => choose(3, value)} />}
                {intakeStep === 4 && (
                  <div className="steve-companion-result">
                    <p>
                      You picked {goal}, {location.toLowerCase()}, and {blocker.toLowerCase()}. Start with the coaching application, or use the free readiness check if you want a lighter next step.
                    </p>
                    <div className="steve-companion-actions">
                      <Link
                        href="/coaching-intensive#apply"
                        onClick={() =>
                          track("cta_click", {
                            cta_id: "steve_companion_apply",
                            cta_text: "Apply for coaching",
                            cta_position: "blog_companion_fit_check",
                            variant,
                          })
                        }
                      >
                        Apply for coaching
                      </Link>
                      <Link
                        href="/free/forge-readiness-check"
                        onClick={() =>
                          track("cta_click", {
                            cta_id: "steve_companion_readiness_check",
                            cta_text: "Free readiness check",
                            cta_position: "blog_companion_fit_check",
                            variant,
                          })
                        }
                      >
                        Free readiness check
                      </Link>
                    </div>
                    <button type="button" className="steve-companion-reset" onClick={resetIntake}>
                      Start over
                    </button>
                  </div>
                )}
              </div>
            )}

            <p className="steve-companion-source">Answers from this article.</p>
          </section>
        </div>
      )}
    </>
  );
}

function ChoiceGroup({
  title,
  choices,
  onChoose,
}: {
  title: string;
  choices: string[];
  onChoose: (value: string) => void;
}) {
  return (
    <div className="steve-companion-choices">
      <h3>{title}</h3>
      {choices.map((choice) => (
        <button type="button" key={choice} onClick={() => onChoose(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
}
