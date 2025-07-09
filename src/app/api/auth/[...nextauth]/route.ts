import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { env } from "@/env";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
