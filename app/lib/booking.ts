/**
 * Steve's discovery-call calendar. Verified from his own 2026-07-13 email
 * ("Calendly Link") and the same URL already used across the site
 * (page-more.jsx STEVE_CALENDLY_URL). Override with NEXT_PUBLIC_STEVE_BOOKING_URL
 * if he ever moves it; do not hardcode a second copy anywhere else.
 */
export const STEVE_BOOKING_URL =
  process.env.NEXT_PUBLIC_STEVE_BOOKING_URL?.trim() || "https://calendly.com/titanforgefit/discovery";
