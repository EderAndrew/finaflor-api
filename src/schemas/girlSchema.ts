import { z } from "zod";

export const girlSchema = z.object({
  id: z.number().optional(),
  name_id: z.string().optional(),
  name: z.string().optional(),
  description: z.boolean().optional(),
  day: z.date().optional(),
  selected: z.boolean().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  Pic: z
    .array(
      z.object({
        id: z.number().optional(),
        pic_name: z.string().optional(),
        selected: z.boolean().optional(),
        createdAt: z.date().optional(),
        updatedAt: z.date().optional(),
      })
    )
    .optional(),
});
