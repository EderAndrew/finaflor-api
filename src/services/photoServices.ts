import { IPic } from "../interfaces/picinterface";
import { prisma } from "../utils/prisma";

export const changeStatus = async (id: number, selected: boolean) => {
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
};

export const allSelectedPhotos = async () => {
  const photo = await prisma.pic.findMany({
    where: {
      selected: true,
    },
  });

  if (!photo) return null;

  return photo;
};
