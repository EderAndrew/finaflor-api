import { RequestHandler } from "express";
import { allSelectedPhotos, changePosition, changeStatus, cleanServiceAllPhotos } from "../services/photoServices";
//import { createSelected } from "../services/selectedService";

export const updatePhotoStatus: RequestHandler = async (req, res): Promise<any> => {
  try {
    const { id } = req.params;
    const { selected, position } = req.body;
    let newPosition = 0;

    const picSelected = await allSelectedPhotos();
    const newArray: any[] = [];
    if (!picSelected) return res.status(400).json({ message: "Nenhuma imagem selecionada." });

    if (picSelected?.length === 0 && selected === true) {
      newPosition += 1;
    } else if (picSelected?.length > 0 && selected === true) {
      newPosition = picSelected?.length + 1;
    } else if (picSelected?.length > 0 && selected === false) {
      picSelected.filter((pic) => {
        if (pic.position > position) {
          newArray.push(pic);
        }
      });
      newArray.map((pic) => {
        pic.position -= 1;
        changePosition(pic.id, pic.position);
      });
      for (let i = 0; i < picSelected?.length; i++) {
        if (picSelected[i].id === parseInt(id)) {
          newPosition = 0;
        }
      }
    }
    //console.log("NOVO: ", newArray);
    const photo = await changeStatus(parseInt(id), selected, newPosition);
    //await createSelected(pic_url, pic_name, description);

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

export const cleanAllSelectedPhotos: RequestHandler = async (req, res): Promise<any> => {
  try {
    const photos = await cleanServiceAllPhotos();

    if (!photos) return res.status(400).json({ message: "Nenhuma imagem selecionada." });

    return res.status(200).json(photos);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
