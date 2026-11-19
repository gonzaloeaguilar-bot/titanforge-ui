/**
 * Tell the team when somebody applies for the scholarship.
 *
 * WHY THIS DID NOT EXIST. sendScholarshipConfirmationEmail sends to
 * `[application.email]` — the APPLICANT. Nobody on our side was emailed at all, so
 * a scholarship application's only inbound signal was a row appearing in Supabase
 * that somebody had to go and look at. Gonzalo asked for the alert; this is it.
 *
 * NEVER THROWS, on purpose. The sibling module throws when it is unconfigured
 * (`requiredEmailEnv`), and the route awaits it AFTER the application is already
 * saved — so a Resend outage returned HTTP 500 "Failed to process application" to
 * somebody whose application had in fact been stored. They would reasonably
 * re-submit or give up. A notification is not allowed to fail a submission, so this
 * one reports a status instead of raising.
 */

export type TeamAlertStatus = "sent" | "skipped" | "failed";

export type ScholarshipTeamAlertInput = {
  applicationId: string;
  name: string;
  email: string;
  phone?: string;
  goal?: string;
  commitment?: string;
  monthlyIncome?: string;
  segment: string;
  score: number;
  qualificationNotes?: string[];
  /** Structurally compatible with lib/applicantGeo AppliedFrom. */
  appliedFrom?: {
    phoneCountry?: string | null;
    phoneRegion?: string | null;
    ipCountry?: string | null;
    ipRegion?: string | null;
    ipCity?: string | null;
  } | null;
  submittedAt: string;
  serviceInterest?: string;
};

/**
 * A place a human can read, not a stringified object. The phone country is kept
 * separate from the IP location on purpose: when they disagree that is worth
 * seeing, because it is usually somebody travelling or using a foreign number.
 */
export function formatAppliedFrom(
  geo: ScholarshipTeamAlertInput["appliedFrom"],
): string | undefined {
  if (!geo) return undefined;
  const place = [geo.ipCity, geo.ipRegion, geo.ipCountry].filter(Boolean).join(", ");
  const phone = [geo.phoneRegion, geo.phoneCountry].filter(Boolean).join(", ");
  if (place && phone) return `${place} (phone ${phone})`;
  return place || (phone ? `phone ${phone}` : undefined);
}

/**
 * Strip anything that could break out of a header line.
 *
 * Review flagged that `name` and `segment` go into the email `subject` unsanitised and
 * validateApplication does not block control characters. Resend takes JSON over HTTPS
 * and builds the headers itself, so this is not an injection today — but the applicant
 * controls `name`, a subject is a header, and "the current transport happens to be
 * safe" is a property of the transport rather than of this code. Strip at the boundary
 * where the value becomes a header, so it stays true if the transport ever changes.
 */
export function headerSafe(value: string, max = 120): string {
  return value
    .replace(/[\r\n\u0000-\u001F\u007F]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function recipients(): string[] {
  return (process.env.SCHOLARSHIP_NOTIFY_EMAIL_TO ?? "")
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);
}

export function buildTeamAlertText(app: ScholarshipTeamAlertInput): string {
  const line = (label: string, value?: string | null) =>
    `${label}: ${value && value.trim() ? value.trim() : "not given"}`;

  return [
    `${app.segment} scholarship application from ${app.name.trim()}.`,
    "",
    line("Name", app.name),
    line("Email", app.email),
    line("Phone", app.phone),
    line("Applying from", formatAppliedFrom(app.appliedFrom)),
    "",
    line("Main goal", app.goal),
    line("Interested in", app.serviceInterest),
    line("Training days a week", app.commitment),
    line("Monthly income band", app.monthlyIncome),
    "",
    `Segment: ${app.segment}`,
    `Score: ${app.score}`,
    app.qualificationNotes?.length
      ? `Notes: ${app.qualificationNotes.join("; ")}`
      : "Notes: none",
    "",
    `Submitted: ${app.submittedAt}`,
    `Application id: ${app.applicationId}`,
  ].join("\n");
}

export async function sendScholarshipTeamAlert(
  app: ScholarshipTeamAlertInput,
): Promise<TeamAlertStatus> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  // Reuses the sender the applicant confirmation already sends from, which is the
  // one verified with Resend on this domain. Requiring a second, separately-set
  // sender is exactly why application email on the Geebs site silently never sent.
  const from = process.env.SCHOLARSHIP_EMAIL_FROM?.trim();
  const to = recipients();

  if (!apiKey || !from || to.length === 0) return "skipped";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        // Segment and name in the subject so it is triageable from the inbox
        // without opening it.
        subject: headerSafe(`${app.segment} scholarship application — ${app.name}`),
        text: buildTeamAlertText(app),
      }),
    });

    if (!response.ok) {
      console.error(
        `scholarshipTeamAlert: Resend returned ${response.status} — nobody was alerted`,
      );
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error(
      `scholarshipTeamAlert: could not reach Resend (${
        error instanceof Error ? error.message : String(error)
      }) — nobody was alerted`,
    );
    return "failed";
  }
}
