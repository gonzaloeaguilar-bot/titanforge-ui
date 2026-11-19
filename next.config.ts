import type { NextConfig } from "next";
import { retiredRoutes } from "./app/lib/retiredRoutes.mjs";

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    // The Labor Day campaign became the year-round coaching scholarship. Its
    // pages are deleted, but the URLs stay redirected: real applications came in
    // through /labor-day (it is still the landing_path on every scholarship row
    // in site_applications), so inbound links from IG, DMs and email must not
    // start 404ing.
    return [
      { source: "/pages/apply", destination: "/apply", permanent: true },
      { source: "/collections/answer-engine-readiness", destination: "/guides/how-we-read-a-study", permanent: true },
      { source: "/collections/chatgpt-perplexity-gemini-citation-readiness", destination: "/guides/how-we-read-a-study", permanent: true },
      ...Object.entries(retiredRoutes).map(([source, destination]) => ({ source, destination, statusCode: 301 })),
      { source: "/labor-day", destination: "/coaching-intensive", permanent: true },
      { source: "/labor-day/apply", destination: "/coaching-intensive#apply", permanent: true },
      { source: "/labor-day/terms", destination: "/coaching-intensive/terms", permanent: true },
    ];
  },
};

export default nextConfig;
