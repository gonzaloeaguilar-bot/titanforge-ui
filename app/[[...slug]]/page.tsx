import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CanonicalBundleLoader from "../CanonicalBundleLoader";
import HomeHeroPreload from "../HomeHeroPreload";
import { routeMetaForGenerator, staticRouteContent } from "../lib/staticRouteContent.mjs";
import {
  getRouteMeta,
  jsonLdForRoute,
  metadataForRoute,
  routeFromSlug,
  routes,
} from "../lib/titanSeo";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export function generateStaticParams() {
  return routes.map((route) => ({
    slug: route.path === "/" ? undefined : route.path.slice(1).split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteMeta(routeFromSlug(slug));
  if (!route) return {};
  return metadataForRoute(route);
}

export default async function CanonicalTitanPage({ params }: PageProps) {
  const { slug } = await params;
  const route = getRouteMeta(routeFromSlug(slug));
  if (!route) notFound();
  const generatorMeta = routeMetaForGenerator(route.path);
  if (!generatorMeta) notFound();
  const crawlerHtml = staticRouteContent(route.path, generatorMeta);

  return (
    <>
      {route.path === "/" && <HomeHeroPreload />}
      <script
        type="application/ld+json"
        data-titan-static-jsonld="true"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdForRoute(route)) }}
      />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div
        id="root"
        data-next-canonical-route={route.path}
        dangerouslySetInnerHTML={{ __html: crawlerHtml }}
      />
      <CanonicalBundleLoader />
    </>
  );
}
