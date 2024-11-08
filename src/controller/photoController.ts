import { RequestHandler } from "express";
import { allSelectedPhotos, changeStatus } from "../services/photoServices";
import { photoSchema } from "../schemas/photoSchema";
import { IPic } from "../interfaces/picinterface";

export const updatePhotoStatus: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const { selected } = req.body;

    const photo = await changeStatus(parseInt(id), selected);

    if (!photo) return res.status(400).json({ message: "Erro ao atualizar imagem." });

    return res.status(200).json(photo);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getAllSelectedPhotos: RequestHandler = async (req, res): Promise<any> => {
  try {
    const photos = await allSelectedPhotos();

    if (!photos) return res.status(400).json({ message: "Nenhuma imagem selecionada." });

    return res.status(200).json(photos);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
