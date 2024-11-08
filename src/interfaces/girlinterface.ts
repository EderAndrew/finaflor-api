import { IPic } from "./picinterface";

export interface IGirl {
  id?: number;
  name_id: string;
  name: string;
  description: boolean;
  day: Date;
  selected: boolean;
  createdAt?: Date;
  updatedAt: Date;
  pics: [IPic];
}
