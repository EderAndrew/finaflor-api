import { Request } from "express";
import { Fields, Files } from "formidable";

export type ExtendedRequest = Request & {
  userId?: number;
};

export type ExtendFileRequest = Request & {
  files?: Files;
  fields?: Fields;
};
