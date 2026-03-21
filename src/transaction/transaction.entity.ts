import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column('float')
  amount: number;

  @Column({
    type: 'text',
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column()
  customerEmail: string;
}