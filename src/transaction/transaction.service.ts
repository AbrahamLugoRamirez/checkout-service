import { Get, Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './transaction.entity';
import { Product } from '../product/product.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repo: Repository<Transaction>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) { }


  async create(data: {
    productId: number;
    amount: number;
    customerEmail: string;
  }) {
    const product = await this.productRepo.findOneBy({
      id: data.productId,
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock <= 0) {
      throw new BadRequestException('No stock available');
    }
    let transaction = this.repo.create({
      ...data,
      status: TransactionStatus.PENDING,
    });

    transaction = await this.repo.save(transaction);
    console.log("transaction", transaction)
    return this.repo.save(transaction);
  }

  async updateStatus(id: number, status: TransactionStatus) {

    console.log("Updating transaction", id, "to status", status);
    const transaction = await this.repo.findOneBy({ id });
    if (!transaction) {
      throw new Error('Transaction not found');
    }
    transaction.status = status;
    if (status === TransactionStatus.SUCCESS) {
      const product = await this.productRepo.findOneBy({
        id: transaction.productId,
      });

      if (product) {
        product.stock -= 1;
        await this.productRepo.save(product);
      }
    }
    return this.repo.save(transaction);
  }



}