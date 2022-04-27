import { Router } from 'express';
import { container } from 'tsyringe';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/createUserService';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

interface UserWithoutPassword {
  name: string;
  email: string;
  password?: string;
}

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);

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
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

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
