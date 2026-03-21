import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get()
  getProducts() {
    return this.service.findAll();
  }

  @Get('seed')
  seed() {
    return this.service.seed();
  }
}