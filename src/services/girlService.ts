import { Prisma } from "@prisma/client";
import { Girl } from "../types/girl";
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

export const newGirl = async (payload: Girl) => {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getGirls = async (skip: number) => {
  try {
    const girls = await prisma.girl.findMany({
      where: {
        selected: true,
      },
      include: {
        Pic: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!girls) return null;

    return girls;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const findGirlById = async (id: number) => {
  try {
    const girl = await prisma.girl.findFirst({
      where: {
        id,
      },
      include: {
        Pic: true,
      },
    });

    if (!girl) return null;

    return girl;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const editGirl = async (id: number, payload: Girl) => {
  try {
    let includePics: boolean = false;
    let girl: Prisma.GirlUpdateInput;

    if (payload.pics.length > 0) {
      includePics = true;
    }
    console.log(includePics);
    if (includePics) {
      girl = {
        name_id: payload.name_id,
        name: payload.name,
        description: payload.description,
        selected: payload.selected,
        Pic: {
          create: [...payload.pics],
        },
      };
    } else {
      girl = {
        name_id: payload.name_id,
        name: payload.name,
        description: payload.description,
        selected: payload.selected,
      };
    }

    const updateGirl = await prisma.girl.update({
      where: {
        id,
      },
      data: girl,
    });

    if (!updateGirl) return null;

    return updateGirl;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
