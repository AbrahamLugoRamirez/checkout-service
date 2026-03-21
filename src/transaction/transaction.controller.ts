import { Controller, Post, Get, Body, Patch, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionStatus } from './transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import * as crypto from 'crypto';
import axios from 'axios';
@Controller('transactions')
export class TransactionController {
  constructor(private readonly service: TransactionService) { }

  @Post()
  create(@Body() body: CreateTransactionDto) {
    return this.service.create(body);
  }

  @Patch(':id/:status')
  updateStatus(
    @Param('id') id: number,
    @Param('status') status: TransactionStatus,
  ) {
    return this.service.updateStatus(id, status);
  }

  @Get('signature')
  async getSignature(@Query('reference') reference: string, @Query('amount') amount: number) {
    const currency = 'COP';
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const integrityKey = 'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';
    const string = `${reference}${amount.toString()}${currency}${integrityKey}`;
    const encondedText = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return {
      signature,
      expirationTime,
    };


  }

  @Post('/payments/create')
  async createPayment(@Body() body) {
    const { token, amount, email } = body;

    const reference = `order_${Date.now()}`;

    const response = await axios.post(
      'https://api-sandbox.co.uat.wompi.dev/v1/transactions',
      {
        amount_in_cents: amount * 100,
        currency: 'COP',
        customer_email: email,
        reference,
        payment_method: {
          type: 'CARD',
          token: token,
          installments: 1,
        },
      },
      {
        headers: {
          Authorization:
            'Bearer prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
        },
      }
    );

    return response.data;
  }
}