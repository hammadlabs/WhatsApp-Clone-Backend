import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const findUserByEmail = async (props: { email: string }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: props.email,
    },
  });
  return user;
};

export const createNewUser = async ({
  email,
  userName,
  password,
  role,
}: {
  email: string;
  userName: string;
  password: string;
  role: Role;
}) => {
  const user = await prisma.user.create({
    data: {
      email: email,
      user_name: userName,
      password: password,
      role: role,
    },
  });
  return user;
};

export const saveRefreshToken = async ({
  token,
  userId,
  isRevoked,
  expiresAt,
}: {
  token: string;
  userId: string;
  isRevoked: boolean;
  expiresAt: Date;
}) => {
  const rToken = await prisma.userRefreshToken.create({
    data: {
      token: token,
      userId: userId,
      isRevoked: isRevoked,
      expiresAt: expiresAt,
    },
  });
  return rToken;
};

export const getRefreshToken = async ({ token }: { token: string }) => {
  const rToken = await prisma.userRefreshToken.findFirst({
    where: {
      token: token,
    },
  });
  return rToken;
};
