import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  readonly name: string;

  @IsNotEmpty()
  @Type(() => Boolean)
  readonly available: boolean;

  @IsNotEmpty()
  @IsString()
  readonly picture: string;

  @IsNotEmpty()
  @Type(() => Number)
  readonly price: number;
}
