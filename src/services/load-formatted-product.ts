import { getProductById } from "@/stripe/get-product-by-id";

export async function loadFormattedProduct(priceId: string) {
  const price = await getProductById(priceId);

  return {
    priceId: price.id,
    amount: (price.unit_amount ?? 0) / 100,
  };
}
