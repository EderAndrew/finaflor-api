import { Girl } from "@prisma/client";
import { IGirl } from "../interfaces/girlinterface";
import { prisma } from "../utils/prisma";

export const findGirlByName = async (name: string) => {
  const girl = await prisma.girl.findFirst({
    where: {
      name_id: name,
    },
  });

  if (!girl) return null;

  return girl;
};

export const newGirl = async (payload: IGirl) => {
  const girl = await prisma.girl.create({
    data: {
      name_id: payload.name_id,
      name: payload.name,
      description: payload.description,
      day: payload.day,
      selected: payload.selected,
      createdAt: payload.createdAt,
      updatedAt: payload.updatedAt,
      Pic: {
        create: [...payload.pics],
      },
    },
  });

  if (!girl) return null;

  return girl;
};

export const getGirls = async () => {
  const girls = await prisma.girl.findMany({
    include: {
      Pic: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  if (!girls) return null;

  return girls;
};
