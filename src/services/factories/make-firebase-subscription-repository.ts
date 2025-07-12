import { db } from "@/db";
import { FirebaseRepository } from "@/repositories/firebase/repository";
import Stripe from "stripe";

export type Subscription = {
  id: string;
  user_id: string;
  subscription_id: string;
  status: Stripe.Subscription.Status;
  price_id: string;
};

export function makeFirebaseSubscriptionRepository() {
  return new FirebaseRepository<Subscription>(db, "subscriptions");
}
