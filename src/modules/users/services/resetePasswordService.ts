import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetePasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {

    //this.usersRepository = usersRepository;
  }

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if(!userToken) {
      throw new AppError('User token does not exists.');

    }

    const user = await this.usersRepository.finbById(userToken.user_id);

    if (!user){
      throw new AppError('User does not exists.');
    }

    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetePasswordService;
