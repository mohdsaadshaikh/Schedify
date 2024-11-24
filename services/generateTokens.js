import crypto from "crypto";
import {
  getVerificationTokenByEmail,
  getPasswordResetTokenByEmail,
  getTwoFactorTokenByEmail,
} from "@/services/auth";

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

export const generatePasswordResetToken = async (email) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(new Date().getTime() + 60 * 60 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: { email, token, expiresAt },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiresAt = new Date(new Date().getTime() + 30 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await prisma.twoFactorToken.delete({
      where: { id: existingToken.id },
    });
  }

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: { email, token, expiresAt },
  });

  return twoFactorToken;
};
