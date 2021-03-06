import fs from 'fs';
import path from 'path';

import IStorageProvider from '../models/IStorageProvider';
import upload from '@config/upload';

class DiskStorageProviders implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(upload.tmpFolder, file),
      path.resolve(upload.uploadFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(upload.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProviders;
