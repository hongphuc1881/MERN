import { User } from './user.type.ts';
import { ResponseApi } from './utils.type';

export type AuthResponse = ResponseApi<{
  token: string;
  user: User;
}>;
