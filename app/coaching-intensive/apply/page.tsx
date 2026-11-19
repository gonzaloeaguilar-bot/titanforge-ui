import { redirect } from "next/navigation";

// The application form lives directly on the landing page now — one page, no funnel hops.
export default function CoachingIntensiveApplyPage() {
  redirect("/coaching-intensive#apply");
}
