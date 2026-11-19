import type { MetadataRoute } from "next";
import { routes, SITE_ORIGIN, isPublicConsumerRoute, isSitemapRoute, ALLOW_INDEXING } from "./lib/titanSeo";

import { getAllPosts } from "../lib/blog";
import { getAllScience } from "../lib/science";
import { lastmodForRoute } from "./lib/routeLastmod.mjs";

// Undated posts only. Route dates come from the committed ledger
// (app/lib/routeLastmod.json, written by scripts/route-lastmod.mjs): a page's own
// declared date where it has one, else the day its content last changed. A route
// with no ledger entry gets no <lastmod> at all rather than a guessed one.
const SITEMAP_BASELINE_LASTMOD = "2026-08-10";

function lastModifiedForRoute(path: string) {
  const day = lastmodForRoute(path);
  return day ? new Date(`${day}T00:00:00.000Z`) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseRoutes = routes
    // isSitemapRoute adds the templated-noindex exclusion on top of the consumer filter.
    .filter((route) => isPublicConsumerRoute(route.path, ALLOW_INDEXING, route) && isSitemapRoute(route.path, ALLOW_INDEXING, route))
    .map((route) => ({
      url: `${SITE_ORIGIN}${route.path === "/" ? "" : route.path}`,
      lastModified: lastModifiedForRoute(route.path),
      changeFrequency: (route.path === "/" || route.path === "/resources" ? "weekly" : "monthly") as any,
      priority: route.priority ?? 0.7,
    }));
    
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${SITE_ORIGIN}/blog/${post.slug}`,
    lastModified: new Date(`${post.date || SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`),
    changeFrequency: "weekly" as any,
    priority: 0.8,
  }));
  
  const blogIndex = {
    url: `${SITE_ORIGIN}/blog`,
    lastModified: blogPosts.length
      ? new Date(`${blogPosts[0].date || SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`)
      : new Date(`${SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`),
    changeFrequency: "daily" as any,
    priority: 0.9,
  };

  const sciencePosts = getAllScience();
  const scienceRoutes = sciencePosts.map((post) => ({
    url: `${SITE_ORIGIN}/science/${post.slug}`,
    lastModified: new Date(`${post.updated || post.date || SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`),
    changeFrequency: "weekly" as any,
    priority: 0.8,
  }));

  const scienceIndex = {
    url: `${SITE_ORIGIN}/science`,
    lastModified: sciencePosts.length
      ? new Date(`${sciencePosts[0].date || SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`)
      : new Date(`${SITEMAP_BASELINE_LASTMOD}T00:00:00.000Z`),
    changeFrequency: "daily" as any,
    priority: 0.9,
  };

  // Product pages are mirrors of shop.titanforgefit.com and canonicalise to it, so they
  // stay out of this sitemap: the Shopify store lists them in its own sitemap.
  return [...baseRoutes, blogIndex, ...blogRoutes, scienceIndex, ...scienceRoutes];
}
