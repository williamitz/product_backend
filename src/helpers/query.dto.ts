import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @IsNotEmpty()
  @Type(() => Number)
  readonly page: number;

  @IsNotEmpty()
  @Type(() => Number)
  readonly perPage: number;

  @IsOptional()
  @IsString()
  readonly search: string;
}
