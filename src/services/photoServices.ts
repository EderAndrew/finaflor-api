import { prisma } from "../utils/prisma";

export const changeStatus = async (id: number, selected: boolean) => {
  try {
    const photo = await prisma.pic.update({
      where: {
        id,
      },
      data: {
        selected: selected,
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
        id: "asc",
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
