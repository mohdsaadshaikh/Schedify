import { prisma } from "@/lib/prisma";

export const getUserById = async (id) => {
  try {
    return await prisma.user.findUnique({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = (email) => {
  try {
    const verificationToken = prisma.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token) => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
