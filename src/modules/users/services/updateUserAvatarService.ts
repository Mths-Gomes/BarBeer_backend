import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/user';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequesteDTO {
  user_id: string;
  avatarFileName?: string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;
  private storageProvider: IStorageProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('StorageProvider')
    storageProvider: IStorageProvider,
  ) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  }

  public async execute({
    user_id,
    avatarFileName,
  }: IRequesteDTO): Promise<User> {
    const user = await this.usersRepository.finbById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
