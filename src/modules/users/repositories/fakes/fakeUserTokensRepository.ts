import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/userToken';

// DTO > Data Transfer Object
class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken)

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(findToken => findToken.token ===token);

    return userToken;
  }
}

export default FakeUserTokensRepository;
