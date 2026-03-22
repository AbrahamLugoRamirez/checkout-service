import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TransactionModule } from '../transaction/transaction.module';
@Module({
  imports: [TransactionModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}