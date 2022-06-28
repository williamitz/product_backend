import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { QueryDto } from '../../../helpers/query.dto';

@Controller('product')
export class ProductController {
  constructor(private _productsvc: ProductService) {}

  @Get()
  async getProducts(@Query() { page, perPage, search }: QueryDto) {
    try {
      return await this._productsvc.getAll(page, perPage, search);
    } catch (error) {
      throw new BadRequestException('Bad request at list products');
    }
  }
}
