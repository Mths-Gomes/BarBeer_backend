import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IUserWithoutPassword from '@modules/users/dtos/IUserWithoutPassword';
import UpdateUserAvatarService from '@modules/users/services/updateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const userForResponse: IUserWithoutPassword =
      await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file?.filename,
      });

    delete userForResponse.password;

    return response.json(userForResponse);
  }
}
