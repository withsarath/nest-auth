import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Build auth system' })
  title!: string;

  @ApiProperty({
    example: 'Implement JWT with refresh tokens',
    required: false,
  })
  @IsString()
  @IsOptional()
  description!: string;
}
