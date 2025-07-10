import { stripe } from "@/lib/stripe";

export async function getProductById(priceId: string) {
  const price = await stripe.prices.retrieve(priceId, {
    expand: ["product"],
  });

  return price;
}
