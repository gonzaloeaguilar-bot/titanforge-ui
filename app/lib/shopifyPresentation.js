function flavorFromTitle(title) {
  return title.match(/\(([^)]+)\)/)?.[1]?.toLowerCase();
}

export function catalogSummary(product) {
  const title = (product.title || "").trim();
  const lower = title.toLowerCase();
  const flavor = flavorFromTitle(title);
  const namedFlavor = flavor ? `${flavor[0].toUpperCase()}${flavor.slice(1)} ` : "";

  if (lower.includes("can cooler")) return "Insulated Titan Forge sleeve sized for standard cans. Check the product page for current colors, availability, and care details.";
  if ((lower.includes("pump cover") && lower.includes("oversized")) || lower.includes("oversized tee")) return "Heavyweight oversized training tee with a relaxed, boxy fit. Check the product page for current sizes, colors, and garment details.";
  if (lower.includes("pump cover")) return "Titan Forge training shirt. Check the product page for the current fit, sleeve length, sizes, colors, and garment details.";
  if (lower.includes("hoodie")) return "Titan Forge hoodie built for comfortable everyday layering. Check the product page for current sizes, colors, fabric details, and care instructions.";
  if (lower.includes("plant protein")) return `${namedFlavor}plant-based protein powder. Review the product label for serving size, ingredients, allergens, directions, and current availability.`;
  if (lower.includes("whey protein")) return `${namedFlavor}whey protein isolate powder. Review the product label for serving size, ingredients, allergens, directions, and current availability.`;
  if (lower.includes("pre-workout") || lower.includes("nitric shock")) return "Fruit-punch pre-workout powder containing caffeine. Review the product label for caffeine content, serving directions, ingredients, and warnings.";
  if (lower.includes("creatine")) return "Creatine supplement for a simple daily routine. Review the product label for serving size, ingredients, directions, and current availability.";

  const category = (product.product_type || "product").trim().toLowerCase();
  return `Titan Forge ${category}. Check the product page for current specifications, label details, availability, and checkout.`;
}

export function catalogImageUrl(source, width = 900) {
  if (!source) return undefined;
  return `${source}${source.includes("?") ? "&" : "?"}width=${width}`;
}
