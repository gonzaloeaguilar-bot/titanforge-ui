import type { Metadata } from "next";
import Link from "next/link";
import { getCatalog, SHOPIFY_CHECKOUT_URL, type CatalogProduct } from "../lib/shopify";
import { catalogImageUrl } from "../lib/shopifyPresentation.js";

export const revalidate = 1800;

export const metadata: Metadata = {
  title: "Titan Forge Fitness Shop | Apparel, Supplements & Memberships",
  description: "Browse the live Titan Forge Fitness catalog on titanforgefit.com, then complete secure checkout through Shopify.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  let products: CatalogProduct[] = [];
  try {
    products = await getCatalog();
  } catch (error) {
    // The checkout remains available even if Shopify is temporarily unreachable.
    console.warn("[TitanForgeShop] Rendering checkout-only shop; catalog is unavailable.", error);
  }

  return (
    <main className="catalog-page" id="main-content">
      <nav className="catalog-nav" aria-label="Shop navigation">
        <Link href="/">Titan Forge Fitness</Link>
        <a href={SHOPIFY_CHECKOUT_URL}>Shopify checkout</a>
      </nav>
      <header className="catalog-hero">
        <p className="catalog-kicker">Shop &amp; support</p>
        <h1>Supplement tools. Not the strategy.</h1>
        <p>Explore our Titan Forge Fitness store featuring supplements, apparel, and more. Training, nutrition, sleep, hydration, recovery, and consistency come first, and purchases are completed securely via Shopify.</p>
      </header>
      <section aria-labelledby="catalog-heading">
        <h2 id="catalog-heading">Current catalog</h2>
        <div className="catalog-grid">
          {products.map((product) => (
            <article className="catalog-card" key={product.handle}>
              {product.images[0]?.src ? (
                <img
                  src={catalogImageUrl(product.images[0].src)}
                  alt={product.images[0].alt || product.title}
                  width="900"
                  height="900"
                  decoding="async"
                />
              ) : (
                <div className="catalog-placeholder" aria-label="Product image unavailable">TF</div>
              )}
              <div className="catalog-card-body">
                <p className="catalog-category">{product.category}</p>
                <h3><Link href={`/products/${product.handle}`}>{product.title}</Link></h3>
                <p>{product.summary}</p>
                <div className="catalog-card-foot">
                  <strong>{product.priceLabel || "See current price"}</strong>
                  <Link href={`/products/${product.handle}`}>View details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        {products.length === 0 && (
          <p className="catalog-empty" role="status">
            The live catalog is temporarily unavailable. Continue to Shopify for current products and availability.
          </p>
        )}
      </section>
    </main>
  );
}
