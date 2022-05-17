export default interface IStorageProvider {
  saveFile(file: string | undefined): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
