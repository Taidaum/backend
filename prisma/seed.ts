import { PrismaClient } from '@prisma/client';
import { generatePasswordToken } from '../src/helpers/auth.helper';
import { users } from './seeds/users';

const prisma = new PrismaClient();

async function main() {
  console.group('Running seed script');
  console.time();

  const usersWithPw = await Promise.all(
    users.map(async (u) => ({
      ...u,
      email: u.email,
      password: await generatePasswordToken(u.password),
    })),
  );

  await prisma.user.createMany({
    data: usersWithPw,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
