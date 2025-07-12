"use client";

import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { api } from "@/services/api";
import { getStripeJs } from "@/services/stripe/stripe-js";
import { useRouter } from "next/navigation";

type SubscribeButtonProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (status !== "authenticated") {
      return signIn("github");
    }

    if (session.subscription && session.subscription.status === "active") {
      return router.push("/posts");
    }

    try {
      const response = await api();
      const { sessionId } = response;

      const stripe = await getStripeJs();

      if (!stripe) throw new Error("Stripe.js não carregado");

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      throw error;
    }
  }

  return (
    <button
      className={styles.subscribe}
      type="button"
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  );
}
