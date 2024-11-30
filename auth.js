import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import providers from "./authProviders";
import {
  getAccountById,
  getTwoFactorConfirmationByUserId,
  getUserById,
} from "./services/auth";

export const { handlers, auth, signIn, signOut, update } = NextAuth({
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
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token?.image;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountById(existingUser.id);

      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      token.password = existingUser.password;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser?.image;
      token.isOAuth = !!existingAccount;

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
