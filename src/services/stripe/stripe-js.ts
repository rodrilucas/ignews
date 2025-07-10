import { NEXT_PUBLIC_STRIPE_API_KEY } from "@/env/env.client";
import { loadStripe } from "@stripe/stripe-js";

export async function getStripeJs() {
  const stripeJs = await loadStripe(NEXT_PUBLIC_STRIPE_API_KEY);
  return stripeJs;
}
