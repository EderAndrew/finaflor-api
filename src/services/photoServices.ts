import { prisma } from "../utils/prisma";

export const changeStatus = async (id: number, selected: boolean, position: number) => {
  try {
    const photo = await prisma.pic.update({
      where: {
        id,
      },
      data: {
        selected,
        position,
        updatedAt: new Date(),
      },
    });

    if (!photo) return null;

    return photo;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const changePosition = async (id: number, position: number) => {
  try {
    const photo = await prisma.pic.update({
      where: {
        id,
      },
      data: {
        position: position,
        updatedAt: new Date(),
      },
    });

    if (!photo) return null;

    return photo;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
export const allSelectedPhotos = async () => {
  try {
    const photo = await prisma.pic.findMany({
      where: {
        selected: true,
      },
      select: {
        id: true,
        pic_url: true,
        pic_name: true,
        selected: true,
        position: true,
        createdAt: true,
        updatedAt: true,
        girl_id: true,
        girls: {
          select: {
            description: true,
          },
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    if (!photo) return null;

    return photo;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const cleanServiceAllPhotos = async () => {
  try {
    const photo = await prisma.pic.updateMany({
      where: {
        selected: true,
      },
      data: {
        selected: false,
        position: 0,
      },
    });

    if (!photo) return null;

    return photo;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
