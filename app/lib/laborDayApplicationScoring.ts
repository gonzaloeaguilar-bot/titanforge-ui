export type ApplicationData = {
  name: string;
  email: string;
  phone: string;
  age: string;
  monthlyIncome: string;
  trainingExperience: string;
  trainingPainPoints: string[];
  sciencePreference: boolean;
  goal: string;
  coachPreference: "steve" | "kris" | "recommendation";
  commitment: string;
  proofConsents: { photos: boolean; testimonial: boolean; caseStudy: boolean; socialTag: boolean };
  telegramOptIn: boolean;
  serviceInterest?: string;
  terms: boolean;
};

export type ApplicationSegment = "scholarship" | "hot-lead" | "general-lead";

export function validateApplication(app: Partial<ApplicationData>): string | null {
  if (!app.name || !app.email || !app.phone || !app.goal || !app.commitment || !app.monthlyIncome || !app.trainingExperience) {
    return "Missing required fields";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(app.email)) return "Invalid email address";
  return null;
}

export function scoreApplication(app: ApplicationData): { score: number; segment: ApplicationSegment; notes: string[] } {
  let score = 0;
  const notes: string[] = [];
  const incomeScore = { "20k+": 40, "10k-20k": 35, "5k-10k": 25, "2k-5k": 15, "under-2k": 0 };
  const incomePoints = incomeScore[app.monthlyIncome as keyof typeof incomeScore] || 0;
  score += incomePoints;
  if (incomePoints >= 25) notes.push("Strong income for continuation coaching");

  const experienceScore = { "5plus-yrs": 20, "3-5yrs": 18, "1-2yrs": 15, "used-to": 10, "less-than-1yr": 5, never: 0 };
  const experiencePoints = experienceScore[app.trainingExperience as keyof typeof experienceScore] || 0;
  score += experiencePoints;
  if (experiencePoints >= 15) notes.push("Good training foundation");

  const painPointCount = app.trainingPainPoints.length;
  score += Math.min(painPointCount * 5, 25);
  if (painPointCount >= 2) notes.push(`${painPointCount} relevant pain points — good coaching fit`);

  const commitmentScore = { daily: 20, "5-6days": 18, "3-4days": 15, "0-2days": 5 };
  const commitmentPoints = commitmentScore[app.commitment as keyof typeof commitmentScore] || 0;
  score += commitmentPoints;
  if (commitmentPoints >= 15) notes.push("Realistic training availability");

  if (app.sciencePreference) { score += 10; notes.push("Science-minded (better retention)"); }
  const proofConsentCount = Object.values(app.proofConsents).filter(Boolean).length;
  score += proofConsentCount * 3;
  if (proofConsentCount >= 2) notes.push(`Willing to share proof (${proofConsentCount} consent types)`);
  if (app.telegramOptIn) { score += 5; notes.push("Telegram-engaged"); }

  let segment: ApplicationSegment = "general-lead";
  if (score >= 90 && incomePoints >= 25 && experiencePoints >= 15 && commitmentPoints >= 15) {
    segment = "scholarship";
    notes.push("SCHOLARSHIP TIER: Strong fit for 1:1 coaching");
  } else if (score >= 65 && incomePoints >= 15 && experiencePoints >= 10 && app.telegramOptIn) {
    segment = "hot-lead";
    notes.push("HOT LEAD: Good fit for Telegram community + future coaching");
  } else {
    notes.push("GENERAL LEAD: Email nurture + future offerings");
  }
  return { score, segment, notes };
}
