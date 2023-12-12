import { User } from '@prisma/client';

export const users: Partial<User>[] = [
  {
    id: 1,
    email: 'teste@teste.com',
    password: '12345678',
  },
];
