"use client";

import { useEffect, useState } from "react";
import { trackScholarshipEvent } from "../lib/scholarshipAnalytics";

type Coach = "steve" | "kris";

const COACHES: Record<Coach, {
  name: string;
  specialty: string;
  image: string;
  bio: string;
  detail: string;
}> = {
  steve: {
    name: "Steve Ginevan, PhD",
    specialty: "Strength Training",
    image: "/assets/images/site-founder.jpg",
    bio: "Steve builds strength programs around your schedule, training history, and progressive goals—not a generic template.",
    detail: "During your 30 days, you will receive a personalized program, weekly form feedback, macro guidance, and clear methodology documents.",
  },
  kris: {
    name: "Kris Oddo",
    specialty: "Nutrition & Compliance",
    image: "/assets/images/kris-hero.jpg",
    bio: "Kris builds nutrition coaching around travel, family, work, and real life—without guilt or rigid meal plans.",
    detail: "During your 30 days, you will receive a practical meal framework, compliance tracking, a cook-along, and progress check-ins.",
  },
};

export function CoachPortraits() {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const coach = selectedCoach ? COACHES[selectedCoach] : null;

  useEffect(() => {
    if (!selectedCoach) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCoach(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCoach]);

  return (
    <>
      <div className="coaching-intensive__coach-portraits" aria-label="Your coaches: Steve Ginevan and Kris Oddo">
        {(Object.keys(COACHES) as Coach[]).map((key) => {
          const item = COACHES[key];
          return (
            <figure key={key}>
              <button
                className={`coach-portrait coach-portrait--${key}`}
                type="button"
                onClick={() => {
                  trackScholarshipEvent("scholarship_coach_profile_opened", { coach: key });
                  setSelectedCoach(key);
                }}
                aria-haspopup="dialog"
                aria-label={`Learn about ${item.name}`}
              >
                <span className="sr-only">Learn about {item.name}</span>
              </button>
              <figcaption><strong>{key === "steve" ? "Steve" : "Kris"}</strong><span>{key === "steve" ? "Strength" : "Nutrition"}</span></figcaption>
            </figure>
          );
        })}
      </div>

      {coach && (
        <div className="coach-modal" role="presentation" onMouseDown={() => setSelectedCoach(null)}>
          <section
            className="coach-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="coach-modal__close" type="button" onClick={() => setSelectedCoach(null)} aria-label="Close coach profile">×</button>
            <img className={`coach-modal__image coach-modal__image--${selectedCoach}`} src={coach.image} alt={coach.name} />
            <div className="coach-modal__body">
              <p className="coach-modal__specialty">{coach.specialty}</p>
              <h2 id="coach-modal-title">{coach.name}</h2>
              <p>{coach.bio}</p>
              <p className="coach-modal__detail">{coach.detail}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export function CoachProfileButton({ coach }: { coach: Coach }) {
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null);
  const item = COACHES[coach];

  useEffect(() => {
    if (!selectedCoach) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedCoach(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedCoach]);

  return (
    <>
      <button
        className={`coach-portrait coach-portrait--card coach-portrait--${coach}`}
        type="button"
        onClick={() => {
          trackScholarshipEvent("scholarship_coach_profile_opened", { coach, surface: "coach_section" });
          setSelectedCoach(coach);
        }}
        aria-haspopup="dialog"
        aria-label={`Learn about ${item.name}`}
      >
        <span className="sr-only">Learn about {item.name}</span>
      </button>

      {selectedCoach && (
        <div className="coach-modal" role="presentation" onMouseDown={() => setSelectedCoach(null)}>
          <section
            className="coach-modal__card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="coach-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="coach-modal__close" type="button" onClick={() => setSelectedCoach(null)} aria-label="Close coach profile">×</button>
            <img className={`coach-modal__image coach-modal__image--${coach}`} src={item.image} alt={item.name} />
            <div className="coach-modal__body">
              <p className="coach-modal__specialty">{item.specialty}</p>
              <h2 id="coach-modal-title">{item.name}</h2>
              <p>{item.bio}</p>
              <p className="coach-modal__detail">{item.detail}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
