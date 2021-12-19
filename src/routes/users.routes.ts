import { Router } from 'express';

import CreateUserService from '../services/createUserService';

const usersRouter = Router();

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userForResponse: UserWithoutPassword = user;

    delete userForResponse.password;

    return response.json(userForResponse);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
