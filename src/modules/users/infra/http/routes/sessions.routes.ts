import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/authenticateUserService';

const sessionsRouter = Router();

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  const userForResponse: UserWithoutPassword = user;

  delete userForResponse.password;

  return response.json({ userForResponse, token });
});

export default sessionsRouter;
