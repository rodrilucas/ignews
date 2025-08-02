// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";
import type { JWT as DefaultJWT } from "next-auth/jwt";
import type { User } from "next-auth";
import type { Subscription } from "@/services/factories/make-firebase-subscription-repository";

declare module "next-auth" {
  interface Session extends User {
    subscription: Subscription | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    subscription: Subscription | null;
  }
}
