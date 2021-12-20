import { request, Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/createUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
  },
);

export default usersRouter;
