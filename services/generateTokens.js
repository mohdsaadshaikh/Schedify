import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/services/auth";

export const generateVerificationToken = async (email) => {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: { email, token, expiresAt },
  });

  return verificationToken;
};
