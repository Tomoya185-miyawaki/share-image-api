import { User } from '../../domain/models/interface/user.interface';
import { SignInResponseDto } from '../../interface/dto/user.response.dto';

export interface IUsersService {
  users(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User>;
  signIn(email: string, password: string): Promise<SignInResponseDto>;
}
