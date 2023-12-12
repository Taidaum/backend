import { IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 80)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(80)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}

export class LoginAuthDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class VerifyTokenDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(80)
  newPassword: string;
}
