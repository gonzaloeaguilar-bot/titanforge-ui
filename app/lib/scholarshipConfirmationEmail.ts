import { STEVE_BOOKING_URL } from "./booking.ts";

type ScholarshipConfirmationRecipient = {
  name: string;
  email: string;
};

function requiredEmailEnv(name: "RESEND_API_KEY" | "SCHOLARSHIP_EMAIL_FROM") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error("Scholarship confirmation email is not configured");
  return value;
}

/**
 * Queues a simple receipt without exposing internal qualification results or
 * the applicant's financial answers.
 */
export async function sendScholarshipConfirmationEmail(
  application: ScholarshipConfirmationRecipient,
) {
  const apiKey = requiredEmailEnv("RESEND_API_KEY");
  const from = requiredEmailEnv("SCHOLARSHIP_EMAIL_FROM");
  const replyTo = process.env.SCHOLARSHIP_EMAIL_REPLY_TO?.trim();
  const text = [
    `Hi ${application.name.trim()},`,
    "",
    "We received your application for the Titan Forge 30-Day Coaching Scholarship.",
    "Our team will review it and email you with the next steps.",
    "",
    "Want to talk sooner? Pick a time for a free call with Steve here:",
    STEVE_BOOKING_URL,
    "",
    "Thank you for taking the time to apply.",
    "",
    "Titan Forge Fitness",
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [application.email.trim()],
      ...(replyTo ? { reply_to: replyTo } : {}),
      subject: "We received your Titan Forge scholarship application",
      text,
    }),
  });

  if (!response.ok) throw new Error("Scholarship confirmation email could not be sent");
}
