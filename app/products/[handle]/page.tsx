import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog, getCatalogProduct } from "../../lib/shopify";
import { PRODUCT_SEO } from "../../lib/productSeo";

export const revalidate = 1800;

type ProductPageProps = { params: Promise<{ handle: string }> };

export async function generateStaticParams() {
  try {
    const products = await getCatalog(250);
    return products.map((product) => ({ handle: product.handle }));
  } catch (error) {
    // Catalog data remains live at request time; a transient Shopify outage must
    // not prevent the rest of the site from producing a deployable build.
    console.warn("[TitanForgeShop] Skipping product prerendering; catalog is unavailable.", error);
    return [];
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getCatalogProduct(handle);
  if (!product) return {};
  const seo = PRODUCT_SEO[product.handle];
  return {
    title: seo ? { absolute: seo.title } : `${product.title} | Titan Forge Fitness`,
    description: seo ? seo.description(product) : (product.description || `View ${product.title} details and availability.`).slice(0, 155),
    // One canonical host per product. The Shopify store owns price, stock and checkout and
    // its own copy is self-canonical (changing that is a commerce-platform edit), so this
    // mirror points at it instead of competing with it. Decision record: PR for 2026-10-13.
    alternates: { canonical: product.productUrl },
    openGraph: { images: product.images[0]?.src ? [product.images[0].src] : [] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getCatalogProduct(handle);
  if (!product) notFound();
  const seo = PRODUCT_SEO[product.handle];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || undefined,
    image: product.images.length ? product.images.map((image) => image.src) : undefined,
    sku: product.variants[0]?.id ? String(product.variants[0].id) : undefined,
    offers: product.price === undefined ? undefined : {
      "@type": "Offer",
      url: product.productUrl,
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };
  const serializedSchema = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <main className="catalog-page product-page" id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializedSchema }} />
      <nav className="catalog-nav" aria-label="Product navigation">
        <Link href="/">Titan Forge Fitness</Link>
        <Link href="/shop">Back to shop</Link>
      </nav>
      <article className="product-detail">
        <div className="product-gallery">
          {product.images.length ? product.images.slice(0, 4).map((image, index) => (
            <img key={image.src} src={image.src} alt={image.alt || `${product.title}${index ? ` view ${index + 1}` : ""}`} />
          )) : <div className="catalog-placeholder product-placeholder">TF</div>}
        </div>
        <div className="product-copy">
          <p className="catalog-kicker">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-price">{product.priceLabel || "See current price at checkout"}</p>
          <p>{product.description || "Current product details are available through Titan Forge's Shopify checkout."}</p>
          <p className="product-status">{product.available ? "Available" : "Currently unavailable"}</p>
          {seo ? (
            <section className="product-answer" aria-labelledby="product-answer-heading">
              <h2 id="product-answer-heading">{seo.answerHeading}</h2>
              <p>{seo.answer(product)}</p>
            </section>
          ) : null}
          <a
            className="product-checkout"
            href={product.productUrl}
            data-analytics-event="shopify_product_click"
            data-analytics-source="onsite_product_page"
            data-analytics-link-kind="shop"
            data-product-handle={product.handle}
            data-product-category={product.category}
            data-product-available={String(product.available)}
          >
            Continue to secure Shopify checkout
          </a>
          <p className="product-note">Checkout, payment, shipping, and order management are handled by Shopify.</p>
        </div>
      </article>
    </main>
  );
}
