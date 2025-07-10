import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env/env.server";
import { add } from "@/services/add";

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
    async signIn({ user }) {
      if (!user || !user.email) {
        return false;
      }
      try {
        await add({
          data: {
            email: user.email,
          },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
