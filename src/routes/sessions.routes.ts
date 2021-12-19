import { Router } from 'express';

import AuthenticateUserService from '../services/authenticateUserService';

const sessionsRouter = Router();

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    const userForResponse: UserWithoutPassword = user;

    delete userForResponse.password;

    return response.json({ userForResponse });
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
