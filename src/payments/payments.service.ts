import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  async createTransaction(data: {
    token: string;
    amount: number;
    email: string;
    acceptanceToken: string;
    personalAuthToken: string;
  }) {
    try {
      const reference = `order_${Date.now()}`;
      const amountInCents = data.amount * 100;
      const currency = 'COP';

      // 🔥 GENERAR SIGNATURE
      const integrityKey =
        'stagtest_integrity_nAIBuqayW70XpUqJS4qf4STYiISd89Fp';

      const stringToSign = `${reference}${amountInCents}${currency}${integrityKey}`;

      const signature = crypto
        .createHash('sha256')
        .update(stringToSign)
        .digest('hex');

      const response = await axios.post(
        'https://api-sandbox.co.uat.wompi.dev/v1/transactions',
        {
          amount_in_cents: amountInCents,
          currency,
          customer_email: data.email,
          reference,

          // 🔥 NUEVO
          signature,

          acceptance_token: data.acceptanceToken,
          accept_personal_auth: data.personalAuthToken,

          payment_method: {
            type: 'CARD',
            token: data.token,
            installments: 1,
          },
        },
        {
          headers: {
            Authorization:
              'Bearer prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
          },
        },
      );
      console.log("responde", response)
      return response.data;
    } catch (error: any) {
      console.log('ERROR WOMPI:', error?.response?.data);
      throw new Error('Error creando transacción');
    }
  }

  async getTransaction(id: string) {
  const response = await axios.get(
    `https://api-sandbox.co.uat.wompi.dev/v1/transactions/${id}`,
    {
      headers: {
        Authorization:
          'Bearer prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg',
      },
    },
  );

  return response.data;
}
}