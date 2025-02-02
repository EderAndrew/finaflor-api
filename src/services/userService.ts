import { User } from "../types/userinterface";
import { prisma } from "../utils/prisma";

export const findUser = async (name: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        user_name: name,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const findUserById = async (id: number) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const postUser = async (info: User) => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
