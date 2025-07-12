import { env } from "@/env/env.server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { bufferStream } from "@/utils/buffer";
import { NextRequest, NextResponse } from "next/server";
import { customerSubscriptionCreated } from "./customer-subscription-created";
import { customerSubscriptionUpdate } from "./customer-subscription-update";

export const config = {
  api: {
    bodyParser: false,
  },
};

const relevantEvents = new Set([
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  if (!req.body) {
    return NextResponse.json({ error: "Requisição vazia." }, { status: 400 });
  }

  const buf = await bufferStream(req.body);
  const secret = req.headers.get("stripe-signature");

  if (!secret) {
    return NextResponse.json(
      { error: "Assinatura do stripe não existe." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      secret,
      env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const type = event.type;

  if (relevantEvents.has(type)) {
    try {
      switch (type) {
        case "customer.subscription.created":
          await customerSubscriptionCreated({
            subscription: event.data.object,
          });
          break;

        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          await customerSubscriptionUpdate({
            subscription: event.data.object,
          });
          break;

        default:
          throw new Error("Evento não tratado.");
      }
    } catch (err) {
      throw err;
    }
  }

  return NextResponse.json(
    { message: "Assinatura realizada com sucesso!" },
    { status: 200 }
  );
}
