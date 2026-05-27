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

export const saveRefreshToken = async () => {};
