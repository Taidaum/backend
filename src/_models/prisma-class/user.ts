import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number = undefined;

  @ApiProperty({ type: String })
  email: string = undefined;

  @ApiPropertyOptional({ type: String })
  phone?: string = undefined;

  @ApiProperty({ type: String })
  password: string = undefined;

  @ApiProperty({ type: Boolean })
  isActive: boolean = true;

  @ApiProperty({ type: Date })
  createdAt: Date = undefined;

  @ApiProperty({ type: Date })
  updatedAt: Date = undefined;

  @ApiPropertyOptional({ type: Date })
  deletedAt?: Date = undefined;
}
