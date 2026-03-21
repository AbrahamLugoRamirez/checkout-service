import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { TransactionModule } from './transaction/transaction.module';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductModule,
    TransactionModule,
    PaymentsModule,
  ],
})
export class AppModule {}