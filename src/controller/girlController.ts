import fs from "fs/promises";
import { RequestHandler } from "express";
import { girlSchema } from "../schemas/girlSchema";
import { findGirlByName, getGirls, newGirl } from "../services/girlService";
import { IGirl } from "../interfaces/girlinterface";
import { ExtendFileRequest } from "../interfaces/extend-request";
import formidable from "formidable";
import sharp from "sharp";
import { IPic } from "../interfaces/picinterface";

sharp.cache(false);

export const createGirl: RequestHandler = async (req: ExtendFileRequest, res): Promise<any> => {
  try {
    //PEGA AS REQUISIÇÕES DO FORMULARIO
    const EGirl = {
      name_id: req.fields?.name_id?.[0].toLowerCase() as string,
      name: req.fields?.name?.[0] as string,
      description: true,
      day: new Date(),
      selected: true,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    //VERIFICA NO SCHEMA SE HÁ ALGUMA DIVERGÊNCIA
    const safeData = girlSchema.safeParse(EGirl);
    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    //TRATA A IMAGEM
    let files = req.files as { [fieldname: string]: formidable.File[] };

    let images: IPic[] = [];
    for (let x = 0; x < files.images.length; x++) {
      await sharp(files.images[x].filepath)
        .toFormat("webp")
        .toFile(`./public/media/${files.images[x].originalFilename?.split(".")[0]}.webp`);
      images.push({
        pic_name: req.fields?.name?.[0] as string,
        pic_url: `${process.env.URL_IMG_PROD}.top/media/${files.images[x].originalFilename?.split(".")[0]}.webp`,
        selected: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await fs.unlink(files.images[x].filepath);
    }

    //vERIFICA SE JÁ EXISTE UMA GAROTA COM O NOME
    const haveGirl = await findGirlByName(safeData.data.name_id as string);

    if (haveGirl) return res.status(400).json({ message: "Ja existe uma garota com este nome." });

    const data = {
      name_id: safeData.data.name_id,
      name: safeData.data.name,
      description: safeData.data.description,
      day: safeData.data.day,
      selected: safeData.data.selected,
      createdAt: new Date(),
      updatedAt: new Date(),
      pics: [...images],
    };

    //SALVA A GAROTA NO BANCO
    const girl = await newGirl(data as IGirl);

    if (!girl) return res.status(400).json({ message: "Erro ao inserir garota." });

    return res.status(201).json({ message: "Garota inserida com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getAllGirls: RequestHandler = async (req, res): Promise<any> => {
  try {
    const girls = await getGirls();
    if (!girls) return res.status(400).json({ message: "Não tem nenhuma garota pra mostrar." });

    return res.status(200).json(girls);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
