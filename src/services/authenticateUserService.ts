import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/user';
import { response } from 'express';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseUser {
  user: User;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseUser> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return { user };
  }
}

export default AuthenticateUserService;
