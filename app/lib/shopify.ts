import { catalogSummary } from "./shopifyPresentation.js";

const DEFAULT_STORE_URL = "https://titan-vault-3612.myshopify.com";
const DEFAULT_CHECKOUT_URL = "https://shop.titanforgefit.com";
const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 250;

const HELD_PRODUCT_HANDLES = new Set([
  "bone-heart-support",
  "testosterone-booster",
  "resveratrol-50-600mg",
  "ashwagandha",
  "multivitamin-bear-gummies-adult",
  "sleep-well-gummies-adult",
  "l-glutamine-powder",
  "probiotic-40-billion-with-prebiotics",
  "ultra-cleanse-smoothie-greens",
]);

// These are coaching offers, not shop merchandise. Keep their direct Shopify
// pages intact while excluding them from supplement/apparel catalog listings.
// 2026-08-22: the first two handles were renamed off Kris's brand on Steve's store
// (geebs-science-based-community -> titan-forge-science-based-community,
//  geebs-science-titan-app-membership -> titan-forge-community-fitbudd-app).
// The rename silently un-excluded them and both reappeared in /shop, because this list
// keys on handle and #117's test mocks fetch with its own fixture handles - so nothing
// compared this list against the real catalog. scripts/test-coaching-exclusion-live.mjs
// now does exactly that. The old handles are retained so a revert cannot un-exclude them.
const COACHING_PRODUCT_HANDLES = new Set([
  "titan-forge-community-fitbudd-app",
  "titan-forge-science-based-community",
  "geebs-one-time-consultation",
  // retained post-rename; harmless if absent from the catalog
  "geebs-science-titan-app-membership",
  "geebs-science-based-community",
]);

function isExcludedFromShop(handle: string) {
  return HELD_PRODUCT_HANDLES.has(handle) || COACHING_PRODUCT_HANDLES.has(handle);
}

type ShopifyVariant = {
  id?: number;
  title?: string;
  price?: string;
  available?: boolean;
};

type ShopifyImage = { src?: string; alt?: string };

type ShopifySourceProduct = {
  id?: number;
  title?: string;
  handle?: string;
  product_type?: string;
  body_html?: string;
  tags?: string[] | string;
  variants?: ShopifyVariant[];
  images?: ShopifyImage[];
  published_at?: string;
  updated_at?: string;
};

export type CatalogProduct = {
  id?: number;
  title: string;
  handle: string;
  category: string;
  description: string;
  summary: string;
  price?: number;
  priceLabel?: string;
  available: boolean;
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  productUrl: string;
  updatedAt?: string;
};

export const SHOPIFY_STORE_URL = (process.env.SHOPIFY_STORE_URL || DEFAULT_STORE_URL)
  .trim()
  .replace(/\/$/, "");
export const SHOPIFY_CHECKOUT_URL = (process.env.SHOPIFY_CHECKOUT_URL || DEFAULT_CHECKOUT_URL)
  .trim()
  .replace(/\/$/, "");

function stripHtml(value = "") {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function categoryFor(product: ShopifySourceProduct) {
  if (product.product_type) return product.product_type;
  const tags = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === "string"
      ? product.tags.split(",").map((tag) => tag.trim())
      : [];
  if (tags.some((tag) => /hoodie|shirt|apparel|clothing/i.test(tag))) return "Apparel";
  return "Support tool";
}

function mapProduct(product: ShopifySourceProduct): CatalogProduct | null {
  if (!product.handle || !product.title) return null;
  const variants = product.variants ?? [];
  const prices = variants.map((variant) => Number(variant.price)).filter(Number.isFinite);
  const price = prices.length ? Math.min(...prices) : undefined;

  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    category: categoryFor(product),
    description: stripHtml(product.body_html),
    summary: catalogSummary(product),
    price,
    priceLabel: price === undefined
      ? undefined
      : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price),
    available: variants.some((variant) => variant.available),
    variants,
    images: (product.images ?? []).filter((image) => Boolean(image.src)),
    productUrl: `${SHOPIFY_CHECKOUT_URL}/products/${product.handle}`,
    updatedAt: product.updated_at,
  };
}

export async function getCatalog(limit?: number): Promise<CatalogProduct[]> {
  const configured = Number(process.env.SHOPIFY_PRODUCT_LIMIT || DEFAULT_LIMIT);
  const requested = limit ?? (Number.isFinite(configured) && configured > 0 ? configured : DEFAULT_LIMIT);
  const safeLimit = Math.min(Math.max(Math.floor(requested), 1), MAX_LIMIT);
  const endpoint = `${SHOPIFY_STORE_URL}/products.json?limit=${MAX_LIMIT}`;
  const response = await fetch(endpoint, {
    headers: { accept: "application/json" },
    next: { revalidate: 1800 },
  });
  if (!response.ok) throw new Error(`Shopify catalog returned ${response.status}`);
  const payload = (await response.json()) as { products?: ShopifySourceProduct[] };
  return (payload.products ?? [])
    .filter((product) => Boolean(product.handle) && !isExcludedFromShop(product.handle!))
    .map(mapProduct)
    .filter((product): product is CatalogProduct => product !== null)
    .slice(0, safeLimit);
}

export async function getCatalogProduct(handle: string): Promise<CatalogProduct | null> {
  const products = await getCatalog(MAX_LIMIT);
  return products.find((product) => product.handle === handle) ?? null;
}
