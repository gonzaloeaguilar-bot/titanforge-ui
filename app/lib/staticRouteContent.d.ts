export type GeneratorRouteMeta = {
  title: string;
  heading?: string;
  description: string;
  type: "WebPage" | "Service" | "Article" | "CollectionPage" | "AboutPage" | "ContactPage";
  intent: string;
  keywords: string;
};

export function routeMetaForGenerator(route: string): GeneratorRouteMeta | undefined;
export function isConsumerCopyPair(pair: readonly [string, string] | [string, string]): boolean;
export function staticFaqsForRoute(route: string, meta?: GeneratorRouteMeta): [string, string][];
export function staticRouteContent(route: string, meta: GeneratorRouteMeta): string;
export function generateStaticRouteFiles(): Promise<void>;
