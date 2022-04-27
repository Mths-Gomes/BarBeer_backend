import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/createUserService';
import IUserWithoutPassword from '@modules/users/dtos/IUserWithoutPassword';

export default class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const userForResponse: IUserWithoutPassword = user;

    delete userForResponse.password;

    return response.json(userForResponse);
  }
}
