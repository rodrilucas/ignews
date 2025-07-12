import { stripe } from "@/lib/stripe";
import { makeFirebaseUserRepository } from "@/services/factories/make-firebase-user-repository";

type CreateSubscription = {
  subscriptionId: string;
  customerId: string;
};

export async function createSubscription({
  subscriptionId,
  customerId,
}: CreateSubscription) {
  const userFirebaseRepository = makeFirebaseUserRepository();

  const user = await userFirebaseRepository.findUnique({
    field: "stripe_customer_id",
    value: customerId,
  });

  if (!user || !user.stripe_customer_id) {
    throw new Error("Usuário não encontrado no banco de dados");
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const getPriceByIndex = 0;

  return {
    user_id: user.stripe_customer_id,
    subscription_id: subscription.id,
    status: subscription.status,
    price_id: subscription.items.data[getPriceByIndex].price.id,
  };
}
