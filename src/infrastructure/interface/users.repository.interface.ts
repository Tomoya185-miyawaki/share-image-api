import { User } from '../../domain/models/interface/user.interface';

export interface IUsersRepository {
  users(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User>;
}
