import { IsEmail, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;

  @IsEmail()
  customerEmail: string;
}