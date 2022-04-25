import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/authenticateUserService';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userForResponse: UserWithoutPassword = user;

  delete userForResponse.password;

  return response.json({ userForResponse, token });
});

export default sessionsRouter;
