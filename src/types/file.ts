export type File = {
  id?: number;
  size: number;
  filepath: string;
  newFilename: string;
  mimetype: string;
  mtime: string;
  originalFilename: string;
}

export type Files = {
  images: [File];
}
