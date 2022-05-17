import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DiskStorageProviders from './implementations/diskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProviders,
);
