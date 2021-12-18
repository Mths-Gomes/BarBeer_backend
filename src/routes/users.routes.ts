import { Router } from 'express';

import CreateUserService from '../services/createUserService';

const usersRouter = Router();

interface UserWhitoutPassword {
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

    const user2: UserWhitoutPassword = user;

    delete user2.password;

    return response.json(user2);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
