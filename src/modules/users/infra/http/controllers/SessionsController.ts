import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IUserWithoutPassword from '@modules/users/dtos/IUserWithoutPassword';
import AuthenticateUserService from '@modules/users/services/authenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const userForResponse: IUserWithoutPassword = user;

    delete userForResponse.password;

    return response.json({ userForResponse, token });
  }
}
