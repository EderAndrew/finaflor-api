import { Pic } from "./pic";

export type Girl = {
  id?: number;
  name_id: string;
  name: string;
  description: boolean;
  day: Date;
  selected: boolean;
  createdAt?: Date;
  updatedAt: Date;
  pics: [Pic];
}
