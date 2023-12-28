import { User } from '../../domain/models/interface/user.interface';

export interface IUsersService {
  users(): Promise<User[]>;
}
