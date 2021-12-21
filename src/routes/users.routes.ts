import { request, Router } from 'express';
import multer from 'multer';

import CreateUserService from '../services/createUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/updateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const userForResponse: UserWithoutPassword = await updateUserAvatar.execute(
      {
        user_id: request.user.id,
        avatarFileName: request.file?.filename,
      },
    );

    delete userForResponse.password;

    return response.json(userForResponse);
  },
);

export default usersRouter;
