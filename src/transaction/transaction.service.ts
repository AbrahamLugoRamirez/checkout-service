import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction, TransactionStatus } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private repo: Repository<Transaction>,
  ) {}

  async create(data: {
    productId: number;
    amount: number;
    customerEmail: string;
  }) {
    const transaction = this.repo.create({
      ...data,
      status: TransactionStatus.PENDING,
    });

    return this.repo.save(transaction);
  }

  async updateStatus(id: number, status: TransactionStatus) {
    const transaction = await this.repo.findOneBy({ id });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    transaction.status = status;
    return this.repo.save(transaction);
  }
}