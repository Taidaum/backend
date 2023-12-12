import {
  IsEmail,
  IsLowercase,
  IsOptional,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsEmail()
  @IsLowercase()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  isActive?: boolean;
}
