import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private _productrepo: Repository<Product>,
  ) {}

  async getAll(page: number, perPage: number, search: string) {
    const skip = (page - 1) * perPage;

    const findOpt: FindManyOptions<Product> = {
      skip,
      take: perPage,
    };

    if (search && search != '') findOpt.where = { name: Like(`%${search}%`) };

    const [products, total] = await this._productrepo.findAndCount(findOpt);

    return {
      products,
      total,
    };
  }
}
