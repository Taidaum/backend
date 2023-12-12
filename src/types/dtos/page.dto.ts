import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class PaginatedDto {
  @IsNumber()
  @Min(1)
  page: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  perPage: number;

  @IsString()
  @IsOptional()
  search?: string;
}
