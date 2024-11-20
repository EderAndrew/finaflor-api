import { prisma } from "../utils/prisma";

export const createSelected = async (pic_url: string, pic_name: string, description: string) => {
  try {
    const selected = await prisma.selected.create({
      data: {
        name: pic_name,
        url: pic_url,
        description: description,
        createdAt: new Date(),
      },
    });

    if (!selected) return null;

    return selected;
  } catch (error) {
    console.log(error);
  }
};
