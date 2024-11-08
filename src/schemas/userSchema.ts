import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  user_name: z.string(),
  password: z.string({ message: "Senha é obrigatoria." }).min(8, { message: "Senha deve ter pelo menos 8 caracteres." }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
