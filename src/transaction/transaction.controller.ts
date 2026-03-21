import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionStatus } from './transaction.entity';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) {}

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Patch(':id/:status')
  updateStatus(
    @Param('id') id: number,
    @Param('status') status: TransactionStatus,
  ) {
    return this.service.updateStatus(id, status);
  }
}