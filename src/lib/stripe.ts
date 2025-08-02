import Stripe from "stripe";
import { env } from "@/env/env.server";

export const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2025-06-30.basil",
  appInfo: {
    name: "Ignews",
    version: "0.1.0",
  },
});
