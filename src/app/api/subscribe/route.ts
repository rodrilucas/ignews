import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import { env } from "@/env/env.server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { makeFirebaseRepository } from "@/services/factories/make-firebase-repository";

export async function POST() {
  const session = await getServerSession(authOptions);
  const firebaseRepository = makeFirebaseRepository();

  if (!session || !session.user || !session.user.email) {
    return NextResponse.json(
      { error: "Usuário não autenticado." },
      { status: 401 }
    );
  }

  const email = session.user.email;

  const user = await firebaseRepository.findUnique({
    data: {
      field: "email",
      value: email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { error: "Usuário não encontrado no banco de dados." },
      { status: 404 }
    );
  }

  let stripeCustomerId = user.stripe_customer_id;

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({ email });

    await firebaseRepository.update({
      data: {
        id: user.id,
        stripe_customer_id: customer.id,
      },
    });

    stripeCustomerId = customer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [{ price: env.STRIPE_PRICE, quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: env.STRIPE_SUCCESS_URL,
    cancel_url: env.STRIPE_CANCEL_URL,
  });

  return NextResponse.json(
    { sessionId: stripeCheckoutSession.id },
    { status: 200 }
  );
}
