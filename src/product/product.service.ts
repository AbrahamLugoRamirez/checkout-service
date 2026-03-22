import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) { }

  async findAll() {
    return this.repo.find();
  }

  async seed() {
    const count = await this.repo.count();

    if (count === 0) {
      await this.repo.save([
        {
          name: 'iPhone 13',
          description: 'Smartphone Apple',
          price: 2100000,
          stock: 8,
        },
        {
          name: 'Samsung Galaxy S21',
          description: 'Smartphone Samsung',
          price: 2500000,
          stock: 8,
        },
        {
          name: 'iPhone 17',
          description: 'Smartphone Apple',
          price: 5500000,
          stock: 12,
        },
        {
          name: 'Huawei Pura 80 Ultra',
          description: 'Smartphone Huawei',
          price: 3500000,
          stock: 12,
        },
      ]);
    }

    return { message: 'Seed ejecutado correctamente' };
  }
}