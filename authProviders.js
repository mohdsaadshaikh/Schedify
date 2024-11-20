import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { loginSchema } from "@/schemas/auth.schema";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/services/auth";

const providers = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) return user;
        }

        return null;
      },
    }),
  ],
};

export default providers;
