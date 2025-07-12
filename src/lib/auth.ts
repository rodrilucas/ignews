import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env/env.server";
import { add } from "@/services/add";
import { makeFirebaseUserRepository } from "@/services/factories/make-firebase-user-repository";
import { Subscription } from "@/services/factories/make-firebase-subscription-repository";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  callbacks: {
    async session({ session }) {
      const userFirebaseRepository = makeFirebaseUserRepository();

      if (!session.user || !session.user.email) {
        throw new Error("Usuário não autenticado ou email não encontrado..");
      }

      const subscription =
        await userFirebaseRepository.findUserWithActiveSubscription({
          field: "email",
          value: session.user.email,
        }) as Subscription;

      if (subscription) {
        session.subscription = {
          ...subscription,
        };
      }
      return session;
    },
    async signIn({ user }) {
      if (!user || !user.email) {
        throw new Error("Usuário não existe ou email não encontrado.");
      }

      try {
        await add({
          data: {
            email: user.email,
          },
        });
        return true;
      } catch (err) {
        throw err;
      }
    },
  },
};
