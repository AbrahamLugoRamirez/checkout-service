import { Body, Controller, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Param, Get } from '@nestjs/common';
@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('create')
    async createPayment(@Body() body) {
        return this.paymentsService.createTransaction(body);
    }

    @Get(':id')
    async getTransaction(@Param('id') id: string) {
        return this.paymentsService.getTransaction(id);
    }
}