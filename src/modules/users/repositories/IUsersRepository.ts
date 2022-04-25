import User from '../infra/typeorm/entities/user';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
  finbById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(data: User): Promise<User>;
}
