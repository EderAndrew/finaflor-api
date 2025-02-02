import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import { hashSync } from "bcrypt";
import { allUsers, findUser, findUserById, postUser } from "../services/userService";

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

export const getAllUsers: RequestHandler = async (req, res): Promise<any> => {
  try{
    const data = await allUsers();

    if (!data) return res.status(400).json({ message: "Usuários nao encontrados." });

    return res.status(200).json(data);
  }catch(error){
    if(error instanceof Error){
      console.log(error.message)
    }
  }
}

export const getOneUser: RequestHandler = async (req, res): Promise<any> => {
  try{
    const { id } = req.params;

    const data = await findUserById(parseInt(id));

    if (!data) return res.status(400).json({ message: "Usuário nao encontrado." });

    return res.status(200).json(data);
  }catch(error){
    if(error instanceof Error){
      console.log(error.message)
    }
  }
}