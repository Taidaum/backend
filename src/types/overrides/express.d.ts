import { User } from '../../_models/prisma-class/user';

declare module 'express' {
  interface Request {
    user?: Partial<Omit<User, 'password'>>;
  }
}
