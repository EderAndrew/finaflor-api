import { RequestHandler } from "express";
import { findUser } from "../services/userService";
import { compare } from "bcrypt-ts";
import { loginSchema } from "../schemas/loginSchema";
import { createJWT } from "../utils/jwt";

export const login: RequestHandler = async (req, res): Promise<any> => {
  try {
    const safeData = loginSchema.safeParse(req.body);
    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const user = await findUser(safeData.data.user_name);

    if (!user) return res.status(400).json({ error: "Acesso negado" });
    const hash = await compare(safeData.data.password, user.password);

    if (!hash) return res.status(400).json({ error: "Acesso negado" });

    const payload = {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
    };

    const token = createJWT(payload);

    return res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const loginTeste: RequestHandler = async (req, res): Promise<any> => {
  try {
    const safeData = loginSchema.safeParse(req.body);
    if (!safeData.success) {
      return res.status(400).json({ error: safeData.error.flatten().fieldErrors });
    }

    const user = await findUser(safeData.data.user_name);

    if (!user) return res.status(400).json({ error: "Acesso negado" });
    const hash = await compare(safeData.data.password, user.password);

    if (!hash) return res.status(400).json({ error: "Acesso negado" });

    const payload = {
      id: user.id,
      name: user.name,
      user_name: user.user_name,
    };

    const token = createJWT(payload);

    return res.status(200).json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
