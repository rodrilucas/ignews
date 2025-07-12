import Stripe from "stripe";
import { createSubscription } from "./create-subscription";
import { NextResponse } from "next/server";
import { makeFirebaseSubscriptionRepository } from "@/services/factories/make-firebase-subscription-repository";

type CustomerSubscriptionCreated = {
  subscription: Stripe.Subscription;
};

export async function customerSubscriptionCreated({
  subscription,
}: CustomerSubscriptionCreated) {
  const subFirebaseRepository = makeFirebaseSubscriptionRepository();

  const subscriptionId = subscription.id.toString();
  const customerId = subscription.customer.toString();

  try {
    const subscription =
      await createSubscription({
        subscriptionId,
        customerId,
      });

    await subFirebaseRepository.create(subscription);

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erro desconhecido." },
      { status: 400 }
    );
  }
}
