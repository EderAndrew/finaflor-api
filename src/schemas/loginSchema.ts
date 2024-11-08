import { z } from "zod";

export const loginSchema = z.object({
  user_name: z.string(),
  password: z.string({ message: "Senha é obrigatoria." }).min(8, { message: "Senha deve ter pelo menos 8 caracteres." }),
});
