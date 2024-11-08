import { IUser } from "../interfaces/userinterface";
import { prisma } from "../utils/prisma";

export const findUser = async (name: string) => {
  const user = await prisma.user.findFirst({
    where: {
      user_name: name,
    },
  });

  if (!user) return null;

  return user;
};

export const findUserById = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!user) return null;

  return user;
};

export const postUser = async (info: IUser) => {
  const user = await prisma.user.create({
    data: {
      name: info.name,
      user_name: info.user_name,
      password: info.password,
      createdAt: info.createdAt,
      updatedAt: info.updatedAt,
    },
  });

  if (!user) return null;

  return user;
};
