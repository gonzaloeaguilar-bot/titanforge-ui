/**
 * GA4 measurement ID for titanforgefit.com.
 *
 * This lives in a NEUTRAL module — no "use client" — because both the server
 * layout and the client route-tracker need it. Exporting it from the client
 * component instead produced a silently broken tag: importing a value from a
 * "use client" module into a server component yields a client-reference proxy,
 * so the server-rendered snippet interpolated to
 *   gtag('config','function(){throw Error("Attempted to call GA_MEASUREMENT_ID...
 * which is a valid-looking script that can never report anything.
 *
 * The ID is a constant with an env override rather than env-only. An env-only
 * lookup is what made the original outage silent — nothing rendered, nothing
 * errored, and the number just went flat from 2026-08-06 while six days of
 * title/meta and internal-link work shipped against a site that could not report
 * whether any of it worked. A GA4 measurement ID ships in client HTML on every
 * page load, so it is not a secret worth trading that failure mode for.
 */
import { gaMeasurementId } from "./analyticsMeasurementId.mjs";

export const GA_MEASUREMENT_ID = gaMeasurementId(process.env);
