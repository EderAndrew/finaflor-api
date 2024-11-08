export interface IFile {
  id?: number;
  size: number;
  filepath: string;
  newFilename: string;
  mimetype: string;
  mtime: string;
  originalFilename: string;
}

export interface IFiles {
  images: [IFile];
}
