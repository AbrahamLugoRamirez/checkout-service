import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TransactionService } from '../transaction/transaction.service'
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private readonly transactionService: TransactionService) { }
  async createTransaction(data: {
    card: any;
    amount: number;
    email: string;
    productId: number;
  }) {
    try {
      const reference = `order_${Date.now()}`;
      const amountInCents = data.amount * 100;
      const currency = 'COP';
      const token = await this.createCardToken(data.card);
      const { acceptanceToken, personalAuthToken } =
        await this.getAcceptanceTokens();
      const integrityKey =
        `${process.env.WOMPI_INTEGRITY_KEY}`;
      const crypto = require('crypto');
      const signature = crypto
        .createHash('sha256')
        .update(`${reference}${amountInCents}${currency}${integrityKey}`)
        .digest('hex');


      const response = await axios.post(
        `${process.env.WOMPI_BASE_URL}/transactions`,
        {
          amount_in_cents: amountInCents,
          currency,
          customer_email: data.email,
          reference,
          signature,
          acceptance_token: acceptanceToken,
          accept_personal_auth: personalAuthToken,
          payment_method: {
            type: 'CARD',
            token,
            installments: 1,
          },
        },
        {
          headers: {
            Authorization:
              `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
          },
        }
      );

      const transaction_id = await this.transactionService.create({
        productId: data.productId,
        amount: data.amount,
        customerEmail: data.email,
      });

      return { transaction_id, wompi_response: response.data };


    } catch (error: any) {
      console.error('WOMPI eER:', error);
      console.error('WOMPI ERROR:', error?.response?.data);
      throw new Error('Error creando transacción');
    }
  }

  async getTransaction(id: string) {
    const response = await axios.get(
      `${process.env.WOMPI_BASE_URL}/transactions/${id}`,
      {
        headers: {
          Authorization:
            `Bearer ${process.env.WOMPI_PRIVATE_KEY}`,
        },
      },
    );

    return response.data;
  }

  async getAcceptanceTokens() {
    try {

      const response = await axios.get(
        `${process.env.WOMPI_BASE_URL}/merchants/${process.env.WOMPI_PUBLIC_KEY}`
      );

      const data = response.data.data;

      return {
        acceptanceToken: data.presigned_acceptance.acceptance_token,
        personalAuthToken:
          data.presigned_personal_data_auth.acceptance_token,
      };
    } catch (error: any) {
      console.error(
        'ERROR TOKENS:',
        error?.response?.data || error.message,
      );

      throw new Error('Error obteniendo acceptance tokens');
    }
  }

  async createCardToken(cardData: {
    number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder: string;
  }) {
    try {
      const response = await axios.post(
        `${process.env.WOMPI_BASE_URL}/tokens/cards`,
        cardData,
        {
          headers: {
            Authorization:
              `Bearer ${process.env.WOMPI_PUBLIC_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.data.id;
    } catch (error: any) {
      console.error('ERROR TOKEN:', error);
      console.error(
        'TOKEN ERROR(createCardToken):',
        error?.response?.data 
      );


      throw new Error('Error creando token de tarjeta');
    }
  }
}