import type { MetadataRoute } from "next";
import { ALLOW_INDEXING, SITE_ORIGIN } from "./lib/titanSeo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ALLOW_INDEXING
      ? [
          { userAgent: "*", allow: "/" },
          { userAgent: "OAI-SearchBot", allow: "/" },
          { userAgent: "GPTBot", allow: "/" },
          { userAgent: "ChatGPT-User", allow: "/" },
          { userAgent: "ClaudeBot", allow: "/" },
          { userAgent: "PerplexityBot", allow: "/" },
          { userAgent: "Perplexity-User", allow: "/" },
          { userAgent: "Googlebot", allow: "/" },
          { userAgent: "Google-Extended", allow: "/" },
          { userAgent: "Google-Agent", allow: "/" },
        ]
      : [
          { userAgent: "*", disallow: "/" },
          { userAgent: "OAI-SearchBot", disallow: "/" },
          { userAgent: "GPTBot", disallow: "/" },
          { userAgent: "ChatGPT-User", disallow: "/" },
          { userAgent: "ClaudeBot", disallow: "/" },
          { userAgent: "PerplexityBot", disallow: "/" },
          { userAgent: "Perplexity-User", disallow: "/" },
          { userAgent: "Googlebot", disallow: "/" },
          { userAgent: "Google-Extended", disallow: "/" },
          { userAgent: "Google-Agent", disallow: "/" },
        ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: new URL(SITE_ORIGIN).host,
  };
}
