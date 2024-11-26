import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import providers from "./authProviders";
import { getTwoFactorConfirmationByUserId, getUserById } from "./services/auth";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await prisma.twoFactorConfirmation.delete({
          where: { userId: existingUser.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub;
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
        session.user.password = token.password;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.password = existingUser.password;

      return token;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...providers,
  pages: {
    error: "/error",
    signIn: "/login",
  },
});
