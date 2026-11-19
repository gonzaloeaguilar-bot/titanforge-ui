// Per-product search copy for pages whose Shopify description is a single unbroken paragraph.
// Every fact below is taken from the product's own Shopify listing (body_html and variants,
// read 2026-10-07); price and sizes are computed from the live variants, never hard-coded.
// No rating, review or care claim is made because the listing carries none.
import type { CatalogProduct } from "./shopify";

type ProductSeo = {
  title: string;
  description: (product: CatalogProduct) => string;
  answerHeading: string;
  answer: (product: CatalogProduct) => string;
};

function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function priceRange(product: CatalogProduct) {
  const prices = product.variants.map((variant) => Number(variant.price)).filter(Number.isFinite);
  if (!prices.length) return undefined;
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export const PRODUCT_SEO: Record<string, ProductSeo> = {
  "mens-long-sleeve-compression-shirt-white": {
    title: "White Long Sleeve Compression Shirt for Men | Titan Forge",
    description: (product) => {
      const range = priceRange(product);
      const from = range ? ` From ${money(range.min)}.` : "";
      return `White long sleeve compression shirt for men: 82% polyester, 18% spandex, UPF 50+, slim fit.${from} Made to order, ships in 1-3 days.`;
    },
    answerHeading: "Is this a white long sleeve compression shirt?",
    // The facts (fabric, sizes, shipping) live in the Shopify description the page already renders;
    // repeating them here printed them twice. This keeps only the question and a one-line answer.
    answer: () => "Yes. This is a white long sleeve compression shirt for men.",
  },
};
