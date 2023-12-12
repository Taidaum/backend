import { User } from '../../_models/prisma-class/user';

export class Paginated {
  total: number;

  page: number;

  perPage: number;
}

export class PaginatedUser extends Paginated {
  data: User[];
}
