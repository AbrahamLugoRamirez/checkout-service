import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
  ) {}

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
          price: 3000,
          stock: 5,
        },
        {
          name: 'Samsung Galaxy S21',
          description: 'Smartphone Samsung',
          price: 2500,
          stock: 8,
        },
      ]);
    }

    return { message: 'Seed ejecutado correctamente' };
  }
}