import Stripe from "stripe";
import { createSubscription } from "./create-subscription";
import { NextResponse } from "next/server";
import { makeFirebaseSubscriptionRepository } from "@/services/factories/make-firebase-subscription-repository";

type CustomerSubscriptionUpdate = {
  subscription: Stripe.Subscription;
};

export async function customerSubscriptionUpdate({
  subscription,
}: CustomerSubscriptionUpdate) {
  const subFirebaseRepository = makeFirebaseSubscriptionRepository();

  const subscriptionId = subscription.id.toString();
  const customerId = subscription.customer.toString();

  try {
    const { user_id, price_id, subscription_id, status } =
      await createSubscription({
        subscriptionId,
        customerId,
      });

    await subFirebaseRepository.updateMany({
      filters: { user_id },
      data: {
        price_id,
        status,
        subscription_id,
        user_id,
      },
    });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido." },
      { status: 400 }
    );
  }
}
