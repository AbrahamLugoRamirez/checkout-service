import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './transaction.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repo: Repository<Transaction>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) { }

  async create(data: { productId: number; amount: number; customerEmail: string; }) {
    const product = await this.productRepo.findOneBy({
      id: data.productId,
    });

    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stock <= 0) {
      throw new Error('No stock available');
    }

    let transaction = this.repo.create({
      ...data,
      status: TransactionStatus.PENDING,
    });
    transaction = await this.repo.save(transaction);
    const result = this.simulatePayment(); // Simular pago
    transaction.status = result;

    if (result === TransactionStatus.SUCCESS) {
      product.stock -= 1;
      await this.productRepo.save(product);
    }
    return this.repo.save(transaction);
  }

  async updateStatus(id: number, status: TransactionStatus) {
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

  private simulatePayment(): TransactionStatus {
    const success = Math.random() > 0.3;

    return success
      ? TransactionStatus.SUCCESS
      : TransactionStatus.FAILED;
  }
}