export class AuthRegisterResponse {
  id: number;

  createdAt: Date;

  updatedAt: Date;

  token: string;
}

export class AuthLoginResponse {
  id: number;

  token: string;
}
