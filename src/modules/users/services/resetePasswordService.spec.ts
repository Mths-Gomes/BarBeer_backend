import AppError from '@shared/errors/AppError';
import ResetePasswordService from './resetePasswordService';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/fakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetePasswordService: ResetePasswordService;

describe('SendForgtoPasswordEmail', () => {
  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetePasswordService = new ResetePasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      );
  })

  it('should be able to resete password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetePasswordService.execute({
      token: token,
      password: 'Temp-123',
    });

    const updatedUser = await fakeUsersRepository.finbById(user.id);

    expect(updatedUser?.password).toBe('Temp-123');
  });
});
