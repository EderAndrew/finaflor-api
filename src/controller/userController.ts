import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import { hashSync } from "bcrypt-ts";
import { findUser, postUser } from "../services/userService";

export const createUser: RequestHandler = async (req, res): Promise<any> => {
  try {
    const safeData = userSchema.safeParse(req.body);
    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const haveUser = await findUser(safeData.data.user_name);

    if (haveUser) {
      return res.status(400).json({ error: "Ja existe um usuário com este nome." });
    }
    const hash = hashSync(safeData.data.password as string, 10);

    const info = {
      name: safeData.data.name,
      user_name: safeData.data.user_name,
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const data = await postUser(info);

    if (!data) return res.status(400).json({ message: "Erro ao criar usuário." });

    return res.status(201).json({ message: "Usuário criado com sucesso." });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
